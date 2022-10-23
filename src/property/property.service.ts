import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewProperty } from './interface/new-property';
import { Property } from './property.entity';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {}

  async createManyProperties(data: NewProperty[]) {
    try {
      await this.propertyRepository.save(data);
    } catch (error) {
      Logger.log(error, PropertyService.name);
      throw new ServiceUnavailableException();
    }
  }
}
