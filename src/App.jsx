import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ReferralLinkGenerator from './component/ReferralLinkGenerator'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ReferralLinkGenerator/>
    </>
  )
}

export default App
