const db = require('../connect.js')
const crypto    = require('../../websocket/crypto.js')


exports.load = (req,res) => {
	console.log('Requested messajes!')
	var Data = [req.body.sender, req.body.receiver, req.body.receiver, req.body.sender]
	console.log(Data)
	var myQuery = "SELECT * FROM `messages` WHERE `sender` = ? AND `receiver` = ? OR `sender` = ? AND `receiver` = ?"
	db.connection.execute(myQuery, Data)
		.then(([rows,fields]) => {
			console.log('Derived from the table !')
			rows.forEach(function(part, index, theArray) {
				if(theArray[index]['text'].length > 0) {
					theArray[index]['text'] = crypto.decrypt(theArray[index]['text']);
				}
				// console.log(theArray[index]['text'])
			});

			res.send(rows)
			console.log(rows)
		})
		.catch(e => {
			res.send(e)
		})
}

exports.loadForum = (req,res) => {
	console.log('Requested messajes from forum!')
	var myQuery = "SELECT * FROM `messages` WHERE `receiver` = 'forum'"
	db.connection.execute(myQuery)
		.then(([rows,fields]) => {

			console.log('Derived from the table !')
			rows.forEach(function(part, index, theArray) {
				if(theArray[index]['text'].length > 0) {
					theArray[index]['text'] = crypto.decrypt(theArray[index]['text']);
				}
				// console.log(theArray[index]['text'])
			});

			res.send(rows)

			console.log(rows)
		})
		.catch(e => {
			res.send(e)
		})
}


exports.loadPhoto = (req,res) => {
	console.log('Requested loading a photo!')
	console.log(req.body)
	var Data = [req.body.text,req.body.sender,req.body.receiver,req.body.time, req.file.filename]
	var myQuery = "INSERT INTO `messages`(`id`,`text`,`sender`,`receiver`,`time`,`image`) VALUES(NULL,?,?,?,?,?)"
	db.connection.execute(myQuery, Data)
		.then(([rows,fields]) => {
			res.send(rows)
			console.log('Succefully added a photo !')
		})
		.catch(e => {
			res.send(e)
		})
}

exports.getFile = (req,res) => {
	// res.sendfile(`../files/${req.params['filename']}`)
	res.sendFile(`../files/1684045718813elibs.docx`)
}






