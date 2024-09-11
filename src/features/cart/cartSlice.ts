import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Produto } from '../../features/api/apiSlice' // Importe o tipo Produto

interface CartState {
  items: Produto[] // Use o tipo Produto
}

const initialState: CartState = {
  items: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Produto>) => {
      const item = state.items.find((item) => item.id === action.payload.id)
      if (item) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        item.quantity! += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
    },
    removeItem: (state, action: PayloadAction<{ id: number }>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id)
    },
    clearCart: (state) => {
      state.items = []
    }
  }
})

export const { addItem, removeItem, clearCart } = cartSlice.actions

export const cartReducer = cartSlice.reducer
