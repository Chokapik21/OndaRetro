#Entity OndaRetro
from pydantic import BaseModel

class EntityOndaRetro(BaseModel):
    IdOndaRetro: int
    NombreOndaRetro: str