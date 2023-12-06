/* eslint-disable solid/reactivity */
import { Show } from 'solid-js'

export type PlateTextProps = {
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  color?: string
  backgroundColor?: string
}

const computeClassNames = (
  bold?: boolean,
  italic?: boolean,
  underline?: boolean
): string => {
  let className = ''
  if (bold) className += 'slate-bold'
  if (italic) className += ' slate-italic'
  if (underline) className += ' slate-underline'
  return className
}

export const PlateText = (props: PlateTextProps) => {
  const className: string = computeClassNames(
    props.bold,
    props.italic,
    props.underline
  )
  const style = `color: ${props.color || 'inherit'}; background-color: ${
    props.backgroundColor || 'inherit'
  };`

  return (
    <Show
      when={className || Object.keys(style).length > 0}
      fallback={<>{props.text}</>}
    >
      <span class={className} style={style}>
        {props.text}
      </span>
    </Show>
  )
}
