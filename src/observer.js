export function observeNewMessages() {

    const MESSAGE_LIST_SELECTOR = "div#messageGroup";

    const OPP_TEXT_MESSAGE_CLASS = "chatHighlight";
    const OPP_TEXT_MESSAGE_DETECT_SELECTOR = "[class='_1c-a _34en _3_63']";
    const TEXT_MESSAGE_SELECTOR = "._34ej";

    const OPP_NON_TEXT_TARGET_CLASSNAME = "c";
    const OPP_NON_TEXT_CLASS_LISTS = ["messageAttachments _z63", "messageAttachments _z63 _8scj"]

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
            if (isOppTextMessage(record)) {
                window.processTextMessage(record.addedNodes[0].querySelector(TEXT_MESSAGE_SELECTOR).innerText);
            }
        })
    }

    const messageListNode = document.querySelector(MESSAGE_LIST_SELECTOR);
    const options = { childList: true, subtree: true };
    const observer = new MutationObserver(callback)
    
    observer.observe(messageListNode, options);
}