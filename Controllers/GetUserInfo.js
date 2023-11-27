const db = require('../connect.js')

exports.get = (req,res) => {
	console.log(req.params['username'])
	db.connection.execute("SELECT * FROM `users` WHERE `username` = '" + req.params['username'] + "'")
		.then(([rows,fields]) => {
			res.send(rows)
			console.log('Success !')
		})
		.catch(e => {
			res.send(e)
		})
}

exports.getContacts = (req,res) => {
	console.log('I am here !')
	db.connection.execute("SELECT * FROM `users` WHERE `contacts` LIKE '%" + req.body.username + "%'")
		.then(([rows,fields]) => {
			console.log(rows)
			res.send(rows)
		})
		.catch(e => {
			res.send(e)
		})

}