const express = require('express');
const router = express.Router();
const controller = require('../controllers/agendaController');

//Método atualizar não está funcionando

//Agendar um horário
router.post('/create', controller.create);

//Ler os horários
router.get('/ler',controller.ler);

//Indo para página de att
router.get('/atualizar',controller.atualizar)

//Atualiza um horário
router.get('/update',controller.update);

//Deletar um horário
router.post('/delete',controller.delete);

//Carrega Login
router.get('/',controller.index1);

//Faz Login
router.post('/login',controller.login);

//Voltar
router.get('/voltar',controller.voltar);

//Atualiza2
router.get('/atualizar',controller.atualizar)

//Logout
router.get('/logout',controller.logout);

module.exports = router;