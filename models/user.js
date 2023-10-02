const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    current_balance: Number,
    gender: String,
    transaction: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Transactions",
        },
    ],
})

module.exports = mongoose.model("User", userSchema,)