import { Typography } from 'antd'

import S from './example-component.module.css'

const { Title } = Typography

function ExampleComponent() {
  return (
    <div className={S.root}>
      <Title>Example</Title>
    </div>
  )
}

export default ExampleComponent
