const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const AuthRoute = require('./routes/Auth.route.js')
const GetAPIs = require('./routes/Get.route.js')
const Services = require('./routes/Services.route.js')
const SetAPIs = require('./routes/Set.route.js')
const UpdateAPIs = require('./routes/Update.route.js')
const DeleteAPIs = require('./routes/Delete.route.js')

const app = express()
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,PUT,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors(corsOptions));

const port = 5501

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(port, () => console.log(`Example app listening on port ${port}!`))
        console.log('Connected to database!')
    })
    .catch(() => {
        console.log('Connection failed!')
    })

app.use('/api/auth', AuthRoute)
app.use('/api/get', GetAPIs);
app.use('/api/services', Services)
app.use('/api/set', SetAPIs)
app.use('/api/update', UpdateAPIs)
app.use('/api/delete', DeleteAPIs)

app.get('/', (req, res) => res.send('Hello World!'))