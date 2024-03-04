import { Module } from '@nestjs/common';
import { NatsClientModule } from '../nats-client/nats.module';
import { HelloApiController } from './hello-api.controller';

@Module({
  imports: [NatsClientModule],
  controllers: [HelloApiController],
  providers: [],
  exports: [],
})
export class HelloApiModule {}
