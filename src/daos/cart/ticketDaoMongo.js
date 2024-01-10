import { ticketModel } from "../../models/ticket.model.js"

class TicketDaoMongo {

  constructor(collectionSelected) {
    this.collection = collectionSelected
  }

  async createTicket(ticketData) {
    return this.collection.create(ticketData)
  }
}

const ticketDaoMongo = new TicketDaoMongo(ticketModel)

export default ticketDaoMongo