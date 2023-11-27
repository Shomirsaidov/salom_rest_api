const sql = require('mysql2')

const connection = sql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	database: 'salom_db',
	password: ''
}).promise()

connection.connect((e) => {
	if(e) console.warn(e)
	else console.log('Connected to the database !')
})


exports.connection = connection