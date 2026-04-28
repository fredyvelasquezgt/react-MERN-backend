const express = require('express');
const { dbConnection } = require('./db/config');
require('dotenv').config()
const cors = require('cors');
const path = require('path')

//Crear el servidor de express

const app = express();

//base de datos
dbConnection();

//Directorio publico

//CORS

app.use(cors())

app.use(express.static('public'))

//Lectura y parseo del body
app.use(express.json())

//Rutas

app.use('/api/auth', require('./routes/auth'));


app.use('/api/events', require('./routes/events'));


app.use('/{*splat}', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});


//escuchar peticiones

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})
