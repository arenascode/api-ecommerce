import ticketsService from "../services/tickets.service.js";

export async function handleGetTickets(req, res, next) {
  const tickets = await ticketsService.getTickets()
  console.log(tickets);
  res.status(200).json(tickets)
}