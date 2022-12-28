# MERN-new-project

Install Tools 

 ***	npx create-react-app store (creating frontend and backend folders)
 
  *** npm install react-router-dom
  
   *** npm i express 
   
    *** npm i nodemon --save-dev (inside backend folder)
    
     ***npm i use-reducer-logger --force (inside frontend folder)
     
     ***install bootstrap npm install react-bootstrap bootstrap --legacy-peer-deps
     
     *** install bootstrap router  npm i react-router-bootstrap --legacy-peer-deps (import 'bootstrap/dist/css/bootstrap.min.css' in index.js)
     
     *** npm i react-helmet-async --legacy-peer-deps ,  npm i react-toastify --legacy-peer-deps(inside frontend folder) and added HelmetProvider in index.js 
     
     *** npm i mongoose , npm i dotenv, npm i express-async-handler , npm i jsonwebtoken and npm i bcryptjs in backend folder

Create React App

Create Git Repository

create products array in data.js

add product images

Add page routing 

npm i react-router-dom

create route for home screen

create route for product screen

Create backend folder and  Server.js

run npm init in root folder

Update package.json set type: module

npm install express


require express

move data.js from frontend to backend

create route for /api/products

run npm start

Fetch Products From Backend

set proxy in package.json

npm install axios

use effect hook

useReducer hook instead of useState

define reducer

update fetch data

get state from useReducer

created product.js  and applied bootstrap 

created rating.js and added     <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.4/css/all.min.css" /> to index.html to apply font awesome 

added stock for each product and used "if statement" to show "in stock" or "unavailable warning"
 
added utilities.js to grab error message from back end to front end (page not found)

added store.js where usecontext and usereducers where imported to change the state of "add to cart". function storeProvider was added to index.js as well

created cartScreen.js that contains items, thumbnail , plus sign , minus sign and navigate back to shopping if no items in cart.

in productScreen.js product.js and app.js add functions that allow to add quantity of an items in shopping cart 

created subtotal by multiplying added price with added quantity (items) and created checkout button

created signinScreen.js with form to fill out email/password or redirect to signup page

connected to mongoDB and seeded data in the backend folder and created express routes in seedRoutes.js file

^^^ error with axios then it was fixed by clearing cache in browser. However, window alert keeps popping.
