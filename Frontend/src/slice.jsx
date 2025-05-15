// slice.jsx file
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "./url/axiosInstance";

// ----------------------ADMIN API ----------------------//

// POST FOR REGISTER
export const createAdmin = createAsyncThunk(
    'admin/register',
    async (userData, { rejectWithValue }) => {
        console.log(userData);

        try {
            const res = await axiosInstance.post('/api/auth/register', userData);
           
            return res.data;

        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Registration failed'
            );
        }
    }
);




// POST FOR LOGIN
export const loginAdmin = createAsyncThunk(
    'admin/login',
    async (userData, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post('/api/auth/login', userData, {
            });

            console.log('Login Success Response: ', res.data);
            // const { token } = res.data;
            const token = res.data.token;

            if (!token) {

                throw new Error('No Token returned from server');

            }
            try {

                localStorage.setItem('token', token);

            } catch (cookieError) {

                throw new Error('Failed to store token in cookie' || cookieError.message);

            }

            return res.data;

        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Login failed !'
            );
        }
    }
);


// GET
export const getAdmin = createAsyncThunk('getAdmin', async (_, { rejectWithValue }) => {
    try {

        // GET Token
        const token = localStorage.getItem('token');

        const res = await axiosInstance.get('/api/admin/findAll', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true,
        });

        // console.log(res.data);
        return res.data;

    } catch (error) {
        return rejectWithValue(
            error.response?.data?.message || error.message || 'Registration failed'
        );
    }
});

// UPDATE ADMIN
export const updateAdmin = createAsyncThunk('admin/updateUser', async (adminData, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Token missing. Login again...');
        }

        const { _id, username, email, password } = adminData;
        if (!_id) {
            throw new Error('Admin Id is required !');
        }
        const res = await axiosInstance.put(`/api/admin/update/${_id}`, { username, email }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        return res.data;

    } catch (error) {
        return rejectWithValue(error.response?.data.message || error.message || 'Failed to update Admin information!');
    }
});

// DELETE
export const deleteAdmin = createAsyncThunk('deleteAdmin', async (_id, { rejectWithValue }) => {
    try {
        // GET token
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Token missing. Login Again !');
        }

        if (!_id) {
            throw new Error('Topic Id is required to delete.');
        }

        const res = await axiosInstance.delete(`/api/admin/delete/${_id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        return _id;

    } catch (error) {
        rejectWithValue(error.response?.data?.message || error.message || 'Failed to delete Question !');
    }
});


// ----------------------TOPICS API ----------------------//

// POST

export const createTopic = createAsyncThunk(
    'createTopic',
    async (topicData, { rejectWithValue }) => {


        const token = localStorage.getItem('token');

        try {
            // ✅ Just send request with withCredentials: true
            const res = await axiosInstance.post('/api/topics', topicData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                //   withCredentials: true, // ✅ Send the cookie to backend
            });

            return res.data;

        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to create topic!'
            );
        }
    }
);

// GET
export const getTopic = createAsyncThunk('getTopic', async (_, { rejectWithValue }) => {

    try {

        const res = await axiosInstance.get('/api/topics');

        return res.data;

    } catch (error) {
        console.error('Error in fetching data...', res.error?.data || error.message);
        return rejectWithValue(error.response?.data?.message || error.message || 'Failed to fetch topics..');
    }
});

// UPDATE
export const updateTopic = createAsyncThunk('updateTopic', async (topicData, { rejectWithValue }) => {
    try {
        // Get TOKEN HERE
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Admin token is missing. Please login again!');
        }

        const { _id, title, desc } = topicData;
        if (!_id) {
            throw new Error('Topic ID is required for update.');
        }

        const res = await axiosInstance.put(`/api/topics/update/${_id}`,
            { title, desc },  // Sending updated data in request body
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Failed to update topic.');
    }
});


// DELETE TOPIC
export const deleteTopic = createAsyncThunk('deleteTopic', async (_id, { rejectWithValue }) => {

    try {

        //GET TOKEN
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Token is missing. Login again once.');
        }


        if (!_id) {
            throw new Error('Topic ID is required to delete.');
        }
        const res = await axiosInstance.delete(`/api/topics/delete/${_id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }

        });

        return _id;

    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Failed to delete topic !');
    }
});

