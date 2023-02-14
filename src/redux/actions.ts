import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {PeopleItem, RequestArgs} from "./slices/people/types";
import {PROJECT_TOKEN} from "../helpers/constants";

export const fetchPeopleData = createAsyncThunk<PeopleItem[], RequestArgs>(
    'xray/fetchPeopleData',
    async (args) => {
        const {page, limit} = args;
        const response = await axios.get<PeopleItem[]>
        (`https://${PROJECT_TOKEN}.mockapi.io/people?page=${page}&limit=${limit}`);
        return response.data;
    }
)