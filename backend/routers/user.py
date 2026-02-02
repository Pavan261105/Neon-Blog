from fastapi import APIRouter, HTTPException, status, Depends
from models import UserRegister, UserLogin, UserResponse
from database import user_collection
from auth import get_password_hash, verify_password, create_access_token, get_current_user
from bson import ObjectId

router = APIRouter(prefix="/api/auth", tags=["Auth"])

@router.post("/register", response_model=UserResponse)
async def register(user: UserRegister):
    existing_user = await user_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(user.password)
    new_user = user.dict()
    new_user["password"] = hashed_password
    
    result = await user_collection.insert_one(new_user)
    created_user = await user_collection.find_one({"_id": result.inserted_id})
    return {"id": str(created_user["_id"]), "username": created_user["username"], "email": created_user["email"]}

@router.post("/login")
async def login(user: UserLogin):
    existing_user = await user_collection.find_one({"email": user.email})
    if not existing_user or not verify_password(user.password, existing_user["password"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    access_token = create_access_token(data={"sub": str(existing_user["_id"])})
    return {"access_token": access_token, "token_type": "bearer", "username": existing_user["username"]}

@router.get("/me", response_model=UserResponse)
async def read_users_me(current_user: dict = Depends(get_current_user)):
    return {"id": str(current_user["_id"]), "username": current_user["username"], "email": current_user["email"]}
