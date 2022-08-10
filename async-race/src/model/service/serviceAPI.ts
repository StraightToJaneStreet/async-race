import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Car } from '../../core/Car';

interface FetchCarsResponse {
  total: number;
  cars: Car[];
}

export interface CarCreationParams {
  name: string;
  color: string;
}

export interface CarDeletingParams {
  id: number;
}

interface CarIdResponse {
  id: number;
}

interface PaginationParams {
  page: number;
  itemsPerPage: number;
}

export const serviceAPI = createApi({
  reducerPath: 'serviceAPI',
  tagTypes: ['Car', 'Winner'],

  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000'
  }),

  endpoints: (build) => ({
    readCarsForPage: build.query<FetchCarsResponse, PaginationParams>({
      providesTags: ['Car'],
      transformResponse: (cars, meta) => {
        const resp = {
          total: +(meta?.response?.headers.get('X-Total-Count') ?? 0),
          cars: cars as Car[]
        }
        return resp
      },
      query: ({ page, itemsPerPage }) => ({
        url: 'garage',
        method: 'GET',
        params: {
          _page: page,
          _limit: itemsPerPage,
        },
      }),

    }),

    createCar: build.mutation<CarIdResponse, CarCreationParams>({
      invalidatesTags: ['Car'],
      query: (params) => ({
        url: 'garage',
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(params)        
      })
    }),

    deleteCar: build.mutation<void, CarDeletingParams>({
      invalidatesTags: ['Car'],
      query: ({ id }) => ({
        url: `garage/${id}`,
        method: 'DELETE',
      })
    })
  })
});

export default serviceAPI;