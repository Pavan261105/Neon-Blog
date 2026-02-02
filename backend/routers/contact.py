from fastapi import APIRouter, HTTPException, status
from models import ContactCreate
from database import contact_collection
from datetime import datetime

router = APIRouter(prefix="/api/contact", tags=["Contact"])

@router.post("/")
async def submit_contact(contact: ContactCreate):
    new_contact = contact.dict()
    new_contact["created_at"] = datetime.utcnow()
    
    await contact_collection.insert_one(new_contact)
    return {"message": "Message sent successfully"}
