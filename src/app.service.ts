import { Injectable } from '@nestjs/common';
import { PropertyService } from './property/property.service';
import { truncateTitle } from './utils/truncate-title';
@Injectable()
export class AppService {
  constructor(private readonly propertyService: PropertyService) {}

  async getProperties(offset = 0) {
    let offsetNumber = Number(offset);
    if (offsetNumber < 0) offsetNumber = 0;

    const limit = 6;

    const [properties, count] = await this.propertyService.listProperties(
      offset,
      limit,
    );

    const formatedProperties = properties.map((property) => {
      return {
        ...property,
        title: truncateTitle(property.title, 30),
        url: `https://www.sreality.cz${property.url}`,
      };
    });

    const previousOffset = offsetNumber - limit < 0 ? 0 : offsetNumber - limit;
    const showPreviousOffset = offsetNumber !== 0;

    const nextOffset = offsetNumber + limit;
    const showNextOffset = nextOffset <= count;

    const offsetInfo =
      'Showing ' +
      (offsetNumber + 1) +
      ' to ' +
      (offsetNumber + limit >= count ? count : offsetNumber + limit) +
      ' of ' +
      count +
      ' entries';

    return {
      properties: formatedProperties,
      previousOffset,
      showPreviousOffset,
      nextOffset,
      showNextOffset,
      offsetInfo,
    };
  }
}
