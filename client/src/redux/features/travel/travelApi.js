import { apiSlice } from '../api/apiSlice';

export const travelApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTravel: builder.mutation({
      query: (data) => ({
        url: 'create',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),
    getTravels: builder.query({
      query: () => ({
        url: 'get-travels',
        method: 'GET',
        credentials: 'include',
      }),
    }),
    getTravel: builder.query({
      query: () => ({
        url: 'get-travel',
        method: 'GET',
        credentials: 'include',
      }),
    }),
    getTravelBySearch: builder.query({
      query: (searchQuery) => ({
        url: `search?searchQuery=${searchQuery.search || 'none'}&tags=${
          searchQuery.tags
        }`,
        method: 'GET',
        credentials: 'include',
      }),
    }),
    deleteTravel: builder.mutation({
      query: (id) => ({
        url: `delete/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
    }),
    updateTravel: builder.mutation({
      query: ({ id, data }) => ({
        url: `update/${id}`,
        method: 'PUT',
        body: data,
        credentials: 'include',
      }),
    }),
    likeTravel: builder.mutation({
      query: (id) => ({
        url: `like/${id}`,
        method: 'PUT',
        credentials: 'include',
      }),
    }),
    getTravelsByCreator: builder.query({
      query: (name) => ({
        url: `creator?name=${name}`,
        method: 'GET',
        credentials: 'include',
      }),
    }),
  }),
});

export const {
  useCreateTravelMutation,
  useGetTravelsQuery,
  useGetTravelQuery,
  useGetTravelBySearchQuery,
  useDeleteTravelMutation,
  useGetTravelsByCreatorQuery,
  useUpdateTravelMutation,
  useLikeTravelMutation,
} = travelApi;
