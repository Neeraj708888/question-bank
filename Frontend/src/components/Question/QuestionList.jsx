import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestion, clearMessages, updateQuestion, deleteQuestion } from '../../slice';
import { useParams } from 'react-router-dom';

const QuestionList = () => {

    const dispatch = useDispatch();
    const { topicId } = useParams();
    const { loading, error, adminInfo, successMessage } = useSelector((state) => state.admin);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editQuestion, setEditQuestion] = useState({
        question: "",
        answer: "",
        topicId: topicId || "",
        _id: ""
    });

    // Fetch Questions
    useEffect(() => {
        if (topicId) {
            dispatch(getQuestion(topicId));
        }
    }, [dispatch, topicId]);

    // Edit Question Button
    const handleEditQuestion = (qstn) => {
        setEditQuestion({
            ...qstn, topicId
        });
        setShowEditModal(true);
    }

    // Delete Question Button
    const handleDeleteQuestion = (id) => {
        if (window.confirm("Are you sure you want to delete this question?")) {
            dispatch(deleteQuestion(id));
        }
    }

    // Close Question Modal
    const handleCloseModal = () => {
        setShowEditModal(false);
        setEditQuestion({ question: "", answer: "", topicId: topicId || "", _id: "" });
        dispatch(clearMessages('question')); //pass clear message
    }

    // Handle Question Edit Input field
    const handleQuestionInputChange = (e) => {
        const { name, value } = e.target;
        setEditQuestion((prev) => ({ ...prev, [name]: value || "" }));
    };

    // Submit to Save Edited Question
    const handleSaveQuestionSubmit = () => {
        if (!editQuestion.question.trim() || !editQuestion.answer.trim()) {
            alert('Please fill both fields.');
            return;
        }

        dispatch(updateQuestion(editQuestion)).then((res) => {
            if (!res.error) {
                setShowEditModal(false);
                dispatch(clearMessages('updateQstn'));
                dispatch(getQuestion(topicId)); // Refresh Questions
            }
        });
    }

    useEffect(() => {
        if (Object.keys(error).length > 0 || successMessage?.question || successMessage?.updateQstn || successMessage?.deleteQstn) {
            const timer = setTimeout(() => {
                dispatch(clearMessages(''));
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [dispatch, error, successMessage]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-r from-indigo-900 via-black to-gray-900">
            <div className="w-full max-w-3xl bg-black rounded-lg shadow-lg p-6 space-y-6">
                <h2 className="text-2xl font-bold text-gray-200 text-center">Questions & Answers</h2>

                <div className="text-center mb-4">
                    {
                        loading && <p className="text-blue-600">Loading...</p>
                    }
                    {/* Only show update success message */}
                    {successMessage.updateQstn && <p className="text-green-500">{successMessage.updateQstn}</p>}

                    {/* Show fetch success message only when not updating */}
                    {!showEditModal && successMessage.question && <p className="text-green-500">{successMessage.question}</p>}

                    {
                        Object.entries(error).map(([key, msg]) => msg && <p key={key} className="text-red-500">{msg}</p>)
                    }
                </div>


                {adminInfo.length > 0 ? (
                    <ul className="space-y-4">
                        {adminInfo.map((q) => (
                            <li key={q._id} className="p-4 border rounded-lg bg-gray-50 shadow-sm">
                                <div className="flex justify-between mb-4">
                                    <button onClick={() => handleEditQuestion(q)} className="bg-green-500 text-white px-4 py-2 rounded">Edit</button>
                                    <button onClick={() => handleDeleteQuestion(q._id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                                </div>

                                <p className="font-semibold text-gray-800">Q: {q.question}</p>
                                <p className="text-gray-700 mt-1">A: {q.answer}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    !loading && <p className="text-center text-gray-500">No questions found for this topic.</p>
                )}

                {showEditModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white rounded-lg p-6 w-96 space-y-4 shadow-lg">
                            <h2 className="text-xl font-bold text-gray-800">Edit Question</h2>
                            <input type="text" name="question" value={editQuestion.question} onChange={handleQuestionInputChange} className="w-full p-2 border rounded" placeholder="Question" />
                            <textarea name="answer" value={editQuestion.answer} onChange={handleQuestionInputChange} className="w-full p-2 border rounded" placeholder="Answer" rows="4"></textarea>

                            <div className="flex justify-end space-x-2">
                                <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={handleCloseModal}>Cancel</button>
                                <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleSaveQuestionSubmit}>Save</button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default QuestionList;
