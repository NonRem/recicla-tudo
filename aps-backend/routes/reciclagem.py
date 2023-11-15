from fastapi import APIRouter, Depends
from sqlmodel import select, Session
from models.reciclagem import model, schemas
from typing import List
from dependencies import get_session
from routes.auth import get_current_user

router = APIRouter(prefix="/recicla", tags=["reciclagem"])

@router.get("/", response_model=List[schemas.ReciclagemRead])
async def get_reciclagens(session: Session = Depends(get_session), user = Depends(get_current_user)):
    statement = select(model.Reciclagem).where(model.Reciclagem.id_usuario == user["id"])
    reciclagens = session.exec(statement).all()
    return reciclagens

@router.post("/add", response_model=schemas.ReciclagemRead)
async def post_reciclagem(reciclagem: schemas.ReciclagemCreate, session: Session = Depends(get_session), user = Depends(get_current_user)):
    setattr(reciclagem,"id_usuario",user["id"])
    reciclagem_db = model.Reciclagem.from_orm(reciclagem)
    session.add(reciclagem_db)
    session.commit()
    session.refresh(reciclagem_db)
    return reciclagem_db