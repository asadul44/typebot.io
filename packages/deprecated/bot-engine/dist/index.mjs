var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/components/TypebotViewer.tsx
import { useMemo } from "react";

// ../../schemas/features/blocks/inputs/enums.ts
var InputBlockType = /* @__PURE__ */ ((InputBlockType2) => {
  InputBlockType2["TEXT"] = "text input";
  InputBlockType2["NUMBER"] = "number input";
  InputBlockType2["EMAIL"] = "email input";
  InputBlockType2["URL"] = "url input";
  InputBlockType2["DATE"] = "date input";
  InputBlockType2["PHONE"] = "phone number input";
  InputBlockType2["CHOICE"] = "choice input";
  InputBlockType2["PAYMENT"] = "payment input";
  InputBlockType2["RATING"] = "rating input";
  InputBlockType2["FILE"] = "file input";
  return InputBlockType2;
})(InputBlockType || {});

// ../../schemas/features/blocks/bubbles/enums.ts
var BubbleBlockType = /* @__PURE__ */ ((BubbleBlockType2) => {
  BubbleBlockType2["TEXT"] = "text";
  BubbleBlockType2["IMAGE"] = "image";
  BubbleBlockType2["VIDEO"] = "video";
  BubbleBlockType2["EMBED"] = "embed";
  BubbleBlockType2["AUDIO"] = "audio";
  return BubbleBlockType2;
})(BubbleBlockType || {});

// ../../schemas/features/blocks/logic/enums.ts
var LogicBlockType = /* @__PURE__ */ ((LogicBlockType2) => {
  LogicBlockType2["SET_VARIABLE"] = "Set variable";
  LogicBlockType2["CONDITION"] = "Condition";
  LogicBlockType2["REDIRECT"] = "Redirect";
  LogicBlockType2["SCRIPT"] = "Code";
  LogicBlockType2["TYPEBOT_LINK"] = "Typebot link";
  LogicBlockType2["WAIT"] = "Wait";
  LogicBlockType2["JUMP"] = "Jump";
  LogicBlockType2["AB_TEST"] = "AB test";
  return LogicBlockType2;
})(LogicBlockType || {});

// ../../schemas/features/blocks/integrations/enums.ts
var IntegrationBlockType = /* @__PURE__ */ ((IntegrationBlockType2) => {
  IntegrationBlockType2["OPEN_AI"] = "OpenAI";
  IntegrationBlockType2["WEBHOOK"] = "Webhook";
  return IntegrationBlockType2;
})(IntegrationBlockType || {});

// ../../lib/utils.ts
var sendRequest = (params) => __async(void 0, null, function* () {
  try {
    const url = typeof params === "string" ? params : params.url;
    const response = yield fetch(url, {
      method: typeof params === "string" ? "GET" : params.method,
      mode: "cors",
      headers: typeof params !== "string" && isDefined(params.body) ? {
        "Content-Type": "application/json"
      } : void 0,
      body: typeof params !== "string" && isDefined(params.body) ? JSON.stringify(params.body) : void 0
    });
    const data = yield response.json();
    if (!response.ok)
      throw "error" in data ? data.error : data;
    return { data };
  } catch (e) {
    console.error(e);
    return { error: e };
  }
});
var isDefined = (value) => value !== void 0 && value !== null;
var isNotDefined = (value) => value === void 0 || value === null;
var isEmpty = (value) => value === void 0 || value === null || value === "";
var isNotEmpty = (value) => value !== void 0 && value !== null && value !== "";
var isInputBlock = (block) => Object.values(InputBlockType).includes(block.type);
var isBubbleBlock = (block) => Object.values(BubbleBlockType).includes(block.type);
var isLogicBlock = (block) => Object.values(LogicBlockType).includes(block.type);
var isChoiceInput = (block) => block.type === "choice input" /* CHOICE */;
var isIntegrationBlock = (block) => Object.values(IntegrationBlockType).includes(block.type);
var isBubbleBlockType = (type) => Object.values(BubbleBlockType).includes(type);
var byId = (id) => (obj) => obj.id === id;
var isVariableString = (str) => /^\{\{.*\}\}$/.test(str);
var sanitizeUrl = (url) => url.startsWith("http") || url.startsWith("mailto:") || url.startsWith("tel:") || url.startsWith("sms:") || isVariableString(url) ? url : `https://${url}`;
var uploadFiles = (_0) => __async(void 0, [_0], function* ({
  basePath = "/api",
  files,
  onUploadProgress
}) {
  const urls = [];
  let i = 0;
  for (const { file, path } of files) {
    onUploadProgress && onUploadProgress(i / files.length * 100);
    i += 1;
    const { data } = yield sendRequest(
      `${basePath}/storage/upload-url?filePath=${encodeURIComponent(
        path
      )}&fileType=${file.type}`
    );
    if (!(data == null ? void 0 : data.presignedUrl))
      continue;
    const { url, fields } = data.presignedUrl;
    if (data.hasReachedStorageLimit)
      urls.push(null);
    else {
      const formData = new FormData();
      Object.entries(__spreadProps(__spreadValues({}, fields), { file })).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const upload = yield fetch(url, {
        method: "POST",
        body: formData
      });
      if (!upload.ok)
        continue;
      urls.push(`${url.split("?")[0]}/${path}`);
    }
  }
  return urls;
});
var env = (key = "") => {
  if (typeof window === "undefined")
    return isEmpty(process.env["NEXT_PUBLIC_" + key]) ? void 0 : process.env["NEXT_PUBLIC_" + key];
  if (typeof window !== "undefined" && window.__env)
    return isEmpty(window.__env[key]) ? void 0 : window.__env[key];
};
var getViewerUrl = (props) => {
  var _a2;
  return (props == null ? void 0 : props.returnAll) ? env("VIEWER_URL") : (_a2 = env("VIEWER_URL")) == null ? void 0 : _a2.split(",")[0];
};

