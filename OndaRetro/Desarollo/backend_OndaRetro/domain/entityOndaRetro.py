# Entity OndaRetro
from pydantic import BaseModel, Field


class EntityOndaRetroCreate(BaseModel):
    #Esquema de entrada para POST y PUT.
    #El id lo asigna automatico
    nombre_onda_retro: str = Field(..., min_length=1, description = "Nombre del producto")
    artista: str = Field(..., min_length=1, description = "Artista o banda")
    genero: str = Field(..., min_length=1, description = "Género musical")
    precio: float = Field(..., gt=0, description = "Precio del producto")
    cantidad: int = Field(..., ge=0, description = "Cantidad disponible en inventario")
    disponible: bool = Field(..., description = "Indica si el producto está disponible")

class EntityOndaRetro(EntityOndaRetroCreate):
   # Entidad completa, tal como se almacena y se retorna al cliente.
    id_onda_retro: int
    