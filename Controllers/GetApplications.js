const db = require('../connect.js')

exports.get = (req,res) => {
	var Data    = [req.params['referrer']]
	var myQuery = 'SELECT * FROM `applications` WHERE `referrer` = ?'

	db.connection.execute(myQuery, Data)
		.then(([rows,fields]) => {
			res.send(rows)
			console.log('Requested Applications List')
		})
		.catch(e => {
			res.send(e)
		})
}


exports.getAll = (req,res) => {
	var myQuery = 'SELECT * FROM `applications` ORDER BY `id` DESC LIMIT 10'

	db.connection.execute(myQuery)
		.then(([rows,fields]) => {
			res.send(rows)
			console.log('Requested Applications List')
		})
		.catch(e => {
			res.send(e)
		})
}


// exports.getDepartments = (req,res) => {
// 	var Data    = [req.params['referrer']]
// 	var myQuery = 'SELECT * FROM `applications` WHERE `referrer` = ?'

// 	db.connection.execute(myQuery, Data)
// 		.then(([rows,fields]) => {
// 			res.send(rows)
// 			console.log('Requested Applications List')
// 		})
// 		.catch(e => {
// 			res.send(e)
// 		})
// }

