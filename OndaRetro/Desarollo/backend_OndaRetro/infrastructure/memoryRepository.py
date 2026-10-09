from typing import Optional

from domain.entityOndaRetro import EntityOndaRetro, EntityOndaRetroCreate


class MemoryRepository:

   #Repositorio en memoria. No usa base de datos: la información

    def __init__(self):
        self.registros: list[EntityOndaRetro] = []
        self.siguiente_id: int = 1

    def get_all(self) -> list[EntityOndaRetro]:
        return self.registros

    def get_one(self, id_onda_retro: int) -> Optional[EntityOndaRetro]:
        for registro in self.registros:
            if registro.id_onda_retro == id_onda_retro:
                return registro
        return None

    def create(self, datos: EntityOndaRetroCreate) -> EntityOndaRetro:
        nuevo_registro = EntityOndaRetro(
            id_onda_retro=self.siguiente_id,
            **datos.model_dump()
        )
        self.registros.append(nuevo_registro)
        self.siguiente_id += 1
        return nuevo_registro

    def update(
        self,
        id_onda_retro: int,
        datos: EntityOndaRetroCreate
    ) -> Optional[EntityOndaRetro]:
        for index, item in enumerate(self.registros):
            if item.id_onda_retro == id_onda_retro:
                registro_actualizado = EntityOndaRetro(
                    id_onda_retro=id_onda_retro,
                    **datos.model_dump()
                )
                self.registros[index] = registro_actualizado
                return registro_actualizado
        return None

    def delete(self, id_onda_retro: int) -> Optional[EntityOndaRetro]:
        for index, item in enumerate(self.registros):
            if item.id_onda_retro == id_onda_retro:
                return self.registros.pop(index)
        return None
