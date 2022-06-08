import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('stream')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('/start')
  startStream(@Body() body: any): string {
    try {
      return this.appService.startStream(body.userId, body.video);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/stop')
  stopStream(@Body() body: any): string {
    try {
      return this.appService.stopStream(body.userId, body.video);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('get/for/:userId')
  getUserStreams(@Param() params): any {
    try {
      return this.appService.getUserStreams(params.userId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}