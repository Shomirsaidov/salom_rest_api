const db = require('../connect.js')

exports.createCommand = (req,res) => {
	console.log('Request got !')
	var Data = [req.body.command, req.body.answer, req.body.username]
	console.log(Data)
	var myQuery = "INSERT INTO `secretary_config`(`id`,`command`,`answer`,`username`) VALUES(NULL, ?,?,?)"
	db.connection.execute(myQuery, Data)
		.then(([rows,fields]) => {
			res.send(rows)
			console.log('Success !')
		})
		.catch(e => {
			res.send(e)
		})
}

exports.getCommands = (req,res) => {
	var Data = [req.params['username']]
	var myQuery = 'SELECT * FROM `secretary_config` WHERE `username` = ?'
	db.connection.execute(myQuery, Data)
		.then(([rows,fields]) => {
			res.send(rows)
			console.log('Success !')
		})
		.catch(e => {
			res.send(e)
		})
}