import { useToast } from '@/hooks/useToast'
import { Button, ButtonProps, chakra } from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'
import { uploadFiles, convertBytesToMB } from '@typebot.io/lib'
import { compressFile } from '@/helpers/compressFile'

type UploadButtonProps = {
  fileType: 'image' | 'audio' | 'video'
  filePath: string
  includeFileName?: boolean
  onFileUploaded: (url: string) => void
} & ButtonProps

const fileTypes = {
  image: '.jpg, .jpeg, .png, .gif',
  audio: '.mp3, .wav',
  video: '.mp4, .mov, .avi',
}
export const UploadButton = ({
  fileType,
  filePath,
  includeFileName,
  onFileUploaded,
  ...props
}: UploadButtonProps) => {
  const [isUploading, setIsUploading] = useState(false)
  const { showToast } = useToast()

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target?.files) return
    setIsUploading(true)

    const file = e.target.files[0] as File | undefined
    if (!file) {
      showToast({ description: 'Could not read file.', status: 'error' })
      setIsUploading(false)
      return
    }

    //  size limits (in bytes)
    const minSize = 1024 * 1024 * 0.1 // 0.1 MB minimum
    const maxSize = 1024 * 1024 * 40 // 10 MB maximum
    const sizeInMB: string = convertBytesToMB(file.size).toFixed(2)
    if (
      (file.type.startsWith('video/') && file.size < minSize) ||
      file.size > maxSize
    ) {
      showToast({
        description: `File size should be between 0 MB and 40 MB. your file size is ${sizeInMB}`,
        status: 'error',
      })
      setIsUploading(false)
      return
    }

    const urls = await uploadFiles({
      files: [
        {
          file: await compressFile(file),
          path: `public/${filePath}${includeFileName ? `/${file.name}` : ''}`,
        },
      ],
    })
    if (urls.length && urls[0]) onFileUploaded(urls[0] + '?v=' + Date.now())
    setIsUploading(false)
  }

  return (
    <>
      <chakra.input
        data-testid="file-upload-input"
        type="file"
        id="file-input"
        display="none"
        onChange={handleInputChange}
        accept={fileTypes[fileType] || fileTypes['image']}
      />
      <Button
        as="label"
        size="sm"
        htmlFor="file-input"
        cursor="pointer"
        isLoading={isUploading}
        {...props}
      >
        {props.children}
      </Button>
    </>
  )
}
