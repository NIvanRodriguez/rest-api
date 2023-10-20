import  {pool}  from "./database.js";
// req = request, la solocitud del cliente
// res= response, la repuesta del lado del servidor
class LibrosController{
    //Este método se encarga de manejar las solicitudes GET para obtener todos los libros desde la base de datos
    async getAll(req, res){
        //con el [] en resultado solo mostramos la primera linea de la lista
        const [result] = await pool.query(`SELECT * FROM libros`);
        res.json(result);
    
    }
async getOne(req, res){
    //Este método se encarga de manejar las solicitudes GET para obtener un libro específico
    const libro = req.body;
    const [result] = await pool.query(`SELECT * FROM libros WHERE id =(?)`, [libro.id]);
    res.json(result);
}
async add(req, res) {
    try {
        const libro = req.body;
        const [result] = await pool.query(`INSERT INTO libros (nombre, autor, categoria, año_publicacion, isbn) VALUES (?, ?, ?, ?, ?)`, [libro.nombre, libro.autor, libro.categoria, libro.año_publicacion, libro.isbn]);
        res.json({ "Id insertado": result.insertId});
    } catch (e) {
        console.log(e);
    }
}



}

export const libro = new LibrosController();

