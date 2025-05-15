import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearMessages, getAdmin, deleteAdmin, updateAdmin } from '../../slice';
import { ConfirmDeleteAdminModal } from './ConfirmDeleteAdminModal';
import { UpdateAdminModal } from './UpdateAdminModal';
import { AllAdmin } from './AllAdmin';


export const Button = () => {
  const dispatch = useDispatch();
  const { adminInfo, successMessage, error, loading } = useSelector((state) => state.admin);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({ username: '', email: '', _id: '' });

  useEffect(() => { 
    dispatch(clearMessages(''));
    dispatch(getAdmin());
  }, [dispatch]);

  // Handle Update
  const handleUpdate = (user) => {
    setCurrentUser(user);
    setShowUpdateModal(true);
  };

  // Handle Form Submission (Update)
  const handleUpdateSubmit = () => {
    if (!currentUser.username || !currentUser.email) {
      alert("Please fill in all fields.");
      return;
    }

    dispatch(updateAdmin(currentUser)).then(() => {
      setShowUpdateModal(false);
      setCurrentUser({ username: '', email: '', _id: '' });
    });
  };

  // Handle Delete
  const confirmDelete = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleDelete = () => {
    if (selectedUser) {
      dispatch(deleteAdmin(selectedUser._id)).then(() => dispatch(getUser())).finally(() => {
        setShowModal(false);
        setSelectedUser(null);
      });
    }
  };

  // Remove Message a specific time
  useEffect(() => {
    if (Object.keys(error).length || successMessage?.updateAdmin || successMessage?.getAdmin || successMessage?.deleteAdmin) {

      const timer = setTimeout(() => {
        dispatch(clearMessages(''));
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [error, successMessage, dispatch]);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="text-center mb-4">
        {loading && <p className="text-blue-600">Loading...</p>}
        {Object.entries(successMessage).map(([key, msg]) => msg && <p key={key} className="text-green-500 font-medium mt-2">{msg}</p>)}
        {Object.entries(error).map(([key, msg]) => msg && <p key={key} className="text-red-500">{msg}</p>)}
      </div>

      <div className="flex flex-wrap gap-4 justify-center mt-4">
        {adminInfo?.length > 0 ? (
          adminInfo.map((user) => (
            <div key={user._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              
              < AllAdmin
                user={user}
                onUpdate={handleUpdate}
                onDelete={() => confirmDelete(user)}
                successMessage = {successMessage}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500">No users available.</p>
        )}
      </div>

      < ConfirmDeleteAdminModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this user?"
      />

      < UpdateAdminModal
        isOpen={showUpdateModal}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        onClose={() => setShowUpdateModal(false)}
        onSubmit={handleUpdateSubmit}
      />
    </div>
  );
};

export default Button;
