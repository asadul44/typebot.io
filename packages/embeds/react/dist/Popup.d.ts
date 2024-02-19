/// <reference types="react" />
import type { PopupProps } from '@typebot.io/js';
type Props = PopupProps;
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'typebot-popup': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                class?: string;
            };
        }
    }
}
export declare const Popup: (props: Props) => null;
export {};
//# sourceMappingURL=Popup.d.ts.map