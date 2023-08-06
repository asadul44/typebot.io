import { Standard } from '@typebot.io/react'
import { BackgroundType, Typebot } from '@typebot.io/schemas'
import { useRouter } from 'next/router'
import { SEO } from './Seo'
import { useState } from 'react'

export type TypebotPageProps = {
  url: string
  typebot?: Pick<Typebot, 'settings' | 'theme' | 'name' | 'publicId'>
}

export const TypebotPageV3 = ({ url, typebot }: TypebotPageProps) => {
  const { asPath, push, query } = useRouter()
  const [showTypebot, setShowTypebot] = useState(true)
  const background = typebot?.theme.general.background

  const clearQueryParamsIfNecessary = () => {
    const hasQueryParams = asPath.includes('?')
    if (
      !hasQueryParams ||
      !(typebot?.settings.general.isHideQueryParamsEnabled ?? true)
    )
      return
    push(asPath.split('?')[0], undefined, { shallow: true })
  }
  console.log(url, typebot, ' url, typebot', showTypebot)
  const setRestart = () => {
    setShowTypebot(false)
    setTimeout(() => {
      setShowTypebot(true)
    }, 20)
  }
  return (
    <div
      style={{
        height: '100vh',
        // Set background color to avoid SSR flash
        backgroundColor:
          background?.type === BackgroundType.COLOR
            ? background?.content
            : background?.type === BackgroundType.NONE
            ? undefined
            : '#fff',
      }}
    >
      <div>
        <button
          style={{
            backgroundColor: '#FAF8F7',
            borderRadius: '4px',
            padding: '14px 14px',
            width: '100px',
            marginTop: '12px',
            marginLeft: '40px',
            border: 'none',
            fontSize: '1rem',
            lineHeight: '1.5rem',
            cursor: 'pointer',
          }}
          onClick={() => setRestart()}
        >
          Restart
        </button>
      </div>
      {typebot && (
        <SEO
          url={url}
          typebotName={typebot.name}
          metadata={typebot.settings.metadata}
        />
      )}
      {showTypebot && (
        <Standard
          typebot={typebot?.publicId ?? query.publicId?.toString() ?? 'n'}
          onInit={clearQueryParamsIfNecessary}
        />
      )}
    </div>
  )
}
