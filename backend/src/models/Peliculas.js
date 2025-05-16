/*
coleccion: Providers
campos:
 Titulo 
 descripcion
 director
 genero
 anio
 duracion
 imagen
 */

 import { Schema, model} from "mongoose"

 const PeliculasSchema = new Schema(
    {
        titulo: {
            type: String
        },
        descripcion:{
            type: String
            
        },
        director:{
            type: String
           
        },
        genero:{
            type: String
           
        },
        anio:{
            type: Number
            
        },
        duracion:{
            type: String
            
        },
        imagen:{
            type: String
        }
    },{
        timestamps: true,
        strict: false
    }
 )
 export default model ("Peliculas", PeliculasSchema)