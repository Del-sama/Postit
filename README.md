[![Coverage Status](https://coveralls.io/repos/github/Andela-ddiei/Postit/badge.svg?branch=master)](https://coveralls.io/github/Andela-ddiei/Postit?branch=master)
[![CircleCI](https://circleci.com/gh/Andela-ddiei/Postit/tree/develop.svg?style=svg)](https://circleci.com/gh/Andela-ddiei/Postit/tree/develop)
# Postit
PostIt is a simple application that allows friends and colleagues create groups for notifications. This way one person can post notifications to everyone by sending a message once.
## Development
This application was developed using [NodeJs](https://nodejs.org/) with express for routing and [Firebase](https://firebase.google.com/) for data persistence.
## Installation
* Make sure you have NodeJs installed on your local machine.
* Clone the repository `$ git clone https://github.com/Andela-ddiei/Postit.git`
* Change into the directory `$ cd /PostIt`
* Install all required dependencies with `$ npm install`
* Create a `.env` file in your root directory as described in `.env.sample` file
* Create a `Firebase` account
* Initialize `Firebase`
## Testing
N/A
## Endpoints
| Request type      | Endpoint          | Action |
| ------------- |:-------------:| -----:|
| POST          | /users/signup  | Create a user|
| POST          | /users/signin  | Log a user in |
| POST          | /users/signout | Sign a user out|
| PUT           | /users/:id     | Update a user's profile
| POST          | /groups/create | Create a group |
| GET           | /groups/:id    | Get a particular group|
| DELETE        | /groups/:id    | Delete a group|
| PUT           | /groups/:id    | Update a group |
| GET           | /groups        | Get all groups|
| PUT           | /users/:id     | Update a user's profile
| POST          | /groups/:id/join | Join a group |
| POST          | /groups/:id/message   | Send a message to a group|
| PUT           | /groups/:id/message/:id | Edit a message |
| DELETE        | /groups/:id/message/:id | Delete a message|

