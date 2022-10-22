import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import AppConfig from './app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScraperModule } from './scraper/scraper.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [AppConfig],
      isGlobal: true,
    }),
    ScraperModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
