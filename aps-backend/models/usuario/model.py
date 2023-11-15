from sqlmodel import SQLModel, Relationship, Field
from typing import Optional, List, TYPE_CHECKING

if TYPE_CHECKING:
    from ..reciclagem.model import Reciclagem

class Usuario(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    nome: str
    login: str = Field(unique=True)
    senha: str

    coletas: List["Reciclagem"] = Relationship(back_populates="coletor")