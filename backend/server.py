from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone, date, time

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Define Models
class ReservationCreate(BaseModel):
    name: str
    email: str
    phone: str
    date: str  # ISO format date string
    time: str  # HH:MM format
    guests: int = Field(ge=1, le=20)
    special_requests: Optional[str] = None

class Reservation(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    date: str
    time: str
    guests: int
    special_requests: Optional[str] = None
    status: str = "confirmed"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    message: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class ContactMessageCreate(BaseModel):
    name: str
    email: str
    message: str

# Menu data
MENU_DATA = {
    "entrees": [
        {"name": "Velouté de butternut", "description": "Crème fraîche, graines de courge torréfiées, huile de noisette", "price": 12},
        {"name": "Burrata crémeuse", "description": "Tomates anciennes, pesto de basilic frais, huile d'olive extra vierge", "price": 14},
        {"name": "Tartare de saumon", "description": "Avocat, agrumes, herbes fraîches, toast de pain au levain", "price": 16},
        {"name": "Œuf parfait 63°", "description": "Crème de champignons, lardons croustillants, mouillettes au beurre", "price": 13},
    ],
    "plats": [
        {"name": "Filet de bœuf Rossini", "description": "Escalope de foie gras poêlée, sauce Périgueux, pommes grenaille", "price": 38},
        {"name": "Suprême de volaille fermière", "description": "Jus au thym, écrasé de pommes de terre à l'huile de truffe", "price": 28},
        {"name": "Pavé de cabillaud rôti", "description": "Beurre blanc au citron, légumes de saison, riz sauvage", "price": 32},
        {"name": "Risotto aux cèpes", "description": "Parmesan 24 mois, huile de truffe noire, roquette", "price": 26},
    ],
    "desserts": [
        {"name": "Fondant au chocolat Valrhona", "description": "Cœur coulant, crème anglaise vanille bourbon", "price": 12},
        {"name": "Tarte Tatin", "description": "Pommes caramélisées, glace vanille de Madagascar, caramel beurre salé", "price": 11},
        {"name": "Crème brûlée à la lavande", "description": "Caramel craquant, tuile aux amandes", "price": 10},
        {"name": "Assiette de fromages affinés", "description": "Sélection du moment, confiture de figues, noix", "price": 14},
    ],
    "boissons": [
        {"name": "Verre de vin rouge (Bordeaux)", "description": "Château sélection du sommelier", "price": 8},
        {"name": "Verre de vin blanc (Loire)", "description": "Sancerre, notes d'agrumes", "price": 9},
        {"name": "Cocktail signature Le Gros Arbre", "description": "Gin, sirop de sureau, citron vert, menthe fraîche", "price": 12},
        {"name": "Café gourmand", "description": "Espresso accompagné de trois mignardises maison", "price": 9},
    ]
}

# Reviews data
REVIEWS_DATA = [
    {
        "id": "1",
        "author": "Noémie Asfaux",
        "badge": "Local Guide · 24 avis · 48 photos",
        "text": "Un cadre magnifique, une cuisine faite maison. Je recommande.",
        "rating": 5
    },
    {
        "id": "2", 
        "author": "Antoine S",
        "badge": "Local Guide · 696 avis · 2 771 photos",
        "text": "Un lieu hors du temps ! Un bout de campagne avec une maison isolée et un cèdre du Liban bicentenaire se mirant dans les eaux du Bassin des Filtres, un ouvrage historique du Canal du Midi",
        "rating": 5
    },
    {
        "id": "3",
        "author": "Marie L.",
        "badge": "25 avis",
        "text": "Excellente découverte ! L'ambiance est chaleureuse et les plats sont délicieux. Le service est impeccable.",
        "rating": 5
    },
    {
        "id": "4",
        "author": "Pierre D.",
        "badge": "Local Guide · 150 avis",
        "text": "Un endroit magique au bord de l'eau. La terrasse sous le cèdre est un vrai bonheur. Cuisine raffinée et généreuse.",
        "rating": 4
    }
]

# Restaurant info
RESTAURANT_INFO = {
    "name": "Le Gros Arbre",
    "address": "110 Rue des Amidonniers, 31000 Toulouse",
    "area": "Bassin des Filtres – Centre-ville",
    "phone": "07 65 87 29 34",
    "facebook": "facebook.com",
    "rating": 4.4,
    "reviews_count": 558,
    "price_range": "30-40€",
    "hours": {
        "monday": "12:00 - 23:30",
        "tuesday": "Fermé",
        "wednesday": "Fermé",
        "thursday": "12:00 - 23:45",
        "friday": "12:00 - 23:45",
        "saturday": "12:00 - 23:45",
        "sunday": "12:00 - 23:45"
    },
    "coordinates": {
        "lat": 43.6114,
        "lng": 1.4289
    }
}

# API Routes
@api_router.get("/")
async def root():
    return {"message": "Le Gros Arbre API"}

@api_router.get("/menu")
async def get_menu():
    return MENU_DATA

@api_router.get("/reviews")
async def get_reviews():
    return REVIEWS_DATA

@api_router.get("/info")
async def get_restaurant_info():
    return RESTAURANT_INFO

@api_router.post("/reservations", response_model=Reservation)
async def create_reservation(input: ReservationCreate):
    reservation = Reservation(
        name=input.name,
        email=input.email,
        phone=input.phone,
        date=input.date,
        time=input.time,
        guests=input.guests,
        special_requests=input.special_requests
    )
    
    doc = reservation.model_dump()
    await db.reservations.insert_one(doc)
    
    return reservation

@api_router.get("/reservations", response_model=List[Reservation])
async def get_reservations():
    reservations = await db.reservations.find({}, {"_id": 0}).to_list(1000)
    return reservations

@api_router.get("/reservations/{reservation_id}", response_model=Reservation)
async def get_reservation(reservation_id: str):
    reservation = await db.reservations.find_one({"id": reservation_id}, {"_id": 0})
    if not reservation:
        raise HTTPException(status_code=404, detail="Reservation not found")
    return reservation

@api_router.delete("/reservations/{reservation_id}")
async def cancel_reservation(reservation_id: str):
    result = await db.reservations.delete_one({"id": reservation_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Reservation not found")
    return {"message": "Reservation cancelled successfully"}

@api_router.get("/available-times")
async def get_available_times(date: str):
    # Get all reservations for the date
    reservations = await db.reservations.find({"date": date}, {"_id": 0}).to_list(100)
    
    # Define available time slots
    lunch_slots = ["12:00", "12:30", "13:00", "13:30", "14:00"]
    dinner_slots = ["19:00", "19:30", "20:00", "20:30", "21:00", "21:30"]
    
    # Filter out fully booked slots (max 10 reservations per slot)
    booked_times = {}
    for res in reservations:
        t = res.get("time", "")
        booked_times[t] = booked_times.get(t, 0) + 1
    
    available_lunch = [t for t in lunch_slots if booked_times.get(t, 0) < 10]
    available_dinner = [t for t in dinner_slots if booked_times.get(t, 0) < 10]
    
    return {
        "lunch": available_lunch,
        "dinner": available_dinner
    }

@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(input: ContactMessageCreate):
    message = ContactMessage(
        name=input.name,
        email=input.email,
        message=input.message
    )
    
    doc = message.model_dump()
    await db.contact_messages.insert_one(doc)
    
    return message

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
