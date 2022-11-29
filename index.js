const express = require('express')
const path = require('path')
const app = express()
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const cors = require('cors')

const errorHandler = require('./middleware/error')

const DBConnection = require('./config/db')

if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: './config/.env' })

DBConnection()

//Include Routes
const authRoutes = require('./routes/auth')
const bookingsRoutes = require('./routes/bookings')
const hotelsRoutes = require('./routes/hotels')
const reviewsRoutes = require('./routes/reviews')
const roomsRoutes = require('./routes/rooms')
const roomTypesRoutes = require('./routes/roomTypes')
const usersRoutes = require('./routes/users')

//Config app and routes
app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.use(cookieParser());

if(process.env.NODE_ENVIRONMENT === 'DEVELOPMENT') {
    app.use(morgan('dev'))
}

if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../client/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client/build/index.html'))
    })
}

app.use(cors({
    origin: true,
    credentials: true,
}))



const versionOne = (routeName) => `api/v1/${routeName}`

//routes
app.use(versionOne('auth'), authRoutes)
app.use(versionOne('booking'), bookingsRoutes)
app.use(versionOne('hotel'), hotelsRoutes)
app.use(versionOne('review'), reviewsRoutes)
app.use(versionOne('room'), roomsRoutes)
app.use(versionOne('roomType'), roomTypesRoutes)
app.use(versionOne('user'), usersRoutes)

app.use(errorHandler)

const PORT = process.env.PORT || 4000

const server = app.listen(PORT, () => {
    console.log(`We are live on ${process.env.NODE_ENVIRONMENT} mode on port ${PORT} `)
})

//Handle unhandled promise rejections 
process.on('UnhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red)
    //Close server and exit process
    server.close(() => process.exit(1))
})