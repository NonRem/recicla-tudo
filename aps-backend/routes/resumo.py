from sqlmodel import Session, select
from dependencies import get_session
from fastapi import Depends, APIRouter
from models.reciclagem.model import Reciclagem
from routes.auth import get_current_user

router = APIRouter(prefix="/resumo", tags=["Resumo"])

@router.get("/")
async def get_resumo(session: Session = Depends(get_session), user: dict = Depends(get_current_user)):
    id_usuario = user["id"]
    statement = select(Reciclagem).where(Reciclagem.id_usuario == id_usuario).order_by(Reciclagem.entrega_data.desc())
    query = session.exec(statement).all()
    if(len(query) == 0):
        resumo = {"ultima_entrega": "-", "total_reciclagens": len(query)}
    else:    
        resumo = {"ultima_entrega": query[0].entrega_data, "total_reciclagens": len(query)}
    return resumo
    