import { 약관목록 } from '@/constants/apply'
import Agreement from '../shared/Agreement'
import { MouseEvent, useCallback, useState } from 'react'
import FixedBottomButton from '../shared/FixedBottomButton'
import { ApplyValues } from '@/models/apply'

const Terms = ({
  onNext,
}: {
  onNext: (terms: ApplyValues['terms']) => void
}) => {
  const [termsAgreement, setTermsAgreement] = useState(() => {
    return 약관목록.reduce<Record<string, boolean>>(
      (prev, term) => ({
        ...prev,
        [term.id]: false,
      }),
      {},
    )
  })

  const 모든약관이_동의되었는가 = Object.values(termsAgreement).every(
    (value) => value,
  )
  const handleAllAgreement = useCallback(
    (_: MouseEvent<HTMLElement>, checked: boolean) => {
      setTermsAgreement((prevTerms) => {
        return Object.keys(prevTerms).reduce(
          (prev, key) => ({
            ...prev,
            [key]: checked,
          }),
          {},
        )
      })
    },
    [],
  )
  return (
    <div>
      <Agreement>
        <Agreement.Title
          checked={모든약관이_동의되었는가}
          onChange={handleAllAgreement}
        >
          약관에 모두 동의
        </Agreement.Title>
        {약관목록.map(({ id, title, link }) => (
          <Agreement.Description
            key={id}
            checked={termsAgreement[id]}
            onChange={(_, checked) => {
              setTermsAgreement((prevTerms) => ({
                ...prevTerms,
                [id]: checked,
              }))
            }}
            link={link}
          >
            {title}
          </Agreement.Description>
        ))}
      </Agreement>
      <FixedBottomButton
        label="약관동의"
        disabled={!모든약관이_동의되었는가}
        onClick={() => onNext(Object.keys(termsAgreement))}
      />
    </div>
  )
}

export default Terms
