# 🚀 Skout - AI-Powered Learning Platform

**Learn Anything With the Power of AI**

Transform YouTube videos into structured learning experiences with our intelligent course generator. Create, share, and master any topic through AI-powered course creation.

![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![Prisma](https://img.shields.io/badge/Prisma-6.11.1-2D3748)
![OpenAI](https://img.shields.io/badge/OpenAI-5.9.0-412991)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.11-38B2AC)

## ✨ Key Features

### 🤖 AI-Powered Course Generation
- **Intelligent Video Analysis**: Advanced AI analyzes YouTube videos to extract key concepts and learning objectives
- **Automated Chapter Creation**: Automatically generates structured course chapters with logical flow
- **Smart Content Summarization**: Creates comprehensive summaries for each chapter
- **Dynamic Quiz Generation**: AI-generated quizzes with multiple-choice questions for concept reinforcement

### 📚 Course Management System
- **Interactive Course Builder**: Intuitive form-based course creation with real-time preview
- **Multi-Unit Structure**: Organize courses into units and chapters for better learning progression
- **Course Gallery**: Browse and discover community-created courses
- **Progress Tracking**: Monitor learning progress with detailed analytics

### 🎯 Learning Experience
- **Interactive Quizzes**: Concept check quizzes with instant feedback and scoring
- **Video Integration**: Seamless YouTube video embedding with synchronized content
- **Responsive Design**: Optimized for desktop, tablet, and mobile learning
- **Dark/Light Theme**: Customizable UI themes for comfortable learning

### 👥 User Management & Authentication
- **NextAuth Integration**: Secure authentication with multiple providers
- **User Profiles**: Personalized user accounts with course history
- **Credit System**: Token-based system for course generation
- **Subscription Management**: Stripe-powered premium subscriptions

### 🎨 Modern UI/UX
- **Framer Motion Animations**: Smooth, engaging animations throughout the platform
- **Radix UI Components**: Accessible, customizable UI components
- **Gradient Design System**: Modern gradient-based visual design
- **Responsive Layout**: Mobile-first responsive design approach

## 🛠️ Technical Stack

### Frontend
- **Next.js 15.3.5** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Radix UI** - Accessible component primitives
- **React Hook Form** - Form state management
- **Zod** - Schema validation

### Backend & Database
- **Prisma ORM** - Type-safe database client
- **PostgreSQL** - Primary database
- **NextAuth.js** - Authentication solution
- **OpenAI API** - AI-powered content generation
- **YouTube Transcript API** - Video content extraction

### Deployment & Services
- **Vercel** - Hosting and deployment
- **Stripe** - Payment processing
- **YouTube API** - Video data integration

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- OpenAI API key
- YouTube API key (optional)
- Stripe account (for subscriptions)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/skout.git
cd skout
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
cp .env.example .env
```

Configure your `.env` file with:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/skout"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
OPENAI_API_KEY="your-openai-api-key"
STRIPE_API_KEY="your-stripe-secret-key"
STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"
```

4. **Database Setup**
```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

5. **Start Development Server**
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 📁 Project Structure

```
skout/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── course/            # Course pages
│   ├── create/            # Course creation
│   ├── gallery/           # Course gallery
│   └── settings/          # User settings
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── *.tsx             # Feature components
├── lib/                  # Utility functions
├── prisma/               # Database schema
├── validators/           # Zod schemas
└── public/              # Static assets
```

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:migrate   # Run database migrations
npm run db:seed      # Seed database with sample data
npm run db:studio    # Open Prisma Studio
npm run db:reset     # Reset database and reseed
```

## 🌟 Core Functionality

### Course Creation Workflow
1. **Input Course Details**: Title and learning units
2. **AI Processing**: OpenAI analyzes and structures content
3. **Chapter Generation**: Automatic chapter creation with summaries
4. **Quiz Creation**: AI-generated assessment questions
5. **Course Publishing**: Make available in gallery

### Learning Experience
1. **Course Discovery**: Browse gallery or create custom courses
2. **Structured Learning**: Progress through units and chapters
3. **Interactive Quizzes**: Test understanding with AI-generated questions
4. **Progress Tracking**: Monitor completion and performance

## 🔐 Authentication & Security

- **NextAuth.js** integration with multiple providers
- **JWT-based** session management
- **Role-based** access control
- **API route** protection
- **Input validation** with Zod schemas

## 💳 Subscription System

- **Stripe Integration** for payment processing
- **Credit-based** course generation
- **Subscription tiers** with different limits
- **Webhook handling** for real-time updates

## 📱 Responsive Design

- **Mobile-first** approach
- **Tablet optimization** for learning on-the-go
- **Desktop enhancement** for full-featured experience
- **Touch-friendly** interactions

## 🎨 Design System

- **Consistent color palette** with CSS variables
- **Typography scale** with Lexend font
- **Component variants** using class-variance-authority
- **Animation patterns** with Framer Motion
- **Accessibility compliance** with Radix UI

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy with automatic builds on push

### Database Migration
```bash
npm run vercel-build  # Includes Prisma generation and migration
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenAI** for powerful AI capabilities
- **Vercel** for seamless deployment
- **Prisma** for excellent database tooling
- **Radix UI** for accessible components
- **Tailwind CSS** for rapid styling

---

**Built with ❤️ using Next.js, TypeScript, and AI**