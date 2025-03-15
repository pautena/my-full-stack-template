# Environment

1Password is the tool used to store the environment variables of the project.

- **Set a new variable in the `.env` file**: To set a new variable, open the `.env` file in your project directory and add a new line with the variable name and a reference to the 1Password variable that stores that value. If you want you can use plain text, but it's better this to keep all variables organized.

You can directly create the variable inside the 1Passowrd item, or use a section to differentiate between environments.

```
op://Environments/{project_name}/{variable_name}
op://Environments/{project_name}/$ENVIRONMENT/{variable_name}
```
