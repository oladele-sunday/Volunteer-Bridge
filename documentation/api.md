## Base end points

GET https://volunteer-bridge-3.onrender.com

# JSON Output

{
"message": "Welcome to VolunteerBridge API",
"status": "running",
"version": "1.0.0"
}

## Register

# request

POST https://volunteer-bridge-3.onrender.com/api/auth/register

raw JSON

{
"name":"John Bull",
"email":"johnbull@example.com",
"password":"12345698"

}

# Output

JSON

{
"message": "User registered successfully",
"user": {
"isActive": true,
"isVerified": false,
"role": "volunteer",
"id": 4,
"name": "John Bull",
"email": "johnbull@example.com",
"updatedAt": "2026-03-11T20:54:28.720Z",
"createdAt": "2026-03-11T20:54:28.720Z"
}
}

## Log in

POST https://volunteer-bridge-3.onrender.com/api/auth/login

# Request

raw JSON body

{
"email":"johnhoe@example.com",
"password":"12345698"
}

# Response:

JSON

{
"message": "Login successful",
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc3MzI2MjcwNiwiZXhwIjoxNzc1ODU0NzA2fQ.1xa8pZOryvgTIufYb6_uF8p5hsqXk3oC-xLaEQ-NYhY",
"user": {
"id": 1,
"name": "John Hoe",
"email": "johnhoe@example.com",
"phone_number": null,
"isActive": true,
"isVerified": false,
"role": "volunteer",
"resetTokenExpiry": null,
"lastLogin": "2026-03-11T20:58:26.357Z",
"createdAt": "2026-03-10T15:52:28.000Z",
"updatedAt": "2026-03-11T20:58:26.358Z"
}
}

## LOGIN another user

POST https://volunteer-bridge-3.onrender.com/api/auth/register

raw JSON
request

{
"email":"johnbull@example.com",
"password":"12345698"

}

# response:

{
"message": "Login successful",
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTc3MzI2MzA0MywiZXhwIjoxNzc1ODU1MDQzfQ.eFmQohsPKQyeLQhhBEe1TOm8-h0jcgHGMAoFnYyVA74",
"user": {
"id": 4,
"name": "John Bull",
"email": "johnbull@example.com",
"phone_number": null,
"isActive": true,
"isVerified": false,
"role": "volunteer",
"resetTokenExpiry": null,
"lastLogin": "2026-03-11T21:04:03.348Z",
"createdAt": "2026-03-11T20:54:28.000Z",
"updatedAt": "2026-03-11T21:04:03.348Z"
}
}

## Register Admin

POST API https://volunteer-bridge-3.onrender.com/api/auth/register

# request

# raw JSON

{
"name": "Sunday Oluwasegun",
"email":"sundayo@example.com",
"password":"12345698@",
"role": "admin"
}

# Response

body JSON

{
"message": "User registered successfully",
"user": {
"isActive": true,
"isVerified": false,
"id": 4,
"name": "Sunday Oluwasegun",
"email": "sundayo@example.com",
"phone_number": null,
"role": "admin",
"updatedAt": "2026-03-17T14:14:35.426Z",
"createdAt": "2026-03-17T14:14:35.426Z",
"resetTokenExpiry": null,
"lastLogin": null
}
}
}

## Admin log-in

api
POST https://volunteer-bridge-3.onrender.com/api/auth/login
body
raw JSON
Request

{
"email":"sundayo@example.com",
"password":"12345698@"  
}

Response

{
"message": "Login successful",
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTc3MzQzMzk2NywiZXhwIjoxNzc2MDI1OTY3fQ.HcYx2L6TdLsq3za7wDtdbBg9hlmb_aFRiIF2U5MQU48",
"user": {
"id": 5,
"name": "Sunday Oluwasegun",
"email": "sundayo@example.com",
"phone_number": null,
"isActive": true,
"isVerified": false,
"role": "volunteer",
"resetTokenExpiry": null,
"lastLogin": "2026-03-13T20:32:47.033Z",
"createdAt": "2026-03-12T13:57:28.000Z",
"updatedAt": "2026-03-13T20:32:47.037Z"
}
}

## Create Project

Api https://volunteer-bridge-3.onrender.com/api/projects
POST

# request

- authorization Bearer token inputed
  body
  raw JSON
  {
  "name":"Food Distribution to less privileged",
  "description": "Distribution of 10 bags of in small bags of 2kg",
  "start_date": "2026-04-01",
  "end_date": "2026-04-01",
  "status": "active"

}

# response

