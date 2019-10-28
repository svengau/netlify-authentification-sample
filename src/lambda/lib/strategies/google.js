import { Router } from "express";
import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import get from "lodash/fp/get";

const router = Router();

router.use((req, _res, next) => {
  const {
    query: { host }
  } = req;

  // Note: Netlify functions don't have the host url, so we need to pass it explicitly
  if (!passport._strategy(Strategy.name) && host) {
    console.info(`Init Google Auth strategy on host ${host}`);

    passport.use(
      new Strategy(
        {
          clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
          clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
          callbackURL: `${host}/.netlify/functions/auth/google/callback`,
          passReqToCallback: true
        },
        async function(req, _token, _tokenSecret, profile, done) {
          console.info("load user profile", profile);
          const user = {
            id: profile.id,
            image: get("photos[0].value")(profile),
            userName: profile.displayName
          };

          req.user = user;
          return done(null, user);
        }
      )
    );
  }
  next();
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ]
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  function callback(req, res) {
    console.info(`login user ${req.user && req.user.id} and redirect`);

    return req.login(req.user, async function callbackLogin(loginErr) {
      if (loginErr) {
        throw loginErr;
      }
      return res.redirect("/");
    });
  }
);

export default router;
