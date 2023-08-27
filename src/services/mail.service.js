import nodemailer from "nodemailer";
import { nodeMailerPass, nodeMailerUSer } from "../config/auth.config.js";

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
}

const mailService = new MailService();
export default mailService;
