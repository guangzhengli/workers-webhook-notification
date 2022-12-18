/**
 * Welcome to Cloudflare Workers! This is your first scheduled worker.
 *
 * - Run `wrangler dev --local` in your terminal to start a development server
 * - Run `curl "http://localhost:8787/cdn-cgi/mf/scheduled"` to trigger the scheduled event
 * - Go back to the console to see what your worker has logged
 * - Update the Cron trigger in wrangler.toml (see https://developers.cloudflare.com/workers/wrangler/configuration/#triggers)
 * - Run `wrangler publish --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/runtime-apis/scheduled-event/
 */

import { send_google_chat_message } from "./google_chat_notificaiton";

export default {
	async scheduled(controller, env, ctx) {
		console.log("start send message....");

		var standup_owner_name = await get_owner_name(env, env.KV_STANDUP_OWNER_NAMES);
		console.log("standup_owner_name: " + standup_owner_name);

		var message = `今日的站会马上开始!!!\n今日站会 owner 是: ${standup_owner_name}\n会议地址是: https://zoom.us/j/xxxx`;
		console.log("message text: " + message);

		if (env.MESSAGE_TYPE == 'GoogleChat'){
			console.log("start send google chat message");
			send_google_chat_message(env, message);
		} else {
			console.log("message type not support, do nothing....");
		}
	},
};

async function get_owner_name(env, type) {
	var namesString = await env.notification_namespace.get(type);
	var names = namesString.split(',');
	return names[0];
}
 