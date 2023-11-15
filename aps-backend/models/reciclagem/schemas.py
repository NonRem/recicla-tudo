from sqlmodel import SQLModel
from ..local.schemas import LocalRead
from datetime import date
from pydantic import Extra

class ReciclagemCreate(SQLModel, extra=Extra.allow):
    id_local: int
    itens: dict

class ReciclagemRead(ReciclagemCreate):
    id: int
    entrega_data: date
    posto: "LocalRead"
