import {
    POST_LIST_REQUEST,
    POST_LIST_SUCCESS,
    POST_LIST_FAIL,
    POST_DETAILS_REQUEST,
    POST_DETAILS_SUCCESS,
    POST_DETAILS_FAIL,
    POST_CREATE_REQUEST,
    POST_CREATE_SUCCESS,
    POST_CREATE_FAIL,
} from "../constants/postConstants";
import axios from "axios";

export const listPosts = () => async (dispatch) => {
    try {
        dispatch({ type: POST_LIST_REQUEST });
        const { data } = await axios.get(`/api/posts`);
        dispatch({ type: POST_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: POST_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const detailPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: POST_DETAILS_REQUEST });
        const { data } = await axios.get(`/api/posts/${id}`);
        dispatch({ type: POST_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: POST_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createPost = () => async (dispatch, getState) => {
    try {
        dispatch({ type: POST_CREATE_REQUEST });
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.post(`/api/posts`, {}, config);
        dispatch({ type: POST_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: POST_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
