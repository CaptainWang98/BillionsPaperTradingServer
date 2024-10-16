import express from "express";
import { prismaClient } from "../db.ts";
import { hash } from "@node-rs/argon2";
import { lucia } from "../auth.ts";
import { generateId } from "lucia";
import { DB_ERROR, INVALID_SIGNUP_DATA, UNKNOWN_ERROR } from "../vars.js";
import { Prisma } from "@prisma/client"

const signupRouter = express.Router();

signupRouter.get("/signup", async (_, res) => {
	if (res.locals.session) {
		return res.redirect("/");
	}
	return res.setHeader("Content-Type", "text/html").status(200).send({
    code: 0,
    msg: '',
  });
});

signupRouter.post("/signup", async (req, res) => {
	const username: string | null = req.body.username ?? null;
	if (!username || username.length < 3 || username.length > 31 || !/^[a-z0-9_-]+$/.test(username)) {
		return res.setHeader("Content-Type", "text/html").status(400).send({
      code: INVALID_SIGNUP_DATA,
      msg: 'invalid username'
    });
	}
	const password: string | null = req.body.password ?? null;
	if (!password || password.length < 6 || password.length > 255) {
		return res.setHeader("Content-Type", "text/html").status(400).send({
      code: INVALID_SIGNUP_DATA,
      msg: 'invalid password'
    });
	}

	const email: string = req.body.email ?? '';

	const passwordHash = await hash(password, {
		// recommended minimum parameters
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});
	const userId = generateId(15);

	try {
    await prismaClient.user.create({
			data: {
				id: userId,
				username,
				email,
				pwd: passwordHash
			}
		})

		const session = await lucia.createSession(userId, {});
		return res
			.appendHeader("Set-Cookie", lucia.createSessionCookie(session.id).serialize())
			.redirect("/");
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			console.log('PrismaClientKnownRequestError', e);
			return res.setHeader("Content-Type", "text/html").status(400).send({
				code: DB_ERROR,
				msg: e.message
			});
		}
		console.log('Unknown error', e);
		return res.setHeader("Content-Type", "text/html").status(500).send({
			code: UNKNOWN_ERROR,
			msg: 'Unknown error occured, please contact developer!'
		});
	}
});

export default signupRouter;
