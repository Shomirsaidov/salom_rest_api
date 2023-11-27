const db = require('../connect.js')

exports.book = (req,res) => {
	var Data = [req.body.time_owner, req.body.booker, req.body.time,
	req.body.purpose, req.body.accepted]
	var myQuery = 'INSERT INTO `booking`(`id`,`time_owner`,`booker`,`time`,`purpose`,`accepted`) VALUES(NULL, ?,?,?,?,?)'

	db.connection.execute(myQuery, Data)
		.then(([rows,fields]) => {
			res.send(rows)
			console.log('Accepted')
		})
		.catch(e => {
			res.send(e)
		})

}