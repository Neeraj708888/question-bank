
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateQuestion, getTopic } from "../../slice";

const UpdateQuestion = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { questionId } = useParams();
  const { adminInfo, loading, successMessage, error } = useSelector((state) => state.admin);

  const [questionData, setQuestionData] = useState({
    topicId: "",
    question: "",
    answer: ""
  });

  useEffect(() => {
    dispatch(getTopic()); // Fetch topics for selection
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestionData({ ...questionData, [name]: value });
  };

  const handleUpdate = () => {
    if (!questionData.question || !questionData.answer) {
      alert("Please fill in all fields.");
      return;
    }

    dispatch(updateQuestion({ ...questionData, _id: questionId }))
      .unwrap()
      .then(() => {
        alert("Question updated successfully.");
        // navigate("/topics");
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 space-y-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center">Update Question</h2>

        <select
          name="topicId"
          value={questionData.topicId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Topic</option>
          {adminInfo. map((topic) => (
            <option key={topic._id} value={topic._id}>{topic.title}</option>
          ))}
        </select>

        <input
          type="text"
          name="question"
          value={questionData.question}
          onChange={handleChange}
          placeholder="Enter question"
          className="w-full p-2 border rounded"
        />

        <textarea
          name="answer"
          value={questionData.answer}
          onChange={handleChange}
          placeholder="Enter answer"
          className="w-full p-2 border rounded"
          rows="4"
        ></textarea>

        <button
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          onClick={handleUpdate}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Question"}
        </button>

        {successMessage && <p className="text-green-600 text-center">{successMessage}</p>}
        {error && <p className="text-red-600 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default UpdateQuestion;
