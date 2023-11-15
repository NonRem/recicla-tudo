from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select, Session
from models.usuario import model, schemas, auxiliar
from typing import List
from dependencies import get_session

router = APIRouter(prefix="/usuario", tags=["usuario"])

@router.post("/registro", response_model=schemas.UsuarioRead)
async def post_usuario(usuario: schemas.UsuarioCreate , session: Session = Depends(get_session)):
    usuario_existente = auxiliar.verificar_login_existente(usuario.login)
    if usuario_existente:
        raise HTTPException(status_code=400, detail="Login de usuário já existente")
    usuario_db = model.Usuario.from_orm(usuario)
    session.add(usuario_db)
    session.commit()
    session.refresh(usuario_db)
    return usuario_db