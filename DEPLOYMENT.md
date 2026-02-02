
# Deployment Guide

Follow these steps to deploy your full-stack Neon Blog app.

## 🛑 CRITICAL: Database Setup (MongoDB Atlas)

**Your local MongoDB (localhost) will NOT work on the cloud.** You must use a cloud database.

1.  **Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)** and sign up for a free account.
2.  **Create a Cluster**: Select the **Shared (FREE)** option. Choose a provider (AWS) and region close to you. Click **Create Cluster**.
3.  **Create a User**:
    *   Go to **Database Access** (sidebar).
    *   Click **Add New Database User**.
    *   Select **Password** (authentication method).
    *   Enter a **Username** and **Password**. **Write these down!**
    *   Click **Add User**.
4.  **Allow Network Access**:
    *   Go to **Network Access** (sidebar).
    *   Click **Add IP Address**.
    *   Select **Allow Access from Anywhere** (`0.0.0.0/0`). (This allows Render to connect).
    *   Click **Confirm**.
5.  **Get Connection String**:
    *   Go to **Database** (sidebar).
    *   Click **Connect** on your cluster.
    *   Select **Drivers**.
    *   Copy the connection string (e.g., `mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority`).
    *   **Replace `<password>`** with the password you created in step 3.

---

## 1. Backend Deployment (Render)

Render is an excellent, free platform for hosting Python/FastAPI apps.

1.  **Push your code to GitHub**: Create a repository for this project and push all files.
2.  **Sign up for Render**: Go to [render.com](https://render.com) and sign in with GitHub.
3.  **New Web Service**: Click "New +" -> "Web Service".
4.  **Connect Repo**: Select your GitHub repository.
5.  **Configure Settings**:
    *   **Name**: `neon-blog-api` (or similar).
    *   **Region**: Closest to you (e.g., Frankfurt/Oregon).
    *   **Root Directory**: `backend` (Important!).
    *   **Build Command**: `pip install -r requirements.txt`.
    *   **Start Command**: `gunicorn -k uvicorn.workers.UvicornWorker main:app`.
6.  **Environment Variables**: Scroll down to the "Environment Variables" section and add:
    *   `MONGO_URL`: Paste your **MongoDB Atlas Connection String** from the step above.
    *   `SECRET_KEY`: A secure random string (e.g., `supersecretkey123`).
    *   `PYTHON_VERSION`: `3.10.0` (Recommended).
7.  **Deploy**: Click "Create Web Service". Wait for the build to finish.
8.  **Copy URL**: Once deployed, copy your backend URL (e.g., `https://neon-blog-api.onrender.com`).

---

## 2. Frontend Deployment (Vercel)

Vercel is the best place to host React/Vite apps.

1.  **Sign up for Vercel**: Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2.  **Add New Project**: Import your GitHub repository.
3.  **Configure Project**:
    *   **Root Directory**: Click "Edit" and select `frontend`.
    *   **Framework Preset**: Vite (should be auto-detected).
    *   **Build Command**: `npm run build` (default).
    *   **Output Directory**: `dist` (default).
4.  **Environment Variables**:
    *   Add a new variable named `VITE_API_URL`.
    *   **Value**: Your **Render Backend URL** (e.g., `https://neon-blog-api.onrender.com`). **Do not add a trailing slash**.
5.  **Deploy**: Click "Deploy".
6.  **Done!**: Your website is now live.

## Notes

-   **Development**: Locally, the frontend will fallback to `http://localhost:8000` automatically.
