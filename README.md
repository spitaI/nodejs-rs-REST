# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Running with Fastify

To use the `fastify` adapter instead of `express` under `NestJS`, you have to set the `USE_FASTIFY` environment variable in `.env` file to `true`. Then you need to restart the app, if it was running.

When you choose express or fastify as adapter, when the app is finally started, you'll see the message in console, saying:
`App is running on port {PORT} using {express/fastify}`

## Express vs Fastify comparison

### Express ([Report](reports/express.html))
| Requests     | [total, completed]           | 15000, 15000                                         |
|--------------|------------------------------|------------------------------------------------------|
| Duration     | [min, max, median, p95, p99] | 823.7ms, 21060.6ms, 15504.7ms, 20464.7ms, 20728.7ms  |
| Latencies    | [min, max, median, p95, p99] | 28ms, 7055ms, 2945.5ms, 6349.5ms, 6716.5ms           |
| RPS          | [count, mean]                | 15000, 49.18                                         |
| Success      | [ratio]                      | 100.00%                                              |
| Status Codes | [code:count]                 | 200:6000, 201:6000, 204:3000                         |

### Fastify ([Report](reports/fastify.html))
| Requests     | [total, completed]           | 15000, 15000                                         |
|--------------|------------------------------|------------------------------------------------------|
| Duration     | [min, max, median, p95, p99] | 494.4ms, 25446.3ms, 10875.6ms, 22499ms, 24108.9ms    |
| Latencies    | [min, max, median, p95, p99] | 8ms, 8476ms, 2050ms, 5118ms, 7182ms                  |
| RPS          | [count, mean]                | 15000, 49.35                                         |
| Success      | [ratio]                      | 100.00%                                              |
| Status Codes | [code:count]                 | 200:6000, 201:6000, 204:3000                         |

## Running with Docker

- Docker [Download & Install Docker](https://docs.docker.com/get-docker/)
- [Link to DockerHub images](https://hub.docker.com/u/spitai)

```
docker-compose up
```

If you want to update the container images with the changes you made,
stop docker-compose, if it is running, and run:

```
docker-compose down
docker-compose build
docker-compose up
```

To scan images for vulnerabilities, run:

```
docker scan <image name>
```

## Migrations

Current migration files stored in `migrations` folder.
To work with migrations, start the app using:

```
docker-compose up
```

When the DB and the app become running, you can use migrations functionality:

- There is an inital migration file by default, but you can remove it and create your own by running:
  ```
  npm run migration:generate
  ```

- After migration was generated, you can apply changes to the database by running:
  ```
  npm run migration:run
  ```

- You can revert latest migration by running:
  ```
  npm run migration:revert
  ```

In summary, after you started the app using `docker-compose`, and applied migrations to the DB, you can start testing the application.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
