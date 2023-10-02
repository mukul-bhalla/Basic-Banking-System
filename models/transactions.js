const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    payer: String,
    receiver: String,
    amount: Number,
    date: String,
})


module.exports = mongoose.model("Transactions", transactionSchema);