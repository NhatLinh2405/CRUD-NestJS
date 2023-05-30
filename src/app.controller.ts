import { Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { LoggingInterceptor } from './app.interceptor';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('')
  @UseInterceptors(LoggingInterceptor)
  helloWorld() {
    return 'this is test Response';
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
