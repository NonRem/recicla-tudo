from sqlmodel import SQLModel

class LocalCreate(SQLModel):
    nome: str
    cep: str
    logradouro: str
    cidade: str
    uf: str
    numero: str

class LocalRead(LocalCreate):
    id: int