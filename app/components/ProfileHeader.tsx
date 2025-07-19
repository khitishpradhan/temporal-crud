interface ProfileHeaderProps {
  user: any;
  profile: any;
  editMode: boolean;
  onEditClick: () => void;
}

export default function ProfileHeader({ user, profile, editMode, onEditClick }: ProfileHeaderProps) {
  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-8">
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-8 text-white">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <img
              src={user.picture || '/next.svg'}
              alt={user.name || 'User Avatar'}
              className="w-24 h-24 rounded-full border-4 border-white/30 shadow-lg object-cover"
            />
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-400 rounded-full border-4 border-white flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{profile?.name || user.name || 'Your Profile'}</h1>
            <p className="text-blue-100 text-lg">{user.email}</p>
            <div className="flex items-center mt-3">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              <span className="text-blue-100">Active</span>
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            {!editMode && (
              <button
                onClick={onEditClick}
                className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-200 border border-white/30 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Profile
              </button>
            )}
            <a
              href="/api/auth/logout"
              className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all duration-200 border border-white/20 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 