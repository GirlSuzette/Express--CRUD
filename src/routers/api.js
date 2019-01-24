// configurar rutas

const { Router } = require('express')
const app = Router()
const companies = require('../controllers/companies/companies')

app.get('/companies', companies.index);
app.get('/companies/:id', companies.find);
app.post('/companies', companies.create);
// app.post  si existe no hace nada manda msj que ya existe  res--> company si no existe que lo grave en archivo
// app.put  Actualizacion  si existe lo puede modificar puedes modificar el ID y el nombre res-- objeto modificado 
// appe.delete que si lo encuentra lo elimina , res -- mostrar las compañias sin el elemento 

//postman borran hay que hacer un GET para testear si actualiza hay que hacer un get si post hay que hacer un GET 

module.exports = app; 