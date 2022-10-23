import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScraperModule } from './scraper/scraper.module';
import { PropertyModule } from './property/property.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './property/property.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'dev',
      entities: [Property],
      synchronize: true,
    }),
    PropertyModule,
    ScraperModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
