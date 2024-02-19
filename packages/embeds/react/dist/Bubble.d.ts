/// <reference types="react" />
import type { BubbleProps } from '@typebot.io/js';
type Props = BubbleProps;
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'typebot-bubble': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
}
export declare const Bubble: (props: Props) => null;
export {};
//# sourceMappingURL=Bubble.d.ts.map