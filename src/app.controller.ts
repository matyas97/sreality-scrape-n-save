import { Controller, Get, Query, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { PaginationParams } from './dto/pagination-params';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getProperties(@Query() { offset }: PaginationParams) {
    return this.appService.getProperties(offset);
  }
}
