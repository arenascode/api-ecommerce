import Ticket from "../entities/Ticket.js";
import ticketRepository from "../repositories/ticket.repository.js";

class TicketService {

  async createTicket(amount, purchaser) {

    const newTicket = new Ticket(amount, purchaser)

    
    return await ticketRepository.createTicket(newTicket)
  }
}

const ticketService = new TicketService()
export default ticketService