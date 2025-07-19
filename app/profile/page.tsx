'use client';
import { useUser } from '@auth0/nextjs-auth0';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const { user, isLoading } = useUser();
  const [profile, setProfile] = useState<any>(null);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    city: '',
    pincode: '',
    name: '',
    bio: '',
  });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (user) {
      fetch('/api/profile')
        .then(res => res.json())
        .then(data => {
          setProfile(data);
          setForm({
            firstName: data?.firstName || '',
            lastName: data?.lastName || '',
            phoneNumber: data?.phoneNumber || '',
            city: data?.city || '',
            pincode: data?.pincode || '',
            name: data?.name || '',
            bio: data?.bio || '',
          });
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
    setEditMode(false);
  };

  const handleDelete = async () => {
    setDeleting(true);
    await fetch('/api/profile', { method: 'DELETE' });
    setDeleting(false);
    setDeleted(true);
    window.location.href = '/api/auth/logout';
  };

  const handleCancel = () => {
    setEditMode(false);
    // Reset form to last saved profile
    setForm({
      firstName: profile?.firstName || '',
      lastName: profile?.lastName || '',
      phoneNumber: profile?.phoneNumber || '',
      city: profile?.city || '',
      pincode: profile?.pincode || '',
      name: profile?.name || '',
      bio: profile?.bio || '',
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>Please log in to view your profile.</div>;
  if (deleted) return <div>Profile deleted. Logging out...</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
      <div className="flex flex-col items-center mb-8">
        <img
          src={user.picture || '/next.svg'}
          alt={user.name || 'User Avatar'}
          className="w-24 h-24 rounded-full border-4 border-blue-200 shadow mb-2 object-cover"
        />
        <h1 className="text-3xl font-bold text-gray-900 mb-1">{profile?.name || user.name || 'Your Profile'}</h1>
        <p className="text-gray-500">{user.email}</p>
      </div>
      {!editMode ? (
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="text-gray-500 text-xs">First Name</div>
              <div className="font-semibold text-gray-900 text-lg">{profile?.firstName || '-'}</div>
            </div>
            <div className="flex-1">
              <div className="text-gray-500 text-xs">Last Name</div>
              <div className="font-semibold text-gray-900 text-lg">{profile?.lastName || '-'}</div>
            </div>
          </div>
          <div>
            <div className="text-gray-500 text-xs">Phone Number</div>
            <div className="font-semibold text-gray-900 text-lg">{profile?.phoneNumber || '-'}</div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="text-gray-500 text-xs">City</div>
              <div className="font-semibold text-gray-900 text-lg">{profile?.city || '-'}</div>
            </div>
            <div className="flex-1">
              <div className="text-gray-500 text-xs">Pincode</div>
              <div className="font-semibold text-gray-900 text-lg">{profile?.pincode || '-'}</div>
            </div>
          </div>
          <div>
            <div className="text-gray-500 text-xs">Display Name</div>
            <div className="font-semibold text-gray-900 text-lg">{profile?.name || '-'}</div>
          </div>
          <div>
            <div className="text-gray-500 text-xs">Bio</div>
            <div className="font-normal text-gray-800 text-base whitespace-pre-line">{profile?.bio || '-'}</div>
          </div>
          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-900 font-bold shadow-md border border-blue-900 mt-4 w-full"
          >
            Edit Profile
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-900 mt-2 font-bold shadow-md border border-red-900 w-full"
            disabled={deleting}
          >
            {deleting ? 'Deleting...' : 'Delete Profile'}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-4">
            <label className="flex-1 text-gray-800 font-semibold">
              First Name
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="border-2 border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:border-blue-700 bg-white text-gray-900 mt-1"
                placeholder="First Name"
              />
            </label>
            <label className="flex-1 text-gray-800 font-semibold">
              Last Name
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="border-2 border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:border-blue-700 bg-white text-gray-900 mt-1"
                placeholder="Last Name"
              />
            </label>
          </div>
          <label className="text-gray-800 font-semibold">
            Phone Number
            <input
              type="text"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              className="border-2 border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:border-blue-700 bg-white text-gray-900 mt-1"
              placeholder="Phone Number"
            />
          </label>
          <div className="flex gap-4">
            <label className="flex-1 text-gray-800 font-semibold">
              City
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                className="border-2 border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:border-blue-700 bg-white text-gray-900 mt-1"
                placeholder="City"
              />
            </label>
            <label className="flex-1 text-gray-800 font-semibold">
              Pincode
              <input
                type="text"
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                className="border-2 border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:border-blue-700 bg-white text-gray-900 mt-1"
                placeholder="Pincode"
              />
            </label>
          </div>
          <label className="text-gray-800 font-semibold">
            Display Name
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="border-2 border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:border-blue-700 bg-white text-gray-900 mt-1"
              placeholder="Display Name"
            />
          </label>
          <label className="text-gray-800 font-semibold">
            Bio
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              className="border-2 border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:border-blue-700 bg-white text-gray-900 mt-1"
              placeholder="Tell us about yourself..."
            />
          </label>
          <div className="flex gap-4 mt-2">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-bold border border-gray-400 hover:bg-gray-300 w-1/2"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-900 font-bold shadow-md border border-blue-900 w-1/2"
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
} 