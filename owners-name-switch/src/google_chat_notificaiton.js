import fetch from 'node-fetch';
 
export function send_google_chat_message(env, message) {
    const webhookURL = env.GOOGLE_CHAT_WEBHOOK;

    const data = JSON.stringify({
    'text': message,
    });
    let resp;
    fetch(webhookURL, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
    },
    body: data,
    }).then((response) => {
    resp = response;
    console.log(response);
    });
    return resp;
}
