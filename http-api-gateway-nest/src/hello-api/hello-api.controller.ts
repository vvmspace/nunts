import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@ApiTags('Hello')
@Controller()
export class HelloApiController {
  constructor(@Inject('NATS_SERVICE') private readonly client: ClientProxy) {}
  @ApiOperation({ summary: 'Hello NATS' })
  @Get()
  helloNATS(): Observable<string> {
    return this.client.send<string>('hello', {});
  }
  @ApiOperation({ summary: 'Hello Rust (GET)' })
  @Get('rust')
  getHelloRust(): Observable<string> {
    return this.client.send<string>('hello-rust', {});
  }

  @ApiOperation({ summary: 'Hello Rust (POST)' })
  @ApiBody({})
  @Post('rust')
  postHelloRust(@Body() body: any = {}): Observable<string> {
    return this.client.send<string>('hello-rust', body);
  }

  @ApiOperation({ summary: 'Hello Python (POST)' })
  @ApiBody({})
  @Post('python')
  postHelloPython(@Body() body: any = {}): Observable<string> {
    return this.client.send<string>('hello-python', body);
  }
}
