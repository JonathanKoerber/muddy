###


### Requirement Analysis of Math Buddy.

#### **Functional Requirements:**

Math Buddy is an AI-powered one-on-one tutor that assists students with their homework assignments. Students can take a photo of a homework assignment and then complete the assignment on a mobile device. As the student progresses through the assignment, they can get helpful explanations of their work, and the application will identify the student's knowledge and provide assistance and tailored hints and iterative examples. The app will focus on elementary math learning assistance students working on arithmetic.

- **User Authentication:**
  - Users can create accounts and log in securely.

    - If the student is a minor, they would need a parent.
    - Sign into their account.

- **Assignment Creation:**
  - Users can take a picture of a paper math assignment.

    - The app converts the image to editable text.
    - Users can use the application to create practice assignments from past work.
    - The application keeps track of students' progress.

- **Text Editing:**
  - Users can write, edit, and annotate the converted text (mathematical work in this case).

    - The application will provide interactive lessons.
    - Each assignment will be processed into text. To reduce storage and be able to send to the LLm.
    - Users can take a picture of a paper math assignment.
    - The app converts the image to editable text.
    - Users can use the application to create practice assignments from past work.
    - The application keeps track of students' progress.

- **Integration with LLM:**

  - The app can connect to the Learning Management System (LLM) to provide feedback on assignments.
  - Because this will target younger students data need to be kept secure.
  - This will require a lot of prompt endearing.
  - Create scripts for early education to teach fundamental content
  - Th user is able to turn off the tutoring function.
  - Provide context on the students over all progress.

- **Assignment Management:**
  - Users can save and manage their assignments.

    - Assignments should be organized by subject and topic.
    - Students can delete their assignments, but the question data will not be guaranteed to be deleted. No student was associated with any question data.
    - Assignments will be used to create lesson plans.
    - Assignment questions and the data from the instruction will be used to fine-tune the LLM model.

**Non Functional Requirements**

Non-functional requirements define the quality attributes of the app. Given your project, some non-functional requirements could include:

- **Performance:**
  - The app should load quickly and be responsive.
  - Images will be processed in the back end.
  - Assignments will be processed in the front end.
- **Security:**
  - User data and assignments should be securely stored and transmitted.
  - This app will target younger users making security very important.
- **Usability:**
  - The app should have an intuitive interface and be easy to use, especially for students.
  - The assignments need to be able quickly be able to gauge the level of proficiency and adjust there feed back accordingly.
  - Users an "break the parts" in to smaller parts by slashing across the screen.
  - The LLM responses need to adapt to how comfortable the user is in the subject.
  - We will need to explore how to access the LLM.
  - LLM rate each question difficulty and stor in vector db for doing data stuff with. Maybe? This is most likely out of the scope of the project.
- **Scalability:**
  - The system should handle a growing number of users and assignments without performance degradation.
  - The architecture of the application will be build with scalability in mind.
  - Build in a CI/CD development style using industry best practice.
  - To handle the potential load the backbend will be build using Django.

**Use Cases And User Stories**

Use cases help understand the interactions between users and the system. User stories provide a detailed description from an end user's perspective.

**Use Case: Assignment Creation**

**User Story**** : **** As a Student, I want to create a new assignment by taking a picture of my paper math assignment so that I can easily work on it digitally.**

- _Actors:_ User
- _Description:_ The user takes a picture of a math assignment using the app, and the app converts the image to editable text.
- _Preconditions:_ User is logged in and has access to the assignment creation feature.
- _Steps:_
  - User opens the app and goes to the assignment creation screen.
  - User selects the option to take a picture.
  - User captures an image of the assignment using the device's camera.
  - The app processes the image and converts it to editable text.
  - The app displays the converted text to the user.

**User Story**** : As a Student, I want to create a new assignment. I am struggling in curtain areas and don't not understand some of the concepts that are covered in the assignment. As I go though the assignment I may need help understanding some of the concepts. I may request to have help with some of the questions.**

**Use Case: Assignment Creation**

_Actors:_ User

