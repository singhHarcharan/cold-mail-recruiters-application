# RecruiterHub 📧

A modern web application for managing and contacting recruiters efficiently. RecruiterHub helps you search, filter, and send personalized emails to recruiters, making your job search process more streamlined.

## ✨ Features

- **🔍 Search & Browse Recruiters**: Search through a database of recruiters with advanced filtering options
- **💾 Save Recruiters**: Save your favorite recruiters for quick access later
- **📧 Email Management**: 
  - Send personalized emails to individual recruiters
  - Customizable email templates with HTML support
  - Automatic email personalization with recruiter details
- **🎨 Modern UI**: Clean, responsive interface built with React and Tailwind CSS
- **⚡ Fast & Efficient**: Built with Vite for lightning-fast development and production builds

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Nodemailer** - Email sending
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/singhHarcharan/RecruiterHub.git
cd RecruiterHub
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create a .env file in the backend directory
# Copy the following and fill in your values:
```

Create `backend/.env`:
```env
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-gmail-app-password
SENDER_NAME=Your Name
RESUME_FILE_PATH=/path/to/your/resume.pdf
DATABASE_FILE_PATH=/path/to/your/data.csv
PORT=8000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**Note**: To get a Gmail App Password:
1. Enable 2-Step Verification on your Google Account
2. Go to [App Passwords](https://myaccount.google.com/apppasswords)
3. Generate a new app password for "Mail"
4. Use this password (not your regular Gmail password) for `GMAIL_PASS`

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Create a .env file in the frontend directory
```

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:8000
```

### 4. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

The backend will run on `http://localhost:8000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
RecruiterHub/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   ├── services/          # Business logic (email sending)
│   │   ├── models/            # Data models
│   │   ├── routes/            # API routes
│   │   ├── context/           # Email content management
│   │   ├── util/              # Utility functions
│   │   └── index.ts           # Entry point
│   ├── dist/                  # Compiled JavaScript
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/             # Page components
│   │   ├── context/         # State management
│   │   ├── config/            # Configuration files
│   │   ├── utils/             # Utility functions
│   │   ├── data/              # Static data
│   │   └── App.tsx            # Main app component
│   ├── public/                # Static assets
│   ├── package.json
│   └── vite.config.ts
├── DEPLOYMENT.md              # Detailed deployment guide
├── QUICK_START.md             # Quick deployment reference
└── README.md                  # This file
```

## 🔧 Available Scripts

### Backend

```bash
npm run dev      # Start development server with ts-node
npm run build    # Compile TypeScript to JavaScript
npm start        # Run compiled JavaScript (production)
```

### Frontend

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🌐 API Endpoints

### Email Endpoints

- `POST /sendEmail` - Send email to a single recruiter
  ```json
  {
    "fullName": "John Doe",
    "email": "john@example.com",
    "companyName": "Tech Corp"
  }
  ```

### Email Template Endpoints

- `GET /api/email-template` - Get current email template
- `POST /api/email-template` - Save email template
  ```json
  {
    "subject": "Email Subject",
    "html": "<p>Email HTML content</p>",
    "text": "Email text content"
  }
  ```

## 🚢 Deployment

### Quick Deployment

For a quick deployment guide, see [QUICK_START.md](./QUICK_START.md)

### Detailed Deployment

For comprehensive deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

### Recommended Platforms

- **Frontend**: [Vercel](https://vercel.com) (Free tier available)
- **Backend**: [Railway](https://railway.app) or [Render](https://render.com) (Free tiers available)

## 🔒 Environment Variables

### Backend Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GMAIL_USER` | Your Gmail address | Yes |
| `GMAIL_PASS` | Gmail App Password | Yes |
| `SENDER_NAME` | Name to appear in emails | Yes |
| `RESUME_FILE_PATH` | Path to resume PDF | No |
| `DATABASE_FILE_PATH` | Path to CSV data file | No |
| `PORT` | Server port | No (default: 8000) |
| `FRONTEND_URL` | Frontend URL for CORS | Yes (production) |
| `NODE_ENV` | Environment mode | No |

### Frontend Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Backend API URL | Yes |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👥 Authors

- **Harcharanpreet Singh** - [@singhHarcharan](https://github.com/singhHarcharan)

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by the need for efficient recruiter outreach
- Thanks to all contributors and users

## 📞 Support

If you encounter any issues or have questions:

1. Check the [DEPLOYMENT.md](./DEPLOYMENT.md) for troubleshooting
2. Open an issue on GitHub
3. Review the code documentation

---

**Made with ❤️ for job seekers**
