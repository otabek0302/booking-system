# Booking System

A modern event booking system built with Node.js, Express, TypeScript, and PostgreSQL using TypeORM.

## Features

- 🎟️ Event Management (Create, Read, Update, Delete)
- 📅 Booking Management with real-time capacity tracking
- 🎫 Ticket availability checking
- 💰 Dynamic pricing
- 📊 Booking status management
- 🔄 Automatic capacity updates
- ✅ Input validation and error handling

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Validation**: Express Validator

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd booking-system
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your database credentials and configuration.

4. Run database migrations (optional):
```bash
npm run migration:run
```

5. Start the development server:
```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server with hot-reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run migration:generate` - Generate new migration
- `npm run migration:run` - Run pending migrations
- `npm run migration:revert` - Revert last migration

## API Endpoints

### Events

- `GET /api/events` - Get all events (paginated)
- `GET /api/events/available` - Get available events
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create new event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Bookings

- `GET /api/bookings` - Get all bookings (paginated)
- `GET /api/bookings/:id` - Get booking by ID
- `POST /api/bookings/event/:eventId` - Create booking for event
- `PUT /api/bookings/:id` - Update booking
- `PUT /api/bookings/:id/cancel` - Cancel booking
- `DELETE /api/bookings/:id` - Delete booking

### Health Check

- `GET /health` - Server health status

## Project Structure

```
booking-system/
├── src/
│   ├── app.ts                 # Express app configuration
│   ├── server.ts              # Server entry point
│   ├── config/
│   │   └── database.ts        # Database connection
│   ├── models/
│   │   ├── Event.ts           # Event entity
│   │   └── Booking.ts         # Booking entity
│   ├── controllers/
│   │   ├── eventController.ts
│   │   └── bookingController.ts
│   ├── routes/
│   │   ├── eventRoutes.ts
│   │   └── bookingRoutes.ts
│   ├── services/
│   │   ├── eventService.ts
│   │   └── bookingService.ts
│   ├── middlewares/
│   │   ├── errorHandler.ts
│   │   └── validateRequest.ts
│   ├── utils/
│   │   └── ApiError.ts
│   ├── @types/
│   │   └── index.d.ts
│   └── database/
│       ├── migrations/
│       └── seeds/
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

## Environment Variables

```env
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=booking_system
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
APP_URL=http://localhost:3000
```

## Database Schema

### Event
- id (UUID)
- name (VARCHAR)
- description (TEXT)
- startDate (TIMESTAMP)
- endDate (TIMESTAMP)
- capacity (INT)
- bookedCount (INT)
- location (VARCHAR)
- price (DECIMAL)
- isActive (BOOLEAN)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)

### Booking
- id (UUID)
- eventId (UUID, Foreign Key)
- customerName (VARCHAR)
- customerEmail (VARCHAR)
- customerPhone (VARCHAR)
- tickets (INT)
- totalAmount (DECIMAL)
- status (ENUM: pending, confirmed, cancelled, completed)
- notes (TEXT)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)

## License

ISC

## Author

Your Name

