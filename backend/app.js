const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Livro = require('./models/livro');

const livros = [
]

mongoose.connect('mongodb+srv://lucas:nw9i8Dmd10dHRXdz@cluster0.5m8t5.mongodb.net/livro?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  console.log("Conexão OK")
}).catch(() => {
  console.log('Conexão não está funcionando!')
})
app.use(bodyParser.json());

app.use ((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type,Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
  });

app.post('/api/livros', (req, res, next) => {
  const livro = new Livro({
    nome: req.body.nome,
    autor: req.body.autor,
    paginas: req.body.paginas
  })
  livro.save()
  .then(livroInserido => {
    res.status(201).json({
      mensagem: 'Livro inserido',
      id: livroInserido._id
    })
  })

});

app.get('/api/livro', (req, res, next) => {
  Livro.find().then(documents => {
    console.log(documents)
    res.status(200).json({
      mensagem: "Tudo Ok",
      livros: documents
    })
  })
})

app.use('/api/livro',(req,res, next) => {
  res.status(200).json({
    mensagem: "Tudo OK",
    livros: livros
    });
});

app.delete('/api/livros/:id', (req, res, next) => {
  Livro.deleteOne({_id: req.params.id}).then((resultado) => {
    console.log(resultado);
    res.status(200).json({mensagem: "Livro removido"})
  });
});

module.exports = app;

