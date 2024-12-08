# Vacation Bnb

Vacation Bnb is an airbnb clone where users can browse, review and create a spot.

## Preview

![image](showcase.png)

## Technologies Used

- Backend
  - Express
  - SQL

- Frontend
  - React
  - Redux
  - CSS


## How to Launch

### Backend Setup

- `cd` into `/backend` folder
- run `npm install` 
- create `.env` file and copy `.env.example` to it
- run `npx dotenv sequelize db:migrate`
- run `npx dotenv sequelize db:seed:all`
- run `npm start`

### Frontend Setup

- `cd` into `/frontend` folder
- run `npm install` 
- run `npm run dev`
- visit `http://localhost:5173` in browser
