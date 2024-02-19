import { BotContext, InitialChatReply, OutgoingLog } from '@/types';
type Props = {
    initialChatReply: InitialChatReply;
    context: BotContext;
    onNewInputBlock?: (ids: {
        id: string;
        groupId: string;
    }) => void;
    onAnswer?: (answer: {
        message: string;
        blockId: string;
    }) => void;
    onEnd?: () => void;
    onNewLogs?: (logs: OutgoingLog[]) => void;
};
export declare const ConversationContainer: (props: Props) => import("solid-js").JSX.Element;
export {};
//# sourceMappingURL=ConversationContainer.d.ts.map