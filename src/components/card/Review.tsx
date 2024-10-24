import { useQuery } from '@tanstack/react-query'
import Skeleton from '../shared/Skeleton'
import Spacing from '../shared/Spacing'
import { useInView } from 'react-intersection-observer'

const Review = () => {
  const { ref, inView } = useInView({ triggerOnce: true })
  const { data = [], isLoading } = useQuery({
    queryKey: ['review'],
    queryFn: () => {
      return new Promise<string[]>((resolve) => {
        setTimeout(() => {
          resolve(['너무 좋아요!!!', '이거 대박인데요??'])
        }, 2000)
      })
    },
    enabled: inView,
  })
  return (
    <div ref={ref}>
      {isLoading ? (
        <>
          <Skeleton width={30} height={10} />
          <Spacing size={3} />
          <Skeleton width={30} height={10} />
        </>
      ) : (
        data.map((review) => <div>{review}</div>)
      )}
    </div>
  )
}

export default Review
