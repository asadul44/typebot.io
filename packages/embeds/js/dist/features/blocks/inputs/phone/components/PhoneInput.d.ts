import { InputSubmitContent } from '@/types';
import type { PhoneNumberInputOptions } from '@typebot.io/schemas';
type PhoneInputProps = Pick<PhoneNumberInputOptions, 'labels' | 'defaultCountryCode'> & {
    defaultValue?: string;
    onSubmit: (value: InputSubmitContent) => void;
};
export declare const PhoneInput: (props: PhoneInputProps) => import("solid-js").JSX.Element;
export {};
//# sourceMappingURL=PhoneInput.d.ts.map