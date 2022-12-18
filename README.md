# workers-webhook-notification

## create a workers
```shell
npm install -g wrangler
```

```shell
wrangler login
wrangler whoami
```

```shell
wrangler init webhook-notification

#  ⛅️ wrangler 2.6.2 
# -------------------
# Using npm as package manager.
# ✨ Created webhook-notification/wrangler.toml
# No package.json found. Would you like to create one? (y/n) y
# ✨ Created webhook-notification/package.json
# Would you like to use TypeScript? (y/n) n
# Would you like to create a Worker at webhook-notification/src/index.js?
#   None
#   Fetch handler
# ❯ Scheduled handle
```

```shell
wrangler kv:namespace create "notification_namespace"    

#  ⛅️ wrangler 2.6.2 
# -------------------
# 🌀 Creating namespace with title "webhook-notification-notification_namespace"
# ✨ Success!
# Add the following to your configuration file in your kv_namespaces array:
# { binding = "notification_namespace", id = "xxxx" }
```

```shell
wrangler kv:key put --binding=notification_namespace "standup_owner_names" "alex,bob,mike"

#  ⛅️ wrangler 2.6.2 
# -------------------
# Writing the value "alex,bob,mike" to key "names" on namespace xxxx.
```

```shell
wrangler publish
```