// src/features/variables/utils.ts
var parseVariables = (variables, options = {
  fieldToParse: "value",
  escapeForJson: false
}) => (text) => {
  if (!text || text === "")
    return "";
  return text.replace(/\{\{(.*?)\}\}/g, (_, fullVariableString) => {
    const matchedVarName = fullVariableString.replace(/{{|}}/g, "");
    const variable = variables.find((variable2) => {
      return matchedVarName === variable2.name && (options.fieldToParse === "id" || isDefined(variable2.value));
    });
    if (!variable)
      return "";
    if (options.fieldToParse === "id")
      return variable.id;
    const { value } = variable;
    if (options.escapeForJson)
      return typeof value === "string" ? jsonParse(value) : jsonParse(JSON.stringify(value));
    const parsedValue = safeStringify(value);
    if (!parsedValue)
      return "";
    return parsedValue;
  });
};
var safeStringify = (val) => {
  if (isNotDefined(val))
    return null;
  if (typeof val === "string")
    return val;
  try {
    return JSON.stringify(val);
  } catch (e) {
    console.warn("Failed to safely stringify variable value", val);
    return null;
  }
};
var parseCorrectValueType = (value) => {
  if (value === null)
    return null;
  if (value === void 0)
    return void 0;
  if (Array.isArray(value))
    return value;
  if (typeof value === "number")
    return value;
  if (value === "true")
    return true;
  if (value === "false")
    return false;
  if (value === "null")
    return null;
  if (value === "undefined")
    return void 0;
  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
};
var jsonParse = (str) => str.replace(/\n/g, `\\n`).replace(/"/g, `\\"`).replace(/\\[^n"]/g, `\\\\ `);

// src/utils/chat.ts
var getLastChatBlockType = (blocks) => {
  var _a2;
  const displayedBlocks = blocks.filter(
    (s) => isBubbleBlock(s) || isInputBlock(s)
  );
  return (_a2 = displayedBlocks.pop()) == null ? void 0 : _a2.type;
};
var sendEventToParent = (data) => {
  var _a2;
  try {
    (_a2 = window.top) == null ? void 0 : _a2.postMessage(
      __spreadValues({
        from: "typebot"
      }, data),
      "*"
    );
  } catch (error) {
    console.error(error);
  }
};

// src/providers/TypebotProvider.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import { jsx } from "react/jsx-runtime";
var typebotContext = createContext({});
var TypebotProvider = ({
  children,
  typebot,
  apiHost,
  isPreview,
  isLoading,
  onNewLog
}) => {
  const [localTypebot, setLocalTypebot] = useState(typebot);
  const [linkedTypebots, setLinkedTypebots] = useState([]);
  const [currentTypebotId, setCurrentTypebotId] = useState(typebot.typebotId);
  const [linkedBotQueue, setLinkedBotQueue] = useState([]);
  const [parentTypebotIds, setParentTypebotIds] = useState([]);
  useEffect(() => {
    setLocalTypebot((localTypebot2) => __spreadProps(__spreadValues({}, localTypebot2), {
      theme: typebot.theme,
      settings: typebot.settings
    }));
  }, [typebot.theme, typebot.settings]);
  const updateVariableValue = (variableId, value) => {
    var _a2, _b;
    const formattedValue = safeStringify(value);
    sendEventToParent({
      newVariableValue: {
        name: (_b = (_a2 = localTypebot.variables.find((variable2) => variable2.id === variableId)) == null ? void 0 : _a2.name) != null ? _b : "",
        value: formattedValue != null ? formattedValue : ""
      }
    });
    const variable = localTypebot.variables.find((v) => v.id === variableId);
    const otherVariablesWithSameName = localTypebot.variables.filter(
      (v) => v.name === (variable == null ? void 0 : variable.name) && v.id !== variableId
    );
    const variablesToUpdate = [variable, ...otherVariablesWithSameName].filter(
      isDefined
    );
    setLocalTypebot((typebot2) => __spreadProps(__spreadValues({}, typebot2), {
      variables: typebot2.variables.map(
        (variable2) => variablesToUpdate.some(
          (variableToUpdate) => variableToUpdate.id === variable2.id
        ) ? __spreadProps(__spreadValues({}, variable2), { value: formattedValue }) : variable2
      )
    }));
  };
  const createEdge = (edge) => {
    setLocalTypebot((typebot2) => __spreadProps(__spreadValues({}, typebot2), {
      edges: [...typebot2.edges, edge]
    }));
  };
  const injectLinkedTypebot = (typebot2) => {
    const newVariables = fillVariablesWithExistingValues(
      typebot2.variables,
      localTypebot.variables
    );
    const typebotToInject = {
      id: "typebotId" in typebot2 ? typebot2.typebotId : typebot2.id,
      groups: typebot2.groups,
      edges: typebot2.edges,
      variables: newVariables
    };
    setLinkedTypebots((typebots) => [...typebots, typebotToInject]);
    const updatedTypebot = __spreadProps(__spreadValues({}, localTypebot), {
      groups: [...localTypebot.groups, ...typebotToInject.groups],
      variables: [...localTypebot.variables, ...typebotToInject.variables],
      edges: [...localTypebot.edges, ...typebotToInject.edges]
    });
    setLocalTypebot(updatedTypebot);
    return typebotToInject;
  };
  const fillVariablesWithExistingValues = (variables, variablesWithValues) => variables.map((variable) => {
    var _a2;
    const matchedVariable = variablesWithValues.find(
      (variableWithValue) => variableWithValue.name === variable.name
    );
    return __spreadProps(__spreadValues({}, variable), {
      value: (_a2 = matchedVariable == null ? void 0 : matchedVariable.value) != null ? _a2 : variable.value
    });
  });
  const pushParentTypebotId = (typebotId) => {
    setParentTypebotIds((ids) => [...ids, typebotId]);
  };
  const pushEdgeIdInLinkedTypebotQueue = (bot) => setLinkedBotQueue((queue) => [...queue, bot]);
  const popEdgeIdFromLinkedTypebotQueue = () => {
    setLinkedBotQueue((queue) => queue.slice(1));
    setParentTypebotIds((ids) => ids.slice(1));
    setCurrentTypebotId(linkedBotQueue[0].typebotId);
  };
  return /* @__PURE__ */ jsx(
    typebotContext.Provider,
    {
      value: {
        typebot: localTypebot,
        linkedTypebots,
        apiHost,
        isPreview,
        updateVariableValue,
        createEdge,
        injectLinkedTypebot,
        onNewLog,
        linkedBotQueue,
        isLoading,
        parentTypebotIds,
        pushParentTypebotId,
        pushEdgeIdInLinkedTypebotQueue,
        popEdgeIdFromLinkedTypebotQueue,
        currentTypebotId,
        setCurrentTypebotId
      },
      children
    }
  );
};
var useTypebot = () => useContext(typebotContext);

// src/assets/style.css
var style_default = '/*\n! tailwindcss v3.2.4 | MIT License | https://tailwindcss.com\n*//*\n1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)\n2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)\n*/\n\n*,\n::before,\n::after {\n  box-sizing: border-box; /* 1 */\n  border-width: 0; /* 2 */\n  border-style: solid; /* 2 */\n  border-color: #e5e7eb; /* 2 */\n}\n\n::before,\n::after {\n  --tw-content: \'\';\n}\n\n/*\n1. Use a consistent sensible line-height in all browsers.\n2. Prevent adjustments of font size after orientation changes in iOS.\n3. Use a more readable tab size.\n4. Use the user\'s configured `sans` font-family by default.\n5. Use the user\'s configured `sans` font-feature-settings by default.\n*/\n\nhtml {\n  line-height: 1.5; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n  -moz-tab-size: 4; /* 3 */\n  -o-tab-size: 4;\n     tab-size: 4; /* 3 */\n  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; /* 4 */\n  font-feature-settings: normal; /* 5 */\n}\n\n/*\n1. Remove the margin in all browsers.\n2. Inherit line-height from `html` so users can set them as a class directly on the `html` element.\n*/\n\nbody {\n  margin: 0; /* 1 */\n  line-height: inherit; /* 2 */\n}\n\n/*\n1. Add the correct height in Firefox.\n2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)\n3. Ensure horizontal rules are visible by default.\n*/\n\nhr {\n  height: 0; /* 1 */\n  color: inherit; /* 2 */\n  border-top-width: 1px; /* 3 */\n}\n\n/*\nAdd the correct text decoration in Chrome, Edge, and Safari.\n*/\n\nabbr:where([title]) {\n  -webkit-text-decoration: underline dotted;\n          text-decoration: underline dotted;\n}\n\n/*\nRemove the default font size and weight for headings.\n*/\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: inherit;\n  font-weight: inherit;\n}\n\n/*\nReset links to optimize for opt-in styling instead of opt-out.\n*/\n\na {\n  color: inherit;\n  text-decoration: inherit;\n}\n\n/*\nAdd the correct font weight in Edge and Safari.\n*/\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/*\n1. Use the user\'s configured `mono` font family by default.\n2. Correct the odd `em` font sizing in all browsers.\n*/\n\ncode,\nkbd,\nsamp,\npre {\n  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/*\nAdd the correct font size in all browsers.\n*/\n\nsmall {\n  font-size: 80%;\n}\n\n/*\nPrevent `sub` and `sup` elements from affecting the line height in all browsers.\n*/\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/*\n1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)\n2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)\n3. Remove gaps between table borders by default.\n*/\n\ntable {\n  text-indent: 0; /* 1 */\n  border-color: inherit; /* 2 */\n  border-collapse: collapse; /* 3 */\n}\n\n/*\n1. Change the font styles in all browsers.\n2. Remove the margin in Firefox and Safari.\n3. Remove default padding in all browsers.\n*/\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  font-weight: inherit; /* 1 */\n  line-height: inherit; /* 1 */\n  color: inherit; /* 1 */\n  margin: 0; /* 2 */\n  padding: 0; /* 3 */\n}\n\n/*\nRemove the inheritance of text transform in Edge and Firefox.\n*/\n\nbutton,\nselect {\n  text-transform: none;\n}\n\n/*\n1. Correct the inability to style clickable types in iOS and Safari.\n2. Remove default button styles.\n*/\n\nbutton,\n[type=\'button\'],\n[type=\'reset\'],\n[type=\'submit\'] {\n  -webkit-appearance: button; /* 1 */\n  background-color: transparent; /* 2 */\n  background-image: none; /* 2 */\n}\n\n/*\nUse the modern Firefox focus style for all focusable elements.\n*/\n\n:-moz-focusring {\n  outline: auto;\n}\n\n/*\nRemove the additional `:invalid` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)\n*/\n\n:-moz-ui-invalid {\n  box-shadow: none;\n}\n\n/*\nAdd the correct vertical alignment in Chrome and Firefox.\n*/\n\nprogress {\n  vertical-align: baseline;\n}\n\n/*\nCorrect the cursor style of increment and decrement buttons in Safari.\n*/\n\n::-webkit-inner-spin-button,\n::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/*\n1. Correct the odd appearance in Chrome and Safari.\n2. Correct the outline style in Safari.\n*/\n\n[type=\'search\'] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/*\nRemove the inner padding in Chrome and Safari on macOS.\n*/\n\n::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/*\n1. Correct the inability to style clickable types in iOS and Safari.\n2. Change font properties to `inherit` in Safari.\n*/\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/*\nAdd the correct display in Chrome and Safari.\n*/\n\nsummary {\n  display: list-item;\n}\n\n/*\nRemoves the default spacing and border for appropriate elements.\n*/\n\nblockquote,\ndl,\ndd,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nhr,\nfigure,\np,\npre {\n  margin: 0;\n}\n\nfieldset {\n  margin: 0;\n  padding: 0;\n}\n\nlegend {\n  padding: 0;\n}\n\nol,\nul,\nmenu {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n/*\nPrevent resizing textareas horizontally by default.\n*/\n\ntextarea {\n  resize: vertical;\n}\n\n/*\n1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)\n2. Set the default placeholder color to the user\'s configured gray 400 color.\n*/\n\ninput::-moz-placeholder, textarea::-moz-placeholder {\n  opacity: 1; /* 1 */\n  color: #9ca3af; /* 2 */\n}\n\ninput::placeholder,\ntextarea::placeholder {\n  opacity: 1; /* 1 */\n  color: #9ca3af; /* 2 */\n}\n\n/*\nSet the default cursor for buttons.\n*/\n\nbutton,\n[role="button"] {\n  cursor: pointer;\n}\n\n/*\nMake sure disabled buttons don\'t get the pointer cursor.\n*/\n:disabled {\n  cursor: default;\n}\n\n/*\n1. Make replaced elements `display: block` by default. (https://github.com/mozdevs/cssremedy/issues/14)\n2. Add `vertical-align: middle` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)\n   This can trigger a poorly considered lint error in some tools but is included by design.\n*/\n\nimg,\nsvg,\nvideo,\ncanvas,\naudio,\niframe,\nembed,\nobject {\n  display: block; /* 1 */\n  vertical-align: middle; /* 2 */\n}\n\n/*\nConstrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)\n*/\n\nimg,\nvideo {\n  max-width: 100%;\n  height: auto;\n}\n\n/* Make elements with the HTML hidden attribute stay hidden by default */\n[hidden] {\n  display: none;\n}\n\n*, ::before, ::after {\n  --tw-border-spacing-x: 0;\n  --tw-border-spacing-y: 0;\n  --tw-translate-x: 0;\n  --tw-translate-y: 0;\n  --tw-rotate: 0;\n  --tw-skew-x: 0;\n  --tw-skew-y: 0;\n  --tw-scale-x: 1;\n  --tw-scale-y: 1;\n  --tw-pan-x:  ;\n  --tw-pan-y:  ;\n  --tw-pinch-zoom:  ;\n  --tw-scroll-snap-strictness: proximity;\n  --tw-ordinal:  ;\n  --tw-slashed-zero:  ;\n  --tw-numeric-figure:  ;\n  --tw-numeric-spacing:  ;\n  --tw-numeric-fraction:  ;\n  --tw-ring-inset:  ;\n  --tw-ring-offset-width: 0px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: rgb(59 130 246 / 0.5);\n  --tw-ring-offset-shadow: 0 0 #0000;\n  --tw-ring-shadow: 0 0 #0000;\n  --tw-shadow: 0 0 #0000;\n  --tw-shadow-colored: 0 0 #0000;\n  --tw-blur:  ;\n  --tw-brightness:  ;\n  --tw-contrast:  ;\n  --tw-grayscale:  ;\n  --tw-hue-rotate:  ;\n  --tw-invert:  ;\n  --tw-saturate:  ;\n  --tw-sepia:  ;\n  --tw-drop-shadow:  ;\n  --tw-backdrop-blur:  ;\n  --tw-backdrop-brightness:  ;\n  --tw-backdrop-contrast:  ;\n  --tw-backdrop-grayscale:  ;\n  --tw-backdrop-hue-rotate:  ;\n  --tw-backdrop-invert:  ;\n  --tw-backdrop-opacity:  ;\n  --tw-backdrop-saturate:  ;\n  --tw-backdrop-sepia:  ;\n}\n\n::backdrop {\n  --tw-border-spacing-x: 0;\n  --tw-border-spacing-y: 0;\n  --tw-translate-x: 0;\n  --tw-translate-y: 0;\n  --tw-rotate: 0;\n  --tw-skew-x: 0;\n  --tw-skew-y: 0;\n  --tw-scale-x: 1;\n  --tw-scale-y: 1;\n  --tw-pan-x:  ;\n  --tw-pan-y:  ;\n  --tw-pinch-zoom:  ;\n  --tw-scroll-snap-strictness: proximity;\n  --tw-ordinal:  ;\n  --tw-slashed-zero:  ;\n  --tw-numeric-figure:  ;\n  --tw-numeric-spacing:  ;\n  --tw-numeric-fraction:  ;\n  --tw-ring-inset:  ;\n  --tw-ring-offset-width: 0px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: rgb(59 130 246 / 0.5);\n  --tw-ring-offset-shadow: 0 0 #0000;\n  --tw-ring-shadow: 0 0 #0000;\n  --tw-shadow: 0 0 #0000;\n  --tw-shadow-colored: 0 0 #0000;\n  --tw-blur:  ;\n  --tw-brightness:  ;\n  --tw-contrast:  ;\n  --tw-grayscale:  ;\n  --tw-hue-rotate:  ;\n  --tw-invert:  ;\n  --tw-saturate:  ;\n  --tw-sepia:  ;\n  --tw-drop-shadow:  ;\n  --tw-backdrop-blur:  ;\n  --tw-backdrop-brightness:  ;\n  --tw-backdrop-contrast:  ;\n  --tw-backdrop-grayscale:  ;\n  --tw-backdrop-hue-rotate:  ;\n  --tw-backdrop-invert:  ;\n  --tw-backdrop-opacity:  ;\n  --tw-backdrop-saturate:  ;\n  --tw-backdrop-sepia:  ;\n}\r\n.container {\n  width: 100%;\n}\r\n@media (min-width: 400px) {\n\n  .container {\n    max-width: 400px;\n  }\n}\r\n@media (min-width: 640px) {\n\n  .container {\n    max-width: 640px;\n  }\n}\r\n@media (min-width: 768px) {\n\n  .container {\n    max-width: 768px;\n  }\n}\r\n@media (min-width: 1024px) {\n\n  .container {\n    max-width: 1024px;\n  }\n}\r\n@media (min-width: 1280px) {\n\n  .container {\n    max-width: 1280px;\n  }\n}\r\n@media (min-width: 1536px) {\n\n  .container {\n    max-width: 1536px;\n  }\n}\r\n.fixed {\n  position: fixed;\n}\r\n.absolute {\n  position: absolute;\n}\r\n.relative {\n  position: relative;\n}\r\n.top-0 {\n  top: 0px;\n}\r\n.left-0 {\n  left: 0px;\n}\r\n.right-0 {\n  right: 0px;\n}\r\n.-right-1 {\n  right: -0.25rem;\n}\r\n.z-50 {\n  z-index: 50;\n}\r\n.z-10 {\n  z-index: 10;\n}\r\n.z-20 {\n  z-index: 20;\n}\r\n.m-2 {\n  margin: 0.5rem;\n}\r\n.mx-4 {\n  margin-left: 1rem;\n  margin-right: 1rem;\n}\r\n.my-2 {\n  margin-top: 0.5rem;\n  margin-bottom: 0.5rem;\n}\r\n.mb-1 {\n  margin-bottom: 0.25rem;\n}\r\n.mb-2 {\n  margin-bottom: 0.5rem;\n}\r\n.-ml-1 {\n  margin-left: -0.25rem;\n}\r\n.mr-3 {\n  margin-right: 0.75rem;\n}\r\n.mr-1 {\n  margin-right: 0.25rem;\n}\r\n.mr-2 {\n  margin-right: 0.5rem;\n}\r\n.mb-4 {\n  margin-bottom: 1rem;\n}\r\n.mt-1 {\n  margin-top: 0.25rem;\n}\r\n.ml-2 {\n  margin-left: 0.5rem;\n}\r\n.-mt-1 {\n  margin-top: -0.25rem;\n}\r\n.-mr-1 {\n  margin-right: -0.25rem;\n}\r\n.mb-3 {\n  margin-bottom: 0.75rem;\n}\r\n.mt-4 {\n  margin-top: 1rem;\n}\r\n.block {\n  display: block;\n}\r\n.\\!block {\n  display: block !important;\n}\r\n.inline {\n  display: inline;\n}\r\n.flex {\n  display: flex;\n}\r\n.inline-flex {\n  display: inline-flex;\n}\r\n.hidden {\n  display: none;\n}\r\n.h-32 {\n  height: 8rem;\n}\r\n.h-5 {\n  height: 1.25rem;\n}\r\n.h-screen {\n  height: 100vh;\n}\r\n.h-full {\n  height: 100%;\n}\r\n.h-2 {\n  height: 0.5rem;\n}\r\n.h-6 {\n  height: 1.5rem;\n}\r\n.h-3 {\n  height: 0.75rem;\n}\r\n.h-2\\.5 {\n  height: 0.625rem;\n}\r\n.h-4 {\n  height: 1rem;\n}\r\n.min-h-full {\n  min-height: 100%;\n}\r\n.w-full {\n  width: 100%;\n}\r\n.w-5 {\n  width: 1.25rem;\n}\r\n.w-screen {\n  width: 100vw;\n}\r\n.w-2 {\n  width: 0.5rem;\n}\r\n.w-6 {\n  width: 1.5rem;\n}\r\n.w-auto {\n  width: auto;\n}\r\n.w-3 {\n  width: 0.75rem;\n}\r\n.min-w-0 {\n  min-width: 0px;\n}\r\n.max-w-xs {\n  max-width: 20rem;\n}\r\n.max-w-full {\n  max-width: 100%;\n}\r\n.max-w-lg {\n  max-width: 32rem;\n}\r\n.flex-1 {\n  flex: 1 1 0%;\n}\r\n.flex-shrink-0 {\n  flex-shrink: 0;\n}\r\n.transform {\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\r\n@keyframes spin {\n\n  to {\n    transform: rotate(360deg);\n  }\n}\r\n.animate-spin {\n  animation: spin 1s linear infinite;\n}\r\n@keyframes ping {\n\n  75%, 100% {\n    transform: scale(2);\n    opacity: 0;\n  }\n}\r\n.animate-ping {\n  animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;\n}\r\n.cursor-pointer {\n  cursor: pointer;\n}\r\n.flex-col {\n  flex-direction: column;\n}\r\n.flex-wrap {\n  flex-wrap: wrap;\n}\r\n.items-start {\n  align-items: flex-start;\n}\r\n.items-end {\n  align-items: flex-end;\n}\r\n.items-center {\n  align-items: center;\n}\r\n.justify-end {\n  justify-content: flex-end;\n}\r\n.justify-center {\n  justify-content: center;\n}\r\n.justify-between {\n  justify-content: space-between;\n}\r\n.gap-2 {\n  gap: 0.5rem;\n}\r\n.overflow-hidden {\n  overflow: hidden;\n}\r\n.overflow-y-scroll {\n  overflow-y: scroll;\n}\r\n.whitespace-pre-wrap {\n  white-space: pre-wrap;\n}\r\n.rounded {\n  border-radius: 0.25rem;\n}\r\n.rounded-lg {\n  border-radius: 0.5rem;\n}\r\n.rounded-md {\n  border-radius: 0.375rem;\n}\r\n.rounded-full {\n  border-radius: 9999px;\n}\r\n.border-2 {\n  border-width: 2px;\n}\r\n.border-dashed {\n  border-style: dashed;\n}\r\n.border-gray-300 {\n  --tw-border-opacity: 1;\n  border-color: rgb(209 213 219 / var(--tw-border-opacity));\n}\r\n.bg-white {\n  --tw-bg-opacity: 1;\n  background-color: rgb(255 255 255 / var(--tw-bg-opacity));\n}\r\n.bg-transparent {\n  background-color: transparent;\n}\r\n.bg-gray-50 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(249 250 251 / var(--tw-bg-opacity));\n}\r\n.bg-gray-200 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(229 231 235 / var(--tw-bg-opacity));\n}\r\n.bg-cover {\n  background-size: cover;\n}\r\n.object-cover {\n  -o-object-fit: cover;\n     object-fit: cover;\n}\r\n.p-4 {\n  padding: 1rem;\n}\r\n.px-3 {\n  padding-left: 0.75rem;\n  padding-right: 0.75rem;\n}\r\n.py-1 {\n  padding-top: 0.25rem;\n  padding-bottom: 0.25rem;\n}\r\n.px-2 {\n  padding-left: 0.5rem;\n  padding-right: 0.5rem;\n}\r\n.px-4 {\n  padding-left: 1rem;\n  padding-right: 1rem;\n}\r\n.py-2 {\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n}\r\n.py-4 {\n  padding-top: 1rem;\n  padding-bottom: 1rem;\n}\r\n.py-6 {\n  padding-top: 1.5rem;\n  padding-bottom: 1.5rem;\n}\r\n.px-8 {\n  padding-left: 2rem;\n  padding-right: 2rem;\n}\r\n.px-1 {\n  padding-left: 0.25rem;\n  padding-right: 0.25rem;\n}\r\n.pt-10 {\n  padding-top: 2.5rem;\n}\r\n.pr-2 {\n  padding-right: 0.5rem;\n}\r\n.pb-0 {\n  padding-bottom: 0px;\n}\r\n.text-left {\n  text-align: left;\n}\r\n.text-center {\n  text-align: center;\n}\r\n.text-right {\n  text-align: right;\n}\r\n.text-sm {\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n}\r\n.text-base {\n  font-size: 1rem;\n  line-height: 1.5rem;\n}\r\n.font-semibold {\n  font-weight: 600;\n}\r\n.font-normal {\n  font-weight: 400;\n}\r\n.text-blue-500 {\n  --tw-text-opacity: 1;\n  color: rgb(59 130 246 / var(--tw-text-opacity));\n}\r\n.text-gray-500 {\n  --tw-text-opacity: 1;\n  color: rgb(107 114 128 / var(--tw-text-opacity));\n}\r\n.text-gray-900 {\n  --tw-text-opacity: 1;\n  color: rgb(17 24 39 / var(--tw-text-opacity));\n}\r\n.text-white {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\r\n.text-red-500 {\n  --tw-text-opacity: 1;\n  color: rgb(239 68 68 / var(--tw-text-opacity));\n}\r\n.opacity-25 {\n  opacity: 0.25;\n}\r\n.opacity-75 {\n  opacity: 0.75;\n}\r\n.opacity-0 {\n  opacity: 0;\n}\r\n.opacity-100 {\n  opacity: 1;\n}\r\n.shadow-md {\n  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\r\n.shadow {\n  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\r\n.brightness-225 {\n  --tw-brightness: brightness(2.25);\n  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);\n}\r\n.brightness-200 {\n  --tw-brightness: brightness(2);\n  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);\n}\r\n.filter {\n  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);\n}\r\n.transition-all {\n  transition-property: all;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\r\n.transition {\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\r\n.duration-100 {\n  transition-duration: 100ms;\n}\r\n\r\n:root {\r\n  --typebot-container-bg-image: none;\r\n  --typebot-container-bg-color: transparent;\r\n  --typebot-container-font-family: \'Open Sans\';\r\n\r\n  --typebot-button-bg-color: #0042da;\r\n  --typebot-button-color: #ffffff;\r\n\r\n  --typebot-host-bubble-bg-color: #f7f8ff;\r\n  --typebot-host-bubble-color: #303235;\r\n\r\n  --typebot-guest-bubble-bg-color: #ff8e21;\r\n  --typebot-guest-bubble-color: #ffffff;\r\n\r\n  --typebot-input-bg-color: #ffffff;\r\n  --typebot-input-color: #303235;\r\n  --typebot-input-placeholder-color: #9095a0;\r\n\r\n  --typebot-header-bg-color: #ffffff;\r\n  --typebot-header-color: #303235;\r\n\r\n  /* Phone input */\r\n  --PhoneInputCountryFlag-borderColor: transparent;\r\n  --PhoneInput-color--focus: transparent;\r\n}\r\n\r\n/* Hide scrollbar for Chrome, Safari and Opera */\r\n.scrollable-container::-webkit-scrollbar {\r\n  display: none;\r\n}\r\n\r\n/* Hide scrollbar for IE, Edge and Firefox */\r\n.scrollable-container {\r\n  -ms-overflow-style: none; /* IE and Edge */\r\n  scrollbar-width: none; /* Firefox */\r\n}\r\n\r\n/* Transitions */\r\n.bubble-enter {\r\n  opacity: 0;\r\n}\r\n.bubble-enter-active {\r\n  opacity: 1;\r\n  transition-property: opacity;\r\n  transition-duration: 500ms;\r\n  transition-timing-function: ease-out;\r\n}\r\n.bubble-exit {\r\n  opacity: 1;\r\n}\r\n.bubble-exit-active {\r\n  opacity: 0;\r\n  transition-delay: 0ms !important;\r\n  transition-property: opacity;\r\n  transition-duration: 400ms;\r\n  transition-timing-function: ease-out;\r\n}\r\n\r\n.bubble-typing {\r\n  transition: width 400ms ease-out, height 400ms ease-out;\r\n}\r\n\r\n.content-opacity {\r\n  transition: opacity 400ms ease-in 200ms;\r\n}\r\n\r\n.bubble1,\r\n.bubble2,\r\n.bubble3 {\r\n  background-color: var(--typebot-host-bubble-color);\r\n  opacity: 0.5;\r\n}\r\n\r\n.bubble1 {\r\n  animation: chatBubbles 1s ease-in-out infinite;\r\n}\r\n\r\n.bubble2 {\r\n  animation: chatBubbles 1s ease-in-out infinite;\r\n  animation-delay: 0.3s;\r\n}\r\n\r\n.bubble3 {\r\n  animation: chatBubbles 1s ease-in-out infinite;\r\n  animation-delay: 0.5s;\r\n}\r\n\r\n@keyframes chatBubbles {\r\n  0% {\r\n    transform: translateY(0);\r\n  }\r\n  50% {\r\n    transform: translateY(-5px);\r\n  }\r\n  100% {\r\n    transform: translateY(0);\r\n  }\r\n}\r\n\r\nbutton,\r\ninput,\r\ntextarea {\r\n  font-weight: 300;\r\n}\r\n\r\n.slate-a {\r\n  text-decoration: underline;\r\n}\r\n\r\n.slate-html-container > div {\r\n  min-height: 24px;\r\n}\r\n\r\n.slate-bold {\r\n  font-weight: bold;\r\n}\r\n\r\n.slate-italic {\r\n  font-style: oblique;\r\n}\r\n\r\n.slate-underline {\r\n  text-decoration: underline;\r\n}\r\n.text-input::-moz-placeholder {\r\n  color: var(--typebot-input-placeholder-color) !important;\r\n  opacity: 1 !important;\r\n}\r\n.text-input::placeholder {\r\n  color: var(--typebot-input-placeholder-color) !important;\r\n  opacity: 1 !important;\r\n}\r\n\r\n.typebot-container {\r\n  background-image: var(--typebot-container-bg-image);\r\n  background-color: var(--typebot-container-bg-color);\r\n  font-family: var(--typebot-container-font-family);\r\n}\r\n\r\n.custom-header {\r\n  color: var(--typebot-header-color);\r\n  background-color: var(--typebot-header-bg-color);\r\n}\r\n\r\n.typebot-button {\r\n  color: var(--typebot-button-color);\r\n  background-color: var(--typebot-button-bg-color);\r\n  border: 1px solid var(--typebot-button-bg-color);\r\n}\r\n\r\n.typebot-button.selectable {\r\n  color: var(--typebot-host-bubble-color);\r\n  background-color: var(--typebot-host-bubble-bg-color);\r\n  border: 1px solid var(--typebot-button-bg-color);\r\n}\r\n\r\n.typebot-host-bubble {\r\n  color: var(--typebot-host-bubble-color);\r\n}\r\n\r\n.typebot-host-bubble > .bubble-typing {\r\n  background-color: var(--typebot-host-bubble-bg-color);\r\n  border: var(--typebot-host-bubble-border);\r\n}\r\n\r\n.typebot-guest-bubble {\r\n  color: var(--typebot-guest-bubble-color);\r\n  background-color: var(--typebot-guest-bubble-bg-color);\r\n}\r\n\r\n.typebot-input {\r\n  color: var(--typebot-input-color);\r\n  background-color: var(--typebot-input-bg-color);\r\n  box-shadow: 0 2px 6px -1px rgba(0, 0, 0, 0.1);\r\n}\r\n\r\n.typebot-input-error-message {\r\n  color: var(--typebot-input-color);\r\n}\r\n\r\n.typebot-button > .send-icon {\r\n  fill: var(--typebot-button-color);\r\n}\r\n\r\n.typebot-chat-view {\r\n  max-width: 800px;\r\n}\r\n\r\n.ping span {\r\n  background-color: var(--typebot-button-bg-color);\r\n}\r\n\r\n.rating-icon-container svg {\r\n  width: 42px;\r\n  height: 42px;\r\n  stroke: var(--typebot-button-bg-color);\r\n  fill: var(--typebot-host-bubble-bg-color);\r\n  transition: fill 100ms ease-out;\r\n}\r\n\r\n.rating-icon-container.selected svg {\r\n  fill: var(--typebot-button-bg-color);\r\n}\r\n\r\n.rating-icon-container:hover svg {\r\n  filter: brightness(0.9);\r\n}\r\n\r\n.rating-icon-container:active svg {\r\n  filter: brightness(0.75);\r\n}\r\n\r\n.upload-progress-bar {\r\n  background-color: var(--typebot-button-bg-color);\r\n}\r\n\r\n.total-files-indicator {\r\n  background-color: var(--typebot-button-bg-color);\r\n  color: var(--typebot-button-color);\r\n  font-size: 10px;\r\n}\r\n\r\n.typebot-upload-input {\r\n  transition: border-color 100ms ease-out;\r\n}\r\n\r\n.typebot-upload-input.dragging-over {\r\n  border-color: var(--typebot-button-bg-color);\r\n}\r\n\r\n.secondary-button {\r\n  background-color: var(--typebot-host-bubble-bg-color);\r\n  color: var(--typebot-host-bubble-color);\r\n}\r\n\r\n.hover\\:bg-gray-100:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgb(243 244 246 / var(--tw-bg-opacity));\n}\r\n\r\n.hover\\:brightness-90:hover {\n  --tw-brightness: brightness(.9);\n  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);\n}\r\n\r\n.focus\\:outline-none:focus {\n  outline: 2px solid transparent;\n  outline-offset: 2px;\n}\r\n\r\n.active\\:brightness-75:active {\n  --tw-brightness: brightness(.75);\n  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);\n}\r\n\r\n.disabled\\:cursor-not-allowed:disabled {\n  cursor: not-allowed;\n}\r\n\r\n.disabled\\:opacity-50:disabled {\n  opacity: 0.5;\n}\r\n\r\n.disabled\\:brightness-100:disabled {\n  --tw-brightness: brightness(1);\n  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);\n}\r\n\r\n@media (min-width: 400px) {\n\n  .xs\\:mb-2 {\n    margin-bottom: 0.5rem;\n  }\n\n  .xs\\:flex {\n    display: flex;\n  }\n\n  .xs\\:hidden {\n    display: none;\n  }\n\n  .xs\\:h-10 {\n    height: 2.5rem;\n  }\n\n  .xs\\:h-full {\n    height: 100%;\n  }\n\n  .xs\\:w-10 {\n    width: 2.5rem;\n  }\n\n  .xs\\:w-full {\n    width: 100%;\n  }\n\n  .xs\\:text-xl {\n    font-size: 1.25rem;\n    line-height: 1.75rem;\n  }\n}\r\n\r\n@media (min-width: 1024px) {\n\n  .lg\\:w-3\\/4 {\n    width: 75%;\n  }\n\n  .lg\\:w-11\\/12 {\n    width: 91.666667%;\n  }\n\n  .lg\\:w-4\\/6 {\n    width: 66.666667%;\n  }\n\n  .lg\\:px-5 {\n    padding-left: 1.25rem;\n    padding-right: 1.25rem;\n  }\n}\r\n';

// src/assets/importantStyles.css
var importantStyles_default = ".lite-badge {\r\n  display: block !important;\r\n}\r\n";

// src/assets/phone.css
var phone_default = "/* CSS variables. */\r\n:root {\r\n  --PhoneInput-color--focus: #03b2cb;\r\n  --PhoneInputInternationalIconPhone-opacity: 0.8;\r\n  --PhoneInputInternationalIconGlobe-opacity: 0.65;\r\n  --PhoneInputCountrySelect-marginRight: 0.35em;\r\n  --PhoneInputCountrySelectArrow-width: 0.3em;\r\n  --PhoneInputCountrySelectArrow-marginLeft: var(\r\n    --PhoneInputCountrySelect-marginRight\r\n  );\r\n  --PhoneInputCountrySelectArrow-borderWidth: 1px;\r\n  --PhoneInputCountrySelectArrow-opacity: 0.45;\r\n  --PhoneInputCountrySelectArrow-color: currentColor;\r\n  --PhoneInputCountrySelectArrow-color--focus: var(--PhoneInput-color--focus);\r\n  --PhoneInputCountrySelectArrow-transform: rotate(45deg);\r\n  --PhoneInputCountryFlag-aspectRatio: 1.5;\r\n  --PhoneInputCountryFlag-height: 1em;\r\n  --PhoneInputCountryFlag-borderWidth: 1px;\r\n  --PhoneInputCountryFlag-borderColor: rgba(0, 0, 0, 0.5);\r\n  --PhoneInputCountryFlag-borderColor--focus: var(--PhoneInput-color--focus);\r\n  --PhoneInputCountryFlag-backgroundColor--loading: rgba(0, 0, 0, 0.1);\r\n}\r\n\r\n.PhoneInput {\r\n  /* This is done to stretch the contents of this component. */\r\n  display: flex;\r\n  align-items: center;\r\n}\r\n\r\n.PhoneInputInput {\r\n  /* The phone number input stretches to fill all empty space */\r\n  flex: 1;\r\n  /* The phone number input should shrink\r\n	   to make room for the extension input */\r\n  min-width: 0;\r\n}\r\n\r\n.PhoneInputCountryIcon {\r\n  width: calc(\r\n    var(--PhoneInputCountryFlag-height) *\r\n      var(--PhoneInputCountryFlag-aspectRatio)\r\n  );\r\n  height: var(--PhoneInputCountryFlag-height);\r\n}\r\n\r\n.PhoneInputCountryIcon--square {\r\n  width: var(--PhoneInputCountryFlag-height);\r\n}\r\n\r\n.PhoneInputCountryIcon--border {\r\n  /* Removed `background-color` because when an `<img/>` was still loading\r\n	   it would show a dark gray rectangle. */\r\n  /* For some reason the `<img/>` is not stretched to 100% width and height\r\n	   and sometime there can be seen white pixels of the background at top and bottom. */\r\n  background-color: var(--PhoneInputCountryFlag-backgroundColor--loading);\r\n  /* Border is added via `box-shadow` because `border` interferes with `width`/`height`. */\r\n  /* For some reason the `<img/>` is not stretched to 100% width and height\r\n	   and sometime there can be seen white pixels of the background at top and bottom,\r\n	   so an additional \"inset\" border is added. */\r\n  box-shadow: 0 0 0 var(--PhoneInputCountryFlag-borderWidth)\r\n      var(--PhoneInputCountryFlag-borderColor),\r\n    inset 0 0 0 var(--PhoneInputCountryFlag-borderWidth)\r\n      var(--PhoneInputCountryFlag-borderColor);\r\n}\r\n\r\n.PhoneInputCountryIconImg {\r\n  /* Fixes weird vertical space above the flag icon. */\r\n  /* https://gitlab.com/catamphetamine/react-phone-number-input/-/issues/7#note_348586559 */\r\n  display: block;\r\n  /* 3rd party <SVG/> flag icons won't stretch if they have `width` and `height`.\r\n	   Also, if an <SVG/> icon's aspect ratio was different, it wouldn't fit too. */\r\n  width: 100%;\r\n  height: 100%;\r\n}\r\n\r\n.PhoneInputInternationalIconPhone {\r\n  opacity: var(--PhoneInputInternationalIconPhone-opacity);\r\n}\r\n\r\n.PhoneInputInternationalIconGlobe {\r\n  opacity: var(--PhoneInputInternationalIconGlobe-opacity);\r\n}\r\n\r\n/* Styling native country `<select/>`. */\r\n\r\n.PhoneInputCountry {\r\n  position: relative;\r\n  align-self: stretch;\r\n  display: flex;\r\n  align-items: center;\r\n  margin-right: var(--PhoneInputCountrySelect-marginRight);\r\n}\r\n\r\n.PhoneInputCountrySelect {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  height: 100%;\r\n  width: 100%;\r\n  z-index: 1;\r\n  border: 0;\r\n  opacity: 0;\r\n  cursor: pointer;\r\n}\r\n\r\n.PhoneInputCountrySelect[disabled],\r\n.PhoneInputCountrySelect[readonly] {\r\n  cursor: default;\r\n}\r\n\r\n.PhoneInputCountrySelectArrow {\r\n  display: block;\r\n  content: '';\r\n  width: var(--PhoneInputCountrySelectArrow-width);\r\n  height: var(--PhoneInputCountrySelectArrow-width);\r\n  margin-left: var(--PhoneInputCountrySelectArrow-marginLeft);\r\n  border-style: solid;\r\n  border-color: var(--PhoneInputCountrySelectArrow-color);\r\n  border-top-width: 0;\r\n  border-bottom-width: var(--PhoneInputCountrySelectArrow-borderWidth);\r\n  border-left-width: 0;\r\n  border-right-width: var(--PhoneInputCountrySelectArrow-borderWidth);\r\n  transform: var(--PhoneInputCountrySelectArrow-transform);\r\n  opacity: var(--PhoneInputCountrySelectArrow-opacity);\r\n}\r\n\r\n.PhoneInputCountrySelect:focus\r\n  + .PhoneInputCountryIcon\r\n  + .PhoneInputCountrySelectArrow {\r\n  opacity: 1;\r\n  color: var(--PhoneInputCountrySelectArrow-color--focus);\r\n}\r\n\r\n.PhoneInputCountrySelect:focus + .PhoneInputCountryIcon--border {\r\n  box-shadow: 0 0 0 var(--PhoneInputCountryFlag-borderWidth)\r\n      var(--PhoneInputCountryFlag-borderColor--focus),\r\n    inset 0 0 0 var(--PhoneInputCountryFlag-borderWidth)\r\n      var(--PhoneInputCountryFlag-borderColor--focus);\r\n}\r\n\r\n.PhoneInputCountrySelect:focus\r\n  + .PhoneInputCountryIcon\r\n  .PhoneInputInternationalIconGlobe {\r\n  opacity: 1;\r\n  color: var(--PhoneInputCountrySelectArrow-color--focus);\r\n}\r\n\r\n.PhoneInputInput {\r\n  padding: 1rem 0.5rem;\r\n  outline: none !important;\r\n  background: transparent;\r\n  flex: 1 1 0%;\r\n  width: 100%;\r\n  font-size: 16px;\r\n}\r\n\r\n.PhoneInputCountry {\r\n  padding-left: 0.5rem;\r\n}\r\n\r\n.PhoneInputCountryIcon,\r\n.PhoneInputCountryIconImg {\r\n  border-radius: 3px;\r\n}\r\n\r\ninput.PhoneInputInput::-moz-placeholder {\r\n  color: var(--typebot-input-placeholder-color);\r\n}\r\n\r\ninput.PhoneInputInput::placeholder {\r\n  color: var(--typebot-input-placeholder-color);\r\n}\r\n";

// src/components/ConversationContainer.tsx
import { useEffect as useEffect10, useRef as useRef13, useState as useState23 } from "react";

// src/components/ChatGroup/ChatGroup.tsx
import { useEffect as useEffect9, useRef as useRef12, useState as useState22 } from "react";
import { TransitionGroup, CSSTransition as CSSTransition3 } from "react-transition-group";

// src/components/ChatGroup/AvatarSideContainer.tsx
import {
  forwardRef,
  useEffect as useEffect2,
  useImperativeHandle,
  useRef,
  useState as useState3
} from "react";

// src/components/avatars/Avatar.tsx
import { useState as useState2 } from "react";

// src/components/avatars/DefaultAvatar.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var DefaultAvatar = () => {
  return /* @__PURE__ */ jsx2(
    "figure",
    {
      className: "flex justify-center items-center rounded-full text-white w-6 h-6 text-sm relative xs:w-10 xs:h-10 xs:text-xl",
      "data-testid": "default-avatar",
      children: /* @__PURE__ */ jsxs(
        "svg",
        {
          width: "75",
          height: "75",
          viewBox: "0 0 75 75",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          className: "absolute top-0 left-0 w-6 h-6 xs:w-full xs:h-full xs:text-xl",
          children: [
            /* @__PURE__ */ jsx2("mask", { id: "mask0", x: "0", y: "0", "mask-type": "alpha", children: /* @__PURE__ */ jsx2("circle", { cx: "37.5", cy: "37.5", r: "37.5", fill: "#0042DA" }) }),
            /* @__PURE__ */ jsxs("g", { mask: "url(#mask0)", children: [
              /* @__PURE__ */ jsx2("rect", { x: "-30", y: "-43", width: "131", height: "154", fill: "#0042DA" }),
              /* @__PURE__ */ jsx2(
                "rect",
                {
                  x: "2.50413",
                  y: "120.333",
                  width: "81.5597",
                  height: "86.4577",
                  rx: "2.5",
                  transform: "rotate(-52.6423 2.50413 120.333)",
                  stroke: "#FED23D",
                  strokeWidth: "5"
                }
              ),
              /* @__PURE__ */ jsx2("circle", { cx: "76.5", cy: "-1.5", r: "29", stroke: "#FF8E20", strokeWidth: "5" }),
              /* @__PURE__ */ jsx2(
                "path",
                {
                  d: "M-49.8224 22L-15.5 -40.7879L18.8224 22H-49.8224Z",
                  stroke: "#F7F8FF",
                  strokeWidth: "5"
                }
              )
            ] })
          ]
        }
      )
    }
  );
};

// src/components/avatars/Avatar.tsx
import { Fragment, jsx as jsx3 } from "react/jsx-runtime";
var Avatar = ({ avatarSrc }) => {
  const [currentAvatarSrc] = useState2(avatarSrc);
  if (currentAvatarSrc === "")
    return /* @__PURE__ */ jsx3(Fragment, {});
  if (isDefined(currentAvatarSrc))
    return /* @__PURE__ */ jsx3(
      "figure",
      {
        className: "flex justify-center items-center rounded-full text-white w-6 h-6 text-sm relative xs:w-10 xs:h-10 xs:text-xl",
        children: /* @__PURE__ */ jsx3(
          "img",
          {
            src: currentAvatarSrc,
            alt: "Bot avatar",
            className: "rounded-full object-cover w-full h-full"
          }
        )
      }
    );
  return /* @__PURE__ */ jsx3(DefaultAvatar, {});
};

// src/components/ChatGroup/AvatarSideContainer.tsx
import { CSSTransition } from "react-transition-group";
import { ResizeObserver } from "resize-observer";
import { jsx as jsx4 } from "react/jsx-runtime";
var AvatarSideContainer = forwardRef(function AvatarSideContainer2({ hostAvatarSrc, keepShowing }, ref) {
  const [show, setShow] = useState3(false);
  const [avatarTopOffset, setAvatarTopOffset] = useState3(0);
  const refreshTopOffset = () => {
    if (!scrollingSideGroupRef.current || !avatarContainer.current)
      return;
    const { height } = scrollingSideGroupRef.current.getBoundingClientRect();
    const { height: avatarHeight } = avatarContainer.current.getBoundingClientRect();
    setAvatarTopOffset(height - avatarHeight);
  };
  const scrollingSideGroupRef = useRef(null);
  const avatarContainer = useRef(null);
  useImperativeHandle(ref, () => ({
    refreshTopOffset
  }));
  useEffect2(() => {
    if (!document)
      return;
    setShow(true);
    const resizeObserver = new ResizeObserver(refreshTopOffset);
    resizeObserver.observe(document.body);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  return /* @__PURE__ */ jsx4(
    "div",
    {
      className: "flex w-6 xs:w-10 mr-2 mb-2 flex-shrink-0 items-center relative typebot-avatar-container ",
      ref: scrollingSideGroupRef,
      children: /* @__PURE__ */ jsx4(
        CSSTransition,
        {
          classNames: "bubble",
          timeout: 500,
          in: show && keepShowing,
          unmountOnExit: true,
          children: /* @__PURE__ */ jsx4(
            "div",
            {
              className: "absolute w-6 xs:w-10 h-6 xs:h-10 mb-4 xs:mb-2 flex items-center top-0",
              ref: avatarContainer,
              style: {
                top: `${avatarTopOffset}px`,
                transition: "top 350ms ease-out, opacity 500ms"
              },
              children: /* @__PURE__ */ jsx4(Avatar, { avatarSrc: hostAvatarSrc })
            }
          )
        }
      )
    }
  );
});

// ../../../node_modules/.pnpm/zod@3.21.4/node_modules/zod/lib/index.mjs
var util;
(function(util2) {
  util2.assertEqual = (val) => val;
  function assertIs(_arg) {
  }
  util2.assertIs = assertIs;
  function assertNever(_x) {
    throw new Error();
  }
  util2.assertNever = assertNever;
  util2.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items) {
      obj[item] = item;
    }
    return obj;
  };
  util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
    const filtered = {};
    for (const k of validKeys) {
      filtered[k] = obj[k];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj) => {
    return util2.objectKeys(obj).map(function(e) {
      return obj[e];
    });
  };
  util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
    const keys = [];
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        keys.push(key);
      }
    }
    return keys;
  };
  util2.find = (arr, checker) => {
    for (const item of arr) {
      if (checker(item))
        return item;
    }
    return void 0;
  };
  util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && isFinite(val) && Math.floor(val) === val;
  function joinValues(array, separator = " | ") {
    return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
  }
  util2.joinValues = joinValues;
  util2.jsonStringifyReplacer = (_, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
})(util || (util = {}));
var objectUtil;
(function(objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => {
    return __spreadValues(__spreadValues({}, first), second);
  };
})(objectUtil || (objectUtil = {}));
var ZodParsedType = util.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]);
var getParsedType = (data) => {
  const t = typeof data;
  switch (t) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "symbol":
      return ZodParsedType.symbol;
    case "object":
      if (Array.isArray(data)) {
        return ZodParsedType.array;
      }
      if (data === null) {
        return ZodParsedType.null;
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return ZodParsedType.promise;
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return ZodParsedType.map;
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return ZodParsedType.set;
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return ZodParsedType.date;
      }
      return ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
};
var ZodIssueCode = util.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
var quotelessJson = (obj) => {
  const json = JSON.stringify(obj, null, 2);
  return json.replace(/"([^"]+)":/g, "$1:");
};
var ZodError = class extends Error {
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = "ZodError";
    this.issues = issues;
  }
  get errors() {
    return this.issues;
  }
  format(_mapper) {
    const mapper = _mapper || function(issue) {
      return issue.message;
    };
    const fieldErrors = { _errors: [] };
    const processError = (error) => {
      for (const issue of error.issues) {
        if (issue.code === "invalid_union") {
          issue.unionErrors.map(processError);
        } else if (issue.code === "invalid_return_type") {
          processError(issue.returnTypeError);
        } else if (issue.code === "invalid_arguments") {
          processError(issue.argumentsError);
        } else if (issue.path.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i = 0;
          while (i < issue.path.length) {
            const el = issue.path[i];
            const terminal = i === issue.path.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue));
            }
            curr = curr[el];
            i++;
          }
        }
      }
    };
    processError(this);
    return fieldErrors;
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues) {
      if (sub.path.length > 0) {
        fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
        fieldErrors[sub.path[0]].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
};
ZodError.create = (issues) => {
  const error = new ZodError(issues);
  return error;
};
var errorMap = (issue, _ctx) => {
  let message;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = "Required";
      } else {
        message = `Expected ${issue.expected}, received ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("includes" in issue.validation) {
          message = `Invalid input: must include "${issue.validation.includes}"`;
          if (typeof issue.validation.position === "number") {
            message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
          }
        } else if ("startsWith" in issue.validation) {
          message = `Invalid input: must start with "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message = `Invalid input: must end with "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message = `Invalid ${issue.validation}`;
      } else {
        message = "Invalid";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "bigint")
        message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message = "Number must be finite";
      break;
    default:
      message = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message };
};
var overrideErrorMap = errorMap;
function setErrorMap(map) {
  overrideErrorMap = map;
}
function getErrorMap() {
  return overrideErrorMap;
}
var makeIssue = (params) => {
  const { data, path, errorMaps, issueData } = params;
  const fullPath = [...path, ...issueData.path || []];
  const fullIssue = __spreadProps(__spreadValues({}, issueData), {
    path: fullPath
  });
  let errorMessage = "";
  const maps = errorMaps.filter((m) => !!m).slice().reverse();
  for (const map of maps) {
    errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
  }
  return __spreadProps(__spreadValues({}, issueData), {
    path: fullPath,
    message: issueData.message || errorMessage
  });
};
var EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      ctx.schemaErrorMap,
      getErrorMap(),
      errorMap
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue);
}
var ParseStatus = class {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid")
      this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted")
      this.value = "aborted";
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s of results) {
      if (s.status === "aborted")
        return INVALID;
      if (s.status === "dirty")
        status.dirty();
      arrayValue.push(s.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static mergeObjectAsync(status, pairs) {
    return __async(this, null, function* () {
      const syncPairs = [];
      for (const pair of pairs) {
        syncPairs.push({
          key: yield pair.key,
          value: yield pair.value
        });
      }
      return ParseStatus.mergeObjectSync(status, syncPairs);
    });
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === "aborted")
        return INVALID;
      if (value.status === "aborted")
        return INVALID;
      if (key.status === "dirty")
        status.dirty();
      if (value.status === "dirty")
        status.dirty();
      if (typeof value.value !== "undefined" || pair.alwaysSet) {
        finalObject[key.value] = value.value;
      }
    }
    return { status: status.value, value: finalObject };
  }
};
var INVALID = Object.freeze({
  status: "aborted"
});
var DIRTY = (value) => ({ status: "dirty", value });
var OK = (value) => ({ status: "valid", value });
var isAborted = (x) => x.status === "aborted";
var isDirty = (x) => x.status === "dirty";
var isValid = (x) => x.status === "valid";
var isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
  errorUtil2.toString = (message) => typeof message === "string" ? message : message === null || message === void 0 ? void 0 : message.message;
})(errorUtil || (errorUtil = {}));
var ParseInputLazyPath = class {
  constructor(parent, value, path, key) {
    this._cachedPath = [];
    this.parent = parent;
    this.data = value;
    this._path = path;
    this._key = key;
  }
  get path() {
    if (!this._cachedPath.length) {
      if (this._key instanceof Array) {
        this._cachedPath.push(...this._path, ...this._key);
      } else {
        this._cachedPath.push(...this._path, this._key);
      }
    }
    return this._cachedPath;
  }
};
var handleResult = (ctx, result) => {
  if (isValid(result)) {
    return { success: true, data: result.value };
  } else {
    if (!ctx.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    return {
      success: false,
      get error() {
        if (this._error)
          return this._error;
        const error = new ZodError(ctx.common.issues);
        this._error = error;
        return this._error;
      }
    };
  }
};
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    if (typeof ctx.data === "undefined") {
      return { message: required_error !== null && required_error !== void 0 ? required_error : ctx.defaultError };
    }
    return { message: invalid_type_error !== null && invalid_type_error !== void 0 ? invalid_type_error : ctx.defaultError };
  };
  return { errorMap: customMap, description };
}
var ZodType = class {
  constructor(def) {
    this.spa = this.safeParseAsync;
    this._def = def;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
  }
  get description() {
    return this._def.description;
  }
  _getType(input) {
    return getParsedType(input.data);
  }
  _getOrReturnCtx(input, ctx) {
    return ctx || {
      common: input.parent.common,
      data: input.data,
      parsedType: getParsedType(input.data),
      schemaErrorMap: this._def.errorMap,
      path: input.path,
      parent: input.parent
    };
  }
  _processInputParams(input) {
    return {
      status: new ParseStatus(),
      ctx: {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      }
    };
  }
  _parseSync(input) {
    const result = this._parse(input);
    if (isAsync(result)) {
      throw new Error("Synchronous parse encountered promise.");
    }
    return result;
  }
  _parseAsync(input) {
    const result = this._parse(input);
    return Promise.resolve(result);
  }
  parse(data, params) {
    const result = this.safeParse(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  safeParse(data, params) {
    var _a2;
    const ctx = {
      common: {
        issues: [],
        async: (_a2 = params === null || params === void 0 ? void 0 : params.async) !== null && _a2 !== void 0 ? _a2 : false,
        contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap
      },
      path: (params === null || params === void 0 ? void 0 : params.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const result = this._parseSync({ data, path: ctx.path, parent: ctx });
    return handleResult(ctx, result);
  }
  parseAsync(data, params) {
    return __async(this, null, function* () {
      const result = yield this.safeParseAsync(data, params);
      if (result.success)
        return result.data;
      throw result.error;
    });
  }
  safeParseAsync(data, params) {
    return __async(this, null, function* () {
      const ctx = {
        common: {
          issues: [],
          contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap,
          async: true
        },
        path: (params === null || params === void 0 ? void 0 : params.path) || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data,
        parsedType: getParsedType(data)
      };
      const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
      const result = yield isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult);
      return handleResult(ctx, result);
    });
  }
  refine(check, message) {
    const getIssueProperties = (val) => {
      if (typeof message === "string" || typeof message === "undefined") {
        return { message };
      } else if (typeof message === "function") {
        return message(val);
      } else {
        return message;
      }
    };
    return this._refinement((val, ctx) => {
      const result = check(val);
      const setError = () => ctx.addIssue(__spreadValues({
        code: ZodIssueCode.custom
      }, getIssueProperties(val)));
      if (typeof Promise !== "undefined" && result instanceof Promise) {
        return result.then((data) => {
          if (!data) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      if (!result) {
        setError();
        return false;
      } else {
        return true;
      }
    });
  }
  refinement(check, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check(val)) {
        ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
        return false;
      } else {
        return true;
      }
    });
  }
  _refinement(refinement) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "refinement", refinement }
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  optional() {
    return ZodOptional.create(this, this._def);
  }
  nullable() {
    return ZodNullable.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ZodArray.create(this, this._def);
  }
  promise() {
    return ZodPromise.create(this, this._def);
  }
  or(option) {
    return ZodUnion.create([this, option], this._def);
  }
  and(incoming) {
    return ZodIntersection.create(this, incoming, this._def);
  }
  transform(transform) {
    return new ZodEffects(__spreadProps(__spreadValues({}, processCreateParams(this._def)), {
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "transform", transform }
    }));
  }
  default(def) {
    const defaultValueFunc = typeof def === "function" ? def : () => def;
    return new ZodDefault(__spreadProps(__spreadValues({}, processCreateParams(this._def)), {
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault
    }));
  }
  brand() {
    return new ZodBranded(__spreadValues({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this
    }, processCreateParams(this._def)));
  }
  catch(def) {
    const catchValueFunc = typeof def === "function" ? def : () => def;
    return new ZodCatch(__spreadProps(__spreadValues({}, processCreateParams(this._def)), {
      innerType: this,
      catchValue: catchValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodCatch
    }));
  }
  describe(description) {
    const This = this.constructor;
    return new This(__spreadProps(__spreadValues({}, this._def), {
      description
    }));
  }
  pipe(target) {
    return ZodPipeline.create(this, target);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
};
var cuidRegex = /^c[^\s-]{8,}$/i;
var cuid2Regex = /^[a-z][a-z0-9]*$/;
var ulidRegex = /[0-9A-HJKMNP-TV-Z]{26}/;
var uuidRegex = /^([a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}|00000000-0000-0000-0000-000000000000)$/i;
var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\])|(\[IPv6:(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))\])|([A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])*(\.[A-Za-z]{2,})+))$/;
var emojiRegex = new RegExp("^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", "u");
var ipv4Regex = /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/;
var ipv6Regex = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/;
var datetimeRegex = (args) => {
  if (args.precision) {
    if (args.offset) {
      return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${args.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`);
    } else {
      return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${args.precision}}Z$`);
    }
  } else if (args.precision === 0) {
    if (args.offset) {
      return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$`);
    } else {
      return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$`);
    }
  } else {
    if (args.offset) {
      return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$`);
    } else {
      return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$`);
    }
  }
};
function isValidIP(ip, version) {
  if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
var ZodString = class extends ZodType {
  constructor() {
    super(...arguments);
    this._regex = (regex, validation, message) => this.refinement((data) => regex.test(data), __spreadValues({
      validation,
      code: ZodIssueCode.invalid_string
    }, errorUtil.errToObj(message)));
    this.nonempty = (message) => this.min(1, errorUtil.errToObj(message));
    this.trim = () => new ZodString(__spreadProps(__spreadValues({}, this._def), {
      checks: [...this._def.checks, { kind: "trim" }]
    }));
    this.toLowerCase = () => new ZodString(__spreadProps(__spreadValues({}, this._def), {
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    }));
    this.toUpperCase = () => new ZodString(__spreadProps(__spreadValues({}, this._def), {
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    }));
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = String(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.string) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(
        ctx2,
        {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.string,
          received: ctx2.parsedType
        }
      );
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.length < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.length > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "length") {
        const tooBig = input.data.length > check.value;
        const tooSmall = input.data.length < check.value;
        if (tooBig || tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          if (tooBig) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          } else if (tooSmall) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          }
          status.dirty();
        }
      } else if (check.kind === "email") {
        if (!emailRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "email",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "emoji") {
        if (!emojiRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "emoji",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "uuid") {
        if (!uuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "uuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid") {
        if (!cuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid2") {
        if (!cuid2Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid2",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ulid") {
        if (!ulidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ulid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "url") {
        try {
          new URL(input.data);
        } catch (_a2) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "regex") {
        check.regex.lastIndex = 0;
        const testResult = check.regex.test(input.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "regex",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "trim") {
        input.data = input.data.trim();
      } else if (check.kind === "includes") {
        if (!input.data.includes(check.value, check.position)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { includes: check.value, position: check.position },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "toLowerCase") {
        input.data = input.data.toLowerCase();
      } else if (check.kind === "toUpperCase") {
        input.data = input.data.toUpperCase();
      } else if (check.kind === "startsWith") {
        if (!input.data.startsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { startsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "endsWith") {
        if (!input.data.endsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { endsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "datetime") {
        const regex = datetimeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "datetime",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ip") {
        if (!isValidIP(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ip",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _addCheck(check) {
    return new ZodString(__spreadProps(__spreadValues({}, this._def), {
      checks: [...this._def.checks, check]
    }));
  }
  email(message) {
    return this._addCheck(__spreadValues({ kind: "email" }, errorUtil.errToObj(message)));
  }
  url(message) {
    return this._addCheck(__spreadValues({ kind: "url" }, errorUtil.errToObj(message)));
  }
  emoji(message) {
    return this._addCheck(__spreadValues({ kind: "emoji" }, errorUtil.errToObj(message)));
  }
  uuid(message) {
    return this._addCheck(__spreadValues({ kind: "uuid" }, errorUtil.errToObj(message)));
  }
  cuid(message) {
    return this._addCheck(__spreadValues({ kind: "cuid" }, errorUtil.errToObj(message)));
  }
  cuid2(message) {
    return this._addCheck(__spreadValues({ kind: "cuid2" }, errorUtil.errToObj(message)));
  }
  ulid(message) {
    return this._addCheck(__spreadValues({ kind: "ulid" }, errorUtil.errToObj(message)));
  }
  ip(options) {
    return this._addCheck(__spreadValues({ kind: "ip" }, errorUtil.errToObj(options)));
  }
  datetime(options) {
    var _a2;
    if (typeof options === "string") {
      return this._addCheck({
        kind: "datetime",
        precision: null,
        offset: false,
        message: options
      });
    }
    return this._addCheck(__spreadValues({
      kind: "datetime",
      precision: typeof (options === null || options === void 0 ? void 0 : options.precision) === "undefined" ? null : options === null || options === void 0 ? void 0 : options.precision,
      offset: (_a2 = options === null || options === void 0 ? void 0 : options.offset) !== null && _a2 !== void 0 ? _a2 : false
    }, errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message)));
  }
  regex(regex, message) {
    return this._addCheck(__spreadValues({
      kind: "regex",
      regex
    }, errorUtil.errToObj(message)));
  }
  includes(value, options) {
    return this._addCheck(__spreadValues({
      kind: "includes",
      value,
      position: options === null || options === void 0 ? void 0 : options.position
    }, errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message)));
  }
  startsWith(value, message) {
    return this._addCheck(__spreadValues({
      kind: "startsWith",
      value
    }, errorUtil.errToObj(message)));
  }
  endsWith(value, message) {
    return this._addCheck(__spreadValues({
      kind: "endsWith",
      value
    }, errorUtil.errToObj(message)));
  }
  min(minLength, message) {
    return this._addCheck(__spreadValues({
      kind: "min",
      value: minLength
    }, errorUtil.errToObj(message)));
  }
  max(maxLength, message) {
    return this._addCheck(__spreadValues({
      kind: "max",
      value: maxLength
    }, errorUtil.errToObj(message)));
  }
  length(len, message) {
    return this._addCheck(__spreadValues({
      kind: "length",
      value: len
    }, errorUtil.errToObj(message)));
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === "datetime");
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((ch) => ch.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === "uuid");
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((ch) => ch.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((ch) => ch.kind === "ip");
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodString.create = (params) => {
  var _a2;
  return new ZodString(__spreadValues({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodString,
    coerce: (_a2 = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a2 !== void 0 ? _a2 : false
  }, processCreateParams(params)));
};
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / Math.pow(10, decCount);
}
var ZodNumber = class extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = Number(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.number) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "int") {
        if (!util.isInteger(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: "integer",
            received: "float",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (floatSafeRemainder(input.data, check.value) !== 0) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "finite") {
        if (!Number.isFinite(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_finite,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new ZodNumber(__spreadProps(__spreadValues({}, this._def), {
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    }));
  }
  _addCheck(check) {
    return new ZodNumber(__spreadProps(__spreadValues({}, this._def), {
      checks: [...this._def.checks, check]
    }));
  }
  int(message) {
    return this._addCheck({
      kind: "int",
      message: errorUtil.toString(message)
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  finite(message) {
    return this._addCheck({
      kind: "finite",
      message: errorUtil.toString(message)
    });
  }
  safe(message) {
    return this._addCheck({
      kind: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil.toString(message)
    })._addCheck({
      kind: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
  get isInt() {
    return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
  }
  get isFinite() {
    let max = null, min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
        return true;
      } else if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      } else if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return Number.isFinite(min) && Number.isFinite(max);
  }
};
ZodNumber.create = (params) => {
  return new ZodNumber(__spreadValues({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false
  }, processCreateParams(params)));
};
var ZodBigInt = class extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = BigInt(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.bigint) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.bigint,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            type: "bigint",
            minimum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            type: "bigint",
            maximum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (input.data % check.value !== BigInt(0)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new ZodBigInt(__spreadProps(__spreadValues({}, this._def), {
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    }));
  }
  _addCheck(check) {
    return new ZodBigInt(__spreadProps(__spreadValues({}, this._def), {
      checks: [...this._def.checks, check]
    }));
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodBigInt.create = (params) => {
  var _a2;
  return new ZodBigInt(__spreadValues({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodBigInt,
    coerce: (_a2 = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a2 !== void 0 ? _a2 : false
  }, processCreateParams(params)));
};
var ZodBoolean = class extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = Boolean(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.boolean) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodBoolean.create = (params) => {
  return new ZodBoolean(__spreadValues({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false
  }, processCreateParams(params)));
};
var ZodDate = class extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = new Date(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.date) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    if (isNaN(input.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.getTime() < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            message: check.message,
            inclusive: true,
            exact: false,
            minimum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.getTime() > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            message: check.message,
            inclusive: true,
            exact: false,
            maximum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return {
      status: status.value,
      value: new Date(input.data.getTime())
    };
  }
  _addCheck(check) {
    return new ZodDate(__spreadProps(__spreadValues({}, this._def), {
      checks: [...this._def.checks, check]
    }));
  }
  min(minDate, message) {
    return this._addCheck({
      kind: "min",
      value: minDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  max(maxDate, message) {
    return this._addCheck({
      kind: "max",
      value: maxDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max != null ? new Date(max) : null;
  }
};
ZodDate.create = (params) => {
  return new ZodDate(__spreadValues({
    checks: [],
    coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
    typeName: ZodFirstPartyTypeKind.ZodDate
  }, processCreateParams(params)));
};
var ZodSymbol = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.symbol) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.symbol,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodSymbol.create = (params) => {
  return new ZodSymbol(__spreadValues({
    typeName: ZodFirstPartyTypeKind.ZodSymbol
  }, processCreateParams(params)));
};
var ZodUndefined = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodUndefined.create = (params) => {
  return new ZodUndefined(__spreadValues({
    typeName: ZodFirstPartyTypeKind.ZodUndefined
  }, processCreateParams(params)));
};
var ZodNull = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.null) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodNull.create = (params) => {
  return new ZodNull(__spreadValues({
    typeName: ZodFirstPartyTypeKind.ZodNull
  }, processCreateParams(params)));
};
var ZodAny = class extends ZodType {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodAny.create = (params) => {
  return new ZodAny(__spreadValues({
    typeName: ZodFirstPartyTypeKind.ZodAny
  }, processCreateParams(params)));
};
var ZodUnknown = class extends ZodType {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodUnknown.create = (params) => {
  return new ZodUnknown(__spreadValues({
    typeName: ZodFirstPartyTypeKind.ZodUnknown
  }, processCreateParams(params)));
};
var ZodNever = class extends ZodType {
  _parse(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType
    });
    return INVALID;
  }
};
ZodNever.create = (params) => {
  return new ZodNever(__spreadValues({
    typeName: ZodFirstPartyTypeKind.ZodNever
  }, processCreateParams(params)));
};
var ZodVoid = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodVoid.create = (params) => {
  return new ZodVoid(__spreadValues({
    typeName: ZodFirstPartyTypeKind.ZodVoid
  }, processCreateParams(params)));
};
var ZodArray = class extends ZodType {
  _parse(input) {
    const { ctx, status } = this._processInputParams(input);
    const def = this._def;
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (def.exactLength !== null) {
      const tooBig = ctx.data.length > def.exactLength.value;
      const tooSmall = ctx.data.length < def.exactLength.value;
      if (tooBig || tooSmall) {
        addIssueToContext(ctx, {
          code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
          minimum: tooSmall ? def.exactLength.value : void 0,
          maximum: tooBig ? def.exactLength.value : void 0,
          type: "array",
          inclusive: true,
          exact: true,
          message: def.exactLength.message
        });
        status.dirty();
      }
    }
    if (def.minLength !== null) {
      if (ctx.data.length < def.minLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.minLength.message
        });
        status.dirty();
      }
    }
    if (def.maxLength !== null) {
      if (ctx.data.length > def.maxLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.maxLength.message
        });
        status.dirty();
      }
    }
    if (ctx.common.async) {
      return Promise.all([...ctx.data].map((item, i) => {
        return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
      })).then((result2) => {
        return ParseStatus.mergeArray(status, result2);
      });
    }
    const result = [...ctx.data].map((item, i) => {
      return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
    });
    return ParseStatus.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message) {
    return new ZodArray(__spreadProps(__spreadValues({}, this._def), {
      minLength: { value: minLength, message: errorUtil.toString(message) }
    }));
  }
  max(maxLength, message) {
    return new ZodArray(__spreadProps(__spreadValues({}, this._def), {
      maxLength: { value: maxLength, message: errorUtil.toString(message) }
    }));
  }
  length(len, message) {
    return new ZodArray(__spreadProps(__spreadValues({}, this._def), {
      exactLength: { value: len, message: errorUtil.toString(message) }
    }));
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodArray.create = (schema, params) => {
  return new ZodArray(__spreadValues({
    type: schema,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray
  }, processCreateParams(params)));
};
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject(__spreadProps(__spreadValues({}, schema._def), {
      shape: () => newShape
    }));
  } else if (schema instanceof ZodArray) {
    return new ZodArray(__spreadProps(__spreadValues({}, schema._def), {
      type: deepPartialify(schema.element)
    }));
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}
var ZodObject = class extends ZodType {
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const shape = this._def.shape();
    const keys = util.objectKeys(shape);
    return this._cached = { shape, keys };
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.object) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const { status, ctx } = this._processInputParams(input);
    const { shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
      for (const key in ctx.data) {
        if (!shapeKeys.includes(key)) {
          extraKeys.push(key);
        }
      }
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: { status: "valid", value: key },
        value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (this._def.catchall instanceof ZodNever) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === "passthrough") {
        for (const key of extraKeys) {
          pairs.push({
            key: { status: "valid", value: key },
            value: { status: "valid", value: ctx.data[key] }
          });
        }
      } else if (unknownKeys === "strict") {
        if (extraKeys.length > 0) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.unrecognized_keys,
            keys: extraKeys
          });
          status.dirty();
        }
      } else if (unknownKeys === "strip")
        ;
      else {
        throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
      }
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: catchall._parse(
            new ParseInputLazyPath(ctx, value, ctx.path, key)
          ),
          alwaysSet: key in ctx.data
        });
      }
    }
    if (ctx.common.async) {
      return Promise.resolve().then(() => __async(this, null, function* () {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = yield pair.key;
          syncPairs.push({
            key,
            value: yield pair.value,
            alwaysSet: pair.alwaysSet
          });
        }
        return syncPairs;
      })).then((syncPairs) => {
        return ParseStatus.mergeObjectSync(status, syncPairs);
      });
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(message) {
    errorUtil.errToObj;
    return new ZodObject(__spreadValues(__spreadProps(__spreadValues({}, this._def), {
      unknownKeys: "strict"
    }), message !== void 0 ? {
      errorMap: (issue, ctx) => {
        var _a2, _b, _c, _d;
        const defaultError = (_c = (_b = (_a2 = this._def).errorMap) === null || _b === void 0 ? void 0 : _b.call(_a2, issue, ctx).message) !== null && _c !== void 0 ? _c : ctx.defaultError;
        if (issue.code === "unrecognized_keys")
          return {
            message: (_d = errorUtil.errToObj(message).message) !== null && _d !== void 0 ? _d : defaultError
          };
        return {
          message: defaultError
        };
      }
    } : {}));
  }
  strip() {
    return new ZodObject(__spreadProps(__spreadValues({}, this._def), {
      unknownKeys: "strip"
    }));
  }
  passthrough() {
    return new ZodObject(__spreadProps(__spreadValues({}, this._def), {
      unknownKeys: "passthrough"
    }));
  }
  extend(augmentation) {
    return new ZodObject(__spreadProps(__spreadValues({}, this._def), {
      shape: () => __spreadValues(__spreadValues({}, this._def.shape()), augmentation)
    }));
  }
  merge(merging) {
    const merged = new ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => __spreadValues(__spreadValues({}, this._def.shape()), merging._def.shape()),
      typeName: ZodFirstPartyTypeKind.ZodObject
    });
    return merged;
  }
  setKey(key, schema) {
    return this.augment({ [key]: schema });
  }
  catchall(index) {
    return new ZodObject(__spreadProps(__spreadValues({}, this._def), {
      catchall: index
    }));
  }
  pick(mask) {
    const shape = {};
    util.objectKeys(mask).forEach((key) => {
      if (mask[key] && this.shape[key]) {
        shape[key] = this.shape[key];
      }
    });
    return new ZodObject(__spreadProps(__spreadValues({}, this._def), {
      shape: () => shape
    }));
  }
  omit(mask) {
    const shape = {};
    util.objectKeys(this.shape).forEach((key) => {
      if (!mask[key]) {
        shape[key] = this.shape[key];
      }
    });
    return new ZodObject(__spreadProps(__spreadValues({}, this._def), {
      shape: () => shape
    }));
  }
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    util.objectKeys(this.shape).forEach((key) => {
      const fieldSchema = this.shape[key];
      if (mask && !mask[key]) {
        newShape[key] = fieldSchema;
      } else {
        newShape[key] = fieldSchema.optional();
      }
    });
    return new ZodObject(__spreadProps(__spreadValues({}, this._def), {
      shape: () => newShape
    }));
  }
  required(mask) {
    const newShape = {};
    util.objectKeys(this.shape).forEach((key) => {
      if (mask && !mask[key]) {
        newShape[key] = this.shape[key];
      } else {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
    });
    return new ZodObject(__spreadProps(__spreadValues({}, this._def), {
      shape: () => newShape
    }));
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape));
  }
};
ZodObject.create = (shape, params) => {
  return new ZodObject(__spreadValues({
    shape: () => shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject
  }, processCreateParams(params)));
};
ZodObject.strictCreate = (shape, params) => {
  return new ZodObject(__spreadValues({
    shape: () => shape,
    unknownKeys: "strict",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject
  }, processCreateParams(params)));
};
ZodObject.lazycreate = (shape, params) => {
  return new ZodObject(__spreadValues({
    shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject
  }, processCreateParams(params)));
};
var ZodUnion = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const options = this._def.options;
    function handleResults(results) {
      for (const result of results) {
        if (result.result.status === "valid") {
          return result.result;
        }
      }
      for (const result of results) {
        if (result.result.status === "dirty") {
          ctx.common.issues.push(...result.ctx.common.issues);
          return result.result;
        }
      }
      const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return Promise.all(options.map((option) => __async(this, null, function* () {
        const childCtx = __spreadProps(__spreadValues({}, ctx), {
          common: __spreadProps(__spreadValues({}, ctx.common), {
            issues: []
          }),
          parent: null
        });
        return {
          result: yield option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          }),
          ctx: childCtx
        };
      }))).then(handleResults);
    } else {
      let dirty = void 0;
      const issues = [];
      for (const option of options) {
        const childCtx = __spreadProps(__spreadValues({}, ctx), {
          common: __spreadProps(__spreadValues({}, ctx.common), {
            issues: []
          }),
          parent: null
        });
        const result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx
        });
        if (result.status === "valid") {
          return result;
        } else if (result.status === "dirty" && !dirty) {
          dirty = { result, ctx: childCtx };
        }
        if (childCtx.common.issues.length) {
          issues.push(childCtx.common.issues);
        }
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map((issues2) => new ZodError(issues2));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
};
ZodUnion.create = (types, params) => {
  return new ZodUnion(__spreadValues({
    options: types,
    typeName: ZodFirstPartyTypeKind.ZodUnion
  }, processCreateParams(params)));
};
var getDiscriminator = (type) => {
  if (type instanceof ZodLazy) {
    return getDiscriminator(type.schema);
  } else if (type instanceof ZodEffects) {
    return getDiscriminator(type.innerType());
  } else if (type instanceof ZodLiteral) {
    return [type.value];
  } else if (type instanceof ZodEnum) {
    return type.options;
  } else if (type instanceof ZodNativeEnum) {
    return Object.keys(type.enum);
  } else if (type instanceof ZodDefault) {
    return getDiscriminator(type._def.innerType);
  } else if (type instanceof ZodUndefined) {
    return [void 0];
  } else if (type instanceof ZodNull) {
    return [null];
  } else {
    return null;
  }
};
var ZodDiscriminatedUnion = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const discriminator = this.discriminator;
    const discriminatorValue = ctx.data[discriminator];
    const option = this.optionsMap.get(discriminatorValue);
    if (!option) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [discriminator]
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return option._parseAsync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    } else {
      return option._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    }
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  static create(discriminator, options, params) {
    const optionsMap = /* @__PURE__ */ new Map();
    for (const type of options) {
      const discriminatorValues = getDiscriminator(type.shape[discriminator]);
      if (!discriminatorValues) {
        throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
      }
      for (const value of discriminatorValues) {
        if (optionsMap.has(value)) {
          throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
        }
        optionsMap.set(value, type);
      }
    }
    return new ZodDiscriminatedUnion(__spreadValues({
      typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
      discriminator,
      options,
      optionsMap
    }, processCreateParams(params)));
  }
};
function mergeValues(a, b) {
  const aType = getParsedType(a);
  const bType = getParsedType(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = __spreadValues(__spreadValues({}, a), b);
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}
var ZodIntersection = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const handleParsed = (parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight)) {
        return INVALID;
      }
      const merged = mergeValues(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_intersection_types
        });
        return INVALID;
      }
      if (isDirty(parsedLeft) || isDirty(parsedRight)) {
        status.dirty();
      }
      return { status: status.value, value: merged.data };
    };
    if (ctx.common.async) {
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        })
      ]).then(([left, right]) => handleParsed(left, right));
    } else {
      return handleParsed(this._def.left._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }), this._def.right._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }));
    }
  }
};
ZodIntersection.create = (left, right, params) => {
  return new ZodIntersection(__spreadValues({
    left,
    right,
    typeName: ZodFirstPartyTypeKind.ZodIntersection
  }, processCreateParams(params)));
};
var ZodTuple = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (ctx.data.length < this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      return INVALID;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      status.dirty();
    }
    const items = [...ctx.data].map((item, itemIndex) => {
      const schema = this._def.items[itemIndex] || this._def.rest;
      if (!schema)
        return null;
      return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
    }).filter((x) => !!x);
    if (ctx.common.async) {
      return Promise.all(items).then((results) => {
        return ParseStatus.mergeArray(status, results);
      });
    } else {
      return ParseStatus.mergeArray(status, items);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new ZodTuple(__spreadProps(__spreadValues({}, this._def), {
      rest
    }));
  }
};
ZodTuple.create = (schemas, params) => {
  if (!Array.isArray(schemas)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new ZodTuple(__spreadValues({
    items: schemas,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null
  }, processCreateParams(params)));
};
var ZodRecord = class extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const pairs = [];
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    for (const key in ctx.data) {
      pairs.push({
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
        value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key))
      });
    }
    if (ctx.common.async) {
      return ParseStatus.mergeObjectAsync(status, pairs);
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get element() {
    return this._def.valueType;
  }
  static create(first, second, third) {
    if (second instanceof ZodType) {
      return new ZodRecord(__spreadValues({
        keyType: first,
        valueType: second,
        typeName: ZodFirstPartyTypeKind.ZodRecord
      }, processCreateParams(third)));
    }
    return new ZodRecord(__spreadValues({
      keyType: ZodString.create(),
      valueType: first,
      typeName: ZodFirstPartyTypeKind.ZodRecord
    }, processCreateParams(second)));
  }
};
var ZodMap = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.map) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index) => {
      return {
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
        value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
      };
    });
    if (ctx.common.async) {
      const finalMap = /* @__PURE__ */ new Map();
      return Promise.resolve().then(() => __async(this, null, function* () {
        for (const pair of pairs) {
          const key = yield pair.key;
          const value = yield pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      }));
    } else {
      const finalMap = /* @__PURE__ */ new Map();
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === "aborted" || value.status === "aborted") {
          return INVALID;
        }
        if (key.status === "dirty" || value.status === "dirty") {
          status.dirty();
        }
        finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
};
ZodMap.create = (keyType, valueType, params) => {
  return new ZodMap(__spreadValues({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind.ZodMap
  }, processCreateParams(params)));
};
var ZodSet = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.set) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const def = this._def;
    if (def.minSize !== null) {
      if (ctx.data.size < def.minSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.minSize.message
        });
        status.dirty();
      }
    }
    if (def.maxSize !== null) {
      if (ctx.data.size > def.maxSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.maxSize.message
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = /* @__PURE__ */ new Set();
      for (const element of elements2) {
        if (element.status === "aborted")
          return INVALID;
        if (element.status === "dirty")
          status.dirty();
        parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
    if (ctx.common.async) {
      return Promise.all(elements).then((elements2) => finalizeSet(elements2));
    } else {
      return finalizeSet(elements);
    }
  }
  min(minSize, message) {
    return new ZodSet(__spreadProps(__spreadValues({}, this._def), {
      minSize: { value: minSize, message: errorUtil.toString(message) }
    }));
  }
  max(maxSize, message) {
    return new ZodSet(__spreadProps(__spreadValues({}, this._def), {
      maxSize: { value: maxSize, message: errorUtil.toString(message) }
    }));
  }
  size(size, message) {
    return this.min(size, message).max(size, message);
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodSet.create = (valueType, params) => {
  return new ZodSet(__spreadValues({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet
  }, processCreateParams(params)));
};
var ZodFunction = class extends ZodType {
  constructor() {
    super(...arguments);
    this.validate = this.implement;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.function) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.function,
        received: ctx.parsedType
      });
      return INVALID;
    }
    function makeArgsIssue(args, error) {
      return makeIssue({
        data: args,
        path: ctx.path,
        errorMaps: [
          ctx.common.contextualErrorMap,
          ctx.schemaErrorMap,
          getErrorMap(),
          errorMap
        ].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_arguments,
          argumentsError: error
        }
      });
    }
    function makeReturnsIssue(returns, error) {
      return makeIssue({
        data: returns,
        path: ctx.path,
        errorMaps: [
          ctx.common.contextualErrorMap,
          ctx.schemaErrorMap,
          getErrorMap(),
          errorMap
        ].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_return_type,
          returnTypeError: error
        }
      });
    }
    const params = { errorMap: ctx.common.contextualErrorMap };
    const fn = ctx.data;
    if (this._def.returns instanceof ZodPromise) {
      return OK((...args) => __async(this, null, function* () {
        const error = new ZodError([]);
        const parsedArgs = yield this._def.args.parseAsync(args, params).catch((e) => {
          error.addIssue(makeArgsIssue(args, e));
          throw error;
        });
        const result = yield fn(...parsedArgs);
        const parsedReturns = yield this._def.returns._def.type.parseAsync(result, params).catch((e) => {
          error.addIssue(makeReturnsIssue(result, e));
          throw error;
        });
        return parsedReturns;
      }));
    } else {
      return OK((...args) => {
        const parsedArgs = this._def.args.safeParse(args, params);
        if (!parsedArgs.success) {
          throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
        }
        const result = fn(...parsedArgs.data);
        const parsedReturns = this._def.returns.safeParse(result, params);
        if (!parsedReturns.success) {
          throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
        }
        return parsedReturns.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...items) {
    return new ZodFunction(__spreadProps(__spreadValues({}, this._def), {
      args: ZodTuple.create(items).rest(ZodUnknown.create())
    }));
  }
  returns(returnType) {
    return new ZodFunction(__spreadProps(__spreadValues({}, this._def), {
      returns: returnType
    }));
  }
  implement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  strictImplement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  static create(args, returns, params) {
    return new ZodFunction(__spreadValues({
      args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
      returns: returns || ZodUnknown.create(),
      typeName: ZodFirstPartyTypeKind.ZodFunction
    }, processCreateParams(params)));
  }
};
var ZodLazy = class extends ZodType {
  get schema() {
    return this._def.getter();
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const lazySchema = this._def.getter();
    return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
};
ZodLazy.create = (getter, params) => {
  return new ZodLazy(__spreadValues({
    getter,
    typeName: ZodFirstPartyTypeKind.ZodLazy
  }, processCreateParams(params)));
};
var ZodLiteral = class extends ZodType {
  _parse(input) {
    if (input.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
  get value() {
    return this._def.value;
  }
};
ZodLiteral.create = (value, params) => {
  return new ZodLiteral(__spreadValues({
    value,
    typeName: ZodFirstPartyTypeKind.ZodLiteral
  }, processCreateParams(params)));
};
function createZodEnum(values, params) {
  return new ZodEnum(__spreadValues({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum
  }, processCreateParams(params)));
}
var ZodEnum = class extends ZodType {
  _parse(input) {
    if (typeof input.data !== "string") {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (this._def.values.indexOf(input.data) === -1) {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  extract(values) {
    return ZodEnum.create(values);
  }
  exclude(values) {
    return ZodEnum.create(this.options.filter((opt) => !values.includes(opt)));
  }
};
ZodEnum.create = createZodEnum;
var ZodNativeEnum = class extends ZodType {
  _parse(input) {
    const nativeEnumValues = util.getValidEnumValues(this._def.values);
    const ctx = this._getOrReturnCtx(input);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (nativeEnumValues.indexOf(input.data) === -1) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get enum() {
    return this._def.values;
  }
};
ZodNativeEnum.create = (values, params) => {
  return new ZodNativeEnum(__spreadValues({
    values,
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum
  }, processCreateParams(params)));
};
var ZodPromise = class extends ZodType {
  unwrap() {
    return this._def.type;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(promisified.then((data) => {
      return this._def.type.parseAsync(data, {
        path: ctx.path,
        errorMap: ctx.common.contextualErrorMap
      });
    }));
  }
};
ZodPromise.create = (schema, params) => {
  return new ZodPromise(__spreadValues({
    type: schema,
    typeName: ZodFirstPartyTypeKind.ZodPromise
  }, processCreateParams(params)));
};
var ZodEffects = class extends ZodType {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const effect = this._def.effect || null;
    if (effect.type === "preprocess") {
      const processed = effect.transform(ctx.data);
      if (ctx.common.async) {
        return Promise.resolve(processed).then((processed2) => {
          return this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx
          });
        });
      } else {
        return this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx
        });
      }
    }
    const checkCtx = {
      addIssue: (arg) => {
        addIssueToContext(ctx, arg);
        if (arg.fatal) {
          status.abort();
        } else {
          status.dirty();
        }
      },
      get path() {
        return ctx.path;
      }
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect.type === "refinement") {
      const executeRefinement = (acc) => {
        const result = effect.refinement(acc, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(result);
        }
        if (result instanceof Promise) {
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        }
        return acc;
      };
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inner.status === "aborted")
          return INVALID;
        if (inner.status === "dirty")
          status.dirty();
        executeRefinement(inner.value);
        return { status: status.value, value: inner.value };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          return executeRefinement(inner.value).then(() => {
            return { status: status.value, value: inner.value };
          });
        });
      }
    }
    if (effect.type === "transform") {
      if (ctx.common.async === false) {
        const base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (!isValid(base))
          return base;
        const result = effect.transform(base.value, checkCtx);
        if (result instanceof Promise) {
          throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
        }
        return { status: status.value, value: result };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
          if (!isValid(base))
            return base;
          return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({ status: status.value, value: result }));
        });
      }
    }
    util.assertNever(effect);
  }
};
ZodEffects.create = (schema, effect, params) => {
  return new ZodEffects(__spreadValues({
    schema,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect
  }, processCreateParams(params)));
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
  return new ZodEffects(__spreadValues({
    schema,
    effect: { type: "preprocess", transform: preprocess },
    typeName: ZodFirstPartyTypeKind.ZodEffects
  }, processCreateParams(params)));
};
var ZodOptional = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.undefined) {
      return OK(void 0);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodOptional.create = (type, params) => {
  return new ZodOptional(__spreadValues({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodOptional
  }, processCreateParams(params)));
};
var ZodNullable = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.null) {
      return OK(null);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodNullable.create = (type, params) => {
  return new ZodNullable(__spreadValues({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodNullable
  }, processCreateParams(params)));
};
var ZodDefault = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    let data = ctx.data;
    if (ctx.parsedType === ZodParsedType.undefined) {
      data = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
};
ZodDefault.create = (type, params) => {
  return new ZodDefault(__spreadValues({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodDefault,
    defaultValue: typeof params.default === "function" ? params.default : () => params.default
  }, processCreateParams(params)));
};
var ZodCatch = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const newCtx = __spreadProps(__spreadValues({}, ctx), {
      common: __spreadProps(__spreadValues({}, ctx.common), {
        issues: []
      })
    });
    const result = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: __spreadValues({}, newCtx)
    });
    if (isAsync(result)) {
      return result.then((result2) => {
        return {
          status: "valid",
          value: result2.status === "valid" ? result2.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        };
      });
    } else {
      return {
        status: "valid",
        value: result.status === "valid" ? result.value : this._def.catchValue({
          get error() {
            return new ZodError(newCtx.common.issues);
          },
          input: newCtx.data
        })
      };
    }
  }
  removeCatch() {
    return this._def.innerType;
  }
};
ZodCatch.create = (type, params) => {
  return new ZodCatch(__spreadValues({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodCatch,
    catchValue: typeof params.catch === "function" ? params.catch : () => params.catch
  }, processCreateParams(params)));
};
var ZodNaN = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.nan) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
};
ZodNaN.create = (params) => {
  return new ZodNaN(__spreadValues({
    typeName: ZodFirstPartyTypeKind.ZodNaN
  }, processCreateParams(params)));
};
var BRAND = Symbol("zod_brand");
var ZodBranded = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
};
var ZodPipeline = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.common.async) {
      const handleAsync = () => __async(this, null, function* () {
        const inResult = yield this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted")
          return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return DIRTY(inResult.value);
        } else {
          return this._def.out._parseAsync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      });
      return handleAsync();
    } else {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
      if (inResult.status === "aborted")
        return INVALID;
      if (inResult.status === "dirty") {
        status.dirty();
        return {
          status: "dirty",
          value: inResult.value
        };
      } else {
        return this._def.out._parseSync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx
        });
      }
    }
  }
  static create(a, b) {
    return new ZodPipeline({
      in: a,
      out: b,
      typeName: ZodFirstPartyTypeKind.ZodPipeline
    });
  }
};
var custom = (check, params = {}, fatal) => {
  if (check)
    return ZodAny.create().superRefine((data, ctx) => {
      var _a2, _b;
      if (!check(data)) {
        const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
        const _fatal = (_b = (_a2 = p.fatal) !== null && _a2 !== void 0 ? _a2 : fatal) !== null && _b !== void 0 ? _b : true;
        const p2 = typeof p === "string" ? { message: p } : p;
        ctx.addIssue(__spreadProps(__spreadValues({ code: "custom" }, p2), { fatal: _fatal }));
      }
    });
  return ZodAny.create();
};
var late = {
  object: ZodObject.lazycreate
};
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
  ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
  ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
  ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
  ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
  ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
  ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
  ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
  ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
  ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
  ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
  ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
  ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
  ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
  ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
  ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
  ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
  ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
  ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
  ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
  ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
  ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
  ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
  ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
  ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
  ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
  ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
  ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
  ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
  ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
  ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
  ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
  ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
  ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
  ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
