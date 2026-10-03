#Entity OndaRetro
from pydantic import BaseModel

class EntityOndaRetro(BaseModel):
    id_onda_retro: int
    nombre_onda_retro: str