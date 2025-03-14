# Full Stack FastAPI Template

## Disclaimer


This project is a fork from [https://github.com/pautena/my-full-stack-template.git](https://github.com/pautena/my-full-stack-template.git) but customized with my own stack of technologies. It is not intended to be used as a template for everyone, but feel free to cherry-pick any features that interest you.

## Technology Stack and Features

- ⚡ [**FastAPI**](https://fastapi.tiangolo.com) for the Python backend API.
    - 🧰 [SQLModel](https://sqlmodel.tiangolo.com) for the Python SQL database interactions (ORM).
    - 🔍 [Pydantic](https://docs.pydantic.dev), used by FastAPI, for the data validation and settings management.
    - 💾 [PostgreSQL](https://www.postgresql.org) as the SQL database.
- 🚀 [React](https://react.dev) for the frontend.
    - 💃 Using TypeScript, hooks, Vite, and other parts of a modern frontend stack.
    - 🎨 [Chakra UI](https://chakra-ui.com) for the frontend components.
    - 🤖 An automatically generated frontend client.
    - 🧪 [Playwright](https://playwright.dev) for End-to-End testing.
    - 🦇 Dark mode support.
- 🐋 [Docker Compose](https://www.docker.com) for development and production.
- 🔒 Secure password hashing by default.
- 🔑 JWT (JSON Web Token) authentication.
- 📫 Email based password recovery.
- ✅ Tests with [Pytest](https://pytest.org).
- 📞 [Traefik](https://traefik.io) as a reverse proxy / load balancer.
- 🚢 Deployment instructions using Docker Compose, including how to set up a frontend Traefik proxy to handle automatic HTTPS certificates.
- 🏭 CI (continuous integration) and CD (continuous deployment) based on GitHub Actions.

## How To Use It

This repository supports generating a new project using [Copier](https://copier.readthedocs.io).

It will copy all the files, ask you configuration questions, and update the `.env` files with your answers.

### Install Copier

You can install Copier with:

```bash
pip install copier
```

Or better, if you have [`pipx`](https://pipx.pypa.io/), you can run it with:

```bash
pipx install copier
```

**Note**: If you have `pipx`, installing copier is optional, you could run it directly.

### Generate a Project With Copier

Decide a name for your new project's directory, you will use it below. For example, `my-awesome-project`.

Go to the directory that will be the parent of your project, and run the command with your project's name:

```bash
copier copy https://github.com/pautena/my-full-stack-template.git my-awesome-project --trust
```

If you have `pipx` and you didn't install `copier`, you can run it directly:

```bash
pipx run copier copy https://github.com/pautena/my-full-stack-template.git my-awesome-project --trust
```

**Note** the `--trust` option is necessary to be able to execute a [post-creation script](https://github.com/pautena/my-full-stack-template.git/blob/master/.copier/update_dotenv.py) that updates your `.env` files.

### Input Variables

Copier will ask you for some data, you might want to have at hand before generating the project.

But don't worry, you can just update any of that in the 1Password environment file.

The input variables, with their default values (some auto generated) are:

- `project_name`: (default: `"FastAPI Project"`) The name of the project, shown to API users (in .env).

### Environment variable

1. Create a new environment item in 1Password. Use `Environments/{project_name}` to keep everything organized. Use the `Environments/My Full Stack Template` item as an example.

```

```

2. Replace in the `.env` file the project name where necessary.


## Environment

1Password is the tool used to store the environment variables of the project. When a new project is created
a new file will be automatically created under your `Environments` vault with the `project_name` name.

## Environment

1Password is the tool used to store the environment variables of the project. When a new project is created
a new file will be automatically created under your `Environments` vault with the `project_name` name.

- **Set a new variable in the `.env` file**: To set a new variable, open the `.env` file in your project directory and add a new line with the variable name and a reference to the 1Password variable that stores that value. If you want you can use plain text, but it's better this to keep all variables organized.

You can directly create the variable inside the 1Passowrd item, or use a section to differentiate between environments.

```
op://Environments/{project_name}/{variable_name}
op://Environments/{project_name}/$ENVIRONMENT/{variable_name}
```

## Backend Development

Backend docs: [backend/README.md](./backend/README.md).

## Frontend Development

Frontend docs: [frontend/README.md](./frontend/README.md).

## Deployment

Deployment docs: [deployment.md](./deployment.md).

## Development

General development docs: [development.md](./development.md).

This includes using Docker Compose, custom local domains, `.env` configurations, etc.

## Release Notes

Check the file [release-notes.md](./release-notes.md).

## License

The Full Stack FastAPI Template is licensed under the terms of the MIT license.
