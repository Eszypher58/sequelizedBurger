var express = require("express");
var db = require("../models/index.js");

var router = express.Router();

var devErrMsg = "";
var subErrMsg = "";
//var myBurger = new burger();

router.get("/", function(req, res){

	//console.log("hit /");

	//console.log(db);

		//console.log("here");
	//db.burgers.hasOne(db.customer, {foreignKey:"eaten", targetKey: "name"});
	db.burgers.belongsTo(db.customer, {foreignKey:"burger_name", targetKey:"eaten_burger"});


	//console.log(db.burgers);

	db.burgers.findAll({

		include:[{

			model:db.customer,

		}]

	}).then(function(burgers){

		//console.log(burgers);
		burgers.devourErrorMsg = devErrMsg;
		burgers.submitErrorMsg = subErrMsg;
		console.log(burgers.devourErrorMsg);
		res.render("index", { data: burgers});

	})

	

});

router.post("/", function(req, res){

	console.log("hit / with post, clicked devour");

	//console.log(req.body.name);
	//console.log(req.body.customer_name);

	db.burgers.create({

		burger_name: req.body.name,

	}).then(function(result){

		devErrMsg = "";
		subErrMsg = "";
		res.redirect("/");
		

	}).catch(function(err){

		//console.log(err);
		subErrMsg = "Burger name annot be empty!";
		res.redirect("/");
		

	})

});


router.put("/:id", function(req, res){

	console.log("hit / with put");

	//console.log(req.params.id);
	//console.log(req.body.customer_name);

	var burgerID = req.params.id;
	var customerName = req.body.customer_name;
	var burgerName = "";

	
	db.burgers.findAll({where: {id: req.params.id}}).then(function(result){

		//console.log(result[0].dataValues.burger_name);

		var burgerName = result[0].dataValues.burger_name;

		db.customer.create({

			name: customerName,
			eaten_burger: burgerName,

		}).then(function(result){

			db.burgers.update({devoured:true},{where:{id:burgerID}}).then(function(result){

				devErrMsg = "";
				subErrMsg = "";
				res.redirect("/");


			})


		}).catch(function(err){
			
					//console.log(err);
					devErrMsg = "Customer name cannot be empty!";
					res.redirect("/");
					return;
			
				})

		/*
		db.burgers.update({devoured: true},{ where: {id: req.params.id}}).then(function(result){
			
			db.customer.create({

				name: customerName,
				eaten_burger: burgerName,

			}).then(function(result){
			
				res.redirect("/");
			
			}).catch(function(err){
				
						console.log(err);
				
						res.redirect("/");
						return;
				
					})
			
		}).catch(function(err){
			
					console.log(err);
			
					res.redirect("/");
					return;
			
				})
*/
	})



});

module.exports = router;