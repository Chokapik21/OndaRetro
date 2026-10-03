
from domain.entityOndaRetro import EntityOndaRetro


class MemoryRepository:

    def __init__(self):
        self.registros: list[EntityOndaRetro] = []

    def get_all(self) -> list[EntityOndaRetro]:
        return self.registros

    def get_one(self, id_onda_retro: int) -> EntityOndaRetro | None:
        for registro in self.registros:
            if registro.id_onda_retro == id_onda_retro:
                return registro
        return None

    def create(self, onda_retro: EntityOndaRetro) -> EntityOndaRetro:
        self.registros.append(onda_retro)
        return onda_retro

    def update(
        self,
        id_onda_retro: int,
        onda_retro: EntityOndaRetro
    ) -> EntityOndaRetro | None:
        for index, item in enumerate(self.registros):
            if item.id_onda_retro == id_onda_retro:
                self.registros[index] = onda_retro
                return onda_retro
        return None

    def delete(self, id_onda_retro: int) -> EntityOndaRetro | None:
        for index, item in enumerate(self.registros):
            if item.id_onda_retro == id_onda_retro:
                return self.registros.pop(index)
        return None