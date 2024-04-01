This is a demo showing a basic (and probably full of errors) implementation of Supabase authentication with Plasmic integration and using Auth UI on top of that. It is a Next.js project bootstrapped with [`create-plasmic-app`](https://www.npmjs.com/package/create-plasmic-app) and based on the [`Github example from the Plasmic team.`](https://github.com/plasmicapp/plasmic/tree/master/examples/supabase-auth-nextjs-pages-loader)

[!IMPORTANT]
It is assumed that you know how to do the basics; setting up Plasmic, setting up supabase, etc. The purpose of this project is showing a boilerplate of Supabase, Plasmic auth and Auth UI working altogether.

## Getting Started

In [`Plasmic`](https://www.plasmic.app/), get your project ID (from the URL) and the API token (clicking the "Code" button at the upper right corner). Paste both of them in [plasmic-init](/plasmic-init.ts). Run your server and check that everything is ok.

```bash
npm i
npm run dev
```

Open your browser to see the result.

Now get your auth info from supabase (URL and anonkey) and paste it in your [environment variables](.env.local)

Go back to Plasmic and set your App Host (this project is using http://localhost:3000/plasmic-host). Also, enable authentication and copy the secret token to [environment variables](.env.local).

In this example, there are two ways of signing ing: mail and Google. You need to set both them up in Supabase. Also, you can choose if you want mail confirmation before sign in or not (you can set the the email templat).

## Key files

- components\AuthUi: the Auth component and its associated CSS style.
- app\auth\confirm\route.ts: routing file to proccess confirmation signup email.
- utis\supabase-client: supabase server client.

## Learn More

With Plasmic, you can enable non-developers on your team to publish pages and content into your website or app.

To learn more about Plasmic, take a look at the following resources:

- [Plasmic Website](https://www.plasmic.app/)
- [Plasmic Documentation](https://docs.plasmic.app/learn/)
- [Plasmic Slack Community](https://www.plasmic.app/slack)

You can check out [the Plasmic GitHub repository](https://github.com/plasmicapp/plasmic) - your feedback and contributions are welcome!
