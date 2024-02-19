import { OutgoingLog } from '@/types';
export type BotProps = {
    typebot: string | any;
    isPreview?: boolean;
    resultId?: string;
    startGroupId?: string;
    prefilledVariables?: Record<string, unknown>;
    apiHost?: string;
    onNewInputBlock?: (ids: {
        id: string;
        groupId: string;
    }) => void;
    onAnswer?: (answer: {
        message: string;
        blockId: string;
    }) => void;
    onInit?: () => void;
    onEnd?: () => void;
    onNewLogs?: (logs: OutgoingLog[]) => void;
};
export declare const Bot: (props: BotProps & {
    class?: string;
}) => import("solid-js").JSX.Element;
//# sourceMappingURL=Bot.d.ts.map