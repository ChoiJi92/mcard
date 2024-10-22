import Apply from '@/components/apply'
import useAppliedCard from '@/components/apply/hooks/useAppliedCard'
import useApplyCardMutation from '@/components/apply/hooks/useApplyCardMutation'
import usePollApplyStatus from '@/components/apply/hooks/usePollApplyStatus'
import FullPageLoader from '@/components/shared/FullPageLoader'
import { useAlertContext } from '@/contexts/AlertContext'
import useUser from '@/hooks/auth/useUser'
import { APPLY_STATUS } from '@/models/apply'
import { updateApplyCard } from '@/remote/apply'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ApplyPage = () => {
  const [readyToPoll, setReadyToPoll] = useState(false)
  const user = useUser()
  const { id } = useParams() as { id: string }

  const { open } = useAlertContext()

  const navigate = useNavigate()

  const { data, isSuccess: applyCardIsSuccess } = useAppliedCard({
    userId: user?.uid as string,
    cardId: id,
  })

  const { isSuccess, isError } = usePollApplyStatus({
    enabled: readyToPoll,
  })

  const { mutate, isPending } = useApplyCardMutation({
    onSuccess: () => {
      setReadyToPoll(true)
    },
    onError: () => {
      window.history.back()
    },
  })

  useEffect(() => {
    if (applyCardIsSuccess) {
      if (data === null) {
        return
      }
      if (data.status === APPLY_STATUS.COMPLETE) {
        const storageKey = `applied-${user?.uid}-${id}`
        localStorage.removeItem(storageKey)
        open({
          title: '이미 발급이 완료된 카드입니다.',
          onButtonClick: () => {
            window.history.back()
          },
        })

        return
      }

      setReadyToPoll(true)
    }
  }, [applyCardIsSuccess, data, open])

  useEffect(() => {
    const handlePollResult = async () => {
      if (isSuccess) {
        await updateApplyCard({
          userId: user?.uid as string,
          cardId: id,
          applyValues: {
            status: APPLY_STATUS.COMPLETE,
          },
        })
        navigate('/apply/done?success=true', {
          replace: true,
        })
      }
      if (isError) {
        await updateApplyCard({
          userId: user?.uid as string,
          cardId: id,
          applyValues: {
            status: APPLY_STATUS.REJECT,
          },
        })
        navigate('/apply/done?success=false', {
          replace: true,
        })
      }
    }

    handlePollResult()
  }, [isSuccess, isError, user?.uid, id, navigate])

  if (data !== null && data.status === APPLY_STATUS.COMPLETE) {
    return null
  }

  if (readyToPoll || isPending) {
    return <FullPageLoader message="카드를 신청중입니다." />
  }

  return <Apply onSubmit={mutate} />
}

export default ApplyPage
