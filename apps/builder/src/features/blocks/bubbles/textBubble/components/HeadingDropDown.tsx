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
  return (
    <Menu>
      <MenuButton size="sm" as={Button} rightIcon={<ChevronDownIcon />}>
        {textType?.toLocaleUpperCase()}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => applyFormat(ELEMENT_PARAGRAPH)} command="⌘P">
          P
        </MenuItem>
        <MenuItem onClick={() => applyFormat(ELEMENT_H3)} command="⌘H3">
          H3
        </MenuItem>
        <MenuItem onClick={() => applyFormat(ELEMENT_H4)} command="⌘H4">
          H4
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default HeadingDropdown
