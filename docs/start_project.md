# Start a new project

## Step 1. Option A. Start a new project using Git

To create a new project using git do the following:

- Create a new GitHub repo, for example `my-full-stack`.
- Clone this repository manually, set the name with the name of the project you want to use, for example `my-full-stack`:

```bash
git clone git@github.com:pautena/my-full-stack-template.git my-full-stack
```

- Enter into the new directory:

```bash
cd my-full-stack
```

- Set the new origin to your new repository, copy it from the GitHub interface, for example:

```bash
git remote set-url origin git@github.com:octocat/my-full-stack.git
```

- Add this repo as another "remote" to allow you to get updates later:

```bash
git remote add upstream git@github.com:pautena/my-full-stack-template.git
```

- Push the code to your new repository:

```bash
git push -u origin master
```


## Step 1. Option B. Start a new project with Copier

This repository supports generating a new project using [Copier](https://copier.readthedocs.io).

It will copy all the files, ask you configuration questions, and update the `.env` files with your answers.

### Create it Copier

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


Enter into the new directory:

```bash
cd my-full-stack
```

### Set the Git repository

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

### Input Variables

Copier will ask you for some data, you might want to have at hand before generating the project.

But don't worry, you can just update any of that in the 1Password environment file.

The input variables, with their default values (some auto generated) are:

- `project_name`: (default: `"FastAPI Project"`) The name of the project, shown to API users (in .env).

## Step 2. Environment variables

1. Create a new environment item in 1Password. Use `Environments/{project_name}` to keep everything organized. Use the `Environments/My Full Stack Template` item as an example.


2. Replace in the `.env` file `My Full-Stack Template` for the project name where necessary.

## Step 3. Setup the deployment

### Github Action Runner

Follow the [./deployment.md] guide to install and start a Github Action Runner for this project.

### Github Actions secrets

To enable the Github Action to access the 1Password item with the environment you have to set a secret named `OP_SERVICE_ACCOUNT_TOKEN` with a token from a 1Password service account with access to the vault that has the item.

### Update Github Actions

You need to set the correct `env.PROJECT_NAME` in two workflows:
- `deploy-staging.yml`: `{project_name}-staging`
- `deploy-production.yml`: `{project_name}-production`


## Update From the Original Template

After cloning the repository, and after doing changes, you might want to get the latest changes from this original template.

    Make sure you added the original repository as a remote, you can check it with:

git remote -v

origin    git@github.com:octocat/my-full-stack.git (fetch)
origin    git@github.com:octocat/my-full-stack.git (push)
upstream    git@github.com:fastapi/full-stack-fastapi-template.git (fetch)
upstream    git@github.com:fastapi/full-stack-fastapi-template.git (push)

    Pull the latest changes without merging:

git pull --no-commit upstream master

This will download the latest changes from this template without committing them, that way you can check everything is right before committing.

    If there are conflicts, solve them in your editor.

    Once you are done, commit the changes:

git merge --continue
