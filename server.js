// bismillah

const express 	= require('express')
const cors 		= require('cors')
const multer 	= require('multer')
const md5       = require('blueimp-md5')

const { storageConfig } = require('./multerConfig')

const getApplications = require('./Controllers/GetApplications.js')
const makeApplication = require('./Controllers/MakeApplication.js')

const getSchedule 	= require('./Controllers/GetSchedule.js')
const book 			= require('./Controllers/Book.js')
const secretary_config   		= require('./Controllers/Secretary.js')

const signIn 		= require('./Controllers/SignIn.js') 
const getUserInfo 	= require('./Controllers/GetUserInfo.js')

const investments   = require('./Controllers/Investments.js')
const market   		= require('./Controllers/Market.js')

const chats   		= require('./Controllers/Chats.js')
const biju   		= require('./Controllers/Biju.js')




const app = express()
const upload = multer({storage: storageConfig}) 

app.use(cors({origin: ['https://localhost:8080','http://localhost:8080']}))
app.use(express.json())


const applicationsRouter = express.Router()
applicationsRouter.get('/makeApplication/:department/:referrer/:type/:time', makeApplication.make)
applicationsRouter.get('/getApplications/:referrer', getApplications.get)
applicationsRouter.get('/getApplications', getApplications.getAll)

// applicationsRouter.post('/getDepartments', getApplications.getDepartments)


const bookingRouter = express.Router()
bookingRouter.post('/book', book.book)
bookingRouter.get('/getSchedule/:time_owner', getSchedule.get)

const authRouter = express.Router()
authRouter.post('/signIn', signIn.make)
authRouter.get('/getUserInfo/:username', getUserInfo.get)
authRouter.post('/getContacts', getUserInfo.getContacts)

const investRouter = express.Router()
investRouter.post('/publicateProject', investments.publicateProject)
investRouter.get('/getProjects', investments.getProjects)
investRouter.get('/getProject/:title', investments.getProject)

const marketRouter = express.Router()
marketRouter.post('/createGood', market.createGood)
marketRouter.get('/getGood/:id', market.getGood)

const secretaryRouter = express.Router()
secretaryRouter.post('/createCommand', secretary_config.createCommand)
secretaryRouter.get('/getCommands/:username', secretary_config.getCommands)

const chatsRouter = express.Router()
chatsRouter.post('/getChat', chats.load)
chatsRouter.post('/loadPhoto', upload.single('photo'),chats.loadPhoto)
chatsRouter.post('/loadForum', chats.loadForum)
chatsRouter.post('/getFile/:fil', chats.getFile)



app.use('/state', applicationsRouter)
app.use('/booking', bookingRouter)
app.use('/auth', authRouter)
app.use('/invest', investRouter)
app.use('/market', marketRouter)
app.use('/secretary', secretaryRouter)
app.use('/chats', chatsRouter)
app.get('/getFile/:filename', (req,res) => {res.sendFile(__dirname + '/files/' + req.params['filename'])})
app.get('/biju/:query', biju.query)


//bismillah 
const ffmpeg = require('fluent-ffmpeg')
const command = ffmpeg()


command
    .input('./audio/салом.wav')
    .input('./audio/greeting.wav')
    .mergeToFile('./files/starter.wav', './files/')




app.listen(7777, () => console.log('Server has succesfully started on localhost:7777! Wish you a pleasant coding without any bugs :)'))
// app.listen(777, () => console.log(md5('140f923bf2d7de8f82f7d349678567f1',null,true)))








