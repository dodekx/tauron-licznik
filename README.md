# EnergiaTauron

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

https://energy-instrat-api.azurewebsites.net/api/prices/energy_price_rdn_hourly?date_from=01-08-2024T00:00:00Z&date_to=31-08-2024T23:59:59Z

interface Fixing {
price: number;
volume: number;
}

interface DataPoint {
date: string;
fixing_i: Fixing;
fixing_ii: Fixing;
}

const data: DataPoint[] = [
{
date: "2024-08-01T00:00:00Z",
fixing_i: { price: 450.0, volume: 3361.3 },
fixing_ii: { price: 432.45, volume: 2720.0 },
},
{
date: "2024-08-01T01:00:00Z",
fixing_i: { price: 400.0, volume: 3116.8 },
fixing_ii: { price: 374.52, volume: 2417.4 },
},
// Add the rest of the data points here
];
