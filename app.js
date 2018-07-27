const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const agenda = require('./routes/routes');
const app = express();

//Render para os HTML´s
app.engine('html', require('ejs').renderFile);

//Arquivos estáticos
app.use(express.static(__dirname + '/public'));

//Porta para funcionamento no IBM Cloud e Localhost
var port = (process.env.VCAP_APP_PORT || 3000);
var host = (process.env.VCAP_APP_HOST || '0.0.0.0');

//URI P/ conexão com o MONGODB
let db_url_adm = 'mongodb://admin:admin123@ds137687.mlab.com:37687/ibmzambrin';

//Conectando com o MONGODB
const mongodb = process.env.MONGODB_URI || db_url_adm;
mongoose.connect(mongodb);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console,'Erro de conexão com o MongoDB'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', agenda)

//Abrindo servidor
app.listen(port,host, () => {
    console.log('Servidor aberto em:  '+ host +'  '+port);
});