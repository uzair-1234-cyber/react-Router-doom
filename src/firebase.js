
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth'
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { collection, addDoc, query, orderBy, getDocs, deleteDoc } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyAhiatb5u0GDn0-xpX6qOTXmvcmnj1rt30",
  authDomain: "sign-in-sign-up-e64c2.firebaseapp.com",
  projectId: "sign-in-sign-up-e64c2",
  storageBucket: "sign-in-sign-up-e64c2.firebasestorage.app",
  messagingSenderId: "770272137141",
  appId: "1:770272137141:web:df4da13bb648a566f413fc"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

export async function signUp(email, password, role = 'admin') {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  const user = userCredential.user

  await setDoc(doc(db, 'users', user.uid), {
    email,
    role,
    createdAt: serverTimestamp(),
  })
  return user
}

export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
}

export function signOut() {
  return firebaseSignOut(auth)
}

export async function getUserDoc(uid) {
  const ref = doc(db, 'users', uid)
  const snap = await getDoc(ref)
  if (!snap.exists()) return null
  return snap.data()
}

export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback)
}


function slugify(text) {
  return text
    .toString()
    .normalize('NFKD')
    .replace(/\s+/g, '-') 
  .replace(/[^\w-]+/g, '') 
    .replace(/--+/g, '-') 
    .replace(/^-+/, '') 
    .replace(/-+$/, '') 
    .toLowerCase()
}

export async function createSlug({ title, customSlug, createdBy }) {
  const slug = (customSlug && slugify(customSlug)) || slugify(title)
  const docRef = await addDoc(collection(db, 'slugs'), {
    title,
    slug,
    createdBy: createdBy || null,
    createdAt: serverTimestamp(),
  })
  return { id: docRef.id, title, slug }
}

export async function listSlugs() {
  const q = query(collection(db, 'slugs'), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function deleteSlug(id) {
  await deleteDoc(doc(db, 'slugs', id))
}