'use client';
import { useUser } from '@auth0/nextjs-auth0';
import { useEffect, useState } from 'react';
import {
  LoadingSpinner,
  ProfileHeader,
  ProfileField,
  ActionButton,
  Modal,
  ProfileStats,
  AccountInfo,
  ErrorState,
  SuccessState
} from '../components';

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

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
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

  const handleCancel = () => {
    setEditMode(false);
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

  if (isLoading) return <LoadingSpinner text="Loading your profile..." />;
  
  if (!user) return (
    <ErrorState
      title="Authentication Required"
      message="Please log in to view your profile."
      actionText="Sign In"
      actionUrl="/api/auth/login"
    />
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <ProfileHeader
          user={user}
          profile={profile}
          editMode={editMode}
          onEditClick={() => setEditMode(true)}
        />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Personal Information
              </h2>
              
              {!editMode ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ProfileField
                      label="First Name"
                      value={profile?.firstName || ''}
                      gradientFrom="from-blue-50"
                      gradientTo="to-purple-50"
                      borderColor="border-blue-100"
                      labelColor="text-blue-600"
                    />
                    <ProfileField
                      label="Last Name"
                      value={profile?.lastName || ''}
                      gradientFrom="from-purple-50"
                      gradientTo="to-pink-50"
                      borderColor="border-purple-100"
                      labelColor="text-purple-600"
                    />
                  </div>
                  
                  <ProfileField
                    label="Phone Number"
                    value={profile?.phoneNumber || ''}
                    gradientFrom="from-green-50"
                    gradientTo="to-blue-50"
                    borderColor="border-green-100"
                    labelColor="text-green-600"
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ProfileField
                      label="City"
                      value={profile?.city || ''}
                      gradientFrom="from-orange-50"
                      gradientTo="to-red-50"
                      borderColor="border-orange-100"
                      labelColor="text-orange-600"
                    />
                    <ProfileField
                      label="Pincode"
                      value={profile?.pincode || ''}
                      gradientFrom="from-indigo-50"
                      gradientTo="to-purple-50"
                      borderColor="border-indigo-100"
                      labelColor="text-indigo-600"
                    />
                  </div>
                  
                  <ProfileField
                    label="Display Name"
                    value={profile?.name || ''}
                    gradientFrom="from-pink-50"
                    gradientTo="to-rose-50"
                    borderColor="border-pink-100"
                    labelColor="text-pink-600"
                  />
                  
                  <ProfileField
                    label="Bio"
                    value={profile?.bio || ''}
                    gradientFrom="from-teal-50"
                    gradientTo="to-cyan-50"
                    borderColor="border-teal-100"
                    labelColor="text-teal-600"
                  />
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ProfileField
                      label="First Name"
                      value={form.firstName}
                      placeholder="Enter your first name"
                      editMode={true}
                      onChange={(value) => handleChange('firstName', value)}
                    />
                    <ProfileField
                      label="Last Name"
                      value={form.lastName}
                      placeholder="Enter your last name"
                      editMode={true}
                      onChange={(value) => handleChange('lastName', value)}
                    />
                  </div>
                  
                  <ProfileField
                    label="Phone Number"
                    value={form.phoneNumber}
                    placeholder="Enter your phone number"
                    type="tel"
                    editMode={true}
                    onChange={(value) => handleChange('phoneNumber', value)}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ProfileField
                      label="City"
                      value={form.city}
                      placeholder="Enter your city"
                      editMode={true}
                      onChange={(value) => handleChange('city', value)}
                    />
                    <ProfileField
                      label="Pincode"
                      value={form.pincode}
                      placeholder="Enter your pincode"
                      editMode={true}
                      onChange={(value) => handleChange('pincode', value)}
                    />
                  </div>
                  
                  <ProfileField
                    label="Display Name"
                    value={form.name}
                    placeholder="Enter your display name"
                    editMode={true}
                    onChange={(value) => handleChange('name', value)}
                  />
                  
                  <ProfileField
                    label="Bio"
                    value={form.bio}
                    placeholder="Tell us about yourself..."
                    type="textarea"
                    rows={4}
                    editMode={true}
                    onChange={(value) => handleChange('bio', value)}
                  />
                  
                  <div className="flex gap-4 pt-4">
                    <ActionButton
                      variant="secondary"
                      onClick={handleCancel}
                      disabled={saving}
                      className="flex-1"
                    >
                      Cancel
                    </ActionButton>
                    <ActionButton
                      variant="primary"
                      onClick={() => {}} // This will be handled by form submit
                      disabled={saving}
                      loading={saving}
                      className="flex-1"
                    >
                      Save Changes
                    </ActionButton>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ProfileStats profile={profile} form={form} editMode={editMode} />
            <AccountInfo profile={profile} />
          </div>
        </div>
      </div>
    </div>
  );
} 