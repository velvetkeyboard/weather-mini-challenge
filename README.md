## Weather Mini Challenge
Suppose you live in Ribeirão Preto. Should you take an umbrella?

You tell us!

If the air humidity on a given day is **greater** than **70%**, it is a good idea to take an umbrella with you.
Your goal is to fetch the Ribeirão Preto air humidity forecast for the next **five** days from https://openweathermap.org/api and display the following message template:

*You should take an umbrella in these days: ....*

For instance, if on the next five days air humidity will be greater than 70% on Monday, Tuesday and Wednesday, you must display the message:

*You should take an umbrella in these days: Monday, Tuesday and Wednesday.*

**Fork this repo and send a link to the fork with your solution, please do not open pull requests.** 


## Requirements

- Makefile
- Docker

## Running

### TL;DR

1. Build images, spinup containers, migrate and restore db  `make respin`
2. Navigate to http://localhost:8000/admin/authtoken/token/
3. Copy the content from "KEY" column from "app_weather" and past it on
  `frontend/.env` where it says `REACT_APP_WEATHER_API_KEY=`
4. Restart the container just to synchronize the changes `make restart`
 Navigate to http://localhost:3000 to test the service

## Make Targets

### Spin Up & Down

- create both servers `make spinup`

- destroy both servers `make spindown`

- recreate both servers `make respin`

- start both servers `make start`

- stop both servers `make stop`

### Logs

- backend `make backend_logs`

- frontend `make frontend_logs`

### Container Shell

- backend `make backend_shell`

- frontend `make frontend_shell`

## Restoring Sample Backend data

- `make backend_restore_sample`

## URLs

- frontend: https://localhost:3000

- backend: https://localhost:3000

- Swagger: http://localhost:8000/swagger/


## Q&A

- Why not OAuth2 ?

Had to balance time between other assignments so started with the basic token
to build the MVP and if I had enough time after that the migration to OAuth2
would happen.

But in the other hand extending the Basic Token workflow gave me the chance to
explore and show how easy it is to customize/extend Django components

- Where's my email notification and newsletter

Next release. I promise. We will give a life time discount to anyone who
keeps their accounts until then.

- Why not Kubernetes?

I don't know where this is going to be deployed. Spending time writing up the
pods would not pay out if this would be later deployed at AWS ECS.

- Where's the front-end tests?

Yeah. About that... Next release?

- Why Makefile?

1. It's already installed on most of the Linux based servers
2. Syntax is easy to read


- Why frontend app is running on the dev server?

Local Development craves for Hot Reload.
