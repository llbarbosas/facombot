export interface BotError extends Error {
  message: string;
  name: "BotError";
}

export const BotError = (message: string): BotError => ({
  message,
  name: "BotError",
});

export const isBotError = (error: any): error is BotError =>
  error.name === "BotError";

export interface UserError extends Error {
  message: string;
  name: "UserError";
}

export const UserError = (message: string): UserError => ({
  message,
  name: "UserError",
});

export const isUserError = (error: any): error is UserError =>
  error.name === "UserError";
