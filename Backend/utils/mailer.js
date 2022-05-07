const nodemailer = require('nodemailer');
const fs = require('fs');

var senderEmail = "slluxurycarrental@gmail.com";
var senderPsw = "rental1234";

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: senderEmail,
        pass: senderPsw
    }
});


var sendEmailWithAttachment = function (email, subject, html, filename, filePath) {

    var mailOptions = {
        from: senderEmail,
        to: email,
        subject: subject,
        html: html,
        attachments: [{
            filename: filename,
            path: filePath
        }]
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error.message);
        } else {
            console.log('Email sent');
            fs.unlinkSync(filePath);
        }
    });

}

module.exports = {
    sendEmailWithAttachment
}