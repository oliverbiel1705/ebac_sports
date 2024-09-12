//Slice do carrinho
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Produto } from '../../App'

type CarrinhoState = {
  itens: Produto[]
}

const initialState: CarrinhoState = {
  itens: []
}

const carrinhoSlice = createSlice({
  name: 'carrinho',
  initialState,
  reducers: {
    adicionar: (state, { payload }: PayloadAction<Produto>) => {
      if (state.itens.find((produto) => produto.id === payload.id)) {
        alert('Produto já adicionado...')
      } else {
        state.itens = [...state.itens, payload]
      }
    }
  }
})

export const { adicionar } = carrinhoSlice.actions
export default carrinhoSlice.reducer