var instanceOfType = (cls, params = {
  message: `Input not instance of ${cls.name}`
}) => custom((data) => data instanceof cls, params);
var stringType = ZodString.create;
var numberType = ZodNumber.create;
var nanType = ZodNaN.create;
var bigIntType = ZodBigInt.create;
var booleanType = ZodBoolean.create;
var dateType = ZodDate.create;
var symbolType = ZodSymbol.create;
var undefinedType = ZodUndefined.create;
var nullType = ZodNull.create;
var anyType = ZodAny.create;
var unknownType = ZodUnknown.create;
var neverType = ZodNever.create;
var voidType = ZodVoid.create;
var arrayType = ZodArray.create;
var objectType = ZodObject.create;
var strictObjectType = ZodObject.strictCreate;
var unionType = ZodUnion.create;
var discriminatedUnionType = ZodDiscriminatedUnion.create;
var intersectionType = ZodIntersection.create;
var tupleType = ZodTuple.create;
var recordType = ZodRecord.create;
var mapType = ZodMap.create;
var setType = ZodSet.create;
var functionType = ZodFunction.create;
var lazyType = ZodLazy.create;
var literalType = ZodLiteral.create;
var enumType = ZodEnum.create;
var nativeEnumType = ZodNativeEnum.create;
var promiseType = ZodPromise.create;
var effectsType = ZodEffects.create;
var optionalType = ZodOptional.create;
var nullableType = ZodNullable.create;
var preprocessType = ZodEffects.createWithPreprocess;
var pipelineType = ZodPipeline.create;
var ostring = () => stringType().optional();
var onumber = () => numberType().optional();
var oboolean = () => booleanType().optional();
var coerce = {
  string: (arg) => ZodString.create(__spreadProps(__spreadValues({}, arg), { coerce: true })),
  number: (arg) => ZodNumber.create(__spreadProps(__spreadValues({}, arg), { coerce: true })),
  boolean: (arg) => ZodBoolean.create(__spreadProps(__spreadValues({}, arg), {
    coerce: true
  })),
  bigint: (arg) => ZodBigInt.create(__spreadProps(__spreadValues({}, arg), { coerce: true })),
  date: (arg) => ZodDate.create(__spreadProps(__spreadValues({}, arg), { coerce: true }))
};
var NEVER = INVALID;
var z = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  defaultErrorMap: errorMap,
  setErrorMap,
  getErrorMap,
  makeIssue,
  EMPTY_PATH,
  addIssueToContext,
  ParseStatus,
  INVALID,
  DIRTY,
  OK,
  isAborted,
  isDirty,
  isValid,
  isAsync,
  get util() {
    return util;
  },
  get objectUtil() {
    return objectUtil;
  },
  ZodParsedType,
  getParsedType,
  ZodType,
  ZodString,
  ZodNumber,
  ZodBigInt,
  ZodBoolean,
  ZodDate,
  ZodSymbol,
  ZodUndefined,
  ZodNull,
  ZodAny,
  ZodUnknown,
  ZodNever,
  ZodVoid,
  ZodArray,
  ZodObject,
  ZodUnion,
  ZodDiscriminatedUnion,
  ZodIntersection,
  ZodTuple,
  ZodRecord,
  ZodMap,
  ZodSet,
  ZodFunction,
  ZodLazy,
  ZodLiteral,
  ZodEnum,
  ZodNativeEnum,
  ZodPromise,
  ZodEffects,
  ZodTransformer: ZodEffects,
  ZodOptional,
  ZodNullable,
  ZodDefault,
  ZodCatch,
  ZodNaN,
  BRAND,
  ZodBranded,
  ZodPipeline,
  custom,
  Schema: ZodType,
  ZodSchema: ZodType,
  late,
  get ZodFirstPartyTypeKind() {
    return ZodFirstPartyTypeKind;
  },
  coerce,
  any: anyType,
  array: arrayType,
  bigint: bigIntType,
  boolean: booleanType,
  date: dateType,
  discriminatedUnion: discriminatedUnionType,
  effect: effectsType,
  "enum": enumType,
  "function": functionType,
  "instanceof": instanceOfType,
  intersection: intersectionType,
  lazy: lazyType,
  literal: literalType,
  map: mapType,
  nan: nanType,
  nativeEnum: nativeEnumType,
  never: neverType,
  "null": nullType,
  nullable: nullableType,
  number: numberType,
  object: objectType,
  oboolean,
  onumber,
  optional: optionalType,
  ostring,
  pipeline: pipelineType,
  preprocess: preprocessType,
  promise: promiseType,
  record: recordType,
  set: setType,
  strictObject: strictObjectType,
  string: stringType,
  symbol: symbolType,
  transformer: effectsType,
  tuple: tupleType,
  "undefined": undefinedType,
  union: unionType,
  unknown: unknownType,
  "void": voidType,
  NEVER,
  ZodIssueCode,
  quotelessJson,
  ZodError
});

