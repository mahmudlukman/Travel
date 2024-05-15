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
      query: (page) => ({
        url: 'get-travels',
        method: 'GET',
        credentials: 'include',
        params: { page },
      }),
    }),
    getTravel: builder.query({
      query: (id) => ({
        url: `get-travel/${id}`,
        method: 'GET',
        credentials: 'include',
      }),
    }),
    getTravelBySearch: builder.query({
      query: (searchQuery) => ({
        url: `search?searchQuery=${searchQuery?.search || 'none'}&tags=${
          searchQuery?.tags
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
    commentTravel: builder.mutation({
      query: ({value, id}) => ({
        url: `comment/${id}`,
        method: 'POST',
        body: value,
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
  useCommentTravelMutation,
} = travelApi;
