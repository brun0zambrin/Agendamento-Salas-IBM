const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const app = express();
var cfenv = require('cfenv');
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.set('view engine', 'ejs')
var db

//Abrindo server e conectando com MongoDB como user
//User só tem permissão de ler
MongoClient.connect('mongodb://user:user123@ds137687.mlab.com:37687/ibmzambrin', (err, client) => {
console.log('Conectado ao Banco como USER')
if (err) return console.log(err)
db = client.db('ibmzambrin')
app.listen(appEnv.port, '0.0.0.0', function(){
    console.log('Server iniciado com sucesso')
    })
})

//redirecinando para a página de login
app.get('/', function(req, res){
    console.log('Redirecionando p/ Login')
    res.sendFile(__dirname + '/views/index.html')
})
//redirecinando para a página principal
app.post('/home', function(req, res){
    console.log('Redirecionando p/ home')
    res.sendFile(__dirname + '/views/home.html')
})
//redirecinando para a página de aviso, dados inseridos
app.post('/inserido', function(req, res){
    console.log('Redirecionando p/ inserido ')
    res.sendFile(__dirname + '/views/inserido.html')
})
//redirecinando para a página de erro de login
app.post('/fail', function(req, res){
    console.log('Redirecionando p/ error 1')
    res.sendFile(__dirname + '/views/error.html')
})
//redirecinando para a página de erro, todos os dados devem ser preenchidos
app.post('/preencha', function(req, res){
    console.log('Redirecionando p/ error2')
    res.sendFile(__dirname + '/views/error2.html')
})

//LOGIN
app.post('/login', function(req, res){
    var usert, pwdt
    usert = req.body.username
    pwdt = req.body.pwd
    console.log('User ',usert,'Password',pwdt)
    if(!usert || !pwdt || pwdt=='user123'){
        console.log('Login errado') 
        res.redirect(307, '/fail')}else{
        //Conectando ao MongoDB como admin para poder incluir dados
        MongoClient.connect('mongodb://'+ usert +':'+ pwdt +'@ds137687.mlab.com:37687/ibmzambrin', (err, client) => {
            console.log('Conectado ao Banco como ADMIN')
            if (err) {
                res.redirect(307, '/fail');
                return console.log(err)
            }
        db = client.db('ibmzambrin')
        console.log('Redirecionando p/ Home')
        res.redirect(307, '/home');
        })}
})

//redirecionando para a página com os Horários já registrados
app.get('/agenda', (req, res) => {
    db.collection('respostas').find().toArray((err, result) => {
    if (err) return console.log(err)
    console.log('Mostrando agendamentos')
    res.render('agenda.ejs', {respostas: result})
    })
})

//Inserindo dados no BD
app.post('/inserir',(req, res)=>{
    var nomet, emailt, salat, datet, timet
    nomet = req.body.nome
    emailt = req.body.email
    salat = req.body.sala
    datet = req.body.date
    timet = req.body.time
    //Verificando se todos os dados foram preenchidos
    if(!nomet && !emailt && !salat && !datet && !timet){
        //Avisa usuário para preencher corretamente
        console.log('Não foram inseridos todos os dados')
        res.redirect(307, '/preencha')}else{        
    console.log('Entradas do usuário ',req.body)
    db.collection('respostas').save(req.body, (err, result) => {
        if(err) return console.log(err)
        console.log('Dados inseridos e salvos no BD')
        res.redirect(307, '/inserido')
        console.log('redirecionando p/ dados inseridos')
    })
}})
