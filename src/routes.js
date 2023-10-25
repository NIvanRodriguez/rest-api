import {Router} from "express";
import {libro} from "./controller.js";
// se exporta la ruta
export const router = Router();
// creamos las rutas
router.get('/libros', libro.getAll);
router.get('/libro/:isbn', libro.getOne)
router.post('/cargar', libro.add);
router.put('/cambiar/:isbn',libro.update);
router.delete('/eliminar/:isbn', libro.deleteLibro);