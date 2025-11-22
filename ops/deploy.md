
# 🚀 Deployment Guide for TradeFlow Pro

This guide covers the steps to deploy TradeFlow Pro to a production environment.

## Prerequisites

1.  **Source Code**: Ensure you have the latest version of the codebase.
2.  **Node.js**: Version 18+ is required for building the application.
3.  **Environment Variables**: You need your API keys ready (Gemini, Stripe).

## 1. Environment Configuration

Create a `.env` file in your production environment or configure these in your hosting provider's dashboard.

```env
# Required for AI Analysis
# Get this from https://aistudio.google.com/
API_KEY=your_gemini_api_key

# Stripe Configuration (Public key is safe for client-side)
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

> **Security Note**: Never commit `.env` files containing secret keys to public repositories.

## 2. Build Process

TradeFlow Pro uses Vite for building.

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Build**:
    ```bash
    npm run build
    ```
    This command compiles the TypeScript code and bundles assets into the `dist/` directory. The output is optimized for production with minification and tree-shaking.

3.  **Preview Build** (Optional):
    ```bash
    npm run preview
    ```
    This starts a local server serving the `dist/` folder to verify the build works as expected.

## 3. Hosting Options

### Option A: Vercel (Recommended)

Vercel is optimized for frontend apps and requires zero configuration for Vite.

1.  Push your code to GitHub/GitLab.
2.  Import the repository in Vercel.
3.  Vercel will auto-detect the Vite framework.
4.  Add your **Environment Variables** in the Vercel Project Settings.
5.  Click **Deploy**.

### Option B: Netlify

1.  Drag and drop the `dist/` folder to Netlify Drop, or connect via Git.
2.  Build Command: `npm run build`
3.  Publish Directory: `dist`
4.  Set Environment Variables in "Site Settings" -> "Build & Deploy" -> "Environment".

### Option C: Docker (Containerized)

For self-hosting or cloud containers (AWS ECS, Google Cloud Run).

1.  **Create Dockerfile**:
    ```dockerfile
    FROM node:18-alpine as builder
    WORKDIR /app
    COPY package*.json ./
    RUN npm install
    COPY . .
    RUN npm run build

    FROM nginx:alpine
    COPY --from=builder /app/dist /usr/share/nginx/html
    EXPOSE 80
    CMD ["nginx", "-g", "daemon off;"]
    ```

2.  **Build Image**:
    ```bash
    docker build -t tradeflow-pro .
    ```

3.  **Run Container**:
    ```bash
    docker run -p 80:80 -e API_KEY=your_key tradeflow-pro
    ```

## 4. Post-Deployment Verification

1.  **PWA Check**: Open the site on mobile. Verify you can "Add to Home Screen" and the icon appears correctly.
2.  **API Connection**: Go to the "Analysis" tab, search for a ticker (e.g., TSLA), and generate a report. If it fails, check your `API_KEY` configuration.
3.  **LocalStorage**: Verify that changing settings (e.g., Risk Limit) persists after a page refresh.

## 5. Troubleshooting

-   **Blank Page**: Check the browser console. Often due to missing environment variables or incorrect base path in `vite.config.ts`.
-   **AI Not Working**: Ensure the `API_KEY` is allowed to be called from your production domain (CORS settings in Google AI Studio).
-   **Styling Issues**: Ensure `tailwind.config.js` content paths cover all your component files.

## 6. Updates & Maintenance

-   **CI/CD**: Set up GitHub Actions to automatically run tests and deploy on push to the `main` branch.
-   **Monitoring**: Use Sentry or similar tools to track frontend errors in production.
