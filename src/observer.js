export function observeNewMessages() {

    const MESSAGE_LIST_SELECTOR = "div#messageGroup";
    const TEXT_MESSAGE_SELECTOR = "._34ej";
    const OPP_NON_TEXT_MESSAGE_SELECTOR = "[class='messageAttachments _z63'], [class='messageAttachments _z63 _8scj']";
    const SELF_MESSAGE_GRANDPARENT_CLASSNAME = "_1c-a _34en _1c_3 _34em";
    const OPP_MESSAGE_GRANDPARENT_CLASSNAME = "_1c-a _34en _3_63";

    const isSelfMessage = (messageNode) => messageNode.parentElement.parentElement.className == SELF_MESSAGE_GRANDPARENT_CLASSNAME;

    const targetNode = document.querySelector(MESSAGE_LIST_SELECTOR);
    const options = { childList: true, subtree: true };

    const callback = (mutationRecords) => {
        mutationRecords.forEach((record) => {
            if (record.target.className == "msg" || record.target.id == "messageGroup") {
                const newTextMessageNode = record.addedNodes[0]?.querySelector(TEXT_MESSAGE_SELECTOR);
                if (newTextMessageNode) {
                    if (isSelfMessage(newTextMessageNode)) {
                        window.selfMessageFunc(newTextMessageNode.innerText);
                    } else {
                        window.oppMessageFunc(newTextMessageNode.innerText);
                    }
                }
            }
        })
    }
    const observer = new MutationObserver(callback)
    observer.observe(targetNode, options);
}