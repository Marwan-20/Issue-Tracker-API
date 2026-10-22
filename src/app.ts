//  route around the diffrent requists

import express from 'express'
import userRoute from './routes/userRoute'
import projectRoute from './routes/projectRoute'
import issuesRoute from './routes/issuesRoute'

let app = express()

app.use(express.json())

app.use(userRoute)
app.use(projectRoute)
app.use(issuesRoute)

export default app;