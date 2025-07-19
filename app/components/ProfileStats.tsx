interface ProfileStatsProps {
  profile: any;
  form?: any;
  editMode?: boolean;
  className?: string;
}

export default function ProfileStats({ profile, form, editMode = false, className = '' }: ProfileStatsProps) {
  // Define the profile fields that users can edit
  const profileFields = ['name', 'bio', 'firstName', 'lastName', 'phoneNumber', 'city', 'pincode'];
  
  // Use form data if in edit mode, otherwise use profile data
  const dataToCheck = editMode ? form : profile;
  
  const completedFields = profileFields.filter(field => 
    dataToCheck?.[field] && dataToCheck[field] !== ''
  ).length;
  
  const totalFields = profileFields.length;
  const completionPercentage = (completedFields / totalFields) * 100;

  return (
    <div className={`bg-white rounded-3xl shadow-xl border border-gray-100 p-6 ${className}`}>
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Profile Stats
      </h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Fields Completed</span>
          <span className="text-2xl font-bold text-blue-600">
            {completedFields}/{totalFields}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        <div className="text-sm text-gray-500">
          {completedFields === totalFields ? 'Profile Complete!' : 'Complete your profile to unlock all features'}
        </div>
        {editMode && (
          <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded-lg">
            💡 Changes will be saved when you click "Save Changes"
          </div>
        )}
      </div>
    </div>
  );
} 