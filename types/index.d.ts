import { Session, User } from "lucia";

declare global {
  namespace Express {
    interface Locals {
      user: User
      session: Session
    }
  }
}
