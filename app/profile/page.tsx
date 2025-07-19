'use client';
import { useUser } from '@auth0/nextjs-auth0';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const { user, isLoading } = useUser();
  const [profile, setProfile] = useState<any>(null);
  const [form, setForm] = useState({ name: '', bio: '' });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    if (user) {
      fetch('/api/profile')
        .then(res => res.json())
        .then(data => {
          setProfile(data);
          setForm({ name: data?.name || '', bio: data?.bio || '' });
        });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch('/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setProfile(data);
    setSaving(false);
  };

  const handleDelete = async () => {
    setDeleting(true);
    await fetch('/api/profile', { method: 'DELETE' });
    setDeleting(false);
    setDeleted(true);
    window.location.href = '/api/auth/logout';
  };

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>Please log in to view your profile.</div>;
  if (deleted) return <div>Profile deleted. Logging out...</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow border border-gray-300">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="text-gray-800 font-semibold">
          Name:
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="border-2 border-gray-700 rounded px-2 py-1 w-full focus:outline-none focus:border-blue-700 bg-white text-gray-900"
          />
        </label>
        <label className="text-gray-800 font-semibold">
          Bio:
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            className="border-2 border-gray-700 rounded px-2 py-1 w-full focus:outline-none focus:border-blue-700 bg-white text-gray-900"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-900 font-bold shadow-md border border-blue-900"
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
      </form>
      <button
        onClick={handleDelete}
        className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-900 mt-4 font-bold shadow-md border border-red-900"
        disabled={deleting}
      >
        {deleting ? 'Deleting...' : 'Delete Profile'}
      </button>
      {profile && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2 text-gray-900">Current Profile Data</h2>
          <pre className="bg-gray-200 p-2 rounded text-sm text-gray-900 border border-gray-400 overflow-x-auto">{JSON.stringify(profile, null, 2)}</pre>
        </div>
      )}
    </div>
  );
} 