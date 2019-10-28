import express from "express";
import sessions from "client-sessions";
import passport from "passport";
import cookieParser from "cookie-parser";

import google from "./strategies/google";

const app = express();

app.use(cookieParser());
app.use(
  sessions({
    cookieName: "session",
    secret: process.env.SESSION_SECRET,
    cookie: {
      ephemeral: false,
      secure: false
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, cb) => cb(user ? null : "null user", user));
passport.deserializeUser((user, cb) => cb(user ? null : "null user", user));

app.get("/.netlify/functions/auth/me", (req, res) =>
  res.send(req.user ? req.user : {})
);

app.get("/.netlify/functions/auth/logout", (req, res) => {
  console.info("logout");
  req.logout();
  res.send({ success: 1, code: "user.logout" });
});

app.use("/.netlify/functions/auth", google);

export default app;
