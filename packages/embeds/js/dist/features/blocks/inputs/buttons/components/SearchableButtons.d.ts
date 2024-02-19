import { InputSubmitContent } from '@/types';
import type { ChoiceInputBlock } from '@typebot.io/schemas';
type Props = {
    inputIndex: number;
    defaultItems: ChoiceInputBlock['items'];
    onSubmit: (value: InputSubmitContent) => void;
};
export declare const SearchableButtons: (props: Props) => import("solid-js").JSX.Element;
export {};
//# sourceMappingURL=SearchableButtons.d.ts.map