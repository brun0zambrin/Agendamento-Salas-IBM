const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.set('view engine', 'ejs')
var db

//Abrindo server e conectando com MongoDB como user que somente vê
MongoClient.connect('mongodb://user:user123@ds137687.mlab.com:37687/ibmzambrin', (err, client) => {
if (err) return console.log(err)
db = client.db('ibmzambrin')
app.listen(3000, function(){
    console.log('Server rodando em 3000 e conectado com MongoDB como USER onde o mesmo somente visualiza o banco')
    })
})

//redirecinando para a página principal
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html')
})
app.post('/home', function(req, res){
    res.sendFile(__dirname + '/views/home.html')
})
app.post('/inserido', function(req, res){
    res.sendFile(__dirname + '/views/inserido.html')
})
app.post('/fail', function(req, res){
    res.sendFile(__dirname + '/views/error.html')
})
app.post('/preencha', function(req, res){
    res.sendFile(__dirname + '/views/error2.html')
})

app.post('/login', function(req, res){
    var usert, pwdt
    usert = req.body.username
    pwdt = req.body.pwd
    console.log(usert,pwdt)
    if(!usert || !pwdt || pwdt=='user123'){ 
        res.redirect(307, '/fail')}else{
        MongoClient.connect('mongodb://'+ usert +':'+ pwdt +'@ds137687.mlab.com:37687/ibmzambrin', (err, client) => {
            if (err) {
                res.redirect(307, '/fail');
                return console.log(err)
            }
        db = client.db('ibmzambrin')
        res.redirect(307, '/home');
        })}
})

//redirecionando para a página com os Horários já registrados
app.get('/agenda', (req, res) => {
    db.collection('respostas').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('agenda.ejs', {respostas: result})
    })
})

//No console mensagem se os dados foram inseridos com sucesso
app.post('/inserir',(req, res)=>{
    var nomet, emailt, salat, datet, timet
    nomet = req.body.nome
    emailt = req.body.email
    salat = req.body.sala
    datet = req.body.date
    timet = req.body.time
    if(!nomet && !emailt && !salat && !datet && !timet){
        res.redirect(307, '/preencha')}else{        
    console.log('Entradas do usuário ',req.body)
    db.collection('respostas').save(req.body, (err, result) => {
        if(err) return console.log(err)
        console.log('Dados inseridos e salvos no BD')
        res.redirect(307, '/inserido')
    })
}})
