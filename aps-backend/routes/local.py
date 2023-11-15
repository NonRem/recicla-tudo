from fastapi import APIRouter, Depends, Request
from sqlmodel import select, Session
from models.local import model, schemas
from typing import List
from dependencies import get_session
from routes.auth import get_current_user

router = APIRouter(prefix="/local", tags=["local"], dependencies=[Depends(get_current_user)])

@router.get("/", response_model=List[schemas.LocalRead])
async def get_local(session: Session = Depends(get_session)):
    statement = select(model.Local)
    locais = session.exec(statement).all()
    return locais

@router.post("/add", response_model=schemas.LocalRead)
async def post_local(local: schemas.LocalCreate , session: Session = Depends(get_session)):
    local_db = model.Local.from_orm(local)
    session.add(local_db)
    session.commit()
    session.refresh(local_db)
    return local_db
