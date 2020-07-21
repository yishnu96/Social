const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport({
    service : "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
});


let renderTemplate = (data , relativePath) =>{
      let mailHTML;
      ejs.renderFile(
            path.join(__dirname,'../views/mailer.ejs', relativePath),
            data,
            function(err , template){
                if(err){
                    console.error( 'Error in Rendering ejs');
                    return;
                }
                mailHTML = template
            }
      )

      return mailHTML;
}

module.exports = {
    transporter : transporter,
    renderTemplate : renderTemplate
}