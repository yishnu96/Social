# Social Time
Social time is an online web application when you can use be up to date with socity. It have many features, including you make friend, create a post, like post and send comment on that post. You can chat with you group of friends. Its you place come and hangup with your group of people.

## Features of Web application
- Authentication mannual and google
- Post and Comment on posts
- Delete and Update posts and comments
- Uploading Photos and making Avatars
- Making friends (send and accept friend requests)
- Like in post and comment
- Chating engine

## Prerequisites
- Git
- NodeJS
- NPM
- MongoDB
- Reids Server

## Technologies Used
1.  NodeJS
2.  Express
3.  EJS
4.  MongoDB
5.  PassportJS
6.  Nodemailer
7.  Multer
8.  Socket .io

## Installation

##### Clone the latest Repository

    gh repo clone yishnu96/Social

##### Into the project directory

    cd Social

#### Configration of credentials
Make a file name environment.js in config folder and put the following credentials and export it <br>
```  
    db = '',                       // MongoDB path
    smtp_username = '',            // gmail username
    smtp_password = '',            // gmail password

    // Make an app google API and get clint id, secret key
    google_clint_id = '',          
    google_clint_secret = '',
    google_callback = '', 

    jwt_secret = '',            //use 256-bit WEP Key
    nodemailer_email = '',      // sender email id
    session_secret = ''         // use 128-bit WEP Key
```


##### Installing NPM dependencies

    npm install

##### Then simply start your app

    npm start

#### The Server should now be running at http://localhost:8000/
