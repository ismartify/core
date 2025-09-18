const userById = {
  __typename: "User",
  created_at: null,
  id: "wEmB9NipVIQnmPayONJ7L7FG",
  updated_at: "2025-07-16T19:43:18.003Z",
  email: "93220077@qq.com",
  name: "hnzxb",
  slug: "hnzxb",
  type: "user",
};

const b = {
  __typename: "PreferenceSet",
  categories: null,
  channel_types: null,
  id: "default",
  workflows: {
    "daily-usage-overage-summary": { channel_types: { email: false } },
  },
};

const currentUser = {
  token: {
    id: "24b812dbb700d8c02782c0d4740e5f394da6a0cae9292106bb64ca6452a6739d",
    name: "Website, Login with GitHub (Chrome on macOS)",
    type: "token",
    origin: "github",
    scopes: [{ type: "user", origin: "github", createdAt: 1732506970876 }],
    activeAt: 1753324645899,
    createdAt: 1732506970876,
  },
};

const teams = [
  {
    id: "team_GKt67AFKRP48O0IKiI87oovL",
    slug: "ismartify",
    name: "ismartify",
    avatar: "eb40a4dfcb41fc6e84b0b7f82d20c9613efdb977",
    createdAt: 1712277747751,
    created: "2024-04-05T00:42:27.751Z",
    membership: {
      role: "OWNER",
      confirmed: true,
      created: 1712277748785,
      createdAt: 1712277748785,
      teamId: "team_GKt67AFKRP48O0IKiI87oovL",
      updatedAt: 1712277748785,
    },
    enableImageOptimizationNewPrice: true,
    enablePreviewFeedback: null,
    enableProductionFeedback: null,
    sensitiveEnvironmentVariablePolicy: "default",
    isMigratingToSensitiveEnvVars: false,
    creatorId: "wEmB9NipVIQnmPayONJ7L7FG",
    updatedAt: 1749077949413,
    platformVersion: null,
    billing: {
      address: null,
      cancelation: null,
      email: "93220077@qq.com",
      language: null,
      name: "hnzxb's projects",
      platform: "stripe",
      period: null,
      plan: "hobby",
      tax: null,
      currency: "usd",
      trial: null,
      invoiceItems: null,
      status: "active",
      planIteration: "legacy",
      billingVersion: 2,
    },
    description: null,
    profiles: [],
    stagingPrefix: "ismartify",
    resourceConfig: { concurrentBuilds: 1, elasticConcurrencyEnabled: false },
    previewDeploymentSuffix: null,
    softBlock: null,
    blocked: null,
    remoteCaching: { enabled: true },
    flags: {
      "ab-test-enhanced-builds": false,
      "ab-test-turbo-build-machine": false,
      "access-requests-page": true,
      "accessgroups-contributor-on-pro": false,
      "active-branches": true,
      "advanced-firewall-flag": false,
      "affected-project-deployments-self-serve": false,
      "ai-marketplace": false,
      "alerts-observe-tab": false,
      "alerts-tab": false,
      "algolia-full-project-indexing": false,
      "allow-aws-env-vars": true,
      "allow-pro-trials-to-use-analytics-for-free": true,
      "allow-status-code-on-rewrites": false,
      "allow-v5-get-deployment-unauthed": false,
      "always-obtain-in-init": true,
      "always-warm-functions": false,
      "analytics-ga-date": "2023-04-19T20:00:00.000Z",
      "analytics-v2": true,
      "anomaly-webhook": false,
      "ansi-logs": false,
      "api-billing-costs-no-projects": false,
      "api-builds-always-in-sfo": true,
      "api-deployments-fine-tune-get-missing-files-query": false,
      "api-deployments-routes-endpoint": false,
      "api-keys": true,
      "apps-enable-dcr-for-mcp-with-vercel-apps": false,
      "artifacts-jwt-auth": true,
      "artifacts-paid-notification-blocked": false,
      "attackmode-beta-flag": true,
      "audiences-custom-events": false,
      "audit-log": true,
      "audit-log-event-tracking": true,
      "audit-log-export-check": false,
      "audit-log-export-tinybird": true,
      "audit-log-stream": false,
      "audit-log-workos": false,
      "automatic-refund-invoice-items": true,
      "billing-costs-streaming-cache": true,
      "billing-costs-streaming-compression": true,
      "blob-api-read-s3": "production",
      "blob-api-write-s3": "production",
      "blob-existing-stores-billing-start-date": "2025-06-16T13:00:00.000Z",
      "blob-force-beta": false,
      "blob-ga-date": "2025-05-21T13:00:00.000Z",
      "blob-ga-rollout-active": true,
      "block-deploying-from-private-org-repo-to-hobby": true,
      "brakken-scratch-testing": false,
      "build-container-lower-s3-sema": false,
      "build-container-node-fetch-cache-download": false,
      "build-container-retry-on-missing-response-baton": true,
      "build-container-static-asset-compression": true,
      "build-diagnostics-collect-installed-dependencies": true,
      "build-log-highlight-stderr": true,
      "build-suspense-cache": false,
      "bulk-env-variables": true,
      "cache-handler-memory-cache": false,
      "cidr-blocking": true,
      "collect-billing-addresses": true,
      "comment-snapshots": false,
      "comments-markdown": true,
      "compressed-isr-billing": true,
      "conformance-on-vercel-dashboard": false,
      "copper-budget": false,
      "coupon-immediate-apply": false,
      "coupon-redeem-api": false,
      "create-marketplace-integration": false,
      "cron-jobs-billing": false,
      "cron-jobs-deploy-summary": true,
      "custom-rate-limit-override": false,
      "data-cache-billing": false,
      "data-cache-billing-feature": false,
      "data-cache-observability": true,
      "data-cache-usage-api-v2": true,
      "data-cache-usage-feature": false,
      "data-cache-usage-notifications": false,
      "datadog-otlp-traces": false,
      "ddos-usage": false,
      "debug-mode-for-send-logs-to-drains": [
        "in.logs.betterstack.com",
        "in.logtail.com",
        "nr-data.net",
      ],
      "delegated-billing": false,
      "delete-orb-team": false,
      "delete-stores-with-missing-owner": true,
      "deploy-edge-functions-concurrently": true,
      "deployment-enabled-globs": true,
      "deployment-integrations": true,
      "deployment-retention": false,
      "deployment-routes-build-output": false,
      "deployment-routes-build-output-v1": true,
      "deployment-routes-build-output-v2": false,
      "deployment-routes-build-output-v3": false,
      "deployment-routes-clean": true,
      "deployment-time-chart": false,
      "deployments-page-date-picker": true,
      "detect-node-version-on-project-creation": true,
      "disable-error-log-drains": true,
      "disable-error-log-drains-dry-run": true,
      "disable-invocation-log-drains": false,
      "disable-log-drain-UI": true,
      "disable-spend-management": false,
      "discover-build-container-folder-sizes": true,
      "discussion-view": false,
      "display-log-drain-usage": true,
      "docs-ai-experiment": false,
      "eager-provision-concurrency": false,
      "edge-config-billing": true,
      "edge-config-header": true,
      "edge-config-schema-protection": true,
      "edge-config-webhooks": false,
      "edge-config-worker-skip": true,
      "edge-cross-request-fetch": true,
      "edge-fns-on-workerd-unbundled-format": true,
      "edge-functions-artifacts-in-filesystem": true,
      "edge-functions-bundle-batch-size": 15,
      "edge-functions-cf-streams-enable-constructors": true,
      "edge-functions-embedded-sourcemaps": true,
      "edge-functions-enable-create-func-dedupe": true,
      "edge-functions-enhanced-resolve": false,
      "edge-functions-entitlements-display": false,
      "edge-functions-on-serverless-artifacts-in-filesystem": true,
      "edge-functions-on-serverless-custom-max-duration": 300,
      "edge-functions-on-serverless-custom-memory-size": 1024,
      "edge-functions-on-serverless-node": true,
      "edge-functions-on-serverless-node-no-cf-deploy": true,
      "edge-functions-on-serverless-source-map-artifacts-in-filesystem": false,
      "edge-functions-on-serverless-tracing-disabled": false,
      "edge-functions-on-serverless-workerd": true,
      "edge-functions-readiness-probe": false,
      "edge-functions-regional-invocation": true,
      "edge-functions-regional-invocation-project-home": false,
      "edge-middleware-billing-start-date": 1657292400000,
      "edge-middleware-on-serverless-custom-memory-size": 1024,
      "edge-middleware-on-serverless-node": true,
      "edge-middleware-on-serverless-node-no-cf-deploy": true,
      "edge-otel-collector": true,
      "edge-suspense-cache": true,
      "eight-core-enhanced-builds": false,
      "emit-dd-field-in-log-drains": false,
      "enable-blob-spend-management": true,
      "enable-build-container-profiling": false,
      "enable-code-checks": false,
      "enable-dashboard-mono-recent-writes": true,
      "enable-dashboard-recent-writes": true,
      "enable-dashboard-recents": true,
      "enable-dashboard-recents-clone": false,
      "enable-domain-search": true,
      "enable-extended-fallback-payload": true,
      "enable-func-node-runtime-preferred-region": false,
      "enable-function-resource-pruning": false,
      "enable-gzip-for-drain-payloads": false,
      "enable-hive-functions": false,
      "enable-ignore-build-step-with-squashfs": true,
      "enable-large-build-cache": false,
      "enable-log-body-in-process-records": true,
      "enable-logs-query-string": true,
      "enable-multi-region-build-cache": true,
      "enable-observability-error-dashboard": false,
      "enable-parallel-cache-download": false,
      "enable-path-lookup-doc-v1": true,
      "enable-ppr-experimental": true,
      "enable-process-records-debug-log": false,
      "enable-recent-queue-writes": true,
      "enable-recents-prune-on-read": true,
      "enable-regionalized-isr": true,
      "enable-rewrite-logs": false,
      "enable-session-tracing-system-drain": false,
      "enable-ship-spend-management": true,
      "enable-static-logs": false,
      "enable-test-webhooks": false,
      "enable-usage-summary-emails": true,
      "enable-vercel-auth-for-new-projects": true,
      "enable-vercel-variant-docs": false,
      "encrypt-deployment-build-env": true,
      "encrypt-function-config-environment": true,
      "enforce-scopes-for-new-integrations": false,
      "experiment-editor": false,
      "experimental-streaming-actions": false,
      "expose-deployment-protections-as-env-vars": true,
      "federated-webhooks": "enabled",
      "feedback-command-k": false,
      "feedback-commands": true,
      "feedback-content-moderation": true,
      "feedback-edit-mode": true,
      "feedback-inline-editing": false,
      "feedback-layout-shifts": true,
      "feedback-page-content-update": false,
      "feedback-project-management-integration": true,
      "feedback-reactions": true,
      "feedback-sharing-modal": true,
      "feedback-tips": false,
      "feedback-variants-deploy-step": false,
      "firewall-custom-rules": true,
      "firewall-custom-system-bypass": false,
      "firewall-ip-bypass": true,
      "firewall-ip-bypass-limit-override": 100,
      "firewall-log-drains": true,
      "firewall-managed-ai-bots": true,
      "firewall-managed-rules": true,
      "firewall-owasp": false,
      "firewall-rate-limiting": false,
      "firewall-transform-rules": false,
      "firewall-webhooks": true,
      "flags-platform-integration": true,
      "flags-tab": false,
      "fluid-by-default": true,
      "fluid-metrics": false,
      "free-tier-project-limits": true,
      "gatsby-builder-plugin": true,
      "git-exclusivity": true,
      "git-filter-blob-none-support-for-build-container": false,
      "git-lfs-support-for-build-container": false,
      "git-push-repo-private-templates": false,
      "hackathon-2024-my-ships": false,
      "hackathon-2024-turbo-ci": false,
      "hackathon-surface-failed-jobs": false,
      "hackweek2024-toolbar-render-observer": false,
      "hard-delete-kv-store": true,
      "hard-delete-postgres-store": true,
      "hard-delete-store": true,
      "has-log-drains-grace-period": true,
      "hide-deployment-details-for-skipped-builds": true,
      "hide-request-access": false,
      "hide-zero-dollar-invoice-items": false,
      "iam-user-entitlements": true,
      "iam-user-entitlements-force-v0": false,
      "idp-info-migration": false,
      "ignore-std-in-build-log-highlighting": true,
      "image-optimization-sources": true,
      "import-next-js-traces-to-datadog": false,
      "increase-post-lambda-limit": true,
      "index-open-search-branches": true,
      "india-mandates": true,
      "insert-isr-update-logs-in-tinybird": true,
      "instant-preview-url": true,
      "instant-rollback": true,
      "instant-rollback-ga": false,
      "instant-rollback-hobby-restriction": true,
      "integration-configuration-upsert-disabled": false,
      "integrations-auto-project-scope": true,
      "internal-file-ref-sema": false,
      "invite-flow-sift-evaluation": true,
      "ip-blocking": true,
      "ip-diff-enabled": true,
      "is-oem-partner": false,
      "isolated-project-builds": "disabled",
      "kinesis-autoscale-configuration": {
        windowSize: 2,
        metricsGranularityInMinutes: 1,
        metricsTimeRangeInMinutes: 5,
        shardCountIncrease: 4,
        threshold: 0.75,
      },
      "lambda-outputs-as-middleware": true,
      "ld-on-demand-concurrency-minutes": true,
      "ld-on-demand-concurrent-builds-5-minute-slot": false,
      "ld-on-demand-concurrent-builds-on-pro": false,
      "list-view-feedback-popover": false,
      "lock-by-owner-in-pick-sbq": true,
      "log-drain-compression": false,
      "log-drain-compression-domains": {
        "http-intake.logs.datadoghq.eu": "gzip",
        "http-intake.logs.ddog-gov.com": "gzip",
        "http-intake.logs.us3.datadoghq.com": "gzip",
        "http-intake.logs.us5.datadoghq.com": "gzip",
        "log-api.eu.newrelic.com": "gzip",
        "log-api.newrelic.com": "gzip",
        "http-intake.logs.ap1.datadoghq.com": "gzip",
        "http-intake.logs.datadoghq.com": "gzip",
      },
      "log-drain-compression-vercel-test": false,
      "log-drain-edge-config": true,
      "log-drain-edge-metadata": false,
      "log-drain-ja-3-digest": false,
      "log-drain-request-id-change": true,
      "log-drain-response-byte-size": false,
      "log-drain-static-vector": false,
      "log-drains-billing": false,
      "log-drains-deployment-meta": false,
      "log-drains-ga": true,
      "log-drains-project-name": true,
      "log-trace-correlation-via-drains": true,
      "logdrains-delivery-timeout": {
        "in.logtail.com": {
          "ap-east-1": 7000,
          "ap-northeast-1": 7000,
          "ap-northeast-2": 7500,
          "ap-northeast-3": 6500,
          "ap-southeast-1": 7000,
          "ap-southeast-2": 7000,
        },
        "api.axiom.co": {
          "eu-west-1": 7000,
          "ap-southeast-2": 7000,
          "ap-south-1": 7000,
          "ap-northeast-2": 7000,
          "sa-east-1": 7000,
          "us-west-2": 7000,
          "us-west-1": 7000,
          "ap-east-1": 7000,
          "ap-northeast-1": 7000,
          "af-south-1": 7000,
          "ap-northeast-3": 7000,
          "eu-west-3": 7000,
          "ap-southeast-1": 7000,
          "eu-central-1": 7000,
          "us-east-2": 7000,
          "eu-north-1": 7000,
          "us-east-1": 7000,
          "eu-west-2": 7000,
        },
        "cloud.axiom.co": {
          "ap-northeast-1": 7000,
          "us-west-2": 7000,
          "eu-west-2": 7000,
          "us-east-1": 7000,
          "eu-west-1": 7000,
          "ap-southeast-1": 7000,
          "eu-west-3": 7000,
          "eu-north-1": 7000,
          "eu-central-1": 7000,
          "ap-east-1": 7000,
          "ap-south-1": 7000,
          "ap-northeast-2": 7000,
          "us-east-2": 7000,
          "af-south-1": 7000,
          "ap-southeast-2": 7000,
          "ap-northeast-3": 7000,
          "sa-east-1": 7000,
          "us-west-1": 7000,
        },
        "in.logs.betterstack.com": {
          "ap-northeast-2": 7500,
          "ap-northeast-3": 6500,
          "ap-southeast-1": 7000,
          "ap-southeast-2": 7000,
          "ap-east-1": 7000,
          "ap-northeast-1": 7000,
        },
      },
      "login-with-vercel": false,
      "logs-consumer-3-use-redis-cache": true,
      "logs-consumer-3-use-s3-for-log-drains-payload": true,
      "logs-fetch-metrics": true,
      "logs-search-filter": true,
      "logs-timeseries": false,
      "manual-git-deploys": true,
      "marketplace-billing-authorization": true,
      "marketplace-failed-topup-notifications": false,
      "marketplace-integration-configuration-merge-flow": true,
      "marketplace-integration-configuration-transfer-to-team": true,
      "marketplace-integration-resource-dependency-claims": false,
      "marketplace-ledger": false,
      "marketplace-migration": true,
      "marketplace-prepayment-livemode": true,
      "marketplace-rank-flags-providers": false,
      "marketplace-reviewers": false,
      "marketplace-stripe-invoicing": true,
      "marketplace-test-integration": false,
      "marketplace-unique-resource-name-on-sync-store-team-scoped": false,
      "marketplace-upstash": false,
      "members-idp-profile": false,
      "members-mfa-status": true,
      "mfa-enforcement": true,
      "microfrontends-alias": false,
      "microfrontends-branch-alias-2": false,
      "microfrontends-commit-alias": false,
      "microfrontends-fallback-to-preview-env": false,
      "microfrontends-new-fallback-behavior": false,
      "microfrontends-package-json-name": false,
      "microfrontends-polyrepo-write-configuration": true,
      "monitoring-access-override": false,
      "monitoring-advanced-aggregations": true,
      "monitoring-deprecation": true,
      "monitoring-invoice-item": false,
      "monitoring-minimum-granularity": "5min",
      "monitoring-pricing-2.0": true,
      "monitoring-project-picker": false,
      "monitoring-query-variant": "queryEngine",
      "move-branches-with-project-transfer": true,
      "move-build-logs-with-project-transfer": false,
      "multi-automation-bypass": false,
      "multi-container-support": false,
      "multi-team-bitbucket": true,
      "n1-legacy-logs": false,
      "n1-request-cancellation": false,
      "net-cpu-functions": true,
      "new-builds-usage-query": true,
      "new-dp-standard-protection": true,
      "new-instant-rollback-flow": false,
      "new-monorepo-onboarding": false,
      "new-project-transfer": false,
      "new-upgrade-flow": false,
      "next-preload-common-chunks": false,
      "node-bridge-compress-multi-payloads": true,
      "node-bridge-compress-serverless-response": true,
      "node-bridge-fetch-o11y": true,
      "node-bridge-recursion-guard": true,
      "node-compatibility-for-edge-functions": true,
      "northern-lights-pro-trial-banner": false,
      "notifications-alpha": true,
      "notifier-email": true,
      "nsnb-email-notifications": true,
      "observability-anomaly-slack-channel-id": "",
      "observability-plus-access": "inherit",
      "observe-tab": false,
      "open-telemetry": true,
      "open-telemetry-api-scope": false,
      "open-telemetry-datadog": false,
      "optimize-global-invalidations": true,
      "orb-migration-level": "none",
      "orb-subscription-state": false,
      "pause-team-projects": true,
      "percentage-multi-container-rollout": 0,
      "postgres-default-role": false,
      "postgres-hobby-trial-suspension": false,
      "ppp-protect-past-production": true,
      "pr-comment-table-format": true,
      "prerender-metadata-as-metadata-file": true,
      "prevent-subrequest-skipping-in-nextjs": true,
      "preview-comments-default-on": true,
      "private-org-repo-to-hobby-blocked-email-notification": true,
      "pro-and-ent-on-demand-enhanced-builds": true,
      "pro-and-ent-on-demand-ultra-builds": false,
      "pro-automatic-refund-delete": true,
      "pro-automatic-refund-downgrade": true,
      "pro-trial-experiment": false,
      "production-deployment-pruning-enabled": true,
      "project-budget-rules": false,
      "project-checks-enabled": false,
      "project-domain-webhooks": true,
      "project-entities-overview": true,
      "project-rbac-access-groups": false,
      "project-settings-git-comments": true,
      "project-team-invite-improvements": false,
      "project-transfer-requests": false,
      "protected-git-scopes-id": false,
      "pusher-deployment-events": true,
      "quality-scan": false,
      "randomized-intake": false,
      "rbac-access-groups": true,
      "rbac-billing-role-on-pro": true,
      "rbac-developer-can-deploy-to-production-from-git": true,
      "rbac-filtering-by-project-ids": true,
      "rbac-update": false,
      "redacted-build-logs": false,
      "redeploy-by-deployment-id": true,
      "remove-auto-generated-log-message": true,
      "remove-prepended-slash-from-logs": false,
      "report-abuse": false,
      "repository-dispatch-events": true,
      "repository-dispatch-project-events": false,
      "require-production-alias-to-promote": true,
      "require-scopes-for-old-integrations": false,
      "reseller-teams": false,
      "restrict-log-drains-for-hobby": false,
      "restricted-environment-variable-access-for-integrations": true,
      "richer-deployment-outputs": true,
      "richer-deployment-outputs-ui": true,
      "rolling-releases": true,
      "rollout-vercel-plus": false,
      "route-high-concurrency-builds-to-honey": true,
      "runtime-logs-extended-timeline": false,
      "sc-async-fetch-experiment": true,
      "sddj-github-event-dlq-test": false,
      "sddj-github-graphql-migration": false,
      "sddj-node-engine-lookup-from-package-json": "fetch-and-send",
      "search-open-search-branches": true,
      "search-open-search-domains": false,
      "search-open-search-projects": true,
      "seawall-config": false,
      "secure-compute-cloudformation-template-version":
        "6FURYLklIkOhYAKoP_oKBnbPLE1kktKw",
      "secure-compute-eight-core-enhanced-builds": false,
      "secure-compute-environments": true,
      "secure-compute-hive-enabled-private-network": "",
      "secure-compute-project-usage-tracking": true,
      "secure-compute-with-hive-connector": false,
      "secure-connect-static-ips": false,
      "secure-integration-tokens-with-scopes": false,
      "send-edge-cache-hit-logs": false,
      "send-fetch-metrics-to-drains": false,
      "send-log-drain-audit-log": true,
      "send-prerender-logs-to-tinybird": false,
      "serverless-function-failover": true,
      "serverless-suspense-cache": true,
      "set-requested-at-production-on-deployment": true,
      "set-vercel-shallow-since-clone": false,
      "sharded-isr-l4-cache": false,
      "sharing-experience-invitation": true,
      "show-build-diagnostics": false,
      "show-flags-panel-for-analytics": false,
      "show-invoice-page-payment": true,
      "show-logs-grouping": true,
      "show-scopes-for-old-integrations": false,
      "skip-custom-domain-assignment": true,
      "skip-ultra-billing": false,
      "slack-link-unfurls": false,
      "slack-subscribe-command": true,
      "sms-notifications": false,
      "speed-insights-pricing-refresh-1": false,
      "spend-caps-configuration-enabled": false,
      "spend-caps-notifications-enabled": false,
      "spend-caps-pausing-enabled": false,
      "ssdj-api-deployments-early-ignore-step": true,
      "ssdj-api-deployments-redis-semaphore": false,
      "start-sending-to-sbq": false,
      "statement-of-reasons-notification": true,
      "stop-sending-to-nbl": false,
      "storage-enterprise": "",
      "storage-inactive-store-deletion-redis": true,
      "storage-integration": true,
      "storage-neon-domain": true,
      "storage-neon-ssl-mode": true,
      "storage-suspension-queue-v2": true,
      "storage-test-kv-cname": false,
      "storage-transfer-enterprise": false,
      "storage-upstash-domain": true,
      "storage-usage-threshold-limits": false,
      "storage-usage-v2": true,
      "storage-usage-v3": true,
      "storage-usage-v4": true,
      "storage-usage-v5": true,
      "store-billing-1": true,
      "store-list-rsc": true,
      "store-pinecone": false,
      "store-source-deployment-on-build-cache": true,
      "store-status-design": true,
      "store-uncompressed-size-on-build-cache": false,
      "stripe-immediate-migration-mode": "end-of-cycle",
      "stuck-deployments-fix": false,
      "sugp-deployment-ready-handling": false,
      "sunset-secrets": true,
      "support-center": true,
      "team-default-deployment-protection": false,
      "team-env-variables": true,
      "throttle-worker-uploads": false,
      "tinybird-upcoming-invoice": false,
      "toolbar-accessibility-audit": true,
      "toolbar-accessibility-auto-run": true,
      "toolbar-auto-hide": false,
      "toolbar-bisect": false,
      "toolbar-bundle-size": false,
      "toolbar-cmdk-branch-switcher": true,
      "toolbar-cookie-injection": true,
      "toolbar-distributed-tracing": false,
      "toolbar-inp": true,
      "toolbar-inspector": false,
      "toolbar-multi-zone": false,
      "toolbar-no-personal-scope": false,
      "toolbar-open-graph": true,
      "toolbar-ppr-viewer": false,
      "toolbar-recents": false,
      "toolbar-runtime-logs": false,
      "toolbar-shrink": false,
      "toolbar-snap": false,
      "toolbar-tracing": false,
      "treat-edge-functions-as-lambdas-when-declaring-output": false,
      "trusted-i-ps-custom-limit": 20,
      "tty-build-logs": false,
      "turborepo-future": true,
      "unprotected-projects-warning": false,
      "upgrade-modal-add-ons": true,
      "upgrade-monitoring-pro-trial": false,
      "upload-edge-functions-with-the-post-edge-functions-endpoint": false,
      "upload-microfrontends-configuration-earlier": true,
      "usage-overage-notifications": true,
      "usage-project-names": false,
      "use-async-transpile-for-edge-functions": false,
      "use-build-outputs-for-general-purpose-edge-functions": true,
      "use-bundled-usage-model-for-cloudflare-workers": false,
      "use-bytecode-caching": true,
      "use-edge-functions-bridge-latest": false,
      "use-edge-functions-full-env": true,
      "use-edge-functions-logger-worker": false,
      "use-esm-syntax-for-edge-functions": true,
      "use-global-agent-for-s3-uploads": false,
      "use-kinesis-autoscale": false,
      "use-live-feedback": true,
      "use-namespaced-workers-for-deployments": true,
      "use-new-speed-insights-usage-facts": false,
      "use-next-js-bundled-server": true,
      "use-only-streaming-lambda": true,
      "use-output-for-edge-functions": true,
      "use-pnpm-file": false,
      "use-pnpm-store-cache": false,
      "use-rust-edge-layer-latest": false,
      "use-rust-edge-worker-layer-latest": true,
      "use-rust-layer-latest": true,
      "use-s3-for-functions-environment": false,
      "use-s3-worker-lookup": true,
      "use-single-invoke-prerender-revalidate": true,
      "use-squashfs-build-cache": true,
      "use-streaming-prerender": true,
      "use-strict-mode-on-edge-function-deployments": true,
      "v0-deploy-to-vercel-for-everyone": true,
      "v0-ent-only": false,
      "v0-in-the-toolbar": false,
      "v0-teams-trial": false,
      "validate-deployment-promoted": false,
      "vc-build-monorepo-support": true,
      "vdc-remote-cache": false,
      "verbose-domain-registration-errors": true,
      "vercel-apps": false,
      "vercel-auth-request-access": true,
      "vercel-blob-usage-policy": true,
      "vercel-blob-usage-policy-v2": true,
      "vercel-branch-url-system-env": true,
      "vercel-coin": false,
      "vercel-dca": true,
      "vercel-production-url-system-env": true,
      "vercel-sandbox-region-param": false,
      "vercel-sandbox-resource-limits": {
        maxVcpus: 8,
        maxMemory: 16384,
        maxTimeoutMs: 2700000,
      },
      "vercel-sandbox-stream-write-file": true,
      "vercel-storage-domain": true,
      "verified-bots-bypass": false,
      "viewer-vercel-plus": false,
      "visit-with-the-toolbar": true,
      "vpc-peering": false,
      wagyu: true,
      "wake-up-deployment": true,
      "web-analytics-billing": true,
      "web-analytics-empty-state": true,
      "web-analytics-pricing-refresh": true,
      "web-analytics-unbundle": "enabled",
      "webhook-domain-created": "disabled",
      "webhooks-as-code": false,
      "webhooks-v2": true,
      "webook-deployment-promoted": true,
      "zero-config-onboarding-monorepo": true,
      "zero-trial-experiment": "off",
      "web-analytics-beta-participant": false,
    },
    permissions: {
      oauth2Connection: ["create", "delete", "read", "update", "list"],
      user: ["create", "delete", "read", "update", "list"],
      userConnection: ["create", "delete", "read", "update", "list"],
      userSudo: ["create", "delete", "read", "update", "list"],
      webAuthn: ["create", "delete", "read", "update", "list"],
      accessGroup: ["create", "delete", "read", "update", "list"],
      aliasGlobal: ["create", "delete", "read", "update", "list"],
      analyticsSampling: ["create", "delete", "read", "update", "list"],
      analyticsUsage: ["create", "delete", "read", "update", "list"],
      auditLog: ["create", "delete", "read", "update", "list"],
      billingAddress: ["create", "delete", "read", "update", "list"],
      billingInformation: ["create", "delete", "read", "update", "list"],
      billingInvoice: ["create", "delete", "read", "update", "list"],
      billingInvoiceEmailRecipient: [
        "create",
        "delete",
        "read",
        "update",
        "list",
      ],
      billingInvoiceLanguage: ["create", "delete", "read", "update", "list"],
      billingPlan: ["create", "delete", "read", "update", "list"],
      billingPurchaseOrder: ["create", "delete", "read", "update", "list"],
      billingTaxId: ["create", "delete", "read", "update", "list"],
      blob: ["create", "delete", "read", "update", "list"],
      budget: ["create", "delete", "read", "update", "list"],
      cacheArtifact: ["create", "delete", "read", "update", "list"],
      cacheArtifactUsageEvent: ["create", "delete", "read", "update", "list"],
      codeChecks: ["create", "delete", "read", "update", "list"],
      concurrentBuilds: ["create", "delete", "read", "update", "list"],
      connect: ["create", "delete", "read", "update", "list"],
      connectConfiguration: ["create", "delete", "read", "update", "list"],
      defaultDeploymentProtection: [
        "create",
        "delete",
        "read",
        "update",
        "list",
      ],
      domain: ["create", "delete", "read", "update", "list"],
      domainAcceptDelegation: ["create", "delete", "read", "update", "list"],
      domainAuthCodes: ["create", "delete", "read", "update", "list"],
      domainCertificate: ["create", "delete", "read", "update", "list"],
      domainCheckConfig: ["create", "delete", "read", "update", "list"],
      domainMove: ["create", "delete", "read", "update", "list"],
      domainPurchase: ["create", "delete", "read", "update", "list"],
      domainRecord: ["create", "delete", "read", "update", "list"],
      domainTransferIn: ["create", "delete", "read", "update", "list"],
      event: ["create", "delete", "read", "update", "list"],
      ownEvent: ["create", "delete", "read", "update", "list"],
      sensitiveEnvironmentVariablePolicy: [
        "create",
        "delete",
        "read",
        "update",
        "list",
      ],
      fileUpload: ["create", "delete", "read", "update", "list"],
      flagsExplorerSubscription: ["create", "delete", "read", "update", "list"],
      gitRepository: ["create", "delete", "read", "update", "list"],
      ipBlocking: ["create", "delete", "read", "update", "list"],
      imageOptimizationNewPrice: ["create", "delete", "read", "update", "list"],
      integration: ["create", "delete", "read", "update", "list"],
      integrationAccount: ["create", "delete", "read", "update", "list"],
      integrationConfiguration: ["create", "delete", "read", "update", "list"],
      integrationConfigurationTransfer: [
        "create",
        "delete",
        "read",
        "update",
        "list",
      ],
      integrationConfigurationProjects: [
        "create",
        "delete",
        "read",
        "update",
        "list",
      ],
      integrationVercelConfigurationOverride: [
        "create",
        "delete",
        "read",
        "update",
        "list",
      ],
      integrationConfigurationRole: [
        "create",
        "delete",
        "read",
        "update",
        "list",
      ],
      integrationSSOSession: ["create", "delete", "read", "update", "list"],
      integrationResource: ["create", "delete", "read", "update", "list"],
      integrationEvent: ["create", "delete", "read", "update", "list"],
      integrationResourceSecrets: [
        "create",
        "delete",
        "read",
        "update",
        "list",
      ],
      integrationDeploymentAction: [
        "create",
        "delete",
        "read",
        "update",
        "list",
      ],
      marketplaceInstallationMember: [
        "create",
        "delete",
        "read",
        "update",
        "list",
      ],
      marketplaceBillingData: ["create", "delete", "read", "update", "list"],
      marketplaceInvoice: ["create", "delete", "read", "update", "list"],
      marketplaceExperimentationItem: [
        "create",
        "delete",
        "read",
        "update",
        "list",
      ],
      marketplaceExperimentationEdgeConfigData: [
        "create",
        "delete",
        "read",
        "update",
        "list",
      ],
      jobGlobal: ["create", "delete", "read", "update", "list"],
      drain: ["create", "delete", "read", "update", "list"],
      logDrain: ["create", "delete", "read", "update", "list"],
      Monitoring: ["create", "delete", "read", "update", "list"],
      monitoringSettings: ["create", "delete", "read", "update", "list"],
      monitoringQuery: ["create", "delete", "read", "update", "list"],
      monitoringChart: ["create", "delete", "read", "update", "list"],
      monitoringAlert: ["create", "delete", "read", "update", "list"],
      notificationDeploymentFailed: [
        "create",
        "delete",
        "read",
        "update",
        "list",
      ],
      notificationDomainConfiguration: [
        "create",
        "delete",
        "read",
        "update",
        "list",
      ],
      notificationDomainExpire: ["create", "delete", "read", "update", "list"],
      notificationDomainMoved: ["create", "delete", "read", "update", "list"],
      notificationDomainPurchase: [
        "create",
        "delete",
        "read",
        "update",
        "list",
      ],
      notificationDomainRenewal: ["create", "delete", "read", "update", "list"],
      notificationDomainTransfer: [
        "create",
        "delete",
        "read",
        "update",
        "list",
      ],
      notificationDomainUnverified: [
        "create",
        "delete",
        "read",
        "update",
        "list",
      ],
      NotificationMonitoringAlert: [
        "create",
        "delete",
        "read",
        "update",
        "list",
      ],
      notificationPaymentFailed: ["create", "delete", "read", "update", "list"],
      notificationUsageAlert: ["create", "delete", "read", "update", "list"],
      notificationPreferences: ["create", "delete", "read", "update", "list"],
      notificationCustomerBudget: [
        "create",
        "delete",
        "read",
        "update",
        "list",
      ],
      notificationStatementOfReasons: [
        "create",
        "delete",
        "read",
        "update",
        "list",
      ],
      observabilityConfiguration: [
        "create",
        "delete",
        "read",
        "update",
        "list",
      ],
      observabilityNotebook: ["create", "delete", "read", "update", "list"],
      observabilityFunnel: ["create", "delete", "read", "update", "list"],
      openTelemetryEndpoint: ["create", "delete", "read", "update", "list"],
      vercelAppInstallation: ["create", "delete", "read", "update", "list"],
      paymentMethod: ["create", "delete", "read", "update", "list"],
      permissions: ["create", "delete", "read", "update", "list"],
      postgres: ["create", "delete", "read", "update", "list"],
      previewDeploymentSuffix: ["create", "delete", "read", "update", "list"],
      proTrialOnboarding: ["create", "delete", "read", "update", "list"],
      sharedEnvVars: ["create", "delete", "read", "update", "list"],
      sharedEnvVarsProduction: ["create", "delete", "read", "update", "list"],
      space: ["create", "delete", "read", "update", "list"],
      spaceRun: ["create", "delete", "read", "update", "list"],
      passwordProtectionInvoiceItem: [
        "create",
        "delete",
        "read",
        "update",
        "list",
      ],
      rateLimit: ["create", "delete", "read", "update", "list"],
      redis: ["create", "delete", "read", "update", "list"],
      repository: ["create", "delete", "read", "update", "list"],
      remoteCaching: ["create", "delete", "read", "update", "list"],
      samlConfig: ["create", "delete", "read", "update", "list"],
      secret: ["create", "delete", "read", "update", "list"],
      redisStoreTokenSet: ["create", "delete", "read", "update", "list"],
      blobStoreTokenSet: ["create", "delete", "read", "update", "list"],
      postgresStoreTokenSet: ["create", "delete", "read", "update", "list"],
      integrationStoreTokenSet: ["create", "delete", "read", "update", "list"],
      integrationResourceReplCommand: [
        "create",
        "delete",
        "read",
        "update",
        "list",
      ],
      storeTransfer: ["create", "delete", "read", "update", "list"],
      supportCase: ["create", "delete", "read", "update", "list"],
      supportCaseComment: ["create", "delete", "read", "update", "list"],
      dataCacheBillingSettings: ["create", "delete", "read", "update", "list"],
      team: ["create", "delete", "read", "update", "list"],
      teamAccessRequest: ["create", "delete", "read", "update", "list"],
      teamFellowMembership: ["create", "delete", "read", "update", "list"],
      teamGitExclusivity: ["create", "delete", "read", "update", "list"],
      teamInvite: ["create", "delete", "read", "update", "list"],
      teamInviteCode: ["create", "delete", "read", "update", "list"],
      teamJoin: ["create", "delete", "read", "update", "list"],
      teamMemberMfaStatus: ["create", "delete", "read", "update", "list"],
      teamMicrofrontends: ["create", "delete", "read", "update", "list"],
      teamOwnMembership: ["create", "delete", "read", "update", "list"],
      teamOwnMembershipDisconnectSAML: [
        "create",
        "delete",
        "read",
        "update",
        "list",
      ],
      token: ["create", "delete", "read", "update", "list"],
      usage: ["create", "delete", "read", "update", "list"],
      usageCycle: ["create", "delete", "read", "update", "list"],
      vpcPeeringConnection: ["create", "delete", "read", "update", "list"],
      webAnalyticsPlan: ["create", "delete", "read", "update", "list"],
      edgeConfig: ["create", "delete", "read", "update", "list"],
      edgeConfigItem: ["create", "delete", "read", "update", "list"],
      edgeConfigSchema: ["create", "delete", "read", "update", "list"],
      edgeConfigToken: ["create", "delete", "read", "update", "list"],
      webhook: ["create", "delete", "read", "update", "list"],
      "webhook-event": ["create", "delete", "read", "update", "list"],
      endpointVerification: ["create", "delete", "read", "update", "list"],
      projectTransferIn: ["create", "delete", "read", "update", "list"],
      oauth2Application: ["create", "delete", "read", "update", "list"],
      vercelRun: ["create", "delete", "read", "update", "list"],
      vercelRunExec: ["create", "delete", "read", "update", "list"],
      apiKey: ["create", "delete", "read", "update", "list"],
      apiKeyOwnedBySelf: ["create", "delete", "read", "update", "list"],
      aliasProject: ["create", "delete", "read", "update", "list"],
      aliasProtectionBypass: ["create", "delete", "read", "update", "list"],
      buildMachine: ["create", "delete", "read", "update", "list"],
      productionAliasProtectionBypass: [
        "create",
        "delete",
        "read",
        "update",
        "list",
      ],
      connectConfigurationLink: ["create", "delete", "read", "update", "list"],
      dataCacheNamespace: ["create", "delete", "read", "update", "list"],
      deployment: ["create", "delete", "read", "update", "list"],
      deploymentCheck: ["create", "delete", "read", "update", "list"],
      deploymentCheckPreview: ["create", "delete", "read", "update", "list"],
      deploymentCheckReRunFromProductionBranch: [
        "create",
        "delete",
        "read",
        "update",
        "list",
      ],
      deploymentProductionGit: ["create", "delete", "read", "update", "list"],
      deploymentV0: ["create", "delete", "read", "update", "list"],
      deploymentPreview: ["create", "delete", "read", "update", "list"],
      deploymentPrivate: ["create", "delete", "read", "update", "list"],
      deploymentPromote: ["create", "delete", "read", "update", "list"],
      deploymentRollback: ["create", "delete", "read", "update", "list"],
      edgeCacheNamespace: ["create", "delete", "read", "update", "list"],
      environments: ["create", "delete", "read", "update", "list"],
      logs: ["create", "delete", "read", "update", "list"],
      logsPreset: ["create", "delete", "read", "update", "list"],
      passwordProtection: ["create", "delete", "read", "update", "list"],
      optionsAllowlist: ["create", "delete", "read", "update", "list"],
      job: ["create", "delete", "read", "update", "list"],
      observabilityData: ["create", "delete", "read", "update", "list"],
      onDemandBuild: ["create", "delete", "read", "update", "list"],
      onDemandConcurrency: ["create", "delete", "read", "update", "list"],
      project: ["create", "delete", "read", "update", "list"],
      projectFromV0: ["create", "delete", "read", "update", "list"],
      projectAccessGroup: ["create", "delete", "read", "update", "list"],
      projectAnalyticsSampling: ["create", "delete", "read", "update", "list"],
      projectCheck: ["create", "delete", "read", "update", "list"],
      projectCheckRun: ["create", "delete", "read", "update", "list"],
      projectDeploymentHook: ["create", "delete", "read", "update", "list"],
      projectDomain: ["create", "delete", "read", "update", "list"],
      projectDomainMove: ["create", "delete", "read", "update", "list"],
      projectDomainCheckConfig: ["create", "delete", "read", "update", "list"],
      projectEnvVars: ["create", "delete", "read", "update", "list"],
      projectEnvVarsProduction: ["create", "delete", "read", "update", "list"],
      projectEnvVarsUnownedByIntegration: [
        "create",
        "delete",
        "read",
        "update",
        "list",
      ],
      projectFlags: ["create", "delete", "read", "update", "list"],
      projectId: ["create", "delete", "read", "update", "list"],
      projectIntegrationConfiguration: [
        "create",
        "delete",
        "read",
        "update",
        "list",
      ],
      projectLink: ["create", "delete", "read", "update", "list"],
      projectMember: ["create", "delete", "read", "update", "list"],
      projectMonitoring: ["create", "delete", "read", "update", "list"],
      projectPermissions: ["create", "delete", "read", "update", "list"],
      projectProductionBranch: ["create", "delete", "read", "update", "list"],
      projectTransfer: ["create", "delete", "read", "update", "list"],
      projectTransferOut: ["create", "delete", "read", "update", "list"],
      projectProtectionBypass: ["create", "delete", "read", "update", "list"],
      projectUsage: ["create", "delete", "read", "update", "list"],
      projectAnalyticsUsage: ["create", "delete", "read", "update", "list"],
      projectSupportCase: ["create", "delete", "read", "update", "list"],
      projectSupportCaseComment: ["create", "delete", "read", "update", "list"],
      projectDeploymentExpiration: [
        "create",
        "delete",
        "read",
        "update",
        "list",
      ],
      projectRollingRelease: ["create", "delete", "read", "update", "list"],
      projectTier: ["create", "delete", "read", "update", "list"],
      seawallConfig: ["create", "delete", "read", "update", "list"],
      skewProtection: ["create", "delete", "read", "update", "list"],
      analytics: ["create", "delete", "read", "update", "list"],
      trustedIps: ["create", "delete", "read", "update", "list"],
      webAnalytics: ["create", "delete", "read", "update", "list"],
      sharedEnvVarConnection: ["create", "delete", "read", "update", "list"],
      sonar: ["create", "delete", "read", "update", "list"],
    },
    enabledInvoiceItems: { vercelMarketplace: { enabled: true } },
    featureBlocks: {},
    spaces: { enabled: false },
    createdDirectToHobby: true,
    northstarMigration: {
      userId: "wEmB9NipVIQnmPayONJ7L7FG",
      startTime: 1710020278574,
      endTime: 1712277754279,
    },
  },
];

