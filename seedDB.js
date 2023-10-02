if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const mongoose = require('mongoose');
const dbUrl = process.env.DB_URL
const User = require('./models/user')

mongoose.connect(dbUrl)
    .then(() => {
        console.log("MongoDB Connected!");
    })
    .catch((error) => {
        console.error("MongoDB Connection Error:", error);
    });

const randomBalance = () => {
    return Math.floor(Math.random() * 10000) + 5000
}
const names = ["Tallie", "Drey", "Kailani", "Dewey", "Rochella", "Danyon", "Trixibelle", "Jetaime", " Keyla", "Walt"]
const email = ["tallie@email.com", "drey@gmail.com", "kailani@hotmail.com", "dewey@cmail.com", "rochella@rediffmail.com", "danyon@email.com", "trixibelle@hotmail.com", "jetaime@email.com", " keyla@gmail.com", "walt@dmail.com"]

const seedDB = async () => {
    for (let i = 0; i < 10; i++) {
        const newuser = new User({
            name: names[i],
            email: email[i],
            current_balance: randomBalance(),
            gender: (i % 2 === 0) ? 'Female' : 'Male'

        })
        await newuser.save()
    }

}

seedDB()
