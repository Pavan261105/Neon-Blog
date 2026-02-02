from fastapi import APIRouter, HTTPException, Depends, status
from typing import List
from database import blog_collection
from models import BlogCreate, BlogUpdate, BlogResponse
from auth import get_current_user
from bson import ObjectId
from datetime import datetime

router = APIRouter(prefix="/api/blogs", tags=["Blogs"])

@router.get("/", response_model=List[BlogResponse])
async def get_blogs(
    limit: int = 100, 
    skip: int = 0,
    search: str = None,
    category: str = None
):
    query = {}
    
    if search:
        query["title"] = {"$regex": search, "$options": "i"}
    
    if category and category != "All":
        query["category"] = category

    blogs_cursor = blog_collection.find(query).skip(skip).limit(limit).sort("created_at", -1)
    blogs = await blogs_cursor.to_list(length=limit)
    response = []
    for blog in blogs:
        blog["id"] = str(blog["_id"])
        response.append(blog)
    return response

@router.get("/{id}", response_model=BlogResponse)
async def get_blog(id: str):
    if not ObjectId.is_valid(id):
         raise HTTPException(status_code=400, detail="Invalid ID format")
    blog = await blog_collection.find_one({"_id": ObjectId(id)})
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    blog["id"] = str(blog["_id"])
    return blog

@router.post("/", response_model=BlogResponse)
async def create_blog(blog: BlogCreate, current_user: dict = Depends(get_current_user)):
    new_blog = blog.dict()
    new_blog["author_id"] = str(current_user["_id"])
    new_blog["author_username"] = current_user["username"]
    new_blog["created_at"] = datetime.utcnow()
    new_blog["updated_at"] = datetime.utcnow()
    
    result = await blog_collection.insert_one(new_blog)
    created_blog = await blog_collection.find_one({"_id": result.inserted_id})
    created_blog["id"] = str(created_blog["_id"])
    return created_blog

@router.put("/{id}", response_model=BlogResponse)
async def update_blog(id: str, blog: BlogUpdate, current_user: dict = Depends(get_current_user)):
    if not ObjectId.is_valid(id):
         raise HTTPException(status_code=400, detail="Invalid ID format")
    
    existing_blog = await blog_collection.find_one({"_id": ObjectId(id)})
    if not existing_blog:
        raise HTTPException(status_code=404, detail="Blog not found")
        
    if existing_blog["author_id"] != str(current_user["_id"]):
        raise HTTPException(status_code=403, detail="Not authorized to update this blog")
    
    update_data = {k: v for k, v in blog.dict().items() if v is not None}
    if update_data:
        update_data["updated_at"] = datetime.utcnow()
        await blog_collection.update_one({"_id": ObjectId(id)}, {"$set": update_data})
    
    updated_blog = await blog_collection.find_one({"_id": ObjectId(id)})
    updated_blog["id"] = str(updated_blog["_id"])
    return updated_blog

@router.delete("/{id}")
async def delete_blog(id: str, current_user: dict = Depends(get_current_user)):
    if not ObjectId.is_valid(id):
         raise HTTPException(status_code=400, detail="Invalid ID format")

    existing_blog = await blog_collection.find_one({"_id": ObjectId(id)})
    if not existing_blog:
        raise HTTPException(status_code=404, detail="Blog not found")
        
    if existing_blog["author_id"] != str(current_user["_id"]):
        raise HTTPException(status_code=403, detail="Not authorized to delete this blog")
        
    await blog_collection.delete_one({"_id": ObjectId(id)})
    return {"message": "Blog deleted successfully"}
