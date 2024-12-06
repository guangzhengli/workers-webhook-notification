# workers-webhook-notification

[![My Skills](https://skillicons.dev/icons?i=cloudflare,workers,js)](https://skillicons.dev)

简体中文说明 | [English README](README.en.md)

## 如何使用
### 准备本地环境
下载 Cloudflare worker CLI
```shell
npm install -g wrangler
```

使用 `wrangler login` 登陆账号，使用 `wrangler whoami` 验证是否登陆成功。
```shell
wrangler login
wrangler whoami
```

### 创建你自己的仓库
因为有些配置是私有的，像 webhook 之类的配置如果公开，可能会有人发送垃圾信息，如果不想麻烦的将配置放进 secret 中，可以考虑将仓库设为私有的。

点击上方 `Use this template` 按钮创建一个新的仓库，或者 clone 自行 push.

### 创建 KV namespace
你需要创建一个自己的 KV namespace 来存储轮换名单。

**警告**⚠️: KV namespace 的名字必须是 `notification_namespace`, 因为这个名字直接被代码使用，否则需要你自己修改 `index.js` 中的代码。



使用下方命令创建 namespace。

```shell
wrangler kv:namespace create "notification_namespace"    

#  ⛅️ wrangler 2.6.2 
# -------------------
# 🌀 Creating namespace with title "webhook-notification-notification_namespace"
# ✨ Success!
# Add the following to your configuration file in your kv_namespaces array:
# { binding = "notification_namespace", id = "xxxx" }
```
运行完这个命令，会得到一个像 `{ binding = "notification_namespace", id = "xxxx" }` 的字符串。将它替换到 `/owners-name-switch/wrangler.toml` and `/webhook-notification/wrangler.toml` 文件中的对应 `kv_namespaces` 配置中。



### 将轮换名单存储到 KV namespace 中

使用 `wrangler kv:key put` 命令将 value="alex,bob,mike" 和 key="standup_owner_names" 存储到上一步创建的 namespaces 中.

```shell
wrangler kv:key put --binding=notification_namespace "standup_owner_names" "alex,bob,mike"

#  ⛅️ wrangler 2.6.2 
# -------------------
# Writing the value "alex,bob,mike" to key "names" on namespace xxxx.
```



### 选择你想要发送的消息类型

目前该仓库只支持企业微信(默认) 和 google chat。

如果你想发送消息到企业微信，你需要从企业微信群中添加机器人并获取 webhook url, 并将它替换以下文件的 `WEWORK_CHAT_WEBHOOK` 配置中， 需替换`/owners-name-switch/wrangler.toml` and `/webhook-notification/wrangler.toml`文件，并且记住将 `MESSAGE_TYPE` 改成 `WeworkChat`。你可以从 [企业微信机器人文档](https://developer.work.weixin.qq.com/document/path/91770) 获得更多文档消息。


如果你想发送消息到 google chat. 你可以跟着这篇文章 [create_a_google_chat_webhook](https://developers.google.com/chat/how-tos/webhooks#create_a_webhook) 去拿到 space 的 webhook url.

在 `/owners-name-switch/wrangler.toml` and `/webhook-notification/wrangler.toml` 两个文件中替换 `GOOGLE_CHAT_WEBHOOK` 配置。并且记住将 `MESSAGE_TYPE` 改成 `GoogleChat`。



### 设置定时时间

**警告:** ⚠️目前的时间只支持 UTC 时间，所以需要根据时区进行转换。

修改 `/owners-name-switch/wrangler.toml` and `/webhook-notification/wrangler.toml` 文件中 `[triggers].[crons]` 的配置.

其中 `/owners-name-switch/wrangler.toml` 配置的是切换轮换名单时间，默认是周五 5:00PM UTC+8。

其中 `/webhook-notification/wrangler.toml` 配置的每日提醒的时间，默认是周一至五 10:10PM UTC+8。

你可以从官方文档获得更多的定时信息 [cron-triggers](https://developers.cloudflare.com/workers/platform/triggers/cron-triggers/).



### 发布 worker 到生产环境

执行以下命令即可。

```shell
wrangler publish
```



## 为什么设计这个功能

- 缩短准备时间，包括会议室和share。
- 减少会议开始时常见的灵魂问题，今天的 owner 是谁。
- 常常到点后会有人忘记加入会议。

## 业务功能支持
- 定时发送消息
	- 在工作日时，在会议开始前5分钟时，发送提醒文本。
	- 在周末，不发送消息
- 文本消息
	- 当发送文本消息时，文本包括会议地址，owner，和会议时间。
- 定时轮换 owner 名单