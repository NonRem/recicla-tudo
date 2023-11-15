from sqlmodel import SQLModel, Relationship, Field
from typing import Optional, List, TYPE_CHECKING

if TYPE_CHECKING:
    from ..reciclagem.model import Reciclagem

class Local(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    nome: str = Field(unique=True, index=True)
    cep: str
    logradouro: str
    cidade: str
    uf: str
    numero: str

    entregas: List["Reciclagem"] = Relationship(back_populates="posto")