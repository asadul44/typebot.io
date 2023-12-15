import {
  createBoldPlugin,
  createItalicPlugin,
  createUnderlinePlugin,
} from '@udecode/plate-basic-marks'
import { createPlugins } from '@udecode/plate-core'
import { createLinkPlugin, ELEMENT_LINK } from '@udecode/plate-link'
import { PlateFloatingLink } from '@udecode/plate-ui-link'
import {
  createFontBackgroundColorPlugin,
  createFontColorPlugin,
} from '@udecode/plate-font'
import { createHeadingPlugin } from '@udecode/plate-heading'
import { createParagraphPlugin } from '@udecode/plate-paragraph'
import { ELEMENT_H4, ELEMENT_H3 } from '@udecode/plate-heading'
export const editorStyle = (
  backgroundColor: string,
  color?: string
): React.CSSProperties => ({
  flex: 1,
  padding: '1rem',
  backgroundColor,
  color,
  borderRadius: '0.25rem',
})

export const platePlugins = createPlugins(
  [
    createBoldPlugin(),
    createItalicPlugin(),
    createUnderlinePlugin(),
    createFontColorPlugin(),
    createFontBackgroundColorPlugin(),
    createHeadingPlugin(),
    createParagraphPlugin(),
    createLinkPlugin({
      renderAfterEditable: PlateFloatingLink,
      options: {
        isUrl: (url: string) =>
          url.startsWith('http:') ||
          url.startsWith('https:') ||
          url.startsWith('mailto:') ||
          url.startsWith('tel:') ||
          url.startsWith('sms:'),
        forceSubmit: true,
      },
    }),
  ],
  {
    components: {
      [ELEMENT_LINK]: (props) => (
        <a
          href={props.element.url}
          target="_blank"
          rel="noreferrer"
          className={props.className}
        >
          {props.children}
        </a>
      ),
      [ELEMENT_H3]: (props) => (
        <h3 className={props.className}>{props.children}</h3>
      ),
      [ELEMENT_H4]: (props) => (
        <h4 className={props.className}>{props.children}</h4>
      ),
    },
  }
)
