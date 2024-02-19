import { InputSubmitContent } from '@/types';
import type { ChoiceInputBlock } from '@typebot.io/schemas';
type Props = {
    inputIndex: number;
    items: ChoiceInputBlock['items'];
    options: ChoiceInputBlock['options'];
    onSubmit: (value: InputSubmitContent) => void;
};
export declare const MultipleChoicesForm: (props: Props) => import("solid-js").JSX.Element;
export {};
//# sourceMappingURL=MultipleChoicesForm.d.ts.map