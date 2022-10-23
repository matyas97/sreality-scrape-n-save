import { Module } from '@nestjs/common';
import { PropertyModule } from 'src/property/property.module';
import { ScraperService } from './scraper.service';

@Module({
  imports: [PropertyModule],
  providers: [ScraperService],
})
export class ScraperModule {}
