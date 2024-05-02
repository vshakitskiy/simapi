# With ♥ by vshakitskiy
![preview](https://github.com/vshakitskiy/simapi/assets/54102609/919532b0-76b7-458c-8636-7ebf7321f6de)

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=git,github,ts,react,tailwind,nextjs,pnpm,prisma,redis&theme=dark" />
  </a>
</p>

## About

SimApi is a simple api to compare 2 texts. To make a request, you need to get the authorization token from the dashboard.

### Features

- Responsive UI
- Dark/Light mode
- Protected Routes
- Rate Limiting
- Request Tracking via Dashboard

## Getting started

1) Get postgresql database URLS (default and direct). In my case, i'm using [Neon](https://neon.tech/):
```env
# .env.example - database
DATABASE_URL=
DIRECT_URL=
```
2) Get URL and SECRET from the [Upstash Redis](https://upstash.com/):
```env
# .env.example - redis
REDIS_URL=
REDIS_SECRET=
```
3) Get Hugging Face key from Settings / Access Token ([settings/tokens](https://huggingface.co/settings/tokens)):
```env
# .env.example - huggingface
HUGGINGFACE_API_KEY=
```
4) Application is using Google Auth, so get Client ID and secret from [Google Cloud Console](https://console.cloud.google.com/):
```env
# .env.example - googleclient
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```
5) And finally about env, place url of the website & generate secret key for next auth (the best way is via [OpenSSL](https://www.cryptool.org/en/cto/openssl/), running command `openssl rand -base64 [Number of Bytes]`):
```env
# .env.example - nextauth
NEXTAUTH_SECRET=
NEXTAUTH_URL=
```
6) Install packages, run the command to reflect the state of your Prisma schema and generate prisma client:
```bash
$> pnpm i
$> pnpx prisma db push
$> pnpx prisma generate
```
7) Run the dev command:
```bash
$> pnpm dev
```
