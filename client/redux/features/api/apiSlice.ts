import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";


export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
    }),

    endpoints: (builder) => ({
        refreshToken: builder.query({
            query: (data) => ({
                url:"refresh",
                method:"GET",
                credentials:"include" as const,
            }),
        }),
        loadUser: builder.query({
            query: (data) =>({
                url:"me",
                method:"GET",
                credentials:"include" as const,
            }),

            async onQueryStarted(arg, {queryFulfilled, dispatch}) {
                try {
                    const result = await queryFulfilled;
                    dispatch (
                        userrLoggedIn({
                            accessToken: result.data.accessToken,
                            user: result.data.user,
                        })
                    );
                    
                } catch (error: any) {
                    console.log(error);
                }
            },
        })
    }),
});

export const {useRefreshTokenQuery} = apiSlice;