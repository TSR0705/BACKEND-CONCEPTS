<h1 align="center">Backend Projects Collection 🚀</h1>
<p align="center"><a href="#project-description">Project Description</a> - <a href="#key-features">Key Features</a> - <a href="#technology-stack">Tech Stack</a></p>

## Project Description

Welcome to my collection of backend projects and demos! This repository showcases various Express.js applications, JWT authentication, MongoDB CRUD operations, and more. Each project is housed in its own folder with detailed instructions to help you run and explore them.

## 🔑Key Features 

*   **Modular Learning:** Each folder is a self‑contained project or exercise focusing on one core backend concept.
*   **JWT Authentication:** Hands‑on demos for issuing, storing, and verifying JSON Web Tokens in Express.
*   **File I/O Practice:** A mini “Task Manager” that writes and reads `.txt` files on the server from a simple frontend.
*   **MongoDB CRUD:** Two levels of MongoDB projects—one purely backend, one full‑stack with user cards.
*   **Rapid Iteration:** All servers start with `npx nodemon`, so changes reload instantly.
*   **Clear Documentation:** Every folder is covered in this  README, code snippets, and screenshot placeholders for visual guidance.

* * *



<h1 align="center">📂 Project's Details</h1>


# 1\.Backend Class Rough Work
<details>
  
## 🚀 What You’ll Learn
- Initializing a Node.js project and installing Express  
- Defining simple `app.get()` routes and sending responses  
- Running a local server with live reload (`nodemon`)

## 🔑 Key Features
- Organized folder structure for quick experimentation  
- Basic server setup (`index.js`/`app.js`) on `localhost:3000`  
- Sample endpoints demonstrating request handling and responses  
---

</details>



 
# 2\.Backend Practice Project – 01

A mini Task Manager app that demonstrates how to integrate frontend forms with backend file operations using Node.js and Express.
---

<details>
  
## 🚀 What You’ll Learn

- **Frontend–Backend Integration:** Sending form data (title & description) from an HTML page to an Express endpoint.  
- **File System Operations:** Using Node’s built-in `fs` module to create, read, and list `.txt` files on the server.  
- **Dynamic Content Rendering:** Fetching and displaying a list of saved tasks on the frontend after creation.  



## 🔑 Key Features

1. **Create Task Endpoint**  
   - Receives POST data and writes `<title>.txt` files with task details.  

2. **Task Listing**  
   - Reads the `tasks/` directory and returns filenames and contents as JSON for the frontend to render.  

3. **Read More Functionality**  
   - Clicking a task card fetches and displays the full text content of the corresponding file.  

4. **Lightweight UI**  
   - Simple HTML/CSS interface with a form and task cards to demonstrate functionality without heavy frameworks.  
---

</details>




# 3\.MongoDB C‑R‑U‑D 01

An Express.js + Mongoose demo showcasing the four fundamental CRUD operations against a MongoDB collection.
---

<details>
  
## 🚀 What You’ll Learn

- **Mongoose Setup:** Connecting your Express app to MongoDB and defining a schema/model.  
- **Create Operation:** Using `Model.create()` to insert new documents.  
- **Read Operation:** Querying documents with `Model.find()`.  
- **Update Operation:** Modifying existing records via `findOneAndUpdate()`.  
- **Delete Operation:** Removing documents with `findOneAndDelete()`.  

## 🔑 Key Features
1. **Create Endpoint** (`GET /create`)  
   - Inserts a hard‑coded user record into MongoDB and returns the created document.  
2. **Read Endpoint** (`GET /read`)  
   - Fetches users matching a given criterion and returns an array of results.  
3. **Update Endpoint** (`GET /update`)  
   - Finds a user by username, updates the name field, and returns the updated document (`{ new: true }`).  
4. **Delete Endpoint** (`GET /delete`)  
   - Finds and deletes a user by name, returning the deleted document.  


## 🖼️ Screenshot
> _Place your `screenshots/crud01-*.png` images here to illustrate each endpoint’s response._
 ---

 </details>




# 4\.🌐 MongoDB C‑R‑U‑D 02

A full‑stack CRUD application combining an HTML/JS frontend with an Express/Mongoose backend to manage user profiles.
---

<details>
  
## 🚀 What You’ll Learn

