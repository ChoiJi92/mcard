import { getAppliedCard } from '@/remote/apply'
import { useSuspenseQuery } from '@tanstack/react-query'

const useAppliedCard = ({
  userId,
  cardId,
}: {
  userId: string
  cardId: string
}) => {
  return useSuspenseQuery({
    queryKey: ['applied', userId, cardId],
    queryFn: () => getAppliedCard({ userId, cardId }),
  })
}

export default useAppliedCard
