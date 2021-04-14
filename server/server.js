require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const { response } = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false}));

app.use(bodyParser.json());

 
app.get('/', function (req, res) {
  res.send('<h1>Bienvenido</h1>');
})

app.get('/usuario', function (req, res) {
  res.json({
    ok: 200,
    mensaje: 'Usuarios consultados con exito'

  });
});

app.post('/usuario', function(req, res){
  let nombre = req.body.nombre;
  let body = req.body;

  if(nombre === undefined){
    res.status(400).json({
        ok: 400,
        mensaje: 'favor de mandar el valor de nombre'
    });
  }else{
  
        res.json({ 
          ok:200,
          mensaje: 'usuario insertado con exito',
          body : body
  })
}
});

app.put ('/usuario/:id/:nombre', function(req,res){
  let id = req.params.id;
  let nombre = req.params.nombre;

  res.json({
    ok: 200,
    mensaje: 'usuario actualizado con exito',
    id: id,
    nombre: nombre
  });
});

app.delete ('/usuario/:id', function(req,res){
  let id = req.params.id;

  res.json({
    ok: 200,
    mensaje: 'usuario eliminado con exito',
    id: id
  });
 
});

mongoose.connect('mongodb://localhost:27017/starbucks',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
},(err, res)=> {
if(err) throw err;
console.log('base de datos ONLINE')
}
);

app.listen(process.env.PORT , () =>{
console.log('El servidor esta en linea por el puerto', process.env.PORT)
});