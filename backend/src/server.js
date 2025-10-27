require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const ViewEngine = require('./config/viewEngine')
const router = require('./routers/web')
const port = process.env.PORT || 80;
const hostname = process.env.HOST_NAME;
const mongodb = process.env.MONGODB_URL;
const mongoose = require('mongoose');
console.log("URI thực sự đang dùngg:", mongodb);

// const Account = require('./models/accounts')
// const axios = require('axios').default; // npm install axios
// const CryptoJS = require('crypto-js'); // npm install crypto-js
// const moment = require('moment'); // npm install moment
var cors = require('cors')
// const { register, login, createRegister, dangnhap, logout } = require('./controllers/accounts/register')

//connect database mongose
async function connect() {
    try {
        await mongoose.connect(mongodb, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
        console.log('connect thành công')
    } catch (error) {
        console.log("Chuỗi MongoDB URI:", mongodb);
        console.log('connect không thành công'+ error
        )
    }
}
connect()

// config template engine
ViewEngine(app)
app.use(cors())

const checkLogin = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
}
const checkAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
        next();
    } else {
        res.send('Bạn không đủ thẩm quyền');
    }
}

app.use('/api', router)


app.listen(port, () => {
    console.log(mongodb)
    console.log(`đang chạy ở cổng http://${hostname}:${port}`)
})
