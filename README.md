# Nutritional Food

An application leveraging Docker, Express.js, Next.js, PostgreSQL, and Sequelize for a powerful full-stack experience.

## Introduction

This repository houses a web application built with Docker, Express.js, Next.js, PostgreSQL, and Sequelize. The following instructions detail the setup process for running the application in a Docker environment.

## Prerequisites

Ensure the following software is installed on your machine:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- Node.js
- npm or yarn

## Installation

```bash
git clone https://github.com/apolyanov/nutritional-food.git
cd your-app
```
## Starting up

Once you have your **Prerequisites** done all you need to do is run:

```bash
docker compose up
```
in the root folder of the project where the **docker-compose.yaml** file is located.

## Mock data

If you want you can run a script in the **nutritional-food-backend** folder that will populate the database with mock data to get you started.

```bash
npm run populate-data
```

