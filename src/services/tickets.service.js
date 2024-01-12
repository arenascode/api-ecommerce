import Ticket from "../entities/Ticket.js";
import ticketRepository from "../repositories/ticket.repository.js";

class TicketsService {

  async createTicket(amount, purchaser) {

    const newTicket = new Ticket(amount, purchaser)

    return await ticketRepository.createTicket(newTicket)
  }

  async getTickets() {
    return await ticketRepository.getTickets()
  }
}

const ticketsService = new TicketsService()
export default ticketsService