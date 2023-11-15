from sqlmodel import SQLModel, Relationship, Field, Column, JSON
from typing import Optional, TYPE_CHECKING
from datetime import datetime, date

if TYPE_CHECKING:
    from ..usuario.model import Usuario
    from ..local.model import Local

class Reciclagem(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    entrega_data: date = Field(default=datetime.now().date())
    itens: dict = Field(default={}, sa_column=Column(JSON))

    id_usuario: int = Field(foreign_key="usuario.id")
    id_local: int = Field(foreign_key="local.id")

    coletor: "Usuario" = Relationship(back_populates="coletas")
    posto: "Local" = Relationship(back_populates="entregas")

    class Config():
        arbitrary_types_allowed = True