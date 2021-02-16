require('./config/config');
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const path = require('path');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// Configuracion global de rutas en otro archivo
app.use(require('./routes/index'));

let renderHTML = path.resolve(__dirname, '../public/index.html');
app.get('/', function (req, res) {
    res.sendFile(renderHTML);
})
// revisar si esta ruta se hace desde el backend o el fontend
app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/login.html'));
})



// Conexión a base de datos MongoDB
mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) throw err;
        
    console.log("Base de datos online");
});

// Apertura de servidor por el puerto 3000
app.listen(process.env.PORT, ()=> {
    console.log("Escuchando en puerto 3000");
})