import { BotContext } from '@/types';
import type { ChatReply, Settings, Theme } from '@typebot.io/schemas';
type Props = Pick<ChatReply, 'messages' | 'input'> & {
    theme: Theme;
    settings: Settings;
    inputIndex: number;
    context: BotContext;
    isLoadingBubbleDisplayed: boolean;
    hasError: boolean;
    hideAvatar: boolean;
    onNewBubbleDisplayed: (blockId: string) => Promise<void>;
    onScrollToBottom: () => void;
    onSubmit: (input: string, currentBlockId?: string) => void;
    onSkip: () => void;
    onAllBubblesDisplayed: () => void;
};
export declare const ChatChunk: (props: Props) => import("solid-js").JSX.Element;
export {};
//# sourceMappingURL=ChatChunk.d.ts.map