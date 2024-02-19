import { ButtonTheme, PreviewMessageParams, PreviewMessageTheme } from '../types';
export type PreviewMessageProps = Pick<PreviewMessageParams, 'avatarUrl' | 'message'> & {
    buttonSize: ButtonTheme['size'];
    previewMessageTheme?: PreviewMessageTheme;
    onClick: () => void;
    onCloseClick: () => void;
};
export declare const PreviewMessage: (props: PreviewMessageProps) => import("solid-js").JSX.Element;
//# sourceMappingURL=PreviewMessage.d.ts.map