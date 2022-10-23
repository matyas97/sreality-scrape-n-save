import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import puppeteer from 'puppeteer';

interface ScrapedProperty {
  title: string;
  url: string;
  thumbnailUrl: string;
}

@Injectable()
export class ScraperService implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    Logger.log('Starting with scrape...', ScraperService.name);

    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    const startingUrl = this.configService.get<string>('SREALITY_URL');
    const pagesToScrape = this.configService.get<number>(
      'SREALITY_PAGES_TO_SCRAPE',
    );

    const scrapedProperties: ScrapedProperty[] = [];

    for (let index = 0; index < pagesToScrape; index++) {
      const pageUrl = `${startingUrl}?strana=${index + 1}`;
      Logger.log(`Scraping page ${pageUrl}...`, ScraperService.name);

      await page.goto(pageUrl);

      await page.waitForSelector('.property');

      const pageProperties: ScrapedProperty[] = await page.evaluate(() => {
        const results: ScrapedProperty[] = [];

        const list = document.querySelectorAll('.property');

        list.forEach((property) => {
          const scrapedProperty: ScrapedProperty = {
            title: property.querySelector('.info > div > span > .locality')
              .innerHTML,
            url: property
              .querySelector('preact > div > div > a')
              .getAttribute('href'),
            thumbnailUrl: property
              .querySelector('preact > div > div > a > img')
              .getAttribute('src'),
          };

          results.push(scrapedProperty);
        });

        return results;
      });

      scrapedProperties.push(...pageProperties);
    }

    Logger.log('Scrape finished...', ScraperService.name);
    await browser.close();
  }
}