const user = {
    uid: "wEmB9NipVIQnmPayONJ7L7FG",
    email: "93220077@qq.com",
    name: null,
    username: "hnzxb",
    avatar: null,
    softBlock: null,
    enablePreviewFeedback: null,
    remoteCaching: { enabled: true },
    dataCache: { excessBillingEnabled: false },
    defaultTeamId: "team_GKt67AFKRP48O0IKiI87oovL",
    version: "northstar",
    date: "2023-08-22T03:05:21.329Z",
    platformVersion: null,
    hasTrialAvailable: true,
    billing: {
      plan: "hobby",
      period: null,
      trial: null,
      cancelation: null,
      email: null,
      tax: null,
      language: null,
      address: null,
      name: null,
      currency: "usd",
      status: "active",
      platform: "stripe",
      invoiceItems: null,
      subscriptions: null,
    },
    bio: null,
    website: null,
    stagingPrefix: "hnzxb",
    resourceConfig: { concurrentBuilds: 1 },
    importFlowGitProvider: "github",
    importFlowGitNamespaceId: null,
    preferredScopesAndGitNamespaces: [
      { scopeId: "team_GKt67AFKRP48O0IKiI87oovL", gitNamespaceId: 40960113 },
      { scopeId: "wEmB9NipVIQnmPayONJ7L7FG", gitNamespaceId: 40960113 },
    ],
    dismissedToasts: [
      {
        name: "firewall-ga",
        dismissals: [
          { scopeId: "wEmB9NipVIQnmPayONJ7L7FG", createdAt: 1728459881339 },
        ],
      },
      {
        name: "unbundled-pricing-coming-soon-toast",
        dismissals: [
          { scopeId: "wEmB9NipVIQnmPayONJ7L7FG", createdAt: 1716803284879 },
        ],
      },
      {
        name: "northstar-migration-completed-wEmB9NipVIQnmPayONJ7L7FG",
        dismissals: [
          { scopeId: "wEmB9NipVIQnmPayONJ7L7FG", createdAt: 1716803283389 },
        ],
      },
      {
        name: "northstar-migration-will-migrate-wEmB9NipVIQnmPayONJ7L7FG",
        dismissals: [
          { scopeId: "wEmB9NipVIQnmPayONJ7L7FG", createdAt: 1710778711051 },
        ],
      },
    ],
    featureBlocks: {},
    northstarMigration: {
      teamId: "team_GKt67AFKRP48O0IKiI87oovL",
      projects: 2,
      stores: 1,
      integrationClients: 0,
      integrationConfigurations: 0,
      startTime: 1710020278574,
      endTime: 1712277754279,
    },
  }

