/// <reference types="react" />
import type { BotProps } from '@typebot.io/js';
type Props = BotProps & {
    style?: React.CSSProperties;
    className?: string;
};
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'typebot-standard': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                class?: string;
            };
        }
    }
}
export declare const Standard: ({ style, className, ...assignableProps }: Props) => JSX.Element;
export {};
//# sourceMappingURL=Standard.d.ts.map