import cartsDaoMongoDb from "../daos/cart/cartsDaoMongoDb.js";
import ticketDaoMongo from "../daos/cart/ticketDaoMongo.js";

class TicketRepository {

  constructor(daoSelected) {
    this.dao = daoSelected
  }
  async createTicket(ticketData) {
    return await this.dao.createTicket(ticketData)
  }
}

const ticketRepository = new TicketRepository(cartsDaoMongoDb)
export default ticketRepository