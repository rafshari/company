import axios from "axios"

export default async function handler(req, res) {
  const provinceId = req.query.provinceId
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

    try {
        const { data } = await axios.get(
          `${BASE_URL}/api/v1/locations/states/cities/${provinceId}`
        )
       // console.log('api2:', data)
        return res.json(data)
    } catch (error) {
         res.send(error.message)
        
    }
} 