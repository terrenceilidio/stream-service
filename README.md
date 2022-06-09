## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the application using Docker

```bash

# Start Application Redis and Docker
docker-compose up --build hooligan-stream-service

# development
$ npm run start || npm start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov


# Redis

You can download a Redis manager here 

https://resp.app/subscriptions/downloads

## License

Nest is [MIT licensed](LICENSE).


End points


url = http://localhost:3000/stream

APIs

url/start ->  starts a stream

url/stop -> stops a stream

url/get/for/{userId} -> get current streams for specified user



Notes

I will be using Redis to hanfl


