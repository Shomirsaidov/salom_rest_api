const db = require('../connect.js')

exports.getProjects = (req,res) => {
	var myQuery = 'SELECT * FROM `projects` LIMIT 20'
	db.connection.execute(myQuery)
		.then(([rows,fields]) => {
			res.send(rows)
			console.log(fields)
		})
		.catch(e => {
			res.send(e)
		})
}

exports.publicateProject = (req,res) => {
	console.log('Requesteds !')
	var Data = [req.body.title, req.body.creator, req.body.images, req.body.description, req.body.investors, req.body.capital]
	console.log(Data)
	var myQuery = "INSERT INTO `projects` (`id`, `title`, `creator`, `images`, `description`, `investors`, `capital`) VALUES (NULL, ?, ?, ?, ?, ?, ?);"
	db.connection.execute(myQuery, Data)
		.then(([rows,fields]) => {
			res.send(rows)
			console.log('Succeess !')
		})
		.catch(e => {
			res.send(e)
		})
}


exports.getProject = (req,res) => {
	var Data = [req.params['title']]
	var myQuery = "SELECT * FROM `projects` WHERE `title` = ?"
	db.connection.execute(myQuery, Data)
		.then(([rows,fields]) => {
			res.send(rows)
			console.log(fields)
		})
		.catch(e => {
			res.send(e)
		})
}




