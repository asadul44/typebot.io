import type { SendMessageInput } from '@typebot.io/schemas';
export declare const sendMessageQuery: ({ apiHost, ...body }: {
    message?: string | undefined;
    sessionId?: string | undefined;
    startParams?: {
        typebot: (string | {
            variables: {
                id: string;
                name: string;
                value?: string | (string | null)[] | null | undefined;
            }[];
            id: string;
            theme: {
                general: {
                    font: string;
                    background: {
                        type: import("@typebot.io/schemas").BackgroundType;
                        content?: string | undefined;
                    };
                };
                chat: {
                    hostBubbles: {
                        backgroundColor: string;
                        color: string;
                    };
                    guestBubbles: {
                        backgroundColor: string;
                        color: string;
                    };
                    buttons: {
                        backgroundColor: string;
                        color: string;
                    };
                    inputs: {
                        backgroundColor: string;
                        color: string;
                        placeholderColor: string;
                    };
                    hostAvatar?: {
                        isEnabled: boolean;
                        url?: string | undefined;
                    } | undefined;
                    guestAvatar?: {
                        isEnabled: boolean;
                        url?: string | undefined;
                    } | undefined;
                    roundness?: "medium" | "large" | "none" | undefined;
                };
                customCss?: string | undefined;
            };
            groups: {
                id: string;
                title: string;
                graphCoordinates: {
                    x: number;
                    y: number;
                };
                blocks: ({
                    id: string;
                    groupId: string;
                    type: import("@typebot.io/schemas").BubbleBlockType.AUDIO;
                    content: {
                        url?: string | undefined;
                    };
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    type: import("@typebot.io/schemas").BubbleBlockType.EMBED;
                    content: {
                        height: number | `{{${string}}}`;
                        url?: string | undefined;
                    };
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    type: import("@typebot.io/schemas").BubbleBlockType.IMAGE;
                    content: {
                        url?: string | undefined;
                        clickLink?: {
                            url?: string | undefined;
                            alt?: string | undefined;
                        } | undefined;
                    };
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    type: import("@typebot.io/schemas").BubbleBlockType.TEXT;
                    content: {
                        richText: any[];
                        html?: string | undefined;
                        plainText?: string | undefined;
                    };
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    type: import("@typebot.io/schemas").BubbleBlockType.VIDEO;
                    content: {
                        url?: string | undefined;
                        id?: string | undefined;
                        type?: import("@typebot.io/schemas").VideoBubbleContentType | undefined;
                    };
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    options: {
                        isMultipleChoice: boolean;
                        buttonLabel: string;
                        variableId?: string | undefined;
                        dynamicVariableId?: string | undefined;
                        isSearchable?: boolean | undefined;
                    };
                    type: import("@typebot.io/schemas").InputBlockType.CHOICE;
                    items: {
                        id: string;
                        type: import("@typebot.io/schemas").ItemType.BUTTON;
                        blockId: string;
                        outgoingEdgeId?: string | undefined;
                        content?: string | undefined;
                    }[];
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    options: {
                        labels: {
                            button: string;
                            from: string;
                            to: string;
                        };
                        hasTime: boolean;
                        isRange: boolean;
                        variableId?: string | undefined;
                    };
                    type: import("@typebot.io/schemas").InputBlockType.DATE;
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    options: {
                        labels: {
                            button: string;
                            placeholder: string;
                        };
                        isLong: boolean;
                        variableId?: string | undefined;
                    };
                    type: import("@typebot.io/schemas").InputBlockType.TEXT;
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    options: {
                        labels: {
                            button: string;
                            placeholder: string;
                        };
                        retryMessageContent: string;
                        variableId?: string | undefined;
                    };
                    type: import("@typebot.io/schemas").InputBlockType.EMAIL;
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    options: {
                        labels: {
                            button: string;
                            placeholder: string;
                            clear?: string | undefined;
                            skip?: string | undefined;
                        };
                        isMultipleAllowed: boolean;
                        variableId?: string | undefined;
                        isRequired?: boolean | undefined;
                        sizeLimit?: number | undefined;
                    };
                    type: import("@typebot.io/schemas").InputBlockType.FILE;
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    options: {
                        labels: {
                            button: string;
                            placeholder: string;
                        };
                        variableId?: string | undefined;
                        min?: number | undefined;
                        max?: number | undefined;
                        step?: number | undefined;
                    };
                    type: import("@typebot.io/schemas").InputBlockType.NUMBER;
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    options: {
                        labels: {
                            button: string;
                            success?: string | undefined;
                        };
                        provider: import("@typebot.io/schemas").PaymentProvider;
                        currency: string;
                        variableId?: string | undefined;
                        additionalInformation?: {
                            description?: string | undefined;
                            name?: string | undefined;
                            email?: string | undefined;
                            phoneNumber?: string | undefined;
                        } | undefined;
                        credentialsId?: string | undefined;
                        amount?: string | undefined;
                    };
                    type: import("@typebot.io/schemas").InputBlockType.PAYMENT;
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    options: {
                        labels: {
                            button: string;
                            placeholder: string;
                        };
                        retryMessageContent: string;
                        variableId?: string | undefined;
                        defaultCountryCode?: string | undefined;
                    };
                    type: import("@typebot.io/schemas").InputBlockType.PHONE;
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    options: {
                        length: number;
                        labels: {
                            button: string;
                            left?: string | undefined;
                            right?: string | undefined;
                        };
                        buttonType: "Icons" | "Numbers";
                        customIcon: {
                            isEnabled: boolean;
                            svg?: string | undefined;
                        };
                        variableId?: string | undefined;
                        isOneClickSubmitEnabled?: boolean | undefined;
                    };
                    type: import("@typebot.io/schemas").InputBlockType.RATING;
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    options: {
                        labels: {
                            button: string;
                            placeholder: string;
                        };
                        retryMessageContent: string;
                        variableId?: string | undefined;
                    };
                    type: import("@typebot.io/schemas").InputBlockType.URL;
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    type: import("@typebot.io/schemas").LogicBlockType.CONDITION;
                    items: {
                        id: string;
                        type: import("@typebot.io/schemas").ItemType.CONDITION;
                        content: {
                            logicalOperator: import("@typebot.io/schemas").LogicalOperator;
                            comparisons: {
                                id: string;
                                variableId?: string | undefined;
                                comparisonOperator?: import("@typebot.io/schemas").ComparisonOperators | undefined;
                                value?: string | undefined;
                            }[];
                        };
                        blockId: string;
                        outgoingEdgeId?: string | undefined;
                    }[];
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    options: {
                        variablesForTest: {
                            id: string;
                            variableId?: string | undefined;
                            value?: string | undefined;
                        }[];
                        responseVariableMapping: {
                            id: string;
                            variableId?: string | undefined;
                            bodyPath?: string | undefined;
                        }[];
                        isAdvancedConfig?: boolean | undefined;
                        isCustomBody?: boolean | undefined;
                    };
                    type: import("@typebot.io/schemas").IntegrationBlockType.WEBHOOK;
                    webhookId: string;
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    options: {
                        name: string;
                        content?: string | undefined;
                        shouldExecuteInParentContext?: boolean | undefined;
                    };
                    type: import("@typebot.io/schemas").LogicBlockType.SCRIPT;
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    options: {
                        isNewTab: boolean;
                        url?: string | undefined;
                    };
                    type: import("@typebot.io/schemas").LogicBlockType.REDIRECT;
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    options: {
                        variableId?: string | undefined;
                        expressionToEvaluate?: string | undefined;
                        isCode?: boolean | undefined;
                        isExecutedOnClient?: boolean | undefined;
                    };
                    type: import("@typebot.io/schemas").LogicBlockType.SET_VARIABLE;
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    options: {
                        typebotId?: string | undefined;
                        groupId?: string | undefined;
                    };
                    type: import("@typebot.io/schemas").LogicBlockType.TYPEBOT_LINK;
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    options: {
                        secondsToWaitFor?: string | undefined;
                    };
                    type: import("@typebot.io/schemas").LogicBlockType.WAIT;
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    options: {
                        aPercent: number;
                    };
                    type: import("@typebot.io/schemas").LogicBlockType.AB_TEST;
                    items: [{
                        id: string;
                        path: "a";
                        type: import("@typebot.io/schemas").ItemType.AB_TEST;
                        blockId: string;
                        outgoingEdgeId?: string | undefined;
                    }, {
                        id: string;
                        path: "b";
                        type: import("@typebot.io/schemas").ItemType.AB_TEST;
                        blockId: string;
                        outgoingEdgeId?: string | undefined;
                    }];
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    type: "start";
                    label: string;
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    options: {
                        task?: undefined;
                        credentialsId?: string | undefined;
                    } | {
                        task: "Create chat completion";
                        model: "gpt-4" | "gpt-4-0314" | "gpt-4-32k" | "gpt-4-32k-0314" | "gpt-3.5-turbo" | "gpt-3.5-turbo-0301";
                        messages: ({
                            id: string;
                            role?: "user" | "system" | "assistant" | undefined;
                            content?: string | undefined;
                        } | {
                            id: string;
                            role: "Messages sequence ✨";
                            content?: {
                                assistantMessagesVariableId?: string | undefined;
                                userMessagesVariableId?: string | undefined;
                            } | undefined;
                        })[];
                        responseMapping: {
                            id: string;
                            valueToExtract: "Message content" | "Total tokens";
                            variableId?: string | undefined;
                        }[];
                        advancedSettings?: {
                            temperature?: number | `{{${string}}}` | undefined;
                        } | undefined;
                        credentialsId?: string | undefined;
                    } | {
                        task: "Create image";
                        responseMapping: {
                            id: string;
                            valueToExtract: "Image URL";
                            variableId?: string | undefined;
                        }[];
                        advancedOptions: {
                            size?: "256x256" | "512x512" | "1024x1024" | undefined;
                        };
                        prompt?: string | undefined;
                        credentialsId?: string | undefined;
                    };
                    type: import("@typebot.io/schemas").IntegrationBlockType.OPEN_AI;
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    options: {
                        groupId?: string | undefined;
                        blockId?: string | undefined;
                    };
                    type: import("@typebot.io/schemas").LogicBlockType.JUMP;
                    outgoingEdgeId?: string | undefined;
                })[];
            }[];
            edges: {
                id: string;
                from: {
                    groupId: string;
                    blockId: string;
                    itemId?: string | undefined;
                };
                to: {
                    groupId: string;
                    blockId?: string | undefined;
                };
            }[];
            settings: {
                general: {
                    isBrandingEnabled: boolean;
                    isTypingEmulationEnabled?: boolean | undefined;
                    isInputPrefillEnabled?: boolean | undefined;
                    isHideQueryParamsEnabled?: boolean | undefined;
                    isNewResultOnRefreshEnabled?: boolean | undefined;
                };
                typingEmulation: {
                    enabled: boolean;
                    speed: number;
                    maxDelay: number;
                };
                metadata: {
                    title?: string | undefined;
                    description?: string | undefined;
                    imageUrl?: string | undefined;
                    favIconUrl?: string | undefined;
                    customHeadCode?: string | undefined;
                    googleTagManagerId?: string | undefined;
                };
            };
        }) & (string | {
            variables: {
                id: string;
                name: string;
                value?: string | (string | null)[] | null | undefined;
            }[];
            id: string;
            theme: {
                general: {
                    font: string;
                    background: {
                        type: import("@typebot.io/schemas").BackgroundType;
                        content?: string | undefined;
                    };
                };
                chat: {
                    hostBubbles: {
                        backgroundColor: string;
                        color: string;
                    };
                    guestBubbles: {
                        backgroundColor: string;
                        color: string;
                    };
                    buttons: {
                        backgroundColor: string;
                        color: string;
                    };
                    inputs: {
                        backgroundColor: string;
                        color: string;
                        placeholderColor: string;
                    };
                    hostAvatar?: {
                        isEnabled: boolean;
                        url?: string | undefined;
                    } | undefined;
                    guestAvatar?: {
                        isEnabled: boolean;
                        url?: string | undefined;
                    } | undefined;
                    roundness?: "medium" | "large" | "none" | undefined;
                };
                customCss?: string | undefined;
            };
            groups: {
                id: string;
                title: string;
                graphCoordinates: {
                    x: number;
                    y: number;
                };
                blocks: ({
                    id: string;
                    groupId: string;
                    type: import("@typebot.io/schemas").BubbleBlockType.AUDIO;
                    content: {
                        url?: string | undefined;
                    };
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    type: import("@typebot.io/schemas").BubbleBlockType.EMBED;
                    content: {
                        height: number | `{{${string}}}`;
                        url?: string | undefined;
                    };
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    type: import("@typebot.io/schemas").BubbleBlockType.IMAGE;
                    content: {
                        url?: string | undefined;
                        clickLink?: {
                            url?: string | undefined;
                            alt?: string | undefined;
                        } | undefined;
                    };
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    type: import("@typebot.io/schemas").BubbleBlockType.TEXT;
                    content: {
                        richText: any[];
                        html?: string | undefined;
                        plainText?: string | undefined;
                    };
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    type: import("@typebot.io/schemas").BubbleBlockType.VIDEO;
                    content: {
                        url?: string | undefined;
                        id?: string | undefined;
                        type?: import("@typebot.io/schemas").VideoBubbleContentType | undefined;
                    };
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    options: {
                        isMultipleChoice: boolean;
                        buttonLabel: string;
                        variableId?: string | undefined;
                        dynamicVariableId?: string | undefined;
                        isSearchable?: boolean | undefined;
                    };
                    type: import("@typebot.io/schemas").InputBlockType.CHOICE;
                    items: {
                        id: string;
                        type: import("@typebot.io/schemas").ItemType.BUTTON;
                        blockId: string;
                        outgoingEdgeId?: string | undefined;
                        content?: string | undefined;
                    }[];
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    options: {
                        labels: {
                            button: string;
                            from: string;
                            to: string;
                        };
                        hasTime: boolean;
                        isRange: boolean;
                        variableId?: string | undefined;
                    };
                    type: import("@typebot.io/schemas").InputBlockType.DATE;
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    options: {
                        labels: {
                            button: string;
                            placeholder: string;
                        };
                        isLong: boolean;
                        variableId?: string | undefined;
                    };
                    type: import("@typebot.io/schemas").InputBlockType.TEXT;
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    options: {
                        labels: {
                            button: string;
                            placeholder: string;
                        };
                        retryMessageContent: string;
                        variableId?: string | undefined;
                    };
                    type: import("@typebot.io/schemas").InputBlockType.EMAIL;
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    options: {
                        labels: {
                            button: string;
                            placeholder: string;
                            clear?: string | undefined;
                            skip?: string | undefined;
                        };
                        isMultipleAllowed: boolean;
                        variableId?: string | undefined;
                        isRequired?: boolean | undefined;
                        sizeLimit?: number | undefined;
                    };
                    type: import("@typebot.io/schemas").InputBlockType.FILE;
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    options: {
                        labels: {
                            button: string;
                            placeholder: string;
                        };
                        variableId?: string | undefined;
                        min?: number | undefined;
                        max?: number | undefined;
                        step?: number | undefined;
                    };
                    type: import("@typebot.io/schemas").InputBlockType.NUMBER;
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    options: {
                        labels: {
                            button: string;
                            success?: string | undefined;
                        };
                        provider: import("@typebot.io/schemas").PaymentProvider;
                        currency: string;
                        variableId?: string | undefined;
                        additionalInformation?: {
                            description?: string | undefined;
                            name?: string | undefined;
                            email?: string | undefined;
                            phoneNumber?: string | undefined;
                        } | undefined;
                        credentialsId?: string | undefined;
                        amount?: string | undefined;
                    };
                    type: import("@typebot.io/schemas").InputBlockType.PAYMENT;
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    options: {
                        labels: {
                            button: string;
                            placeholder: string;
                        };
                        retryMessageContent: string;
                        variableId?: string | undefined;
                        defaultCountryCode?: string | undefined;
                    };
                    type: import("@typebot.io/schemas").InputBlockType.PHONE;
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    options: {
                        length: number;
                        labels: {
                            button: string;
                            left?: string | undefined;
                            right?: string | undefined;
                        };
                        buttonType: "Icons" | "Numbers";
                        customIcon: {
                            isEnabled: boolean;
                            svg?: string | undefined;
                        };
                        variableId?: string | undefined;
                        isOneClickSubmitEnabled?: boolean | undefined;
                    };
                    type: import("@typebot.io/schemas").InputBlockType.RATING;
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    options: {
                        labels: {
                            button: string;
                            placeholder: string;
                        };
                        retryMessageContent: string;
                        variableId?: string | undefined;
                    };
                    type: import("@typebot.io/schemas").InputBlockType.URL;
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    type: import("@typebot.io/schemas").LogicBlockType.CONDITION;
                    items: {
                        id: string;
                        type: import("@typebot.io/schemas").ItemType.CONDITION;
                        content: {
                            logicalOperator: import("@typebot.io/schemas").LogicalOperator;
                            comparisons: {
                                id: string;
                                variableId?: string | undefined;
                                comparisonOperator?: import("@typebot.io/schemas").ComparisonOperators | undefined;
                                value?: string | undefined;
                            }[];
                        };
                        blockId: string;
                        outgoingEdgeId?: string | undefined;
                    }[];
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    options: {
                        variablesForTest: {
                            id: string;
                            variableId?: string | undefined;
                            value?: string | undefined;
                        }[];
                        responseVariableMapping: {
                            id: string;
                            variableId?: string | undefined;
                            bodyPath?: string | undefined;
                        }[];
                        isAdvancedConfig?: boolean | undefined;
                        isCustomBody?: boolean | undefined;
                    };
                    type: import("@typebot.io/schemas").IntegrationBlockType.WEBHOOK;
                    webhookId: string;
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    options: {
                        name: string;
                        content?: string | undefined;
                        shouldExecuteInParentContext?: boolean | undefined;
                    };
                    type: import("@typebot.io/schemas").LogicBlockType.SCRIPT;
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    options: {
                        isNewTab: boolean;
                        url?: string | undefined;
                    };
                    type: import("@typebot.io/schemas").LogicBlockType.REDIRECT;
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    options: {
                        variableId?: string | undefined;
                        expressionToEvaluate?: string | undefined;
                        isCode?: boolean | undefined;
                        isExecutedOnClient?: boolean | undefined;
                    };
                    type: import("@typebot.io/schemas").LogicBlockType.SET_VARIABLE;
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    options: {
                        typebotId?: string | undefined;
                        groupId?: string | undefined;
                    };
                    type: import("@typebot.io/schemas").LogicBlockType.TYPEBOT_LINK;
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    options: {
                        secondsToWaitFor?: string | undefined;
                    };
                    type: import("@typebot.io/schemas").LogicBlockType.WAIT;
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    options: {
                        aPercent: number;
                    };
                    type: import("@typebot.io/schemas").LogicBlockType.AB_TEST;
                    items: [{
                        id: string;
                        path: "a";
                        type: import("@typebot.io/schemas").ItemType.AB_TEST;
                        blockId: string;
                        outgoingEdgeId?: string | undefined;
                    }, {
                        id: string;
                        path: "b";
                        type: import("@typebot.io/schemas").ItemType.AB_TEST;
                        blockId: string;
                        outgoingEdgeId?: string | undefined;
                    }];
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    type: "start";
                    label: string;
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    options: {
                        task?: undefined;
                        credentialsId?: string | undefined;
                    } | {
                        task: "Create chat completion";
                        model: "gpt-4" | "gpt-4-0314" | "gpt-4-32k" | "gpt-4-32k-0314" | "gpt-3.5-turbo" | "gpt-3.5-turbo-0301";
                        messages: ({
                            id: string;
                            role?: "user" | "system" | "assistant" | undefined;
                            content?: string | undefined;
                        } | {
                            id: string;
                            role: "Messages sequence ✨";
                            content?: {
                                assistantMessagesVariableId?: string | undefined;
                                userMessagesVariableId?: string | undefined;
                            } | undefined;
                        })[];
                        responseMapping: {
                            id: string;
                            valueToExtract: "Message content" | "Total tokens";
                            variableId?: string | undefined;
                        }[];
                        advancedSettings?: {
                            temperature?: number | `{{${string}}}` | undefined;
                        } | undefined;
                        credentialsId?: string | undefined;
                    } | {
                        task: "Create image";
                        responseMapping: {
                            id: string;
                            valueToExtract: "Image URL";
                            variableId?: string | undefined;
                        }[];
                        advancedOptions: {
                            size?: "256x256" | "512x512" | "1024x1024" | undefined;
                        };
                        prompt?: string | undefined;
                        credentialsId?: string | undefined;
                    };
                    type: import("@typebot.io/schemas").IntegrationBlockType.OPEN_AI;
                    outgoingEdgeId?: string | undefined;
                } | {
                    id: string;
                    groupId: string;
                    options: {
                        groupId?: string | undefined;
                        blockId?: string | undefined;
                    };
                    type: import("@typebot.io/schemas").LogicBlockType.JUMP;
                    outgoingEdgeId?: string | undefined;
                })[];
            }[];
            edges: {
                id: string;
                from: {
                    groupId: string;
                    blockId: string;
                    itemId?: string | undefined;
                };
                to: {
                    groupId: string;
                    blockId?: string | undefined;
                };
            }[];
            settings: {
                general: {
                    isBrandingEnabled: boolean;
                    isTypingEmulationEnabled?: boolean | undefined;
                    isInputPrefillEnabled?: boolean | undefined;
                    isHideQueryParamsEnabled?: boolean | undefined;
                    isNewResultOnRefreshEnabled?: boolean | undefined;
                };
                typingEmulation: {
                    enabled: boolean;
                    speed: number;
                    maxDelay: number;
                };
                metadata: {
                    title?: string | undefined;
                    description?: string | undefined;
                    imageUrl?: string | undefined;
                    favIconUrl?: string | undefined;
                    customHeadCode?: string | undefined;
                    googleTagManagerId?: string | undefined;
                };
            };
        } | undefined);
        isPreview?: boolean | undefined;
        resultId?: string | undefined;
        startGroupId?: string | undefined;
        prefilledVariables?: Record<string, unknown> | undefined;
    } | undefined;
    choiceInputId?: string | undefined;
} & {
    apiHost?: string | undefined;
}) => Promise<{
    data?: {
        messages: ({
            id: string;
        } & ({
            type: import("@typebot.io/schemas").BubbleBlockType.TEXT;
            content: {
                richText: any[];
                html?: string | undefined;
                plainText?: string | undefined;
            };
        } | {
            type: import("@typebot.io/schemas").BubbleBlockType.IMAGE;
            content: {
                url?: string | undefined;
                clickLink?: {
                    url?: string | undefined;
                    alt?: string | undefined;
                } | undefined;
            };
        } | {
            type: import("@typebot.io/schemas").BubbleBlockType.VIDEO;
            content: {
                url?: string | undefined;
                id?: string | undefined;
                type?: import("@typebot.io/schemas").VideoBubbleContentType | undefined;
            };
        } | {
            type: import("@typebot.io/schemas").BubbleBlockType.AUDIO;
            content: {
                url?: string | undefined;
            };
        } | {
            type: import("@typebot.io/schemas").BubbleBlockType.EMBED;
            content: {
                url?: string | undefined;
                height?: number | undefined;
            };
        }))[];
        input?: (({
            id: string;
            groupId: string;
            options: {
                isMultipleChoice: boolean;
                buttonLabel: string;
                variableId?: string | undefined;
                dynamicVariableId?: string | undefined;
                isSearchable?: boolean | undefined;
            };
            type: import("@typebot.io/schemas").InputBlockType.CHOICE;
            items: {
                id: string;
                type: import("@typebot.io/schemas").ItemType.BUTTON;
                blockId: string;
                outgoingEdgeId?: string | undefined;
                content?: string | undefined;
            }[];
            outgoingEdgeId?: string | undefined;
        } | {
            id: string;
            groupId: string;
            options: {
                labels: {
                    button: string;
                    from: string;
                    to: string;
                };
                hasTime: boolean;
                isRange: boolean;
                variableId?: string | undefined;
            };
            type: import("@typebot.io/schemas").InputBlockType.DATE;
            outgoingEdgeId?: string | undefined;
        } | {
            id: string;
            groupId: string;
            options: {
                labels: {
                    button: string;
                    placeholder: string;
                };
                isLong: boolean;
                variableId?: string | undefined;
            };
            type: import("@typebot.io/schemas").InputBlockType.TEXT;
            outgoingEdgeId?: string | undefined;
        } | {
            id: string;
            groupId: string;
            options: {
                labels: {
                    button: string;
                    placeholder: string;
                };
                retryMessageContent: string;
                variableId?: string | undefined;
            };
            type: import("@typebot.io/schemas").InputBlockType.EMAIL;
            outgoingEdgeId?: string | undefined;
        } | {
            id: string;
            groupId: string;
            options: {
                labels: {
                    button: string;
                    placeholder: string;
                    clear?: string | undefined;
                    skip?: string | undefined;
                };
                isMultipleAllowed: boolean;
                variableId?: string | undefined;
                isRequired?: boolean | undefined;
                sizeLimit?: number | undefined;
            };
            type: import("@typebot.io/schemas").InputBlockType.FILE;
            outgoingEdgeId?: string | undefined;
        } | {
            id: string;
            groupId: string;
            options: {
                labels: {
                    button: string;
                    placeholder: string;
                };
                variableId?: string | undefined;
                min?: number | undefined;
                max?: number | undefined;
                step?: number | undefined;
            };
            type: import("@typebot.io/schemas").InputBlockType.NUMBER;
            outgoingEdgeId?: string | undefined;
        } | {
            id: string;
            groupId: string;
            options: {
                labels: {
                    button: string;
                    success?: string | undefined;
                };
                provider: import("@typebot.io/schemas").PaymentProvider;
                currency: string;
                variableId?: string | undefined;
                additionalInformation?: {
                    description?: string | undefined;
                    name?: string | undefined;
                    email?: string | undefined;
                    phoneNumber?: string | undefined;
                } | undefined;
                credentialsId?: string | undefined;
                amount?: string | undefined;
            };
            type: import("@typebot.io/schemas").InputBlockType.PAYMENT;
            outgoingEdgeId?: string | undefined;
        } | {
            id: string;
            groupId: string;
            options: {
                labels: {
                    button: string;
                    placeholder: string;
                };
                retryMessageContent: string;
                variableId?: string | undefined;
                defaultCountryCode?: string | undefined;
            };
            type: import("@typebot.io/schemas").InputBlockType.PHONE;
            outgoingEdgeId?: string | undefined;
        } | {
            id: string;
            groupId: string;
            options: {
                length: number;
                labels: {
                    button: string;
                    left?: string | undefined;
                    right?: string | undefined;
                };
                buttonType: "Icons" | "Numbers";
                customIcon: {
                    isEnabled: boolean;
                    svg?: string | undefined;
                };
                variableId?: string | undefined;
                isOneClickSubmitEnabled?: boolean | undefined;
            };
            type: import("@typebot.io/schemas").InputBlockType.RATING;
            outgoingEdgeId?: string | undefined;
        } | {
            id: string;
            groupId: string;
            options: {
                labels: {
                    button: string;
                    placeholder: string;
                };
                retryMessageContent: string;
                variableId?: string | undefined;
            };
            type: import("@typebot.io/schemas").InputBlockType.URL;
            outgoingEdgeId?: string | undefined;
        }) & {
            prefilledValue?: string | undefined;
            runtimeOptions?: {
                paymentIntentSecret: string;
                amountLabel: string;
                publicKey: string;
            } | undefined;
        }) | undefined;
        clientSideActions?: ({
            lastBubbleBlockId?: string | undefined;
        } & ({
            scriptToExecute: {
                content: string;
                args: {
                    id: string;
                    value?: string | number | boolean | (string | null)[] | null | undefined;
                }[];
            };
        } | {
            redirect: {
                isNewTab: boolean;
                url?: string | undefined;
            };
        } | {
            chatwoot: {
                scriptToExecute: {
                    content: string;
                    args: {
                        id: string;
                        value?: string | number | boolean | (string | null)[] | null | undefined;
                    }[];
                };
            };
        } | {
            googleAnalytics: {
                trackingId?: string | undefined;
                category?: string | undefined;
                action?: string | undefined;
                label?: string | undefined;
                value?: number | `{{${string}}}` | undefined;
                sendTo?: string | undefined;
            };
        } | {
            wait: {
                secondsToWaitFor: number;
            };
        } | {
            setVariable: {
                scriptToExecute: {
                    content: string;
                    args: {
                        id: string;
                        value?: string | number | boolean | (string | null)[] | null | undefined;
                    }[];
                };
            };
        }))[] | undefined;
        sessionId?: string | undefined;
        typebot?: {
            id: string;
            theme: {
                general: {
                    font: string;
                    background: {
                        type: import("@typebot.io/schemas").BackgroundType;
                        content?: string | undefined;
                    };
                };
                chat: {
                    hostBubbles: {
                        backgroundColor: string;
                        color: string;
                    };
                    guestBubbles: {
                        backgroundColor: string;
                        color: string;
                    };
                    buttons: {
                        backgroundColor: string;
                        color: string;
                    };
                    inputs: {
                        backgroundColor: string;
                        color: string;
                        placeholderColor: string;
                    };
                    hostAvatar?: {
                        isEnabled: boolean;
                        url?: string | undefined;
                    } | undefined;
                    guestAvatar?: {
                        isEnabled: boolean;
                        url?: string | undefined;
                    } | undefined;
                    roundness?: "medium" | "large" | "none" | undefined;
                };
                customCss?: string | undefined;
            };
            settings: {
                general: {
                    isBrandingEnabled: boolean;
                    isTypingEmulationEnabled?: boolean | undefined;
                    isInputPrefillEnabled?: boolean | undefined;
                    isHideQueryParamsEnabled?: boolean | undefined;
                    isNewResultOnRefreshEnabled?: boolean | undefined;
                };
                typingEmulation: {
                    enabled: boolean;
                    speed: number;
                    maxDelay: number;
                };
                metadata: {
                    title?: string | undefined;
                    description?: string | undefined;
                    imageUrl?: string | undefined;
                    favIconUrl?: string | undefined;
                    customHeadCode?: string | undefined;
                    googleTagManagerId?: string | undefined;
                };
            };
        } | undefined;
        resultId?: string | undefined;
        dynamicTheme?: {
            hostAvatarUrl?: string | undefined;
            guestAvatarUrl?: string | undefined;
        } | undefined;
        logs?: {
            status: string;
            description: string;
            details?: unknown;
        }[] | undefined;
        choiceInputId?: string | undefined;
    } | undefined;
    error?: Error | undefined;
}>;
//# sourceMappingURL=sendMessageQuery.d.ts.map