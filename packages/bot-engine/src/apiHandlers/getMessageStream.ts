import { isForgedBlockType } from "@typebot.io/blocks-core/helpers";
import { IntegrationBlockType } from "@typebot.io/blocks-integrations/constants";
import type { ChatCompletionOpenAIOptions } from "@typebot.io/blocks-integrations/openai/schema";
import { forgedBlocks } from "@typebot.io/forge-repository/definitions";
import type { AsyncVariableStore } from "@typebot.io/forge/types";
import { getBlockById } from "@typebot.io/groups/helpers";
import { decryptV2 } from "@typebot.io/lib/api/encryption/decryptV2";
import { isDefined } from "@typebot.io/lib/utils";
import { deepParseVariables } from "@typebot.io/variables/deepParseVariables";
import {
  type ParseVariablesOptions,
  parseVariables,
} from "@typebot.io/variables/parseVariables";
import { OpenAI } from "openai";
import { getCredentials } from "../queries/getCredentials";
import { getSession } from "../queries/getSession";
import { saveSetVariableHistoryItems } from "../queries/saveSetVariableHistoryItems";
import { updateSession } from "../queries/updateSession";
import type { SessionState } from "../schemas/chatSession";
import { updateVariablesInSession } from "../updateVariablesInSession";
import { getOpenAIChatCompletionStream } from "./legacy/getOpenAIChatCompletionStream";

type Props = {
  sessionId: string;
  messages: OpenAI.Chat.ChatCompletionMessage[] | undefined;
};

export const getMessageStream = async ({
  sessionId,
  messages,
}: Props): Promise<{
  stream?: ReadableStream<any>;
  status?: number;
  message?: string;
}> => {
  const session = await getSession(sessionId);

  if (!session?.state)
    return { status: 404, message: "Could not find session" };

  let newSessionState: SessionState = session.state;

  if (!newSessionState.currentBlockId)
    return { status: 404, message: "Could not find current block" };

  const { group, block } = getBlockById(
    newSessionState.currentBlockId,
    newSessionState.typebotsQueue[0].typebot.groups,
  );
  if (!block || !group)
    return {
      status: 404,
      message: "Could not find block or group",
    };

  if (!("options" in block))
    return {
      status: 400,
      message: "This block does not have options",
    };

  if (block.type === IntegrationBlockType.OPEN_AI && messages) {
    try {
      const stream = await getOpenAIChatCompletionStream(
        newSessionState,
        block.options as ChatCompletionOpenAIOptions,
        messages,
      );
      if (!stream)
        return {
          status: 500,
          message: "Could not create stream",
        };

      return { stream };
    } catch (error) {
      if (error instanceof OpenAI.APIError) {
        const { message } = error;
        return {
          status: 500,
          message,
        };
      } else {
        throw error;
      }
    }
  }
  if (!isForgedBlockType(block.type))
    return {
      status: 400,
      message: "This block does not have a stream function",
    };

  const blockDef = forgedBlocks[block.type];
  const action = blockDef?.actions.find(
    (a) => a.name === block.options?.action,
  );

  if (!action || !action.run?.stream)
    return {
      status: 400,
      message: "This block does not have a stream function",
    };

  try {
    if (!block.options.credentialsId)
      return { status: 404, message: "Could not find credentials" };
    const credentials = await getCredentials(block.options.credentialsId);
    if (!credentials)
      return { status: 404, message: "Could not find credentials" };
    const decryptedCredentials = await decryptV2(
      credentials.data,
      credentials.iv,
    );

    const variables: AsyncVariableStore = {
      list: () => newSessionState.typebotsQueue[0].typebot.variables,
      get: (id: string) => {
        const variable =
          newSessionState.typebotsQueue[0].typebot.variables.find(
            (variable) => variable.id === id,
          );
        return variable?.value;
      },
      parse: (text: string, params?: ParseVariablesOptions) =>
        parseVariables(
          newSessionState.typebotsQueue[0].typebot.variables,
          params,
        )(text),
      set: async (variables) => {
        const newVariables = variables
          .map((variable) => {
            const existingVariable =
              newSessionState.typebotsQueue[0].typebot.variables.find(
                (v) => variable.id === v.id,
              );
            if (!existingVariable) return;
            return {
              ...existingVariable,
              value: variable.value,
            };
          })
          .filter(isDefined);
        if (newVariables.length === 0) return;
        const { updatedState, newSetVariableHistory } =
          updateVariablesInSession({
            newVariables,
            state: newSessionState,
            currentBlockId: newSessionState.currentBlockId,
          });
        newSessionState = updatedState;
        if (
          newSetVariableHistory.length > 0 &&
          newSessionState.typebotsQueue[0].resultId
        )
          await saveSetVariableHistoryItems(newSetVariableHistory);
        await updateSession({
          id: session.id,
          state: updatedState,
          isReplying: undefined,
        });
      },
    };
    const { stream, httpError } = await action.run.stream.run({
      credentials: decryptedCredentials,
      options: deepParseVariables(
        newSessionState.typebotsQueue[0].typebot.variables,
      )(block.options),
      variables,
    });
    if (httpError) return httpError;

    if (!stream) return { status: 500, message: "Could not create stream" };

    return { stream };
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      const { message } = error;
      return {
        status: 500,
        message,
      };
    }
    return {
      status: 500,
      message: "Could not create stream",
    };
  }
};