const db = require('../connect.js')


exports.make = (req,res) => {
	console.log('desire to applicate')

	// var Data = [req.body.department, req.body.referrer, req.body.type, req.body.time]
	var Data = [req.params.department, req.params.referrer, req.params.type, req.params.time]

	
	console.log(req.params)

	var myQuery = 'INSERT INTO `applications`(`department`,`referrer`,`type`,`time`,`status`,`id`) VALUES(?,?,?,?,"In database", NULL)'

	db.connection.execute(myQuery, Data)
		.then(([rows,fields]) => {
			res.send(rows)
			console.log('Applicated')
		})
		.catch(e => {
			res.send(e)
		})

}