import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    earthquakes: undefined,
    loadedQuakes: undefined,
    isLoading: true,
    quakesLoaded: false,
    frameCount: 0,
    settings: {
        magType: [],
        page: 1,
        per_page: 25
    },
    Pagination: {
        itemsPerPage: 25,
        currentPage: 1,
        totalPages: 1
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
                //alert(magType);
                if(magType !== undefined && Array.isArray(magType)){
                    if(magType.length === 0)
                        state.settings.magType = [];
                    else
                    state.settings.magType= magType;
                }
                if(page !== undefined && page !== null && !isNaN(page)){
                    state.settings.page = page === "" ? "" : Number(page);
                }
                if(per_page !== undefined && per_page !== null && !isNaN(per_page)){
                state.settings.per_page = per_page === "" ? "" : Number(per_page);
                }
            },
            resetFrameCount: (state) => {
                state.frameCount = 0;
            },
            setCurrentPage: (state, action) => {
                state.Pagination.currentPage = action.payload;
            },
            setLoadedQuakes: (state, action) => {
                state.loadedQuakes = action.payload;
            },
            setTotalPages: (state, action) => {
                state.Pagination.totalPages = action.payload;
            },
            setItemsPerPage: (state, action) => {
                state.Pagination.itemsPerPage = action.payload;
            }
}
});

export const { setEarthquakes, setFrameCount, setIsLoading, setQuakesLoaded,setSettings,resetFrameCount, setCurrentPage,setLoadedQuakes,setTotalPages, setItemsPerPage } = userSlice.actions;
export default userSlice.reducer;