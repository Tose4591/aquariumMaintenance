if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const ejs = require('ejs');
const nodemailer = require('nodemailer');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(express.static(__dirname + '/public'));
app.use(express.json())

app.get('/', (req, res) => {
    res.render('home', { page: '/' });
});

app.get('/gallery', (req, res) => {
    res.render('gallery', { page: 'gallery' });
});

app.get('/technical', (req, res) => {
    res.render('technical', { page: 'technical' });
})

app.get('/contact', (req, res) => {
    res.render('contact', { page: 'contact' });
});

app.post('/contact', async (req, res) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.AUTH_USER,
            pass: process.env.AUTH_KEY
        }
    })


    const formSubmissionData = req.body;

    const mailData = await ejs.renderFile(__dirname + "/views/emailTemplate.ejs", { data: formSubmissionData });

    const mailOptions = {
        from: process.env.AUTH_USER,
        replyTo: req.body.email,
        to: process.env.AUTH_USER,
        subject: `Contact Form - ${req.body.name} - ${req.body.location}`,
        text: `${req.body.phone} - ${req.body.message}`,
        html: mailData
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
            res.send("error");
        }
        else {
            console.log("email sent");
            res.send("success");
        }
    })
})


app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`)
})