// ../../schemas/features/blocks/baseSchemas.ts
var blockBaseSchema = z.object({
  id: z.string(),
  groupId: z.string(),
  outgoingEdgeId: z.string().optional()
});
var optionBaseSchema = z.object({
  variableId: z.string().optional()
});
var credentialsBaseSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  workspaceId: z.string(),
  name: z.string(),
  iv: z.string()
});

// ../../schemas/features/blocks/bubbles/audio.ts
var audioBubbleContentSchema = z.object({
  url: z.string().optional()
});
var audioBubbleBlockSchema = blockBaseSchema.merge(
  z.object({
    type: z.enum(["audio" /* AUDIO */]),
    content: audioBubbleContentSchema
  })
);

// ../../schemas/features/utils.ts
var variableStringSchema = z.custom(
  (val) => /^{{.+}}$/g.test(val)
);

// ../../schemas/features/blocks/bubbles/embed.ts
var embedBubbleContentSchema = z.object({
  url: z.string().optional(),
  height: z.number().or(variableStringSchema)
});
var embedBubbleBlockSchema = blockBaseSchema.merge(
  z.object({
    type: z.enum(["embed" /* EMBED */]),
    content: embedBubbleContentSchema
  })
);

// ../../schemas/features/blocks/bubbles/image.ts
var imageBubbleContentSchema = z.object({
  url: z.string().optional(),
  clickLink: z.object({
    url: z.string().optional(),
    alt: z.string().optional()
  }).optional()
});
var imageBubbleBlockSchema = blockBaseSchema.merge(
  z.object({
    type: z.enum(["image" /* IMAGE */]),
    content: imageBubbleContentSchema
  })
);

// ../../schemas/features/blocks/bubbles/text.ts
var textBubbleContentSchema = z.object({
  html: z.string().optional(),
  richText: z.array(z.any()),
  plainText: z.string().optional()
});
var textBubbleBlockSchema = blockBaseSchema.merge(
  z.object({
    type: z.enum(["text" /* TEXT */]),
    content: textBubbleContentSchema
  })
);

// ../../schemas/features/blocks/bubbles/video/enums.ts
var VideoBubbleContentType = /* @__PURE__ */ ((VideoBubbleContentType2) => {
  VideoBubbleContentType2["URL"] = "url";
  VideoBubbleContentType2["YOUTUBE"] = "youtube";
  VideoBubbleContentType2["VIMEO"] = "vimeo";
  return VideoBubbleContentType2;
})(VideoBubbleContentType || {});

// ../../schemas/features/blocks/bubbles/video/schemas.ts
var videoBubbleContentSchema = z.object({
  url: z.string().optional(),
  id: z.string().optional(),
  type: z.nativeEnum(VideoBubbleContentType).optional()
});
var videoBubbleBlockSchema = blockBaseSchema.merge(
  z.object({
    type: z.enum(["video" /* VIDEO */]),
    content: videoBubbleContentSchema
  })
);

// ../../schemas/features/items/baseSchemas.ts
var itemBaseSchema = z.object({
  id: z.string(),
  blockId: z.string(),
  outgoingEdgeId: z.string().optional()
});

// ../../schemas/features/blocks/inputs/choice.ts
var choiceInputOptionsSchema = optionBaseSchema.merge(
  z.object({
    isMultipleChoice: z.boolean(),
    buttonLabel: z.string(),
    dynamicVariableId: z.string().optional(),
    isSearchable: z.boolean().optional()
  })
);
var buttonItemSchema = itemBaseSchema.merge(
  z.object({
    type: z.literal(0 /* BUTTON */),
    content: z.string().optional()
  })
);
var choiceInputSchema = blockBaseSchema.merge(
  z.object({
    type: z.enum(["choice input" /* CHOICE */]),
    items: z.array(buttonItemSchema),
    options: choiceInputOptionsSchema
  })
);

// ../../schemas/features/blocks/inputs/date.ts
var dateInputOptionsSchema = optionBaseSchema.merge(
  z.object({
    labels: z.object({
      button: z.string(),
      from: z.string(),
      to: z.string()
    }),
    hasTime: z.boolean(),
    isRange: z.boolean()
  })
);
var dateInputSchema = blockBaseSchema.merge(
  z.object({
    type: z.enum(["date input" /* DATE */]),
    options: dateInputOptionsSchema
  })
);

// ../../schemas/features/blocks/inputs/text.ts
var textInputOptionsBaseSchema = z.object({
  labels: z.object({
    placeholder: z.string(),
    button: z.string()
  })
});
var textInputOptionsSchema = textInputOptionsBaseSchema.merge(optionBaseSchema).merge(
  z.object({
    isLong: z.boolean()
  })
);
var textInputSchema = blockBaseSchema.merge(
  z.object({
    type: z.enum(["text input" /* TEXT */]),
    options: textInputOptionsSchema
  })
);

// ../../schemas/features/blocks/inputs/email.ts
var emailInputOptionsSchema = optionBaseSchema.merge(textInputOptionsBaseSchema).merge(
  z.object({
    retryMessageContent: z.string()
  })
);
var emailInputSchema = blockBaseSchema.merge(
  z.object({
    type: z.enum(["email input" /* EMAIL */]),
    options: emailInputOptionsSchema
  })
);

// ../../schemas/features/blocks/inputs/file.ts
var fileInputOptionsSchema = optionBaseSchema.merge(
  z.object({
    isRequired: z.boolean().optional(),
    isMultipleAllowed: z.boolean(),
    labels: z.object({
      placeholder: z.string(),
      button: z.string(),
      clear: z.string().optional(),
      skip: z.string().optional()
    }),
    sizeLimit: z.number().optional()
  })
);
var fileInputStepSchema = blockBaseSchema.merge(
  z.object({
    type: z.literal("file input" /* FILE */),
    options: fileInputOptionsSchema
  })
);
var defaultFileInputOptions = {
  isRequired: true,
  isMultipleAllowed: false,
  labels: {
    placeholder: `<strong>
      Click to upload
    </strong> or drag and drop<br>
    (size limit: 10MB)`,
    button: "Upload",
    clear: "Clear",
    skip: "Skip"
  }
};

// ../../schemas/features/blocks/inputs/number.ts
var numberInputOptionsSchema = optionBaseSchema.merge(textInputOptionsBaseSchema).merge(
  z.object({
    min: z.number().optional(),
    max: z.number().optional(),
    step: z.number().optional()
  })
);
var numberInputSchema = blockBaseSchema.merge(
  z.object({
    type: z.enum(["number input" /* NUMBER */]),
    options: numberInputOptionsSchema
  })
);

// ../../schemas/features/blocks/inputs/payment/enums.ts
var PaymentProvider = /* @__PURE__ */ ((PaymentProvider2) => {
  PaymentProvider2["STRIPE"] = "Stripe";
  return PaymentProvider2;
})(PaymentProvider || {});

// ../../schemas/features/blocks/inputs/payment/schemas.ts
var paymentInputOptionsSchema = optionBaseSchema.merge(
  z.object({
    provider: z.nativeEnum(PaymentProvider),
    labels: z.object({
      button: z.string(),
      success: z.string().optional()
    }),
    additionalInformation: z.object({
      description: z.string().optional(),
      name: z.string().optional(),
      email: z.string().optional(),
      phoneNumber: z.string().optional()
    }).optional(),
    credentialsId: z.string().optional(),
    currency: z.string(),
    amount: z.string().optional()
  })
);
var paymentInputRuntimeOptionsSchema = z.object({
  paymentIntentSecret: z.string(),
  amountLabel: z.string(),
  publicKey: z.string()
});
var paymentInputSchema = blockBaseSchema.merge(
  z.object({
    type: z.enum(["payment input" /* PAYMENT */]),
    options: paymentInputOptionsSchema
  })
);
var stripeCredentialsSchema = z.object({
  type: z.literal("stripe"),
  data: z.object({
    live: z.object({
      secretKey: z.string(),
      publicKey: z.string()
    }),
    test: z.object({
      secretKey: z.string().optional(),
      publicKey: z.string().optional()
    })
  })
}).merge(credentialsBaseSchema);
var defaultPaymentInputOptions = {
  provider: "Stripe" /* STRIPE */,
  labels: { button: "Pay", success: "Success" },
  currency: "USD"
};

// ../../schemas/features/blocks/inputs/phone.ts
var phoneNumberInputOptionsSchema = optionBaseSchema.merge(textInputOptionsBaseSchema).merge(
  z.object({
    retryMessageContent: z.string(),
    defaultCountryCode: z.string().optional()
  })
);
var phoneNumberInputBlockSchema = blockBaseSchema.merge(
  z.object({
    type: z.enum(["phone number input" /* PHONE */]),
    options: phoneNumberInputOptionsSchema
  })
);

// ../../schemas/features/blocks/inputs/rating.ts
var ratingInputOptionsSchema = optionBaseSchema.merge(
  z.object({
    buttonType: z.literal("Icons").or(z.literal("Numbers")),
    length: z.number(),
    labels: z.object({
      left: z.string().optional(),
      right: z.string().optional(),
      button: z.string()
    }),
    customIcon: z.object({
      isEnabled: z.boolean(),
      svg: z.string().optional()
    }),
    isOneClickSubmitEnabled: z.boolean().optional()
  })
);
var ratingInputBlockSchema = blockBaseSchema.merge(
  z.object({
    type: z.literal("rating input" /* RATING */),
    options: ratingInputOptionsSchema
  })
);

// ../../schemas/features/blocks/inputs/url.ts
var urlInputOptionsSchema = optionBaseSchema.merge(textInputOptionsBaseSchema).merge(
  z.object({
    retryMessageContent: z.string()
  })
);
var urlInputSchema = blockBaseSchema.merge(
  z.object({
    type: z.enum(["url input" /* URL */]),
    options: urlInputOptionsSchema
  })
);

// ../../schemas/features/blocks/integrations/chatwoot.ts
var chatwootTasks = ["Show widget", "Close widget"];
var chatwootOptionsSchema = z.object({
  task: z.enum(chatwootTasks).optional(),
  baseUrl: z.string(),
  websiteToken: z.string(),
  user: z.object({
    id: z.string().optional(),
    email: z.string().optional(),
    name: z.string().optional(),
    avatarUrl: z.string().optional(),
    phoneNumber: z.string().optional()
  }).optional()
});
var chatwootBlockSchema = blockBaseSchema.merge(
  z.object({
    options: chatwootOptionsSchema
  })
);

// ../../schemas/features/blocks/integrations/googleAnalytics.ts
var googleAnalyticsOptionsSchema = z.object({
  trackingId: z.string().optional(),
  category: z.string().optional(),
  action: z.string().optional(),
  label: z.string().optional(),
  value: z.number().or(variableStringSchema).optional(),
  sendTo: z.string().optional()
});
var googleAnalyticsBlockSchema = blockBaseSchema.merge(
  z.object({
    options: googleAnalyticsOptionsSchema
  })
);

// ../../schemas/features/blocks/logic/condition.ts
var LogicalOperator = /* @__PURE__ */ ((LogicalOperator2) => {
  LogicalOperator2["OR"] = "OR";
  LogicalOperator2["AND"] = "AND";
  return LogicalOperator2;
})(LogicalOperator || {});
var ComparisonOperators = /* @__PURE__ */ ((ComparisonOperators2) => {
  ComparisonOperators2["EQUAL"] = "Equal to";
  ComparisonOperators2["NOT_EQUAL"] = "Not equal";
  ComparisonOperators2["CONTAINS"] = "Contains";
  ComparisonOperators2["NOT_CONTAINS"] = "Does not contain";
  ComparisonOperators2["GREATER"] = "Greater than";
  ComparisonOperators2["LESS"] = "Less than";
  ComparisonOperators2["IS_SET"] = "Is set";
  ComparisonOperators2["IS_EMPTY"] = "Is empty";
  ComparisonOperators2["STARTS_WITH"] = "Starts with";
  ComparisonOperators2["ENDS_WITH"] = "Ends with";
  return ComparisonOperators2;
})(ComparisonOperators || {});
var comparisonSchema = z.object({
  id: z.string(),
  variableId: z.string().optional(),
  comparisonOperator: z.nativeEnum(ComparisonOperators).optional(),
  value: z.string().optional()
});
var conditionContentSchema = z.object({
  logicalOperator: z.nativeEnum(LogicalOperator),
  comparisons: z.array(comparisonSchema)
});
var conditionItemSchema = itemBaseSchema.merge(
  z.object({
    type: z.literal(1 /* CONDITION */),
    content: conditionContentSchema
  })
);
var conditionBlockSchema = blockBaseSchema.merge(
  z.object({
    type: z.enum(["Condition" /* CONDITION */]),
    items: z.array(conditionItemSchema)
  })
);

// ../../schemas/features/blocks/integrations/googleSheets/schemas.ts
var cellSchema = z.object({
  column: z.string().optional(),
  value: z.string().optional(),
  id: z.string()
});
var extractingCellSchema = z.object({
  column: z.string().optional(),
  id: z.string(),
  variableId: z.string().optional()
});
var googleSheetsOptionsBaseSchema = z.object({
  credentialsId: z.string().optional(),
  sheetId: z.string().optional(),
  spreadsheetId: z.string().optional()
});
var rowsFilterComparisonSchema = z.object({
  id: z.string(),
  column: z.string().optional(),
  comparisonOperator: z.nativeEnum(ComparisonOperators).optional(),
  value: z.string().optional()
});
var initialGoogleSheetsOptionsSchema = googleSheetsOptionsBaseSchema.merge(
  z.object({
    action: z.undefined()
  })
);
var googleSheetsGetOptionsSchema = googleSheetsOptionsBaseSchema.merge(
  z.object({
    action: z.enum(["Get data from sheet" /* GET */]),
    referenceCell: cellSchema.optional(),
    filter: z.object({
      comparisons: z.array(rowsFilterComparisonSchema),
      logicalOperator: z.nativeEnum(LogicalOperator)
    }).optional(),
    cellsToExtract: z.array(extractingCellSchema)
  })
);
var googleSheetsInsertRowOptionsSchema = googleSheetsOptionsBaseSchema.merge(
  z.object({
    action: z.enum(["Insert a row" /* INSERT_ROW */]),
    cellsToInsert: z.array(cellSchema)
  })
);
var googleSheetsUpdateRowOptionsSchema = googleSheetsOptionsBaseSchema.merge(
  z.object({
    action: z.enum(["Update a row" /* UPDATE_ROW */]),
    cellsToUpsert: z.array(cellSchema),
    referenceCell: cellSchema.optional()
  })
);
var googleSheetsOptionsSchema = z.discriminatedUnion("action", [
  googleSheetsGetOptionsSchema,
  googleSheetsInsertRowOptionsSchema,
  googleSheetsUpdateRowOptionsSchema,
  initialGoogleSheetsOptionsSchema
]);
var googleSheetsBlockSchema = blockBaseSchema.merge(
  z.object({
    options: googleSheetsOptionsSchema
  })
);
var googleSheetsCredentialsSchema = z.object({
  type: z.literal("google sheets"),
  data: z.object({
    refresh_token: z.string().nullish(),
    expiry_date: z.number().nullish(),
    access_token: z.string().nullish(),
    token_type: z.string().nullish(),
    id_token: z.string().nullish(),
    scope: z.string().optional()
  })
}).merge(credentialsBaseSchema);

// ../../schemas/features/blocks/integrations/webhook.ts
var variableForTestSchema = z.object({
  id: z.string(),
  variableId: z.string().optional(),
  value: z.string().optional()
});
var responseVariableMappingSchema = z.object({
  id: z.string(),
  variableId: z.string().optional(),
  bodyPath: z.string().optional()
});
var webhookOptionsSchema = z.object({
  variablesForTest: z.array(variableForTestSchema),
  responseVariableMapping: z.array(responseVariableMappingSchema),
  isAdvancedConfig: z.boolean().optional(),
  isCustomBody: z.boolean().optional()
});
var webhookBlockSchema = blockBaseSchema.merge(
  z.object({
    type: z.enum(["Webhook" /* WEBHOOK */]),
    options: webhookOptionsSchema,
    webhookId: z.string()
  })
);

// ../../schemas/features/blocks/integrations/makeCom.ts
var makeComBlockSchema = blockBaseSchema.merge(
  z.object({
    options: webhookOptionsSchema,
    webhookId: z.string()
  })
);

// ../../schemas/features/blocks/integrations/pabblyConnect.ts
var pabblyConnectBlockSchema = blockBaseSchema.merge(
  z.object({
    options: webhookOptionsSchema,
    webhookId: z.string()
  })
);

// ../../schemas/features/blocks/integrations/sendEmail.ts
var sendEmailOptionsSchema = z.object({
  credentialsId: z.string(),
  isCustomBody: z.boolean().optional(),
  isBodyCode: z.boolean().optional(),
  recipients: z.array(z.string()),
  subject: z.string().optional(),
  body: z.string().optional(),
  replyTo: z.string().optional(),
  cc: z.array(z.string()).optional(),
  bcc: z.array(z.string()).optional(),
  attachmentsVariableId: z.string().optional()
});
var sendEmailBlockSchema = blockBaseSchema.merge(
  z.object({
    options: sendEmailOptionsSchema
  })
);
var smtpCredentialsSchema = z.object({
  type: z.literal("smtp"),
  data: z.object({
    host: z.string().optional(),
    username: z.string().optional(),
    password: z.string().optional(),
    isTlsEnabled: z.boolean().optional(),
    port: z.number(),
    from: z.object({
      email: z.string().optional(),
      name: z.string().optional()
    })
  })
}).merge(credentialsBaseSchema);

