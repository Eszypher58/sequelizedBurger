var express = require("express");
var db = require("../models/index.js");

var router = express.Router();

//var myBurger = new burger();

router.get("/", function(req, res){

	console.log("hit /");

	//console.log(db);

	db.burgers.findAll({}).then(function(result){

		//console.log(result[0]);

		res.render("index", { data: result });

	})

});

router.post("/", function(req, res){

	console.log("hit / with post");

	console.log(req.body.name);

	db.burgers.create({

		burger_name: req.body.name,

	}).then(function(result){

		res.redirect("/");

	})

});


router.put("/:id", function(req, res){

	console.log("hit / with put");

	console.log(req.params.id);

	db.burgers.update({devoured: true},{ where: {id: req.params.id}}).then(function(result){

		res.redirect("/");

	})

});

module.exports = router;