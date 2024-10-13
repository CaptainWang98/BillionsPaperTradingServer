import express from 'express';
import { lucia } from './auth.ts';
import { verifyRequestOrigin } from "lucia";
import { signupRouter } from './router/signup.ts';
import morgan from 'morgan';

// Variables
const port = 3000;

const app = express();

app.use(express.urlencoded());
app.use(morgan('combined'));

app.use(async (req, res, next) => {
	if (req.method === "GET") {
		return next();
	}
	const originHeader = req.headers.origin ?? null;
	const hostHeader = req.headers.host ?? null;

	if ((!originHeader || !hostHeader || !verifyRequestOrigin(originHeader, [hostHeader])) && !hostHeader.includes('localhost')) {
		return res.status(403).end();
	}
	return next();
});

app.use(async (req, res, next) => {
	const sessionId = lucia.readSessionCookie(req.headers.cookie ?? "");
	if (!sessionId) {
		res.locals.user = null;
		res.locals.session = null;
		return next();
	}

	const { session, user } = await lucia.validateSession(sessionId);
	if (session && session.fresh) {
		res.appendHeader("Set-Cookie", lucia.createSessionCookie(session.id).serialize());
	}
	if (!session) {
		res.appendHeader("Set-Cookie", lucia.createBlankSessionCookie().serialize());
	}
	res.locals.session = session;
	res.locals.user = user;
	return next();
});

app.use(signupRouter);

app.listen(port, function () {
  console.log('Server running on port ' + port + '!');
});