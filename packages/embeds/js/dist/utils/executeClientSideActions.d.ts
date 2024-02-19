import type { ChatReply } from '@typebot.io/schemas';
export declare const executeClientSideAction: (clientSideAction: NonNullable<ChatReply['clientSideActions']>[0]) => Promise<{
    blockedPopupUrl: string;
} | {
    replyToSend: string | undefined;
} | void>;
//# sourceMappingURL=executeClientSideActions.d.ts.map