# dev-academy-spring-2025-exercise

This is the pre-assignment for Solita Dev Academy Finland January 2025. But if you’re here just purely out of curiosity, feel free to snatch the idea and make your own app just for the fun of it!

Let's imagine that you have received an interesting project offer to create a UI and a backend service for displaying data from electricity production, consumption and prices.
The exercise uses data that is owned by Fingrid and combines that with electricity price data from porssisahko.net.

# The exercise

Create a web application that uses a backend service to fetch the data. Backend can be made with any technology. We at Solita use for example (not in preference order) Java/Kotlin/C#/TypeScript but you are free to choose any other technology as well.

You are provided with Docker setup, with contains a PostgreSQL database with all the necessary data for the exercise.

You can also freely choose the frontend technologies to use. The important part is to give good instructions on how to build and run the project.

Please return the exercise as a link to github repository.

# Stuff to do

## Daily statistics list (recommended features)

- Total electricity consumption per day
- Total electricity production per day
- Average electricity price per day
- Longest consecutive time in hours, when electricity price has been negative, per day

## Additional features for daily statistics list

- Pagination
- Ordering per column
- Searching
- Filtering

## Other additional features

- Single day view
  -- Total electricity consumption per day
  -- Total electricity production per day
  -- Average electricity price per day
  -- Hour with most electricity consumption compared to production
  -- Cheapest electricity hours for the day
- Graph visualisations

## Surprise us with

- Running backend in Docker
- Running backend in Cloud
- Implement E2E tests

# Instructions for running the database

1. Install Docker Desktop on your computer (https://docs.docker.com/desktop/)
2. Clone this repository
3. On command line under this folder run:

```
docker compose up --build --renew-anon-volumes -d
```

Please note that running that might take couple of minutes

4. Docker setup also comes with Adminer UI, where you can check your database contents at http://localhost:8088/
5. Log into Adminer with following information (password: academy):

![alt text](login.png)

Database is running at postgres://localhost:5432/electricity and the database name is electricity. Database comes with user academy (password: academy).

# Database structure

Database consists of one table electricityData.

## ElectricityData table

| Column            | Description                                  | Type                 |
| ----------------- | -------------------------------------------- | -------------------- |
| id                | id, primary key                              | integer              |
| date              | date of the data point                       | DATE                 |
| startTime         | Starting time of the hour for the data point | TIMESTAMP            |
| productionAmount  | Electricity production for the hour MWh/h    | NUMERIC(11,5) _NULL_ |
| consumptionAmount | Electricity consumption for the hour kWh     | NUMERIC(11,3) _NULL_ |
| hourlyPrice       | Electricity price for the hour               | NUMERIC(6,3) _NULL_  |

# How to run the solution

The application has docker compose file and will be ran with same command as the asignment states so to run the application
run the following command:

```
 docker compose up --build --renew-anon-volumes -d
```

## If something breaks

During compose run a new table will be populated in case it has not been populated, please apply a database update by calling a get method to this endpoint which can be called easily in swagger

> http://localhost:5128/swagger/index.html
> /api/DailyElectricity/populate/database

That should be it

If for some reason application does not behave accordingly and connection is for example reset please comment out from compose both the nginx and solita-front images.
After which you should be able to run the backend with the database normally and simply running

> npm run dev

Will launch the application and will connect to the backend that is running in docker.

The solution also has E2E testing applied which can be ran using the command:

Possible erros may be caused if no SDK 8.0 or Node 23v is found on the machine but this in theory shouldnt be possible.

## Test cases and showcase of basic workflow

> npm run cy:open

Once cypress opens please choose E2E testing option.

The tests also showcase the basic functionality of the web solution.
