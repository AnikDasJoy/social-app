# Social Media Feed App (MERN)
A full-stack social media feed application built using the MERN stack (MongoDB, Express.js, React, Node.js). This app allows users to create posts, interact through likes, comments, and replies, and manage content with privacy controls.


###  Post System
* Create posts with text and image upload
* Public and Private posts
* Private posts visible only to the author

### Like / Unlike
* Like/unlike posts, comments, and replies
* Shows who liked

### Comment System
* Add comments to posts
* delete comments

### Reply System
* Reply to comments
* Like/unlike replies
* show who like


###  Authentication & Privacy

* JWT-based authentication
* Protected routes


### Frontend
* React.js
* Axios
* Custom CSS

### Backend
* Node.js
* Express.js
* MongoDB (Mongoose)


### 1 Clone the repository
git clone https://github.com/your-username/social-media-app.git
cd social-media-app


### 2 Run the project

#### Backend
nodemon server.js


#### Frontend
npm run dev


## Decisions
### 1. Embedded Data Structure

* Comments and replies stored inside post document
* Faster reads, fewer queries

### 2. Optimized UI Updates

* Used `updatePost()` instead of full refetch


