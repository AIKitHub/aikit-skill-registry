# hermes-tweet integration guide

Install the native [Hermes Tweet](https://github.com/Xquik-dev/hermes-tweet)
plugin for Hermes Agent X/Twitter research, social listening, account-context
reads, and approval-gated social actions.

This entry is an adapter guide, not a copied skill body. Hermes Tweet ships its
own package, plugin metadata, and Hermes skill in the upstream repository.

## Prerequisites

- Hermes Agent installed.
- Python support from the Hermes runtime.
- An Xquik API key for `tweet_read` and account-scoped workflows.

## Step 1: Install through Hermes

Prefer the native Hermes plugin installer:

```shell
hermes plugins install Xquik-dev/hermes-tweet --enable
```

If a non-interactive install cannot prompt for credentials, set the API key in
the Hermes runtime environment or `~/.hermes/.env` before calling `tweet_read`.

## Step 2: Configure runtime variables

Store credentials outside git:

```shell
export XQUIK_API_KEY=<set-locally>
export HERMES_TWEET_ENABLE_ACTIONS=false
```

Leave `HERMES_TWEET_ENABLE_ACTIONS=false` for unattended research, monitoring,
and cron workflows. Set it to `true` only in sessions that need explicit
approval-gated posting, replies, DMs, follows, monitor changes, webhook
changes, or media changes.

## Step 3: Verify installation

```shell
hermes plugins list
```

Then run a read-first tool smoke test:

```shell
hermes -z "Use tweet_explore, then read /api/v1/account. Do not call tweet_action." --toolsets hermes-tweet
```

Expected behavior:

- `tweet_explore` discovers the bundled endpoint catalog without an API key.
- `tweet_read` requires `XQUIK_API_KEY`.
- `tweet_action` stays hidden or disabled unless
  `HERMES_TWEET_ENABLE_ACTIONS=true`.

## Alternative: PyPI package

If the Hermes plugin installer is unavailable but the Hermes Python
environment is known:

```shell
uv pip install --python ~/.hermes/hermes-agent/venv/bin/python hermes-tweet
hermes plugins enable hermes-tweet
```

## Safety notes

- Do not paste API keys into prompts, issues, PR comments, or checked-in files.
- Do not pass credentials as tool arguments.
- Install on the Hermes runtime host. For remote gateway profiles, that is the
  remote host, not only the desktop client.
- Use `tweet_explore` before `tweet_read` or `tweet_action` so calls stay on
  catalog-listed paths.

## References

- Upstream repository: <https://github.com/Xquik-dev/hermes-tweet>
- PyPI package: <https://pypi.org/project/hermes-tweet/>
- Submission readiness:
  <https://github.com/Xquik-dev/hermes-tweet/blob/master/docs/SUBMISSION_READINESS.md>
