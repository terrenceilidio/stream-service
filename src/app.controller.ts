import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('stream')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('/start')
  async startStream(@Body() body: any): Promise<string> {
    try {
      return await this.appService.startStream(body.userId, body.video);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/stop')
  async stopStream(@Body() body: any): Promise<string> {
    try {
      return await this.appService.stopStream(body.userId, body.video);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('get/for/:userId')
  async getUserStreams(@Param() params): Promise<any> {
    try {
      return await this.appService.getUserStreams(params.userId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}