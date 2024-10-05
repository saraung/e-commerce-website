import { apiSlice } from "./apiSlice";
import { CATEGORY_URL } from "../constants";


export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      createCategory: builder.mutation({
        query: (data) => ({
          url: `${CATEGORY_URL}`,
          method: "POST",
          body: data,
        }),
        transformResponse: (response) => response.data, 
      }),
      updateCategory: builder.mutation({
        query: ({ categoryId, updatedCategory }) => ({
          url: `${CATEGORY_URL}/${categoryId}`, // Ensure categoryId is a string
          method: "PUT",
          body: updatedCategory,
        }),
        transformResponse: (response) => response.data,
      }),
      
      deleteCategory: builder.mutation({
        query: (id) => ({
          url: `${CATEGORY_URL}/${id}`,
          method: "DELETE",
        }),
        transformResponse: (response) => response.data,
      }),
      fetchCategories:builder.query({
            query:()=>`${CATEGORY_URL}/categories`,
      })
    }),
})

export const {useUpdateCategoryMutation,useDeleteCategoryMutation,useFetchCategoriesQuery,useCreateCategoryMutation}=categoryApiSlice

