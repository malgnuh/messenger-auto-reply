export function reply(autoMessage) {    
    const SEND_BUTTON_SELECTOR = "button[class='_5y14 _52cp btn btnC mfss touchable']";
    
    document.getElementsByName("body")[0].value = autoMessage;
    const sendButton = document.querySelector(SEND_BUTTON_SELECTOR);
    sendButton.disabled = false;
    sendButton.click();
    
}