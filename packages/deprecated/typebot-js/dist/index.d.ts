type IframeParams = {
    url: string;
    backgroundColor?: string;
    hiddenVariables?: {
        [key: string]: string | undefined;
    };
    customDomain?: string;
    loadWhenVisible?: boolean;
} & IframeCallbacks;
type IframeCallbacks = {
    onNewVariableValue?: (v: Variable) => void;
};
type PopupParams = {
    delay?: number;
} & IframeParams;
type PopupActions = {
    open: () => void;
    close: () => void;
};
type BubbleParams = {
    button?: ButtonParams;
    proactiveMessage?: ProactiveMessageParams;
    autoOpenDelay?: number;
} & IframeParams;
type ButtonParams = {
    color?: string;
    iconUrl?: string;
    iconStyle?: string;
    iconColor?: string;
    closeIconColor?: string;
};
type ProactiveMessageParams = {
    avatarUrl?: string;
    textContent: string;
    delay?: number;
    rememberClose?: boolean;
};
type BubbleActions = {
    open: () => void;
    close: () => void;
    openProactiveMessage?: () => void;
};
type Variable = {
    name: string;
    value: string;
};
type TypebotPostMessageData = {
    redirectUrl?: string;
    newVariableValue?: Variable;
    codeToExecute?: string;
    closeChatBubble?: boolean;
};
declare const localStorageKeys: {
    rememberClose: string;
};

declare const initContainer: (containerId: string, iframeParams: IframeParams) => HTMLElement | undefined;

declare const initPopup: (params: PopupParams) => PopupActions;
declare const getPopupActions: (popupElement?: HTMLDivElement) => PopupActions;

declare const initBubble: (params: BubbleParams) => BubbleActions;
declare const getBubbleActions: (bubbleElement?: HTMLDivElement, proactiveMessageElement?: HTMLDivElement) => BubbleActions;

declare const close: () => void;

declare const hideMessage: () => void;

declare const open: () => void;

declare const setHiddenVariables: (hiddenVariables: IframeParams['hiddenVariables']) => void;

declare const showMessage: () => void;

declare const toggle: () => void;

declare const defaultExports: {
    initContainer: (containerId: string, iframeParams: IframeParams) => HTMLElement | undefined;
    initPopup: (params: PopupParams) => PopupActions;
    initBubble: (params: BubbleParams) => BubbleActions;
    getPopupActions: (popupElement?: HTMLDivElement | undefined) => PopupActions;
    getBubbleActions: (bubbleElement?: HTMLDivElement | undefined, proactiveMessageElement?: HTMLDivElement | undefined) => BubbleActions;
    open: () => void;
    close: () => void;
    toggle: () => void;
    showMessage: () => void;
    hideMessage: () => void;
    setHiddenVariables: (hiddenVariables: {
        [key: string]: string | undefined;
    } | undefined) => void;
};

export { BubbleActions, BubbleParams, ButtonParams, IframeCallbacks, IframeParams, PopupActions, PopupParams, ProactiveMessageParams, TypebotPostMessageData, Variable, close, defaultExports as default, getBubbleActions, getPopupActions, hideMessage, initBubble, initContainer, initPopup, localStorageKeys, open, setHiddenVariables, showMessage, toggle };
