var connection = require("./connection.js");

//var myDB = new db();

function ORM() {

	this.selectAll = function(colName, table, cb){

		connection.query("select ?? from ??", [colName, table], function(err, result){

			if (err) {

				return console.log(err);

			}

			//console.log(result);

			cb(err, result);

		})


	}

	this.insertOne = function(name, bool, cb){

		connection.query("insert into burgers (burger_name, devoured) values (?, ?)", [name, bool], function(err, result){

			if (err) {

				return console.log(err);

			}

			cb(err, result);

		})

	}

	this.updateOne = function(id, cb){

		connection.query("update burgers set devoured=true where id=?", [id], function(err, result){

			if(err) {

				return console.log(err);

			}

			cb(err, result);


		})


	}

}

/*
//test case
var myORM = new ORM();

var hamburger = { burger_name: "Chicken Burger", devoured: false}

myORM.selectAll();
//myORM.insertOne([["Chicken Burger", true]]);
//myORM.updateOne(["Chicken Burger", 7]);
*/

module.exports = ORM;
