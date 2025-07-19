# Full-Stack Next.js App with Temporal Workflows

A complete full-stack application built with Next.js, TypeScript, Auth0, Prisma, and Temporal for workflow orchestration.

## 🚀 Features

- **Authentication**: Auth0 OIDC with Google provider
- **Database**: SQLite with Prisma ORM
- **Profile Management**: Editable profile with CRUD operations
- **Workflow Orchestration**: Temporal workflows with 10-second delay
- **External Integration**: Data sent to crudcrud.com via Temporal activities
- **Modern UI**: Responsive design with edit mode toggle

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 with TypeScript and App Router
- **Authentication**: Auth0 Next.js SDK
- **Database**: SQLite with Prisma ORM
- **Workflow Engine**: Temporal
- **Styling**: Tailwind CSS

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Temporal CLI (for local development)
- Auth0 account
- crudcrud.com account

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd docker-t
npm install
```

### 2. Install Temporal Worker Dependencies

```bash
cd temporal-worker
npm install
cd ..
```

### 3. Environment Setup

Create `.env.local`:

```env
AUTH0_SECRET='your-auth0-secret'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='https://your-domain.auth0.com'
AUTH0_CLIENT_ID='your-client-id'
AUTH0_CLIENT_SECRET='your-client-secret'
DATABASE_URL="file:./dev.db"
```

### 4. Database Setup

```bash
npx prisma generate
npx prisma db push
```

### 5. Start Temporal Server

```bash
temporal server start-dev
```

### 6. Start Temporal Worker

```bash
cd temporal-worker
npm run start
```

### 7. Start Next.js App

```bash
npm run dev
```

## 🔧 Project Structure

```
docker-t/
├── app/                    # Next.js app router
│   ├── api/profile/       # Profile CRUD API
│   ├── profile/           # Profile page component
│   └── layout.tsx         # Root layout
├── lib/
│   └── auth0.ts          # Auth0 configuration
├── prisma/
│   └── schema.prisma     # Database schema
├── temporal-worker/       # Temporal worker (not in git)
│   ├── src/
│   │   ├── activities.ts # Temporal activities
│   │   ├── workflows.ts  # Temporal workflows
│   │   └── worker.ts     # Worker setup
│   └── package.json
├── middleware.ts          # Auth0 middleware
└── package.json
```

## 🔄 Workflow Process

1. **User edits profile** → Next.js API saves to database
2. **Next.js API** → Starts Temporal workflow
3. **Temporal workflow** → Waits 10 seconds
4. **Temporal worker** → Calls crudcrud.com
5. **crudcrud.com** → Receives profile data

## 🧪 Testing

1. **Start all services** (Temporal server, worker, Next.js app)
2. **Navigate to** http://localhost:3000
3. **Login with Auth0**
4. **Go to Profile page** and edit fields
5. **Save profile** - triggers Temporal workflow
6. **Check Temporal UI** at http://localhost:8233
7. **Verify crudcrud.com** for data persistence

## 🐳 Docker Support

The project includes Docker Compose configuration for Temporal:

```bash
docker-compose up -d
```

## 📝 API Endpoints

- `GET /api/profile` - Get user profile
- `POST /api/profile` - Update user profile (triggers Temporal workflow)
- `DELETE /api/profile` - Delete user profile

## 🔐 Authentication

- Auth0 OIDC with Google provider
- Protected routes with middleware
- Session management

## 📊 Database Schema

```prisma
model User {
  id          String   @id @default(cuid())
  email       String   @unique
  name        String?
  picture     String?
  bio         String?
  firstName   String?
  lastName    String?
  phoneNumber String?
  city        String?
  pincode     String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```
### Local Development
- Temporal CLI for local server
- SQLite for database
- Next.js dev server

## 🆘 Troubleshooting

### Temporal Connection Issues
- Ensure Temporal server is running on port 7233
- Check worker logs for connection errors
- Verify task queue name matches

### Auth0 Issues
- Verify environment variables
- Check Auth0 application settings
- Ensure callback URLs are correct

### Database Issues
- Run `npx prisma generate` after schema changes
- Check database file permissions
- Verify DATABASE_URL in .env.local