// --------------------- QUESTION API -------------------//

// POST QUESTION
export const createQuestion = createAsyncThunk('createQuestion', async (questionData, { rejectWithValue }) => {

    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('Missing token. Login again once !');
    }

    try {

        const res = await axiosInstance.post(`/api/question`, questionData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

        return res.data;

    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || error.message || 'Failed to post questions.')
    }
});

// GET QUESTION
export const getQuestion = createAsyncThunk('getQuestion', async (topicId, { rejectWithValue }) => {

    try {

        const res = await axiosInstance.get(`/api/question?topicId=${topicId}`);

        return res.data;

    } catch (error) {

        return rejectWithValue(error.response?.data?.message || error.message || 'Failed to get all Questions and Answers !');
    }
});

// UPDATE QUESTION

export const updateQuestion = createAsyncThunk(
    'updateQuestion',
    async (questionData, { rejectWithValue }) => {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Missing token. Login again');
        }

        const { question, answer, topicId, _id } = questionData;
        if (!_id || !topicId) {
            throw new Error('Required question ID and topic ID to update !');
        }

        try {
            const res = await axiosInstance.put(
                `/api/question?topicId=${topicId}&_id=${_id}`,
                { question, answer },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                }
            );

            return res.data;

        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message || 'Failed to update question.');
        }
    }
);

