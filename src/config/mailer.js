const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: `${process.env.USER}`,
        pass: `${process.env.PASSWORD}`,
    },
    tls: {
        rejectUnauthorized: false,
    }
});


const sendMail = (user, email, medicationName) => {
    const mailOptions = {
        from: "Take your Medicine",
        to: email,
        subject: 'Take your Medicine',
        html: `
        <html>
            <head>
            <title>Breast Cancer</title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Mukta:wght@200&family=Roboto&display=swap');
            body{
                font-family: 'Mukta', sans-serif;
                font-family: 'Roboto', sans-serif;
            }
                </style>

            </head>
            <body>
                <div style="text-align:center; background-color:#ec74aa; padding:50px;" > <h1 style="color:#FFF;">Dear, ${user}</h1>
            <h3 style="color:#FFF;">Its time to take your ${medicationName} pills </h3>  
            </div>
            </body>
            </html>
        
        `,
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
        } else {
            console.log('mail sent successfully');
        }
    })
};

module.exports = { sendMail, }