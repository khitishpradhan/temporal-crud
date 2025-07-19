interface QuickActionsProps {
  editMode: boolean;
  onEditClick: () => void;
  onDeleteClick: () => void;
  deleting?: boolean;
  className?: string;
}

export default function QuickActions({ 
  editMode, 
  onEditClick, 
  onDeleteClick, 
  deleting = false,
  className = '' 
}: QuickActionsProps) {
  return (
    <div className={`bg-white rounded-3xl shadow-xl border border-gray-100 p-6 ${className}`}>
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Quick Actions
      </h3>
      <div className="space-y-3">
        <button
          onClick={onEditClick}
          className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          {editMode ? 'Cancel Edit' : 'Edit Profile'}
        </button>
        
        <button
          onClick={onDeleteClick}
          className="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 flex items-center justify-center"
          disabled={deleting}
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          {deleting ? 'Deleting...' : 'Delete Profile'}
        </button>
      </div>
    </div>
  );
} 