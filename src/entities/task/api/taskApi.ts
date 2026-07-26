import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { TaskListResponse } from "./types";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  tagTypes: ["Tasks"],
  endpoints: (build) => ({
    getTaskList: build.query<TaskListResponse, void>({
      query: () => `todos`,
      providesTags: ["Tasks"],
      transformResponse: (response: TaskListResponse) => response,
    }),
  }),
});

export const { useGetTaskListQuery } = taskApi;
