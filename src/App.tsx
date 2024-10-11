import Alert from './components/shared/Alert'
import Button from './components/shared/Button'
import Text from './components/shared/Text'
import { useAlertContext } from './contexts/AlertContext'

function App() {
  const { open } = useAlertContext()
  return (
    <div>
      <Text typography="t1">t1</Text>
      <Text typography="t2">t2</Text>
      <Text typography="t3">t3</Text>
      <Text typography="t4">t4</Text>
      <Text typography="t5">t5</Text>
      <Text typography="t6">t6</Text>
      <Text typography="t7">t7</Text>

      <Button
        onClick={() => {
          open({
            title: '카드신청완료',
            description: '내역페이지에서 확인해주세요',
            onButtonClick: () => {},
          })
        }}
      >
        Alert 오픈
      </Button>

      {/* <Alert
        open
        title="알럿이 떴습니다."
        description="안녕하세요"
        onButtonClick={() => {}}
      /> */}
    </div>
  )
}

export default App
