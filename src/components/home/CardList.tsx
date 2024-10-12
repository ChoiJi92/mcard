import { useInfiniteQuery } from '@tanstack/react-query'
import ListRow from '../shared/ListRow'
import { getCards } from '@/remote/card'
import { flatten } from 'lodash'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useCallback } from 'react'
import { Card } from '@/models/card'
import { QuerySnapshot } from 'firebase/firestore'

type CardWithId = Card & { id: string }

const CardList = () => {
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['cardList'],
    queryFn: ({
      pageParam,
    }: {
      pageParam: QuerySnapshot<Card> | undefined
    }) => {
      return getCards(pageParam)
    },
    getNextPageParam: (snapshot) => {
      return snapshot.lastVisible
    },
    initialPageParam: undefined,
  })
  const loadMore = useCallback(() => {
    if (!hasNextPage || isFetching) {
      return
    }
    fetchNextPage()
  }, [hasNextPage, isFetching, fetchNextPage])

  if (!data) return null

  const cards: CardWithId[] = flatten(data?.pages.map(({ items }) => items))

  return (
    <div>
      <InfiniteScroll
        dataLength={cards.length}
        hasMore={hasNextPage}
        loader={<></>}
        next={loadMore}
      >
        {cards.map((card, index) => (
          <ListRow
            key={card.id}
            contents={
              <ListRow.Text title={`${index + 1}위`} subTitle={card.name} />
            }
            right={card.payback && <div>{card.payback}</div>}
            withArrow
          />
        ))}
      </InfiniteScroll>
    </div>
  )
}

export default CardList
