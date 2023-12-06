import {
  StackProps,
  HStack,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react'
import {
  MARK_BOLD,
  MARK_ITALIC,
  MARK_UNDERLINE,
} from '@udecode/plate-basic-marks'
import { getPluginType, usePlateEditorRef } from '@udecode/plate-core'
import { LinkToolbarButton } from '@udecode/plate-ui-link'
import { MarkToolbarButton } from '@udecode/plate-ui-toolbar'
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  LinkIcon,
  UserIcon,
} from '@/components/icons'

import { ColorPicker } from './ColorPickerEditor'
import { useState } from 'react'
type Props = {
  onVariablesButtonClick: () => void
  applyColor: (color: string) => void
  applyBgColor: (backgroundColor: string) => void
  color?: string
  backgroundColor?: string
} & StackProps

export const TextEditorToolBar = ({
  onVariablesButtonClick,
  applyColor,
  applyBgColor,
  color,
  backgroundColor,
  ...props
}: Props) => {
  const editor = usePlateEditorRef()
  const handleVariablesButtonMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    onVariablesButtonClick()
  }
  const [textColorOpen, setTextColorOpen] = useState(true)
  const [bgColorOpen, setBgColorOpen] = useState(false)
  return (
    <HStack
      bgColor={useColorModeValue('white', 'gray.850')}
      borderTopRadius="md"
      p={2}
      w="full"
      boxSizing="border-box"
      borderBottomWidth={1}
      {...props}
    >
      <IconButton
        aria-label="Insert variable"
        size="sm"
        onMouseDown={handleVariablesButtonMouseDown}
        icon={<UserIcon />}
      />
      <span data-testid="bold-button">
        <MarkToolbarButton
          type={getPluginType(editor, MARK_BOLD)}
          icon={<BoldIcon />}
        />
      </span>
      <span data-testid="italic-button">
        <MarkToolbarButton
          type={getPluginType(editor, MARK_ITALIC)}
          icon={<ItalicIcon />}
        />
      </span>
      <span data-testid="underline-button">
        <MarkToolbarButton
          type={getPluginType(editor, MARK_UNDERLINE)}
          icon={<UnderlineIcon />}
        />
      </span>
      <span data-testid="link-button">
        <LinkToolbarButton icon={<LinkIcon />} />
      </span>
      <span data-testid="color">
        <ColorPicker
          onColorChange={applyColor}
          value={color}
          isOpen={textColorOpen}
        />
      </span>
      <span data-testid="bg-color">
        <ColorPicker
          onColorChange={applyBgColor}
          value={backgroundColor}
          isOpen={bgColorOpen}
        />
      </span>
    </HStack>
  )
}
