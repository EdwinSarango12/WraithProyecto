//Requerir modulos
import express from "express"; //framework
import dotenv from "dotenv";
import cors from "cors"; //sirve para conectar el backend y frontend con codigo de area
import routerJugadores from './routers/Jugador_routes.js'

//Inicializaciones
const app = express()
dotenv.config()

//Configuraciones
app.set('port', process.env.PORT || 3000) 
//app.set('port', process.env.CLOUDINARY || 3000) //process es paara datos sensibles
app.use(cors())

//MiddLewares
app.use(express.json()) //guarda la informacion del frontend en un archivo json para procesar el backend

//Rutas
app.get('/',(req,res)=>{
    res.send("Server on")
})

// Rutas para jugadores
app.use('/api',routerJugadores)

// Manejo de una ruta que no sea encontrada
app.use((req,res)=>res.status(404).send("Endpoint no encontrado - 404"))


//Exportar la instancia
export default app

//EL uso del archivo no es muy usado pero es necesario