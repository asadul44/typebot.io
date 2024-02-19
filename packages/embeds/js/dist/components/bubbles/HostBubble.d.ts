import type { ChatMessage, TypingEmulation } from '@typebot.io/schemas';
type Props = {
    message: ChatMessage;
    typingEmulation: TypingEmulation;
    onTransitionEnd: () => void;
};
export declare const HostBubble: (props: Props) => import("solid-js").JSX.Element;
export {};
//# sourceMappingURL=HostBubble.d.ts.map