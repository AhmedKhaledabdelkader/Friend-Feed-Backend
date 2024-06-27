

const nodemailer = require("nodemailer");



module.exports.sendEmail=async(options)=>{



    const transporter = nodemailer.createTransport({
     

        service:'gmail',
        auth: {
          user: "friendfeedforposts@gmail.com",
          pass: process.env.EMAIL_PASS,
        },
      });



      transporter.sendMail({
        from: '"FriendFeed 👻" <friendfeedforposts@gmail.com>', // sender address
        to: `${options.email}`, // list of receivers
        subject: "Verify your email ✔", // Subject line
        
        
       
        html: `


        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verification</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              font-family: Arial, sans-serif;
              background-image: url('https://static1.pocketlintimages.com/wordpress/wp-content/uploads/wm/2024/04/facebook-tips-and-tricks-3033.jpg'); /* Replace 'https://example.com/background-image.jpg' with the URL of your background image */
              background-size: cover;
              background-position: center;
              color: #333;
            }
      
            .container {
              width: 80%;
              max-width: 600px;
              margin: 50px auto;
              padding: 20px;
              background-color: rgba(255, 255, 255, 0.8);
              border-radius: 10px;
              box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
            }
      
            h1 {
              margin-top: 0;
              font-size: 32px;
              color: #333;
            }
      
            p {
              font-size: 18px;
              line-height: 1.5;
              margin-bottom: 20px;
            }
      
            .verification-code {
              font-size: 24px;
              font-weight: bold;
              color: red;
            }
      
            .btn-verify {
              display: inline-block;
              padding: 10px 20px;
              background-color: #4CAF50;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>FriendFeed</h1>
            <p>Thank you for signing up. Please verify your email address by using the verification code below:</p>
            <p class="verification-code">${options.secret}</p>
            <p>If you didn't sign up for FriendFeed, you can safely ignore this email.</p>
          </div>
        </body>
        </html>
      ` // html body
      },(err,info)=>{

if(err){

console.log(err);

}

else{

    console.log(info);
}



      });}