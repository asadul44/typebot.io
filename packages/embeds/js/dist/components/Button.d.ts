import { JSX } from 'solid-js';
type Props = {
    variant?: 'primary' | 'secondary' | 'guest-bubble' | 'default';
    children: JSX.Element;
    isDisabled?: boolean;
    isLoading?: boolean;
} & JSX.ButtonHTMLAttributes<HTMLButtonElement>;
export declare const Button: (props: Props) => JSX.Element;
export {};
//# sourceMappingURL=Button.d.ts.map