- **Frontend Form Handling:** Building a simple HTML/CSS/JS interface to collect user data (name, email, image URL).  
- **API Integration:** Sending `fetch` requests from the browser to Express endpoints for create, read, update, and delete operations.  
- **Mongoose Model Usage:** Defining schemas and interacting with MongoDB documents through Mongoose methods.  
- **Dynamic Rendering:** Generating user cards on the frontend based on JSON responses, complete with Edit and Delete controls.  



## 🔑 Key Features

1. **Create User**  
   - `POST /create` accepts JSON payloads to add new users to the database.  
2. **Read Users**  
   - `GET /read` retrieves all user documents and returns them as JSON for frontend rendering.  
3. **Update User**  
   - `PUT /update/:id` (or `GET /update/:id`) updates user fields by ID and returns the modified document.  
4. **Delete User**  
   - `DELETE /delete/:id` (or `GET /delete/:id`) removes a user by ID and returns confirmation.  
5. **Image Support**  
   - Stores and displays user-provided image URLs in the rendered user cards.  


## 🖼️ Screenshot

> _Add your frontend and backend interaction screenshots here (e.g., `screenshots/crud02-create-ui.png` and `screenshots/crud02-all-users-ui.png`)._
---

</details>






# 5\. AUTHENTICATION AND AUTHORIZATION – 01

This module demonstrates the fundamentals of JSON Web Token (JWT) authentication in an Express.js application, using HTTP cookies for token storage and verification.
---

<details>
  
## 🚀 What You’ll Learn
- **JWT Generation:** How to create a signed token containing user data.  
- **Cookie Management:** Storing and reading JWTs via HTTP cookies with `cookie-parser`.  
- **Token Verification:** Verifying and decoding JWTs on protected routes using `jsonwebtoken`.  

## 🔑 Key Features
1. **Issue a Token**  
   - **Endpoint:** `GET /`  
   - **Action:** Signs a JWT with a static payload (`{ email: "ts7583@srmist.edu.in" }`) and secret key `"secret hai"`.  
   - **Result:** Sets the JWT as an HTTP cookie named `token` and returns a success message.  

2. **Verify a Token**  
   - **Endpoint:** `GET /read`  
   - **Action:** Reads the `token` cookie, verifies its signature, and decodes the payload.  
   - **Result:** Logs the decoded payload (including `email` and `iat` timestamp) and returns it in the response.

## 🖼️ Screenshot
> _Add relevant screenshots in `screenshots/auth02-*.png` here to demonstrate the registration/login pages and protected route response._     
---

</details>



# 6\.Authentication & Authorization – 02 *(In Progress)*

A work‑in‑progress Express.js application implementing a full login/register flow with JWTs and secure cookies.
---

<details>

## 🚀 What You’ll Learn

- **User Registration & Login**  
  How to hash passwords with `bcrypt`, store user records in MongoDB, and verify credentials.  
- **Token-Based Authentication**  
  Issuing JWTs upon login and storing them in HTTP‑only cookies for secure, stateless sessions.  
- **Protected Routes**  
  Creating middleware to validate incoming tokens and restrict access to authenticated users.  
- **Role-Based Authorization (Future)**  
  Planning to extend the app with user roles (e.g., Admin vs. User) for fine‑grained access control.


## 🔑 Key Features

1. **Registration Endpoint**  
   - Hashes passwords before saving  
   - Creates a new user in MongoDB via Mongoose  

2. **Login Endpoint**  
   - Verifies credentials  
   - Signs a JWT containing user ID/role  
   - Sends the token as an HTTP‑only cookie  

3. **Auth Middleware**  
   - Reads and verifies the JWT from cookies  
   - Attaches user data to `req` for downstream handlers  

4. **Protected Demo Route**  
   - Example route that only responds if a valid token is present  



## 🖼️ Screenshot

> _Add relevant screenshots in `screenshots/auth02-*.png` here to demonstrate the registration/login pages and protected route response._
---

</details>


<details><summary><strong>⚙️ Prerequisites</summary>

Before running any project, ensure you have:

- **Node.js** (v18 or higher)  
- **npm** (comes bundled with Node.js)  
- **MongoDB** (for the MongoDB C‑R‑U‑D 01 & 02 projects)  
- **MongoDB Compass** (optional, for database visualization) 
---

</details>
