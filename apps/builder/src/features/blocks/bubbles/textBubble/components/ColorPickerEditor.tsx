import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  Center,
  PopoverBody,
  SimpleGrid,
  Input,
  Button,
  Stack,
  ButtonProps,
  IconButton,
} from '@chakra-ui/react'
import React, { ChangeEvent, useState } from 'react'
import tinyColor from 'tinycolor2'
import { BgColorPickerIcon } from '@/components/icons'
const colorsSelection: `#${string}`[] = [
  '#264653',
  '#e9c46a',
  '#2a9d8f',
  '#7209b7',
  '#023e8a',
  '#ffe8d6',
  '#d8f3dc',
  '#4ea8de',
  '#ffb4a2',
]

type Props = {
  value?: string
  defaultValue?: string
  onColorChange: (color: string) => void
  isOpen: boolean
}

export const ColorPicker = ({
  value,
  defaultValue,
  onColorChange,
  isOpen,
}: Props) => {
  const [color, setColor] = useState(defaultValue ?? '')
  const displayedValue = value ?? color

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value)
    onColorChange(e.target.value)
  }

  const handleClick = (color: string) => () => {
    setColor(color)
    onColorChange(color)
  }

  return (
    <Popover variant="picker" placement="right" isLazy>
      <PopoverTrigger>
        {isOpen ? (
          <IconButton
            aria-label="pick color"
            size="sm"
            _dark={'black.800'}
            icon={
              <p
                style={{
                  fontWeight: 'normal',
                  fontSize: 21,
                }}
              >
                <u> A </u>
              </p>
            }
          />
        ) : (
          <IconButton
            aria-label="pick bg-color"
            size="sm"
            bg="white"
            color="white"
            _dark={'orange.800'}
            isRound={true}
            icon={<BgColorPickerIcon />}
          />
        )}
      </PopoverTrigger>
      <PopoverContent width="170px">
        <PopoverArrow bg={displayedValue} />
        <PopoverCloseButton color="white" />
        <PopoverHeader
          height="100px"
          backgroundColor={displayedValue}
          borderTopLeftRadius={5}
          borderTopRightRadius={5}
          color={tinyColor(displayedValue).isLight() ? 'gray.800' : 'white'}
        >
          <Center height="100%">{displayedValue}</Center>
        </PopoverHeader>
        <PopoverBody as={Stack}>
          <SimpleGrid columns={5} spacing={2}>
            {colorsSelection.map((c) => (
              <Button
                key={c}
                aria-label={c}
                background={c}
                height="22px"
                width="22px"
                padding={0}
                minWidth="unset"
                borderRadius={3}
                _hover={{ background: c }}
                onClick={handleClick(c)}
              />
            ))}
          </SimpleGrid>
          <Input
            borderRadius={3}
            marginTop={3}
            placeholder="#2a9d8f"
            aria-label="Color value"
            size="sm"
            value={displayedValue}
            onChange={handleColorChange}
          />
          <NativeColorPicker
            size="sm"
            color={displayedValue}
            onColorChange={handleColorChange}
          >
            Advanced picker
          </NativeColorPicker>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

const NativeColorPicker = ({
  color,
  onColorChange,
  ...props
}: {
  color: string
  onColorChange: (e: ChangeEvent<HTMLInputElement>) => void
} & ButtonProps) => {
  return (
    <>
      <Button as="label" htmlFor="native-picker" {...props}>
        {props.children}
      </Button>
      <Input
        type="color"
        display="none"
        id="native-picker"
        width="0"
        height="0"
        value={color}
        onChange={onColorChange}
      />
    </>
  )
}