// ../../schemas/features/blocks/integrations/zapier.ts
var zapierBlockSchema = blockBaseSchema.merge(
  z.object({
    options: webhookOptionsSchema,
    webhookId: z.string()
  })
);

// ../../schemas/features/blocks/logic/script.ts
var scriptOptionsSchema = z.object({
  name: z.string(),
  content: z.string().optional(),
  shouldExecuteInParentContext: z.boolean().optional()
});
var scriptBlockSchema = blockBaseSchema.merge(
  z.object({
    type: z.enum(["Code" /* SCRIPT */]),
    options: scriptOptionsSchema
  })
);

// ../../schemas/features/blocks/logic/redirect.ts
var redirectOptionsSchema = z.object({
  url: z.string().optional(),
  isNewTab: z.boolean()
});
var redirectBlockSchema = blockBaseSchema.merge(
  z.object({
    type: z.enum(["Redirect" /* REDIRECT */]),
    options: redirectOptionsSchema
  })
);

// ../../schemas/features/blocks/logic/setVariable.ts
var setVariableOptionsSchema = z.object({
  variableId: z.string().optional(),
  expressionToEvaluate: z.string().optional(),
  isCode: z.boolean().optional(),
  isExecutedOnClient: z.boolean().optional()
});
var setVariableBlockSchema = blockBaseSchema.merge(
  z.object({
    type: z.enum(["Set variable" /* SET_VARIABLE */]),
    options: setVariableOptionsSchema
  })
);

// ../../schemas/features/blocks/logic/typebotLink.ts
var typebotLinkOptionsSchema = z.object({
  typebotId: z.string().optional(),
  groupId: z.string().optional()
});
var typebotLinkBlockSchema = blockBaseSchema.merge(
  z.object({
    type: z.enum(["Typebot link" /* TYPEBOT_LINK */]),
    options: typebotLinkOptionsSchema
  })
);

// ../../schemas/features/blocks/logic/wait.ts
var waitOptionsSchema = z.object({
  secondsToWaitFor: z.string().optional()
});
var waitBlockSchema = blockBaseSchema.merge(
  z.object({
    type: z.enum(["Wait" /* WAIT */]),
    options: waitOptionsSchema
  })
);

// ../../schemas/features/blocks/logic/abTest.ts
var aItemSchema = itemBaseSchema.extend({
  type: z.literal(2 /* AB_TEST */),
  path: z.literal("a")
});
var bItemSchema = itemBaseSchema.extend({
  type: z.literal(2 /* AB_TEST */),
  path: z.literal("b")
});
var abTestBlockSchema = blockBaseSchema.merge(
  z.object({
    type: z.enum(["AB test" /* AB_TEST */]),
    items: z.tuple([aItemSchema, bItemSchema]),
    options: z.object({
      aPercent: z.number().min(0).max(100)
    })
  })
);

// ../../schemas/features/blocks/start/schemas.ts
var startBlockSchema = blockBaseSchema.merge(
  z.object({
    type: z.literal("start"),
    label: z.string()
  })
);

// ../../schemas/features/blocks/integrations/openai.ts
var openAITasks = ["Create chat completion", "Create image"];
var chatCompletionModels = [
  "gpt-4",
  "gpt-4-0314",
  "gpt-4-32k",
  "gpt-4-32k-0314",
  "gpt-3.5-turbo",
  "gpt-3.5-turbo-0301"
];
var chatCompletionMessageRoles = [
  "system",
  "user",
  "assistant"
];
var chatCompletionMessageCustomRoles = [
  "Messages sequence \u2728"
];
var chatCompletionResponseValues = [
  "Message content",
  "Total tokens"
];
var openAIBaseOptionsSchema = z.object({
  credentialsId: z.string().optional()
});
var initialOptionsSchema = z.object({
  task: z.undefined()
}).merge(openAIBaseOptionsSchema);
var chatCompletionMessageSchema = z.object({
  id: z.string(),
  role: z.enum(chatCompletionMessageRoles).optional(),
  content: z.string().optional()
});
var chatCompletionCustomMessageSchema = z.object({
  id: z.string(),
  role: z.enum(chatCompletionMessageCustomRoles),
  content: z.object({
    assistantMessagesVariableId: z.string().optional(),
    userMessagesVariableId: z.string().optional()
  }).optional()
});
var chatCompletionOptionsSchema = z.object({
  task: z.literal(openAITasks[0]),
  model: z.enum(chatCompletionModels),
  messages: z.array(
    z.union([chatCompletionMessageSchema, chatCompletionCustomMessageSchema])
  ),
  advancedSettings: z.object({
    temperature: z.number().or(variableStringSchema).optional()
  }).optional(),
  responseMapping: z.array(
    z.object({
      id: z.string(),
      valueToExtract: z.enum(chatCompletionResponseValues),
      variableId: z.string().optional()
    })
  )
}).merge(openAIBaseOptionsSchema);
var createImageOptionsSchema = z.object({
  task: z.literal(openAITasks[1]),
  prompt: z.string().optional(),
  advancedOptions: z.object({
    size: z.enum(["256x256", "512x512", "1024x1024"]).optional()
  }),
  responseMapping: z.array(
    z.object({
      id: z.string(),
      valueToExtract: z.enum(["Image URL"]),
      variableId: z.string().optional()
    })
  )
}).merge(openAIBaseOptionsSchema);
var openAIBlockSchema = blockBaseSchema.merge(
  z.object({
    type: z.enum(["OpenAI" /* OPEN_AI */]),
    options: z.discriminatedUnion("task", [
      initialOptionsSchema,
      chatCompletionOptionsSchema,
      createImageOptionsSchema
    ])
  })
);
var openAICredentialsSchema = z.object({
  type: z.literal("openai"),
  data: z.object({
    apiKey: z.string()
  })
}).merge(credentialsBaseSchema);

// ../../schemas/features/blocks/logic/jump.ts
var jumpOptionsSchema = z.object({
  groupId: z.string().optional(),
  blockId: z.string().optional()
});
var jumpBlockSchema = blockBaseSchema.merge(
  z.object({
    type: z.enum(["Jump" /* JUMP */]),
    options: jumpOptionsSchema
  })
);

// ../../schemas/features/blocks/schemas.ts
var bubbleBlockSchema = z.discriminatedUnion("type", [
  textBubbleBlockSchema,
  imageBubbleBlockSchema,
  videoBubbleBlockSchema,
  embedBubbleBlockSchema,
  audioBubbleBlockSchema
]);
var inputBlockSchema = z.discriminatedUnion("type", [
  textInputSchema,
  choiceInputSchema,
  emailInputSchema,
  numberInputSchema,
  urlInputSchema,
  phoneNumberInputBlockSchema,
  dateInputSchema,
  paymentInputSchema,
  ratingInputBlockSchema,
  fileInputStepSchema
]);
var logicBlockSchema = z.discriminatedUnion("type", [
  scriptBlockSchema,
  conditionBlockSchema,
  redirectBlockSchema,
  setVariableBlockSchema,
  typebotLinkBlockSchema,
  waitBlockSchema,
  jumpBlockSchema,
  abTestBlockSchema
]);
var integrationBlockSchema = z.discriminatedUnion("type", [
  openAIBlockSchema,
  webhookBlockSchema
]);
var blockSchema = z.union([
  startBlockSchema,
  bubbleBlockSchema,
  inputBlockSchema,
  logicBlockSchema,
  integrationBlockSchema
]);

// ../../schemas/features/typebot/settings.ts
var generalSettings = z.object({
  isBrandingEnabled: z.boolean(),
  isTypingEmulationEnabled: z.boolean().optional(),
  isInputPrefillEnabled: z.boolean().optional(),
  isHideQueryParamsEnabled: z.boolean().optional(),
  isNewResultOnRefreshEnabled: z.boolean().optional()
});
var typingEmulation = z.object({
  enabled: z.boolean(),
  speed: z.number(),
  maxDelay: z.number()
});
var metadataSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  favIconUrl: z.string().optional(),
  customHeadCode: z.string().optional(),
  googleTagManagerId: z.string().optional()
});
var settingsSchema = z.object({
  general: generalSettings,
  typingEmulation,
  metadata: metadataSchema
});

// ../../schemas/features/typebot/theme/enums.ts
var BackgroundType = /* @__PURE__ */ ((BackgroundType2) => {
  BackgroundType2["COLOR"] = "Color";
  BackgroundType2["IMAGE"] = "Image";
  BackgroundType2["NONE"] = "None";
  return BackgroundType2;
})(BackgroundType || {});

// ../../schemas/features/typebot/theme/schemas.ts
var avatarPropsSchema = z.object({
  isEnabled: z.boolean(),
  url: z.string().optional()
});
var containerColorsSchema = z.object({
  backgroundColor: z.string(),
  color: z.string()
});
var inputColorsSchema = containerColorsSchema.merge(
  z.object({
    placeholderColor: z.string()
  })
);
var chatThemeSchema = z.object({
  hostAvatar: avatarPropsSchema.optional(),
  guestAvatar: avatarPropsSchema.optional(),
  hostBubbles: containerColorsSchema,
  guestBubbles: containerColorsSchema,
  buttons: containerColorsSchema,
  inputs: inputColorsSchema,
  roundness: z.enum(["none", "medium", "large"]).optional()
});
var backgroundSchema = z.object({
  type: z.nativeEnum(BackgroundType),
  content: z.string().optional()
});
var generalThemeSchema = z.object({
  font: z.string(),
  background: backgroundSchema
});
var themeSchema = z.object({
  general: generalThemeSchema,
  chat: chatThemeSchema,
  customCss: z.string().optional()
});
var themeTemplateSchema = z.object({
  id: z.string(),
  name: z.string(),
  theme: themeSchema,
  workspaceId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
});
var defaultTheme = {
  chat: {
    hostBubbles: { backgroundColor: "#F7F8FF", color: "#303235" },
    guestBubbles: { backgroundColor: "#FF8E21", color: "#FFFFFF" },
    buttons: { backgroundColor: "#0042DA", color: "#FFFFFF" },
    inputs: {
      backgroundColor: "#FFFFFF",
      color: "#303235",
      placeholderColor: "#9095A0"
    }
  },
  general: {
    font: "Open Sans",
    background: { type: "Color" /* COLOR */, content: "#ffffff" }
  }
};

// ../../schemas/features/typebot/variable.ts
var listVariableValue = z.array(z.string().nullable());
var variableSchema = z.object({
  id: z.string(),
  name: z.string(),
  value: z.string().or(listVariableValue).nullish()
});
var variableWithValueSchema = z.object({
  id: z.string(),
  name: z.string(),
  value: z.string().or(listVariableValue)
});
var VariableWithUnknowValueSchema = z.object({
  id: z.string(),
  name: z.string(),
  value: z.unknown()
});

// ../../schemas/features/typebot/typebot.ts
var groupSchema = z.object({
  id: z.string(),
  title: z.string(),
  graphCoordinates: z.object({
    x: z.number(),
    y: z.number()
  }),
  blocks: z.array(blockSchema)
});
var sourceSchema = z.object({
  groupId: z.string(),
  blockId: z.string(),
  itemId: z.string().optional()
});
var targetSchema = z.object({
  groupId: z.string(),
  blockId: z.string().optional()
});
var edgeSchema = z.object({
  id: z.string(),
  from: sourceSchema,
  to: targetSchema
});
var resultsTablePreferencesSchema = z.object({
  columnsOrder: z.array(z.string()),
  columnsVisibility: z.record(z.string(), z.boolean()),
  columnsWidth: z.record(z.string(), z.number())
});
var typebotSchema = z.object({
  version: z.enum(["3"]).nullable(),
  id: z.string(),
  name: z.string(),
  groups: z.array(groupSchema),
  edges: z.array(edgeSchema),
  variables: z.array(variableSchema),
  theme: themeSchema,
  selectedThemeTemplateId: z.string().nullable(),
  settings: settingsSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
  icon: z.string().nullable(),
  folderId: z.string().nullable(),
  publicId: z.string().nullable(),
  customDomain: z.string().nullable(),
  workspaceId: z.string(),
  resultsTablePreferences: resultsTablePreferencesSchema.nullable(),
  isArchived: z.boolean(),
  isClosed: z.boolean()
});

// ../../schemas/features/publicTypebot.ts
var publicTypebotSchema = z.object({
  id: z.string(),
  version: z.enum(["3"]).nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  typebotId: z.string(),
  groups: z.array(groupSchema),
  edges: z.array(edgeSchema),
  variables: z.array(variableSchema),
  theme: themeSchema,
  settings: settingsSchema
});
var publicTypebotWithName = publicTypebotSchema.merge(
  typebotSchema.pick({ name: true, isArchived: true, isClosed: true })
);

// ../../schemas/features/answer.ts
var answerSchema = z.object({
  createdAt: z.date(),
  resultId: z.string(),
  blockId: z.string(),
  groupId: z.string(),
  variableId: z.string().nullable(),
  content: z.string(),
  storageUsed: z.number().nullable()
});
var answerInputSchema = answerSchema.omit({
  createdAt: true,
  resultId: true,
  variableId: true,
  storageUsed: true
}).merge(
  z.object({
    variableId: z.string().nullish(),
    storageUsed: z.number().nullish()
  })
);

// ../../schemas/features/result.ts
var resultSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  typebotId: z.string(),
  variables: z.array(variableWithValueSchema),
  isCompleted: z.boolean(),
  hasStarted: z.boolean().nullable(),
  isArchived: z.boolean().nullable()
});
var resultWithAnswersSchema = resultSchema.merge(
  z.object({
    answers: z.array(answerSchema)
  })
);
var resultWithAnswersInputSchema = resultSchema.merge(
  z.object({
    answers: z.array(answerInputSchema)
  })
);
var logSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  resultId: z.string(),
  status: z.string(),
  description: z.string(),
  details: z.string().nullable()
});

// ../../schemas/features/credentials.ts
var credentialsSchema = z.discriminatedUnion("type", [
  smtpCredentialsSchema,
  googleSheetsCredentialsSchema,
  stripeCredentialsSchema,
  openAICredentialsSchema
]);

// ../../schemas/features/chat.ts
var typebotInSessionStateSchema = publicTypebotSchema.pick({
  id: true,
  groups: true,
  edges: true,
  variables: true
});
var dynamicThemeSchema = z.object({
  hostAvatarUrl: z.string().optional(),
  guestAvatarUrl: z.string().optional()
});
var answerInSessionStateSchema = answerSchema.pick({
  content: true,
  blockId: true,
  variableId: true
});
var resultInSessionStateSchema = resultSchema.pick({
  variables: true
}).merge(
  z.object({
    answers: z.array(answerInSessionStateSchema),
    id: z.string().optional()
  })
);
var sessionStateSchema = z.object({
  typebot: typebotInSessionStateSchema,
  dynamicTheme: dynamicThemeSchema.optional(),
  linkedTypebots: z.object({
    typebots: z.array(typebotInSessionStateSchema),
    queue: z.array(z.object({ edgeId: z.string(), typebotId: z.string() }))
  }),
  currentTypebotId: z.string(),
  result: resultInSessionStateSchema,
  currentBlock: z.object({
    blockId: z.string(),
    groupId: z.string()
  }).optional()
});
var chatSessionSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  state: sessionStateSchema
});
var textMessageSchema = z.object({
  type: z.literal("text" /* TEXT */),
  content: textBubbleContentSchema
});
var imageMessageSchema = z.object({
  type: z.enum(["image" /* IMAGE */]),
  content: imageBubbleContentSchema
});
var videoMessageSchema = z.object({
  type: z.enum(["video" /* VIDEO */]),
  content: videoBubbleContentSchema
});
var audioMessageSchema = z.object({
  type: z.enum(["audio" /* AUDIO */]),
  content: audioBubbleContentSchema
});
var embedMessageSchema = z.object({
  type: z.enum(["embed" /* EMBED */]),
  content: embedBubbleContentSchema.omit({
    height: true
  }).merge(z.object({ height: z.number().optional() }))
});
var chatMessageSchema = z.object({ id: z.string() }).and(
  z.discriminatedUnion("type", [
    textMessageSchema,
    imageMessageSchema,
    videoMessageSchema,
    audioMessageSchema,
    embedMessageSchema
  ])
);
var scriptToExecuteSchema = z.object({
  content: z.string(),
  args: z.array(
    z.object({
      id: z.string(),
      value: z.string().or(z.number()).or(z.boolean()).or(listVariableValue).nullish()
    })
  )
});
var startTypebotSchema = typebotSchema.pick({
  id: true,
  groups: true,
  edges: true,
  variables: true,
  settings: true,
  theme: true
});
var startParamsSchema = z.object({
  typebot: startTypebotSchema.or(z.string()).describe(
    "Either a Typebot ID or a Typebot object. If you provide a Typebot object, it will be executed in preview mode. ([How can I find my altbot ID?](https://docs.typebot.io/api#how-to-find-my-typebotid))."
  ),
  isPreview: z.boolean().optional().describe(
    "If set to `true`, it will start a Preview session with the unpublished bot and it won't be saved in the Results tab. You need to be authenticated for this to work."
  ),
  resultId: z.string().optional().describe("Provide it if you'd like to overwrite an existing result."),
  startGroupId: z.string().optional().describe("Start chat from a specific group."),
  prefilledVariables: z.record(z.unknown()).optional().describe(
    "[More info about prefilled variables.](https://docs.typebot.io/editor/variables#prefilled-variables)"
  )
});
var sendMessageInputSchema = z.object({
  message: z.string().optional().describe(
    "The answer to the previous chat input. Do not provide it if you are starting a new chat."
  ),
  sessionId: z.string().optional().describe(
    "Session ID that you get from the initial chat request to a bot. If not provided, it will create a new session."
  ),
  startParams: startParamsSchema.optional(),
  choiceInputId: z.string().optional()
});
var runtimeOptionsSchema = paymentInputRuntimeOptionsSchema.optional();
var replyLogSchema = logSchema.pick({
  status: true,
  description: true
}).merge(z.object({ details: z.unknown().optional() }));
var clientSideActionSchema = z.object({
  lastBubbleBlockId: z.string().optional()
}).and(
  z.object({
    scriptToExecute: scriptToExecuteSchema
  }).or(
    z.object({
      redirect: redirectOptionsSchema
    })
  ).or(
    z.object({
      chatwoot: z.object({ scriptToExecute: scriptToExecuteSchema })
    })
  ).or(
    z.object({
      googleAnalytics: googleAnalyticsOptionsSchema
    })
  ).or(
    z.object({
      wait: z.object({
        secondsToWaitFor: z.number()
      })
    })
  ).or(
    z.object({
      setVariable: z.object({ scriptToExecute: scriptToExecuteSchema })
    })
  )
);
var chatReplySchema = z.object({
  messages: z.array(chatMessageSchema),
  input: inputBlockSchema.and(
    z.object({
      prefilledValue: z.string().optional(),
      runtimeOptions: runtimeOptionsSchema.optional()
    })
  ).optional(),
  clientSideActions: z.array(clientSideActionSchema).optional(),
  sessionId: z.string().optional(),
  typebot: typebotSchema.pick({ id: true, theme: true, settings: true }).optional(),
  resultId: z.string().optional(),
  dynamicTheme: dynamicThemeSchema.optional(),
  logs: z.array(replyLogSchema).optional(),
  choiceInputId: z.string().optional()
});

// ../../schemas/features/workspace.ts
import {
  Plan,
  WorkspaceRole
} from "@typebot.io/prisma";
var workspaceMemberSchema = z.object({
  workspaceId: z.string(),
  user: z.object({
    name: z.string().nullable(),
    email: z.string().nullable(),
    image: z.string().nullable()
  }),
  role: z.nativeEnum(WorkspaceRole)
});
var workspaceInvitationSchema = z.object({
  createdAt: z.date(),
  updatedAt: z.date(),
  email: z.string(),
  type: z.nativeEnum(WorkspaceRole)
});
var workspaceSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string(),
  icon: z.string().nullable(),
  plan: z.nativeEnum(Plan),
  stripeId: z.string().nullable(),
  additionalChatsIndex: z.number(),
  additionalStorageIndex: z.number(),
  chatsLimitFirstEmailSentAt: z.date().nullable(),
  chatsLimitSecondEmailSentAt: z.date().nullable(),
  storageLimitFirstEmailSentAt: z.date().nullable(),
  storageLimitSecondEmailSentAt: z.date().nullable(),
  customChatsLimit: z.number().nullable(),
  customStorageLimit: z.number().nullable(),
  customSeatsLimit: z.number().nullable(),
  isQuarantined: z.boolean()
});

// ../../schemas/features/items/schemas.ts
var itemSchema = buttonItemSchema.or(conditionItemSchema).or(aItemSchema).or(bItemSchema);

// src/features/blocks/bubbles/audio/components/AudioBubble.tsx
import { useEffect as useEffect3, useRef as useRef2, useState as useState4 } from "react";

// src/components/TypingBubble.tsx
import { jsx as jsx5, jsxs as jsxs2 } from "react/jsx-runtime";
var TypingBubble = () => /* @__PURE__ */ jsxs2("div", { className: "flex items-center", children: [
  /* @__PURE__ */ jsx5("div", { className: "w-2 h-2 mr-1 rounded-full bubble1" }),
  /* @__PURE__ */ jsx5("div", { className: "w-2 h-2 mr-1 rounded-full bubble2" }),
  /* @__PURE__ */ jsx5("div", { className: "w-2 h-2 rounded-full bubble3" })
] });

// src/features/blocks/bubbles/audio/components/AudioBubble.tsx
import { jsx as jsx6, jsxs as jsxs3 } from "react/jsx-runtime";
var showAnimationDuration = 400;
var typingDuration = 500;
var AudioBubble = ({ url, onTransitionEnd }) => {
  const { typebot, isLoading } = useTypebot();
  const audio = useRef2(null);
  const [isTyping, setIsTyping] = useState4(true);
  const [parsedUrl] = useState4(parseVariables(typebot.variables)(url));
  useEffect3(() => {
    if (!isTyping || isLoading)
      return;
    const typingTimeout = setTimeout(() => {
      setIsTyping(false);
      setTimeout(() => {
        onTransitionEnd();
      }, showAnimationDuration);
    }, typingDuration);
    return () => {
      clearTimeout(typingTimeout);
    };
  }, [isLoading, isTyping, onTransitionEnd]);
  return /* @__PURE__ */ jsx6("div", { className: "flex flex-col", children: /* @__PURE__ */ jsx6("div", { className: "flex mb-2 w-full lg:w-11/12 items-center", children: /* @__PURE__ */ jsxs3("div", { className: "flex relative z-10 items-start typebot-host-bubble", children: [
    /* @__PURE__ */ jsx6(
      "div",
      {
        className: "flex items-center absolute px-4 py-2 rounded-lg bubble-typing z-10 ",
        style: {
          width: isTyping ? "4rem" : "100%",
          height: isTyping ? "2rem" : "100%"
        },
        children: isTyping ? /* @__PURE__ */ jsx6(TypingBubble, {}) : null
      }
    ),
    /* @__PURE__ */ jsx6(
      "audio",
      {
        ref: audio,
        src: parsedUrl,
        className: "z-10 content-opacity m-2 " + (isTyping ? "opacity-0" : "opacity-100"),
        style: { height: isTyping ? "2rem" : "revert" },
        autoPlay: true,
        controls: true
      }
    )
  ] }) }) });
};

// src/features/blocks/bubbles/embed/components/EmbedBubble.tsx
import { useCallback, useEffect as useEffect4, useRef as useRef3, useState as useState5 } from "react";
import { Fragment as Fragment2, jsx as jsx7, jsxs as jsxs4 } from "react/jsx-runtime";
var showAnimationDuration2 = 400;
var EmbedBubble = ({ block, onTransitionEnd }) => {
  var _a2;
  const { typebot, isLoading } = useTypebot();
  const messageContainer = useRef3(null);
  const [isTyping, setIsTyping] = useState5(true);
  const [url] = useState5(parseVariables(typebot.variables)((_a2 = block.content) == null ? void 0 : _a2.url));
  const onTypingEnd = useCallback(() => {
    setIsTyping(false);
    setTimeout(() => {
      onTransitionEnd();
    }, showAnimationDuration2);
  }, [onTransitionEnd]);
  useEffect4(() => {
    if (!isTyping || isLoading)
      return;
    const timeout = setTimeout(() => {
      setIsTyping(false);
      onTypingEnd();
    }, 1e3);
    return () => {
      clearTimeout(timeout);
    };
  }, [isLoading, isTyping, onTypingEnd]);
  const height = block.content.height ? typeof block.content.height === "string" ? parseVariables(typebot.variables)(block.content.height) + "px" : block.content.height : "2rem";
  return /* @__PURE__ */ jsx7("div", { className: "flex flex-col w-full", ref: messageContainer, children: /* @__PURE__ */ jsx7("div", { className: "flex mb-2 w-full lg:w-11/12 items-center", children: /* @__PURE__ */ jsxs4(
    "div",
    {
      className: "flex relative z-10 items-start typebot-host-bubble w-full",
      children: [
        /* @__PURE__ */ jsx7(
          "div",
          {
            className: "flex items-center absolute px-4 py-2 rounded-lg bubble-typing z-10 ",
            style: {
              width: isTyping ? "4rem" : "100%",
              height: isTyping ? "2rem" : "100%"
            },
            children: isTyping ? /* @__PURE__ */ jsx7(TypingBubble, {}) : /* @__PURE__ */ jsx7(Fragment2, {})
          }
        ),
        /* @__PURE__ */ jsx7(
          "iframe",
          {
            id: "embed-bubble-content",
            src: url,
            className: "w-full z-20 p-4 content-opacity " + (isTyping ? "opacity-0" : "opacity-100"),
            style: {
              height: isTyping ? "2rem" : height,
              borderRadius: "15px"
            }
          }
        )
      ]
    }
  ) }) });
};

// src/features/blocks/bubbles/image/components/ImageBubble.tsx
import { useCallback as useCallback2, useEffect as useEffect5, useRef as useRef4, useState as useState6 } from "react";
import { jsx as jsx8, jsxs as jsxs5 } from "react/jsx-runtime";
var showAnimationDuration3 = 400;
var mediaLoadingFallbackTimeout = 5e3;
var ImageBubble = ({ block, onTransitionEnd }) => {
  var _a2;
  const { typebot, isLoading } = useTypebot();
  const messageContainer = useRef4(null);
  const image = useRef4(null);
  const [isTyping, setIsTyping] = useState6(true);
  const [url] = useState6(parseVariables(typebot.variables)((_a2 = block.content) == null ? void 0 : _a2.url));
  const onTypingEnd = useCallback2(() => {
    setIsTyping(false);
    setTimeout(() => {
      onTransitionEnd();
    }, showAnimationDuration3);
  }, [onTransitionEnd]);
  useEffect5(() => {
    if (!isTyping || isLoading)
      return;
    const timeout = setTimeout(() => {
      setIsTyping(false);
      onTypingEnd();
    }, mediaLoadingFallbackTimeout);
    return () => {
      clearTimeout(timeout);
    };
  }, [isLoading, isTyping, onTypingEnd]);
  useEffect5(() => {
    const currentImage = image.current;
    if (!currentImage || isLoading || !isTyping)
      return;
    currentImage.onload = () => {
      setIsTyping(false);
      onTypingEnd();
    };
    return () => {
      currentImage.onload = null;
    };
  }, [isLoading, isTyping, onTypingEnd]);
  return /* @__PURE__ */ jsx8("div", { className: "flex flex-col", ref: messageContainer, children: /* @__PURE__ */ jsx8("div", { className: "flex mb-2 w-full lg:w-11/12 items-center", children: /* @__PURE__ */ jsxs5("div", { className: "flex relative z-10 items-start typebot-host-bubble", children: [
    /* @__PURE__ */ jsx8(
      "div",
      {
        className: "flex items-center absolute px-4 py-2 rounded-lg bubble-typing z-10 ",
        style: {
          width: isTyping ? "4rem" : "100%",
          height: isTyping ? "2rem" : "100%"
        },
        children: isTyping ? /* @__PURE__ */ jsx8(TypingBubble, {}) : null
      }
    ),
    /* @__PURE__ */ jsx8(
      "img",
      {
        ref: image,
        src: url,
        className: "p-4 content-opacity z-10 w-auto rounded-lg " + (isTyping ? "opacity-0" : "opacity-100"),
        style: {
          maxHeight: "32rem",
          height: isTyping ? "2rem" : "auto",
          maxWidth: "100%"
        },
        alt: "Bubble image"
      }
    )
  ] }) }) });
};

// src/features/blocks/bubbles/textBubble/components/TextBubble.tsx
import { useCallback as useCallback3, useEffect as useEffect6, useRef as useRef5, useState as useState7 } from "react";

// src/features/blocks/bubbles/textBubble/utils/computeTypingDuration.ts
var computeTypingDuration = (bubbleContent, typingSettings) => {
  var _a2, _b;
  let wordCount = (_b = (_a2 = bubbleContent.match(/(\w+)/g)) == null ? void 0 : _a2.length) != null ? _b : 0;
  if (wordCount === 0)
    wordCount = bubbleContent.length;
  const typedWordsPerMinute = typingSettings.speed;
  let typingTimeout = typingSettings.enabled ? wordCount / typedWordsPerMinute * 6e4 : 0;
  if (typingTimeout > typingSettings.maxDelay * 1e3)
    typingTimeout = typingSettings.maxDelay * 1e3;
  return typingTimeout;
};

