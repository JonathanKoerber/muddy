### Set up your Backend Assessments Postgres DB 

Build the Docker image from the DBDocker file. You will need to have docker running for this to work. This will create assessment_db so that the django app will connect with it. 

```
docker build -t muddy-db-image -f DBDockerfile .
```
Create and start the container. W
```
docker run --name muddy-container -d -p 5432:5432 -v postgres:/var/lib/postgresql/data muddy-db-image
postgres
```

Double check that it is runnig by running this command and checking that the container is working: 

```
docker ps
```

If you see muddy-db-image then try to signin. 

```
psql -h localhost -U AB_user -d assessment_db -W
```
