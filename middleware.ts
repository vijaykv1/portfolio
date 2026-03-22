export { auth as middleware } from "@/auth";

export const config = {
  matcher: [], // Auth handled inside the page, not at middleware level
};
