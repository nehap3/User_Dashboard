# User Dashboard - Full Stack Web Application

A scalable web application with authentication and dashboard functionality, built as part of a Frontend Developer Internship assignment.

## 🚀 Tech Stack

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **TailwindCSS** - Responsive styling
- **Axios** - API requests

### Backend
- **Node.js + Express** - REST API server
- **MongoDB + Mongoose** - Database
- **JWT** - Token-based authentication
- **bcrypt** - Password hashing

---

## ✅ Features Implemented

### Authentication
- User registration with validation
- Login with JWT tokens
- Protected routes (dashboard requires login)
- Secure logout flow

### Dashboard
- User profile display
- CRUD operations on tasks
- Search and filter functionality
- Responsive design

### Security
- Password hashing with bcrypt
- JWT authentication middleware
- Input validation (client + server side)
- Error handling

---

## 📁 Project Structure

```
User_Dashboard/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── components/
│   │   │   └── Layout.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── api/
│   │   │   └── axios.js
│   │   └── App.jsx
│   └── package.json
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)

### Backend Setup
```bash
cd backend
npm install
# Create .env file with:
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Access
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/user` | Get logged-in user |

### Tasks (CRUD)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

---

## 🔐 Security Practices

1. **Password Hashing** - bcrypt with salt rounds
2. **JWT Tokens** - Secure token-based auth with expiration
3. **Protected Routes** - Middleware validates token on protected endpoints
4. **Input Validation** - Both client and server-side validation
5. **HTTP-Only Considerations** - Token stored securely

---

## 📈 Scalability Notes

### How to Scale for Production

**Frontend:**
- Implement code splitting and lazy loading
- Use React.memo and useMemo for performance
- Add service workers for caching
- Deploy on CDN (Vercel/Netlify)

**Backend:**
- Add rate limiting to prevent abuse
- Implement Redis for session caching
- Use connection pooling for database
- Add load balancer for horizontal scaling
- Containerize with Docker for easy deployment

**Database:**
- Add indexes on frequently queried fields
- Implement read replicas for scaling reads
- Use MongoDB Atlas for managed scaling

**Architecture:**
- Separate concerns into microservices if needed
- Add message queues for async operations
- Implement proper logging and monitoring

---

## 👨‍💻 Author

Built for Frontend Developer Internship Assignment

---

## 📄 License

MIT License
