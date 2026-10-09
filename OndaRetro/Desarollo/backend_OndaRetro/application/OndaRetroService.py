from domain.entityOndaRetro import EntityOndaRetroCreate
from infrastructure.memoryRepository import MemoryRepository


class OndaRetroService:

    def __init__(self):
        self.repository = MemoryRepository()

    def consultar(self):
        datos = self.repository.get_all()
        return {
            "success": True,
            "message": "Consulta realizada correctamente",
            "data": datos
        }

    def consultar_por_id(self, id_onda_retro: int):
        onda_retro = self.repository.get_one(id_onda_retro)

        if onda_retro is None:
            return {
                "success": False,
                "message": "Registro de Onda Retro no encontrado",
                "data": None
            }

        return {
            "success": True,
            "message": "Consulta realizada correctamente",
            "data": onda_retro
        }

    def ingresar(self, onda_retro: EntityOndaRetroCreate):
        resultado = self.repository.create(onda_retro)
        return {
            "success": True,
            "message": "Registro creado correctamente",
            "data": resultado
        }

    def modificar(
        self,
        id_onda_retro: int,
        onda_retro: EntityOndaRetroCreate
    ):
        resultado = self.repository.update(id_onda_retro, onda_retro)

        if resultado is None:
            return {
                "success": False,
                "message": "Registro de Onda Retro no encontrado",
                "data": None
            }

        return {
            "success": True,
            "message": "Registro modificado correctamente",
            "data": resultado
        }

    def eliminar(self, id_onda_retro: int):
        resultado = self.repository.delete(id_onda_retro)

        if resultado is None:
            return {
                "success": False,
                "message": "Registro de Onda Retro no encontrado",
                "data": None
            }

        return {
            "success": True,
            "message": "Registro eliminado correctamente",
            "data": resultado
        }
