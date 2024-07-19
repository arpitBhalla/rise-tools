export function parsePath(path: string): string {
  const regex = /\[([^\]]+)\]/g
  return path.replace(regex, (_, capture) => `:${capture}`).replace('.tsx', '')
}
