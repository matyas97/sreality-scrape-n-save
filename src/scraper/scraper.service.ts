import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { PropertyService } from 'src/property/property.service';
import { ScrapedProperty } from './interface/scraped-property';

@Injectable()
export class ScraperService implements OnApplicationBootstrap {
  constructor(private readonly propertyService: PropertyService) {}

  async onApplicationBootstrap() {
    await this.scrapeSreality();
  }

  private async scrapeSreality() {
    Logger.log('Starting with scrape...', ScraperService.name);

    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    const startingUrl = 'https://www.sreality.cz/hledani/prodej/byty';

    const pagesToScrape = 25;

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

    await this.propertyService.createManyProperties(scrapedProperties);

    Logger.log('Scrape finished...', ScraperService.name);
    await browser.close();
  }
}
