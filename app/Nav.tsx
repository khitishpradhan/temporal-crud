'use client';
import { useUser } from '@auth0/nextjs-auth0';

export default function Nav() {
  const { user, isLoading } = useUser();

  if (isLoading) return <nav>Loading...</nav>;

  return (
    <nav className="flex gap-4 items-center py-4">
      {!user && (
        <a
          href="/auth/login"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Login
        </a>
      )}
      {user && (
        <>
          <span className="font-semibold">{user.name}</span>
          <a
            href="/auth/logout"
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Logout
          </a>
        </>
      )}
    </nav>
  );
}
