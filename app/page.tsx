'use client';
import { useUser } from "@auth0/nextjs-auth0"

export default function Home() {
  const { user, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">
        Welcome{user ? `, ${user.name}` : ' to the App'}!
      </h1>
      {!user && (
        <p className="mb-4">Please log in to access your profile and more features.</p>
      )}
      {user && (
        <div className="bg-gray-100 p-4 rounded shadow">
          <p className="mb-2">You are logged in as:</p>
          <pre className="text-sm">{JSON.stringify(user, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
