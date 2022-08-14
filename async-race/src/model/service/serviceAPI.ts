import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Car } from '../../core/Car';
import { IWinner } from '../../core/IWinner';
import { OrderingType } from '../feature/winnersPage';

interface EntitySubsetWithTotal<T> {
  total: number;
  items: T[];
}

export interface CarCreatingParams {
  name: string;
  color: string;
}

export interface CarDeletingParams {
  id: number;
}

export interface CarReadParams {
  id: number;
}

export interface CarUpdatingParams {
  id: number;
  color: string;
  name: string;
}

export interface WinnerCreationParams {
  id: number;
  time: number;
  wins: number;
}

export interface WinnerUpdateParams {
  id: number;
  time: number;
  wins: number;
}

interface CarIdResponse {
  id: number;
}

interface PaginationParams {
  page: number;
  itemsPerPage: number;
}

interface OrderingParams<TargetType> {
  field: keyof TargetType;
  order: OrderingType;
}

export const serviceAPI = createApi({
  reducerPath: 'serviceAPI',
  tagTypes: ['Car', 'Winner'],

  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
  }),

  endpoints: (build) => ({
    readCar: build.query<Car, CarReadParams>({
      providesTags: ['Car'],
      query: ({ id }) => ({
        url: `garage/${id}`,
        method: 'GET',
      }),
    }),

    readCarsForPage: build.query<EntitySubsetWithTotal<Car>, PaginationParams>({
      providesTags: ['Car'],
      transformResponse: (cars, meta) => {
        const resp = {
          total: +(meta?.response?.headers.get('X-Total-Count') ?? 0),
          items: cars as Car[],
        };
        return resp;
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

    createCar: build.mutation<CarIdResponse, CarCreatingParams>({
      invalidatesTags: ['Car'],
      query: (params) => ({
        url: 'garage',
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(params),
      }),
    }),

    deleteCar: build.mutation<void, CarDeletingParams>({
      invalidatesTags: ['Car'],
      query: ({ id }) => ({
        url: `garage/${id}`,
        method: 'DELETE',
      }),
    }),

    updateCar: build.mutation<Car, CarUpdatingParams>({
      invalidatesTags: ['Car'],
      query: ({ id, ...rest }) => ({
        url: `garage/${id}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rest),
      }),
    }),

    readWinner: build.query<IWinner, number>({
      query: (id) => ({
        url: `winners/${id}`,
        method: 'GET',
      }),
    }),

    readWinners: build.query<IWinner[], void>({
      query: () => ({
        url: 'winners',
        method: 'GET',
      }),
    }),

    readWinnersForPage: build.query<EntitySubsetWithTotal<IWinner>, PaginationParams & OrderingParams<IWinner>>({
      providesTags: ['Winner'],
      transformResponse: (winners, meta) => {
        const resp = {
          total: +(meta?.response?.headers.get('X-Total-Count') ?? 0),
          items: winners as IWinner[],
        };
        return resp;
      },
      query: ({ page, itemsPerPage, field, order }) => ({
        url: 'winners',
        method: 'GET',
        params: {
          _page: page,
          _limit: itemsPerPage,
          _sort: field,
          _order: order,
        },
      }),
    }),

    createWinner: build.mutation<IWinner, WinnerCreationParams>({
      invalidatesTags: ['Winner'],
      query: (params) => ({
        url: 'winners',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      }),
    }),

    deleteWinner: build.mutation<void, number>({
      invalidatesTags: ['Winner'],
      query: (id) => ({
        url: `winners/${id}`,
        method: 'DELETE',
      }),
    }),

    updateWinner: build.mutation<IWinner, WinnerUpdateParams>({
      invalidatesTags: ['Winner'],
      query: ({ id, ...rest }) => ({
        url: `winners/${id}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rest),
      }),
    }),
  }),
});

export default serviceAPI;
