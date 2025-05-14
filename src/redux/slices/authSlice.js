import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { decodeToken } from "../../utils/decodeToken";

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (credentials, { rejectWithValue }) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/user/login`,
                credentials,
                config
            );

            const { token } = response.data;
            const decodedToken = decodeToken(token);
               console.log("decodedToken",decodedToken)
            if (decodedToken) {
                // sessionStorage.setItem("token", JSON.stringify(token));

                return {
                    token,
                    decodedToken,
                };
            }

            return rejectWithValue("Invalid token");
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Login failed");
        }
    }
);


const authSlice = createSlice({
    name: "auth",
    initialState: {
        currentUserToken: null,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.currentUserToken = null;
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
            localStorage.removeItem("token");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                const { token, decodedToken } = action.payload;
                state.currentUserToken = token;
                state.user = decodedToken;
                state.user.role =
                    decodedToken.RoleId === 1 ? "Admin" :
                        decodedToken.RoleId === 2 ? "Doctor" :
                            decodedToken.RoleId === 3 ? "Lab" :
                            decodedToken.RoleId === 5 ? "Accountant":
                                "Reception";
                state.isAuthenticated = true;
                state.loading = false;
            })

            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;