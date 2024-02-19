import { PublicTypebot, Edge, AnswerInput, VariableWithValue, Variable } from '@typebot.io/schemas';
import { Log } from '@typebot.io/prisma';

type TypebotViewerProps = {
    typebot: Omit<PublicTypebot, 'updatedAt' | 'createdAt'>;
    isPreview?: boolean;
    apiHost?: string;
    predefinedVariables?: {
        [key: string]: string | undefined;
    };
    resultId?: string;
    startGroupId?: string;
    isLoading?: boolean;
    onNewGroupVisible?: (edge: Edge) => void;
    onNewAnswer?: (answer: AnswerInput & {
        uploadedFiles: boolean;
    }) => Promise<void>;
    onNewLog?: (log: Omit<Log, 'id' | 'createdAt' | 'resultId'>) => void;
    onCompleted?: () => void;
    onVariablesUpdated?: (variables: VariableWithValue[]) => void;
};
declare const TypebotViewer: ({ typebot, apiHost, isPreview, isLoading, resultId, startGroupId, predefinedVariables, onNewLog, onNewGroupVisible, onNewAnswer, onCompleted, onVariablesUpdated, }: TypebotViewerProps) => JSX.Element;

declare const parseVariables: (variables: Variable[], options?: {
    fieldToParse?: 'value' | 'id';
    escapeForJson?: boolean;
}) => (text: string | undefined) => string;

export { TypebotViewer, TypebotViewerProps, parseVariables };
