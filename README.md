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
wrangler kv:namespace create "test"

# 🌀 Creating namespace with title "worker-test"
# Would you like to help improve Wrangler by sending usage metrics to Cloudflare? (y/n) n
# Your choice has been saved in the following file: ../../../.wrangler/metrics.json.

#   You can override the user level setting for a project in `wrangler.toml`:

#    - to disable sending metrics for a project: `send_metrics = false`
#    - to enable sending metrics for a project: `send_metrics = true`
# ✨ Success!
# Add the following to your configuration file in your kv_namespaces array:
# { binding = "test", id = "xxx65970bb464xxx8cb373fdaff89xxx" }
```

