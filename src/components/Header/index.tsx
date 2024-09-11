import React from 'react'
import { Container, Titulo, Carrinho } from './styles'
import cesta from '../../assets/cesta.png'
import { paraReal } from '../Produto'
import { Produto } from '../../features/api/apiSlice' // Atualize esta importação

type Props = {
  itensNoCarrinho: Produto[]
  favoritos: Produto[]
}

const Header = ({ itensNoCarrinho, favoritos }: Props) => {
  const valorTotal = itensNoCarrinho.reduce((acc, item) => {
    acc += item.preco * (item.quantity || 1)
    return acc
  }, 0)

  return (
    <Container>
      <Titulo>EBAC Sports</Titulo>
      <Carrinho>
        <span>{favoritos.length} favoritos</span>
        <img src={cesta} alt="Carrinho de compras" />
        <span>
          {itensNoCarrinho.length} itens, valor total: {paraReal(valorTotal)}
        </span>
      </Carrinho>
    </Container>
  )
}

export default Header
