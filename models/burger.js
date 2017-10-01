var orm = require("../config/orm.js");

var burgerORM = new orm();
//var hamburger = { burger_name: "Chicken Burger", devoured: false}

//myORM.selectAll();
//myORM.insertOne([["Chicken Burger", true]]);
//myORM.updateOne([false, "Chicken Burger"]);

function Burger() {

	this.refresh = function(cb) {

		burgerORM.selectAll("*", "burgers", function(err, result){

			cb(err, result);

		});

	}

	this.add = function(name, bool, cb) {

		burgerORM.insertOne(name, bool, function(err, result){

			cb(err, result);

		});

	}

	this.devoured = function(id, cb) {

		burgerORM.updateOne(id, function(err, result){

			cb(err, result);

		});

	}

}

//test case
var myBurger = new Burger();

//myBurger.refresh(function(){});

//myBurger.add("Char Burger", true, function(){});


module.exports = Burger;