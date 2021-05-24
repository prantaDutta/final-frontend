import axios from 'axios'
import { cache } from 'swr'
import { laravelApi } from './api'

export const logout = async () => {
  try {
    cache.clear()
    await axios.post('/api/destroy-user-cookie')
    await laravelApi().post(`/logout`)
  } catch (e) {
    console.log('Error in Automatic Logging out from nextjs auth')
    // console.log("the error", e.response);
  }
}
