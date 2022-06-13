# IYKYK-backend

![Badge](https://img.shields.io/badge/license-MIT-blue)
---
# Descritption

`IYKYK` is an event-focused social media app, where users can plan and engage in an event or activity they are going to.  This application allows the user to send and receive email invitations to events, which they can then access and chat with other users invited to the same event.

&nbsp;
---
# Table of Contents

  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Technologies Used](#technologies-used)
  - [Contributing](#contributing)
  - [Contact](#contact)

&nbsp;
---
# Installation

1. Fork the application repository from GitHub and clone this project to your machine.
2. Open the project with your preferred text-editor, such as VS code.
3. Prerequisite installations: Node.js, MySQL.
4. This project includes a `package.json` file that specifies dependencies for this project, which can be installed by running the command `"npm install"`.
5. Before proceeding to usage, be sure to follow the installation instructions for the frontend file. ([here](https://github.com/Jeff-T-Schmidt/IYKYK-backend))

&nbsp;
---
# Usage

Once the project has been installed:
1. Open the poject file within terminal
2. run the following and enter your password
```
mysql -u root -p
```
3. run the following command to setup your database
```
source db/schema.sql
```
4. create a file called `.env` in the root folder, and include the following information:
```
DB_NAME = 'IYKYK_db'
DB_USER = 'YOUR USERNAME'
DB_PW = 'YOUR PASSWORD'
JWT_SECRET="I Love Coding"
TOKEN_MAX_AGE="6h"
```
5. run the following command:
```
nodemon server.js
```
6. Setup for the backend is complete.  Refer to the [frontend README](https://github.com/Jeff-T-Schmidt/IYKYK) for the following steps.

&nbsp;
---
# Technologies Used

General Technologies: 
- [HTML](https://html.com/)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [Javascript](https://www.javascript.com/)
- [Node](https://www.npmjs.com/package/node)
- [Heroku](https://www.heroku.com/)
- [React](https://reactjs.org/)

NPM Packages
- [connect-session-sequelize](https://www.npmjs.com/package/connect-session-sequelize)

- [nodemon](https://www.npmjs.com/package/nodemon) 
- [Express](https://www.npmjs.com/package/express)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [MySQL2](https://www.npmjs.com/package/mysql)
- [Sequelize](https://www.npmjs.com/package/sequelize)
- [MUI](https://mui.com/)


&nbsp;
---
# Contributing

This project was a collaborative group for our Final Project from the University of Washington Web Development Bootcamp.  For any interest in contributions, please contact the team members with questions and comments.

&nbsp;
---
# Contact

- Andrew Noorishad | [Github](http://github.com/anoorishad) | [email](anoorishad@me.com)
- Jeff Schmidt | [Github](https://github.com/Jeff-T-Schmidt) | [email](jeff.t.schmidt@gmaiol.com)
- Phacharapol "Dap" Phukana | [Github](https://github.com/Phacharapol18) | [email](phacharapol18@gmail.com)
- Taylor Shen  | [Github](http://github.com/tshen28) | [email](shen.taylor@yahoo.com)
- Tyler Alcover | [Github](https://github.com/KIMOISQUIGGLES) | [email](alcovertyler@gmail.com)
