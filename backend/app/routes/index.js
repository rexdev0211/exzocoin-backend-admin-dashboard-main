import { Router } from 'express'
import apiRoute from './api'
import serviceRoute from './service'

const appRoute = Router()

appRoute.use('/api', apiRoute)
appRoute.use('/services', serviceRoute)

export default appRoute