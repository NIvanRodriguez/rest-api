import {Router} from "express";
import {libro} from "./controller.js";
// se exporta la ruta
export const router = Router();
// creamos las rutas
router.get('/libros', libro.getAll);
router.get('/libro/:id', libro.getOne)
router.post('/libro', libro.add);
router.put('/libro/:id',libro.update);
router.delete('/libro/:isbn', libro.deleteLibro);