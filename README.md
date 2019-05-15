# Paracord 🚁

Paracord is a cross-platform app designed by and for Missouri S&T's Multirotor Robot Design Team to easily log flight sessions and collect useful information.

## Installation

### App

Requirements:
* [Node.js](https://nodejs.org/en/)
* [yarn](https://yarnpkg.com/en/)
* **Expo\***
**\*** The app is written using Expo. Installation instructions can be found on the [Expo Documentation](https://docs.expo.io/versions/latest/introduction/installation/).

### API
This can be run on any modern computer

Install:
* Docker
* Docker Compose

Information about how to install for your platform can be found [here](https://docs.docker.com/install/).

On Windows and MacOS you will need to install Docker Desktop.

## Usage

### App
In the `app` folder, run the following command:

```bash
$ yarn start
```

### Server
In the `api` folder, run the following commands:

1. Build and generate all necessary servers and databases
```bash

$ docker-compose up

```
2. Use Ctrl-C to close the session
3. Restart the container
```bash

$ docker-compose up

```

You can now navigate to [http://localhost/api/v1/flights](http://localhost/api/v1/flights)
