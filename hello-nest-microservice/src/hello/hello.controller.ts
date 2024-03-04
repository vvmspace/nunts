import { Controller } from '@nestjs/common';
import { HelloService } from './hello.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class HelloController {
  constructor(private readonly appService: HelloService) {}

  @MessagePattern('hello')
  getHello(): string {
    console.log('hello');
    return this.appService.getHello();
  }
}
