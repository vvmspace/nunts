use futures::StreamExt;
use serde::{Serialize, Deserialize};
use serde_json::json;

#[derive(Serialize, Deserialize)]
struct Hello {
    name: String,
}

#[derive(Serialize, Deserialize)]
struct Payload<T> {
    data: T,
}


#[tokio::main]
async fn main() -> Result<(), async_nats::Error> {
    let client = async_nats::connect("nats").await?;
    let mut subscriber = client.subscribe("hello-rust").await?;

    while let Some(message) = subscriber.next().await {
        println!("Received message {:?}", message);
        if let Some(reply) = message.reply {
            if let Ok(payload) = serde_json::from_slice::<Payload<Hello>>(message.payload.as_ref()) {
                println!("Payload name: {:?}", payload.data.name);
                let bytes = serde_json::to_vec(&json!(payload.data))?;
                client.publish(reply, bytes.into()).await?;
            } else {
                let bytes = serde_json::to_vec(&json!({"name": "unknown"}))?;
                client.publish(reply, bytes.into()).await?;
            }
            println!("Replied to message");
        }
    }

    Ok(())
}