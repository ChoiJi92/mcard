import { collection, doc, writeBatch } from 'firebase/firestore'
import Button from '../Button'
import { store } from '../../../remote/firebase'
import { card_list } from '@/mock/data'
import { COLLECTIONS } from '@/constants'
import { Card } from '@/models/card'

const CardListAddButton = () => {
  const handleButtonClick = async () => {
    const batch = writeBatch(store)

    card_list.forEach((card: Card) => {
      const docRef = doc(collection(store, COLLECTIONS.CARD))
      batch.set(docRef, card)
    })

    await batch.commit()

    alert('카드 리스트 추가 완료!')
  }
  return <Button onClick={handleButtonClick}>카드리스트 추가하기</Button>
}

export default CardListAddButton
