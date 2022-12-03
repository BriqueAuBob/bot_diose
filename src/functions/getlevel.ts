export default function (xp: number) {
  return Math.floor(0.2 * Math.sqrt(xp));
}

export function getLevelXp(level: number) {
  return Math.floor((level / 0.2) ** 2);
}