{{
"success": true,
"message": "Project created successfully",
"data": {
"id": 1,
"name": "Food Distribution to less privileged",
"description": "Distribution of 10 bags of in small bags of 2kg",
"startDate": null,
"endDate": null,
"status": "active",
"createdBy": 3,
"updatedAt": "2026-03-17T14:28:07.181Z",
"createdAt": "2026-03-17T14:28:07.181Z"
}
}

## Fetched Project

# api

- GET https://volunteer-bridge-3.onrender.com/api/projects

# request

Token inputed on Authorization : Bearer Token
body blank
response:

{
"success": true,
"message": "Projects fetched successfully",
"data": [
{
"id": 1,
"name": "Food Distribution to less privileged",
"description": "Distribution of 10 bags of in small bags of 2kg",
"startDate": null,
"endDate": null,
"status": "active",
"createdBy": 5,
"createdAt": "2026-03-13T20:36:52.000Z",
"updatedAt": "2026-03-13T20:36:52.000Z"
}
]
}

## Create task for project

POST https://volunteer-bridge-3.onrender.com/api/tasks/projects/1/tasks

# request

Body
raw JSON

{
"title": "Food Distribution to less privileged",
"description": "Handle 5 bags",
"dueDate": "2026-04-01",
"estimatedHours": 5,
"status": "pending"
}

# Response

{
"success": true,
"message": "Task created successfully",
"data": {
"id": 1,
"projectId": "1",
"title": "Food Distribution to less privileged",
"description": "Handle 5 bags",
"dueDate": "2026-04-01T00:00:00.000Z",
"estimatedHours": 5,
"status": "pending",
"createdBy": 5,
"updatedAt": "2026-03-13T20:59:47.785Z",
"createdAt": "2026-03-13T20:59:47.785Z"
}
}

## Fetch Task

# api

GET https://volunteer-bridge-3.onrender.com/api/tasks/projects/1/tasks

# request

Body blank

# Response:

{
"success": true,
"message": "Project tasks fetched successfully",
"data": [
{
"id": 1,
"projectId": 1,
"title": "Food Distribution to less privileged",
"description": "Handle 5 bags",
"dueDate": "2026-04-01T00:00:00.000Z",
"estimatedHours": 5,
"status": "pending",
"createdBy": 5,
"assignedTo": null,
"createdAt": "2026-03-13T20:59:47.000Z",
"updatedAt": "2026-03-13T20:59:47.000Z",
"project_id": 1
}
]
}

## Assign Task

# Api

https://volunteer-bridge-3.onrender.com/api/tasks/1/assign

# authorization input bearer token from volunteer

body
raw JSON

# Request:

{
"userId":1

}

# Response

{
"success": true,
"message": "Task assigned and notification created",
"data": {
"id": 1,
"projectId": 1,
"title": "Food Distribution to less privileged",
"description": "Handle 5 bags",
"dueDate": "2026-04-01T00:00:00.000Z",
"estimatedHours": 5,
"status": "pending",
"createdBy": 5,
"assignedTo": 1,
"createdAt": "2026-03-13T20:59:47.000Z",
"updatedAt": "2026-03-14T11:43:41.020Z",
"project_id": 1
}
}

## SEND REPORT

# api

https://volunteer-bridge-3.onrender.com/api/reports

body
raw JSON

# request

{
"title": "Food Distribution to less privileged",
"content": "five bags given to 125 people, names are listed on the excel sheet, will be sent via mail",
"userId": "1",
"projectId": 1,
"taskId": "1"
}

# Response

{
"success": true,
"data": {
"status": "draft",
"id": 1,
"title": "Food Distribution to less privileged",
"content": "five bags given to 125 people, names are listed on the excel sheet, will be sent via mail",
"userId": 1,
"projectId": 1,
"taskId": "1",
"updatedAt": "2026-03-14T11:59:59.128Z",
"createdAt": "2026-03-14T11:59:59.128Z"
}
}

## Get Report

api
GET
https://volunteer-bridge-3.onrender.com/api/reports/user/1

# Request

Body
raw JSON
{
"userId": "1"  
}

# Response

{
"success": true,
"data": [
{
"id": 1,
"userId": 1,
"projectId": 1,
"taskId": 1,
"title": "Food Distribution to less privileged",
"content": "five bags given to 125 people, names are listed on the excel sheet, will be sent via mail",
"status": "draft",
"createdAt": "2026-03-14T11:59:59.000Z",
"updatedAt": "2026-03-14T11:59:59.000Z",
"user_id": 1,
"project_id": 1,
"project": {
"id": 1,
"name": "Food Distribution to less privileged"
}
}
]
}

## Get Project Report

api
https://volunteer-bridge-3.onrender.com/api/reports/project/1

Request
raw JSON
{
"projectId": "1"
}

# Response

{
"success": true,
"data": [
{
"id": 1,
"userId": 1,
"projectId": 1,
"taskId": 1,
"title": "Food Distribution to less privileged",
"content": "five bags given to 125 people, names are listed on the excel sheet, will be sent via mail",
"status": "draft",
"createdAt": "2026-03-14T11:59:59.000Z",
"updatedAt": "2026-03-14T11:59:59.000Z",
"user_id": 1,
"project_id": 1,
"reportsOwner": {
"id": 1,
"name": "John Hoe",
"email": "johnhoe@example.com"
}
}
]
}

## Update Task Status

# api http://localhost:5000/api/tasks/1/status

# Authorization input bearer token from login

# request

body
raw JSON

{
"status":"done"
}

# Response

{
"success": true,
"message": "Task status updated successfully",
"data": {
"id": 1,
"projectId": 1,
"title": "Food Distribution to less privileged",
"description": "Handle 5 bags",
"dueDate": "2026-04-01T00:00:00.000Z",
"estimatedHours": 5,
"status": "done",
"createdBy": 5,
"assignedTo": 1,
"createdAt": "2026-03-13T20:59:47.000Z",
"updatedAt": "2026-03-14T14:28:59.269Z",
"project_id": 1
}
}

## create donation

# Request

body
raw JSON

{
"report_id": 1,
"amount": 5000,
"paymentMethod": "bank_transfer",
"status": "pending"
}
Response

{
"message": "Donation created successfully",
"paymentInstruction": "Transfer to NGO Account: Bank: XYZ Bank, Account No: 1234567890",
"donation": {
"id": 1,
"report_id": 1,
"amount": 5000,
"status": "pending",
"paymentMethod": "bank_transfer",
"updatedAt": "2026-03-15T18:03:21.456Z",
"createdAt": "2026-03-15T18:03:21.456Z"
}
}

## Create Donation Cash

https://volunteer-bridge-3.onrender.com/api/donations

# request

Body
raw JSON

{
"report_id": 1,
"amount": 5000,
"paymentMethod": "cash",
"status": "pending"
}

# Response

{
"message": "Donation created successfully",
"paymentInstruction": "Pay cash directly to the NGO office.",
"donation": {
"id": 2,
"report_id": 1,
"amount": 5000,
"status": "pending",
"paymentMethod": "cash",
"updatedAt": "2026-03-15T18:09:42.727Z",
"createdAt": "2026-03-15T18:09:42.727Z"
}
}

## fetched project

# POST API https://volunteer-bridge-3.onrender.com/api/projects

# Request

- Body
- raw json
  input token
  {
  "name":"Free medical Check up",
  "description": "Check Blood Sugar,Blood Pressure, MP and give drugs",
  "start_date": "2026-04-05",
  "end_date": "2026-04-10",
  "status": "active"

}

# response

{
"success": true,
"message": "Project created successfully",
"data": {
"id": 2,
"name": "Free medical Check up",
"description": "Check Blood Sugar,Blood Pressure, MP and give drugs",
"startDate": null,
"endDate": null,
"status": "active",
"createdBy": 3,
"updatedAt": "2026-03-17T14:42:15.623Z",
"createdAt": "2026-03-17T14:42:15.623Z"
}
}

## Register Volunteer

POST api https://volunteer-bridge-3.onrender.com/api/auth/register
body
raw JSON
{
"name":"John Great",
"email":"johngreat@example.com",
"password":"123456987",
"role":"volunteer"

}

Response
{
"message": "User registered successfully",
"user": {
"isActive": true,
"isVerified": false,
"id": 7,
"name": "John Great",
"email": "johngreat@example.com",
"phone_number": null,
"role": "volunteer",
"updatedAt": "2026-03-19T06:58:15.645Z",
"createdAt": "2026-03-19T06:58:15.645Z",
"resetTokenExpiry": null,
"lastLogin": null
}
}

## volunteer log in

POST api https://volunteer-bridge-3.onrender.com/api/auth/login
body
raw JSON
{
"email":"johngreat@example.com",
"password":"123456987"

}

response
{
"message": "Login successful",
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImlhdCI6MTc3MzkwNDE5MywiZXhwIjoxNzc2NDk2MTkzfQ.suyQVOLY2nGHR0ASwdS64_FUj9K3BL3lL-JYuLs_aYw",
"user": {
"id": 7,
"name": "John Great",
"email": "johngreat@example.com",
"phone_number": null,
"isActive": true,
"isVerified": false,
"role": "volunteer",
"resetTokenExpiry": null,
"lastLogin": "2026-03-19T07:09:53.044Z",
"createdAt": "2026-03-19T06:58:15.645Z",
"updatedAt": "2026-03-19T07:09:53.044Z"
}
}

## create a volunteer

# api http://localhost:5000/api/volunteers

body
raw JSON
{
"userId": 1,
"skills": "Teaching",
"availability": "active",
"status": "active"
}

# Response

{
"id": 3,
"userId": 1,
"skills": "Teaching",
"availability": "active",
"status": "active",
"updatedAt": "2026-03-19T15:55:33.762Z",
"createdAt": "2026-03-19T15:55:33.762Z"
}

## Get all volunteers(admins with log in token)

# api http://localhost:5000/api/volunteers

body blank
authorization token

response

[
{
"id": 3,
"userId": 1,
"skills": "Teaching",
"availability": "active",
"status": "active",
"createdAt": "2026-03-19T15:55:33.762Z",
"updatedAt": "2026-03-19T15:55:33.762Z",
"user_id": 1
}
]

## Update Volunteer Profile

api
body
raw JSON
{
"userId": 3,
"skills": "Software Engineer",
"availability": "available",
"status": "active"
}

# Response

{
"id": 3,
"userId": 1,
"skills": "Software Engineer",
"availability": "available",
"status": "active",
"createdAt": "2026-03-19T15:55:33.762Z",
"updatedAt": "2026-03-19T18:04:00.488Z",
"user_id": 1
}
