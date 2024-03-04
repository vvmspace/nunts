import asyncio
import json
import nats
from nats.errors import ConnectionClosedError, TimeoutError, NoServersError

print("Hello, Python!")

async def main():
    print("Connecting to NATS...")
    nc = await nats.connect("nats://nats:4222", max_reconnect_attempts=120, reconnect_time_wait=3)
    print("Connected to NATS!")

    async def help_request(msg):
        msg_data_str = msg.data.decode()
        msg_data = json.loads(msg_data_str)
        data_field = msg_data['data']
        print(f"Received a message on '{msg.subject} {msg.reply}': {data_field}")
        response_data = json.dumps(data_field).encode()
        await nc.publish(msg.reply, response_data)
    sub = await nc.subscribe("hello-python", cb=help_request)

    while True:
        await asyncio.sleep(1) # Infinite loop to keep the program running

if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    loop.run_until_complete(main())
    loop.close()
