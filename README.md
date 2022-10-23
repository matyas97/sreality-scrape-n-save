# Sreality scrape N save - Learning project

This is a learning project to scrape data from sreality.cz, save it to a database and render it in a web app. To run the project you need to have Docker installed in order to run the containers.

##  Technologies

- NestJS
- TypeORM
- Pupeteer
- Handlebars

## Modules

###  Scraper

Starts a puppeteer browser and scrapes data from sreality.cz. The data is saved to a database. The scraper is triggered by on onApplicationBootstrap event so it runs after the TypeORM module finishes creating the database.

###  Property

Defines the property entity and the property repository. The repository is used to save and get data from the database.

###  App

Controller exposes public endpoint on root path. The service renders the data from the database using Handlebars and takes care of the pagination.
