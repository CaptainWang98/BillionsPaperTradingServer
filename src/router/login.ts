import express from "express";
import { prismaClient } from "../db.ts";
import { verify } from "@node-rs/argon2";
import { lucia } from "../auth.ts";

import { INVALID_USERNAME_OR_PWD, USER_NOT_EXSIT } from "../vars.ts";

const loginRouter = express.Router();

loginRouter.get("/login", async (_, res) => {
  console.log('/login', res.locals.session);
	if (res.locals.session) {
		return res.redirect("/");
	}
	return res.status(200).send({
    code: 0,
    msg: 'plz use post',
  });
});

loginRouter.post("/login", async (req, res) => {
	const username: string | null = req.body.username ?? null;
	if (!username || username.length < 3 || username.length > 31 || !/^[a-z0-9_-]+$/.test(username)) {
		return res.status(200).send({
      code: INVALID_USERNAME_OR_PWD,
      msg: 'invalid base username',
    });
	}
	const password: string | null = req.body.password ?? null;
	if (!password || password.length < 6 || password.length > 255) {
		return res.status(200).send({
      code: INVALID_USERNAME_OR_PWD,
      msg: 'invalid base pwd',
    });
	}

	const existingUser = await prismaClient.user.findFirst({
    where: {
      username,
    }
  });
	if (!existingUser) {
		return res.status(200).send({
      code: USER_NOT_EXSIT,
      msg: 'user does not exsit',
    });
	}

	const validPassword = await verify(existingUser.pwd, password, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});
	if (!validPassword) {
		// NOTE:
		// Returning immediately allows malicious actors to figure out valid usernames from response times,
		// allowing them to only focus on guessing passwords in brute-force attacks.
		// As a preventive measure, you may want to hash passwords even for invalid usernames.
		// However, valid usernames can be already be revealed with the signup page among other methods.
		// It will also be much more resource intensive.
		// Since protecting against this is non-trivial,
		// it is crucial your implementation is protected against brute-force attacks with login throttling, 2FA, etc.
		// If usernames are public, you can outright tell the user that the username is invalid.
		return res.status(200).send({
      code: INVALID_USERNAME_OR_PWD,
      msg: 'invalid pwd',
    });
	}

	const session = await lucia.createSession(existingUser.id, {});
	res
		.appendHeader("Set-Cookie", lucia.createSessionCookie(session.id).serialize())
		.appendHeader("Location", "/")
		.status(200)
    .send({
      code: 0,
      msg: '',
    })
});

export default loginRouter;
