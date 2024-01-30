import nextConnect from 'next-connect'
import cors from 'cors'

const handler = nextConnect()

handler.use(cors())

handler.get((req, res) => {
  // your code here
})

export default handler
