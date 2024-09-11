import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Produto {
  id: number
  nome: string
  preco: number
  imagem: string
  quantity?: number
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fake-api-tau.vercel.app/api/'
  }),
  endpoints: (builder) => ({
    getProdutos: builder.query<Produto[], void>({
      query: () => 'ebac_sports'
    })
  })
})

export const { useGetProdutosQuery } = apiSlice
