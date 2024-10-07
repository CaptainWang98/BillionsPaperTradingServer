import { Lucia } from "lucia"
import { luciaPrismaAdapter } from "./db.ts"

interface User {
  id: string
  email: string
  username: string
  pwd: string
}

export const lucia = new Lucia(luciaPrismaAdapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "production"
    }
  },
  getUserAttributes: (attributes) => {
    return {
      // @ts-ignore
      email: attributes.email,
      // @ts-ignore
      username: attributes.username,
    };
  }
});
