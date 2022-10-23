import { Injectable } from '@nestjs/common';
import { PropertyService } from './property/property.service';
@Injectable()
export class AppService {
  constructor(private readonly propertyService: PropertyService) {}

  async getProperties() {
    const properties = await this.propertyService.listProperties();

    const formatedProperties = properties.map((property) => {
      return {
        ...property,
        url: `https://www.sreality.cz${property.url}`,
      };
    });

    return { properties: formatedProperties };
  }
}
