// server.js
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.json());

const email = '1596214166@qq.com'
const smtpConfig = {
    host: 'smtp.qq.com',
    port: 465, // QQ邮箱的SMTP端口 (SSL)
    secure: true, // 使用SSL
    auth: {
        user: email,
        pass: 'zlqvpgeteuciihhi'
    }
}
const transporter = nodemailer.createTransport(smtpConfig);

// POST 接口：/send-email  => 接口传递字段信息：subject 主题、text 文本、html 邮件内容（html优先级高于text，未设置html则默认邮件内容为text）
app.post('/send-email', (req, res) => {
    const {subject, text, html} = req.body;
    // 发送邮件：from发件方、to收件方、subject主题、text 消息纯文本、html
    // 当前邮件收发方一致（自己给自己发邮件）
    const mailOptions = {
        from: email,
        to: email,
        subject: subject,
        text: text,
        html: html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('邮件发送失败');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('邮件已发送');
        }
    });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
