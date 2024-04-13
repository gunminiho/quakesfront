import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    earthquakes: undefined,
    isLoading: true,
    quakesLoaded: false,
    frameCount: 0,
    settings: {
        magType: [],
        page: 1,
        per_page: 25
    }
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
            setEarthquakes: (state, action) => { // this works as a setter for the earthquakes state
                state.earthquakes = action.payload; // this is the new value for the earthquakes state
            },
            setFrameCount: (state, action) => {
                state.frameCount += action.payload;
            },
            setIsLoading: (state, action) => {
                state.isLoading = action.payload;
            },
            setQuakesLoaded: (state, action) => {
                state.quakesLoaded = action.payload;
            },
            setSettings: (state, action) => {
                const {magType,page,per_page} = action.payload;
                if(magType !== undefined || magType.length > 0){
                    state.settings.magType= magType;
                }
                if(page !== undefined && page > 0){
                    state.settings.page = page;
                }
                if(per_page !== undefined && per_page > 0){
                state.settings.per_page = per_page;
                }
            },
}
});

export const { setEarthquakes, setFrameCount, setIsLoading, setQuakesLoaded,setSettings } = userSlice.actions;
export default userSlice.reducer;