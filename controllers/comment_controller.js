var models = require('../models/models.js');

exports.new = function(req,res) {
	res.render('comments/new.ejs', {quizid: req.params.quizId, errors: []});
};

exports.create = function(req,res) {
	var comment = models.Comment.build(
	{	texto: req.body.comment.texto,
		QuizId: req.params.quizId
		});
		
	comment
	.validate()
	.then(
		function(err){
			if(err){
				res.render('comments/new.ejs', {comment: comment, quizid: req.params.quizId, errors: err.errors});
			} else {
				comment.save().then(function(){
				res.redirect('/quizes/' + req.params.quizId);
				})
			}
		}
	).catch(function(error){next(error)});
};

exports.edit = function(req, res) {
	var quiz = req.quiz;
	res.render('quizes/edit', {quiz: quiz, errors: []});
};

exports.update = function(req, res) {
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	req.quiz.tema = req.body.quiz.tema;
	
	req.quiz
	.validate()
	.then(
		function(err){
			if(err){
				res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
			} else {
				req.quiz
				.save({fields: ["pregunta", "respuesta", "tema"]})
				.then(function(){ res.redirect('/quizes');});
			}
		});
};

exports.destroy = function(req,res) {
	req.quiz.destroy().then(function(){
		res.redirect('/quizes');
	}).catch(function(error){next(error)});
};