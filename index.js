if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const path = require('path')

const User = require('./models/user')
const Transactions = require('./models/transactions')
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const dbUrl = process.env.DB_URL
mongoose.connect(dbUrl)
    .then(() => {
        console.log("MongoDB Connected!");
    })
    .catch((error) => {
        console.error("MongoDB Connection Error:", error);
    });
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }));


app.get('/', async (req, res) => {
    const allUser = await User.find({});
    res.render("home", { allUser });
})

app.get('/user/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.render("user", { user })
})

app.get('/success', (req,res)=>{
    res.render("success");  
})

app.post('/transaction/user/:id',async (req,res)=>{
    // console.log(req.body)
    const {id}= req.params;
    const {receiver} = req.body;
    const amount = parseInt(req.body.amount)
    const send = await User.findById(id);
    const receive = await User.findOne({name:receiver});
    if(send.current_balance<amount){
        res.redirect("/error")
    }
    const sendBalance = send.current_balance;
    const receiveBalance = receive.current_balance;
    const receiverId = receive._id; 
    // console.log(send)
    // console.log(receive)
    // console.log(amount)
    // console.log(sendBalance)
    // console.log(receiveBalance)

    // console.log(receiverId);
    await User.findByIdAndUpdate(id,{current_balance:sendBalance-amount});
    await User.findByIdAndUpdate(receiverId,{current_balance:receiveBalance+amount});
    
    res.redirect("/success");
})

app.get('/transaction/user/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    const allUser = await User.find({});
    res.render("transaction", { user, allUser });

})

app.listen(3000, () => {
    console.log("Listening at port 3000")
})
