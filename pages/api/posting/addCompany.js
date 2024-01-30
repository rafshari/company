import axios from 'axios'

export default async function handler(req, res) {

    
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/companies`,
      req.query.companyData
    )
    // console.log('api2:', data)
    return res.json(response.success)
  } catch (error) {
    res.send(error.message)
  }
}
