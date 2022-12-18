# workers-webhook-notification

## How to use
### Set up local env
Download cloudflare worker CLI
```shell
npm install -g wrangler
```

Login to cloudflare accout.
```shell
wrangler login
wrangler whoami
```

### Create your own repository


Click the `Use this template` button on GitHub page to create your own repository or clone.

### Create a KV namespace
**Warning**: The name of the namespace you create must be `notification_namespace`, this namespace name used in the code.

```shell
wrangler kv:namespace create "notification_namespace"    

#  ⛅️ wrangler 2.6.2 
# -------------------
# 🌀 Creating namespace with title "webhook-notification-notification_namespace"
# ✨ Success!
# Add the following to your configuration file in your kv_namespaces array:
# { binding = "notification_namespace", id = "xxxx" }
```

Then you can get the message like `{ binding = "notification_namespace", id = "xxxx" }`. copy the namespace config and replace the config in the `/owners-name-switch/wrangler.toml` and `/webhook-notification/wrangler.toml`.

### Store the owners name to KV namespace
Use `wrangler kv:key put` to store the value="alex,bob,mike" to key="standup_owner_names".

```shell
wrangler kv:key put --binding=notification_namespace "standup_owner_names" "alex,bob,mike"

#  ⛅️ wrangler 2.6.2 
# -------------------
# Writing the value "alex,bob,mike" to key "names" on namespace xxxx.
```

### choose the message type
This repo currently support google chat and Weworkchat.

if you want to send the message to google chat. you can following this [create_a_google_chat_webhook](https://developers.google.com/chat/how-tos/webhooks#create_a_webhook) to get a webhook url.

then replace the `GOOGLE_CHAT_WEBHOOK` in the `/owners-name-switch/wrangler.toml` and `/webhook-notification/wrangler.toml`.

if you want to send the message to wework chat，just add a robot to wework chat group and get the webhook url, replace the `WEWORK_CHAT_WEBHOOK` config in the `/owners-name-switch/wrangler.toml` and `/webhook-notification/wrangler.toml` file，please remeber change the `MESSAGE_TYPE` to `WeworkChat`。you can get more detail from [wework chat robot doc](https://developer.work.weixin.qq.com/document/path/91770).

### setup trigger time
**Warning:**only support UTC time now.

config the trigger time by change `[triggers].[crons]` in the `/owners-name-switch/wrangler.toml` and `/webhook-notification/wrangler.toml`.

you can get more workers cron detail in [cron-triggers](https://developers.cloudflare.com/workers/platform/triggers/cron-triggers/).

### publish your workers
```shell
wrangler publish
```