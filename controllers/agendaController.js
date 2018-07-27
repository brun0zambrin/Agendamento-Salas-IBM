const Agendamodel = require('../models/agenda');
const express = require('express');

//Página de Login
exports.index1 = function(req, res){
    res.render(__dirname+'/../views/login.html');
}

//reserva um horario
exports.create = function(req, res){
    let agenda = new Agendamodel(
        {
            nome: req.body.nome,
            email: req.body.email,
            hora: req.body.hora,
            sala: req.body.sala,
            dia: req.body.dia
        }
    );
    console.log('Objeto de reserva criado');

    agenda.save(function(err){
        if(err){
            return next(err);
        }
        res.render(__dirname+'/../views/inserido.html');
    })
};

//Le todos os horarios marcados
exports.ler = function(req,res){
    Agendamodel.find(function(err, agenda){
        if(err) return next(err);
        res.send(agenda);
        console.log('Mostrando todas as reservas')
    })
};

//Atualiza um horário - not working
exports.update = function(req, res){
    Agendamodel.findByIdAndUpdate(req.body.id, {$set: req.body},
        function(err,agenda){
            if(err) return next(err);
            res.render(__dirname+'/../views/inserido.html');
        });
};

//Deleta um horário
exports.delete = function(req, res){
    Agendamodel.findByIdAndRemove(req.body.id, function(err){
        if(err) return next(err);
        res.render(__dirname+'/../views/deletado.html');
        console.log('Reserva deletada');
    });
};

//Login
exports.login = function(req, res){
    user=req.body.user;
    pwd=req.body.pwd;
    if(user!='admin' && pwd!='admin123'){
        res.render(__dirname+'/../views/error.html');
        console.log('Erro na autenticação, login ou senha inválidos')
    }else{
        res.render(__dirname+'/../views/home.html')
        console.log('Login feito com sucesso')
    }
}

//Logout
exports.logout = function(req,res){
    res.render(__dirname+'/../views/login.html')
}

//Voltar
exports.voltar = function(req, res){
    res.render(__dirname+'/../views/home.html');
    console.log('Voltando para a home')
}

//Atualizar2
exports.atualizar = function(req, res){
    res.render(__dirname+'/../views/atualizar.html');
    console.log('Indo para página de UPDATE')
}