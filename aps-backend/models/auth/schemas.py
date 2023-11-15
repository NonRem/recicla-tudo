from sqlmodel import SQLModel

class UserLogin(SQLModel):
    username: str
    password: str

class Token(SQLModel):
    acess_token: str
    token_type: str
    