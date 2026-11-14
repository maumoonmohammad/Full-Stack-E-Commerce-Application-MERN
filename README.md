# Full-Stack E-Commerce Application (MERN)

A full-featured e-commerce web application built with the MERN stack (MongoDB, Express, React, Node.js). It includes user authentication, role-based access for customers and admins, a complete product catalog with search and filtering, a shopping cart, and a payment gateway.


## Features

- **Authentication** — User registration and login secured with JSON Web Tokens (JWT); passwords hashed with bcrypt; forgot-password recovery using a security question.
- **Role-based access** — Separate customer and admin roles, enforced with protected routes on both the front end and the back end (user and admin middleware).
- **Product catalog** — Browse products with pagination, filter by category and price, full-text search, related products, and detailed product pages with photos.
- **Shopping cart** — A global cart managed with Redux Toolkit and shared across the whole app, with add and remove functionality.
- **Checkout & payments** — Integrated Braintree payment gateway for processing (test) payments at checkout.
- **Admin dashboard** — Full CRUD on products and categories, plus management of users and orders, including updating order status, accessible only to admins.
- **User dashboard** — Customers can view and edit their profile and see their order history.
- **Polish** — Ant Design UI components, toast notifications, and SEO-friendly page metadata (React Helmet).

## Tech Stack

- **Front end:** React 18, Redux Toolkit, React Router v6, Ant Design, Axios, Braintree Drop-in
- **Back end:** Node.js, Express, MongoDB (Mongoose), JWT, bcrypt, express-formidable
- **Payments:** Braintree
- **Deployment:** Cyclic

## API Overview

**Auth** (`/auth`)
- `POST /register`, `POST /login`, `POST /forgotpassword`
- `GET /user-auth`, `GET /admin-auth`, `PUT /profile`
- `GET /orders`, `GET /all-orders`, `PUT /order-status/:orderId`

**Products** (`/products`)
- `POST /create-product`, `PUT /update-product/:pid`, `DELETE /delete-product/:pid`
- `GET /get-products`, `GET /single-product/:slug`, `GET /product-photo/:pid`
- `GET /product-list/:page`, `GET /search/:keyword`, `POST /filter-products`
- `GET /related-products/:id/:cid`, `GET /product-category/:slug`
- `GET /braintree/token`, `POST /braintree/payment`

**Categories** (`/categories`) — create, list, update, and delete product categories.

## Getting Started

### Prerequisites
- Node.js
- MongoDB (local or Atlas)
- A Braintree sandbox account (for payments)

### Setup

```bash
# Clone the repository
git clone https://github.com/maumoonmohammad/Full-Stack-E-Commerce-Application-MERN.git
cd Full-Stack-E-Commerce-Application-MERN

# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

Create a `.env` file in the project root:

```env
BPORT=5000
URL_DB=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
BRAINTREE_MERCHANT_ID=your-merchant-id
BRAINTREE_PUBLIC_KEY=your-public-key
BRAINTREE_PRIVATE_KEY=your-private-key
```

### Run

```bash
# Start the backend (from the project root)
npm start

# In a separate terminal, start the frontend
cd client
npm start
```

The backend runs on `http://localhost:5000` and the React app on `http://localhost:3000`.

## Project Structure

- `client/` — React front end (components, pages, Redux store in `Feature_state/`)
- `models/` — Mongoose schemas (User, Product, Category, Order)
- `routes/` — Express route handlers (auth, products, categories)
- `middlewares/` — JWT and role-based access middleware
- `config/` — Database connection
- `helpers/` — Utility functions (e.g. password hashing)
- `server.js` — Express server entry point
