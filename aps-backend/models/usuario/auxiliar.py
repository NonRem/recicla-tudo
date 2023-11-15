from sqlmodel import Session, select
from dependencies import get_session
from database import engine
from fastapi import Depends
from models.usuario.model import Usuario

def verificar_login_existente(login: str):
    with Session(engine) as session:
        usuario = session.exec(select(Usuario).where(Usuario.login == login)).first()
        return usuario