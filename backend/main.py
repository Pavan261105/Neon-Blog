from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import user, blog, contact

app = FastAPI(title="Modern Blog API", version="1.0.0")

# CORS
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router)
app.include_router(blog.router)
app.include_router(contact.router)

@app.get("/")
def root():
    return {"message": "Welcome to the Modern Blog API"}
