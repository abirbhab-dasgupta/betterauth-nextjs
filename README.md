# AuthNext


## Overview

AuthNext is a modern authentication template for Next.js applications, focusing on developer experience, security, and performance. It provides a robust starting point for implementing complex authentication flows with minimal configuration.

## Technical Stack

The project leverages the following core technologies:

| Component | Technology | Documentation |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router) | [nextjs.org](https://nextjs.org/) |
| **Authentication** | Better Auth | [better-auth.com](https://www.better-auth.com/) |
| **Database** | Neon (PostgreSQL) | [neon.tech](https://neon.tech/) |
| **ORM** | Drizzle ORM | [orm.drizzle.team](https://orm.drizzle.team/) |
| **Styling** | Tailwind CSS 4 | [tailwindcss.com](https://tailwindcss.com/) |

## Key Features

- **Full-Stack Authentication**: Complete sign-in, sign-up, and sign-out flows powered by Better Auth.
- **Social Integration**: Ready-to-use Google OAuth integration.
- **Extended Profiles**: Support for usernames via the Better Auth username plugin.
- **Relational Data**: Seamless database interactions using Drizzle ORM and Neon PostgreSQL.
- **Modern UI**: State-of-the-art styling with Tailwind CSS 4 including full dark mode support.
- **User Dashboard**: Interactive profile management and session visualization.

## Getting Started

### Prerequisites

- Node.js 18+
- A Neon PostgreSQL database instance

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/authnext.git
   cd authnext
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file based on the provided `.env.example` and populate it with your credentials (database URL, auth secrets, and OAuth client IDs).

4. Synchronize the database schema:
   ```bash
   npx drizzle-kit push
   ```

5. Start the development environment:
   ```bash
   npm run dev
   ```