// src/features/blocks/bubbles/textBubble/components/TextBubble.tsx
import { jsx as jsx9, jsxs as jsxs6 } from "react/jsx-runtime";
var showAnimationDuration4 = 400;
var defaultTypingEmulation = {
  enabled: true,
  speed: 300,
  maxDelay: 1.5
};
var TextBubble = ({ block, onTransitionEnd }) => {
  var _a2;
  const { typebot, isLoading } = useTypebot();
  const messageContainer = useRef5(null);
  const [isTyping, setIsTyping] = useState7(true);
  const [content] = useState7(
    parseVariables(typebot.variables)(block.content.html)
  );
  const onTypingEnd = useCallback3(() => {
    setIsTyping(false);
    setTimeout(() => {
      onTransitionEnd();
    }, showAnimationDuration4);
  }, [onTransitionEnd]);
  useEffect6(() => {
    var _a3, _b, _c;
    if (!isTyping || isLoading)
      return;
    const typingTimeout = computeTypingDuration(
      (_a3 = block.content.plainText) != null ? _a3 : "",
      (_c = (_b = typebot.settings) == null ? void 0 : _b.typingEmulation) != null ? _c : defaultTypingEmulation
    );
    const timeout = setTimeout(() => {
      onTypingEnd();
    }, typingTimeout);
    return () => {
      clearTimeout(timeout);
    };
  }, [
    block.content.plainText,
    isLoading,
    isTyping,
    onTypingEnd,
    (_a2 = typebot.settings) == null ? void 0 : _a2.typingEmulation
  ]);
  return /* @__PURE__ */ jsx9("div", { className: "flex flex-col", ref: messageContainer, children: /* @__PURE__ */ jsx9("div", { className: "flex mb-2 w-full items-center", children: /* @__PURE__ */ jsxs6("div", { className: "flex relative items-start typebot-host-bubble", children: [
    /* @__PURE__ */ jsx9(
      "div",
      {
        className: "flex items-center absolute px-4 py-2 rounded-lg bubble-typing ",
        style: {
          width: isTyping ? "4rem" : "100%",
          height: isTyping ? "2rem" : "100%"
        },
        "data-testid": "host-bubble",
        children: isTyping ? /* @__PURE__ */ jsx9(TypingBubble, {}) : null
      }
    ),
    block.type === "text" /* TEXT */ && /* @__PURE__ */ jsx9(
      "p",
      {
        style: {
          textOverflow: "ellipsis"
        },
        className: "overflow-hidden content-opacity mx-4 my-2 whitespace-pre-wrap slate-html-container relative " + (isTyping ? "opacity-0 h-6" : "opacity-100 h-full"),
        dangerouslySetInnerHTML: {
          __html: content
        }
      }
    )
  ] }) }) });
};

// src/features/blocks/bubbles/video/components/VideoBubble.tsx
import { useCallback as useCallback4, useEffect as useEffect7, useRef as useRef6, useState as useState8 } from "react";
import { Fragment as Fragment3, jsx as jsx10, jsxs as jsxs7 } from "react/jsx-runtime";
var showAnimationDuration5 = 400;
var VideoBubble = ({ block, onTransitionEnd }) => {
  const { typebot, isLoading } = useTypebot();
  const messageContainer = useRef6(null);
  const [isTyping, setIsTyping] = useState8(true);
  const onTypingEnd = useCallback4(() => {
    setIsTyping(false);
    setTimeout(() => {
      onTransitionEnd();
    }, showAnimationDuration5);
  }, [onTransitionEnd]);
  useEffect7(() => {
    if (!isTyping || isLoading)
      return;
    const timeout = setTimeout(() => {
      setIsTyping(false);
      onTypingEnd();
    }, 1e3);
    return () => {
      clearTimeout(timeout);
    };
  }, [isLoading, isTyping, onTypingEnd]);
  return /* @__PURE__ */ jsx10("div", { className: "flex flex-col", ref: messageContainer, children: /* @__PURE__ */ jsx10("div", { className: "flex mb-2 w-full lg:w-11/12 items-center", children: /* @__PURE__ */ jsxs7("div", { className: "flex relative z-10 items-start typebot-host-bubble", children: [
    /* @__PURE__ */ jsx10(
      "div",
      {
        className: "flex items-center absolute px-4 py-2 rounded-lg bubble-typing z-10 ",
        style: {
          width: isTyping ? "4rem" : "100%",
          height: isTyping ? "2rem" : "100%"
        },
        children: isTyping ? /* @__PURE__ */ jsx10(TypingBubble, {}) : /* @__PURE__ */ jsx10(Fragment3, {})
      }
    ),
    /* @__PURE__ */ jsx10(
      VideoContent,
      {
        content: block.content,
        isTyping,
        variables: typebot.variables
      }
    )
  ] }) }) });
};
var VideoContent = ({
  content,
  isTyping,
  variables
}) => {
  const [url] = useState8(parseVariables(variables)(content == null ? void 0 : content.url));
  if (!(content == null ? void 0 : content.type))
    return /* @__PURE__ */ jsx10(Fragment3, {});
  switch (content.type) {
    case "url" /* URL */: {
      const isSafariBrowser = window.navigator.vendor.match(/apple/i);
      return /* @__PURE__ */ jsxs7(
        "video",
        {
          controls: true,
          className: "p-4 focus:outline-none w-full z-10 content-opacity rounded-md " + (isTyping ? "opacity-0" : "opacity-100"),
          style: {
            height: isTyping ? "2rem" : "auto",
            maxHeight: isSafariBrowser ? "40vh" : ""
          },
          autoPlay: true,
          children: [
            /* @__PURE__ */ jsx10("source", { src: url, type: "video/mp4" }),
            "Sorry, your browser doesn't support embedded videos."
          ]
        }
      );
    }
    case "vimeo" /* VIMEO */:
    case "youtube" /* YOUTUBE */: {
      const baseUrl = content.type === "vimeo" /* VIMEO */ ? "https://player.vimeo.com/video" : "https://www.youtube.com/embed";
      return /* @__PURE__ */ jsx10(
        "iframe",
        {
          src: `${baseUrl}/${content.id}`,
          className: "w-full p-4 content-opacity z-10 rounded-md " + (isTyping ? "opacity-0" : "opacity-100"),
          height: isTyping ? "2rem" : "200px",
          allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
          allowFullScreen: true
        }
      );
    }
  }
};

// src/components/ChatGroup/ChatBlock/bubbles/HostBubble.tsx
import { jsx as jsx11 } from "react/jsx-runtime";
var HostBubble = ({ block, onTransitionEnd }) => {
  switch (block.type) {
    case "text" /* TEXT */:
      return /* @__PURE__ */ jsx11(TextBubble, { block, onTransitionEnd });
    case "image" /* IMAGE */:
      return /* @__PURE__ */ jsx11(ImageBubble, { block, onTransitionEnd });
    case "video" /* VIDEO */:
      return /* @__PURE__ */ jsx11(VideoBubble, { block, onTransitionEnd });
    case "embed" /* EMBED */:
      return /* @__PURE__ */ jsx11(EmbedBubble, { block, onTransitionEnd });
    case "audio" /* AUDIO */:
      return /* @__PURE__ */ jsx11(
        AudioBubble,
        {
          url: block.content.url,
          onTransitionEnd
        }
      );
  }
};

// src/components/ChatGroup/ChatBlock/InputChatBlock.tsx
import { useState as useState21 } from "react";

// src/providers/AnswersProvider.tsx
import { createContext as createContext2, useContext as useContext2, useState as useState9 } from "react";
import { jsx as jsx12 } from "react/jsx-runtime";
var answersContext = createContext2({});
var AnswersProvider = ({
  children,
  resultId,
  onNewAnswer,
  onVariablesUpdated
}) => {
  const [resultValues, setResultValues] = useState9({
    answers: [],
    variables: [],
    createdAt: new Date()
  });
  const addAnswer = (existingVariables) => (answer) => {
    var _a2, _b;
    if (answer.variableId)
      updateVariables([
        {
          id: answer.variableId,
          value: answer.content,
          name: (_b = (_a2 = existingVariables.find(
            (existingVariable) => existingVariable.id === answer.variableId
          )) == null ? void 0 : _a2.name) != null ? _b : ""
        }
      ]);
    setResultValues((resultValues2) => __spreadProps(__spreadValues({}, resultValues2), {
      answers: [...resultValues2.answers, answer]
    }));
    return onNewAnswer && onNewAnswer(answer);
  };
  const updateVariables = (newVariables) => {
    const serializedNewVariables = newVariables.map((variable) => __spreadProps(__spreadValues({}, variable), {
      value: safeStringify(variable.value)
    }));
    setResultValues((resultValues2) => {
      const updatedVariables = [
        ...resultValues2.variables.filter(
          (v) => serializedNewVariables.every(
            (variable) => variable.id !== v.id || variable.name !== v.name
          )
        ),
        ...serializedNewVariables
      ].filter((variable) => isDefined(variable.value));
      if (onVariablesUpdated)
        onVariablesUpdated(updatedVariables);
      return __spreadProps(__spreadValues({}, resultValues2), {
        variables: updatedVariables
      });
    });
  };
  return /* @__PURE__ */ jsx12(
    answersContext.Provider,
    {
      value: {
        resultId,
        resultValues,
        addAnswer,
        updateVariables
      },
      children
    }
  );
};
var useAnswers = () => useContext2(answersContext);

// src/components/ChatGroup/ChatBlock/bubbles/GuestBubble.tsx
import { useState as useState10 } from "react";
import { CSSTransition as CSSTransition2 } from "react-transition-group";
import { jsx as jsx13, jsxs as jsxs8 } from "react/jsx-runtime";
var GuestBubble = ({
  message,
  showAvatar,
  avatarSrc
}) => {
  const [content] = useState10(message);
  return /* @__PURE__ */ jsx13(CSSTransition2, { classNames: "bubble", timeout: 1e3, children: /* @__PURE__ */ jsxs8(
    "div",
    {
      className: "flex justify-end mb-2 items-end",
      style: { marginLeft: "50px" },
      children: [
        /* @__PURE__ */ jsx13(
          "span",
          {
            className: "px-4 py-2 rounded-lg mr-2 whitespace-pre-wrap max-w-full typebot-guest-bubble cursor-pointer",
            "data-testid": "guest-bubble",
            children: content
          }
        ),
        showAvatar && /* @__PURE__ */ jsx13(Avatar, { avatarSrc })
      ]
    }
  ) });
};

// src/utils/helpers.ts
var isMobile = typeof window !== "undefined" && window.matchMedia("only screen and (max-width: 760px)").matches;
var _a;
var isEmbedded = typeof window !== "undefined" && window.parent && window.location !== ((_a = window.top) == null ? void 0 : _a.location);

// src/components/inputs/ShortTextInput.tsx
import React4 from "react";
import { jsx as jsx14 } from "react/jsx-runtime";
var ShortTextInput = React4.forwardRef(function ShortTextInput2(_a2, ref) {
  var _b = _a2, { onChange } = _b, props = __objRest(_b, ["onChange"]);
  return /* @__PURE__ */ jsx14(
    "input",
    __spreadValues({
      ref,
      className: "focus:outline-none bg-transparent px-4 py-4 flex-1 w-full text-input",
      type: "text",
      style: { fontSize: "16px" },
      autoFocus: !isMobile,
      onChange: (e) => onChange(e.target.value)
    }, props)
  );
});

// src/components/icons.tsx
import { jsx as jsx15 } from "react/jsx-runtime";
var SendIcon = (props) => /* @__PURE__ */ jsx15(
  "svg",
  __spreadProps(__spreadValues({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512",
    width: "19px",
    color: "white"
  }, props), {
    children: /* @__PURE__ */ jsx15("path", { d: "M476.59 227.05l-.16-.07L49.35 49.84A23.56 23.56 0 0027.14 52 24.65 24.65 0 0016 72.59v113.29a24 24 0 0019.52 23.57l232.93 43.07a4 4 0 010 7.86L35.53 303.45A24 24 0 0016 327v113.31A23.57 23.57 0 0026.59 460a23.94 23.94 0 0013.22 4 24.55 24.55 0 009.52-1.93L476.4 285.94l.19-.09a32 32 0 000-58.8z" })
  })
);

// src/components/SendButton.tsx
import { jsx as jsx16, jsxs as jsxs9 } from "react/jsx-runtime";
var SendButton = (_a2) => {
  var _b = _a2, {
    label,
    isDisabled,
    isLoading,
    disableIcon
  } = _b, props = __objRest(_b, [
    "label",
    "isDisabled",
    "isLoading",
    "disableIcon"
  ]);
  return /* @__PURE__ */ jsxs9(
    "button",
    __spreadProps(__spreadValues({
      type: "submit",
      disabled: isDisabled || isLoading
    }, props), {
      className: "py-2 px-4 justify-center font-semibold rounded-md text-white focus:outline-none flex items-center disabled:opacity-50 disabled:cursor-not-allowed disabled:brightness-100 transition-all filter hover:brightness-90 active:brightness-75 typebot-button " + props.className,
      children: [
        isLoading && /* @__PURE__ */ jsx16(Spinner, { className: "text-white" }),
        /* @__PURE__ */ jsx16("span", { className: "xs:flex " + (disableIcon ? "" : "hidden"), children: label }),
        /* @__PURE__ */ jsx16(
          SendIcon,
          {
            className: "send-icon flex " + (disableIcon ? "hidden" : "xs:hidden")
          }
        )
      ]
    })
  );
};
var Spinner = (props) => /* @__PURE__ */ jsxs9(
  "svg",
  __spreadProps(__spreadValues({}, props), {
    className: "animate-spin -ml-1 mr-3 h-5 w-5 " + props.className,
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "data-testid": "loading-spinner",
    children: [
      /* @__PURE__ */ jsx16(
        "circle",
        {
          className: "opacity-25",
          cx: "12",
          cy: "12",
          r: "10",
          stroke: "currentColor",
          strokeWidth: "4"
        }
      ),
      /* @__PURE__ */ jsx16(
        "path",
        {
          className: "opacity-75",
          fill: "currentColor",
          d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        }
      )
    ]
  })
);

// src/features/blocks/inputs/email/components/EmailInput.tsx
import { useRef as useRef7, useState as useState11 } from "react";
import { jsx as jsx17, jsxs as jsxs10 } from "react/jsx-runtime";
var EmailInput = ({
  block,
  onSubmit,
  defaultValue,
  hasGuestAvatar
}) => {
  var _a2, _b, _c, _d, _e, _f;
  const [inputValue, setInputValue] = useState11(defaultValue != null ? defaultValue : "");
  const inputRef = useRef7(null);
  const handleChange = (inputValue2) => setInputValue(inputValue2);
  const checkIfInputIsValid = () => {
    var _a3;
    return inputValue !== "" && ((_a3 = inputRef.current) == null ? void 0 : _a3.reportValidity());
  };
  const submit = () => {
    if (checkIfInputIsValid())
      onSubmit({ value: inputValue });
  };
  const submitWhenEnter = (e) => {
    if (e.key === "Enter")
      submit();
  };
  return /* @__PURE__ */ jsxs10(
    "div",
    {
      className: "flex items-end justify-between rounded-lg pr-2 typebot-input w-full",
      "data-testid": "input",
      style: {
        marginRight: hasGuestAvatar ? "50px" : "0.5rem",
        maxWidth: "350px"
      },
      onKeyDown: submitWhenEnter,
      children: [
        /* @__PURE__ */ jsx17(
          ShortTextInput,
          {
            ref: inputRef,
            value: inputValue,
            placeholder: (_c = (_b = (_a2 = block.options) == null ? void 0 : _a2.labels) == null ? void 0 : _b.placeholder) != null ? _c : "Type your email...",
            onChange: handleChange,
            type: "email",
            autoComplete: "email"
          }
        ),
        /* @__PURE__ */ jsx17(
          SendButton,
          {
            type: "button",
            label: (_f = (_e = (_d = block.options) == null ? void 0 : _d.labels) == null ? void 0 : _e.button) != null ? _f : "Send",
            isDisabled: inputValue === "",
            className: "my-2 ml-2",
            onClick: submit
          }
        )
      ]
    }
  );
};

// src/features/blocks/inputs/email/utils/validateEmail.ts
var emailRegex2 = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var validateEmail = (email) => emailRegex2.test(email);

// src/features/blocks/inputs/phone/components/PhoneInput.tsx
import { useRef as useRef8, useState as useState12 } from "react";
import ReactPhoneNumberInput from "react-phone-number-input";
import { jsx as jsx18, jsxs as jsxs11 } from "react/jsx-runtime";
var PhoneInput = ({
  block,
  onSubmit,
  defaultValue,
  hasGuestAvatar
}) => {
  var _a2, _b, _c, _d;
  const [inputValue, setInputValue] = useState12(defaultValue != null ? defaultValue : "");
  const inputRef = useRef8(null);
  const handleChange = (inputValue2) => setInputValue(inputValue2);
  const checkIfInputIsValid = () => {
    var _a3;
    return inputValue !== "" && ((_a3 = inputRef.current) == null ? void 0 : _a3.reportValidity());
  };
  const submit = () => {
    if (checkIfInputIsValid())
      onSubmit({ value: inputValue });
  };
  const submitWhenEnter = (e) => {
    if (e.key === "Enter")
      submit();
  };
  return /* @__PURE__ */ jsxs11(
    "div",
    {
      className: "flex items-end justify-between rounded-lg pr-2 typebot-input w-full",
      "data-testid": "input",
      style: {
        marginRight: hasGuestAvatar ? "50px" : "0.5rem",
        maxWidth: "350px"
      },
      onKeyDown: submitWhenEnter,
      children: [
        /* @__PURE__ */ jsx18(
          ReactPhoneNumberInput,
          {
            ref: inputRef,
            value: inputValue,
            onChange: handleChange,
            placeholder: (_a2 = block.options.labels.placeholder) != null ? _a2 : "Your phone number...",
            defaultCountry: block.options.defaultCountryCode,
            autoFocus: !isMobile
          }
        ),
        /* @__PURE__ */ jsx18(
          SendButton,
          {
            type: "button",
            label: (_d = (_c = (_b = block.options) == null ? void 0 : _b.labels) == null ? void 0 : _c.button) != null ? _d : "Send",
            isDisabled: inputValue === "",
            className: "my-2 ml-2",
            onClick: submit
          }
        )
      ]
    }
  );
};

// src/features/blocks/inputs/phone/utils/validatePhoneNumber.ts
import { isPossiblePhoneNumber } from "react-phone-number-input";
var validatePhoneNumber = (phoneNumber) => isPossiblePhoneNumber(phoneNumber);

// src/features/blocks/inputs/url/components/UrlInput.tsx
import { useRef as useRef9, useState as useState13 } from "react";
import { jsx as jsx19, jsxs as jsxs12 } from "react/jsx-runtime";
var UrlInput = ({
  block,
  onSubmit,
  defaultValue,
  hasGuestAvatar
}) => {
  var _a2, _b, _c, _d, _e, _f;
  const [inputValue, setInputValue] = useState13(defaultValue != null ? defaultValue : "");
  const inputRef = useRef9(null);
  const handleChange = (inputValue2) => {
    if (!inputValue2.startsWith("https://"))
      return inputValue2 === "https:/" ? void 0 : setInputValue(`https://${inputValue2}`);
    setInputValue(inputValue2);
  };
  const checkIfInputIsValid = () => {
    var _a3;
    return inputValue !== "" && ((_a3 = inputRef.current) == null ? void 0 : _a3.reportValidity());
  };
  const submit = () => {
    if (checkIfInputIsValid())
      onSubmit({ value: inputValue });
  };
  const submitWhenEnter = (e) => {
    if (e.key === "Enter")
      submit();
  };
  return /* @__PURE__ */ jsxs12(
    "div",
    {
      className: "flex items-end justify-between rounded-lg pr-2 typebot-input w-full",
      "data-testid": "input",
      style: {
        marginRight: hasGuestAvatar ? "50px" : "0.5rem",
        maxWidth: "350px"
      },
      onKeyDown: submitWhenEnter,
      children: [
        /* @__PURE__ */ jsx19(
          ShortTextInput,
          {
            ref: inputRef,
            value: inputValue,
            placeholder: (_c = (_b = (_a2 = block.options) == null ? void 0 : _a2.labels) == null ? void 0 : _b.placeholder) != null ? _c : "Type your URL...",
            onChange: handleChange,
            type: "url",
            autoComplete: "url"
          }
        ),
        /* @__PURE__ */ jsx19(
          SendButton,
          {
            type: "button",
            label: (_f = (_e = (_d = block.options) == null ? void 0 : _d.labels) == null ? void 0 : _e.button) != null ? _f : "Send",
            isDisabled: inputValue === "",
            className: "my-2 ml-2",
            onClick: submit
          }
        )
      ]
    }
  );
};

// src/features/blocks/inputs/url/utils/validateUrl.ts
var urlRegex = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/;
var validateUrl = (url) => urlRegex.test(url);

// src/utils/inputs.ts
var isInputValid = (inputValue, type) => {
  switch (type) {
    case "email input" /* EMAIL */:
      return validateEmail(inputValue);
    case "phone number input" /* PHONE */:
      return validatePhoneNumber(inputValue);
    case "url input" /* URL */:
      return validateUrl(inputValue);
  }
  return true;
};
var blockCanBeRetried = (block) => isInputBlock(block) && "retryMessageContent" in block.options;
var parseRetryBlock = (block, variables, createEdge) => {
  const content = parseVariables(variables)(block.options.retryMessageContent);
  const newBlockId = block.id + Math.random() * 1e3;
  const newEdge = {
    id: (Math.random() * 1e3).toString(),
    from: { blockId: newBlockId, groupId: block.groupId },
    to: { groupId: block.groupId, blockId: block.id }
  };
  createEdge(newEdge);
  return {
    groupId: block.groupId,
    id: newBlockId,
    type: "text" /* TEXT */,
    content: {
      html: `<div>${content}</div>`,
      richText: [],
      plainText: content
    },
    outgoingEdgeId: newEdge.id
  };
};

// src/components/inputs/Textarea.tsx
import React8 from "react";
import { jsx as jsx20 } from "react/jsx-runtime";
var Textarea = React8.forwardRef(function Textarea2(_a2, ref) {
  var _b = _a2, { onChange } = _b, props = __objRest(_b, ["onChange"]);
  return /* @__PURE__ */ jsx20(
    "textarea",
    __spreadValues({
      ref,
      className: "focus:outline-none bg-transparent px-4 py-4 flex-1 w-full text-input",
      rows: 6,
      "data-testid": "textarea",
      required: true,
      style: { fontSize: "16px" },
      autoFocus: !isMobile,
      onChange: (e) => onChange(e.target.value)
    }, props)
  );
});

// src/features/blocks/inputs/textInput/components/TextInput.tsx
import { useRef as useRef10, useState as useState14 } from "react";
import { jsx as jsx21, jsxs as jsxs13 } from "react/jsx-runtime";
var TextInput = ({
  block,
  onSubmit,
  defaultValue,
  hasGuestAvatar
}) => {
  var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  const [inputValue, setInputValue] = useState14(defaultValue != null ? defaultValue : "");
  const inputRef = useRef10(null);
  const isLongText = (_a2 = block.options) == null ? void 0 : _a2.isLong;
  const handleChange = (inputValue2) => setInputValue(inputValue2);
  const checkIfInputIsValid = () => {
    var _a3;
    return inputValue !== "" && ((_a3 = inputRef.current) == null ? void 0 : _a3.reportValidity());
  };
  const submit = () => {
    if (checkIfInputIsValid())
      onSubmit({ value: inputValue });
  };
  const submitWhenEnter = (e) => {
    if (isLongText)
      return;
    if (e.key === "Enter")
      submit();
  };
  return /* @__PURE__ */ jsxs13(
    "div",
    {
      className: "flex items-end justify-between rounded-lg pr-2 typebot-input w-full",
      "data-testid": "input",
      style: {
        marginRight: hasGuestAvatar ? "50px" : "0.5rem",
        maxWidth: isLongText ? void 0 : "350px"
      },
      onKeyDown: submitWhenEnter,
      children: [
        isLongText ? /* @__PURE__ */ jsx21(
          Textarea,
          {
            ref: inputRef,
            onChange: handleChange,
            value: inputValue,
            placeholder: (_d = (_c = (_b = block.options) == null ? void 0 : _b.labels) == null ? void 0 : _c.placeholder) != null ? _d : "Type your answer..."
          }
        ) : /* @__PURE__ */ jsx21(
          ShortTextInput,
          {
            ref: inputRef,
            onChange: handleChange,
            value: inputValue,
            placeholder: (_g = (_f = (_e = block.options) == null ? void 0 : _e.labels) == null ? void 0 : _f.placeholder) != null ? _g : "Type your answer..."
          }
        ),
        /* @__PURE__ */ jsx21(
          SendButton,
          {
            type: "button",
            label: (_j = (_i = (_h = block.options) == null ? void 0 : _h.labels) == null ? void 0 : _i.button) != null ? _j : "Send",
            isDisabled: inputValue === "",
            className: "my-2 ml-2",
            onClick: submit
          }
        )
      ]
    }
  );
};

// src/features/blocks/inputs/number/components/NumberInput.tsx
import { useRef as useRef11, useState as useState15 } from "react";
import { jsx as jsx22, jsxs as jsxs14 } from "react/jsx-runtime";
var NumberInput = ({
  block,
  onSubmit,
  defaultValue,
  hasGuestAvatar
}) => {
  var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  const [inputValue, setInputValue] = useState15(defaultValue != null ? defaultValue : "");
  const inputRef = useRef11(null);
  const handleChange = (inputValue2) => setInputValue(inputValue2);
  const checkIfInputIsValid = () => {
    var _a3;
    return inputValue !== "" && ((_a3 = inputRef.current) == null ? void 0 : _a3.reportValidity());
  };
  const submit = () => {
    if (checkIfInputIsValid())
      onSubmit({ value: inputValue });
  };
  const submitWhenEnter = (e) => {
    if (e.key === "Enter")
      submit();
  };
  return /* @__PURE__ */ jsxs14(
    "div",
    {
      className: "flex items-end justify-between rounded-lg pr-2 typebot-input w-full",
      "data-testid": "input",
      style: {
        marginRight: hasGuestAvatar ? "50px" : "0.5rem",
        maxWidth: "350px"
      },
      onKeyDown: submitWhenEnter,
      children: [
        /* @__PURE__ */ jsx22(
          ShortTextInput,
          {
            ref: inputRef,
            value: inputValue,
            placeholder: (_c = (_b = (_a2 = block.options) == null ? void 0 : _a2.labels) == null ? void 0 : _b.placeholder) != null ? _c : "Type your answer...",
            onChange: handleChange,
            type: "number",
            style: { appearance: "auto" },
            min: (_d = block.options) == null ? void 0 : _d.min,
            max: (_e = block.options) == null ? void 0 : _e.max,
            step: (_g = (_f = block.options) == null ? void 0 : _f.step) != null ? _g : "any"
          }
        ),
        /* @__PURE__ */ jsx22(
          SendButton,
          {
            type: "button",
            label: (_j = (_i = (_h = block.options) == null ? void 0 : _h.labels) == null ? void 0 : _i.button) != null ? _j : "Send",
            isDisabled: inputValue === "",
            className: "my-2 ml-2",
            onClick: submit
          }
        )
      ]
    }
  );
};

// src/features/blocks/inputs/date/components/DateForm.tsx
import { useState as useState16 } from "react";

// src/features/blocks/inputs/date/utils/parseReadableDate.ts
var parseReadableDate = ({
  from,
  to,
  hasTime,
  isRange
}) => {
  const currentLocale = window.navigator.language;
  const formatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: hasTime ? "2-digit" : void 0,
    minute: hasTime ? "2-digit" : void 0
  };
  const fromReadable = new Date(
    hasTime ? from : from.replace(/-/g, "/")
  ).toLocaleString(currentLocale, formatOptions);
  const toReadable = new Date(
    hasTime ? to : to.replace(/-/g, "/")
  ).toLocaleString(currentLocale, formatOptions);
  return `${fromReadable}${isRange ? ` to ${toReadable}` : ""}`;
};

