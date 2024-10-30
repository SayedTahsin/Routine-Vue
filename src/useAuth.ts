import { ref } from 'vue'
import { auth, provider } from './firebase'
import { signInWithPopup, signOut } from 'firebase/auth'
import axios from 'axios'

export function useAuth() {
  const user = ref()
  const error = ref()

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      user.value = result.user
      // Call your API to save user data
      await saveUserData(user.value)
    } catch (err) {
      error.value = err
      console.error('Login error:', error.value)
    }
  }
  const logout = async () => {
    try {
      await signOut(auth)
      user.value = null // Clear the user state after logging out
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  const saveUserData = async (user: {
    uid: string
    displayName: string
    email: string
    photoURL: string
  }) => {
    try {
      const response = await axios.post('YOUR_API_ENDPOINT', {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      })
      console.log('User data saved:', response.data)
    } catch (err) {
      console.error('Error saving user data:', err)
    }
  }

  return {
    user,
    error,
    loginWithGoogle,
    logout,
  }
}
