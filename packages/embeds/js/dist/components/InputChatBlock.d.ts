import type { ChatReply, ChoiceInputBlock, Theme } from '@typebot.io/schemas';
import { BotContext } from '@/types';
type Props = {
    block: NonNullable<ChatReply['input']>;
    hasHostAvatar: boolean;
    guestAvatar?: Theme['chat']['guestAvatar'];
    inputIndex: number;
    context: BotContext;
    isInputPrefillEnabled: boolean;
    hasError: boolean;
    onSubmit: (answer: string, currentBlockId?: string) => void;
    onSkip: () => void;
    option: ChoiceInputBlock['options'];
};
export declare const InputChatBlock: (props: Props) => import("solid-js").JSX.Element;
export {};
//# sourceMappingURL=InputChatBlock.d.ts.map