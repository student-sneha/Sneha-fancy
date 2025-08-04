# 🛍️ SnehaFancy

**SnehaFancy** is a full-stack **E-commerce Web Application** built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**.  
It features a seamless shopping experience for users and a powerful admin panel for store management.

🌐 **Live Demo:** [https://snehafancy.vercel.app](https://snehafancy.vercel.app)

---

## 📦 Key Features

### 👩‍💻 For Customers
- 🔐 JWT-based user authentication
- 🛍️ Browse products by category & subcategory
- 📦 Product details with size & quantity selection
- 🛒 Add to cart, manage cart items, and place orders
- 📃 Order summary & confirmation
- 📱 Fully responsive on all devices

### 👩‍💼 For Admin
- 🔐 Secure admin login
- ➕ Add, ✏️ Edit, 🗑️ Delete products
- 📋 View & manage all orders
- 📊 Dashboard with total revenue, order status
- 🔒 Admin-only protected routes

---

## 🚀 Tech Stack

### 🖥️ Frontend (`/frontend`)
- React.js + React Router
- Axios
- Bootstrap + Custom CSS

### 🛠️ Backend (`/backend`)
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Multer + Cloudinary (Image Uploads)
- Stripe Payment Gateway

### ⚙️ Admin Panel (`/admin`)
- React.js-based dashboard
- Product & Order management UI
- Protected admin routes

---

## 🔐 Environment Variables

###Create a `.env` file in both `/frontend` and `/backend` directories with the following content:

### `/frontend/.env`
(```env)
VITE_BACKEND_URL=http://localhost:4000

### `/backend/.env`
PORT=4000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password


🛠️ Getting Started (Local Setup)
### 1. Clone the repository
git clone https://github.com/student-sneha/SnehaFancy.git
cd SnehaFancy

### 2. Install Frontend Dependencies
cd frontend
npm install

#### 3. Install Backend Dependencies
cd ../backend
npm install

#### 4. Add Environment Variables
# Create .env files as shown above

### 5. Start the Project
# Run backend server
cd backend
npm run server

### Run frontend app
cd ../frontend
npm run dev

### 📁 Folder Structure

SnehaFancy/
│
├── backend/                 # Node.js + Express + MongoDB API
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── frontend/                # Customer-facing React app
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── pages/
│       ├── context/
│       ├── App.js
│       └── index.js
│
├── admin/                   # Admin dashboard React app
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── pages/
│       ├── App.js
│
├── .env
├── .gitignore
├── README.md
└── package.json


🙋‍♀️ About Me

I'm Sneha Khandelwal, a frontend developer passionate about building real-world web applications using React and the MERN stack.

- 💼 [LinkedIn](https://www.linkedin.com/in/snehagupta12/)  
- 🧠 [GitHub](https://github.com/student-sneha)

## ⭐️ Show Your Support

If you found this project helpful:

- ⭐️ Star this repo  
- 🍴 Fork it  
- 🛠️ Submit PRs or issues