- _Description:_ The user takes a picture of a math assignment using the app, and the app converts the image to editable text. Turns of active tutoring.
- _Preconditions:_ User is logged in and has access to the assignment creation feature.
- _Steps:_
  - User opens the app and goes to the assignment creation screen.
  - User selects the option to take a picture.
  - User captures an image of the assignment using the device's camera.
  - The app processes the image and converts it to editable text.
  - The app displays the home work on a editable screen to the user.
  - The user pencel to work on the screen.
  - The user attempts a question that they do not understand and the select a home work help button
  - the application breaks down to problem in to small enough bits that the users is satisfied with the explanation.

**User Story**** : **** As a Student, I want to check my knowledge by takin a random assortment of question that I had in the past. I select practice mode and the application and select between a time or a number of question. The application provides a practice problems based of my selection.**

- _Actors:_ User
- _Description:_ The user selects a practice mode says selects
- _Preconditions:_ User is logged in and has created content in the past and .
- _Steps:_
  - User opens the app and goes assessment screen.
  - User selects the option to do a 15 minute
  - The application create a mix of different question .
  - The app processes the image and converts it to editable text.
  - The app displays the converted text to the user.

#### Deliverables:

- **Must Haves**
  - Working React Native App.
    - SingIn/SingUp
    - CreateAssignment
    - TakeAssignment
    - AskForHeld
    - PractiveMode
    - Handwriting allalises
  - Working Back end Django server with database
    - Users Authenticate
    - Store users records

- **Prioritization:**
- **Must have:**
- **Should have:**
- **Could have:**
- **Won't have:**

**Development Ideas**

React Native is a natural choice to build the mobile app. The ecosystem is very large and it there is a lot of resources that help with rapid development. For a number of reasons the application will work with a back end that will be build python using Djando. Django is also a robust system and will help with

**Application Architecture:**

1. **Data ownership:**
2. **Define process ownership**

### React Native App (Frontend):

1. **UI/UX Design and Development:**
  - Design the user interface and user experience of the app using tools like Figma,
  - **Develop the app's frontend components, screens, and navigation.**

1. **Setting Up a React Native Project:**
  - Use the React Native CLI or Expo to set up a new React Native project.
  - Install necessary dependencies for the project, including navigation libraries, state management (e.g., Redux), and any other required packages.
  - Tensorflow js o implement handwriting recognition
  - React Native camera
  -
2. **Integration with Backend:**
  - Implement API calls using libraries like Axios or the Fetch API to communicate with the Django backend.
  - Define API endpoints and handle responses from the server.

1. **Authentication and User Management:**
  - Implement user authentication and user management features using JWT (JSON Web Tokens) or other authentication mechanisms supported by Django.

### Django Server (Backend):

1. **Setting Up a Django Project:**
  - Create a new Django project and define the necessary Django apps within the project.
2. **Models, Views, and Serializers:**
  - **create a class diagram. Used in figma**
  - Define models to represent the data structure (e.g., User, Assignment) in the database.
  - Create views to handle requests and process data.
  - Use serializes to convert complex data types to native Python data types and vice versa (e.g., JSON).
3. **API Endpoints:**
  - Implement API endpoints to allow the React Native app to interact with the server.
  - Define the appropriate HTTP methods (GET, POST, PUT, DELETE) for each API endpoint.
4. **Authentication and Authorization:**
  - Implement authentication using Django's authentication system or third-party libraries (e.g., Django REST framework's authentication classes).
  - Set up authorization rules to control access to various API endpoints based on user roles and permissions.
5. **Database Integration:**

- Configure the Django project to use a suitable database (e.g., PostgreSQL, MySQL).
- **Define database models and relationships based on the applications requirements**

1. **Testing.**
  - Both the front and back end will be tested. More research will need to go into this.

**Potential Pitfalls**

My preliminary research subject is that it will be possible to create and implement handwriting analyses within the React Native app. It may also be possible to do this for extracting text from the images of the assignments. Creating a custom model for either of these processes is outside this project's scope.

