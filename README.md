## HireQuotient-Assignment Documentation ##

## Introduction:
This documentation provides a guide on setting up and using the backend system,
showcasing its features including user authentication, MongoDB integration, and 
RESTful APIs for user profile management, post creation and retrieval, and a 
commenting system.


## Prerequisites:
Node.js and npm installed.

MongoDB installed and running.

Internet connection for package installation.


## Setup:
1.) Initialization of project using npm init.

2.) Installation of NPM packages which are bcrypt, cloudinary, cookie-parser, dotenv, express, 
express-fileupload, jsonwebtoken, mongoose, nodemon.

3.) Creation of Server on PORT=4000.

4.) Setting up database using MongoDB.

5.) Creation of Model Schema using Mongoose. 

6.) Creation of Routes, Controller, Validator. Routes contain all API Endpoints. Validator acts as gatekeeper 
to test if input fields are present or in correct manner. Controller contains the main business logic for a 
particular API.

7.) Creation of checkAuth. It act as middleware inorder to check if the current user whose trying to access 
a featue is authenticated or not. JWT is used to authenticate user.

8.) Cookies are used in order to store jsonwebtoken.

9.) Cloudinary Platform is used inorder to store images on cloud storage.

10.) dotenv file is used to store the sensitive information which are PORT, Database URL, JWT Secret key,
Cloudinary credentials.


## API Endpoints:

1.) Create User:

• Endpoint - `/api/v2/create-user`

• Method - POST

• It is used to create a new user. During this process, bcrypt package is used inorder to hash passowrd.
After successful creation of user, jwt will be created and stored in cookies.


2.) Login User

• Endpoint - `/api/v2/login`

• Method - POST

• It is used to authenticate user by matching email, password with database. After successful login, jwt will 
be created and stored in cookies.


3.) Logout User

• Endpoint - `/api/v2/logout`

• Method - GET

• It is used to make user not authenticated by removing token from cookies.


4.) Update User

• Endpoint - `/api/v2/me/update`

• Method - PUT

• It is used to update the user info who is authenticated.


5.) Get All Users

• Endpoint - `/api/v2/all-users`

• Method - GET

• It is used to get all users from database.


6.) Get Single User

• Endpoint - `/api/v2/user/:id`

• Method - GET

• It is used to get a single user associated with Id from database.


7.) Create Post

• Endpoint - `/api/v2/create-post`

• Method - POST

• It is used to create a post for a user who is authenticated.


8.) Get All Posts

• Endpoint - `/api/v2/posts`

• Method - GET

• It is used to get all posts present in database.


9.) Get Single Post

• Endpoint - `/api/v2/post/:id`

• Method - GET

• It is used to get a single post associated with Id.


10.) Create Comment

• Endpoint - `/api/v2/create-comment/:id`

• Method - POST

• It is used to create a comment on any user's post. And those comments will going to be store in database with 
information about the user who comment on it.


11.) Get Myself Posts

• Endpoint - `/api/v2/me/posts`

• Method - GET

• It is used get all the posts of user who is authenticated.


## Error Handling and Logging
• Comprehensive error handling is implemented throughout the backend. The responses include appropriate error codes
and messages for easy debugging.

• Logging is implemented to capture key events and errors.
