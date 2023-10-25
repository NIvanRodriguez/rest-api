import  {pool}  from "./database.js";
// req = request, la solocitud del cliente
// res= response, la repuesta del lado del servidor
class LibrosController{
    //Este método se encarga de manejar las solicitudes GET para obtener todos los libros desde la base de datos
    async getAll(req, res){
        //con el [] en resultado solo mostramos la primera linea de la lista
       try{
        const [result] = await pool.query(`SELECT * FROM libros`);
       if(result.length == 0){
        res.status(404).json({ error: 'no existen los libros' });
       }else{
        res.json(result);
       }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener libros' });
      }
    }
async getOne(req, res){
 //Este método se encarga de manejar las solicitudes GET para obtener un libro específico
  try{
    const libro = req.params.isbn;
    const [result] = await pool.query(`SELECT * FROM libros WHERE isbn =(?)`, [libro]);
   if(result.length == 0){
    res.status(404).json({ error: 'No existe el libro' });
   }else{
    res.json(result);
   }
  }catch (error){
    console.error(error);
    res.status(500).json({ error: 'Error al solicitar el libro' });
  }  
}
async add(req, res) {
    //maneja solicitudes HTTP para agregar un nuevo libro a la base de datos.
    try {
        const libro = req.body;
      if(!libro.nombre || !libro.autor || !libro.categoria || !libro.año_publicacion || !libro.isbn){
        res.status(404).json({ error: 'Faltan campos' });
      }else{
        const [result] = await pool.query(`INSERT INTO libros (nombre, autor, categoria, año_publicacion, isbn) VALUES (?, ?, ?, ?, ?)`, [libro.nombre, libro.autor, libro.categoria, libro.año_publicacion, libro.isbn]);
        res.json({ "Id insertado": result.insertId});
      }
    } catch (error) {
        console.error(error);
         res.status(500).json({ error: 'Error al agregar el libro' });
    }
}
  async update(req,res){
    // Este metodo nos permite actualizar los libros en la base de datos
    try{
        const libro = req.body;
        const libroId = req.params.isbn;
        const[result] = await pool.query(`UPDATE libros SET nombre=(?), autor=(?), categoria=(?), año_publicacion=(?), isbn=(?) WHERE id=(?)`, [libro.nombre, libro.autor, libro.categoria, libro.año_publicacion, libro.isbn, libro.id, libroId]);
       if(result.changedRows == 0){
        res.status(404).json({ error: 'No existe el libro' });
       }else{
        res.json({"Registro actualizado":result.changedRows});
       }
    } catch (error){
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el libro' });
    }
  }
  async deleteLibro(req, res) {
    // Este método nos permite eliminar un libro de la base de datos por medio del ISBN
      try{
      const libro = req.params.isbn;
      const [result] = await pool.query(`DELETE FROM libros WHERE isbn = (?)`, [libro]);
      if (result.affectedRows == 0){
        res.status(404).json({ error: 'No existe el libro' });
      }else {
      res.json({"Registro eliminado":result.affectedRows});
      }
    } catch (error){
      console.error(error);

      res.status(500).json({ error: 'Error al eliminar el libro' });
  }
  }
  

}

export const libro = new LibrosController();

