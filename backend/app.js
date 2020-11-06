const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Livro = require('./models/livro')

const livros = [
  {
    id: '1',
    nome: 'Senhor dos aneis',
    autor: 'tolkien',
    paginas: 578
  },
  {
    id: '2',
    nome: 'Harry porter',
    autor: 'não sei',
    paginas: 345
  }
]

mongoose.connect('mongodb+srv://cliente:<password>@cluster0.jzkvl.mongodb.net/app-livro?retryWrites=true&w=majority')
.then(() => {
  console.log("Conexão OK")
}).catch(() => {
  console.log("Conexão NOK")
})

app.use(bodyParser.json());

app.use ((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type,Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
  });

app.post('/api/livros',(req, res, next) =>{
  const livro = new Livro({
    nome: req.body.nome,
    autor: req.body.autor,
    paginas: req.body.paginas
  })
  livro.save();
  console.log(livro);
  res.status(201).json({mensagem: 'Livro inserido'})
})

app.use('/api/livros',(req,res, next) => {
  res.status(200).json({
    mensagem: "Tudo OK",
    clientes: clientes
    });
});

module.exports = app;

