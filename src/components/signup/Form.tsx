import React, { ChangeEvent, useCallback, useMemo, useState } from 'react'
import Flex from '../shared/Flex'
import TextField from '../shared/TextField'
import FixedBottomButton from '../shared/FixedBottomButton'
import { css } from '@emotion/react'
import Spacing from '../shared/Spacing'
import { FormValues } from '@/models/signup'
import validator from 'validator'

function validate(formValues: FormValues) {
  const errors: Partial<FormValues> = {}

  if (!validator.isEmail(formValues.email)) {
    errors.email = '이메일 형식을 확인해주세요'
  }
  if (formValues.password.length < 8) {
    errors.password = '비밀번호는 8글자 이상 입력해주세요'
  }
  if (formValues.rePassword.length < 8) {
    errors.rePassword = '비밀번호는 8글자 이상 입력해주세요'
  } else if (!validator.equals(formValues.password, formValues.rePassword)) {
    errors.rePassword = '비밀번호를 확인해주세요'
  }
  if (formValues.name.length < 2) {
    errors.name = '이름은 2글자 이상 입력해주세요'
  }

  return errors
}

const Form = ({ onSubmit }: { onSubmit: (formValues: FormValues) => void }) => {
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
    rePassword: '',
    name: '',
  })

  const [dirty, setDirty] = useState<Partial<FormValues>>({})

  const handelFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormVaules) => ({
      ...prevFormVaules,
      [e.target.name]: e.target.value,
    }))
  }, [])

  const handleBlur = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDirty((prevDirty) => ({
      ...prevDirty,
      [e.target.name]: 'true',
    }))
  }, [])

  const errors = useMemo(() => validate(formValues), [formValues])

  const 제출가능한상태인가 = Object.keys(errors).length === 0
  return (
    <Flex direction="column" css={formContainerStyles}>
      <TextField
        label="이메일"
        name="email"
        value={formValues.email}
        onChange={handelFormValues}
        hasError={Boolean(dirty.email) && Boolean(errors.email)}
        helpMessage={dirty.email ? errors.email : ''}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="패스워드"
        type="password"
        name="password"
        value={formValues.password}
        onChange={handelFormValues}
        hasError={Boolean(dirty.password) && Boolean(errors.password)}
        helpMessage={dirty.password ? errors.password : ''}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="패스워드 재확인"
        type="password"
        name="rePassword"
        value={formValues.rePassword}
        onChange={handelFormValues}
        hasError={Boolean(dirty.rePassword) && Boolean(errors.rePassword)}
        helpMessage={dirty.rePassword ? errors.rePassword : ''}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="이름"
        name="name"
        value={formValues.name}
        onChange={handelFormValues}
        hasError={Boolean(dirty.name) && Boolean(errors.name)}
        helpMessage={dirty.name ? errors.name : ''}
        onBlur={handleBlur}
      />
      <FixedBottomButton
        disabled={!제출가능한상태인가}
        label="회원가입"
        onClick={() => {
          onSubmit(formValues)
        }}
      />
    </Flex>
  )
}

const formContainerStyles = css`
  padding: 24px;
`

export default Form