//   const flags= {
//     "access-requests-page": true;
//     "active-pro-plan-iteration": "unbundled";
//     "agents-review-github-webhook": "";
//     "ai-build-log-explanations": false;
//     "alerts-tab": false;
//     "algolia-full-project-indexing": false;
//     "allow-aws-env-vars": true;
//     "allow-status-code-on-rewrites": false;
//     "always-auth-user": false;
//     "analytics-ga-date": "2023-04-19T20:00:00.000Z";
//     "analytics-v2": true;
//     "ansi-logs": false;
//     "api-billing-costs-no-projects": false;
//     "api-builds-always-in-sfo": true;
//     "api-deployments-routes-endpoint": false;
//     "api-incoming-ghes-verify-signature": true;
//     "api-incoming-github-checks-webhook": false;
//     "api-incoming-sqs-queue-bitbucket": true;
//     "api-incoming-sqs-queue-github": true;
//     "api-incoming-sqs-queue-gitlab": true;
//     "artifacts-jwt-auth": true;
//     "audiences-custom-events": false;
//     "audiences-filtering": true;
//     "automatic-refund-invoice-items": true;
//     "backoffice-check-rbac-rollout": true;
//     "blob-existing-stores-billing-start-date": "2025-06-16T13:00:00.000Z";
//     "blob-force-beta": false;
//     "blob-ga-date": "2025-05-21T13:00:00.000Z";
//     "blob-ga-rollout-active": true;
//     "blob-migrate-bucket-domain": true;
//     "block-team-creation-for-overdue-users": true;
//     "build-container-node-fetch-cache-download": false;
//     "build-log-highlight-stderr": false;
//     "build-suspense-cache": false;
//     "bulk-env-variables": true;
//     "bulk-env-variables-hobby": true;
//     "cache-image-in-hive": false;
//     "comment-snapshots": false;
//     "compressed-isr-billing": false;
//     "conformance-on-vercel-dashboard": false;
//     "create-team-no-explicit-card-attachment": false;
//     "cron-jobs-billing": false;
//     "cron-jobs-deploy-summary": true;
//     "custom-rate-limit-override": false;
//     "dashboard-domain-search": true;
//     "dashboard-filter-branch-flag": true;
//     "data-cache-billing": false;
//     "data-cache-billing-feature": false;
//     "data-cache-observability": false;
//     "data-cache-usage-feature": false;
//     "data-cache-usage-notifications": false;
//     "datadog-flag-test": false;
//     "datadog-otlp-traces": false;
//     "ddos-usage": false;
//     "default-acme-provider": "letsencrypt";
//     "delete-stores-with-missing-owner": true;
//     "deploy-edge-functions-concurrently": true;
//     "deployment-build-log-preview": true;
//     "deployment-enabled-globs": false;
//     "deployment-routes-build-output": false;
//     "detect-node-version-on-project-creation": true;
//     "disable-error-log-drains": false;
//     "disable-error-log-drains-dry-run": true;
//     "disable-log-drain-UI": true;
//     "discover-build-container-folder-sizes": true;
//     "discussion-view": false;
//     "display-log-drain-usage": false;
//     "docs-ai-experiment": false;
//     "domain-purchase-payment-listener": true;
//     "domains-search-buy-dev": false;
//     "eager-provision-concurrency": false;
//     "edge-config-billing": true;
//     "edge-config-schema-protection": false;
//     "edge-cross-request-fetch": true;
//     "edge-functions-bundle-by-batches": true;
//     "edge-functions-bundle-push-batches": false;
//     "edge-functions-bundle-with-workers": false;
//     "edge-functions-cf-streams-enable-constructors": true;
//     "edge-functions-embedded-sourcemaps": true;
//     "edge-functions-enhanced-resolve": true;
//     "edge-functions-regional-invocation": true;
//     "edge-functions-regional-invocation-project-home": false;
//     "edge-otel-collector": false;
//     "edge-suspense-cache": true;
//     "email-notification-rules": false;
//     "enable-dashboard-recents-clone": false;
//     "enable-domain-purchase-through-api": false;
//     "enable-domain-search": false;
//     "enable-extended-fallback-payload": true;
//     "enable-logs-query-string": false;
//     "enable-new-domain-buy-flow": true;
//     "enable-new-feedback": false;
//     "enable-path-lookup-doc-v1": true;
//     "enable-recents-prune-on-read": false;
//     "enable-regionalized-isr": false;
//     "enable-request-access-for-deployments": false;
//     "enable-secure-compute-on-hive": false;
//     "enable-test-webhooks": false;
//     "enable-vercel-auth-for-new-projects": true;
//     "encrypt-deployment-build-env": true;
//     "encrypt-function-config-environment": true;
//     "encrypt-tokens-with-vsm": true;
//     "enterprise-team-merge": false;
//     "environments-ui": false;
//     "exclude-members-when-listing-teams": false;
//     "expose-deployment-protections-as-env-vars": true;
//     "federated-webhooks": "enabled";
//     "feedback-commands": true;
//     "feedback-edit-mode": true;
//     "feedback-layout-shifts": true;
//     "feedback-page-content-update": false;
//     "feedback-sharing-modal": true;
//     "feedback-variants": true;
//     "feedback-variants-deploy-step": false;
//     "feedback-variants-sharing": false;
//     "find-node-version-for-project": true;
//     "firewall-webhooks": false;
//     "flag-by-git-provider": false;
//     "flags-platform-integration": true;
//     "flags-tab": false;
//     "free-tier-project-limits": true;
//     "gatsby-builder-plugin": true;
//     "geist-font": false;
//     "git-filter-blob-none-support-for-build-container": false;
//     "git-push-repo-private-templates": true;
//     "google-auth": false;
//     "google-auth-oauth": true;
//     "google-auth-onetap": true;
//     "guide-support-redesign-merge": false;
//     "hackathon-2024-my-ships": false;
//     "hackathon-enable-private-git-submodules": false;
//     "hackathon-surface-failed-jobs": false;
//     "hackweek2024-toolbar-render-observer": false;
//     "hard-delete-kv-store": true;
//     "hard-delete-postgres-store": true;
//     "hard-delete-store": true;
//     "hash-integration-token-ids": false;
//     "hash-token-ids": true;
//     "hide-deployment-details-for-skipped-builds": true;
//     "hide-request-access": false;
//     "hide-zero-dollar-invoice-items": false;
//     "image-optimization-sources": true;
//     "import-next-js-traces-to-datadog": false;
//     "index-open-search-branches": true;
//     "india-mandates": true;
//     "instant-preview-url": true;
//     "instant-rollback": true;
//     "instant-rollback-ga": false;
//     "instant-rollback-hobby-restriction": true;
//     "internal-file-ref-sema": false;
//     "ip-allowlist": true;
//     "is-oem-partner": false;
//     "isolated-project-builds": "disabled";
//     "isr-function-logs": true;
//     "jwt-access-tokens": false;
//     "legacy-signin-email-otp": true;
//     "list-view-feedback-popover": false;
//     "lock-by-owner-in-pick-sbq": true;
//     "log-consumer-3-log-level": "info";
//     "log-consumer-3-log-level-infra-testing": "debug";
//     "log-drain-compression-domains": {
//       "http-intake.logs.ddog-gov.com": "gzip";
//       "http-intake.logs.us3.datadoghq.com": "gzip";
//       "http-intake.logs.us5.datadoghq.com": "gzip";
//       "log-api.eu.newrelic.com": "gzip";
//       "log-api.newrelic.com": "gzip";
//       "http-intake.logs.ap1.datadoghq.com": "gzip";
//       "http-intake.logs.datadoghq.com": "gzip";
//       "http-intake.logs.datadoghq.eu": "gzip";
//     };
//     "log-drain-edge-metadata": false;
//     "log-drain-ja-3-digest": false;
//     "log-drain-request-id-change": true;
//     "log-drain-response-byte-size": false;
//     "log-drain-static-vector": false;
//     "log-drain-usage-facts": true;
//     "log-drains-deployment-meta": false;
//     "log-drains-ga": false;
//     "log-drains-project-name": true;
//     "login-with-vercel": true;
//     "logs-fetch-metrics": false;
//     "logs-schema-validation": true;
//     "make-deployments-externally-accessible": true;
//     "manual-git-deploys": true;
//     "mfa-authentication": true;
//     "microfrontends-package-json-name": false;
//     "monitoring-access-override": false;
//     "monitoring-exit-survey": true;
//     "monitoring-live-mode": false;
//     "monitoring-query-builder": false;
//     "monitoring-query-variant": "singlePass";
//     "move-branches-with-project-transfer": true;
//     "move-build-logs-with-project-transfer": false;
//     "multi-email-support": true;
//     "multi-team-bitbucket": true;
//     "new-domain-access-model": false;
//     "new-instant-rollback-flow": false;
//     "new-monorepo-onboarding": false;
//     "new-project-creation-flow": false;
//     "new-project-transfer": true;
//     "new-upgrade-flow": false;
//     "next-js-live-source-control-integration": false;
//     "next-live": false;
//     "next-preload-common-chunks": true;
//     "node-bridge-fetch-o11y": true;
//     "node-bridge-recursion-guard": true;
//     "node-compatibility-for-edge-functions": true;
//     "notifications-alpha": true;
//     "notifier-email": true;
//     "observability-tracing": false;
//     "observe-tab": false;
//     "open-telemetry": false;
//     "open-telemetry-api-scope": false;
//     "open-telemetry-datadog": false;
//     "optimize-global-invalidations": true;
//     "orb-team-creation": true;
//     "organizations-mvp": false;
//     "ormify-deployment": true;
//     "passkeys-require-user": true;
//     "point-read-for-teams-pct": 100;
//     "postgres-hobby-trial-suspension": false;
//     "ppp-protect-past-production": true;
//     "prebuilt-templates": false;
//     "preview-comments-default-on": true;
//     "preview-comments-experiment": false;
//     "pro-automatic-refund-downgrade": false;
//     "pro-trial-single-owner-bypass": false;
//     "production-deployments-fast-lane": true;
//     "project-budget-rules": true;
//     "project-checks-enabled": false;
//     "project-entities-overview": true;
//     "project-level-rbac": false;
//     "project-team-invite-improvements": false;
//     "pusher-deployment-events": false;
//     "quality-scan": false;
//     "rbac-filtering-by-project-ids": true;
//     "redeploy-by-deployment-id": true;
//     "refactored-edge-config-editor": true;
//     "refresh-token-opaque": false;
//     "remove-auto-generated-log-message": true;
//     "remove-prepended-slash-from-logs": true;
//     "repository-dispatch-events": false;
//     "require-production-alias-to-promote": false;
//     "restrict-log-drains-for-hobby": false;
//     "restricted-environment-variable-access-for-integrations": true;
//     "richer-deployment-outputs": true;
//     "round-new-deployment-toast": false;
//     "route-high-concurrency-builds-to-honey": true;
//     "route-node20-builds-to-other-hives": false;
//     "route-to-iad1-fern": false;
//     "route-to-iad1-hive": true;
//     "route-to-iad1-pip": true;
//     "route-to-pdx1-ivy": true;
//     "route-to-pdx1-jelly": false;
//     "sc-async-fetch-experiment": true;
//     "sddj-git-repo-cache-key-v2": false;
//     "sddj-node-engine-lookup-from-package-json": "fetch-and-send";
//     "search-open-search-branches": true;
//     "search-open-search-domains": true;
//     "search-open-search-projects": true;
//     "send-fetch-metrics-to-ufp": false;
//     "send-log-drain-audit-log": true;
//     "serverless-function-failover": true;
//     "serverless-suspense-cache": true;
//     "set-vercel-shallow-since-clone": true;
//     "sharded-isr-l4-cache": false;
//     "sharing-experience-invitation": true;
//     "show-all-account-type-badges": false;
//     "show-optional-team-creation-step": false;
//     "signin-with-vercel-cli": false;
//     "skip-custom-domain-assignment": true;
//     "skip-ignore-build-step": true;
//     "slack-link-unfurls": false;
//     "sms-notifications": false;
//     "sso-authentication-app-router": false;
//     "staff-flags": false;
//     "start-sending-to-sbq": false;
//     "statement-of-reasons-notification": true;
//     "stop-sending-to-nbl": false;
//     "storage-inactive-store-deletion": "disabled";
//     "storage-inactive-store-deletion-redis": true;
//     "storage-integration": true;
//     "storage-neon-domain": true;
//     "storage-neon-ssl-mode": true;
//     "storage-suspension-queue-v2": true;
//     "storage-test-kv-cname": false;
//     "storage-upstash-domain": true;
//     "storage-usage-threshold-limits": false;
//     "storage-usage-v3": true;
//     "storage-usage-v4": true;
//     "storage-usage-v5": true;
//     "store-billing": false;
//     "store-list-rsc": true;
//     "store-status-design": true;
//     "store-uncompressed-size-on-build-cache": false;
//     "stuck-deployments-fix": false;
//     "sugp-deployment-ready-handling": false;
//     "sunset-secrets": false;
//     "support-center": false;
//     "support-center-uat": false;
//     "support-chat-invoice-refund-flow": false;
//     "team-invites-expire": false;
//     "throttle-worker-uploads": false;
//     "token-lookup-strategy": "secret-only";
//     "toolbar-accessibility-audit": true;
//     "toolbar-accessibility-auto-run": true;
//     "toolbar-auto-hide": false;
//     "toolbar-bisect": false;
//     "toolbar-bundle-size": false;
//     "toolbar-cmdk-branch-switcher": true;
//     "toolbar-comments-v-0-mentions": false;
//     "toolbar-cookie-injection": true;
//     "toolbar-distributed-tracing": true;
//     "toolbar-extension-proxy": false;
//     "toolbar-inp": true;
//     "toolbar-multi-zone": false;
//     "toolbar-open-graph": true;
//     "toolbar-ppr-viewer": false;
//     "toolbar-recents": false;
//     "toolbar-runtime-logs": false;
//     "toolbar-shrink": false;
//     "toolbar-snap": false;
//     "tty-build-logs": false;
//     "turborepo-future": true;
//     "turborepo-solutions-page-visibility": false;
//     "update-invoice-mandate-india": false;
//     "upgrade-modal-add-ons": true;
//     "upload-edge-functions-with-the-post-edge-functions-endpoint": true;
//     "use-async-transpile-for-edge-functions": false;
//     "use-build-outputs-for-general-purpose-edge-functions": true;
//     "use-bundled-usage-model-for-cloudflare-workers": false;
//     "use-bytecode-caching": false;
//     "use-edge-functions-bridge-latest": false;
//     "use-edge-functions-full-env": true;
//     "use-esm-syntax-for-edge-functions": true;
//     "use-global-push-pipeline": true;
//     "use-metrics-stream": false;
//     "use-namespaced-workers-for-deployments": true;
//     "use-next-js-bundled-server": true;
//     "use-npm-as-default-package-manager": true;
//     "use-only-streaming-lambda": false;
//     "use-optimized-public-suffix-list-parser": false;
//     "use-output-for-edge-functions": true;
//     "use-rbac-in-user-blocking": true;
//     "use-runtime-max-duration": false;
//     "use-rust-layer-latest": false;
//     "use-s3-worker-lookup": true;
//     "use-single-invoke-prerender-revalidate": true;
//     "use-strict-mode-on-edge-function-deployments": true;
//     "use-vercel-build-builder": true;
//     "vc-build-monorepo-support": true;
//     "vercel-blob-usage-policy": true;
//     "vercel-blob-usage-policy-v2": true;
//     "vercel-branch-url-system-env": true;
//     "vercel-coin": false;
//     "vercel-dca": true;
//     "vercel-storage-domain": true;
//     "vercel-toolbar-override-hostname": false;
//     wagyu: true;
//     "wake-up-deployment": true;
//     "web-analytics-billing": true;
//     "web-analytics-empty-state": true;
//     webauthn: true;
//     "webhooks-v2": false;
//     "zero-config-onboarding-monorepo": true;
//     "zero-friction-trials": true;
//     "active-branches": true;
//     "august-2022-pricing-experiment-enabled": false;
//     "comments-markdown": true;
//     "comments-slack-dms": true;
//     "deployment-environment-filter": true;
//     "deployment-links-experiment": true;
//     "enable-large-build-cache": false;
//     "feedback-content-moderation": true;
//     "feedback-project-management-integration": true;
//     "feedback-reactions": true;
//     "feedback-tips": false;
//     "new-cmdk": true;
//     "new-drawer": true;
//     "new-geist-docs": false;
//     "note-v3-colors": false;
//     "power-picker": true;
//     "pricing-experiment": "august-2022";
//     "project-favorites-in-overview": true;
//     "project-page-rollback-redesign": true;
//     "sign-in-with-google": {
//       tiktok: ["ericlbgk7m", "kit13601"];
//       gmail: [
//         "katya.a.foster@gmail.com",
//         "sign.in.with.all.the.things@gmail.com",
//         "tiktoktest+kit13601@vercel.com",
//         "tiktoktest+ericlbgk7m@vercel.com",
//         "tiktoktest+kit84694@vercel.com",
//         "kit568470@gmail.com"
//       ]
//     },
//     "slack-subscribe-command": true;
//     "use-live-feedback": true;
//     "vercel-auth-request-access": true;
//     "web-analytics-beta-participant": false;
//   };

