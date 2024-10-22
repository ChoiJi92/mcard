import { COLLECTIONS } from '@/constants'
import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { store } from './firebase'
import { ApplyValues } from '@/models/apply'

export async function applyCard(applyValues: ApplyValues) {
  return addDoc(collection(store, COLLECTIONS.CARD_APPLY), applyValues)
}

export async function updateApplyCard({
  cardId,
  userId,
  applyValues,
}: {
  cardId: string
  userId: string
  applyValues: Partial<ApplyValues>
}) {
  const snapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.CARD_APPLY),
      where('cardId', '==', cardId),
      where('userId', '==', userId),
    ),
  )

  const [applied] = snapshot.docs
  updateDoc(applied.ref, applyValues)
}

export async function getAppliedCard({
  userId,
  cardId,
}: {
  userId: string
  cardId: string
}) {
  const snapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.CARD_APPLY),
      where('cardId', '==', cardId),
      where('userId', '==', userId),
    ),
  )

  if (snapshot.docs.length === 0) {
    return null
  }

  const [applied] = snapshot.docs

  return applied.data() as ApplyValues
}
