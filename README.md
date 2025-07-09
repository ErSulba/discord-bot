# Discord Bot

This bot uses [discord.js](https://discord.js.org/) and exposes a Material UI dashboard via Express.

## Features

- Customizable command prefix
- Commands:
  - `ping` – replies with `pong`
  - `serverinfo` – displays the current guild and channel
  - `setprefix <newPrefix>` – update the prefix if you have permission
  - Material UI dashboard available at `/` for checking and changing the prefix and allowed role

## Configuration

1. Install dependencies with `npm install`.
2. Set the environment variable `BOT_TOKEN` with your Discord bot token.
3. Run the bot with `npm start`.
4. Run `npm test` to perform a simple configuration check.

The server exposes API endpoints used by the dashboard:

- `GET /api/config` – returns the current prefix and role.
- `POST /api/prefix` – send `{ "prefix": "?" }` to change the command prefix.
- `POST /api/permissions` – send `{ "role": "Moderator" }` to change which role is allowed to use `setprefix`.

The dashboard listens on the port defined by the `PORT` environment variable (defaults to `3000`).

The dashboard source is split into `index.html` and `dashboard.js` for clarity. Both files live in the `public` folder and are served by Express.
