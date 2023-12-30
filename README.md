# Link Shortener

Link shortener application with comprehensive click analytics. The application gathers statistics about the browser, operating system and device from which the click was made.

## Table of contents

-   [Links](#links)
-   [Screenshots](#screenshots)
-   [Built with](#built-with)
    -   [Common](#common)
    -   [Front End](#front-end)
    -   [Back End](#back-end)
-   [How to run the application](#how-to-run-the-application)

## Links

-   [Live Demo](https://shortener.khodakovsky.com)
-   [Swagger](https://shortener.khodakovsky.com/swagger)

The app allows you to create a demo account with demo data without the tedious registration process, so feel free to check it out.

## Screenshots

![list-desktop-dark](https://github.com/NikitaKhodakovsky/link-shortener/assets/52799295/6eb78520-be0b-4c7c-a0af-ce340ea53e0e)
![list-desktop-light](https://github.com/NikitaKhodakovsky/link-shortener/assets/52799295/191e9a71-e332-4e72-90c6-3c8e9046d2d3)

![list-mobile-dark](https://github.com/NikitaKhodakovsky/link-shortener/assets/52799295/e3b0175d-d494-4c56-8012-760e1800e5fc)
![list-mobile-light](https://github.com/NikitaKhodakovsky/link-shortener/assets/52799295/031be57b-c40b-42fa-84b4-a437a15f2a51)

![details-desktop-dark](https://github.com/NikitaKhodakovsky/link-shortener/assets/52799295/63250f23-7b3b-4fd7-a452-bf703fc70e4f)
![details-desktop-light](https://github.com/NikitaKhodakovsky/link-shortener/assets/52799295/9740da3d-af09-4eca-b2e6-eda5e4c13000)

![details-mobile-dark](https://github.com/NikitaKhodakovsky/link-shortener/assets/52799295/115623bd-4025-44a2-a296-1d82a18b31ed)
![details-mobile-light](https://github.com/NikitaKhodakovsky/link-shortener/assets/52799295/61709b73-e6ef-4c5b-9123-b7e5cb779435)

## Built with

### Common

-   NGINX
-   Docker
-   Swagger
-   TypeScript

### Front end

-   React
-   React Query
-   Formik
-   Chart.js
-   SASS / CSS modules
-   Mobile-first workflow

### Back end

-   NestJS
-   TypeORM
-   PostgreSQL
-   Redis
-   Express

## How to run the application

To run the application you need to install [Docker](https://docs.docker.com/engine/install)

Run this command to verify that the installation is correct

```console
docker -v
```

You should see something like this:

```console
Docker version 24.0.7, build afdd53b
```

Clone this repository

```console
git clone https://github.com/NikitaKhodakovsky/link-shortener.git
```

Navigate to the directory with this repository

```console
cd link-shortener
```

Execute the following command to start the application from the docker-compose file:

```console
docker compose --env-file ./.env.example up -d
```

If you are running this application for the first time, you should create a database schema. You don't need to do this step for subsequent runs, because all data will be saved in named volumes.

To do this you need to access the terminal inside the container:

```console
docker container exec -it link-shortener_server sh
```

Execute this command inside the container:

```console
npm run typeorm:prod schema:sync
```

You should see the following output:

```console
Schema synchronization finished successfully.
```

Exit the terminal:

```console
exit
```

The app is now available at http://localhost

<br>

To stop the application run:

```console
docker compose down
```
