import { Link, useLocation } from 'react-router-dom'
import Flex from './Flex'
import Button from './Button'
import { css } from '@emotion/react'
import { colors } from '@/styles/colorPalette'

const Navbar = () => {
  const location = useLocation()
  const showSignButton =
    ['/signin', '/signup'].includes(location.pathname) === false
  return (
    <Flex justify="space-between" align="center" css={navbarContainerStyles}>
      <Link to={'/'}>홈</Link>
      {showSignButton && (
        <Link to={'/signup'}>
          <Button>로그인/회원가입</Button>
        </Link>
      )}
    </Flex>
  )
}

const navbarContainerStyles = css`
  padding: 10px 24px;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  border-bottom: 1px solid ${colors.grey};
  z-index: 10;
`

export default Navbar
