const db = require('../connect.js')


exports.createGood = (req,res) => {
	var Data = [req.body.subject, req.body.price, req.body.store, req.body.images, req.body.description]
	var myQuery = "INSERT INTO `goods`(`id`,`subject`,`price`,`store`,`images`,`description`) VALUES(NULL, ?,?,?,?,?)"

	db.connection.execute(myQuery, Data)
		.then(([rows,fields]) => {
			res.send(rows)
			console.log('Success !')
		})
		.catch(e => {
			res.send(e)
		})

}

exports.getGood = (req,res) => {
	var Data = [req.params['id']]
	var myQuery = "SELECT * FROM `goods` WHERE `id` = ?" 
	db.connection.execute(myQuery, Data)
		.then(([rows,fields]) => {
			res.send(rows)
		})
		.catch(e => {
			res.send(e)
		})
}