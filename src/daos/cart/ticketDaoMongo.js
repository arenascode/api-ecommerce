import { ticketModel } from "../../models/ticket.model.js"

class TicketsDaoMongo {

  constructor(collectionSelected) {
    this.collection = collectionSelected
  }

  async createTicket(ticketData) {
    return this.collection.create(ticketData)
  }

  async getTickets() {
    return this.collection.find()
  }
}

const ticketsDaoMongo = new TicketsDaoMongo(ticketModel)

export default ticketsDaoMongo