# User Service API Documentation 


## `/api/v1/user/register` Endpoint

### Description 

Register a new user by creating a user account with the given information

### HTTP Method 

`POST`

### Endpoint 

`/user/register`

### Request Body

The request body should be in JSON format and include

- `fullName` (string , required) : User's full name (min 6 characters)
- `branch` (string , required) : User's branch
- `email`  (string , required) : User's email
- `password` (string , required) : User's password (password must be at least 6 characters long)

### Example Response

- `success` (flag) : Show that is api is fullfilled or not
- `message` (message) :
    - `if user already exist with the provided email` : User already exist with this email
    - `if email is new` : User created successfully
- `user` (object) : Whole user details will come in these object




## `/api/v1/user/login` Endpoint

### Description 

login user through validating the provided information

### HTTP Method 

`POST`

### Endpoint 

`/user/login`

### Request Body

The request body should be in JSON format and include

- `email`  (string , required) : User's registered email address is required
- `password` (string , required) : User' registered password is required

### Example Response

#### If User Already Exist

- `success` (flag) : false
- `message` (message) : User doesn't exist with this email

#### If Invalid Password Entered

- `success` (flag) : false
- `message` (message) : Invalid credentials entered 

#### If All Details Is Correct Then User Will Be Logged In

- `success` (flag) : true
- `message` (message) : User logged in successfully
- `user` (object) : Whole user details will come in these user object
- `token` (string) : A String which contains user's info in encrypted format


## `/api/v1/user/logout` Endpoint

### Description 

logout user through validating the provided token in req headers

### HTTP Method 

`POST`

### Endpoint 

`/user/logout`

### Request Body

The request should contain the `token` in which user's encrypted info is there , Which is provided after login

### Example Response

- `success` (flag) : true
- `message` (message) : User logged out successfully


## `/api/v1/user/get-user-details` Endpoint

### Description 

Give user's all information 

### HTTP Method 

`GET`

### Endpoint 

`/user/get-user-details`

### Request Body

The request should contain the `token` in which user's encrypted info is there , Which is provided after login

### Example Response

- `success` (flag) : true
- `message` (message) : Successfully fetched user details
- `user` (object) : User object in which all user details are there
