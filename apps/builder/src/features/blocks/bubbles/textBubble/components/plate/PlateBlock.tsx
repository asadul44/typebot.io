import { TElement, TText, TDescendant } from '@udecode/plate-common'
import { PlateText } from './PlateText'

export const PlateBlock = ({ element }: { element: TElement | TText }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  console.log(element.text, '<=====>', element.type)
  if (element.text)
    return (
      <PlateText
        {...(element as any)}
        color={element.color} // Assuming color is stored here
        backgroundColor={element.backgroundColor}
      />
    )
  switch (element.type) {
    case 'a': {
      console.log(element.type, 'element.type a')
      return (
        <a href={element.url as string} target="_blank" className="slate-a">
          {(element.children as TDescendant[])?.map((child, idx) => (
            <PlateBlock key={idx} element={child} />
          ))}
        </a>
      )
    }
    case 'h3': {
      console.log(element.type, 'element.type h3')
      return (
        <h3 className="slate-h3">
          {(element.children as TDescendant[])?.map((child, idx) => (
            <PlateBlock key={idx} element={child} />
          ))}
        </h3>
      )
    }
    case 'h4': {
      console.log(element.type, 'element.type h4', element.children)
      return (
        <h4 className="slate-h4">
          {(element.children as TDescendant[])?.map((child, idx) => (
            <PlateBlock key={idx} element={child} />
          ))}
        </h4>
      )
    }
    default: {
      console.log(element.type, 'element.type p', element.children)
      return (
        <div>
          {(element.children as TDescendant[])?.map((child, idx) => (
            <PlateBlock key={idx} element={child} />
          ))}
        </div>
      )
    }
  }
}

// import { TElement, TDescendant, TText } from '@udecode/plate-common'
// import { PlateText } from './PlateText'

// export const PlateBlock = ({ element }: { element: TElement | TText }) => {
//   if (element.text)
//     return (
//       <PlateText
//         {...(element as any)}
//         color={element.color} // Assuming color is stored here
//         backgroundColor={element.backgroundColor}
//       />
//     )
//   switch (element.type) {
//     case 'a': {
//       return (
//         <a href={element.url as string} target="_blank" className="slate-a">
//           {(element.children as TDescendant[])?.map((child, idx) => (
//             <PlateBlock key={idx} element={child} />
//           ))}
//         </a>
//       )
//     }
//     case 'h3': {
//       return (
//         <h3 className="slate-h3">
//           {(element.children as TDescendant[])?.map((child, idx) => (
//             <PlateBlock key={idx} element={child} />
//           ))}
//         </h3>
//       )
//     }
//     case 'h4': {
//       return (
//         <h4 className="slate-h4">
//           {(element.children as TDescendant[])?.map((child, idx) => (
//             <PlateBlock key={idx} element={child} />
//           ))}
//         </h4>
//       )
//     }
//     default: {
//       return (
//         <div>
//           {(element.children as TDescendant[])?.map((child, idx) => (
//             <PlateBlock key={idx} element={child} />
//           ))}
//         </div>
//       )
//     }
//   }
// }
