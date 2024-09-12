//Slice dos favoritos
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Produto } from '../../App'

type FavoritosSlice = {
  itens: Produto[]
}

const initialState: FavoritosSlice = {
  itens: []
}

const favoritosSlice = createSlice({
  name: 'favoritos',
  initialState,
  reducers: {
    toggleFavoritar: (state, action: PayloadAction<Produto>) => {
      const n_produto = action.payload
      if (state.itens.find((produto) => produto.id === n_produto.id)) {
        state.itens = state.itens.filter((item) => {
          if (item.id != n_produto.id) {
            return item
          }
        })
      } else {
        state.itens = [...state.itens, n_produto]
      }
    }
  }
})

export const { toggleFavoritar } = favoritosSlice.actions
export default favoritosSlice.reducer
