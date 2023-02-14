import {Writable} from "stream";

export type PeopleItem = {
    name: string,
    surname: string,
    id: string
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

export type PeopleDataState = {
    people: PeopleItem[],
    status: Status,
    isFinished: boolean,
    page: number,
    limit: number
}

export type RequestArgs = {
    page: number,
    limit: number
}