// src/features/blocks/inputs/date/components/DateForm.tsx
import { jsx as jsx23, jsxs as jsxs15 } from "react/jsx-runtime";
var DateForm = ({
  onSubmit,
  options
}) => {
  var _a2, _b, _c;
  const { hasTime, isRange, labels } = options != null ? options : {};
  const [inputValues, setInputValues] = useState16({ from: "", to: "" });
  return /* @__PURE__ */ jsx23("div", { className: "flex flex-col w-full lg:w-4/6", children: /* @__PURE__ */ jsx23("div", { className: "flex items-center", children: /* @__PURE__ */ jsxs15(
    "form",
    {
      className: "flex justify-between rounded-lg typebot-input pr-2 items-end",
      onSubmit: (e) => {
        if (inputValues.from === "" && inputValues.to === "")
          return;
        e.preventDefault();
        onSubmit({
          value: `${inputValues.from}${isRange ? ` to ${inputValues.to}` : ""}`,
          label: parseReadableDate(__spreadProps(__spreadValues({}, inputValues), { hasTime, isRange }))
        });
      },
      children: [
        /* @__PURE__ */ jsxs15("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsxs15("div", { className: "flex items-center p-4 " + (isRange ? "pb-0" : ""), children: [
            isRange && /* @__PURE__ */ jsx23("p", { className: "font-semibold mr-2", children: (_a2 = labels == null ? void 0 : labels.from) != null ? _a2 : "From:" }),
            /* @__PURE__ */ jsx23(
              "input",
              {
                className: "focus:outline-none flex-1 w-full text-input",
                style: {
                  minHeight: "2rem",
                  minWidth: "100px",
                  fontSize: "16px"
                },
                type: hasTime ? "datetime-local" : "date",
                onChange: (e) => setInputValues(__spreadProps(__spreadValues({}, inputValues), { from: e.target.value })),
                "data-testid": "from-date"
              }
            )
          ] }),
          isRange && /* @__PURE__ */ jsxs15("div", { className: "flex items-center p-4", children: [
            isRange && /* @__PURE__ */ jsx23("p", { className: "font-semibold", children: (_b = labels == null ? void 0 : labels.to) != null ? _b : "To:" }),
            /* @__PURE__ */ jsx23(
              "input",
              {
                className: "focus:outline-none flex-1 w-full text-input ml-2",
                style: {
                  minHeight: "2rem",
                  minWidth: "100px",
                  fontSize: "16px"
                },
                type: hasTime ? "datetime-local" : "date",
                onChange: (e) => setInputValues(__spreadProps(__spreadValues({}, inputValues), { to: e.target.value })),
                "data-testid": "to-date"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx23(
          SendButton,
          {
            label: (_c = labels == null ? void 0 : labels.button) != null ? _c : "Send",
            isDisabled: inputValues.to === "" && inputValues.from === "",
            className: "my-2 ml-2"
          }
        )
      ]
    }
  ) }) });
};

// src/features/blocks/inputs/buttons/components/ChoiceForm.tsx
import { useState as useState17 } from "react";
import { jsx as jsx24, jsxs as jsxs16 } from "react/jsx-runtime";
var ChoiceForm = ({ block, onSubmit }) => {
  var _a2, _b;
  const {
    typebot: { variables }
  } = useTypebot();
  const { resultValues } = useAnswers();
  const [selectedIndices, setSelectedIndices] = useState17([]);
  const handleClick = (itemIndex) => (e) => {
    var _a3;
    e.preventDefault();
    if ((_a3 = block.options) == null ? void 0 : _a3.isMultipleChoice)
      toggleSelectedItemIndex(itemIndex);
    else
      onSubmit({
        value: parseVariables(variables)(block.items[itemIndex].content),
        itemId: block.items[itemIndex].id
      });
  };
  const toggleSelectedItemIndex = (itemIndex) => {
    const existingIndex = selectedIndices.indexOf(itemIndex);
    if (existingIndex !== -1) {
      selectedIndices.splice(existingIndex, 1);
      setSelectedIndices([...selectedIndices]);
    } else {
      setSelectedIndices([...selectedIndices, itemIndex]);
    }
  };
  const handleSubmit = () => onSubmit({
    value: selectedIndices.map(
      (itemIndex) => parseVariables(variables)(block.items[itemIndex].content)
    ).join(", ")
  });
  const isUniqueFirstButton = resultValues && resultValues.answers.length === 0 && block.items.length === 1;
  return /* @__PURE__ */ jsxs16("form", { className: "flex flex-col items-end", onSubmit: handleSubmit, children: [
    /* @__PURE__ */ jsx24("div", { className: "flex flex-wrap justify-end", children: block.items.map((item, idx) => {
      var _a3, _b2;
      return /* @__PURE__ */ jsxs16("span", { className: "relative inline-flex ml-2 mb-2", children: [
        /* @__PURE__ */ jsx24(
          "button",
          {
            role: ((_a3 = block.options) == null ? void 0 : _a3.isMultipleChoice) ? "checkbox" : "button",
            onClick: handleClick(idx),
            className: "py-2 px-4 text-left font-semibold rounded-md transition-all filter hover:brightness-90 active:brightness-75 duration-100 focus:outline-none typebot-button " + (selectedIndices.includes(idx) || !((_b2 = block.options) == null ? void 0 : _b2.isMultipleChoice) ? "" : "selectable"),
            "data-testid": "button",
            "data-itemid": item.id,
            children: parseVariables(variables)(item.content)
          }
        ),
        isUniqueFirstButton && /* @__PURE__ */ jsxs16("span", { className: "flex h-3 w-3 absolute top-0 right-0 -mt-1 -mr-1 ping", children: [
          /* @__PURE__ */ jsx24("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full brightness-225 opacity-75" }),
          /* @__PURE__ */ jsx24("span", { className: "relative inline-flex rounded-full h-3 w-3 brightness-200" })
        ] })
      ] }, item.id);
    }) }),
    /* @__PURE__ */ jsx24("div", { className: "flex", children: selectedIndices.length > 0 && /* @__PURE__ */ jsx24(
      SendButton,
      {
        label: (_b = (_a2 = block.options) == null ? void 0 : _a2.buttonLabel) != null ? _b : "Send",
        disableIcon: true
      }
    ) })
  ] });
};

// src/features/blocks/inputs/payment/components/PaymentForm/StripePaymentForm.tsx
import { useEffect as useEffect8, useState as useState18 } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// src/lib/stripe.ts
var initStripe = (document2) => new Promise((resolve) => {
  const existingScript = document2.getElementById("stripe-script");
  if (existingScript)
    return resolve();
  const script = document2.createElement("script");
  script.src = "https://js.stripe.com/v3";
  script.id = "stripe-script";
  document2.body.appendChild(script);
  script.onload = () => {
    resolve();
  };
});

// src/providers/ChatProvider.tsx
import { createContext as createContext3, useContext as useContext3 } from "react";
import { jsx as jsx25 } from "react/jsx-runtime";
var chatContext = createContext3({});
var ChatProvider = ({
  children,
  onScroll
}) => {
  const scroll2 = onScroll;
  return /* @__PURE__ */ jsx25(
    chatContext.Provider,
    {
      value: {
        scroll: scroll2
      },
      children
    }
  );
};
var useChat = () => useContext3(chatContext);

// src/features/blocks/inputs/payment/queries/createPaymentIntentQuery.ts
var createPaymentIntentQuery = ({
  apiHost,
  isPreview,
  inputOptions,
  variables
}) => sendRequest(
  {
    url: `${apiHost}/api/integrations/stripe/createPaymentIntent`,
    method: "POST",
    body: { inputOptions, isPreview, variables }
  }
);

// src/features/blocks/inputs/payment/components/PaymentForm/StripePaymentForm.tsx
import { jsx as jsx26, jsxs as jsxs17 } from "react/jsx-runtime";
var StripePaymentForm = ({ options, onSuccess }) => {
  const {
    apiHost,
    isPreview,
    typebot: { variables },
    onNewLog
  } = useTypebot();
  const [stripe, setStripe] = useState18(null);
  const [clientSecret, setClientSecret] = useState18("");
  const [amountLabel, setAmountLabel] = useState18("");
  useEffect8(() => {
    ;
    (() => __async(void 0, null, function* () {
      const { data, error } = yield createPaymentIntentQuery({
        apiHost,
        isPreview,
        variables,
        inputOptions: options
      });
      if (error)
        return onNewLog({
          status: "error",
          description: error.name + " " + error.message,
          details: error.message
        });
      if (!data || !document)
        return;
      yield initStripe(document);
      if (!(window == null ? void 0 : window.Stripe))
        return;
      setStripe(window.Stripe(data.publicKey));
      setClientSecret(data.clientSecret);
      setAmountLabel(data.amountLabel);
    }))();
  }, []);
  if (!stripe || !clientSecret)
    return /* @__PURE__ */ jsx26(Spinner, { className: "text-blue-500" });
  return /* @__PURE__ */ jsx26(Elements, { stripe, options: { clientSecret }, children: /* @__PURE__ */ jsx26(
    CheckoutForm,
    {
      onSuccess,
      clientSecret,
      amountLabel,
      options,
      variables,
      viewerHost: apiHost
    }
  ) });
};
var CheckoutForm = ({
  onSuccess,
  clientSecret,
  amountLabel,
  options,
  variables,
  viewerHost
}) => {
  const { scroll: scroll2 } = useChat();
  const [ignoreFirstPaymentIntentCall, setIgnoreFirstPaymentIntentCall] = useState18(true);
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState18();
  const [isLoading, setIsLoading] = useState18(false);
  const [isPayButtonVisible, setIsPayButtonVisible] = useState18(false);
  useEffect8(() => {
    if (!stripe || !clientSecret)
      return;
    if (ignoreFirstPaymentIntentCall)
      return setIgnoreFirstPaymentIntentCall(false);
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent == null ? void 0 : paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe, clientSecret]);
  const handleSubmit = (e) => __async(void 0, null, function* () {
    var _a2, _b, _c, _d, _e, _f;
    e.preventDefault();
    if (!stripe || !elements)
      return;
    setIsLoading(true);
    const { error, paymentIntent } = yield stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: viewerHost,
        payment_method_data: {
          billing_details: {
            name: ((_a2 = options.additionalInformation) == null ? void 0 : _a2.name) ? parseVariables(variables)((_b = options.additionalInformation) == null ? void 0 : _b.name) : void 0,
            email: ((_c = options.additionalInformation) == null ? void 0 : _c.email) ? parseVariables(variables)((_d = options.additionalInformation) == null ? void 0 : _d.email) : void 0,
            phone: ((_e = options.additionalInformation) == null ? void 0 : _e.phoneNumber) ? parseVariables(variables)(
              (_f = options.additionalInformation) == null ? void 0 : _f.phoneNumber
            ) : void 0
          }
        }
      },
      redirect: "if_required"
    });
    setIsLoading(false);
    if ((error == null ? void 0 : error.type) === "validation_error")
      return;
    if ((error == null ? void 0 : error.type) === "card_error")
      return setMessage(error.message);
    if (!error && paymentIntent.status === "succeeded")
      return onSuccess();
  });
  const showPayButton = () => {
    setIsPayButtonVisible(true);
    scroll2();
  };
  return /* @__PURE__ */ jsxs17(
    "form",
    {
      id: "payment-form",
      onSubmit: handleSubmit,
      className: "flex flex-col rounded-lg p-4 typebot-input w-full items-center",
      children: [
        /* @__PURE__ */ jsx26(
          PaymentElement,
          {
            id: "payment-element",
            className: "w-full",
            onReady: showPayButton
          }
        ),
        isPayButtonVisible && /* @__PURE__ */ jsx26(
          SendButton,
          {
            label: `${options.labels.button} ${amountLabel}`,
            isDisabled: isLoading || !stripe || !elements,
            isLoading,
            className: "mt-4 w-full max-w-lg",
            disableIcon: true
          }
        ),
        message && /* @__PURE__ */ jsx26(
          "div",
          {
            id: "payment-message",
            className: "typebot-input-error-message mt-4 text-center",
            children: message
          }
        )
      ]
    }
  );
};

// src/features/blocks/inputs/payment/components/PaymentForm/PaymentForm.tsx
import { jsx as jsx27 } from "react/jsx-runtime";
var PaymentForm = ({ onSuccess, options }) => {
  switch (options.provider) {
    case "Stripe" /* STRIPE */:
      return /* @__PURE__ */ jsx27(StripePaymentForm, { onSuccess, options });
  }
};

// src/features/blocks/inputs/rating/components/RatingForm.tsx
import { useState as useState19 } from "react";
import { jsx as jsx28, jsxs as jsxs18 } from "react/jsx-runtime";
import { createElement } from "react";
var RatingForm = ({ block, onSubmit }) => {
  var _a2, _b;
  const [rating, setRating] = useState19();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNotDefined(rating))
      return;
    onSubmit({ value: rating.toString() });
  };
  const handleClick = (rating2) => {
    if (block.options.isOneClickSubmitEnabled)
      onSubmit({ value: rating2.toString() });
    setRating(rating2);
  };
  return /* @__PURE__ */ jsxs18("form", { className: "flex flex-col", onSubmit: handleSubmit, children: [
    block.options.labels.left && /* @__PURE__ */ jsx28("span", { className: "text-sm w-full mb-2 rating-label", children: block.options.labels.left }),
    /* @__PURE__ */ jsx28("div", { className: "flex flex-wrap justify-center", children: Array.from(
      Array(
        block.options.length + (block.options.buttonType === "Numbers" ? 1 : 0)
      )
    ).map((_, idx) => /* @__PURE__ */ createElement(
      RatingButton,
      __spreadProps(__spreadValues({}, block.options), {
        key: idx,
        rating,
        idx: idx + (block.options.buttonType === "Numbers" ? 0 : 1),
        onClick: handleClick
      })
    )) }),
    block.options.labels.right && /* @__PURE__ */ jsx28("span", { className: "text-sm w-full text-right mb-2 pr-2 rating-label", children: block.options.labels.right }),
    /* @__PURE__ */ jsx28("div", { className: "flex justify-end mr-2", children: isDefined(rating) && /* @__PURE__ */ jsx28(
      SendButton,
      {
        label: (_b = (_a2 = block.options) == null ? void 0 : _a2.labels.button) != null ? _b : "Send",
        disableIcon: true
      }
    ) })
  ] });
};
var RatingButton = ({
  rating,
  idx,
  buttonType,
  customIcon,
  onClick
}) => {
  if (buttonType === "Numbers")
    return /* @__PURE__ */ jsx28(
      "button",
      {
        onClick: (e) => {
          e.preventDefault();
          onClick(idx);
        },
        className: "py-2 px-4 mr-2 mb-2 text-left font-semibold rounded-md transition-all filter hover:brightness-90 active:brightness-75 duration-100 focus:outline-none typebot-button " + (isDefined(rating) && idx <= rating ? "" : "selectable"),
        children: idx
      }
    );
  return /* @__PURE__ */ jsx28(
    "div",
    {
      className: "flex justify-center items-center rating-icon-container cursor-pointer mr-2 mb-2 " + (isDefined(rating) && idx <= rating ? "selected" : ""),
      onClick: () => onClick(idx),
      dangerouslySetInnerHTML: {
        __html: customIcon.isEnabled && !isEmpty(customIcon.svg) ? customIcon.svg : defaultIcon
      }
    }
  );
};
var defaultIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;

// src/features/blocks/inputs/fileUpload/components/FileUploadForm.tsx
import { useState as useState20 } from "react";
import { Fragment as Fragment4, jsx as jsx29, jsxs as jsxs19 } from "react/jsx-runtime";
var FileUploadForm = ({
  block: {
    id,
    options: { isMultipleAllowed, labels, sizeLimit, isRequired }
  },
  onSubmit,
  onSkip
}) => {
  var _a2, _b;
  const { isPreview, currentTypebotId } = useTypebot();
  const { resultId } = useAnswers();
  const [selectedFiles, setSelectedFiles] = useState20([]);
  const [isUploading, setIsUploading] = useState20(false);
  const [uploadProgressPercent, setUploadProgressPercent] = useState20(0);
  const [isDraggingOver, setIsDraggingOver] = useState20(false);
  const [errorMessage, setErrorMessage] = useState20();
  const handleFileChange = (e) => __async(void 0, null, function* () {
    if (!e.target.files)
      return;
    onNewFiles(e.target.files);
  });
  const onNewFiles = (files) => {
    setErrorMessage(void 0);
    const newFiles = Array.from(files);
    if (newFiles.some((file) => file.size > (sizeLimit != null ? sizeLimit : 10) * 1024 * 1024))
      return setErrorMessage(`A file is larger than ${sizeLimit != null ? sizeLimit : 10}MB`);
    if (!isMultipleAllowed && files)
      return startSingleFileUpload(newFiles[0]);
    setSelectedFiles([...selectedFiles, ...newFiles]);
  };
  const handleSubmit = (e) => __async(void 0, null, function* () {
    e.preventDefault();
    if (selectedFiles.length === 0)
      return;
    startFilesUpload(selectedFiles);
  });
  const startSingleFileUpload = (file) => __async(void 0, null, function* () {
    var _a3;
    if (isPreview)
      return onSubmit({
        label: `File uploaded`,
        value: "http://fake-upload-url.com"
      });
    setIsUploading(true);
    const urls = yield uploadFiles({
      basePath: `/api/typebots/${currentTypebotId}/blocks/${id}`,
      files: [
        {
          file,
          path: `public/results/${resultId}/${id}/${file.name}`
        }
      ]
    });
    setIsUploading(false);
    if (urls.length)
      return onSubmit({ label: `File uploaded`, value: (_a3 = urls[0]) != null ? _a3 : "" });
    setErrorMessage("An error occured while uploading the file");
  });
  const startFilesUpload = (files) => __async(void 0, null, function* () {
    if (isPreview)
      return onSubmit({
        label: `${files.length} file${files.length > 1 ? "s" : ""} uploaded`,
        value: files.map((_, idx) => `http://fake-upload-url.com/${idx}`).join(", ")
      });
    setIsUploading(true);
    const urls = yield uploadFiles({
      basePath: `/api/typebots/${currentTypebotId}/blocks/${id}`,
      files: files.map((file) => ({
        file,
        path: `public/results/${resultId}/${id}/${file.name}`
      })),
      onUploadProgress: setUploadProgressPercent
    });
    setIsUploading(false);
    setUploadProgressPercent(0);
    if (urls.length !== files.length)
      return setErrorMessage("An error occured while uploading the files");
    onSubmit({
      label: `${urls.length} file${urls.length > 1 ? "s" : ""} uploaded`,
      value: urls.join(", ")
    });
  });
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };
  const handleDragLeave = () => setIsDraggingOver(false);
  const handleDropFile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.dataTransfer.files)
      return;
    onNewFiles(e.dataTransfer.files);
  };
  const clearFiles = () => setSelectedFiles([]);
  return /* @__PURE__ */ jsxs19("form", { className: "flex flex-col w-full", onSubmit: handleSubmit, children: [
    /* @__PURE__ */ jsx29(
      "label",
      {
        htmlFor: "dropzone-file",
        className: "typebot-upload-input py-6 flex flex-col justify-center items-center w-full bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100 px-8 mb-2 " + (isDraggingOver ? "dragging-over" : ""),
        onDragOver: handleDragOver,
        onDragLeave: handleDragLeave,
        onDrop: handleDropFile,
        children: isUploading ? /* @__PURE__ */ jsx29(Fragment4, { children: selectedFiles.length === 1 ? /* @__PURE__ */ jsx29(Spinner, {}) : /* @__PURE__ */ jsx29("div", { className: "w-full bg-gray-200 rounded-full h-2.5", children: /* @__PURE__ */ jsx29(
          "div",
          {
            className: "upload-progress-bar h-2.5 rounded-full",
            style: {
              width: `${uploadProgressPercent > 0 ? uploadProgressPercent : 10}%`,
              transition: "width 150ms cubic-bezier(0.4, 0, 0.2, 1)"
            }
          }
        ) }) }) : /* @__PURE__ */ jsxs19(Fragment4, { children: [
          /* @__PURE__ */ jsxs19("div", { className: "flex flex-col justify-center items-center", children: [
            selectedFiles.length ? /* @__PURE__ */ jsxs19("span", { className: "relative", children: [
              /* @__PURE__ */ jsx29(FileIcon, {}),
              /* @__PURE__ */ jsx29(
                "div",
                {
                  className: "total-files-indicator flex items-center justify-center absolute -right-1 rounded-full px-1 h-4",
                  style: { bottom: "5px" },
                  children: selectedFiles.length
                }
              )
            ] }) : /* @__PURE__ */ jsx29(UploadIcon, {}),
            /* @__PURE__ */ jsx29(
              "p",
              {
                className: "text-sm text-gray-500 text-center",
                dangerouslySetInnerHTML: { __html: labels.placeholder }
              }
            )
          ] }),
          /* @__PURE__ */ jsx29(
            "input",
            {
              id: "dropzone-file",
              type: "file",
              className: "hidden",
              multiple: isMultipleAllowed,
              onChange: handleFileChange
            }
          )
        ] })
      }
    ),
    selectedFiles.length === 0 && isRequired === false && /* @__PURE__ */ jsx29("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx29(
      "button",
      {
        className: "py-2 px-4 justify-center font-semibold rounded-md text-white focus:outline-none flex items-center disabled:opacity-50 disabled:cursor-not-allowed disabled:brightness-100 transition-all filter hover:brightness-90 active:brightness-75 typebot-button ",
        onClick: onSkip,
        children: (_a2 = labels.skip) != null ? _a2 : defaultFileInputOptions.labels.skip
      }
    ) }),
    isMultipleAllowed && selectedFiles.length > 0 && !isUploading && /* @__PURE__ */ jsx29("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxs19("div", { className: "flex", children: [
      selectedFiles.length && /* @__PURE__ */ jsx29(
        "button",
        {
          className: "secondary-button py-2 px-4 justify-center font-semibold rounded-md text-white focus:outline-none flex items-center disabled:opacity-50 disabled:cursor-not-allowed disabled:brightness-100 transition-all filter hover:brightness-90 active:brightness-75 mr-2",
          onClick: clearFiles,
          children: (_b = labels.clear) != null ? _b : defaultFileInputOptions.labels.clear
        }
      ),
      /* @__PURE__ */ jsx29(
        SendButton,
        {
          type: "submit",
          label: labels.button === defaultFileInputOptions.labels.button ? `${labels.button} ${selectedFiles.length} file${selectedFiles.length > 1 ? "s" : ""}` : labels.button,
          disableIcon: true
        }
      )
    ] }) }),
    errorMessage && /* @__PURE__ */ jsx29("p", { className: "text-red-500 text-sm", children: errorMessage })
  ] });
};
var UploadIcon = () => /* @__PURE__ */ jsxs19(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "mb-3",
    children: [
      /* @__PURE__ */ jsx29("polyline", { points: "16 16 12 12 8 16" }),
      /* @__PURE__ */ jsx29("line", { x1: "12", y1: "12", x2: "12", y2: "21" }),
      /* @__PURE__ */ jsx29("path", { d: "M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" }),
      /* @__PURE__ */ jsx29("polyline", { points: "16 16 12 12 8 16" })
    ]
  }
);
var FileIcon = () => /* @__PURE__ */ jsxs19(
  "svg",
  {
    className: "mb-3",
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [
      /* @__PURE__ */ jsx29("path", { d: "M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" }),
      /* @__PURE__ */ jsx29("polyline", { points: "13 2 13 9 20 9" })
    ]
  }
);

// src/components/ChatGroup/ChatBlock/InputChatBlock.tsx
import { jsx as jsx30, jsxs as jsxs20 } from "react/jsx-runtime";
var InputChatBlock = ({
  block,
  hasAvatar,
  hasGuestAvatar,
  onTransitionEnd,
  onSkip
}) => {
  var _a2, _b, _c, _d, _e;
  const { typebot, isLoading } = useTypebot();
  const { addAnswer } = useAnswers();
  const [answer, setAnswer] = useState21();
  const [isEditting, setIsEditting] = useState21(false);
  const { variableId } = block.options;
  const defaultValue = ((_a2 = typebot.settings.general.isInputPrefillEnabled) != null ? _a2 : true) && variableId ? (_b = typebot.variables.find(
    (variable) => {
      var _a3;
      return variable.name === ((_a3 = typebot.variables.find(byId(variableId))) == null ? void 0 : _a3.name);
    }
  )) == null ? void 0 : _b.value : void 0;
  const handleSubmit = (_0) => __async(void 0, [_0], function* ({ label, value, itemId }) {
    setAnswer(label != null ? label : value);
    const isRetry = !isInputValid(value, block.type);
    if (!isRetry && addAnswer)
      yield addAnswer(typebot.variables)({
        blockId: block.id,
        groupId: block.groupId,
        content: value,
        variableId,
        uploadedFiles: block.type === "file input" /* FILE */
      });
    if (!isEditting)
      onTransitionEnd({ label, value, itemId }, isRetry);
    setIsEditting(false);
  });
  if (isLoading)
    return null;
  if (answer) {
    const avatarUrl = (_c = typebot.theme.chat.guestAvatar) == null ? void 0 : _c.url;
    return /* @__PURE__ */ jsx30(
      GuestBubble,
      {
        message: answer,
        showAvatar: (_e = (_d = typebot.theme.chat.guestAvatar) == null ? void 0 : _d.isEnabled) != null ? _e : false,
        avatarSrc: avatarUrl && parseVariables(typebot.variables)(avatarUrl)
      }
    );
  }
  return /* @__PURE__ */ jsxs20("div", { className: "flex justify-end", children: [
    hasAvatar && /* @__PURE__ */ jsx30("div", { className: "flex w-6 xs:w-10 h-6 xs:h-10 mr-2 mb-2 mt-1 flex-shrink-0 items-center" }),
    /* @__PURE__ */ jsx30(
      Input,
      {
        block,
        onSubmit: handleSubmit,
        onSkip,
        defaultValue: defaultValue == null ? void 0 : defaultValue.toString(),
        hasGuestAvatar
      }
    )
  ] });
};
var Input = ({
  block,
  onSubmit,
  onSkip,
  defaultValue,
  hasGuestAvatar
}) => {
  switch (block.type) {
    case "text input" /* TEXT */:
      return /* @__PURE__ */ jsx30(
        TextInput,
        {
          block,
          onSubmit,
          defaultValue,
          hasGuestAvatar
        }
      );
    case "number input" /* NUMBER */:
      return /* @__PURE__ */ jsx30(
        NumberInput,
        {
          block,
          onSubmit,
          defaultValue,
          hasGuestAvatar
        }
      );
    case "email input" /* EMAIL */:
      return /* @__PURE__ */ jsx30(
        EmailInput,
        {
          block,
          onSubmit,
          defaultValue,
          hasGuestAvatar
        }
      );
    case "url input" /* URL */:
      return /* @__PURE__ */ jsx30(
        UrlInput,
        {
          block,
          onSubmit,
          defaultValue,
          hasGuestAvatar
        }
      );
    case "phone number input" /* PHONE */:
      return /* @__PURE__ */ jsx30(
        PhoneInput,
        {
          block,
          onSubmit,
          defaultValue,
          hasGuestAvatar
        }
      );
    case "date input" /* DATE */:
      return /* @__PURE__ */ jsx30(DateForm, { options: block.options, onSubmit });
    case "choice input" /* CHOICE */:
      return /* @__PURE__ */ jsx30(ChoiceForm, { block, onSubmit });
    case "payment input" /* PAYMENT */:
      return /* @__PURE__ */ jsx30(
        PaymentForm,
        {
          options: block.options,
          onSuccess: () => {
            var _a2;
            return onSubmit({ value: (_a2 = block.options.labels.success) != null ? _a2 : "Success" });
          }
        }
      );
    case "rating input" /* RATING */:
      return /* @__PURE__ */ jsx30(RatingForm, { block, onSubmit });
    case "file input" /* FILE */:
      return /* @__PURE__ */ jsx30(FileUploadForm, { block, onSubmit, onSkip });
  }
};

// src/features/blocks/integrations/webhook/utils/executeWebhookBlock.ts
import { stringify } from "qs";
var executeWebhook = (_0, _1) => __async(void 0, [_0, _1], function* (block, {
  blockId,
  variables,
  updateVariableValue,
  updateVariables,
  typebotId,
  apiHost,
  resultValues,
  onNewLog,
  resultId,
  parentTypebotIds
}) {
  const params = stringify({ resultId });
  const { data, error } = yield sendRequest({
    url: `${apiHost}/api/typebots/${typebotId}/blocks/${blockId}/executeWebhook?${params}`,
    method: "POST",
    body: {
      variables,
      resultValues,
      parentTypebotIds
    }
  });
  const statusCode = data == null ? void 0 : data.statusCode.toString();
  const isError = statusCode ? (statusCode == null ? void 0 : statusCode.startsWith("4")) || (statusCode == null ? void 0 : statusCode.startsWith("5")) : true;
  onNewLog({
    status: error ? "error" : isError ? "warning" : "success",
    description: isError ? "Webhook returned an error" : "Webhook successfuly executed",
    details: JSON.stringify(error != null ? error : data, null, 2).substring(0, 1e3)
  });
  const newVariables = block.options.responseVariableMapping.reduce((newVariables2, varMapping) => {
    if (!(varMapping == null ? void 0 : varMapping.bodyPath) || !varMapping.variableId)
      return newVariables2;
    const existingVariable = variables.find(byId(varMapping.variableId));
    if (!existingVariable)
      return newVariables2;
    const func = Function(
      "data",
      `return data.${parseVariables(variables)(varMapping == null ? void 0 : varMapping.bodyPath)}`
    );
    try {
      const value = func(data);
      updateVariableValue(existingVariable == null ? void 0 : existingVariable.id, value);
      return [...newVariables2, __spreadProps(__spreadValues({}, existingVariable), { value })];
    } catch (err) {
      return newVariables2;
    }
  }, []);
  updateVariables(newVariables);
  return block.outgoingEdgeId;
});

// src/utils/executeIntegration.ts
var executeIntegration = ({
  block,
  context
}) => {
  switch (block.type) {
    case "Webhook" /* WEBHOOK */:
      return executeWebhook(block, context);
    default:
      return;
  }
};

// src/features/blocks/logic/condition/utils/executeCondition.ts
var executeCondition = (block, { typebot: { variables } }) => {
  const passedCondition = block.items.find((item) => {
    const { content } = item;
    const isConditionPassed = content.logicalOperator === "AND" /* AND */ ? content.comparisons.every(executeComparison(variables)) : content.comparisons.some(executeComparison(variables));
    return isConditionPassed;
  });
  return passedCondition ? passedCondition.outgoingEdgeId : block.outgoingEdgeId;
};
var executeComparison = (variables) => (comparison) => {
  var _a2, _b;
  if (!(comparison == null ? void 0 : comparison.variableId))
    return false;
  const inputValue = ((_b = (_a2 = variables.find((v) => v.id === comparison.variableId)) == null ? void 0 : _a2.value) != null ? _b : "").toString().trim();
  const value = parseVariables(variables)(comparison.value).trim();
  if (isNotDefined(value) || !comparison.comparisonOperator)
    return false;
  return matchComparison(inputValue, comparison.comparisonOperator, value);
};
var matchComparison = (inputValue, comparisonOperator, value) => {
  switch (comparisonOperator) {
    case "Contains" /* CONTAINS */: {
      return inputValue.toLowerCase().includes(value.toLowerCase());
    }
    case "Equal to" /* EQUAL */: {
      return inputValue === value;
    }
    case "Not equal" /* NOT_EQUAL */: {
      return inputValue !== value;
    }
    case "Greater than" /* GREATER */: {
      return parseFloat(inputValue) > parseFloat(value);
    }
    case "Less than" /* LESS */: {
      return parseFloat(inputValue) < parseFloat(value);
    }
    case "Is set" /* IS_SET */: {
      return isDefined(inputValue) && inputValue.length > 0;
    }
  }
};

// src/features/blocks/logic/redirect/utils/executeRedirect.ts
var executeRedirect = (block, { typebot: { variables } }) => {
  var _a2, _b;
  if (!((_a2 = block.options) == null ? void 0 : _a2.url))
    return { nextEdgeId: block.outgoingEdgeId };
  const formattedUrl = sanitizeUrl(parseVariables(variables)(block.options.url));
  const isEmbedded2 = window.parent && window.location !== ((_b = window.top) == null ? void 0 : _b.location);
  let newWindow = null;
  if (isEmbedded2) {
    if (!block.options.isNewTab) {
      ;
      window.top.location.href = formattedUrl;
      return { nextEdgeId: block.outgoingEdgeId };
    }
    try {
      newWindow = window.open(formattedUrl);
    } catch (err) {
      sendEventToParent({ redirectUrl: formattedUrl });
    }
  } else {
    newWindow = window.open(
      formattedUrl,
      block.options.isNewTab ? "_blank" : "_self"
    );
  }
  return {
    nextEdgeId: block.outgoingEdgeId,
    blockedPopupUrl: newWindow ? void 0 : formattedUrl
  };
};

