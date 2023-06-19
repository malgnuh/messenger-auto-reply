export function autoReply() {
    const AUTO_TEXT = "(Tự động trả lời) Xin chào, tôi đang có việc bận, sau này cũng không chắc sẽ liên hệ lại"
    const DEBOUNCE_TIMER = 1;
    const DELAY_TIMER = 20;

    const SELECTORS = {
        MESSAGE_LIST: "#messageGroup",
        TEXT_MESSAGES: "._1c-a._34en._3_63",
        TEXT: "._34ej",
        NON_TEXT_MESSAGES: "[class='messageAttachments _z63']",
        SEND_BUTTON: "button[class='_5y14 _52cp btn btnC mfss touchable']"
    }
    SELECTORS.ALL_MESSAGES = SELECTORS.TEXT_MESSAGES.concat(",").concat(SELECTORS.NON_TEXT_MESSAGES)
    const messageListNode = document.querySelector(SELECTORS.MESSAGE_LIST);

    let messageCount;

    const observe = (observer, config) => {
        messageCount = document.querySelectorAll(SELECTORS.ALL_MESSAGES).length;
        observer.observe(messageListNode, config);
    }

    const pauseObserver = (timer) => {
        observer.disconnect();
        setTimeout(observe, timer * 1000, observer, oConfig);
    }

    const debounce = (func, timeout = 300) => {
        let timer;
        return () => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this); }, timeout);
        };
    }

    const reply = () => {
        document.getElementsByName("body")[0].value = AUTO_TEXT;
        const sendButton = document.querySelector(SELECTORS.SEND_BUTTON);
        sendButton.disabled = false;
        sendButton.click();
        pauseObserver(DELAY_TIMER);
    }

    const debouncedRep = debounce(reply, DEBOUNCE_TIMER * 1000);

    const callback = () => {
        const messageArr = document.querySelectorAll(SELECTORS.ALL_MESSAGES);
        if (messageArr.length > messageCount) {
            messageCount = messageArr.length;
            debouncedRep();
        }
    }

    const oConfig = { childList: true, subtree: true };
    const observer = new MutationObserver(callback);
    observe(observer, oConfig);
}