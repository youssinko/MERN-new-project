# Welcome to My personal Ecommerce Website(Compatible with Mobile Devices)
https://ecommerce-project-3.onrender.com/

Install Tools 

      ***	npx create-react-app store (creating frontend and backend folders)
 
      *** npm install react-router-dom
  
      *** npm i express 
   
      *** npm i nodemon --save-dev (inside backend folder)
    
      ***npm i use-reducer-logger --force (inside frontend folder)
     
      ***install bootstrap npm install react-bootstrap bootstrap --legacy-peer-deps
     
      *** install bootstrap router  npm i react-router-bootstrap --legacy-peer-deps (import 'bootstrap/dist/css/bootstrap.min.css' in index.js)
     
      *** npm i react-helmet-async --legacy-peer-deps ,  npm i react-toastify --legacy-peer-deps , npm i @paypal/react-paypal-js(inside frontend folder) and added HelmetProvider in index.js 
     
     *** npm i mongoose , npm i dotenv, npm i express-async-handler , npm i jsonwebtoken and npm i bcryptjs in backend folder
     
     **npm init and npm run build (root folder)

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

seed products by going to http://localhost:5000/api/seed

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

created shipping address screen and store the info in the localstorage as long as user still logged in , also created steps components to show active steps from siging in to the place order

created preview order screen where user can see a summary of the purchase and total cost with tax and shipping cost 

created order API and fetching order info in order screen ( created routes in backend , added isAuth in utilities to detect if order is being placed by logged in user and creatd order model to send data to mongodb)

setting up paypal: logoged in to developer.paypal.com => dashboard => selected sandbox (we only testing ) and created app 

added orderhistory screen and updated orderRoute in backend

added updateProfile and updated userRoute in backend

installed json package  and npm run build in the main/root folder of the project (npm init)and (npm run build) , added "build" and "start" under package Json's script  and updated server.js with middlewares

added filter option and searchbar 

added protected route , only authorized users can access to them otherwise signin page will appear. 

added admin routes, updated backend utilites , product-route and added product-list-screen with option to detele only by admin
![Untitled Diagram-Page-1](https://user-images.githubusercontent.com/113655954/210391950-1012cb7b-91b7-4b6a-900e-ff531ba720db.jpg)



organized the flow of my work using Trello https://trello.com/b/8AArl0DO/project-management
![Screen Shot 2023-01-03 at 10 57 23 AM](https://user-images.githubusercontent.com/113655954/210393707-2e90baf4-109f-4a96-9bc7-8c5b9ddbcd31.png)

![Screen Shot 2023-01-03 at 10 56 02 AM](https://user-images.githubusercontent.com/113655954/210393717-cb669527-b618-4434-ad34-43796b8b0ef1.png)![Screen Shot 2023-01-03 at 10 58 14 AM](https://user-images.githubusercontent.com/113655954/210393843-7c269b22-3c7f-45e8-adfd-81f73f18badd.png)

![Screen Shot 2023-01-03 at 10 59 10 AM](https://user-images.githubusercontent.com/113655954/210394021-8a4cf47d-ffe7-4b29-ab42-f54a4d083226.png)
