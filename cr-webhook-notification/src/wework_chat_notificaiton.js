import axios from 'axios';

export async function send_wework_chat_message(env, message) {
    const webhookURL = env.WEWORK_CHAT_WEBHOOK;
    console.log("start send wework, link: " + webhookURL);

    const data = {
        "msgtype": "text",
        "text": {
            "content": message
        }
    };
    let resp;
    try {
        resp = await axios.post(webhookURL, data, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        });
        console.log("send wework success, response: " + resp);
    } catch (error) {
        console.error("send wework failed, error: " + error);
    }
    return resp;
}