// Set timezone: Asia
process.env.TZ = 'Asia/Ho_Chi_Minh'

// Config app server
let express = require('express'),
    config = require('./config/apiConfig').CONFIG_API,
    app = express(),
    port = process.env.PORT || config.__port_server,
    mongoose = require('mongoose'),
    path = require('path'),
    html = require('express-handlebars'),
    bodyParser = require('body-parser')

// Config mongoose
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/' + config.__database_name, {
    useMongoClient: true,
})

// Config template views
app.engine('html', html({
    extname: 'html',
    defaultLayout: 'main-layout',
    layoutsDir: __dirname + '/views/'
}))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')

// Config body parser json
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

// Config Public folder
app.use(express.static(path.join(__dirname, 'public')))

// Model config
let appModel = require('./models/appModel'), // App model
    userModel = require('./models/userModel'), // User model
    aboutModel = require('./models/aboutModel'), // About model
    categoryModel = require('./models/categoryModel'), // Category model
    contactModel = require('./models/contactModel'), // Contact model
    feedbackModel = require('./models/feedbackModel'), // Feedback model
    newModel = require('./models/newModel'), // New model
    newtagModel = require('./models/newtagModel'), // New tag model
    productModel = require('./models/productModel'), // Product model
    slideModel = require('./models/slideModel'), // Slide model
    tagModel = require('./models/tagModel'), // Tag model
    historyModel = require('./models/historyModel')

// Route config
let appRoute = require('./routes/appRoute')(app),
    userRoute = require('./routes/userRoute')(app),
    adminRoute = require('./routes/adminRoute')(app),
    slideRoute = require('./routes/slideRoute')(app),
    categoryRoute = require('./routes/categoryRoute')(app),
    productRoute = require('./routes/productRoute')(app),
    historyRoute = require('./routes/historyRoute')(app)

// App listen lnfo
app.listen(port)
console.log('App has been connected from port: ' + port)