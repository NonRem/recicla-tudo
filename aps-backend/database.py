from sqlmodel import SQLModel, create_engine
from models.local.model import Local
from models.reciclagem.model import Reciclagem
from models.usuario.model import Usuario

DATABASE_URL = "sqlite:///database.db"
engine = create_engine(DATABASE_URL)

def create_database():
    SQLModel.metadata.create_all(engine)

def main():
    create_database()

if __name__ == "__main__":
    main()