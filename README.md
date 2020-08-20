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

- create both servers `make spinup`

- destroy both servers `make spindown`

- recreate both servers `make respin`

- start both servers `make start`

- stop both servers `make stop`

## Logs

- backend `make backend_logs`

- frontend `make frontend_logs`

## Container Shell

- backend `make backend_shell`

- frontend `make frontend_shell`


## URLs

- frontend: https://localhost:3000

- backend: https://localhost:3000

- Anonymous Weather Data: https://localhost:3000/api/weather/demo/city/<name>

- Authenticated Weather Data: https://localhost:3000/api/weather/city/<name>

- Swagger: http://localhost:8000/swagger/

## Restoring Sample Backend data

`make backend_restore_sample`

This will add the base admin and sample token authorization on the db:

- Token: `88bd73f2f1ffbd6ef603369743d4e7264d83c5a5`