import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class ScraperService implements OnModuleInit {
  async onModuleInit() {
    Logger.log('Starting with scrape...', ScraperService.name);
    await new Promise((resolve) => setTimeout(resolve, 10000));
  }
}
