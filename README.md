# Puppeteer's Bazaar

![Puppet Master Logo](./client/src/images/logo.png)

Puppeteer's Bazaar is an online shopping application that allows users to purchase household items from Amazon, Loblaws, and Walmart. The application is built with React/React Native, MongoDB/Apollo, Express, GraphQL, Stripe (for payment), dotenv, JWT (for authentication), Heroku (for deployment), bootstrap (for styling), and Puppeteer (for web scraping). 

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Admin Functionalities](#admin-functionalities)
- [User Functionalities](#user-functionalities)
- [Puppeteer Functionality](#puppeteer-functionality)
- [Deployment](#deployment)
- [Authors](#authors)

## Installation

To install the application locally, follow these steps:

1. Clone the repository to your local machine
2. Run `npm install` in both the root directory and the client directory
3. Create a `.env` file in the root directory with the following environment variables:
    - `MONGODB_URI`: your MongoDB URI
    - `SECRET_KEY`: a secret key for JWT authentication
4. Run `npm run develop` to start the application

## Usage

Once the application is running, users can create an account, log in, and browse household items from Amazon, Loblaws, and Walmart. They can add items to their cart and check out using Stripe for payment.

## Technologies

The technologies used in this application include:

- React/React Native
- MongoDB/Apollo
- Express
- GraphQL
- Stripe (for payment)
- dotenv
- JWT (for authentication)
- Heroku (for deployment)
- bootstrap (for styling)
- Puppeteer (for web scraping)

## Admin Functionalities

Admin users have access to the following functionalities:

- Adding new items to the database
- Editing existing items in the database
- Deleting items from the database
- Viewing a list of all users and their information
- Viewing a list of all orders and their information

## User Functionalities

Non-admin users have access to the following functionalities:

- Creating an account
- Logging in and logging out
- Browsing and searching for items
- Adding items to a shopping cart
- Viewing the shopping cart and making changes to it
- Checking out and completing an order

## Puppeteer Functionality

Puppeteer is used in this application to scrape data for prices from external websites. The websites that are scraped include Amazon, Loblaws, and Walmart. 

The following steps outline how Puppeteer is used in this application:

1. When a user searches for a product, the search term is passed to the server.
2. The server then uses Puppeteer to navigate to the external websites and search for the product.
3. Puppeteer returns the relevant data (product name, image, price, etc.) to the server.
4. The server then sends the data to the client, where it is displayed to the user.

## Deployment

The application has been deployed to Heroku and can be accessed at https://placeholder.herokuapp.com/.

To run the application locally, follow these steps:

1. Clone the repository using Git
2. Install the necessary dependencies using `npm install`
3. Create a `.env` file with the necessary environment variables
4. Start the server using `npm start`
5. Open the app in your browser at http://localhost:3000

## Authors

This application was created by John Abounassar, Mandeep Aulakh and Mohamed Osman.
