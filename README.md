# NearCraft

I built this because I kept missing out on cool local workshops - pottery classes, candle making, that kind of stuff. By the time I'd hear about them they were already full. So I made this app to help people discover and book creative workshops nearby.

The idea started when a friend dragged me to a random ceramics workshop and I actually loved it. But finding more was such a pain - googling, checking instagram, asking around. There had to be a better way.

## What it does

- Browse workshops by category (pottery, painting, candles, sewing, etc)
- See what's available near you on a map (Google Maps integration)
- Book spots before they fill up
- Chat with other attendees and hosts
- Track your upcoming bookings
- Earn badges as you attend more workshops

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd nearcraft1
```

2. **Install dependencies**
```bash
# Frontend
npm install

# Backend
cd backend
npm install
```

3. **Setup database**
```bash
cd backend
npx prisma migrate dev
npx prisma db seed
```

4. **Environment variables**
```bash
# Backend .env
DATABASE_URL="postgresql://username:password@localhost:5432/nearcraft"
JWT_SECRET="your-secret-key"
FRONTEND_URL="http://localhost:8080"

# Frontend .env
VITE_API_URL="http://localhost:3001/api"
```

5. **Start development servers**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
npm run dev
```

Then open http://localhost:8080

### Test Users
- **Email**: `test@nearcraft.com` | **Password**: `test123`
- **Email**: `host@nearcraft.com` | **Password**: `host123`

## Tech stack

### Frontend
- **React 18 + TypeScript** - Modern React with type safety
- **Vite** - Fast development and build tool
- **Tailwind CSS + shadcn/ui** - Modern UI components
- **React Query** - Server state management
- **React Router** - Client-side routing
- **Lucide React** - Icon library

### Backend
- **Node.js + Express** - API server
- **PostgreSQL** - Primary database
- **Prisma ORM** - Type-safe database access
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Type checking
- **Vitest** - Unit testing framework
- **PostCSS** - CSS processing

## Project structure

```
nearcraft1/
├── src/                    # Frontend React app
│   ├── components/
│   │   ├── layout/         # Header, footer components
│   │   └── ui/             # Reusable UI components
│   ├── contexts/           # Auth, language, theme contexts
│   ├── pages/              # Page components (Home, Login, etc.)
│   ├── services/           # API calls and auth logic
│   └── assets/             # Images and static files
├── backend/                # Node.js Express API
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── routes/          # API routes
│   │   └── index.js        # Server entry point
│   ├── prisma/             # Database schema and migrations
│   └── package.json        # Backend dependencies
└── assets/                 # Shared assets
```

## Deployment

### Production Build
```bash
# Frontend
npm run build

# Backend (no build needed, just run)
npm start
```

### Environment Setup
- **Frontend**: Runs on port 8080
- **Backend**: Runs on port 3001
- **Database**: PostgreSQL (configurable via .env)

### Docker (Future)
Docker configuration planned for easier deployment.

## Current Status

### ✅ Completed Features
- **Authentication System**: User registration, login, JWT tokens
- **Database Integration**: PostgreSQL with Prisma ORM
- **Workshop API**: CRUD operations for workshops
- **User Dashboard**: Browse workshops, profile management
- **Responsive Design**: Mobile-friendly UI with dark mode
- **Multi-language Support**: 10 languages available
- **Landing Page**: Marketing page with signup/login

### 🚧 In Progress
- **Map Integration**: Basic map view (needs Google Maps API)
- **Booking System**: Backend ready, frontend UI needed
- **Workshop Categories**: Filtering and search functionality

### ❌ Missing Features (TODO)

#### High Priority
- [ ] **Rate Limiting**: Add to auth endpoints (security)
- [ ] **Input Validation**: Form validation middleware
- [ ] **Error Boundaries**: React error handling
- [ ] **Loading States**: Better UX for async operations
- [ ] **Image Optimization**: Compress and WebP format
- [ ] **API Documentation**: Swagger/OpenAPI docs

#### Medium Priority  
- [ ] **Real-time Updates**: WebSocket integration
- [ ] **Payment Processing**: Stripe/PayPal integration
- [ ] **Push Notifications**: Booking reminders
- [ ] **Host Dashboard**: Workshop creator interface
- [ ] **Review System**: User ratings and feedback
- [ ] **Advanced Search**: Filters by location, price, category

#### Low Priority
- [ ] **Social Features**: Chat between attendees
- [ ] **Badge System**: Gamification elements
- [ ] **Email Notifications**: Booking confirmations
- [ ] **Analytics Dashboard**: Usage metrics for hosts
- [ ] **Mobile App**: React Native version
- [ ] **Internationalization**: More languages

### 🔧 Technical Debt
- [ ] Unit Tests: Add test coverage for critical functions
- [ ] Code Splitting: Implement lazy loading
- [ ] Bundle Optimization: Reduce initial load size
- [ ] Error Logging: Centralized error tracking
- [ ] Database Indexing: Optimize query performance

## Notes

The app currently uses mock data and placeholder images. The map works with real Google Maps but workshop locations are randomized around your location.

Multi-language support is built in (10 languages) but some translations might need polish - I used a mix of manual translation and some help from friends.

## Contributing

Feel free to open issues or PRs. I'm not super strict about code style as long as it works and is readable.
