# Home Library Service

A multi-container application. PostgreSQL database runs inside of the docker container.

Application uses Prisma with Nest.js to store and update data.

The built image is available on <https://hub.docker.com/r/mitrofanzxc/nodejs2024Q3-service-app>

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```bash
git clone {repository URL}
```

## Switch to the development branch

```bash
git checkout development
```

## Add .env

Add .env file as in .env.example.

### Notes

- Open Docker Desktop
- Make sure you are not running another containers that could use the same ports that are used in the .env

## Running application

Build and start containers. Run:

```bash
docker-compose build

docker-compose up
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing <http://localhost:4000/api/>.
For more information about OpenAPI/Swagger please visit <https://swagger.io/>.

## Database GUI: prisma studio

You can see and check the database work in prisma studio. (<http://localhost:5555> by default).

After containers running _open new terminal_ and run:

```bash
docker exec app npx prisma studio

```

## Testing

After application running _open new terminal_ and enter:

To run all tests without authorization (67 should pass).

```bash
npm run test

or from container:

docker exec app npm run test
```

To run all tests including auth tests (94 should pass):

```bash
npm run test:auth
```

To run only refresh token tests (4 should pass):

```bash
npm run test:refresh
```

## Vulnerability scanning

Run:

```bash
npm run scan-vulnerabilities
```

### Auto-fix and format

```bash
npm run lint
```

```bash
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: <https://code.visualstudio.com/docs/editor/debugging>
