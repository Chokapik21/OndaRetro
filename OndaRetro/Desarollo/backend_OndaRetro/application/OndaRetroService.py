from domain.entityOndaRetro import EntityOndaRetro
from infrastructure.memoryRepository import MemoryRepository


class OndaRetroService:

    def __init__(self):
        self.repository = MemoryRepository()

    def consultar(self):
        datos = self.repository.get_all()
        return {
            "operacion": "Consulta realizada",
            "payload": datos
        }

    def consultar_por_id(self, id_onda_retro: int):
        onda_retro = self.repository.get_one(id_onda_retro)

        if onda_retro is None:
            return {
                "operacion": "Consulta realizada",
                "mensaje": "Registro de Onda Retro no encontrado",
                "payload": None
            }

        return {
            "operacion": "Consulta realizada",
            "payload": onda_retro  # Corregido: antes decía 'libreria'
        }

    def ingresar(self, onda_retro: EntityOndaRetro):
        resultado = self.repository.create(onda_retro)
        return {
            "operacion": "Ingreso realizado",
            "payload": resultado
        }

    def modificar(
        self,
        id_onda_retro: int,
        onda_retro: EntityOndaRetro
    ):
        resultado = self.repository.update(
            id_onda_retro,
            onda_retro
        )

        if resultado is None:
            return {
                "operacion": "Modificación realizada",
                "mensaje": "Registro de Onda Retro no encontrado",
                "payload": None
            }

        return {
            "operacion": "Modificación realizada",
            "payload": resultado
        }

    def eliminar(self, id_onda_retro: int):
        resultado = self.repository.delete(id_onda_retro)

        if resultado is None:
            return {
                "operacion": "Eliminación realizada",
                "mensaje": "Registro de Onda Retro no encontrado",
                "payload": None
            }

        return {
            "operacion": "Eliminación realizada",
            "payload": resultado
        }