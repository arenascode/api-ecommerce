import ticketDaoMongo from "../daos/cart/ticketDaoMongo.js";

class TicketsRepository {

  constructor(daoSelected) {
    this.dao = daoSelected
  }
  async createTicket(ticketData) {
    return await this.dao.createTicket(ticketData)
  }

  async getTickets() {
    return await this.dao.getTickets()
  }
}

const ticketsRepository = new TicketsRepository(ticketDaoMongo)
export default ticketsRepository