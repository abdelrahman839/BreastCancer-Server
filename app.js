require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT ||8080;
const Connection = require('./src/config/db')
const userRoutes = require('./src/routes/user')
const hospitalRoutes = require('./src/routes/hospital');
const WelcomeRoute = require('./src/routes/index');
const {startJob} = require('./src/jobs/sendMailSetup');
Connection()

app.use(express.json());
app.use(WelcomeRoute)
app.use(userRoutes);
app.use(hospitalRoutes)
startJob();


app.listen(port, () => {
    console.log('listening on port ' + port)
});
