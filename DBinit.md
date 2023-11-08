### Set up your Backend Assessments Postgres DB 

Build the Docker image from the DBDocker file. You will need to have docker running for this to work.

```
docker build -t muddy-db-image -f DBDockerfile .
```

Double check that it is runnig by running this command and checking that the container is working: 

```
docker ps
```

If you see muddy-db-image then try to signin. 

```
psql -h localhost -U AB_user -d assessment_db -W
```
