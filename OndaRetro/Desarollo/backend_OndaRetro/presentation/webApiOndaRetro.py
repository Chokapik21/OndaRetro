#WebApiOndaRetro.py
from fastapi import FastAPI
from domain.entityOndaRetro import EntityOndaRetro

app = FastAPI(
    title="API Onda Retro",
    description="API para la Onda Retro",
    version="1.0.0"
)

# Get
@app.get(
        "/ConsultarOndaRetrotodo",
        summary= "consultar_onda_retro_todo",
        description= "Consultar todos los registros de Onda Retro",
        tags=["Onda Retro"]
        )
async def consultar_OndaRetro_todo():
    return "Ok"

# Get
@app.get(
    "/ConsultarOndaRetro/{IdOndaRetro}",
    summary="Consultar Onda Retro Uno",
    description="Consultar Onda Retro Uno",
    tags=["Onda Retro"]
)
async def consultar_OndaRetro_uno(IdOndaRetro: int):
    return IdOndaRetro
