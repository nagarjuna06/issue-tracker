export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/teams", "/teams/:path*", "/joined-teams", "/joined-teams/:path*"],
};
