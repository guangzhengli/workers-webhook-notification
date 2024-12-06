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

		var next_cr_owner_name = await getAndRotateOwners(env, env.KV_STANDUP_OWNER_NAMES);
		console.log("next_cr_owner_name: " + next_cr_owner_name);

		var message = `下班下班🐶！！下周 CR owner 是: ${next_cr_owner_name}`;

		console.log("message text: " + message);

		await send_wework_chat_message(env, message);
		console.log("send message success....");
	},
};

async function getAndRotateOwners(env, type) {
	var namesString = await env.cr_notification_namespace.get(type);
	var names = namesString.split(',');
	names.push(names.shift());
	var storeNameString = names.join(',');

	await env.cr_notification_namespace.put(type, storeNameString);
	return names[0];
}