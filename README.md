# Paracord 🚁

Paracord is a cross-platform app designed by and for Missouri S&T's Multirotor Robot Design Team to easily log flight sessions and collect useful information.

## Installation

### App
Requirements:
* [Flutter](https://flutter.dev/docs/get-started/install)

### API
This can be run on any modern computer

Requirements:
* [Node.js](https://nodejs.org/en/)
* Docker
* Docker Compose

Information about how to install docker for your platform can be found [here](https://docs.docker.com/install/).  

Docker is supported on Linux by default using your preferred package manager.  
On Windows 10 Pro and MacOS you will need to install Docker Desktop.  
You can download Docker Desktop from [Docker Hub](https://www.docker.com/products/docker-desktop) or [directly](https://download.docker.com/).  
If you have a version of Windows that does not support Hyper-V, use [Docker Toolbox](https://docs.docker.com/toolbox/toolbox_install_windows/) instead. [download here](https://github.com/docker/toolbox/releases).  

## Usage

### App

The app can be run on any compatible android or iOS device directly from your IDE.  
For more information on your platform, follow the instuctions on [Flutter Docs](https://flutter.dev/docs/get-started/).  
Be sure to check out Material Design's [Flutter tutorials](https://material.io/collections/developer-tutorials/#flutter) if you need help getting started!

#### Deploy on Android:	
    1. Enable Developer Mode on Phone
	2. Enable USB Debugging on Phone
	3. Connect Your Phone with USB
	4. Trust Your Computer if Prompted on Phone
	5. Run App (app will automatically build on phone)

#### Deploy on iOS (Mac-only):
	1. Check the iOS version is compatible with the Xcode version
	2. Install homebrew
	3. Use homebrew to install ideviceinstaller, iOS-deploy & cocoapods
	4. Add Apple ID to Xcode
	5. Select development team
	6. Connect your phone with USB
	7. Trust your computer on Phone
	8. Trust your Development Certificate on Phone
	9. Create a unique bundle ID
	10. Run App (app will automatically build on phone)

*Tip: use Android Studio IDE*

### Server
In the `api` folder, run the following commands:

1. Build all necessary files and databases
```bash
$ docker-compose up --build
```
3. Use Ctrl-C to close the session
4. Start the docker containers
```bash
$ docker-compose up
```

You can now navigate to [http://localhost/graphql](http://localhost/graphql)  
If you're using Docker Toolbox you can connect either using Kitematic or at [192.168.99.100/graphql](http://192.168.99.100/graphql)

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
