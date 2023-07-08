export function autoReply() {
    const AUTO_TEXT = "(Tự động trả lời) Xin chào, tôi đang có việc bận, sau này cũng không chắc sẽ liên hệ lại"
    const DEBOUNCE_TIMER = 0.5;
    const DELAY_TIMER = 15;

    const MESSAGE_LIST_SELECTOR = "div#messageGroup";

    const OPP_TEXT_MESSAGE_CLASS = "chatHighlight";
    const OPP_TEXT_MESSAGE_DETECT_SELECTOR = "[class='_1c-a _34en _3_63']";

    const OPP_NON_TEXT_TARGET_CLASSNAME = "c";
    const OPP_NON_TEXT_CLASS_LISTS = ["messageAttachments _z63", "messageAttachments _z63 _8scj"]

    const SEND_BUTTON_SELECTOR = "button[class='_5y14 _52cp btn btnC mfss touchable']"

    const pauseObserver = (timer) => {
        observer.disconnect();
        setTimeout(observe, timer * 1000);
    }

    const reply = () => {
        document.getElementsByName("body")[0].value = AUTO_TEXT;
        const sendButton = document.querySelector(SEND_BUTTON_SELECTOR);
        sendButton.disabled = false;
        sendButton.click();
        pauseObserver(DELAY_TIMER);
    }

    const debounce = (func, timeout = 300) => {
        let timer;
        return () => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this); }, timeout);
        };
    }

    const debouncedRep = debounce(reply, DEBOUNCE_TIMER * 1000);

    const isOppNonTextMessage = (record) => {
        if (record?.target?.className != OPP_NON_TEXT_TARGET_CLASSNAME) return false;
        return OPP_NON_TEXT_CLASS_LISTS.includes(record.addedNodes[0]?.className);
    }

    const isOppTextMessage = (record) => {
        return (record?.addedNodes[0]?.classList?.contains(OPP_TEXT_MESSAGE_CLASS)
            && record.addedNodes[0].querySelector(OPP_TEXT_MESSAGE_DETECT_SELECTOR)
        )
    }

    const callback = (mutationRecords) => {
        mutationRecords.forEach((record) => {
            if (isOppTextMessage(record) || isOppNonTextMessage(record)) {
                debouncedRep();
            }
        })
    }

    const messageListNode = document.querySelector(MESSAGE_LIST_SELECTOR);
    const options = { childList: true, subtree: true };
    const observer = new MutationObserver(callback);

    const observe = () => {
        observer.observe(messageListNode, options);
    }

    observe();
}