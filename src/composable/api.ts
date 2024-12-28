import { useUserStore } from '@/stores/user'
import axios from '../plugins/axios'
export const useApis = () => {
  const userStore = useUserStore()
  const fetchAndSetUser = async () => {
    try {
      const resp = await axios.get(`/api/users`)
      userStore.setUser({
        mail: resp.data?.mail,
        name: resp.data?.name,
        photoUrl: resp.data?.photoUrl,
        completedTasks: resp.data?.completedTasks,
        totalTasks: resp.data?.totalTasks,
      })
    } catch (e) {
      console.log(e)
    }
  }
  return { fetchAndSetUser }
}
