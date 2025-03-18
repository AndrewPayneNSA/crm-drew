# CRM Application

A modern CRM application built with Next.js, Firebase, and Tailwind CSS. This application helps you manage clients, track payments, and calculate revenue shares.

## Features

- User Authentication (Sign up, Login, Logout)
- Client Management (Add, Edit, Delete, View)
- Payment Tracking
- Financial Summary with Charts
- Responsive Design
- Protected Routes

## Prerequisites

- Node.js 18.x or later
- npm or yarn
- Firebase account
- Vercel account (for deployment)

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd crm-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a Firebase project:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Get your Firebase configuration

4. Create a `.env.local` file in the root directory and add your Firebase configuration:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

5. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket).

2. Deploy to Vercel:
   - Go to [Vercel](https://vercel.com/)
   - Import your repository
   - Add your environment variables
   - Deploy

## Project Structure

```
crm-app/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── dashboard/         # Dashboard pages
│   │   ├── login/            # Login page
│   │   └── signup/           # Signup page
│   ├── components/           # React components
│   ├── contexts/             # React contexts
│   ├── hooks/                # Custom hooks
│   ├── lib/                  # Utility functions
│   └── types/                # TypeScript types
├── public/                   # Static files
└── package.json             # Dependencies and scripts
```

## Technologies Used

- Next.js 14 (App Router)
- Firebase (Authentication & Firestore)
- Tailwind CSS
- TypeScript
- Recharts (for charts)
- Headless UI
- Hero Icons

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