// src/features/blocks/logic/setVariable/utils/executeSetVariable.ts
var executeSetVariable = (block, { typebot: { variables }, updateVariableValue, updateVariables }) => {
  var _a2;
  if (!((_a2 = block.options) == null ? void 0 : _a2.variableId))
    return block.outgoingEdgeId;
  const evaluatedExpression = block.options.expressionToEvaluate ? evaluateSetVariableExpression(variables)(
    block.options.expressionToEvaluate
  ) : void 0;
  const existingVariable = variables.find(byId(block.options.variableId));
  if (!existingVariable)
    return block.outgoingEdgeId;
  updateVariableValue(existingVariable.id, evaluatedExpression);
  updateVariables([__spreadProps(__spreadValues({}, existingVariable), { value: evaluatedExpression })]);
  return block.outgoingEdgeId;
};
var evaluateSetVariableExpression = (variables) => (str) => {
  const evaluating = parseVariables(variables, { fieldToParse: "id" })(
    str.includes("return ") ? str : `return ${str}`
  );
  try {
    const func = Function(...variables.map((v) => v.id), evaluating);
    return func(...variables.map((v) => parseCorrectValueType(v.value)));
  } catch (err) {
    return parseVariables(variables)(str);
  }
};

// src/features/blocks/logic/typebotLink/queries/fetchAndInjectTypebotQuery.ts
var fetchAndInjectTypebot = (_0, _1) => __async(void 0, [_0, _1], function* (block, { apiHost, injectLinkedTypebot, isPreview }) {
  const { data, error } = isPreview ? yield sendRequest(
    `/api/typebots/${block.options.typebotId}`
  ) : yield sendRequest(
    `${apiHost}/api/publicTypebots/${block.options.typebotId}`
  );
  if (!data || error)
    return;
  return injectLinkedTypebot(data.typebot);
});

// src/features/blocks/logic/typebotLink/utils/executeTypebotLink.ts
var executeTypebotLink = (block, context) => __async(void 0, null, function* () {
  var _a2, _b, _c;
  const {
    typebot,
    linkedTypebots,
    onNewLog,
    createEdge,
    setCurrentTypebotId,
    pushEdgeIdInLinkedTypebotQueue,
    pushParentTypebotId,
    currentTypebotId
  } = context;
  const linkedTypebot = block.options.typebotId === "current" ? typebot : (_a2 = [typebot, ...linkedTypebots].find(
    (typebot2) => "typebotId" in typebot2 ? typebot2.typebotId === block.options.typebotId : typebot2.id === block.options.typebotId
  )) != null ? _a2 : yield fetchAndInjectTypebot(block, context);
  if (!linkedTypebot) {
    onNewLog({
      status: "error",
      description: "Failed to link typebot",
      details: ""
    });
    return { nextEdgeId: block.outgoingEdgeId };
  }
  if (block.outgoingEdgeId)
    pushEdgeIdInLinkedTypebotQueue({
      edgeId: block.outgoingEdgeId,
      typebotId: currentTypebotId
    });
  pushParentTypebotId(currentTypebotId);
  setCurrentTypebotId(
    "typebotId" in linkedTypebot ? linkedTypebot.typebotId : linkedTypebot.id
  );
  const nextGroupId = (_c = block.options.groupId) != null ? _c : (_b = linkedTypebot.groups.find((b) => b.blocks.some((s) => s.type === "start"))) == null ? void 0 : _b.id;
  if (!nextGroupId)
    return { nextEdgeId: block.outgoingEdgeId };
  const newEdge = {
    id: (Math.random() * 1e3).toString(),
    from: { blockId: "", groupId: "" },
    to: {
      groupId: nextGroupId
    }
  };
  createEdge(newEdge);
  return {
    nextEdgeId: newEdge.id,
    linkedTypebot: __spreadProps(__spreadValues({}, linkedTypebot), {
      edges: [...linkedTypebot.edges, newEdge]
    })
  };
});

// src/features/blocks/logic/wait/utils/executeWait.ts
var executeWait = (_0, _1) => __async(void 0, [_0, _1], function* (block, { typebot: { variables } }) {
  if (!block.options.secondsToWaitFor)
    return block.outgoingEdgeId;
  const parsedSecondsToWaitFor = parseVariables(variables)(
    block.options.secondsToWaitFor
  );
  if (isNaN(parsedSecondsToWaitFor))
    return block.outgoingEdgeId;
  yield new Promise(
    (resolve) => setTimeout(resolve, parseInt(parsedSecondsToWaitFor) * 1e3)
  );
  return block.outgoingEdgeId;
});

// src/features/blocks/logic/script/executeScript.ts
var executeScript = (_0, _1) => __async(void 0, [_0, _1], function* (block, { typebot: { variables } }) {
  if (!block.options.content)
    return;
  if (block.options.shouldExecuteInParentContext && isEmbedded) {
    sendEventToParent({
      codeToExecute: parseVariables(variables)(block.options.content)
    });
  } else {
    const func = Function(
      ...variables.map((v) => v.id),
      parseVariables(variables, { fieldToParse: "id" })(block.options.content)
    );
    try {
      yield func(...variables.map((v) => parseCorrectValueType(v.value)));
    } catch (err) {
      console.error(err);
    }
  }
  return block.outgoingEdgeId;
});

// src/utils/executeLogic.ts
var executeLogic = (block, context) => __async(void 0, null, function* () {
  switch (block.type) {
    case "Set variable" /* SET_VARIABLE */:
      return { nextEdgeId: executeSetVariable(block, context) };
    case "Condition" /* CONDITION */:
      return { nextEdgeId: executeCondition(block, context) };
    case "Redirect" /* REDIRECT */:
      return executeRedirect(block, context);
    case "Code" /* SCRIPT */:
      return { nextEdgeId: yield executeScript(block, context) };
    case "Typebot link" /* TYPEBOT_LINK */:
      return executeTypebotLink(block, context);
    case "Wait" /* WAIT */:
      return { nextEdgeId: yield executeWait(block, context) };
    default:
      return {};
  }
});

// src/components/PopupBlockedToast.tsx
import { jsx as jsx31, jsxs as jsxs21 } from "react/jsx-runtime";
var PopupBlockedToast = ({ url, onLinkClick }) => {
  return /* @__PURE__ */ jsxs21(
    "div",
    {
      className: "w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow flex flex-col gap-2",
      role: "alert",
      children: [
        /* @__PURE__ */ jsx31("span", { className: "mb-1 text-sm font-semibold text-gray-900", children: "Popup blocked" }),
        /* @__PURE__ */ jsx31("div", { className: "mb-2 text-sm font-normal", children: "The bot wants to open a new tab but it was blocked by your broswer. It needs a manual approval." }),
        /* @__PURE__ */ jsx31(
          "a",
          {
            href: url,
            target: "_blank",
            className: "py-1 px-4 justify-center text-sm font-semibold rounded-md text-white focus:outline-none flex items-center disabled:opacity-50 disabled:cursor-not-allowed disabled:brightness-100 transition-all filter hover:brightness-90 active:brightness-75 typebot-button",
            rel: "noreferrer",
            onClick: onLinkClick,
            children: "Continue in new tab"
          }
        )
      ]
    }
  );
};

// src/components/ChatGroup/ChatGroup.tsx
import { Fragment as Fragment5, jsx as jsx32, jsxs as jsxs22 } from "react/jsx-runtime";
var ChatGroup = ({
  blocks,
  startBlockIndex,
  groupTitle,
  onGroupEnd,
  keepShowingHostAvatar
}) => {
  var _a2;
  const {
    currentTypebotId,
    typebot,
    updateVariableValue,
    createEdge,
    apiHost,
    isPreview,
    parentTypebotIds,
    onNewLog,
    injectLinkedTypebot,
    linkedTypebots,
    setCurrentTypebotId,
    pushEdgeIdInLinkedTypebotQueue,
    pushParentTypebotId
  } = useTypebot();
  const { resultValues, updateVariables, resultId } = useAnswers();
  const { scroll: scroll2 } = useChat();
  const [processedBlocks, setProcessedBlocks] = useState22([]);
  const [displayedChunks, setDisplayedChunks] = useState22([]);
  const [blockedPopupUrl, setBlockedPopupUrl] = useState22();
  const insertBlockInStack = (nextBlock) => {
    setProcessedBlocks([...processedBlocks, nextBlock]);
    if (isBubbleBlock(nextBlock)) {
      const lastBlockType = getLastChatBlockType(processedBlocks);
      lastBlockType && isBubbleBlockType(lastBlockType) ? setDisplayedChunks(
        displayedChunks.map(
          (c, idx) => idx === displayedChunks.length - 1 ? { bubbles: [...c.bubbles, nextBlock] } : c
        )
      ) : setDisplayedChunks([...displayedChunks, { bubbles: [nextBlock] }]);
    }
    if (isInputBlock(nextBlock)) {
      displayedChunks.length === 0 || isDefined(displayedChunks[displayedChunks.length - 1].input) ? setDisplayedChunks([
        ...displayedChunks,
        { bubbles: [], input: nextBlock }
      ]) : setDisplayedChunks(
        displayedChunks.map(
          (c, idx) => idx === displayedChunks.length - 1 ? __spreadProps(__spreadValues({}, c), { input: nextBlock }) : c
        )
      );
    }
  };
  useEffect9(() => {
    const nextBlock = blocks[startBlockIndex];
    if (nextBlock)
      insertBlockInStack(nextBlock);
  }, []);
  useEffect9(() => {
    scroll2();
    onNewBlockDisplayed();
  }, [processedBlocks]);
  const onNewBlockDisplayed = () => __async(void 0, null, function* () {
    const currentBlock = [...processedBlocks].pop();
    if (!currentBlock)
      return;
    if (isLogicBlock(currentBlock)) {
      const { nextEdgeId, linkedTypebot, blockedPopupUrl: blockedPopupUrl2 } = yield executeLogic(
        currentBlock,
        {
          isPreview,
          apiHost,
          typebot,
          linkedTypebots,
          updateVariableValue,
          updateVariables,
          injectLinkedTypebot,
          onNewLog,
          createEdge,
          setCurrentTypebotId,
          pushEdgeIdInLinkedTypebotQueue,
          currentTypebotId,
          pushParentTypebotId
        }
      );
      if (blockedPopupUrl2)
        setBlockedPopupUrl(blockedPopupUrl2);
      const isRedirecting = currentBlock.type === "Redirect" /* REDIRECT */ && currentBlock.options.isNewTab === false;
      if (isRedirecting)
        return;
      nextEdgeId ? onGroupEnd({ edgeId: nextEdgeId, updatedTypebot: linkedTypebot }) : displayNextBlock();
    }
    if (isIntegrationBlock(currentBlock)) {
      const nextEdgeId = yield executeIntegration({
        block: currentBlock,
        context: {
          apiHost,
          typebotId: currentTypebotId,
          groupId: currentBlock.groupId,
          blockId: currentBlock.id,
          variables: typebot.variables,
          isPreview,
          updateVariableValue,
          updateVariables,
          resultValues,
          groups: typebot.groups,
          onNewLog,
          resultId,
          parentTypebotIds
        }
      });
      nextEdgeId ? onGroupEnd({ edgeId: nextEdgeId }) : displayNextBlock();
    }
    if (currentBlock.type === "start")
      onGroupEnd({ edgeId: currentBlock.outgoingEdgeId });
  });
  const displayNextBlock = (answerContent, isRetry) => {
    var _a3, _b;
    scroll2();
    const currentBlock = [...processedBlocks].pop();
    if (currentBlock) {
      if (isRetry && blockCanBeRetried(currentBlock))
        return insertBlockInStack(
          parseRetryBlock(currentBlock, typebot.variables, createEdge)
        );
      if (isInputBlock(currentBlock) && ((_a3 = currentBlock.options) == null ? void 0 : _a3.variableId) && answerContent) {
        updateVariableValue(
          currentBlock.options.variableId,
          answerContent.value
        );
      }
      const isSingleChoiceBlock = isChoiceInput(currentBlock) && !currentBlock.options.isMultipleChoice;
      if (isSingleChoiceBlock) {
        const nextEdgeId = (_b = currentBlock.items.find(
          byId(answerContent == null ? void 0 : answerContent.itemId)
        )) == null ? void 0 : _b.outgoingEdgeId;
        if (nextEdgeId)
          return onGroupEnd({ edgeId: nextEdgeId });
      }
      if ((currentBlock == null ? void 0 : currentBlock.outgoingEdgeId) || processedBlocks.length === blocks.length)
        return onGroupEnd({ edgeId: currentBlock.outgoingEdgeId });
    }
    const nextBlock = blocks[processedBlocks.length + startBlockIndex];
    nextBlock ? insertBlockInStack(nextBlock) : onGroupEnd({});
  };
  const avatarSrc = (_a2 = typebot.theme.chat.hostAvatar) == null ? void 0 : _a2.url;
  return /* @__PURE__ */ jsx32("div", { className: "flex w-full", "data-group-name": groupTitle, children: /* @__PURE__ */ jsx32("div", { className: "flex flex-col w-full min-w-0", children: displayedChunks.map((chunk, idx) => {
    var _a3, _b, _c, _d;
    return /* @__PURE__ */ jsx32(
      ChatChunks,
      {
        displayChunk: chunk,
        hostAvatar: {
          isEnabled: (_b = (_a3 = typebot.theme.chat.hostAvatar) == null ? void 0 : _a3.isEnabled) != null ? _b : true,
          src: avatarSrc && parseVariables(typebot.variables)(avatarSrc)
        },
        hasGuestAvatar: (_d = (_c = typebot.theme.chat.guestAvatar) == null ? void 0 : _c.isEnabled) != null ? _d : false,
        onDisplayNextBlock: displayNextBlock,
        keepShowingHostAvatar,
        blockedPopupUrl,
        onBlockedPopupLinkClick: () => setBlockedPopupUrl(void 0)
      },
      idx
    );
  }) }) });
};
var ChatChunks = ({
  displayChunk: { bubbles, input },
  hostAvatar,
  hasGuestAvatar,
  keepShowingHostAvatar,
  blockedPopupUrl,
  onBlockedPopupLinkClick,
  onDisplayNextBlock
}) => {
  const [isSkipped, setIsSkipped] = useState22(false);
  const avatarSideContainerRef = useRef12();
  useEffect9(() => {
    refreshTopOffset();
  });
  const skipInput = () => {
    onDisplayNextBlock();
    setIsSkipped(true);
  };
  const refreshTopOffset = () => {
    var _a2;
    return (_a2 = avatarSideContainerRef.current) == null ? void 0 : _a2.refreshTopOffset();
  };
  return /* @__PURE__ */ jsxs22(Fragment5, { children: [
    /* @__PURE__ */ jsxs22("div", { className: "flex", children: [
      hostAvatar.isEnabled && bubbles.length > 0 && /* @__PURE__ */ jsx32(
        AvatarSideContainer,
        {
          ref: avatarSideContainerRef,
          hostAvatarSrc: hostAvatar.src,
          keepShowing: (keepShowingHostAvatar || isDefined(input)) && !isSkipped
        }
      ),
      /* @__PURE__ */ jsx32(
        "div",
        {
          className: "flex-1",
          style: { marginRight: hasGuestAvatar ? "50px" : "0.5rem" },
          children: /* @__PURE__ */ jsx32(TransitionGroup, { children: bubbles.map((block) => /* @__PURE__ */ jsx32(
            CSSTransition3,
            {
              classNames: "bubble",
              timeout: 500,
              unmountOnExit: true,
              children: /* @__PURE__ */ jsx32(
                HostBubble,
                {
                  block,
                  onTransitionEnd: () => {
                    onDisplayNextBlock();
                    refreshTopOffset();
                  }
                }
              )
            },
            block.id
          )) })
        }
      )
    ] }),
    !isSkipped && /* @__PURE__ */ jsx32(
      CSSTransition3,
      {
        classNames: "bubble",
        timeout: 500,
        unmountOnExit: true,
        in: isDefined(input),
        children: input ? /* @__PURE__ */ jsx32(
          InputChatBlock,
          {
            block: input,
            onTransitionEnd: onDisplayNextBlock,
            onSkip: skipInput,
            hasAvatar: hostAvatar.isEnabled,
            hasGuestAvatar
          }
        ) : /* @__PURE__ */ jsx32("div", {})
      }
    ),
    blockedPopupUrl ? /* @__PURE__ */ jsx32("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx32(
      PopupBlockedToast,
      {
        url: blockedPopupUrl,
        onLinkClick: onBlockedPopupLinkClick
      }
    ) }) : null
  ] });
};

// src/components/ConversationContainer.tsx
import { animateScroll as scroll } from "react-scroll";

// src/features/theme/utils/setCssVariablesValue.ts
var cssVariableNames = {
  general: {
    bgImage: "--typebot-container-bg-image",
    bgColor: "--typebot-container-bg-color",
    fontFamily: "--typebot-container-font-family"
  },
  chat: {
    hostBubbles: {
      bgColor: "--typebot-host-bubble-bg-color",
      color: "--typebot-host-bubble-color"
    },
    guestBubbles: {
      bgColor: "--typebot-guest-bubble-bg-color",
      color: "--typebot-guest-bubble-color"
    },
    inputs: {
      bgColor: "--typebot-input-bg-color",
      color: "--typebot-input-color",
      placeholderColor: "--typebot-input-placeholder-color"
    },
    buttons: {
      bgColor: "--typebot-button-bg-color",
      color: "--typebot-button-color"
    }
  }
};
var setCssVariablesValue = (theme, documentStyle) => {
  if (!theme)
    return;
  if (theme.general)
    setGeneralTheme(theme.general, documentStyle);
  if (theme.chat)
    setChatTheme(theme.chat, documentStyle);
};
var setGeneralTheme = (generalTheme, documentStyle) => {
  const { background, font } = generalTheme;
  if (background)
    setTypebotBackground;
  if (font)
    documentStyle.setProperty(cssVariableNames.general.fontFamily, font);
};
var setChatTheme = (chatTheme, documentStyle) => {
  const { hostBubbles, guestBubbles, buttons, inputs } = chatTheme;
  if (hostBubbles)
    setHostBubbles(hostBubbles, documentStyle);
  if (guestBubbles)
    setGuestBubbles(guestBubbles, documentStyle);
  if (buttons)
    setButtons(buttons, documentStyle);
  if (inputs)
    setInputs(inputs, documentStyle);
};
var setHostBubbles = (hostBubbles, documentStyle) => {
  if (hostBubbles.backgroundColor)
    documentStyle.setProperty(
      cssVariableNames.chat.hostBubbles.bgColor,
      hostBubbles.backgroundColor
    );
  if (hostBubbles.color)
    documentStyle.setProperty(
      cssVariableNames.chat.hostBubbles.color,
      hostBubbles.color
    );
};
var setGuestBubbles = (guestBubbles, documentStyle) => {
  if (guestBubbles.backgroundColor)
    documentStyle.setProperty(
      cssVariableNames.chat.guestBubbles.bgColor,
      guestBubbles.backgroundColor
    );
  if (guestBubbles.color)
    documentStyle.setProperty(
      cssVariableNames.chat.guestBubbles.color,
      guestBubbles.color
    );
};
var setButtons = (buttons, documentStyle) => {
  if (buttons.backgroundColor)
    documentStyle.setProperty(
      cssVariableNames.chat.buttons.bgColor,
      buttons.backgroundColor
    );
  if (buttons.color)
    documentStyle.setProperty(
      cssVariableNames.chat.buttons.color,
      buttons.color
    );
};
var setInputs = (inputs, documentStyle) => {
  if (inputs.backgroundColor)
    documentStyle.setProperty(
      cssVariableNames.chat.inputs.bgColor,
      inputs.backgroundColor
    );
  if (inputs.color)
    documentStyle.setProperty(cssVariableNames.chat.inputs.color, inputs.color);
  if (inputs.placeholderColor)
    documentStyle.setProperty(
      cssVariableNames.chat.inputs.placeholderColor,
      inputs.placeholderColor
    );
};
var setTypebotBackground = (background, documentStyle) => {
  var _a2;
  documentStyle.setProperty(
    (background == null ? void 0 : background.type) === "Image" /* IMAGE */ ? cssVariableNames.general.bgImage : cssVariableNames.general.bgColor,
    background.type === "None" /* NONE */ ? "transparent" : (_a2 = background.content) != null ? _a2 : "#ffffff"
  );
};

// src/components/ConversationContainer.tsx
import { jsx as jsx33, jsxs as jsxs23 } from "react/jsx-runtime";
var ConversationContainer = ({
  theme,
  predefinedVariables,
  startGroupId,
  onNewGroupVisible,
  onCompleted
}) => {
  const {
    typebot,
    updateVariableValue,
    linkedBotQueue,
    popEdgeIdFromLinkedTypebotQueue
  } = useTypebot();
  const [displayedGroups, setDisplayedGroups] = useState23([]);
  const { updateVariables } = useAnswers();
  const bottomAnchor = useRef13(null);
  const scrollableContainer = useRef13(null);
  const [hasStarted, setHasStarted] = useState23(false);
  const displayNextGroup = ({
    edgeId,
    updatedTypebot,
    groupId
  }) => {
    const currentTypebot = updatedTypebot != null ? updatedTypebot : typebot;
    if (groupId) {
      const nextGroup2 = currentTypebot.groups.find(byId(groupId));
      if (!nextGroup2)
        return;
      onNewGroupVisible({
        id: "edgeId",
        from: { groupId: "block", blockId: "block" },
        to: { groupId }
      });
      return setDisplayedGroups([
        ...displayedGroups,
        { group: nextGroup2, startBlockIndex: 0 }
      ]);
    }
    const nextEdge = currentTypebot.edges.find(byId(edgeId));
    if (!nextEdge) {
      if (linkedBotQueue.length > 0) {
        const nextEdgeId = linkedBotQueue[0].edgeId;
        popEdgeIdFromLinkedTypebotQueue();
        displayNextGroup({ edgeId: nextEdgeId });
      }
      return onCompleted();
    }
    const nextGroup = currentTypebot.groups.find(byId(nextEdge.to.groupId));
    if (!nextGroup)
      return onCompleted();
    const startBlockIndex = nextEdge.to.blockId ? nextGroup.blocks.findIndex(byId(nextEdge.to.blockId)) : 0;
    onNewGroupVisible(nextEdge);
    setDisplayedGroups([
      ...displayedGroups,
      {
        group: nextGroup,
        startBlockIndex: startBlockIndex === -1 ? 0 : startBlockIndex
      }
    ]);
  };
  useEffect10(() => {
    if (hasStarted)
      return;
    if (isDefined(predefinedVariables) && Object.keys(predefinedVariables).length > 0) {
      const prefilledVariables = injectPredefinedVariables(predefinedVariables);
      updateVariables(prefilledVariables);
    }
    setHasStarted(true);
    const startEdge = typebot.groups[0].blocks[0].outgoingEdgeId;
    if (!startEdge && !startGroupId)
      return;
    displayNextGroup({
      edgeId: startGroupId ? void 0 : startEdge,
      groupId: startGroupId
    });
  }, [predefinedVariables]);
  const injectPredefinedVariables = (predefinedVariables2) => {
    const prefilledVariables = [];
    Object.keys(predefinedVariables2).forEach((key) => {
      const matchingVariable = typebot.variables.find(
        (v) => v.name.toLowerCase() === key.toLowerCase()
      );
      if (!predefinedVariables2 || isNotDefined(matchingVariable))
        return;
      const value = predefinedVariables2[key];
      if (!value)
        return;
      updateVariableValue(matchingVariable == null ? void 0 : matchingVariable.id, value);
      prefilledVariables.push(__spreadProps(__spreadValues({}, matchingVariable), { value }));
    });
    return prefilledVariables;
  };
  useEffect10(() => {
    if (!document)
      return;
    setCssVariablesValue(theme, document.body.style);
  }, [theme]);
  const autoScrollToBottom = () => {
    if (!scrollableContainer.current)
      return;
    setTimeout(() => {
      scroll.scrollToBottom({
        duration: 500,
        container: scrollableContainer.current
      });
    }, 1);
  };
  return /* @__PURE__ */ jsxs23(
    "div",
    {
      ref: scrollableContainer,
      className: "overflow-y-scroll w-full lg:w-3/4 min-h-full rounded lg:px-5 px-3 pt-10 relative scrollable-container typebot-chat-view",
      children: [
        /* @__PURE__ */ jsx33(ChatProvider, { onScroll: autoScrollToBottom, children: displayedGroups.map((displayedGroup, idx) => {
          const groupAfter = displayedGroups[idx + 1];
          const groupAfterStartsWithInput = groupAfter && isInputBlock(groupAfter.group.blocks[groupAfter.startBlockIndex]);
          return /* @__PURE__ */ jsx33(
            ChatGroup,
            {
              blocks: displayedGroup.group.blocks,
              startBlockIndex: displayedGroup.startBlockIndex,
              onGroupEnd: displayNextGroup,
              groupTitle: displayedGroup.group.title,
              keepShowingHostAvatar: idx === displayedGroups.length - 1 || groupAfterStartsWithInput
            },
            displayedGroup.group.id + idx
          );
        }) }),
        /* @__PURE__ */ jsx33("div", { className: "w-full h-32", ref: bottomAnchor })
      ]
    }
  );
};

// src/components/LiteBadge.tsx
import { useEffect as useEffect11, useRef as useRef14 } from "react";
import { jsx as jsx34, jsxs as jsxs24 } from "react/jsx-runtime";
var LiteBadge = () => {
  const liteBadge = useRef14(null);
  useEffect11(() => {
    if (!document)
      return;
    const container = document.querySelector(
      '[data-testid="container"]'
    );
    const observer = new MutationObserver(function(mutations_list) {
      mutations_list.forEach(function(mutation) {
        mutation.removedNodes.forEach(function(removed_node) {
          if (removed_node.id == "lite-badge")
            container.append(liteBadge.current);
        });
      });
    });
    observer.observe(container, {
      subtree: false,
      childList: true
    });
    return () => {
      observer.disconnect();
    };
  }, []);
  return /* @__PURE__ */ jsxs24(
    "a",
    {
      ref: liteBadge,
      href: "https://www.typebot.io/?utm_source=litebadge",
      target: "_blank",
      rel: "noopener noreferrer",
      className: "fixed py-1 px-2 bg-white z-50 rounded shadow-md lite-badge",
      style: { bottom: "20px" },
      id: "lite-badge",
      children: [
        "Made with ",
        /* @__PURE__ */ jsx34("span", { className: "text-blue-500", children: "Typebot" }),
        "."
      ]
    }
  );
};

// src/components/TypebotViewer.tsx
import { Fragment as Fragment6, jsx as jsx35, jsxs as jsxs25 } from "react/jsx-runtime";
var TypebotViewer = ({
  typebot,
  apiHost = getViewerUrl(),
  isPreview = false,
  isLoading = false,
  resultId,
  startGroupId,
  predefinedVariables,
  onNewLog,
  onNewGroupVisible,
  onNewAnswer,
  onCompleted,
  onVariablesUpdated
}) => {
  var _a2, _b, _c, _d, _e, _f;
  const containerBgColor = useMemo(
    () => {
      var _a3, _b2, _c2;
      return ((_c2 = (_b2 = (_a3 = typebot == null ? void 0 : typebot.theme) == null ? void 0 : _a3.general) == null ? void 0 : _b2.background) == null ? void 0 : _c2.type) === "Color" /* COLOR */ ? typebot.theme.general.background.content : "transparent";
    },
    [(_b = (_a2 = typebot == null ? void 0 : typebot.theme) == null ? void 0 : _a2.general) == null ? void 0 : _b.background]
  );
  const handleNewGroupVisible = (edge) => onNewGroupVisible && onNewGroupVisible(edge);
  const handleNewAnswer = (answer) => onNewAnswer && onNewAnswer(answer);
  const handleNewLog = (log) => onNewLog && onNewLog(log);
  const handleCompleted = () => onCompleted && onCompleted();
  if (isEmpty(apiHost))
    return /* @__PURE__ */ jsx35("p", { children: "process.env.NEXT_PUBLIC_VIEWER_URL is missing in env" });
  return /* @__PURE__ */ jsxs25(Fragment6, { children: [
    /* @__PURE__ */ jsxs25("style", { children: [
      phone_default,
      style_default
    ] }),
    /* @__PURE__ */ jsx35("style", { children: (_c = typebot.theme) == null ? void 0 : _c.customCss }),
    /* @__PURE__ */ jsx35("style", { children: importantStyles_default }),
    isNotEmpty((_e = (_d = typebot == null ? void 0 : typebot.theme) == null ? void 0 : _d.general) == null ? void 0 : _e.font) && /* @__PURE__ */ jsx35(
      "style",
      {
        dangerouslySetInnerHTML: {
          __html: `@import url('https://fonts.googleapis.com/css2?family=${(_f = typebot.theme.general.font) != null ? _f : "Open Sans"}:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap');`
        }
      }
    ),
    /* @__PURE__ */ jsx35(
      TypebotProvider,
      {
        typebot,
        apiHost,
        isPreview,
        onNewLog: handleNewLog,
        isLoading,
        children: /* @__PURE__ */ jsx35(
          AnswersProvider,
          {
            resultId,
            onNewAnswer: handleNewAnswer,
            onVariablesUpdated,
            children: /* @__PURE__ */ jsxs25(
              "div",
              {
                className: "flex text-base overflow-hidden bg-cover h-screen w-screen flex-col items-center typebot-container",
                style: {
                  backgroundColor: containerBgColor != null ? containerBgColor : "transparent"
                },
                "data-testid": "container",
                children: [
                  /* @__PURE__ */ jsx35("div", { className: "flex w-full h-full justify-center", children: /* @__PURE__ */ jsx35(
                    ConversationContainer,
                    {
                      theme: typebot.theme,
                      onNewGroupVisible: handleNewGroupVisible,
                      onCompleted: handleCompleted,
                      predefinedVariables,
                      startGroupId
                    }
                  ) }),
                  typebot.settings.general.isBrandingEnabled && /* @__PURE__ */ jsx35(LiteBadge, {})
                ]
              }
            )
          }
        )
      }
    )
  ] });
};
export {
  TypebotViewer,
  parseVariables
};
//# sourceMappingURL=index.mjs.map