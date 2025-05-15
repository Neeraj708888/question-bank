import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTopic, clearMessages } from "../../slice";
import { useNavigate } from "react-router-dom";

const CreateTopic = () => {
  const [selectedTopic, setSelectedTopic] = useState(""); // for selection topic state
  const [customTopic, setCustomTopic] = useState(""); // for user manually topic state
  const [desc, setDesc] = useState(""); // for description state

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, successMessage } = useSelector((state) => state.admin);

  const preDefinedTopics = [
    "JavaScript",
    "React JS",
    "Node JS",
    "Express JS",
    "MongoDB",
    "MySQL",
  ];

  const handleSubmit = async () => {
    const topicName = customTopic || selectedTopic;

    if (!topicName || !desc) {
      alert("Please Provide both topic and description.");
      return;
    }

    const newTopic = { title: topicName, desc: desc };

    try {
      await dispatch(createTopic(newTopic)).unwrap();
      setSelectedTopic("");
      setCustomTopic("");
      setDesc("");
      setTimeout(()=> {
        navigate('/topics');
      },1500);
    } catch (error) {
      console.error("Error creating topic: ", error);
    }
  }; 

  // Remove Message a specific time
  useEffect(() => {
    if (Object.keys(error).length > 0 || successMessage?.topicCreate) {
      // Clear messages after 5 seconds
      const timer = setTimeout(() => {
        dispatch(clearMessages(''));
      }, 1000);
 
      return () => clearTimeout(timer);
    }
  }, [error, successMessage, dispatch]);

  return (
    <div className="flex flex-col items-center p-4 min-h-screen bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-lg relative space-y-4">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Add Topics</h1>

        <select
          className="w-full p-2 mb-4 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          onChange={(e) => setSelectedTopic(e.target.value)}
          value={selectedTopic}
        >
          <option value="">Select a Topic</option>
          {preDefinedTopics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>

        <input
          type="text"
          className="w-full p-2 mb-4 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Your custom topic"
          value={customTopic}
          onChange={(e) => setCustomTopic(e.target.value)}
        />

        <textarea
          className="w-full p-2 mb-4 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          rows={4}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Enter topic description"
        ></textarea>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-2 rounded-md text-white font-semibold transition ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-teal-500 hover:bg-teal-600"
          }`}
        >
          {loading ? "Loading..." : "Add Topic"}
        </button>

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

      </div>
    </div>
  );
};

export default CreateTopic;
