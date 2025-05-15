import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessages, createQuestion, deleteTopic, getTopic, updateQuestion, updateTopic } from "../../slice";
import { useNavigate, useParams } from "react-router-dom"; // Import useNavigate


const TopicCard = () => {
  const { id } = useParams()
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize the navigate hook
  const { adminInfo, loading, successMessage, error } = useSelector(
    (state) => state.admin
  );
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showQstnModal, setShowQstnModal] = useState(false);
  const [currentTopic, setCurrentTopic] = useState({ title: "", desc: "", _id: "" });
  const [questions, setQuestions] = useState({
    question: '', answer: '', topicId: ''
  });

  // Show Question List
  const handleShowQuestions = (id) => {
    setTimeout(() => {
      navigate(`/questions/${id}`);
    }, 1500);

  }


  // Fetch topics on component mount
  useEffect(() => {
    dispatch(clearMessages(''));
    dispatch(getTopic());
  }, [dispatch]);

  // Handle Update Open
  const handleUpdate = (topic) => {
    setCurrentTopic(topic);
    setShowModal(true);
  };


  // Handle Delete Topic
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this topic?")) {
      dispatch(deleteTopic(id));
      setTimeout(() => {
        dispatch(getTopic());
      }, 2000);
    }
  };

  // Handle View Topic
  const handleView = (topic) => {
    setCurrentTopic(topic);
    setShowViewModal(true);
  };

  // Handle Add Question Modal
  const handleAddQuestions = (topic) => {
    if (!topic || !topic._id) {
      alert("Topic ID is missing. Please try again.");
      return;
    }
    setShowQstnModal(true);
    setCurrentTopic(topic._id);
    setQuestions({ ...questions, topicId: topic._id });  // Set topicId for the question

  };

  // Handle Close Modal
  const handleCloseModal = () => {
    setShowModal(false);
    setShowViewModal(false);
    setShowQstnModal(false);
    setQuestions({ question: "", answer: "", topicId: "" });
  };

  const handleQuestionInputChange = (e) => {
    const { name, value } = e.target;
    setQuestions({ ...questions, [name]: value });
  };

  // Handle Update Topic Submission
  const handleUpdateTopicSubmit = () => {
    if (!currentTopic.title || !currentTopic.desc) {
      alert("Please fill in all fields.");
      return;
    }

    dispatch(updateTopic(currentTopic));
    setShowModal(false);
  };

  // Handle Save Question Submission
  const handleSaveQuestionsSubmit = () => {


    if (!questions?.question || !questions?.answer) {
      alert("Please fill in all fields.");
      return;
    }
    const topicId = questions.topicId; // Directly using topicId from currentTopic
    console.log(topicId);

    if (!topicId) {
      alert("Topic ID is required. Please select a valid topic.");
      return;
    }

    dispatch(createQuestion(questions));
    setShowQstnModal(false);
    setQuestions({ question: "", answer: "", topicId: "" });
    setTimeout(() => {
      dispatch(getTopic());
    }, 1500);
  };

  // Clear Messages after some time
  useEffect(() => {
    if (error || successMessage) {
      const timer = setTimeout(() => {
        dispatch(clearMessages(''));
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [error, successMessage, dispatch]);

  // Remove Message a specific time
  useEffect(() => {
    if (Object.keys(error).length || successMessage?.topicUpdate || successMessage?.deleteTopics || successMessage?.getTopic) {
      // Clear messages after 5 seconds
      const timer = setTimeout(() => {
        dispatch(clearMessages(''));

      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [error, successMessage, dispatch]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-cyan-900 via-black to-gray-900 p-4">
      <div className="w-full max-w-5xl space-y-6">
        <h2 className="text-2xl font-bold text-gray-200 text-center mb-4">Topic List</h2>

        <div className="text-center mb-4">
          {
            loading && <p className="text-blue-600">Loading...</p>
          }
          {
            Object.entries(successMessage).map(([key, msg]) => msg && <p key={key} className="text-green-500">{msg}</p>)
          }
          {
            Object.entries(error).map(([key, msg]) => msg && <p key={key} className="text-red-500">{msg}</p>)
          }
        </div>

        {/* Topic List (Responsive Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {adminInfo.length > 0 ? (
            adminInfo?.map((topic, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-lg flex flex-col justify-between space-y-4 transition transform hover:scale-105 duration-300 relative"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{topic.title}</h3>
                  <p className="text-gray-600 mt-2">{topic.desc}</p>
                </div>

                {/* Read Questions Button positioned to the top-right corner */}
                <button
                  className="absolute top-2 right-2 tracking-wider bg-black text-white py-1 px-3 rounded hover:bg-white hover:text-black transition cursor-pointer"
                  onClick={() => handleShowQuestions(topic._id)} // Handle navigation when clicked
                >
                  Read
                </button>

                <div className="flex items-center justify-between mt-4">
                  <button
                    className="bg-green-700 text-white py-1 px-3 rounded hover:bg-green-900 transition cursor-pointer tracking-wider"
                    onClick={() => handleView(topic)}
                  >
                    View
                  </button>

                  <button
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-900 transition cursor-pointer tracking-wider"
                    onClick={() => handleUpdate(topic)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-900 transition cursor-pointer tracking-wider"
                    onClick={() => handleDelete(topic._id)}
                  >
                    Delete
                  </button>
                </div>

                <div>
                  <button
                    className="top-2 right-2 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-900 transition cursor-pointer"
                    onClick={() => handleAddQuestions(topic)} // Handle navigation when clicked
                  >
                    Add Questions
                  </button>
                </div>
              </div>
            ))
          ) :
            <p className="text-center text-gray-500 col-span-full">
              No topics available. Please add some topics.
            </p>
          }
        </div>
      </div>

      {/* Update Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96 space-y-4 shadow-lg">
            <h2 className="text-xl font-bold text-gray-800">Update Topic</h2>
            <input
              type="text"
              value={currentTopic.title}
              onChange={(e) => setCurrentTopic({ ...currentTopic, title: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="Topic Title"
            />
            <textarea
              value={currentTopic.desc}
              onChange={(e) => setCurrentTopic({ ...currentTopic, desc: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="Topic Description tracking-widest"
              rows="4"
            ></textarea>

            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
                onClick={handleCloseModal}
              >
                Cancel
              </button>

              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                onClick={handleUpdateTopicSubmit}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96 space-y-4 shadow-lg">
            <h2 className="text-xl font-bold text-gray-800">{currentTopic.title}</h2>
            <p className="text-gray-600">{currentTopic.desc}</p>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Question Modal */}
      {showQstnModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96 space-y-4 shadow-lg tracking-wider">
            <h2 className="text-xl font-bold text-gray-800 tracking-wider">Add Question</h2>
            <input
              type="text"
              name="question"
              value={questions?.question}
              onChange={handleQuestionInputChange}
              className="w-full p-2 border rounded tracking-widest"
              placeholder="Question"
            />
            <textarea
              type='text'
              name="answer"
              value={questions?.answer}
              onChange={handleQuestionInputChange}
              className="w-full p-2 border rounded tracking-widest"
              placeholder="Answer"
              rows="4"
            ></textarea>

            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
                onClick={handleCloseModal}
              >
                Cancel
              </button>

              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                onClick={handleSaveQuestionsSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopicCard;
