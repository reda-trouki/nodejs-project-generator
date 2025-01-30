# NodeJS Project Generator

A CLI tool to generate a Node.js project with a custom architecture using Express and Prisma. The generated project follows domain-driven design (DDD) principles and Clean Architecture patterns, ensuring maintainability, scalability, and testability.

## Features

- **Custom Architecture**: Generates a project structure based on domain-driven design (DDD) and Clean Architecture principles.
- **Express Integration**: Pre-configured with Express for building web applications.
- **Prisma ORM**: Integrates Prisma as an ORM for database interactions.
- **Essential Middleware**: Includes essential middleware like Helmet for security and Winston for logging.
- **Error Handling**: Provides centralized error handling.
- **Environment Configuration**: Manages environment variables using dotenv.
- **Testing Setup**: Sets up unit, integration, and end-to-end testing directories.
- **Code Quality Tools**: Includes ESLint and Prettier for code quality and consistent formatting.

## Project Structure

The generated project follows this directory structure:

```plaintext
my-app/
├── src/
│   ├── application/                    //Handles business logic orchestration.
│   │   ├── services/
│   │   └── useCases/
│   ├── domain/                         //Contains core business logic and concepts.
│   │   ├── entities/
│   │   ├── repositories/
│   │   └── valueObjects/
│   ├── infrastructure/                 //Manages external dependencies and implementations of interfaces defined in other layers.
│   │   ├── config/
│   │   ├── database/
│   │   │   └── prismaClient.js
│   │   ├── http/
│   │   ├── logging/
│   │   │   └── logger.js
│   │   └── repositories/
│   ├── interfaces/                    //Defines how the outside world interacts with your application.
│   │   ├── controllers/
│   │   ├── dtos/
│   │   ├── middleware/
│   │   │   └── errorHandler.js
│   │   ├── routes/
│   │   │   └── index.js
│   │   └── validators/
│   └── utils/                         //Utility functions and classes.
│       ├── errors/
│       │   └── AppError.js
│       └── helpers/
├── tests/                             //The project includes directories for unit, integration, and end-to-end tests.
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .env
├── .env.example
├── .eslintrc.js
├── .prettierrc
├── package.json
├── README.md
└── index.js
```

## Getting Started

### Prerequisites

- Node.js >= 20.X
- npm or yarn or pnpm

### Installation

1. install the generator globally

   ```bash
   npm install -g nodejs-project-generator
    ```

2. Generate a new project

    ```bash
    npx create-nodejs-project
    ```

3. follow the prompt to enter the project name and description

## Next Steps

after generating the project, follow these steps to set it up:

1. Navigate to the project directory

   ```bash
   cd <project-name>
   ```

2. Navigate to the project directory

   ```bash
   npm install
   ```

3. Generate Prisma Client

   after modifing the schema.prisma file and DATA_BASE_URL use this command

    ```bash
    npx prisma generate
    ```

4. Start the server

   ```bash
   npm start
   ```

   Alternatively, for development purposes, you can use:

    ```bash
   npm run dev
   ```

## Running Migrations

to apply migrations to your database run :

```bash
npx prisma migrate dev --name init
```

## Using Prisma Studio

```bash
npx prisma studio
```

## Project Architecture

### Domain Layer

Contains core business logic and concepts.

- **Entities**: Represents core business objects and their behavior.
- **Repositories**: Interfaces for data access.
- **Value Objects**: Immutable objects representing values or concepts within the domain.

### Application Layer

Handles business logic orchestration.

- **Services**: Business services that coordinate domain logic and infrastructure concerns.
- **Use Cases**: Specific workflows supported by the application.

### Infrastructure Layer

Manages external dependencies and implementations of interfaces defined in other layers.

- **Config**: Configuration files for various environments.
- **Database**: Database connection setup, migrations, etc.
- **HTTP**: HTTP clients or utilities.
- **Logging**: Logging utilities.
- **Repositories**: Implementations of repository interfaces defined in the domain layer.

### Interfaces Layer

Defines how the outside world interacts with your application.

- **Controllers**: Handle incoming HTTP requests, delegate work to the application layer, and return responses.
- **DTOs**: Data Transfer Objects used to transfer data between layers.
- **Middleware**: Centralized middleware such as authentication, authorization, and error handling.
- **Routes**: Define routing logic for API endpoints.
- **Validators**: Validation logic for incoming requests.

### Utilities Layer

Utility functions and classes.

- **Errors**: Custom error classes for better error handling.
- **Helpers**: General-purpose helper functions.

## Testing

The project includes directories for unit, integration, and end-to-end tests. You can add your test cases in these directories:

- `tests/unit/`
- `tests/integration/`
- `tests/e2e/`

## Code Quality

The project includes ESLint and Prettier for maintaining code quality and consistent formatting.

- **ESLint**: Lints your JavaScript code.
- **Prettier**: Formats your code according to predefined rules.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Troubleshooting

### Common Issues

#### Prisma Client Not Initialized

if you encounter the following error:

```plaintext
@prisma/client did not initialize yet. Please run "prisma generate" and try to import it again.
```

Run the following command to generate the Prisma client:

```bash
npx prisma generate
```

#### Missing `.env` File

Ensure that the `.env` file exists and contains the correct database connection string. Update the `.env` file with the appropriate credentials.

Example `.env`content:

```plaintext
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
```

## Support

if you have any questions or need assistance, feel free to open an issue on Github.
