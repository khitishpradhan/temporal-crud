import { auth0 } from '@/lib/auth0';

export default async function ProfilePage() {
  const session = await auth0.getSession();
  const user = session?.user;

  if (!user) return <div>Please log in to view your profile.</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <img src={user.picture} alt={user.name} className="rounded-full w-20 h-20 mb-4" />
      <h2 className="text-lg font-semibold">{user.name}</h2>
      <p>{user.email}</p>
      <pre className="bg-gray-100 p-2 rounded text-sm">{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
} 