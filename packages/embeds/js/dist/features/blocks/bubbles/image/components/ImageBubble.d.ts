import type { ImageBubbleContent } from '@typebot.io/schemas';
type Props = {
    content: ImageBubbleContent;
    onTransitionEnd: () => void;
};
export declare const showAnimationDuration = 400;
export declare const mediaLoadingFallbackTimeout = 5000;
export declare const ImageBubble: (props: Props) => import("solid-js").JSX.Element;
export {};
//# sourceMappingURL=ImageBubble.d.ts.map