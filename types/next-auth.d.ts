import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
      home?: string;
    };
  }

  interface User {
    role?: string;
    home?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    home?: string;
  }
}
