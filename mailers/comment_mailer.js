const nodeMailer = require('../config/nodemailer');
const env = require('../config/environment')
exports.newComment =(comment) => {
    console.log('comment Mailer');
    let htmlString = nodeMailer.renderTemplate({comment:comment},'/comments/new_comments.ejs')
     
    nodeMailer.transporter.sendMail({
        from: env.nodemailer_email, // sender address
        to: comment.user.email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: htmlString // html body
    },(err, info) => {
        if(err){
            console.log('Error in sending mail');
            return;
        }
        console.log('Mail send', info);
        return;
    });
}


