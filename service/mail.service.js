const nodemailer = require('nodemailer');

class MailService {
  constructor () {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.mail.ru',
      port: '465',
      secure: true,
      auth: {
        user: '914033@mail.ru',
        pass: 'yiR4DdWhapNYMF57c22q'
      }
    });
  }

  async sendMail (name, number, comment) {
    await this.transporter.sendMail({
      from: '914033@mail.ru',
      to: 'asya2761313@bk.ru',
      subject: 'Заявка',
      html: `
      <div>
        <h1>${name} оставил заявку</h1>
        <p><strong>Номер</strong>: <a href='tel:${number}'>${number}</a></p>
        <p><strong>Комментарий</strong>:</p>
        <p>${comment}</p>
      </div>`
    });
  }
}

module.exports = new MailService();
