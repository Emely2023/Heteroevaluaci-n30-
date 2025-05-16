import express from "express";
import cookieParser from "cookie-parser";
import peliculasRoutes from "./src/routes/peliculas.js"
import empleadosRoutes from "./src/routes/empleados.js"
import loginRoutes from "./src/routes/login.js"
import logoutRoutes from "./src/routes/logout.js"



//creo una constante que es igual a la libreria que importé
const app = express();
//  que acepte datos en json
app.use(express.json());

//que postman acepte guardar cookies
app.use(cookieParser())

// definir las rutas de las funciones que tendrá la página
app.use("/api/peliculas", peliculasRoutes);   
app.use("/api/empleados", empleadosRoutes);


pp.use("/api/login",loginRoutes)
app.use("/api/logout",logoutRoutes)

export default app;