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
  try{
    const libro = req.body;
    const [result] = await pool.query(`SELECT * FROM libros WHERE id =(?)`, [libro.id]);
    res.json(result);
  }catch (e){
    console.log(e);
  }  
}
async add(req, res) {
    //maneja solicitudes HTTP para agregar un nuevo libro a la base de datos.
    try {
        const libro = req.body;
        const [result] = await pool.query(`INSERT INTO libros (nombre, autor, categoria, año_publicacion, isbn) VALUES (?, ?, ?, ?, ?)`, [libro.nombre, libro.autor, libro.categoria, libro.año_publicacion, libro.isbn]);
        res.json({ "Id insertado": result.insertId});
    } catch (e) {
        console.log(e);
    }
}
  async update(req,res){
    // Este metodo nos permite actualizar los libros en la base de datos
    try{
        const libro = req.body;
        const[result] = await pool.query(`UPDATE libros SET nombre=?, autor=?, categoria=?, año_publicacion=?, isbn=? WHERE id=?`,[libro.nombre, libro.autor, libro.categoria, libro.año_publicacion, libro.isbn, libro.id]);
        res.json({"Registro actualizado":result.changedRows});
    } catch (e){
        console.log(e);
    }
  }
  async deleteLibro(req, res) {
    // Este método nos permite eliminar un libro de la base de datos por medio del ISBN
    try {
      const libro = req.body;
      const [result] = await pool.query('DELETE FROM libros WHERE isbn = ?', [libro.isbn]);
      res.json({ "Registros Eliminados": result.affectedRows });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: 'Error al eliminar el libro' });
    }
  }

}

export const libro = new LibrosController();

