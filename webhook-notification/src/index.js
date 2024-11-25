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

import { send_wework_chat_message } from "./wework_chat_notificaiton";

export default {
	async scheduled(controller, env, ctx) {
		console.log("start send message....");

		var namesString = await env.notification_namespace.get(env.KV_STANDUP_OWNER_NAMES);
		var names = namesString.split(',');
		const today_name = names[0];
		const next_name = names[1];

		console.log("standup_owner_name: " + today_name + ", " + next_name);

		var message = `今日的站会 9:40 开始!!!\n今日站会 owner 是: ${today_name}\nZoom🔗：https://thoughtworks.zoom.us/j/96062834928`;
		console.log("message text: " + message);

		console.log("start send wework chat message");
		await send_wework_chat_message(env, message);
	},
};
 