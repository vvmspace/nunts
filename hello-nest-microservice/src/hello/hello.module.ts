import { Module } from '@nestjs/common';
import { HelloController } from './hello.controller';
import { HelloService } from './hello.service';
import { NatsClientModule } from '../nats-client/nats.module';

@Module({
  imports: [NatsClientModule],
  controllers: [HelloController],
  providers: [HelloService],
})
export class HelloModule {}
