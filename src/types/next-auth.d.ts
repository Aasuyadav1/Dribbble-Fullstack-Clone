// next-auth.d.ts

import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      slug: string;
      name: string;
      email: string;
      image: string;
    } & DefaultSession['user'];
  }
}