const tokens = {
  0: { a: "$@1", f: "", b: "qUmK8Vrq_xbqxpJHUkv5T" },
  1: {
    tokens: [
      {
        id: "24b812dbb700d8c02782c0d4740e5f394da6a0cae9292106bb64ca6452a6739d",
        name: "Vercel Dashboard from Chrome on macOS (current)",
        type: "token",
        origin: "github",
        scopes: [{ type: "user", origin: "github", createdAt: 1732506970876 }],
        activeAt: 1753325719441,
        createdAt: 1732506970876,
        authedTeams: ["ismartify"],
        secondFactor: false,
        originTooltip: "Signed in via GitHub",
        appAvatar: "c8081cc2c1a503118b140d9ec53ff8ae806eee15",
        current: true,
      },
      {
        id: "0b742db94585c4d0b36ac683d2e4788911314cf918d30c8f5b0aa81e032e80d6",
        name: "Vercel CLI on bendeMacBook Pro via GitHub",
        type: "token",
        origin: "github",
        scopes: [{ type: "user", origin: "github", createdAt: 1734935382907 }],
        activeAt: 1734937877522,
        createdAt: 1734935382907,
        authedTeams: ["ismartify"],
        secondFactor: false,
        originTooltip: "Signed in via GitHub",
        appAvatar: "c8081cc2c1a503118b140d9ec53ff8ae806eee15",
        current: false,
      },
      {
        id: "c51cbe87ee213be94882806b08ccbbe3ab19bb89e2e6b3425e73dd13c084718c",
        name: "Login with Passkey (Chrome on macOS)",
        type: "token",
        origin: "passkey",
        scopes: [
          {
            type: "user",
            origin: "passkey",
            createdAt: 1725345339286,
            expiresAt: 1756902939286,
          },
        ],
        expiresAt: 1756902939286,
        activeAt: 1731048820424,
        createdAt: 1725345339286,
        authedTeams: ["ismartify"],
        secondFactor: false,
        originTooltip: "Signed in via Passkey",
        appAvatar: "",
        current: false,
      },
      {
        id: "4c581479d7a3dcb76a273740c80c238e55969936f7d16c3c3651873c08fbb763",
        name: "Vercel CLI on benzmac 2 via GitHub",
        type: "token",
        origin: "github",
        scopes: [{ type: "user", origin: "github", createdAt: 1722105748412 }],
        activeAt: 1729526974021,
        createdAt: 1722105748412,
        authedTeams: ["ismartify"],
        secondFactor: false,
        originTooltip: "Signed in via GitHub",
        appAvatar: "c8081cc2c1a503118b140d9ec53ff8ae806eee15",
        current: false,
      },
      {
        id: "97406618018e1a503192a0115feeb563a24dba262683343ce630babfadc7a173",
        name: "Vercel Dashboard from Chrome on macOS",
        type: "token",
        origin: "github",
        scopes: [{ type: "user", origin: "github", createdAt: 1700660982685 }],
        activeAt: 1716804200006,
        createdAt: 1700660982685,
        authedTeams: ["ismartify"],
        secondFactor: false,
        originTooltip: "Signed in via GitHub",
        appAvatar: "c8081cc2c1a503118b140d9ec53ff8ae806eee15",
        current: false,
      },
      {
        id: "d0558368b088e4fe39281d1b0cfba7568cd79befbf4e5b518f0aaca2ebd2a91c",
        name: "Vercel Dashboard from Chrome on Mac OS X",
        type: "token",
        origin: "github",
        scopes: [{ type: "user", origin: "github", createdAt: 1692673522668 }],
        activeAt: 1692864843970,
        createdAt: 1692673522668,
        authedTeams: ["ismartify"],
        secondFactor: false,
        originTooltip: "Signed in via GitHub",
        appAvatar: "c8081cc2c1a503118b140d9ec53ff8ae806eee15",
        current: false,
      },
    ],
    untilOldTokens: 1692864843970,
    untilNewTokens: null,
  },
};
