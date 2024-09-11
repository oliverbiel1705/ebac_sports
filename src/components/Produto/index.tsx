import { Produto as ProdutoType } from '../../features/api/apiSlice'
import { useDispatch } from 'react-redux'
import { addItem } from '../../features/cart/cartSlice'
import * as S from './styles'

type Props = {
  produto: ProdutoType
  favoritar: (produto: ProdutoType) => void
  estaNosFavoritos: boolean
  aoComprar: (produto: ProdutoType) => void // Adicione esta linha
}

export const paraReal = (valor: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    valor
  )

const ProdutoComponent = ({
  produto,
  favoritar,
  estaNosFavoritos,
  aoComprar
}: Props) => {
  const dispatch = useDispatch()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleAddToCart = (produto: ProdutoType) => {
    dispatch(addItem({ ...produto, quantity: produto.quantity || 1 }))
  }

  return (
    <S.Produto>
      <S.Capa>
        <img src={produto.imagem} alt={produto.nome} />
      </S.Capa>
      <S.Titulo>{produto.nome}</S.Titulo>
      <S.Prices>
        <strong>{paraReal(produto.preco)}</strong>
      </S.Prices>
      <S.BtnComprar onClick={() => favoritar(produto)} type="button">
        {estaNosFavoritos
          ? '- Remover dos favoritos'
          : '+ Adicionar aos favoritos'}
      </S.BtnComprar>
      <S.BtnComprar onClick={() => aoComprar(produto)} type="button">
        {' '}
        {/* Use a propriedade aoComprar */}
        Adicionar ao carrinho
      </S.BtnComprar>
    </S.Produto>
  )
}

export default ProdutoComponent
