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

Docker is supported on Linux by default. On Windows 10 Pro and MacOS you will need to install Docker Desktop.  
You can download Docker Desktop from [Docker Hub](https://www.docker.com/products/docker-desktop) or [directly](https://download.docker.com/).  
If you have a version of Windows that does not support Hyper-V, use [Docker Toolbox](https://docs.docker.com/toolbox/toolbox_install_windows/) instead. [download here](https://github.com/docker/toolbox/releases).  

## Usage

### App
In the `app` folder, run the following command:

```bash
$ yarn start
```

Now on your mobile device, install the Expo app for your platform and scan the QR code to run the app live.

### Server
In the `api` folder, run the following commands:

1. Copy the docker environment variable template
```bash
$ cp .docker/web.env.template .docker/web.env
```

2. Build and generate all necessary servers and databases
```bash

$ docker-compose up

```
3. Use Ctrl-C to close the session
4. Restart the command
```bash

$ docker-compose up

```

You can now navigate to [http://localhost/api/v1/sessions](http://localhost/api/v1/sessions)

## How to contribute
1. First make sure you are on the up to date `develop` branch.
```
git checkout develop
git pull
```
2. Create a branch to add your changes by running.
```
git checkout -b "branch_name"
```
> `branch_name` should follow the convention `feature/{feature_name}`, or `hotfix/{fix_name}`
3. Make changes in your new branch.
4. Once changes are complete, go to GitHub and submit a "Pull Request". Fill in necessary information.
5. Once it has been reviewed by other members of the team, it can be accepted to the `develop` branch and the cycle continues...

> More info on the process [here](https://nvie.com/posts/a-successful-git-branching-model/) and [here](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
