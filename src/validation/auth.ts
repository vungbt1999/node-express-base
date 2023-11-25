import { NextFunction, Request, Response } from 'express'
import validator from '@utils/validator'

const signIn = async (req: Request, res: Response, next: NextFunction) =>
  validator(req, res, next, {
    data: req.body,
    rules: {
      username: 'required|unique:user,username',
      password: 'required',
    },
  })

const signUp = async (req: Request, res: Response, next: NextFunction) =>
  validator(req, res, next, {
    data: req.body,
    rules: {
      username: 'required|unique:user,username',
      password: 'required',
    },
  })

export const AuthValidations = {
  signIn,
  signUp,
}
