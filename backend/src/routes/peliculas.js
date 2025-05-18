import express from "express";
import peliculasController from "../controllers/peliculasController.js";
import multer from "multer"

const router = express.Router();

//Configurar una carpeta local que guarde 
//el registro de las imagenes subidas
const upload = multer({dest: "public/"})

router.route("/")
.get(peliculasController.getAllPeliculas)
.post(upload.single("image"),peliculasController.insertPeliculas);

router
.route("/:id")
.put(upload.single("image"), peliculasController.updatePelicula)
.delete(peliculasController.deletePelicula);


export default router;