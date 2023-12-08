import React from 'react'
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react'
import { ChevronDownIcon } from '@/components/icons'
import { ELEMENT_H4, ELEMENT_H3 } from '@udecode/plate-heading'
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph'

type HeadingDropdownProps = {
  applyFormat: (type: string) => void
  textType?: string
}

const HeadingDropdown = ({ applyFormat, textType }: HeadingDropdownProps) => {
  const formatItems = [
    { type: ELEMENT_PARAGRAPH, label: 'P', command: '⌘P' },
    { type: ELEMENT_H3, label: 'H3', command: '⌘H3' },
    { type: ELEMENT_H4, label: 'H4', command: '⌘H4' },
    // Add other formats as needed
  ]

  return (
    <Menu>
      <MenuButton size="sm" as={Button} rightIcon={<ChevronDownIcon />}>
        {textType?.toUpperCase() || 'Format'}
      </MenuButton>
      <MenuList>
        {formatItems.map(({ type, label, command }) => (
          <MenuItem
            key={type}
            onClick={() => applyFormat(type)}
            command={command}
          >
            {label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default HeadingDropdown
