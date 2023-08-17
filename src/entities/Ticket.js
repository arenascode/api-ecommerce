
function generateTicketCode() {
  const code = Math.floor(Math.random() * Date.now()).toString(12)
  return code;
}

function purchaseDateTime() {
  const today = new Date()
  return today.toString()
}

export default class Ticket {
  constructor(amount, purchaser) {
    this.code = generateTicketCode();
    this.purchase_dateTime = purchaseDateTime();
    this.amount = Number(amount);
    this.purchaser = purchaser;
  }
}
