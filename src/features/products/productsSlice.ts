import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Product {
  id: number
  nome: string
  preco: number
  imagem: string
}

interface ProductsState {
  items: Product[]
}

const initialState: ProductsState = {
  items: []
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload
    }
  }
})

export const { setProducts } = productsSlice.actions

export const productsReducer = productsSlice.reducer
