const { sendMail } = require('../config/mailer');
const User = require('../model/User');
const cron = require('cron').CronJob;



const sendMailSetup = async () => {
    let users = await User.find();
    users.forEach(element => {

        element.medicationList.forEach(ele => {
            let str = ele.medicationTime[0];
            let newStr = '';
            let container = [];
            let check = 0;
            ele.medicationTime = [];
            for (let i = 0; i < str.length; i++) {
                if (str[i] == ',') {
                    container.push(newStr)
                    newStr = '';
                    check++;
                    continue;
                }
                newStr += str[i];
                if (i == (str.length - 1)) {
                    container.push(newStr)
                }
            }
            container.forEach(time => {
                let hour = time.substring(0, 2)
                let minute = time.substring(3)
                const job = new cron(`00 ${minute} ${hour} * * *`, async function () {
                    sendMail(element.name, element.email, ele.name)
                });
                job.start();

            })

        })
    })



}

const startJob = () => {
    const job = new cron(`*/1 * * * *`, async function () {
        sendMailSetup()
    });
    job.start();
}



module.exports = { startJob, sendMailSetup, };
