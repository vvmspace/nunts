import { Module } from '@nestjs/common';
import { HelloApiModule } from './hello-api/hello-api.module';

@Module({
  imports: [HelloApiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
