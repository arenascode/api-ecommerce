import usersService from "../services/users.service.js";

export async function handleGet(req, res, next) {
  const users = await usersService.getAllUsers()
  res.json(users);
}

export function handleGetById(req, res, next) {
  const userById = usersService.getUserById(req.params.uid)
  res.json(userById);
}

export async function handlePostNewUser(req, res, next) {
  const dataNewUser = req.body
  const userCreated = await usersService.createNewUser(dataNewUser)
  res.json(userCreated);
}

export async function handlePut(req, res, next) {
  const newData = req.body
  const userUpdated = await usersService.updateUser(req.params.uid, newData)
  res.json(userUpdated)
}

export async function handleDelete(req, res, next) {
  userDeleted = await usersService.deleteUser(req.params.uid)
  res.json({msg: 'The User was deleted'})
}