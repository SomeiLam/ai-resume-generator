import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from './firebase'
import { ProfileData } from '../types/profile'

export async function fetchProfile(uid: string) {
  const docRef = doc(db, 'profile', uid)
  const docSnap = await getDoc(docRef)
  return docSnap.exists() ? docSnap.data() : null
}

export async function saveProfile(uid: string, profileData: ProfileData) {
  const docRef = doc(db, 'profile', uid)
  // setDoc will create or overwrite the document
  await setDoc(docRef, profileData)
}
