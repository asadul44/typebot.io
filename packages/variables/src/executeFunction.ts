import { stringifyError } from "@typebot.io/lib/stringifyError";
import { isDefined } from "@typebot.io/lib/utils";
import { Reference } from "isolated-vm";
import { parseTransferrableValue } from "./codeRunners";
import { extractVariablesFromText } from "./extractVariablesFromText";
import { getOrCreateIsolate } from "./getOrCreateIsolate";
import { parseGuessedValueType } from "./parseGuessedValueType";
import { parseVariables } from "./parseVariables";
import type { Variable } from "./schemas";

const defaultTimeout = 10 * 1000;

type Props = {
  variables: Variable[];
  body: string;
  args?: Record<string, unknown>;
};

export const executeFunction = async ({
  variables,
  body,
  args: initialArgs,
}: Props) => {
  const parsedBody = parseVariables(variables, {
    fieldToParse: "id",
  })(body);

  const args = (
    extractVariablesFromText(variables)(body).map((variable) => ({
      id: variable.id,
      value: parseGuessedValueType(variable.value),
    })) as { id: string; value: unknown }[]
  ).concat(
    initialArgs
      ? Object.entries(initialArgs).map(([id, value]) => ({ id, value }))
      : [],
  );

  const variableUpdates = new Map<string, unknown>();

  const setVariable = (key: string, value: any) => {
    variableUpdates.set(key, value);
  };

  const isolate = getOrCreateIsolate();
  const context = isolate.createContextSync();
  const jail = context.global;
  jail.setSync("global", jail.derefInto());
  context.evalClosure(
    "globalThis.setVariable = (...args) => $0.apply(undefined, args, { arguments: { copy: true }, promise: true, result: { copy: true, promise: true } })",
    [new Reference(setVariable)],
  );
  context.evalClosure(
    "globalThis.fetch = (...args) => $0.apply(undefined, args, { arguments: { copy: true }, promise: true, result: { copy: true, promise: true } })",
    [
      new Reference(async (...args: any[]) => {
        // @ts-ignore
        const response = await fetch(...args);
        return response.text();
      }),
    ],
  );

  args.forEach(({ id, value }) => {
    jail.setSync(id, parseTransferrableValue(value));
  });
  const run = (code: string) =>
    context.evalClosure(
      `return (async function() {
		const AsyncFunction = async function () {}.constructor;
		return new AsyncFunction($0)();
	}())`,
      [code],
      { result: { copy: true, promise: true }, timeout: defaultTimeout },
    );

  try {
    const output: unknown = await run(parsedBody);
    context.release();
    return {
      output,
      newVariables: Array.from(variableUpdates.entries())
        .map(([name, value]) => {
          const existingVariable = variables.find((v) => v.name === name);
          if (!existingVariable) return;
          return {
            id: existingVariable.id,
            name: existingVariable.name,
            value,
          };
        })
        .filter(isDefined),
    };
  } catch (e) {
    context.release();
    console.log("Error while executing script");
    console.error(e);

    const error = stringifyError(e);

    return {
      error,
      output: error,
    };
  }
};
