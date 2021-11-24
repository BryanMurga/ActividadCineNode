const express = require('express');
const router = express.Router();
const pool = require('../database.js');

router.get('/', async(req, res) =>{
    let listPeliculas = await pool.query('SELECT * FROM pelicula');
    res.json({
        status: 200,
        message: "Se ha listado correctamente",
        listPeliculas : listPeliculas
    });
});

router.get('/:id', async(req, res) => {
    const { id } = req.params;      
    let peliculas = await pool.query('SELECT * FROM pelicula WHERE id = ?',[id]);
    res.json({
        status: 200,
        message: "Se ha obtenido correctamente",
        peliculas : peliculas
    });
});

router.post('/create', async(req, res) => {
    var creacion = new Date().toISOString();
    const { titulo, descripcion, sinopsis, rating, status, categoria } = req.body;
    const peliculas = {
        titulo, descripcion, sinopsis, rating, dateRegister: creacion, status: 1, categoria
    };
        await pool.query('INSERT INTO pelicula set ?', [peliculas]);
        res.json({
            status: 200,
            message: "Se ha creado correctamente",
            peliculas : peliculas
        });
    
}); 

router.post('/update/:id', async (req, res)=>{
    const { id } = req.params;
    var dateUpdate = new Date().toISOString();
    const { titulo, descripcion, sinopsis , rating, categoria} = req.body;

    const peliculas = { titulo, descripcion, sinopsis, rating, dateUpdate: dateUpdate, categoria };

     await pool.query('UPDATE pelicula SET ? WHERE id = ?', [peliculas, id]);
        res.json({
            status: 200,
            message: "Se ha actualizado correctamente",
            peliculas : peliculas
        });
});

router.post ('/delete/:id', async (req, res) =>{
    const { id } = req.params;

    await pool.query('UPDATE pelicula SET status = 0 WHERE id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha eliminado correctamente"
    });
});


module.exports = router;