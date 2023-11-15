from sqlmodel import SQLModel

class UsuarioCreate(SQLModel):
    nome: str
    login: str
    senha: str

class UsuarioRead(SQLModel):
    id: int
    login: str
    nome: str
