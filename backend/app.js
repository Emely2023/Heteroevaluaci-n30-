import express from "express";
import cookieParser from "cookie-parser";
import peliculasRoutes from "./src/routes/peliculas.js"
import empleadosRoutes from "./src/routes/empleados.js"
import loginRoutes from "./src/routes/login.js"
import logoutRoutes from "./src/routes/logout.js"
import recoveryPasswordRoutes from "./src/routes/recoveryPassword.js";
import registerEmployeeRoutes from "./src/routes/registerEmployee.js";
import registerClientRoutes from "./src/routes/registerClient.js";
import clientesRoutes from "./src/routes/clientes.js"

//creo una constante que es igual a la libreria que importé
const app = express();
//  que acepte datos en json
app.use(express.json());

//que postman acepte guardar cookies
app.use(cookieParser())

// definir las rutas de las funciones que tendrá la página
app.use("/api/peliculas", peliculasRoutes);   
app.use("/api/empleados", empleadosRoutes);
app.use("/api/clientes", clientesRoutes);


//LOGIN Y LOGOUT
app.use("/api/login",loginRoutes)
app.use("/api/logout",logoutRoutes)

//REGISTER Y RECOVERY
app.use("/api/recoveryPassword", recoveryPasswordRoutes)
app.use("/api/registerEmployee", registerEmployeeRoutes)
app.use("/api/registerClient", registerClientRoutes)


//Doneee


export default app;