import { createSlice } from "@reduxjs/toolkit";
import qualityService from "../services/quality.service";

const qualitiesSlice = createSlice({
    name: "qualities",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFeatch: null
    },
    reducers: {
        qualitiesRequested: (state) => {
            state.isLoading = true;
        },
        qualitiesReceved: (state, action) => {
            state.entities = action.payload;
            state.lastFeatch = Date.now();
            state.isLoading = false;
        },
        qualitiesRequestedFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: qualitiesReducer, actions } = qualitiesSlice;
const { qualitiesRequested, qualitiesReceved, qualitiesRequestedFiled } =
    actions;

function isOutdated(date) {
    if (Date.now() - date > 10 * 60 * 1000) {
        return true;
    }
    return false;
}

export const loadQualitiesList = () => async (dispatсh, getState) => {
    const { lastFeatch } = getState().qualities;
    if (isOutdated(lastFeatch)) {
        console.log(lastFeatch);
        dispatсh(qualitiesRequested());
        try {
            const { content } = await qualityService.fetchAll();
            dispatсh(qualitiesReceved(content));
        } catch (error) {
            dispatсh(qualitiesRequestedFiled(error.message));
        }
    }
};

export const getQualities = () => (state) => state.qualities.entities;
export const getQualitiesLoadingStatus = () => (state) =>
    state.qualities.isLoading;
export const getQualitiesByIds = (qualitiesIds) => (state) => {
    if (state.qualities.entities) {
        const qualitiesArray = [];
        for (const qualId of qualitiesIds) {
            // console.log(qualId);
            // console.log(state.qualities.entities);
            for (const quality of state.qualities.entities) {
                if (quality._id === qualId) {
                    qualitiesArray.push(quality);
                    break;
                }
            }
        }
        return qualitiesArray;
    }
    return [];
};

export default qualitiesReducer;
