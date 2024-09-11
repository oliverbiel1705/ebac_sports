import { Produto as ProdutoType } from '../features/api/apiSlice'
import Produto from '../components/Produto'
import { useDispatch } from 'react-redux'
import { addItem } from '../features/cart/cartSlice'
import * as S from './styles'

type Props = {
  produtos: ProdutoType[]
  favoritos: ProdutoType[]
  favoritar: (produto: ProdutoType) => void
  adicionarAoCarrinho: (produto: ProdutoType) => void // Adicione esta linha
}

const ProdutosComponent = ({
  produtos,
  favoritos,
  favoritar,
  adicionarAoCarrinho
}: Props) => {
  const dispatch = useDispatch()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const adicionarAoCarrinhoRedux = (produto: ProdutoType) => {
    dispatch(addItem({ ...produto, quantity: produto.quantity || 1 }))
  }

  const produtoEstaNosFavoritos = (produto: ProdutoType) => {
    const produtoId = produto.id
    const IdsDosFavoritos = favoritos.map((f) => f.id)

    return IdsDosFavoritos.includes(produtoId)
  }

  return (
    <>
      <S.Produtos>
        {produtos.map((produto) => (
          <Produto
            estaNosFavoritos={produtoEstaNosFavoritos(produto)}
            key={produto.id}
            produto={produto}
            favoritar={favoritar}
            aoComprar={adicionarAoCarrinho} // Certifique-se de que esta propriedade está correta
          />
        ))}
      </S.Produtos>
    </>
  )
}

export default ProdutosComponent
