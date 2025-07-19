interface AccountInfoProps {
  profile: any;
  className?: string;
}

export default function AccountInfo({ profile, className = '' }: AccountInfoProps) {
  return (
    <div className={`bg-white rounded-3xl shadow-xl border border-gray-100 p-6 ${className}`}>
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        Account Info
      </h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Provider</span>
          <span className="text-sm font-semibold text-gray-800">Auth0</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Status</span>
          <span className="text-sm font-semibold text-green-600">Active</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Last Updated</span>
          <span className="text-sm font-semibold text-gray-800">
            {profile?.updatedAt ? new Date(profile.updatedAt).toLocaleDateString() : 'Never'}
          </span>
        </div>
      </div>
    </div>
  );
} 