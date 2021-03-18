import { Role } from "@core/discord";
import { classRoleColors, technologyRoleColor } from "@config/discord";

export const range = (n: number, startAt = 0) =>
  [...Array(n).keys()].map((i) => i + startAt);

export const randomBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const filterClassRoles = (roles: Role[]) =>
  roles.filter((role) => classRoleColors.includes(role.hexColor));

export const filterTechnologyRoles = (roles: Role[]) =>
  roles.filter((role) => technologyRoleColor === role.hexColor);

export const arrayToTextualList = (arr: any[]) => {
  const { length: l } = arr;
  const listEnd = arr.slice(l - 2, l);
  const listStart = arr.slice(0, l - 2);

  const separator = l >= 3 ? ", " : "";

  return listStart.join(", ") + separator + listEnd.join(" e ");
};
