# Perfect Pepper

## Overview
Perfect Pepper is a dynamic web application built for a community of food lovers where they can get new recipes, and share recipes.

## Technology Overview

Used React.js to create all HTML elements (virtual DOM) to dynamically display data received from the PostgreSQL database created using Node.js.

Used Express to retrieve recipe data.

## Technologies Used

React.js

Node.js

Express

PostgreSQL

Webpack 4

Bootstrap 4

HTML5

CSS3

Argon 2

## Feature Overview
* The client can send GET requests to the server, and in return can receive and display the data to view:

  * Recipe ingredients,

  * and Directions on how to prepare the meal.

* The client can send POST requests to the server to add to the database.


## Feature Lists

* User sees a new ‘recipe of the day’ on the homepage every day.
* User can search for recipes
* User can post recipes
* User can convert metrics 
* User can see all recipes

## Future Features

* User can translate recipes to preferred language
* User can like recipe post(s)
* User can save post to drafts
* User can edit their posts



## Lessons Learned
* Creating a basic yet responsive user interface using React.js and Bootstrap 4.

* Leveraging Object Oriented Programming to organize code into components.

* Experienced the full development process by:

  * planning each feature

  * prototyping the visual design through Figma

  * designing a database schema on DB Designer and creating it with PostgreSQL

  * collaborating on a single codebase through pull requests, code review and resolving code conflicts on GitHub
  * deploying on a live site.

## System Requirements
Node.js 10

PostgreSQL 10

pgweb

NPM 6

## Set Up Environment
Clone the repo

git clone https://github.com/eniolajohnson/perfect-pepper.git

## Install all dependencies with NPM
npm install

Import the example database to PostgreSQL

npm run db:import

Create a .env file in the root directory and paste in the following:

PORT=3001

DEV_SERVER_PORT=3000

DATABASE_URL=postgres://dev:lfz@localhost/classNotes

Start the PostgreSQL service
````
sudo service postgresql start
````
Start the server
````
pgweb --db=perfect-pepper
````
Start the project. 
````
npm run dev
````
Once started, you can view the application by opening http://localhost:3000 in your browser.


## Live Site
The live version of the app can be viewed [here](https://perfect-pepper.herokuapp.com)
 
