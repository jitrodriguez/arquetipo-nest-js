#  NestJS Archetype – API Skeleton

**NestJS Archetype** is a boilerplate for building production-ready APIs with **NestJS**.  
It includes environment configuration, testing setup, containerization, CI/CD pipelines, and Kubernetes deployment manifests.

---

## Table of Contents

- [Features](#features)  
- [Project Structure](#project-structure)  
- [Requirements](#requirements)  
- [Environment Variables](#environment-variables)  
- [Running in Development](#running-in-development)  
- [API Documentation (Swagger)](#api-documentation-swagger)  
- [Testing](#testing)  
- [Docker](#docker)  
- [CI/CD (Azure Pipelines)](#cicd-azure-pipelines)  
- [Helm / Kubernetes](#helm--kubernetes)  
- [Postman Collection](#postman-collection)  
- [Useful Scripts](#useful-scripts)  
- [License](#license)

---

## Features

- Multi-environment configuration (`.env.development`, `.env.staging`, `.env.production`)
- TypeORM configuration in `ormconfig.json`
- Unit and e2e testing in `test/`
- `Dockerfile` ready for container builds
- Azure Pipelines setup in `azure-pipelines.yml`
- Helm chart in `helm/` for Kubernetes deployment
- Postman collection (`arquetipo-api-nodejs.postman_collection.json`)

---

## Project Structure

```
arquetipo-nest-js/
├─ src/                          # Source code (modules, controllers, services)
├─ test/                         # Unit and e2e tests
├─ helm/                         # Kubernetes Helm chart
├─ .env.development              # Environment variables for development
├─ .env.staging                  # Environment variables for staging
├─ .env.production               # Environment variables for production
├─ Dockerfile                    # Docker image build
├─ ormconfig.json                # TypeORM configuration
├─ azure-pipelines.yml           # Azure DevOps pipeline config
├─ arquetipo-api-nodejs.postman_collection.json  # Postman collection
├─ nest-cli.json, tsconfig*.json # Nest & TypeScript configuration
├─ package.json, yarn.lock       # Dependencies and scripts
```

---

## Requirements

- **Node.js** (LTS version recommended)  
- **Package manager**: `npm`, `yarn`, or `pnpm`  
- **Database**: compatible with TypeORM (e.g., PostgreSQL)  
- **Docker** (optional, for containerized runs)

---

## Environment Variables

Example `.env` configuration:

```bash
NODE_ENV=development
PORT=3000
CORS_ORIGIN=http://localhost:5173

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=appdb
# or use:
DATABASE_URL=postgresql://user:pass@host:port/dbname
```

---

## Running in Development

```bash
yarn install
yarn start:dev

# or using npm
npm install
npm run start:dev
```

The server starts at `http://localhost:3000` by default.

---

## API Documentation (Swagger)

Swagger may be available at `/docs`. Example setup in Nest:

```ts
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('Archetype API')
  .setDescription('API documentation for Archetype')
  .setVersion('1.0')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('docs', app, document);
```

---

## Testing

Common testing scripts (configure in `package.json`):

```bash
yarn test          # Unit tests
yarn test:e2e      # End-to-end tests
yarn test:cov      # Coverage report
```

---

## Docker

```bash
docker build -t arquetipo-nest:dev .
docker run --rm -p 3000:3000 --env-file .env.development arquetipo-nest:dev
```

---

## CI/CD (Azure Pipelines)

`azure-pipelines.yml` is included to automate:

- Install dependencies  
- Run tests  
- Build application  
- Build & push Docker image  
- Deploy to Kubernetes (optional)

---

## Helm / Kubernetes

The `helm/` folder contains a basic chart. Customize parameters such as:

- `image.repository`, `image.tag`  
- Environment variables & secrets  
- Probes (readiness/liveness)  
- Resource requests/limits  

Deploy example:

```bash
helm upgrade --install archetype ./helm   --namespace archetype --create-namespace   --set image.repository=ghcr.io/your-org/arquetipo-nest   --set image.tag=1.0.0
```

---

## Postman Collection

Import `arquetipo-api-nodejs.postman_collection.json` into Postman to test available endpoints.

---

## Useful Scripts (suggested)

Add these to your `package.json`:

```json
"scripts": {
  "start": "node dist/main.js",
  "build": "nest build",
  "start:dev": "nest start --watch",
  "lint": "eslint \"{src,test}/**/*.ts\"",
  "format": "prettier --write \"{src,test}/**/*.{ts,js,json,md}\"",
  "test": "jest",
  "test:e2e": "jest --config test/jest-e2e.json",
  "test:cov": "jest --coverage"
}
```

---

## License

This project is licensed under the **MIT License** (or your choice). Add a `LICENSE` file if required.
