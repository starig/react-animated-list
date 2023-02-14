import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PeopleDataState, PeopleItem, Status} from "./types";
import {fetchPeopleData} from "../../actions";


const initialState: PeopleDataState = {
    people: [],
    status: Status.LOADING,
    isFinished: false,
    page: 1,
    limit: 20
}

const peopleSlice = createSlice({
    name: 'people',
    initialState,
    reducers: {
        setStatus: (state, action: PayloadAction<Status>) => {
            state.status = action.payload;
        },
        increasePage: (state) => {
            state.page += 1;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPeopleData.fulfilled, (state, action: PayloadAction<PeopleItem[]>) => {
            state.status = Status.SUCCESS;
            if (action.payload.length === 0) {
                state.isFinished = true;
            }
            action.payload.map(item => state.people = [...state.people, item]);
        });
        builder.addCase(fetchPeopleData.pending, (state) => {
            state.status = Status.LOADING;
        });
        builder.addCase(fetchPeopleData.rejected, (state) => {
            state.status = Status.ERROR;
        })
    }
});

export const { setStatus, increasePage } = peopleSlice.actions;
export default peopleSlice.reducer;