Additional research needs to go into the prompt engineering for using an LLM. I want to create a solution that can work with OpenAI, Anthropic, and Meta's models. The Anthropic Claude model may have advantages because much work has gone into safety research. At this stage in the project, I will try to use a free offering, but if the application is released, it would need to have a model that was in an isolated deployment and was only doing prediction.

### Other Possible Solutions:

While I could implement this project in many other ways, these tools make the most sense. This application will be built in modularity, communicating through APIs to allow the application to scale. Ultimately, I have chosen a technology stack that aligns with this project's goals and the team's capabilities, with consideration for long-term maintenance.

At this stage the this project is scoped more as a personal project and I would like to avoid using services that require contracts. If this project scales from a personal project and will start interacting with actual users the projects architecture will need to be evaluated. At this time the Mobile application will be developed and I would need to reconsider the choices that I have made here.

Chung, J. (2019, October 9). Handwriting recognition and language modeling with MXNet Gluon. _Apache MXNet_. [https://medium.com/apache-mxnet/handwriting-ocr-handwriting-recognition-and-language-modeling-with-mxnet-gluon-4c7165788c67](https://medium.com/apache-mxnet/handwriting-ocr-handwriting-recognition-and-language-modeling-with-mxnet-gluon-4c7165788c67)

Fernandez, A. (2018, May 4). _Getting started with React Native & Django authentication—Part 1_. [https://afdezl.github.io/post/authentication-react-native-django-1/](https://afdezl.github.io/post/authentication-react-native-django-1/)

Hajek, B. (2023). _Handwriting OCR_ [Jupyter Notebook]. [https://github.com/Breta01/handwriting-ocr](https://github.com/Breta01/handwriting-ocr) (Original work published 2017)

_Handwritten Text Recognition (OCR) with MXNet Gluon_. (2023). [Jupyter Notebook]. Amazon Web Services - Labs. [https://github.com/awslabs/handwritten-text-recognition-for-apache-mxnet](https://github.com/awslabs/handwritten-text-recognition-for-apache-mxnet) (Original work published 2019)

Ilam. (2023, August 9). _implementing offline handwriting recognition: Learn how to integrate libraries like tensorflow.js or ml kit to recognize handwritten text even without an internet connection. this can be useful for note-taking apps or forms that require manual input._ Devissuefixer. [https://devissuefixer.com/questions/reactnative-implementing-offline-handwriting-recognition-learn-how-to-integrate-libraries-like-tensorflowjs-or-ml-kit-to-recognize-handwritten-text-ev](https://devissuefixer.com/questions/reactnative-implementing-offline-handwriting-recognition-learn-how-to-integrate-libraries-like-tensorflowjs-or-ml-kit-to-recognize-handwritten-text-ev)

Płoński, P. (2020, October 27). _React Token Based Authentication to Django REST API Backend_. React and Django Tutorial. [https://saasitive.com/tutorial/react-token-based-authentication-django/](https://saasitive.com/tutorial/react-token-based-authentication-django/)

Scheidl, H. (2023). _Handwritten Text Recognition with TensorFlow_ [Python]. [https://github.com/githubharald/SimpleHTR](https://github.com/githubharald/SimpleHTR) (Original work published 2018)

Singal, V. (2022, July 4). Hugging Face AI Models 🤗—Model 1—TrOCR (Text Extraction from Images). _AI Trends_. [https://medium.com/ai-trends/hugging-face-ai-models-model-1-trocr-text-extraction-from-images-923cb246ee0a](https://medium.com/ai-trends/hugging-face-ai-models-model-1-trocr-text-extraction-from-images-923cb246ee0a)

_TensorFlow Lite API Reference_. (n.d.). TensorFlow. Retrieved October 7, 2023, from [https://www.tensorflow.org/lite/api\_docs](https://www.tensorflow.org/lite/api_docs)

_Testing React Native Apps with Cypress: Getting Started | Waldo Blog_. (n.d.). Retrieved October 7, 2023, from [https://www.waldo.com/blog/cypress-react-native-testing](https://www.waldo.com/blog/cypress-react-native-testing)