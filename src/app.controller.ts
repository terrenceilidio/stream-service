import { Body, Controller, Get , Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('stream')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/start')
  startStream(@Body() body: any): string {
    return this.appService.startStream(body.userId,body.video);
  }

  @Post('/stop')
  stopStream(@Body() body: any): string {
    return this.appService.stopStream(body.userId,body.video);
  }

  @Get('get/for/:userId')
  getUserStreams(@Param() params):any{
    return this.appService.getUserStreams(params.userId);
  }
}