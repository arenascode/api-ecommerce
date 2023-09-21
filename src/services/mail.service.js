import nodemailer from "nodemailer";
import { nodeMailerPass, nodeMailerUSer } from "../config/auth.config.js";
import { logger } from "../utils/logger.js";
import { envConfig } from "../config/env.config.js";
import { CLIENT_URL } from "../config/env.config.js";

class MailService {
  async sendmailToConfirmPurchase(purchasedProducts, ticket, purchaserMail) {
    const transport = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      auth: {
        user: nodeMailerUSer,
        pass: nodeMailerPass,
      },
    });

    const productsTemplate = purchasedProducts
      .map((p) => {
        return `
          <tr>
          <td>${p.title}</td>
          <td>$${p.price}</td>
          <td>${p.quantity}</td>
          <td>$${p.price * p.quantity}</td>
          </tr>`;
      })
      .join("");

    const templatePurchaseHTML = `
    <h1>Thank You for Your Purchase!</h1>
  
  <table>
    <thead>
      <tr>
        <th>Product</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
          ${productsTemplate}
    </tbody>
  </table>
  
  <p>Total: $${ticket.amount}</p>
  <p>Purchase Code: $${ticket.code}</p>
  
  <p>Thank you for choosing our products. We appreciate your business!</p>`;

    const mailOptions = {
      from: "Rude Bikes",
      to: purchaserMail,
      subject: "Thanks for your purchase in Rude Bikes",
      html: templatePurchaseHTML,
      // attachments: ticket,
    };

    try {
      const sendMail = transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });
      console.log(`email sent ${sendMail}`);
    } catch (error) {
      console.log(error);
    }
  }

  async sendMailToRestorePassword(userMail, userId, token) {
    console.log(userMail, token);

    const transport = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      auth: {
        user: nodeMailerUSer,
        pass: nodeMailerPass,
      },
    });

    const link = `http://${CLIENT_URL}/restorePassword/newPass?token=${token}&id=${userId}`;

    const templateRestorePass = `<h1>Password Reset</h1>
    <p>Hello!</p>
    <p>We received a request to reset your password. If you didn't make this request, you can ignore this email.</p>
    <p>Click the link below to reset your password:</p>
    <a href='${link}'>Restore Password</a>
    <p>This link will expire in 24 hours for security reasons.</p>
    <p>If you have any questions or need assistance, please contact our support team.</p>
    <p>Best regards,</p>
    <p>Luxury Motorcycles</p>`;

    const mailOptions = {
      from: "Luxury Motorcycles",
      to: userMail,
      subject: "Restore Your password in Rike Bikes",
      html: templateRestorePass,
    };

    try {
      const sendMail = transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          logger.info("Error sending email:", error);
        } else {
          logger.info("Email sent:", info.response);
        }
      });
      logger.info(`email sent ${sendMail}`);
    } catch (error) {
      logger.error(error);
    }
  }

  async sendMailToNotifyOfProductDeleted(user, product) {
    console.log(user.email);
    console.log(product);

    const transport = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      auth: {
        user: nodeMailerUSer,
        pass: nodeMailerPass,
      },
    });

    const templateNotificationHTML = `
    <h1>One of your products was deleted!</h1>
    <h2>Hi ${user.first_name}</h2>
    <h2>One of your products was removed because it violates our posting policies</h2>

    <h3>The Product was:</h3>
  <p>Name: ${product.title}</p>
  <p>Description: ${product.description}</p>
  <p>Code Of Product: ${product.code}</p>
  
  <p>Please review our posting products policies and try to upload the product again. We don't want you to stop selling. </p>
  <br/>
  <p>Luxury Motorcycles</p>`;

    const mailOptions = {
      from: "Luxury Motorcycles",
      to: user.email,
      subject: "One Of Your Products Was Deleted",
      html: templateNotificationHTML,
    };

    try {
      const sendMail = transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          logger.info("Error sending email:", error);
        } else {
          logger.info("Email sent:", info.response);
        }
      });
      logger.info(`email sent ${sendMail}`);
    } catch (error) {
      throw new Error(`some error ocurred when trying to send email: ${error.message}`)
    }
  }
}

const mailService = new MailService();
export default mailService;
