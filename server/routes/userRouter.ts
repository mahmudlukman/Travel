import {Router} from 'express'
import { register } from '../controllers/user'

const userRouter = Router()

userRouter.post('/register', register)

export default userRouter