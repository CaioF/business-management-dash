# business-management-dash

Running:

Use the Make directive to run the container:

```
make up
```

Or build as specified by the Dockerfile

```
docker build -t business-dash-joe:1 .
```

And run the Docker image:

```
docker run -p 3000:3000 business-dash-joe:1
```

Access `localhost:3000` to see the app running