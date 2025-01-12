import { Divider } from 'antd'

function CustomDivider({ margin = 20, vertical, height }: { margin?: number; vertical?: boolean; height?: string }) {
  return (
    <Divider
      style={{
        marginTop: 0,
        marginBottom: margin,
        borderWidth: 2,
        height,
      }}
      type={vertical ? 'vertical' : 'horizontal'}
    />
  )
}

export default CustomDivider
