import { InputSubmitContent } from '@/types';
import type { DateInputOptions } from '@typebot.io/schemas';
type Props = {
    onSubmit: (inputValue: InputSubmitContent) => void;
    options?: DateInputOptions;
    defaultValue?: string;
};
export declare const DateForm: (props: Props) => import("solid-js").JSX.Element;
export {};
//# sourceMappingURL=DateForm.d.ts.map