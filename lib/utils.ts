/**
 * Tiny className helper — joins truthy class strings.
 * Keeps the starter dependency-free (no clsx/tailwind-merge needed yet).
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
