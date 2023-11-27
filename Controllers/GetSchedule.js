const db = require('../connect.js')

exports.get = (req,res) => {
	var Data = [req.params['time_owner']]
	var myQuery = 'SELECT * FROM `booking` WHERE `time_owner` = ?'
	db.connection.execute(myQuery, Data)
		.then(([rows,fields]) => {
			res.send(rows)
			console.log(fields)
		})
		.catch(e => {
			res.send(e)
		})
}
