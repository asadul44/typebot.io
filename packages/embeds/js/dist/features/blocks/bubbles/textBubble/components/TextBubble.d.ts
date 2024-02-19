import type { TextBubbleContent, TypingEmulation } from '@typebot.io/schemas';
type Props = {
    content: TextBubbleContent;
    typingEmulation: TypingEmulation;
    onTransitionEnd: () => void;
};
export declare const showAnimationDuration = 400;
export declare const TextBubble: (props: Props) => import("solid-js").JSX.Element;
export {};
//# sourceMappingURL=TextBubble.d.ts.map