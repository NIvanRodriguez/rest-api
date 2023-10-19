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
    const libro = req.body;
    const [result] = await pool.query(`SELECT * FROM libros WHERE id =(?)`, [libro.id]);
    res.json(result);
}


}

export const libro = new LibrosController();

