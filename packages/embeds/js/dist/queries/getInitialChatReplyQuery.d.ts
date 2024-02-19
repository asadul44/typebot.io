import { InitialChatReply } from '@/types';
import type { StartParams } from '@typebot.io/schemas';
export declare function getInitialChatReplyQuery({ typebot, isPreview, apiHost, prefilledVariables, startGroupId, resultId, }: StartParams & {
    apiHost?: string;
}): Promise<{
    data?: InitialChatReply | undefined;
    error?: Error | undefined;
}>;
//# sourceMappingURL=getInitialChatReplyQuery.d.ts.map