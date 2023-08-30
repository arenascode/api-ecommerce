import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as RegisterStrategy } from "passport-local";
import { Strategy as LoginStrategy } from "passport-local";
import usersService from "../services/users.service.js";
import { isValidPassword } from "../utils/cryptography.js";
import { Strategy as GithubStrategy } from "passport-github2";
import { JWT_SECRET_KEY, githubCallbackUrl, githubClientId, githubClientSecret } from "../config/auth.config.js";
import { AuthenticationError, validationError } from "../models/errors.js";
import { logger } from "../utils/logger.js";

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.signedCookies) {
    //Check if there is a cookie
    token = req.signedCookies["jwt_authorization"];
  }
  return token;
};

const queryTokenExtractor = (req) => {
  let token = null
  if (req && req.query) {
    token = req.query.token
  }
  return token
}
const queryJwtOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([queryTokenExtractor]),
  secretOrKey: JWT_SECRET_KEY,
};
// Strategy using token in query
const queryJwtStrategy = new JwtStrategy(queryJwtOptions, (jwt_payload, done) => {
  done(null, jwt_payload)
})

passport.use('jwtQuery', queryJwtStrategy)

// Strategy through token in cookies
passport.use(
  "jwt",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey: JWT_SECRET_KEY,
    },
    async (jwt_payload, done) => {
      try {
        done(null, jwt_payload); // payload contains token
      } catch (error) {
        done(error);
      }
    }
  )
);

// Register Strategy
passport.use(
  "register",
  new RegisterStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, username, password, done) => {
      console.log(`username ${username}`);
      const dataNewUser = req.body;
      console.log(`dataNewUser PssPrt Register ${JSON.stringify(dataNewUser)}`);
      try {
        if (dataNewUser) {
          const criteria = {
            email: username, // i told to passport that mail will be a username.
          };
          console.log(`criteria passed to mongo ${JSON.stringify(criteria)}`);
          const userExist = await usersService.findUserByCriteria(criteria);
          console.log(userExist);
          if (userExist) {
            console.log(`User Already Exist`);
            const errorInstance = new validationError(
              'User Already Exist',
              "Passport Strategy",
              'Line 63'
            );
            errorInstance.logError();
            throw errorInstance;
            // return done(null, false);
          } else {
            const newUser = await usersService.createNewUser(dataNewUser);
            done(null, newUser);
          }
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Login Strategy
passport.use(
  "login",
  new LoginStrategy(
    { usernameField: "email" },
    async (username, password, done) => {
      const isAdmin =
        username === "migue.admin@gmail.com" && password === "migue123";
      console.log(`it is admin? ${isAdmin}`);

      if (isAdmin) {
        const adminData = {
          email: username,
          role: "admin",
        };
        return done(null, adminData);
      } else {
        const userSearched = await usersService.findUserByCriteria({
          email: username,
        });
        if (!userSearched) {
          console.log(`user doesn't exist`);
          return done(null, false);
        } else {
          if (!isValidPassword(password, userSearched.password))
            return done(null, false);
          userSearched.last_connection = new Date().toString();
          userSearched.save();
          delete userSearched.password;
          console.log(`userSerached before send from passport ${userSearched}`);
          return done(null, userSearched);
        }
      }
    }
  )
);

// Github Strategy
passport.use(
  "github",
  new GithubStrategy(
    {
      clientID: githubClientId,
      clientSecret: githubClientSecret,
      callbackURL: githubCallbackUrl,
    },
    async (accesToken, refreshToken, profile, done) => {
      try {
        console.log(profile);
        let user = await usersService.findUserByCriteria({
          email: profile._json.email,
        });
        if (!user) {
          let newUser = {
            name: profile.displayName,
            username: profile.username,
            id: profile.id
          };

          done(null, newUser);
        } else {
          done(null, user);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Authorization
export function authenticationJWTApi(req, res, next) {
  passport.authenticate("jwt", (error, user, info) => {
    if (error) {
      return res.status(401).json({ error: "Unauthorized Error" });
    }
    if (!user) {
      return res
        .status(401)
        .json({ error: `Token Doesn't exist. Please Log in` });
    }
    req.user = user;
    next();
  })(req, res, next);
}

export function authenticationForRestorePass(req, res, next) {
  passport.authenticate("jwtQuery", (error, user) => {
    if (error || !user) return res.render('timeExpired')
    req.user = user;
    logger.debug(`passed for here? ${JSON.stringify(req.user)}`)
    next()
  })(req, res, next);
}
// esto lo tengo que agregar para que funcione passport! copiar y pegar, nada mas.
passport.serializeUser((user, next) => {
  next(null, user._id);
});
passport.deserializeUser((user, next) => {
  next(null, user);
});

export const passportInitialize = passport.initialize();

export const registerAuthentication = passport.authenticate("register", {
  session: false,
  failWithError: true,
});

export const loginAuthentication = passport.authenticate("login", {
  session: false,
  failWithError: true,
});

export const githubAuthentication = passport.authenticate('github', {
  session: false,
  scope: ['user:email']
})
export const githubAuthentication_CB = passport.authenticate('github', {
  session: false,
  failWithError: true,
  failureRedirect: '/login'
})