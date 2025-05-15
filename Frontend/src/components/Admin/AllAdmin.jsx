
// GetAllUser.jsx
export const AllAdmin = ({ user, onUpdate, onDelete }) => {
  return (
    <section className="p-3 bg-white rounded-lg shadow-md w-64 relative">
      {/* Status Flag */}
      <div 
        className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${
          user?.isAdmin ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}
      >
        {user?.isAdmin ? "Active" : "Inactive"}
      </div>

      {/* User Details */}
      <div>
        <h2 className="text-md font-semibold truncate">{user?.username}</h2>
        <p className="text-xs text-gray-600 truncate">{user?.email}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2 mt-3 justify-end">
        <button 
          className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => onUpdate(user)}
        >
          Update
        </button>
        <button 
          className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => onDelete(user)}
        >
          Delete
        </button>
      </div>
    </section>
  );
};
