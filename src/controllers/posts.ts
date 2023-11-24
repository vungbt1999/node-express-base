import express from 'express'

const getAllUsers = async (req: express.Request, res: express.Response) => {
  try {
    return res.status(200).json([])
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}

const deleteUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params

    return res.json({ id })
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}

const updateUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params
    const { username } = req.body

    if (!username) {
      return res.sendStatus(400)
    }

    return res.status(200).json({ id }).end()
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}

export const UserControllers = {
  getAllUsers,
  deleteUser,
  updateUser,
}
