// firebaseStorage.ts
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'
import { storage } from './firebase' // your Firebase storage instance

export async function uploadImageToFirebase(
  file: File,
  userId: string
): Promise<string> {
  const storageRef = ref(storage, `profile/${userId}/${file.name}`)
  await uploadBytes(storageRef, file)
  return await getDownloadURL(storageRef)
}

export async function deleteImageFromFirebase(imageUrl: string): Promise<void> {
  const storageRef = ref(storage, imageUrl)
  await deleteObject(storageRef)
}
