import PeliculasModel from "../models/Peliculas.js"
import {v2 as cloudinary} from "cloudinary";

import {config} from "../config.js";

//1- Configurar cloudinary con nuestra cuenta
cloudinary.config({
    cloud_name: config.cloudinary.cloudinary_name,
    api_key: config.cloudinary.cloudinary_api_key,
    api_secret: config.cloudinary.cloudinary_api_secret
})

//Array de funciones vacio
const peliculasController = {};

//SELECT 
peliculasController.getAllPeliculas = async(req, res) => {
    const peliculas = await PeliculasModel.find();
    res.json(peliculas);
};

//INSERT 
peliculasController.insertPeliculas = async (req, res) => {
    try {
        const{ titulo,  descripcion, director,genero ,anio, duracion } = req.body;
    let imageURL = ""
  
    //Subir la imagen a cloudinary
    if(req.file){
        const result = await cloudinary.uploader.upload(
            req.file.path,
            {
                folder: "public",
                allowed_formats: ["png", "jpg", "jpeg"]
            }
        )
        imageURL = result.secure_url
    }
//GUARDAR TODO EN LA BASE DE DATOS
const newPelicula = new PeliculasModel({ titulo,  descripcion, director,genero ,anio, duracion, image: imageURL})
newPelicula.save()

res.json({ message: "Pelicula send" });
    } catch (error) {
        console.log(error);
        
    }
    
};

export default peliculasController;

