import { BotContext } from '@/types';
import type { PaymentInputOptions, RuntimeOptions } from '@typebot.io/schemas';
type Props = {
    context: BotContext;
    options: PaymentInputOptions & RuntimeOptions;
    onSuccess: () => void;
};
export declare const StripePaymentForm: (props: Props) => import("solid-js").JSX.Element;
export {};
//# sourceMappingURL=StripePaymentForm.d.ts.map