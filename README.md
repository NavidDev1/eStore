# eStore HealtyFood

E-commerce store using the MERN-Stack. This is my examination project for school where users can register, browse products, and make secure payments with PayPal.

The site also includes an admin page where administrators can manage orders, create new products, and update existing ones.

## Getting Started

1. clone the repository
2. start the project and run these commands

Install Dependencies:

npm install

Set up Environment Variables:

Create a .env file in the root directory.
Use the provided .env.example file as a template.

# .env.example

PORT=5000
MONGO_URI=your_mongo_uri_here
JWT_SECRET=your_JWT_secret_here
NODE_ENV=development
PAYPAL_CLIENT_ID=your_paypal_key_here

PayPal Integration:

To set up the PayPal ID, register for an account on developers.PayPal.
Obtain API credentials for the sandbox

Run the Application:

Start the backend server:

## npm run backend

Start the frontend server:

## npm run frontend

Run both concurrently:

## npm run dev

Create Admin User:

To set up an admin user, access your MongoDB database.
Navigate to the users collection.
Locate the user you want to make an admin by their username or email.
Update the isAdmin field to true.

Notes
Make sure to check for any misspellings or typos during the setup process.
Remember to create an admin user in the MongoDB database if needed.
