from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import local, reciclagem, usuario, auth, resumo

app = FastAPI()

app.include_router(local.router)
app.include_router(reciclagem.router)
app.include_router(usuario.router)
app.include_router(auth.router)
app.include_router(resumo.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://127.0.0.1:5173'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["Content-Type", "Authorization", "Access-Control-Allow-Origin"]
)