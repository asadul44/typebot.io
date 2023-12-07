import React from 'react'
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react'
import { ChevronDownIcon } from '@/components/icons'

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
        <MenuItem onClick={() => applyFormat('p')} command="⌘P">
          P
        </MenuItem>
        <MenuItem onClick={() => applyFormat('h3')} command="⌘H3">
          H3
        </MenuItem>
        <MenuItem onClick={() => applyFormat('h4')} command="⌘H4">
          H4
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default HeadingDropdown
