export const PlateText = ({
  text,
  bold,
  italic,
  underline,
  color,
  backgroundColor,
}: {
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  color?: string
  backgroundColor?: string
  elementType: string
}) => {
  let className = ''
  if (bold) className += 'slate-bold'
  if (italic) className += ' slate-italic'
  if (underline) className += ' slate-underline'

  let style = {}
  if (color) style = { ...style, color }
  if (backgroundColor) style = { ...style, backgroundColor: backgroundColor }

  if (className || color || backgroundColor) {
    return (
      <span className={className} style={style}>
        <PlateTextContent text={text} />
      </span>
    )
  }

  return <PlateTextContent text={text} />
}

const PlateTextContent = ({ text }: { text: string }) => (
  <>
    {text.split(/\{\{(.*?\}\})/g).map((str, idx) => {
      if (str.endsWith('}}')) {
        return (
          <span className="slate-variable" key={idx}>
            {str.trim().slice(0, -2)}
          </span>
        )
      }
      return str
    })}
  </>
)
