# Link Shortener

Link shortener application with comprehensive click analytics.

## Table of contents

-   [Overview](#overview)
    -   [Screenshots](#screenshots)
-   [Built with](#built-with)
    -   [Common](#common)
    -   [Front End](#front-end)
    -   [Back End](#back-end)
-   [How to run the application](#how-to-run-the-application)

## Overview

Link shortener application with comprehensive click analytics. The application gathers statistics about the browser, operating system and device from which the click was made.

### Screenshots

![links-page-desktop](https://github.com/NikitaKhodakovsky/link-shortener/assets/52799295/f2559859-8820-45e8-9e91-d5f3df7f7967)
![links-page-mobile](https://github.com/NikitaKhodakovsky/link-shortener/assets/52799295/7394c591-8c28-4da7-b994-e6ec093b644b)

![link-page-desktop](https://github.com/NikitaKhodakovsky/link-shortener/assets/52799295/8822091b-1f00-4719-892b-e42827fdc0f4)
![link-page-mobile](https://github.com/NikitaKhodakovsky/link-shortener/assets/52799295/1dc274f2-0f18-403d-a77d-7f2e8e744416)

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