// DELETE QUESTION
export const deleteQuestion = createAsyncThunk('deleteQuestion', async (_id, { rejectWithValue }) => {
    // GET TOKEN
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token is missng. Please Login again !');
    }

    if (!_id) {
        throw new Error('Required Question Id !');
    }

    try {
        const res = await axiosInstance.delete(`/api/question/${_id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        return _id;

    } catch (error) {
        rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to delete this question !');
    }
});


const slice = createSlice({
    name: 'admin',
    initialState: {
        adminInfo: [],  // Array
        loading: false,
        error: {}, // dynamic errors by action type
        successMessage: {
            register: '',
            login: '',
            getAdmin: '',
            deleteAdmin: '',
            updateAdmin: '',
            topic: '',
            topicCreate: '',
            topicUpdate: '',
            question: '',
            createQstn: '',
            updateQstn: '',
            deleteQstn: '',
        }
    },

    reducers: {
        clearMessages: (state, action) => {
            const type = action.payload;
            if (type) {
                if (state.successMessage[type]) state.successMessage[type] = '';
            } else {
                // Clear all success and error messages
                state.successMessage = Object.keys(state.successMessage).reduce((acc, key) => {
                    acc[key] = '';
                    return acc;
                }, {});
                state.error = {};
            }
        },
    },

    extraReducers: (builder) => {
        builder
            // REGISTER Admin or User
            .addCase(createAdmin.pending, (state) => {
                state.loading = true;
            })
            .addCase(createAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.adminInfo = action.payload;
                state.successMessage.register = 'Registration Succeefully !';
            })
            .addCase(createAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error.register = [action.payload];
            });

        // login Admin
        builder.addCase(loginAdmin.pending, (state) => {
            state.loading = true;
        })
            .addCase(loginAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage.login = 'Login Succeefully !';
                state.userInfo = action.payload;
            })
            .addCase(loginAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error.login = [action.payload];
            });

        // Update Admin
        builder.addCase(updateAdmin.pending, (state) => {
            state.loading = true;
        })
            .addCase(updateAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage.updateAdmin = 'Updated User Successfully !';
                const index = state.adminInfo.findIndex((user) => user._id === action.payload._id);

                if (index !== -1) {
                    state.adminInfo[index] = action.payload;
                }
            })
            .addCase(updateAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error.updateAdmin = [action.payload || 'Failed to update User !'];
            });

        // Delete User
        builder.addCase(deleteAdmin.pending, (state) => {
            state.loading = true;
        })
            .addCase(deleteAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage.deleteAdmin = 'Deleted User Successfully !'
                state.adminInfo = state.adminInfo.filter((user) => user._id !== action.payload);
            })
            .addCase(deleteAdmin.rejected, (state, action) => {
                state.loading = false;
                state.successMessage.deleteAdmin = [action.payload];
            })
        // Get ALL Admin
        builder.addCase(getAdmin.pending, (state) => {
            state.loading = true;
        })
            .addCase(getAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage.getAdmin = 'Admin fetched Successfully!';
                state.adminInfo = action.payload;
            })
            .addCase(getAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error.getAdmin = [action.payload];
            });

        // Create Topics
        builder.addCase(createTopic.pending, (state) => {
            state.loading = true;
        })
            .addCase(createTopic.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage.topicCreate = 'Topic created Successfully!';
                state.adminInfo = action.payload;
            })
            .addCase(createTopic.rejected, (state, action) => {
                state.loading = false;
                state.error.topicCreate = [action.payload];
            });

        // Get Topics
        builder.addCase(getTopic.pending, (state) => {
            state.loading = true;
        })
            .addCase(getTopic.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage.getTopic = 'Topic fetched Successfully!';
                state.adminInfo = action.payload;

            })
            .addCase(getTopic.rejected, (state, action) => {
                state.loading = false;
                state.error.getTopic = [action.payload];
            });

        // Update Topic
        builder.addCase(updateTopic.pending, (state) => {
            state.loading = true;
        })
            .addCase(updateTopic.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage.topicUpdate = 'Topic updated Successfully!';

                // Update the specific topic in the list
                const index = state.adminInfo.findIndex((topic) => topic._id === action.payload._id);
                if (index !== -1)  // index is not found in array
                {
                    state.adminInfo[index] = action.payload;
                }
            })
            .addCase(updateTopic.rejected, (state, action) => {
                state.loading = false;
                state.error.topicUpdate = [action.payload];
            });

        // Delete Topic
        builder.addCase(deleteTopic.pending, (state) => {
            state.loading = true;
        })
            .addCase(deleteTopic.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage.deleteTopics = 'Topic deleted Successfully!';

                state.adminInfo = state.adminInfo.filter((topic) => {
                    topic._id !== action.payload
                });
            })
            .addCase(deleteTopic.rejected, (state, action) => {
                state.loading = false;
                state.error.deleteTopics = [action.payload];
            });

        // Create Questions
        builder.addCase(createQuestion.pending, (state) => {
            state.loading = true;
        })
            .addCase(createQuestion.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage.createQstn = 'Question created Successfully!';
                state.adminInfo = action.payload;
            })
            .addCase(createQuestion.rejected, (state, action) => {
                state.loading = false;
                state.error.createdQtn = [action.payload];
            });

        // Get Questions
        builder.addCase(getQuestion.pending, (state) => {
            state.loading = true;
        })
            .addCase(getQuestion.fulfilled, (state, action) => {
                state.loading = false;
                state.adminInfo = action.payload;
                state.successMessage.question = 'Questions fetched Successfully!';
            })
            .addCase(getQuestion.rejected, (state, action) => {
                state.loading = false;
                state.error.question = [action.payload];
            });

        // Update Questions
        builder.addCase(updateQuestion.pending, (state) => {
            state.loading = true;
        })
            .addCase(updateQuestion.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage.updateQstn = 'Question updated Successfully!';

                // Update the specific topic in the list
                const index = state.adminInfo.findIndex((q) => q._id === action.payload._id ? action.payload : q);
            })
            .addCase(updateQuestion.rejected, (state, action) => {
                state.loading = false;
                state.error.updateQstn = [action.payload];
            });
        // Delete Questions
        builder.addCase(deleteQuestion.pending, (state) => {
            state.loading = true;
        })
            .addCase(deleteQuestion.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage.deleteQstn = 'Question deleted Successfully !';
                state.adminInfo = state.adminInfo.filter((question) => question._id !== action.payload);
            })
            .addCase(deleteQuestion.rejected, (state, action) => {
                state.loading = false;
                state.error.deleteQstn = [action.payload];
            })
    },
});

export const { clearMessages } = slice.actions;
export default slice.reducer;