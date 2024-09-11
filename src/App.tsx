import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store/store'
import Header from './components/Header'
import Produtos from './containers/Produtos'
import { setProducts } from './features/products/productsSlice'
import { addItem } from './features/cart/cartSlice'
import { GlobalStyle } from './styles'
import { useGetProdutosQuery, Produto } from './features/api/apiSlice'

function App() {
  const dispatch = useDispatch()
  const { data: produtos = [], isFetching } = useGetProdutosQuery()
  const carrinho = useSelector((state: RootState) => state.cart.items)
  const [favoritos, setFavoritos] = useState<Produto[]>([])

  useEffect(() => {
    if (!isFetching && produtos.length > 0) {
      const produtosComQuantidade = produtos.map((produto) => ({
        ...produto,
        quantity: 1 // Inicialize a quantidade como 1
      }))
      dispatch(setProducts(produtosComQuantidade))
    }
  }, [dispatch, isFetching, produtos])

  function adicionarAoCarrinho(produto: Produto) {
    if (carrinho.find((p) => p.id === produto.id)) {
      alert('Item já adicionado')
    } else {
      dispatch(addItem({ ...produto, quantity: 1 }))
    }
  }

  function favoritar(produto: Produto) {
    if (favoritos.find((p) => p.id === produto.id)) {
      const favoritosSemProduto = favoritos.filter((p) => p.id !== produto.id)
      setFavoritos(favoritosSemProduto)
    } else {
      setFavoritos([...favoritos, produto])
    }
  }

  return (
    <>
      <GlobalStyle />
      <div className="container">
        <Header itensNoCarrinho={carrinho} favoritos={favoritos} />
        <Produtos
          produtos={produtos}
          favoritos={favoritos}
          favoritar={favoritar}
          adicionarAoCarrinho={adicionarAoCarrinho}
        />
      </div>
    </>
  )
}

export default App
