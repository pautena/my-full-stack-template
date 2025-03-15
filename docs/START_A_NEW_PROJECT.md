# Start a new project

This repository supports generating a new project using [Copier](https://copier.readthedocs.io).

It will copy all the files, ask you configuration questions, and update the `.env` files with your answers.

## Install Copier

You can install Copier with:

```bash
pip install copier
```

Or better, if you have [`pipx`](https://pipx.pypa.io/), you can run it with:

```bash
pipx install copier
```

**Note**: If you have `pipx`, installing copier is optional, you could run it directly.

## Generate a Project With Copier

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


Enter into the new directory:

```bash
cd my-full-stack
```

## Set the Git repository

Set the new origin to your new repository, copy it from the GitHub interface, for example:

```bash
git remote set-url origin git@github.com:octocat/my-new-project.git
```

Add this repo as another "remote" to allow you to get updates later:

```bash
git remote add upstream git@github.com:pautena/my-full-stack-template.git
```

Push the code to your new repository:

```bash
git push -u origin master
```

## Input Variables

Copier will ask you for some data, you might want to have at hand before generating the project.

But don't worry, you can just update any of that in the 1Password environment file.

The input variables, with their default values (some auto generated) are:

- `project_name`: (default: `"FastAPI Project"`) The name of the project, shown to API users (in .env).

## Environment variables

1. Create a new environment item in 1Password. Use `Environments/{project_name}` to keep everything organized. Use the `Environments/My Full Stack Template` item as an example.


2. Replace in the `.env` file the project name where necessary.
