# 🍔 Food24 — Full-Stack Food Delivery Platform

A full-stack food delivery web application that connects customers, restaurant owners, and delivery partners on a single platform. Food24 features dedicated dashboards, food and order management, real-time communication using Socket.IO, and live delivery tracking.

## 🚀 Key Features

### 👤 Customer Dashboard
- User registration and login.
- Browse restaurants and discover food items.
- Search for food and restaurants.
- Add food items to the shopping cart.
- Place orders and view order details.
- View order history and payment status.
- Track orders and delivery progress.
- Rate food items after delivery.

### 🏪 Restaurant Owner Dashboard
- Dedicated dashboard for restaurant owners.
- Create and manage restaurant profiles.
- Add, edit, and manage food items.
- Manage menu items and prices.
- Receive and manage customer orders.
- Update order preparation and fulfillment status.
- View restaurant order information.

### 🚴 Delivery Boy Dashboard
- Dedicated dashboard for delivery partners.
- View assigned delivery orders.
- Access customer and order details.
- Manage delivery assignments.
- Update delivery status.
- Share live delivery location for order tracking.
- View today's deliveries and delivery statistics.

### ⚡ Real-Time Features — Socket.IO
- Real-time communication between connected clients and the server.
- Live order status updates.
- Real-time delivery location updates.
- Instant delivery progress updates for connected users.

### 🗺️ Live Order Tracking
- Track order progress from dispatch to delivery.
- Follow the delivery partner's location on a map.
- Receive live location updates when the delivery partner is online.

### 🔐 Authentication & Authorization
- User authentication.
- Role-based access for customers, restaurant owners, and delivery partners.
- Separate dashboards for different user roles.
- Protected routes and role-specific functionality.

### 🛒 Cart, Orders & Payments
- Add and manage cart items.
- Create and view orders.
- Display order totals and payment status.
- Track order fulfillment.

### ⭐ Ratings & Reviews
- Submit ratings for delivered food items.
- Display food ratings and review counts.

### 📱 Responsive UI
- Modern interface built with React and Tailwind CSS.
- Responsive layouts for supported screen sizes.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend user interface |
| Tailwind CSS | Styling and responsive design |
| Redux Toolkit | Frontend state management |
| React Router | Client-side routing |
| Node.js | Backend runtime |
| Express.js | REST API and server |
| MongoDB | Database |
| Mongoose | Database modeling |
| Socket.IO | Real-time communication |
| Git & GitHub | Version control |

## 🏗️ Application Architecture

```text
                       Food24
                         |
             +-----------+-----------+
             |           |           |
         Customer      Owner     Delivery Boy
        Dashboard    Dashboard    Dashboard
             |           |           |
             +-----------+-----------+
                         |
                  React Frontend
                         |
               Express / Node.js API
                         |
             +-----------+-----------+
             |                       |
         MongoDB                  Socket.IO
             |                       |
       Orders & Users       Real-Time Updates
                                     |
                          Order Status & Location
```

## 📂 Project Structure

```text
Food24/
├── frontend/
│   ├── public/
│   ├── src/
│   └── package.json
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── package.json
└── README.md
```

*Adjust the structure above to match your actual repository.*

## ⚙️ Installation & Setup

### Prerequisites
- Node.js and npm
- MongoDB connection
- Git

### 1. Clone the repository

```bash
git clone https://github.com/abhishekgautam94666/Food24
cd Food24
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Install backend dependencies

Open a separate terminal:

```bash
cd backend
npm install
```

### 4. Configure environment variables

Create the required `.env` file or files based on your application configuration.

Example backend variables:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Use the exact environment variable names expected by your code. Add any other required configuration for Socket.IO, maps, email, or payments if applicable.

**Security:** Never commit real passwords, API secrets, database credentials, or private keys to GitHub.

### 5. Run the backend

From the backend directory, run the development command configured in `package.json`. For example:

```bash
npm run dev
```

### 6. Run the frontend

In another terminal:

```bash
cd frontend
npm run dev
```

Open the local URL shown by Vite in your terminal.

## 🔮 Future Improvements
- Push notifications for order updates.
- Automated testing and improved test coverage.
- Advanced restaurant analytics.
- Performance optimization and caching.

## 👨‍💻 Author

**Your Name**

- GitHub: [https://github.com/abhishekgautam94666]

---

If you find Food24 interesting, consider giving the repository a ⭐.

