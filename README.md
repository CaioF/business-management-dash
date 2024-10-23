# business-management-dash

This is a sample application of a business management dashboard using next js on
the front end and node js on the back end.

This project has a docker-compose.yaml file with a set of containers used for
development as well as a Makefile with directives for convenience.

Running:

Use the Make directive to run the container:

```
make up
make reset-db
```

Access `localhost:3000/dashboard` to see the app running.

Tests:

There are unit tests runnable with `make tests` and API tests using [Hurl HTTP](https://hurl.dev/). Hurl provides testing like Postman, but with a much friendlier file
format. To execute the tests, run `make hurl-tests`.

Extra features:
- User impersonation (better for testing filters)
- Users have roles (Admins can access all businesses)
- Cities include State name

There is some room for improvement for this project, namely:
- Configs from environment variables
- Better error handling
- Logs and metrics
- Integration between front end and back end currently uses the exposed 3001 port, the front end should talk to the back end over the Docker container network
- Better page design
- More list features (better pagination, sorting options, etc.)