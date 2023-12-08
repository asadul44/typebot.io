import { Button, Flex, HStack, Stack, Text } from '@chakra-ui/react'
import { VideoBubbleContent, VideoBubbleContentType } from '@typebot.io/schemas'
import urlParser from 'js-video-url-parser/lib/base'
import 'js-video-url-parser/lib/provider/vimeo'
import 'js-video-url-parser/lib/provider/youtube'
import { isDefined } from '@typebot.io/lib'
import { TextInput } from '@/components/inputs'
import { UploadButton } from '@/components/ImageUploadContent/UploadButton'
import { useState } from 'react'
type Props = {
  content?: VideoBubbleContent
  onSubmit: (content: VideoBubbleContent) => void
  fileUploadPath: string
}

export const VideoUploadContent = ({
  content,
  onSubmit,
  fileUploadPath,
}: Props) => {
  const [currentTab, setCurrentTab] = useState<'link' | 'upload'>('link')
  const submit = (url: string) => onSubmit({ url })
  const handleUrlChange = (url: string) => {
    const info = urlParser.parse(url)
    return isDefined(info) && info.provider && info.id
      ? onSubmit({
          type: info.provider as VideoBubbleContentType,
          url,
          id: info.id,
        })
      : onSubmit({ type: VideoBubbleContentType.URL, url })
  }
  return (
    // <Stack p="2">
    //   <TextInput
    //     placeholder="Paste the video link..."
    //     defaultValue={content?.url ?? ''}
    //     onChange={handleUrlChange}
    //   />
    //   <Text fontSize="sm" color="gray.400" textAlign="center">
    //     Works with Youtube, Vimeo and others
    //   </Text>
    // </Stack>
    <Stack>
      <HStack>
        <Button
          variant={currentTab === 'upload' ? 'solid' : 'ghost'}
          onClick={() => setCurrentTab('upload')}
          size="sm"
        >
          Upload
        </Button>
        <Button
          variant={currentTab === 'link' ? 'solid' : 'ghost'}
          onClick={() => setCurrentTab('link')}
          size="sm"
        >
          Embed link
        </Button>
      </HStack>
      <Stack p="2">
        {currentTab === 'upload' && (
          <Flex justify="center" py="2">
            <UploadButton
              fileType="video"
              filePath={fileUploadPath}
              onFileUploaded={submit}
              colorScheme="blue"
            >
              Choose a file
            </UploadButton>
          </Flex>
        )}
        {currentTab === 'link' && (
          <>
            <TextInput
              placeholder="Paste the video link..."
              defaultValue={content?.url ?? ''}
              onChange={handleUrlChange}
            />
            <Text fontSize="sm" color="gray.400" textAlign="center">
              Works with Youtube, Vimeo and others
            </Text>
          </>
        )}
      </Stack>
    </Stack>
  )
}
