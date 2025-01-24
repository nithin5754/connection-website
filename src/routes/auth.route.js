
import express from 'express'
import { getUser, loginUser, seed, signUp } from '../controller/auth.controller.js'

const router = express.Router()




function authRoutes() {

  router.post('/signup',signUp)
  router.post('/login',loginUser)
  router.get('/get-user/:emailId',getUser)
  router.get('/seed',seed)

  return router
}


export default authRoutes