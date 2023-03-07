## Getting Started

1. Ensure you have Node.js installed.
2. Create a free [Mongo Atlas](https://www.mongodb.com/atlas/database) database online or start a local MongoDB database.
3. Create a `server/.env` file with a `MONGO_URL` property set to your MongoDB connection string.

```bash
In the terminal,
cd server

# Install dependencies and devDependencies
npm install

## Running the Project
1. In the terminal, run:

npm run dev (nodemon)


# Routes

GET    /orders # Get All Orders

POST    /orders/create-order # Add Orders

#required
name: string, address: string, contact: number, price: number



## Docker

1. Ensure you have the latest version of Docker with Docker-compose installed
3. Run docker compose up --build
```
