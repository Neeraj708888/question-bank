

export const UpdateAdminModal = ({ isOpen, currentUser, setCurrentUser, onClose, onSubmit }) => {

  if (!isOpen) return null;

  const handleChange = (e) => {
    setCurrentUser({
        ...currentUser, [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96 space-y-4 shadow-lg">
        <h2 className="text-xl font-bold text-gray-800">Update User</h2>
        <input
          type="text"
          name="username"
          value={currentUser?.username || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Username"
        />
        <input
          type="email"
          name="email"
          value={currentUser?.email || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Email"
        />
            <input
            type="password"
            name="password"
            value={currentUser?.password || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="enter your password"
            onFocus={(e)=> e.target.select()}
            />

        <div className="flex justify-end space-x-2">
          <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={onClose}>Cancel</button>
          <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={onSubmit}>Save Changes</button>
        </div>
      </div>
    </div>
  );
};
