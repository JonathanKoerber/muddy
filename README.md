## MUDDY
### YOUR MATH BUDDY

Chithiraikkayalvizhi Chinnusami, Andre Neptune, Aarthi Ganesan, Jonathan Koerber 

CS624 Mobile Full Stack Development, MSCS, Seattle University 

#### Abstract:

At this project stage, our primary focus is outlining the minimum viable product (MVP) essential to meet the assignment requirements. To achieve this, we have strategically divided the project's features into distinct and logical vertical programming endeavors. Each team member takes responsibility for both the front-end and back-end development of their respective features. This approach allows us to work efficiently and ensures that each feature is developed with a dedicated focus. 

#### Requirnmets

* Docker
* node
* expo
* aws credentals 
#### Running The App

* Backend

Buld your docker containers 
* build container ```docker-compose build```
* run sercive ```docker-compose up```

Now, you need to configure the database schema. We'll do this with Django. While the service is running. Open a new terminal. First, we will create an interactive terminal in the Django service. 
* Create bash termnal`docker-compose exec -it django /bin/bash`
* Make migrations ```python manage.py makemigrations```
* Migrate ```python manage.py migrate```

Once this in done the database is ready to connect django.
If you have AWS Credentails configured you should be able to make request to Textrack. 

#### Front End

Navigate to /muddy-app in a new termal
* Run `npm install`
* Run `npx expo start`

To connect to the back end, you must find your IP address and add it to the constants file. If you use a tunnel, you can still connect to the back end backend by setting up [ngork](https://ngrok.com/) and creating a tunnel for the back end. The backend ip will need to be updated in the muddy/muddy-app/src/utils/constants.js file.