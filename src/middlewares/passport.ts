import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt'
import config from '../config';
import User from '../models/User';
import passport from 'passport';

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret,
}
// STRATEGY JSONWEBTOKEN
const jwtStrategy = new Strategy(opts, async (payload, done) => {
    try {
        const user = await User.findById(payload.id);
        if (!user) return done(null, false)
        if (user) return done(null, user);
        return done(null, false);

    } catch (error) {
        console.log(error)
    }
})
// USING STRATEGIES
passport.use(jwtStrategy);

// GOOGLE  STRATEGY
