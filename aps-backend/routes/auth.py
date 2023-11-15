from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from dependencies import get_session
from sqlmodel import Session, select
from models.auth import schemas
from models.usuario.model import Usuario
from typing import Annotated
from datetime import timedelta, datetime
from jose import JWTError, jwt
from database import engine


SECRET_KEY = "teste"
ALGORITHM = "HS256"

bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")

router = APIRouter(prefix="/auth", tags=["auth"])
'''@router.post("/")
async def logar_usuario( , session: Session = Depends(get_session)):
    pass'''

@router.post("/token")
def token_login(form_data: Annotated[OAuth2PasswordRequestForm,Depends()]):
    usuario = authenticate_user(form_data.username, form_data.password)
    if not usuario:
        raise HTTPException(status_code=401, detail="Usuário inválido.")
    token = create_acess_token(usuario.login, usuario.id, timedelta(minutes=20))
    jwt_encoded = {"access_token": token, "token_type": "bearer"}

    return jwt_encoded

def create_acess_token(login: str, id: int, expires_delta: timedelta):
    encode = {"sub": login, "id": id}
    expires = datetime.utcnow() + expires_delta
    encode.update({"exp": expires})
    return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)

def authenticate_user(login: str, senha: str):
    with Session(engine) as session:
        usuario = session.exec(select(Usuario).where(Usuario.login == login)).first()
    if not usuario:
        return False
    if not (usuario.senha == senha):
        return False
    return usuario

def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        user_id: int = payload.get("id")
        if username is None or user_id is None:
            raise HTTPException(status_code=401, detail="Usuário não pode ser validado.")
    except JWTError:
        raise HTTPException(status_code=401, detail="Usuário não é validado.")
    return {"login": username, "id": user_id}