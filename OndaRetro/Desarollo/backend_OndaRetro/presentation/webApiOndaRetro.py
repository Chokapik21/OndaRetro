# WebApiOndaRetro.py
from fastapi import FastAPI, HTTPException, status

from domain.entityOndaRetro import EntityOndaRetroCreate
from application.OndaRetroService import OndaRetroService


app = FastAPI(
    title="API OndaRetro IUPB",
    description="API básica para gestión de la tienda de música",
    version="1.0.0"
)

service = OndaRetroService()

# --------------------------------
# GET - Consulta
# --------------------------------

@app.get(
    "/api/OndaRetro",
    summary="Consultar Todas",
    description="Consultar Todas",
    tags=["OndaRetro"]
)
async def consultar():
    return service.consultar()


# --------------------------------
# GET ONE - Consulta por ID
# --------------------------------

@app.get(
    "/api/OndaRetro/{id_onda_retro}",
    summary="Consultar Una",
    description="Consultar por id",
    tags=["OndaRetro"]
)
async def consultar_por_id(id_onda_retro: int):
    resultado = service.consultar_por_id(id_onda_retro)

    if not resultado["success"]:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=resultado["message"]
        )

    return resultado


# --------------------------------
# POST - Ingreso
# --------------------------------

@app.post(
    "/api/OndaRetro",
    summary="Ingresar",
    description="Ingresar",
    tags=["OndaRetro"],
    status_code=status.HTTP_201_CREATED
)
async def ingresar(onda_retro: EntityOndaRetroCreate):
    return service.ingresar(onda_retro)


# --------------------------------
# PUT - Modificación
# --------------------------------

@app.put(
    "/api/OndaRetro/{id_onda_retro}",
    summary="Modificar",
    description="Modificar",
    tags=["OndaRetro"]
)
async def modificar(
    id_onda_retro: int,
    onda_retro: EntityOndaRetroCreate
):
    resultado = service.modificar(id_onda_retro, onda_retro)

    if not resultado["success"]:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=resultado["message"]
        )

    return resultado


# --------------------------------
# DELETE - Eliminación
# --------------------------------

@app.delete(
    "/api/OndaRetro/{id_onda_retro}",
    summary="Eliminar OndaRetro",
    description="Eliminar OndaRetro",
    tags=["OndaRetro"]
)
async def eliminar(id_onda_retro: int):
    resultado = service.eliminar(id_onda_retro)

    if not resultado["success"]:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=resultado["message"]
        )

    return resultado
