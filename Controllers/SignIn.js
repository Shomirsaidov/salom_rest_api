const db = require('../connect.js')

exports.make = (req,res) => {
	var Data = [req.body.username, req.body.password, req.body.avatar, req.body.type, req.body.bio,  req.body.contacts]
	var myQuery = "INSERT INTO `users`(`id`,`username`,`password`,`avatar`,`type`,`bio`,`contacts`,`location`) VALUES(NULL, ?,?,?,?,?,?, 'IS NOT DEFINED')"
	db.connection.execute(myQuery, Data)
		.then(([rows,fields]) => {
			res.send(rows)
			console.log(fields)
		})
		.catch(e => {
			res.send(e)
		})
}