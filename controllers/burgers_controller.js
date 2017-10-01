var express = require("express");
var burger = require("../models/burger.js");

var router = express.Router();

var myBurger = new burger();

router.get("/", function(req, res){

	console.log("hit /");

	myBurger.refresh(function(err, result){

		var burgerObj = {data:result};

		console.log(burgerObj);

		res.render("index", burgerObj);

	})

});

router.post("/", function(req, res){

	console.log("hit / with post");

	console.log(req.body.name);

	myBurger.add(req.body.name, false, function(err, result){

		res.redirect("/")

	})

});

router.put("/:id", function(req, res){

	console.log("hit / with put");

	console.log(req.params.id);

	myBurger.devoured(req.params.id, function(err, result){

		res.redirect("/")

	})

});

module.exports = router;