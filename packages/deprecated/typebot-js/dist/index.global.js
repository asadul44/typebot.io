"use strict";
var Typebot = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/index.ts
  var src_exports = {};
  __export(src_exports, {
    close: () => close,
    default: () => src_default,
    getBubbleActions: () => getBubbleActions,
    getPopupActions: () => getPopupActions,
    hideMessage: () => hideMessage,
    initBubble: () => initBubble,
    initContainer: () => initContainer,
    initPopup: () => initPopup,
    localStorageKeys: () => localStorageKeys,
    open: () => open,
    setHiddenVariables: () => setHiddenVariables,
    showMessage: () => showMessage,
    toggle: () => toggle
  });

  // src/embedTypes/chat/iframe.ts
  var createIframeContainer = (params) => {
    const iframe = createIframe({ ...params, loadWhenVisible: true });
    iframe.style.display = "none";
    return iframe;
  };
  var openIframe = (bubble) => {
    const iframe = bubble.querySelector(".typebot-iframe");
    loadTypebotIfFirstOpen(iframe);
    iframe.style.display = "flex";
    setTimeout(() => bubble.classList.add("iframe-opened"), 50);
    bubble.classList.remove("message-opened");
  };
  var closeIframe = (bubble) => {
    const iframe = bubble.querySelector(".typebot-iframe");
    bubble.classList.remove("iframe-opened");
    setTimeout(() => iframe.style.display = "none", 550);
  };
  var loadTypebotIfFirstOpen = (iframe) => {
    if (!iframe.dataset.src)
      return;
    iframe.src = iframe.dataset.src;
    iframe.removeAttribute("data-src");
  };
  var isIframeOpened = (bubble) => bubble.classList.contains("iframe-opened");

  // #style-inject:#style-inject
  function styleInject(css, { insertAt } = {}) {
    if (!css || typeof document === "undefined")
      return;
    const head = document.head || document.getElementsByTagName("head")[0];
    const style = document.createElement("style");
    style.type = "text/css";
    if (insertAt === "top") {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  // src/embedTypes/popup/style.css
  styleInject("#typebot-popup {\n  position: fixed;\n  top: 0;\n  width: 100vw;\n  height: 100vh;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  visibility: hidden;\n  opacity: 0;\n  transition: opacity 200ms;\n  z-index: 99999;\n}\n#typebot-popup.opened {\n  opacity: 1;\n  visibility: visible;\n}\n#typebot-popup > iframe {\n  width: 100%;\n  height: 600px;\n  max-width: 800px;\n  border-radius: 10px;\n}\n");

  // src/embedTypes/popup/index.ts
  var initPopup = (params) => {
    if (document.readyState !== "complete") {
      window.addEventListener("load", () => initPopup(params));
      return { close: () => {
      }, open: () => {
      } };
    }
    const existingPopup = document.getElementById("typebot-popup");
    if (existingPopup)
      existingPopup.remove();
    const popupElement = createPopup(params);
    !document.body ? window.onload = () => document.body.append(popupElement) : document.body.append(popupElement);
    return {
      open: () => openPopup(popupElement),
      close: () => closePopup(popupElement)
    };
  };
  var createPopup = (params) => {
    const { delay } = params;
    const overlayElement = createOverlayElement(delay);
    listenForOutsideClicks(overlayElement);
    const iframeElement = createIframe({
      ...params,
      loadWhenVisible: true
    });
    overlayElement.appendChild(iframeElement);
    return overlayElement;
  };
  var createOverlayElement = (delay) => {
    const overlayElement = document.createElement("div");
    overlayElement.id = "typebot-popup";
    if (delay !== void 0)
      setShowTimeout(overlayElement, delay);
    return overlayElement;
  };
  var openPopup = (popupElement) => {
    const iframe = popupElement.children[0];
    if (iframe.dataset.src)
      lazyLoadSrc(iframe);
    document.body.style.overflowY = "hidden";
    popupElement.classList.add("opened");
  };
  var closePopup = (popupElement) => {
    document.body.style.overflowY = "auto";
    popupElement.classList.remove("opened");
  };
  var isPopupOpened = (popupElement) => popupElement.classList.contains("opened");
  var listenForOutsideClicks = (popupElement) => popupElement.addEventListener("click", (e) => onPopupClick(e, popupElement));
  var onPopupClick = (e, popupElement) => {
    e.preventDefault();
    const clickedElement = e.target;
    if (clickedElement.tagName !== "iframe")
      closePopup(popupElement);
  };
  var setShowTimeout = (overlayElement, delay) => {
    setTimeout(() => {
      openPopup(overlayElement);
    }, delay);
  };
  var lazyLoadSrc = (iframe) => {
    iframe.src = iframe.dataset.src;
    iframe.removeAttribute("data-src");
  };
  var getPopupActions = (popupElement) => {
    const existingPopupElement = popupElement ?? document.querySelector("#typebot-popup");
    return {
      open: () => {
        openPopup(existingPopupElement);
      },
      close: () => {
        closePopup(existingPopupElement);
      }
    };
  };

  // src/commands/close.ts
  var close = () => {
    const existingPopup = document.querySelector("#typebot-popup");
    if (existingPopup)
      closePopup(existingPopup);
    const existingBubble = document.querySelector("#typebot-bubble");
    if (existingBubble)
      closeIframe(existingBubble);
  };

  // src/types.ts
  var localStorageKeys = {
    rememberClose: "rememberClose"
  };

  // src/embedTypes/chat/button.ts
  var createButton = (params) => {
    const button = document.createElement("button");
    button.id = "typebot-bubble-button";
    button.style.backgroundColor = (params == null ? void 0 : params.color) ?? "#0042DA";
    button.appendChild(
      createButtonIcon(params == null ? void 0 : params.iconUrl, params == null ? void 0 : params.iconColor, params == null ? void 0 : params.iconStyle)
    );
    button.appendChild(
      createCloseIcon((params == null ? void 0 : params.iconColor) ?? (params == null ? void 0 : params.closeIconColor))
    );
    return button;
  };
  var createButtonIcon = (src, iconColor, style) => {
    if (!src)
      return createDefaultIcon(iconColor);
    const icon = document.createElement("img");
    icon.classList.add("icon");
    icon.src = src;
    if (style)
      icon.setAttribute("style", style);
    return icon;
  };
  var createDefaultIcon = (iconColor) => {
    const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    icon.setAttribute("viewBox", "0 0 24 24");
    icon.innerHTML = typebotLogoSvgTextContent();
    icon.classList.add("icon");
    icon.style.stroke = iconColor ?? "#ffffff";
    return icon;
  };
  var createCloseIcon = (iconColor) => {
    const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    icon.setAttribute("viewBox", "0 0 24 24");
    icon.innerHTML = closeSvgPath;
    icon.classList.add("close-icon");
    icon.style.stroke = iconColor ?? "#ffffff";
    return icon;
  };
  var typebotLogoSvgTextContent = () => `<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>`;
  var closeSvgPath = `<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>`;

  // src/embedTypes/chat/style.css
  styleInject("#typebot-bubble {\n  z-index: 99999;\n  position: fixed;\n}\n#typebot-bubble > button {\n  padding: 0px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  z-index: 99999;\n  position: fixed;\n  bottom: 20px;\n  right: 20px;\n  width: 60px;\n  height: 60px;\n  border-radius: 100%;\n  background-color: rgb(230, 114, 0);\n  box-shadow: rgba(0, 0, 0, 0.06) 0px 1px 6px 0px, rgba(0, 0, 0, 0.16) 0px 2px 32px 0px;\n  border: medium none;\n}\n#typebot-bubble button:hover {\n  filter: brightness(0.95);\n}\n#typebot-bubble button:active {\n  filter: brightness(0.75);\n}\n#typebot-bubble > button:focus {\n  outline: none;\n}\n#typebot-bubble > button > .icon {\n  transition: opacity 500ms ease-out 0s, transform 500ms ease-out 0s;\n}\n#typebot-bubble > button > svg.icon {\n  fill: none;\n  width: 55%;\n  stroke-width: 2px;\n  stroke: white;\n}\n#typebot-bubble > button > img.icon {\n  width: 80%;\n  height: 80%;\n  border-radius: 100%;\n  object-fit: cover;\n  object-position: center;\n}\n#typebot-bubble.iframe-opened > button > .icon {\n  transform: rotate(90deg) scale(0);\n  opacity: 0;\n}\n#typebot-bubble > button > .close-icon {\n  position: absolute;\n  transform: rotate(-90deg) scale(0);\n  opacity: 0;\n  transition: opacity 500ms ease-out 0s, transform 500ms ease-out 0s;\n  width: 55%;\n  stroke-width: 2px;\n  stroke: white;\n}\n#typebot-bubble.iframe-opened > button > .close-icon {\n  transform: rotate(90deg) scale(1);\n  opacity: 1;\n}\n#typebot-bubble > iframe {\n  opacity: 0;\n  display: flex;\n  border-radius: 10px;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  z-index: 99999;\n  border-radius: 10px;\n  position: fixed;\n  transform: translate(0, 100px);\n  transition: opacity 500ms ease-out 0s, transform 500ms ease-out 0s;\n  box-shadow: rgba(0, 0, 0, 0.16) 0px 5px 40px;\n  width: 400px;\n  max-height: 680px;\n  inset: auto 20px 90px auto;\n  height: calc(100% - 160px);\n  background-color: white;\n}\n#typebot-bubble.iframe-opened > iframe {\n  transform: translate(0, 0);\n  opacity: 1;\n}\n.typebot-chat-button.active .typebot-chat-icon {\n  transform: rotate(90deg) scale(0);\n  opacity: 0;\n}\n.typebot-chat-button:not(.active) .typebot-chat-close {\n  transform: rotate(-90deg) scale(0);\n  opacity: 0;\n}\n.typebot-iframe-container:not(.active) {\n  opacity: 0;\n  transform: translate(0, 100px);\n}\n.typebot-iframe-container.active {\n  opacity: 1;\n  transform: translate(0, 0);\n}\n#typebot-bubble > .proactive-message {\n  font-size: 18px;\n  color: #303235;\n  opacity: 0;\n  visibility: hidden;\n  transform: translate(0, 10px);\n  transition: opacity 500ms ease-out, transform 500ms ease-out;\n  cursor: pointer;\n  font-weight: 300;\n  bottom: 90px;\n  right: 20px;\n  z-index: 99999;\n  position: fixed;\n  max-width: 280px;\n  background-color: white;\n  box-shadow: 0 3px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);\n  padding: 16px;\n  display: flex;\n  align-items: center;\n  border-radius: 8px;\n}\n#typebot-bubble.message-opened > .proactive-message {\n  opacity: 1;\n  visibility: visible;\n  transform: translate(0, 0);\n}\n#typebot-bubble > .proactive-message > .close-button {\n  position: absolute;\n  top: -15px;\n  right: -7px;\n  width: 30px;\n  height: 30px;\n  background-color: rgb(237, 242, 247);\n  border-radius: 100%;\n  border: medium none;\n  outline: currentcolor none medium;\n  fill: #4a5568;\n  padding: 0px;\n  cursor: pointer;\n  padding: 2px;\n}\n#typebot-bubble > .proactive-message > img {\n  margin-right: 8px;\n  width: 40px;\n  height: 40px;\n  flex-shrink: 0;\n  border-radius: 100%;\n  object-fit: cover;\n}\n#typebot-bubble > .proactive-message > p {\n  margin: 0;\n}\n@media screen and (max-width: 450px) {\n  #typebot-bubble > .proactive-message {\n    max-width: 200px;\n    font-size: 15px;\n    bottom: 70px;\n    right: 10px;\n  }\n  #typebot-bubble > button {\n    width: 50px !important;\n    height: 50px !important;\n    bottom: 10px !important;\n    right: 10px !important;\n  }\n  #typebot-bubble > iframe {\n    inset: 0 0 auto auto;\n    width: 100%;\n    height: calc(100% - 70px);\n    max-height: none;\n  }\n}\n");

  // src/embedTypes/chat/index.ts
  var initBubble = (params) => {
    if (document.readyState !== "complete") {
      window.addEventListener("load", () => initBubble(params));
      return { close: () => {
      }, open: () => {
      } };
    }
    const existingBubble = document.getElementById("typebot-bubble");
    if (existingBubble)
      existingBubble.remove();
    const { bubbleElement, proactiveMessageElement } = createBubble(params);
    if ((params.autoOpenDelay || params.autoOpenDelay === 0) && !hasBeenClosed()) {
      setRememberCloseInStorage();
      setTimeout(() => openIframe(bubbleElement), params.autoOpenDelay);
    }
    !document.body ? window.onload = () => document.body.appendChild(bubbleElement) : document.body.appendChild(bubbleElement);
    return getBubbleActions(bubbleElement, proactiveMessageElement);
  };
  var createBubble = (params) => {
    const bubbleElement = document.createElement("div");
    bubbleElement.id = "typebot-bubble";
    const buttonElement = createButton(params.button);
    bubbleElement.appendChild(buttonElement);
    const proactiveMessageElement = params.proactiveMessage && !hasBeenClosed() ? addProactiveMessage(params.proactiveMessage, bubbleElement) : void 0;
    const iframeElement = createIframeContainer(params);
    buttonElement.addEventListener("click", () => {
      iframeElement.style.display === "none" ? openIframe(bubbleElement) : closeIframe(bubbleElement);
    });
    if (proactiveMessageElement)
      proactiveMessageElement.addEventListener(
        "click",
        () => onProactiveMessageClick(bubbleElement, iframeElement)
      );
    bubbleElement.appendChild(iframeElement);
    return { bubbleElement, proactiveMessageElement, iframeElement };
  };
  var onProactiveMessageClick = (bubble, iframe) => {
    iframe.style.display === "none" ? openIframe(bubble) : closeIframe(bubble);
    bubble.classList.remove("message-opened");
  };
  var getBubbleActions = (bubbleElement, proactiveMessageElement) => {
    const existingBubbleElement = bubbleElement ?? document.querySelector("#typebot-bubble");
    if (!existingBubbleElement)
      return { close: () => {
      }, open: () => {
      } };
    const existingProactiveMessage = proactiveMessageElement ?? document.querySelector("#typebot-bubble .proactive-message");
    return {
      openProactiveMessage: existingProactiveMessage ? () => {
        openProactiveMessage(existingBubbleElement);
      } : void 0,
      open: () => {
        openIframe(existingBubbleElement);
      },
      close: () => {
        closeIframe(existingBubbleElement);
      }
    };
  };
  var addProactiveMessage = (proactiveMessage, bubbleElement) => {
    const proactiveMessageElement = createProactiveMessage(
      proactiveMessage,
      bubbleElement
    );
    bubbleElement.appendChild(proactiveMessageElement);
    return proactiveMessageElement;
  };
  var hasBeenClosed = () => {
    const closeDecisionFromStorage = localStorage.getItem(
      localStorageKeys.rememberClose
    );
    return closeDecisionFromStorage ? true : false;
  };
  var setRememberCloseInStorage = () => localStorage.setItem(localStorageKeys.rememberClose, "true");

  // src/embedTypes/chat/proactiveMessage.ts
  var createProactiveMessage = (params, bubble) => {
    const container = document.createElement("div");
    container.classList.add("proactive-message");
    if (params.delay !== void 0)
      setOpenTimeout(bubble, params);
    if (params.avatarUrl)
      container.appendChild(createAvatar(params.avatarUrl));
    container.appendChild(createTextElement(params.textContent));
    container.appendChild(createCloseButton(bubble));
    return container;
  };
  var setOpenTimeout = (bubble, params) => {
    setTimeout(() => {
      openProactiveMessage(bubble);
    }, params.delay);
  };
  var createAvatar = (avatarUrl) => {
    const element = document.createElement("img");
    element.src = avatarUrl;
    return element;
  };
  var createTextElement = (text) => {
    const element = document.createElement("p");
    element.innerHTML = text;
    return element;
  };
  var createCloseButton = (bubble) => {
    const button = document.createElement("button");
    button.classList.add("close-button");
    button.innerHTML = `<svg viewBox="0 0 24 24" style="stroke:black; stroke-width:2px; margin:4px">${closeSvgPath}</svg>`;
    button.addEventListener("click", (e) => onCloseButtonClick(e, bubble));
    return button;
  };
  var openProactiveMessage = (bubble) => {
    bubble.classList.add("message-opened");
  };
  var onCloseButtonClick = (e, proactiveMessageElement) => {
    e.stopPropagation();
    closeProactiveMessage(proactiveMessageElement);
  };
  var closeProactiveMessage = (bubble) => {
    setRememberCloseInStorage();
    bubble.classList.remove("message-opened");
  };

  // src/commands/hideMessage.ts
  var hideMessage = () => {
    const existingBubble = document.querySelector("#typebot-bubble");
    if (existingBubble)
      closeProactiveMessage(existingBubble);
  };

  // src/commands/open.ts
  var open = () => {
    const existingPopup = document.querySelector("#typebot-popup");
    if (existingPopup)
      openPopup(existingPopup);
    const existingBubble = document.querySelector("#typebot-bubble");
    if (existingBubble)
      openIframe(existingBubble);
  };

  // src/commands/setHiddenVariables.ts
  var setHiddenVariables = (hiddenVariables) => {
    const existingIframe = document.querySelector(".typebot-iframe");
    if (!existingIframe)
      return;
    const existingUrl = existingIframe.getAttribute("data-src") || existingIframe.src;
    const existingHiddenVariables = new URLSearchParams(existingUrl.split("?")[1]);
    const existingQueryObj = {};
    existingHiddenVariables.forEach((value, key) => {
      existingQueryObj[key] = value;
    });
    const isLoadWhenVisible = existingIframe.hasAttribute("data-src");
    const iframeUrl = `${existingUrl.split("?")[0]}${parseQueryParams({
      ...existingQueryObj,
      ...hiddenVariables
    })}`;
    existingIframe.setAttribute(isLoadWhenVisible ? "data-src" : "src", iframeUrl);
  };
  var parseQueryParams = (starterVariables) => {
    return parseStarterVariables(starterVariables);
  };
  var parseStarterVariables = (starterVariables) => starterVariables && Object.keys(starterVariables).length > 0 ? `?${Object.keys(starterVariables).filter((key) => starterVariables[key]).map(
    (key) => `${key}=${encodeURIComponent(starterVariables[key])}`
  ).join("&")}` : "";

  // src/commands/showMessage.ts
  var showMessage = () => {
    const existingBubble = document.querySelector("#typebot-bubble");
    if (existingBubble)
      openProactiveMessage(existingBubble);
  };

  // src/commands/toggle.ts
  var toggle = () => {
    const existingPopup = document.querySelector("#typebot-popup");
    if (existingPopup)
      isPopupOpened(existingPopup) ? closePopup(existingPopup) : openPopup(existingPopup);
    const existingBubble = document.querySelector("#typebot-bubble");
    if (existingBubble)
      isIframeOpened(existingBubble) ? closeIframe(existingBubble) : openIframe(existingBubble);
  };

  // src/iframe/style.css
  styleInject(".typebot-iframe {\n  width: 100%;\n  height: 100%;\n  border: none;\n  border-radius: inherit;\n}\n");

  // src/iframe/index.ts
  var createIframe = ({
    backgroundColor,
    url,
    ...iframeParams
  }) => {
    const { loadWhenVisible, hiddenVariables } = iframeParams;
    const hostUrlParams = new URLSearchParams(document.location.search);
    const hostQueryObj = {};
    hostUrlParams.forEach((value, key) => {
      hostQueryObj[key] = value;
    });
    const iframeUrl = `${url}${parseQueryParams({
      ...hiddenVariables,
      ...hostQueryObj
    })}`;
    const iframe = document.createElement("iframe");
    iframe.setAttribute(loadWhenVisible ? "data-src" : "src", iframeUrl);
    iframe.setAttribute("data-id", url);
    const randomThreeLettersId = Math.random().toString(36).substring(7);
    const uniqueId = `${url}-${randomThreeLettersId}`;
    iframe.setAttribute("id", uniqueId);
    if (backgroundColor)
      iframe.style.backgroundColor = backgroundColor;
    iframe.classList.add("typebot-iframe");
    const { onNewVariableValue } = iframeParams;
    listenForTypebotMessages({ onNewVariableValue });
    return iframe;
  };
  var listenForTypebotMessages = (callbacks) => {
    window.addEventListener("message", (event) => {
      const data = event.data;
      if (data.from === "typebot")
        processMessage(event.data, callbacks);
    });
  };
  var processMessage = (data, callbacks) => {
    if (data.redirectUrl)
      window.open(data.redirectUrl);
    if (data.newVariableValue && callbacks.onNewVariableValue)
      callbacks.onNewVariableValue(data.newVariableValue);
    if (data.codeToExecute)
      Function(data.codeToExecute)();
    if (data.closeChatBubble)
      close();
  };

  // src/embedTypes/container/index.ts
  var initContainer = (containerId, iframeParams) => {
    const { loadWhenVisible } = iframeParams;
    const containerElement = document.getElementById(containerId);
    if (!containerElement)
      return;
    if (containerElement.children[0])
      return containerElement.children[0];
    const lazy = loadWhenVisible ?? true;
    const iframeElement = createIframe({
      ...iframeParams,
      loadWhenVisible: lazy
    });
    if (lazy)
      observeOnScroll(iframeElement);
    containerElement.appendChild(iframeElement);
    return iframeElement;
  };
  var observeOnScroll = (iframeElement) => {
    const observer = new IntersectionObserver(
      (entries) => {
        var _a;
        if (((_a = entries.pop()) == null ? void 0 : _a.isIntersecting) === true)
          lazyLoadSrc2(iframeElement);
      },
      { threshold: [0] }
    );
    observer.observe(iframeElement);
  };
  var lazyLoadSrc2 = (iframeElement) => {
    if (!iframeElement.dataset.src)
      return;
    iframeElement.src = iframeElement.dataset.src;
    iframeElement.removeAttribute("data-src");
  };

  // src/index.ts
  var defaultExports = {
    initContainer,
    initPopup,
    initBubble,
    getPopupActions,
    getBubbleActions,
    open,
    close,
    toggle,
    showMessage,
    hideMessage,
    setHiddenVariables
  };
  var src_default = defaultExports;
  return __toCommonJS(src_exports);
})();
//# sourceMappingURL=index.global.js.map