
import express from 'express'
import { getUser, loginUser, seed, sendConnections, signUp } from '../controller/auth.controller.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()




function authRoutes() {

  router.post('/signup',signUp)
  router.post('/login',loginUser)
  router.get('/profile',authMiddleware,getUser)

  router.get('/sendConnections',authMiddleware,sendConnections)



  router.get('/seed',seed)

  return router
}


export default authRoutes