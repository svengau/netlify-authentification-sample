
# Example of netlify authentication with Passportjs

[![Netlify Status](https://api.netlify.com/api/v1/badges/9d1ad709-2dcc-4c6f-afa5-8a4b65dc2ed1/deploy-status)](https://app.netlify.com/sites/netlify-authentification-sample/deploys)

This project shows how to use the very popular [PassportJS](http://www.passportjs.org) library (normally available under expressjs) with the [Netlify](https://www.netlify.com/) platform running under AWS Lambda.

We took the example of [Google OAuth](http://www.passportjs.org/packages/passport-google-oauth/), but you can use any [PassportJS strategy](http://www.passportjs.org/packages/) (Twitter, Facebook, Local, JWT, Github, ...).

You can clone on you local with:

    git@github.com:svengau/netlify-authentification-sample.git

Alternatively you can deploy straight to Netlify with this one-click Deploy:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg?utm_source=github)](https://app.netlify.com/start/deploy?repository=https://github.com/svengau/netlify-authentification-sample&utm_source=github)

Once deployed, don't forget to configure the 3 following env variables:

- GOOGLE_AUTH_CLIENT_ID: your google client id
- GOOGLE_AUTH_CLIENT_SECRET: your google client secret key
- SESSION_SECRET: a random session secret