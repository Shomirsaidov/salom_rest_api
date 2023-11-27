const db = require('../connect.js')
const axios = require('axios')



exports.query = (req,res) => {

    var response_sent = false
    let main = []
    var myQuery = "SELECT * FROM `dns` WHERE `category` = 'news' LIMIT 11"
	db.connection.execute(myQuery)
		.then(async ([rows,fields]) => {

            let links = []

            for(x in rows) {
            
                let data = await axios.get(rows[x]['url'])

              
                let start = 0
                while(true) {
                    occ = data.data.indexOf('href="',start+1)
                    if(occ == -1) {
                        break
                    } else {
                        let curr = data.data.slice(occ)
                        end = curr.indexOf('"',7)
                        link = curr.slice(6, end) 


                        if(link.startsWith('/')) {
                            link = rows[x]['url'] + link
                        }
                        links.push(link)
                        start = occ
                    }                
                }
                // end of looking for nested links 
        

                links.forEach(async (url) => {
                    console.log(url)
                    let data = await axios.get(url)
                        .then((resp) => {
                            if(resp.data.includes(req['params']['query'])) {
                                console.log(url + '   Deteeeeeeeeeeected !')
                                main.push(url)
                                if(main.length > 0) {
                                    send(url)
                                }
                                // send(url)
                            }
                        })
                        .catch(e => {
                            if(e.response !== undefined) {
                                console.log(e.response.status)
                            }


                        }) 
                })    



            }
            
            // console.log(links, links.length)

            // res.send(main)
           

        })
		.catch(e => {
			res.send(e.message)
		})


        function send(data) {
            if(main.length > 5) {
                res.send([main])
            } 
            // if(response_sent == false) {    
            //     res.send([main])
            // }
            response_sent = true
        }






}