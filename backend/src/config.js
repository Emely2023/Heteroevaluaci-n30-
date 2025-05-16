// importo la libreria que acabo de instalar
import dotenv from "dotenv";

// Ejecutamos la libreria
// Ejecuto "Dotenv"
dotenv.config();

export const config = {
    db:{
        URI: process.env.DB_URI || "mongodb+srv://emelybntz1707:emely17@cluster2a.bb299.mongodb.net/Cinemarkemely?retryWrites=true&w=majority&appName=Cluster2A"
        ,
    },
    server:{
        port: process.env.PORT || 4000,
    },
    JWT: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES,
    },
    ADMIN:{
    emailAdmin: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD
    },
    email:{
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS
    },
    cloudinary:{
        cloudinary_name: process.env.CLOUDINARY_NAME,
        cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
        cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET
    },
};