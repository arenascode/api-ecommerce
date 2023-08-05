import usersService from "../services/users.service.js";

export async function handleGet(req, res, next) {
  try {
    const users = await usersService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(400).json({ errorMsg: error.message });
  }
}

export function handleGetById(req, res, next) {
  try {
    const userById = usersService.getUserById(req.params.uid);
    res.json(userById);
  } catch (error) {
    res.status(400).json({ errorMsg: error.message });
  }
}

export async function handlePostNewUser(req, res, next) {
  try {
    const dataNewUser = req.body;
    const userCreated = await usersService.createNewUser(dataNewUser);
    res.json(userCreated);
  } catch (error) {
    res.status(400).json({ errorMsg: error.message });
  }
}

export async function handlePut(req, res, next) {
  try {
    const newData = req.body;
    const userUpdated = await usersService.updateUser(req.params.uid, newData);
    res.json(userUpdated);
  } catch (error) {
    res.status(400).json({ errorMsg: error.message });
  }
}

export async function handleDelete(req, res, next) {
  try {
    const userDeleted = await usersService.deleteUser(req.params.uid);
    res.json({ msg: `The User ${userDeleted} was deleted` });
  } catch (error) {
    res.status(400).json({ errorMsg: error.message });
  }
}
