import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyD6z9mXpSA1k2wLhNM4SsKi4rWa_nO23g0',
  authDomain: 'routine-8d2b8.firebaseapp.com',
  projectId: 'routine-8d2b8',
  storageBucket: 'routine-8d2b8.appspot.com',
  messagingSenderId: '920853146140',
  appId: '1:920853146140:web:1a0935c4ac4a8073c94dd9',
  measurementId: 'G-JMTN5R7HV1',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
