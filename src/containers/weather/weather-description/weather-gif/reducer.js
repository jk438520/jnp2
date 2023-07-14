import {createSlice} from '@reduxjs/toolkit';
import {RESOURCE_STATUS as RECOURCE_STATUS} from "../../const";

export const IMAGE = 'image';
const SET_IMAGE = 'setImage';
export const IMAGE_ACTION_SET_IMAGE = `${IMAGE}/${SET_IMAGE}`;
const CLEAR_IMAGE = 'clearImage';
export const IMAGE_ACTION_CLEAR_IMAGE = `${IMAGE}/${CLEAR_IMAGE}`;
const SET_STATUS = 'setStatus';
export const IMAGE_ACTION_SET_STATUS = `${IMAGE}/${SET_STATUS}`;

const imageSlice = createSlice({
        name: IMAGE,
        initialState: {
            image: null,
            status: RECOURCE_STATUS.NONE,
        },
        reducers: {
            [SET_IMAGE]: (state, action) => {
                state.image = action.payload.image;
                state.status = RECOURCE_STATUS.READY;
            },
            [CLEAR_IMAGE]: (state) => {
                state.image = null;
                state.status = RECOURCE_STATUS.NONE;
            },
            [SET_STATUS]: (state, action) => {
                state.status = action.payload.status;
                if(state.status === RECOURCE_STATUS.NONE || state.status === RECOURCE_STATUS.LOADING)
                    state.image = null;
            }
        }
    }
)

export const {setImage, clearImage, setStatus} = imageSlice.actions;
export default imageSlice.reducer;