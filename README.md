# ✈️ AI Travel Planner

An AI-powered full-stack travel planning application that helps users generate personalized itineraries, estimate travel budgets, discover hotels, and manage trips using AI.

---

# 🚀 Features

## 🔐 Authentication & Authorization

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Multi-user support
- User-specific data isolation

---

## 🌍 Trip Management

Users can:

- Create trips
- View all their trips
- View trip details
- Delete trips

Trip details include:

- Destination
- Number of days
- Budget type
- Interests

---

## 🤖 AI Itinerary Generator

Generates a complete day-by-day itinerary using AI.

Example:

### Day 1

- Visit Senso-ji Temple
- Explore Asakusa street food
- Evening walk around Shibuya

### Day 2

- Tokyo Skytree
- Akihabara shopping
- Sushi dinner

---

## 💰 Budget Estimation

Automatically estimates:

- Flights
- Hotel cost
- Food expenses
- Activities cost
- Total trip cost

Example:

```
Flights: $500
Hotel: $600
Food: $400
Activities: $200

Total: $1700
```

---

## 🏨 Hotel Suggestions

Provides recommended hotels based on destination and budget.

Example:

- Hotel Mystays Asakusa
- Shinjuku Granbell Hotel

---

## ✏️ Editable Itinerary

Users can:

- Add activities
- Remove activities
- Modify their itinerary dynamically

---

# 🌟 Custom Features

## 🎒 Smart Packing List

Automatically generates packing suggestions:

### Clothes

- T-Shirts
- Jeans
- Jacket
- Shoes

### Electronics

- Phone Charger
- Power Bank
- Camera

### Documents

- Passport
- ID Card
- Tickets

### Essentials

- Medicines
- Water Bottle
- Toiletries

### Why this feature?

Travelers often forget important items. This feature helps users prepare before their trip.

---

## 📄 Export Trip as PDF

Users can download their itinerary as a PDF.

Includes:

- Budget breakdown
- Day-wise itinerary
- Activities

### Why this feature?

Travelers can access their plans offline without internet.

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- React Router DOM
- Axios
- CSS

## Backend

- Node.js
- Express.js

## Database

- MongoDB
- Mongoose

## Authentication

- JWT
- bcryptjs

## AI

- OpenAI API

## PDF Generation

- jsPDF

---

# 🏗 Architecture

```
Frontend (React + Vite)
            ↓
       Express API
            ↓
        MongoDB Atlas
            ↓
        OpenAI API
```

---

# 📂 Project Structure

```
AI-Travel-Planner
│
├── frontend
│   ├── src
│   │    ├── components
│   │    ├── pages
│   │    ├── api.js
│   │    ├── App.jsx
│   │    └── index.css
│   │
│   └── package.json
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# 🔑 Environment Variables

Create a `.env` file inside backend:

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_CONNECTION_STRING

JWT_SECRET=YOUR_SECRET_KEY

OPENAI_API_KEY=YOUR_OPENAI_API_KEY
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/ai-travel-planner.git

cd ai-travel-planner
```

---

# Backend Setup

```bash
cd backend

npm install

npm run dev
```

Server runs on:

```
http://localhost:5000
```

---

# Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Application runs on:

```
http://localhost:5173
```

---

# API Endpoints

## Authentication

### Register

```
POST /api/auth/register
```

### Login

```
POST /api/auth/login
```

---

## Trips

### Create Trip

```
POST /api/trips
```

### Get All Trips

```
GET /api/trips
```

### Get Single Trip

```
GET /api/trips/:id
```

### Update Trip

```
PUT /api/trips/:id
```

### Delete Trip

```
DELETE /api/trips/:id
```

---

## Editable Itinerary

### Add Activity

```
PUT /api/trips/:id/add-activity
```

### Remove Activity

```
PUT /api/trips/:id/remove-activity
```

---

## Packing List

```
GET /api/trips/:id/packing-list
```

---

# Security

- JWT Authentication
- Protected Routes
- User-level Authorization
- Multi-user Isolation
- Password Hashing with bcrypt

Users cannot access or modify other users' trips.

---

# Design Decisions

### MongoDB

Chosen for flexible schema and easy scalability.

### JWT Authentication

Provides stateless authentication and secure API access.

### React + Vite

Fast development and simple component structure.

### OpenAI API

Used to generate intelligent itineraries and budget estimates.

---

# Trade-Offs

- CSS used instead of Tailwind for simplicity.
- AI responses may vary depending on prompts.
- Hotel recommendations are AI-generated and not real-time booking data.

---

# Known Limitations

- No image uploads.
- No map integration.
- No weather forecast support.
- No payment gateway.
- AI output may vary.

---

# Future Improvements

- Weather Forecast API
- Google Maps Integration
- Flight Price Search
- Hotel Booking APIs
- Favorite Trips
- Share Trip Feature
- Voice Assistant
- Multi-language Support

---

# Deployment

## Backend

Render

## Frontend

Vercel

---

# Demo

### Login

↓

### Dashboard

↓

### Create Trip

↓

### Generate AI Itinerary

↓

### Budget Estimation

↓

### Hotel Suggestions

↓

### Editable Itinerary

↓

### Smart Packing List

↓

### Export PDF

---

# Author

Priya Kumari

Full Stack Developer

---

# License

MIT License