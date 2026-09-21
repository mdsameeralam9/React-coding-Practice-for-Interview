import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todoApi = createApi({
  reducerPath: "todoApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),

  tagTypes: ["Todos"],

  endpoints: (builder) => ({
    // GET ALL TODOS
    getTodos: builder.query({
      query: () => "todos",
      providesTags: ["Todos"],
    }),

    // GET SINGLE TODO
    getTodo: builder.query({
      query: (id) => `todos/${id}`,
    }),

    // ADD TODO
    addTodo: builder.mutation({
      query: (todo) => ({
        url: "todos",
        method: "POST",
        body: todo,
      }),

      invalidatesTags: ["Todos"],
    }),

    // UPDATE TODO
    updateTodo: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `todos/${id}`,
        method: "PUT",
        body,
      }),

      invalidatesTags: ["Todos"],
    }),

    // DELETE TODO
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `todos/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useGetTodoQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApi;