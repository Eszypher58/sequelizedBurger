var express = require("express");
var db = require("../models/index.js");

var router = express.Router();

//var myBurger = new burger();

router.get("/", function(req, res){

	console.log("hit /");

	//console.log(db);

	db.burgers.findAll({}).then(function(burgers){

		//console.log(result[0]);

		db.customer.findAll()

		res.render("index", { data: burgers });

	})

});

router.post("/", function(req, res){

	console.log("hit / with post");

	console.log(req.body.name);
	//console.log(req.body.customer_name);

	db.burgers.create({

		burger_name: req.body.name,

	}).then(function(result){

		res.redirect("/");

	})

});


router.put("/:id", function(req, res){

	console.log("hit / with put");

	console.log(req.params.id);
	console.log(req.body.customer_name);

	var burgerID = req.params.id;
	var customerName = req.body.customer_name;
	var burgerName = "";

	db.burgers.findAll({where: {id: req.params.id}}).then(function(result){

		console.log(result[0].dataValues.burger_name);

		var burgerName = result[0].dataValues.burger_name;

		db.burgers.update({devoured: true},{ where: {id: req.params.id}}).then(function(result){
			
			db.customer.create({

				name: customerName,
				eaten_burger: burgerName,

			}).then(function(result){
			
				res.redirect("/");
			
			})
			
		})

	})



});

module.exports = router;