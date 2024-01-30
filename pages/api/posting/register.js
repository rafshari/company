import axios from 'axios'

export default async function handler(req, res) {
  console.log('first:', req.body)
const {name,emil,phone,password,avatar} = req.body
 // console.log('first:', process.env.NEXT_PUBLIC_BASE_URL)

  try {
    const response = await axios.post(
      `http://localhost:5000/api/v1/auth/register`,
      { name, emil, phone, password, avatar }
    )

  console.log(' second:', response.statusText)
    return res.json(response)
  } catch (error) {
    res.send(error?.message)
  }
}
