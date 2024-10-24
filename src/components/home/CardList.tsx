import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import ListRow from '../shared/ListRow'
import { getCards } from '@/remote/card'
import flatten from 'lodash/flatten'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useCallback } from 'react'
import { Card } from '@/models/card'
import { QueryDocumentSnapshot, QuerySnapshot } from 'firebase/firestore'
import Badge from '../shared/Badge'
import { useNavigate } from 'react-router-dom'

type CardWithId = Card & { id: string }

interface CardData {
  items: CardWithId[]
  lastVisible: QueryDocumentSnapshot
}

const CardList = () => {
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useSuspenseInfiniteQuery<CardData, Error>({
    queryKey: ['cardList'],
    queryFn: ({ pageParam }) => {
      return getCards(pageParam as QuerySnapshot<Card> | undefined)
    },
    getNextPageParam: (snapshot) => {
      return snapshot.lastVisible
    },
    initialPageParam: undefined,
  })
  const navigate = useNavigate()
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
        loader={<ListRow.Skeleton />}
        next={loadMore}
        scrollThreshold={0.9}
      >
        <ul>
          {cards.map((card, index) => (
            <ListRow
              key={card.id}
              contents={
                <ListRow.Text title={`${index + 1}위`} subTitle={card.name} />
              }
              right={card.payback && <Badge label={card.payback} />}
              withArrow
              onClick={() => navigate(`/card/${card.id}`)}
            />
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  )
}

export default CardList
