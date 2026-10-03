# WebApiOndaRetro.py
from fastapi import FastAPI
from domain.entityOndaRetro import EntityOndaRetro


app = FastAPI(
    title="API OndaRetro IUPB",
    description="API básica para gestión de la tienda de música",
    version="1.0.0"
)

# service = OndaRetroService()


@app.get(
    "/",
    summary="Consultar",
    description="Consultar",
    tags=["OndaRetro"]
)
async def inicio():
    return {
        "mensaje": "API OndaRetro IUPB funcionando"
    }


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
    return []
    # return service.consultar()


# --------------------------------
# GET ONE - Consulta por ID
# --------------------------------

@app.get(
    "/api/OndaRetro/{id_onda_retro}",
    summary="Consultar Tiendas Una",
    description="Consultar por id",
    tags=["OndaRetro"]
)
async def consultar_por_id(id_onda_retro: int):
    return {"id_onda_retro": id_onda_retro}
    # return service.consultar_por_id(id_onda_retro)


# --------------------------------
# POST - Ingreso
# --------------------------------

@app.post(
    "/api/OndaRetro",
    summary="Ingresar",
    description="Ingresar",
    tags=["OndaRetro"]
)
async def ingresar(onda_retro: EntityOndaRetro):
    return onda_retro
    # return service.ingresar(onda_retro)


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
    onda_retro: EntityOndaRetro
):
    return {"id_onda_retro": id_onda_retro, "datos": onda_retro}
    # return service.modificar(id_onda_retro, onda_retro)


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
    return {"mensaje": f"Registro {id_onda_retro} eliminado"}
    # return service.eliminar(id_onda_retro)