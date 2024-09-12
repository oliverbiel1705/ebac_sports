# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
___
# Iniciando a aula:

## Criando o store
> Store é onde ficando guardados os dados da aplicação.

Crie a árvore de arquivos que serão ultilizados pelo redux:
```MARKDOWN
- store/
  - index.ts
>  é onde será concentrado todo os métodos (stores, action, reducers, selectors, etc)
  - reducers/
    - carrinho.ts
>    é onde estará os métodos individuais referentes ao carrinho, é chamado de slice
```
### Criando o RootReducer da store
No arquivo **index.ts**:
```TypeScript
import { configureStore } from '@reduxjs/toolkit'

import carrinhoReducer from './reducers/carrinho' //este slice é importado de outro arquivo (veja a baixo em 'Criando o slice')

export const store = configureStore({
  // a store precisa ser exportada, para ser acessada pelos seletores
  reducer: {                    // este é o reducer
    carrinho: carrinhoReducer,  // esta é a action do reducer
  }
})

export type RootReducer = ReturnType<typeof store.getState>
// exporta o RootReducer como o tipo, recebendo tipagem dinâmica do store, para ser usado nos seletores
```
### Criando o Slice
> O slice contém o reducer e suas actions

No arquivo **carrinho.ts**:

```TypeScript
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// createSlice transforma este slice em um reducer e uma action
// PayloadAction serve para tipar a action como um payload
import { Game } from '../../App'
// esta importação tipa o payload
// - payload é o dado que será carregado, sua tipagem é importante para auxiliar o desenvolvimento

type CarrinhoState = {
  itens: Game[]
}

const initialState: CarrinhoState = {
  itens: []
}

const carrinhoSlice = createSlice({
  name: 'carrinho',
  initialState,
  // Uma propriedade com o nome de uma variavel/constante, autmaticamente puxa o valor da variavel/constante
  reducers: {
    // nesta propriedade chamada reducers criamos as action e uma arrow function ligada a ela, a primeira action é adicionar
    adicionar: (state, action: PayloadAction<Game>) => {
      // a arrow function recebe o state e uma payload
      const jogo = action.payload
      if (state.itens.find((game) => game.id === jogo.id)) {
        alert('Item já no carrinho')
      } else {
        state.itens.push(jogo)
      }
    }
  }
})

export const { adicionar } = carrinhoSlice.actions
// exporta todas as actions
export default carrinhoSlice.reducer
// exporta o próprio reducer como padrão

```
### Criando os Seletores
> Seletores (useSelector) recuperam os dados da store.\
> Para disponibilizar o acesso aos seletores em qualquer parte da aplicação, o provedor (Provider) deve englobar a aplicação.

No arquivo **index.tsx** ou no retorno do **App.tsx**:

```TypeScript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'

import { Provider } from 'react-redux'
// importa o provider
import { store } from './store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
  // o provedor (Provider) recebe a store como parametro
root.render(
  <React.StrictMode>
    <Provider store={store}>  // << provedor
      <App />
    </Provider>
  </React.StrictMode>
)
```
No componente que precisa do dado da store (neste caso o **Header**):
```TypeScript
import { useSelector } from 'react-redux/'
// importe o seletor
import { RootReducer } from '../../store'
// importe a tipagem da store para tipar o state

...

const itens = useSelector((state: RootReducer) => state.carrinho.itens)
// acesse o dado que desejar e armazene em uma variável
```
### Despachando ações
> o useDispatch dispara as ações do reducer

No componente que realização a ação (neste caso o '**Produto**'):
```TypeScript
import { useDispatch } from 'react-redux'
import { adicionar } from '../../store/reducers/carrinho'
// importa a action

const Produto = ({ game }: Props) => {

  const dispatch = useDispatch()
  return (
    <>
      <BtnComprar
        onClick={function () {
          dispatch(adicionar(game))
          // chama o despacho ao clicar no botão passando a prop game como payload da action
        }}
        type="button"
      >
        Adicionar ao carrinho
      </BtnComprar>
    </>
  )

export default Produto

```
## Consumindo API com Redux
Substituindo o *fetchApi* do Javascript pelo *createApi* do Redux
### Criando o consumo da API
> crie uma pasta chamada *services* onde estará o serviço de consumo de API \
e um arquivo chamado *api.ts*

```TypeScript
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Game } from '../App'

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000'
    // endereço da API
  }),
  endpoints: (builder) => ({
    getJogos: builder.query<Game[], void>({ // tipa o retorno
      query: () => 'produtos'
      // indica a rota da API
    })
  })
})

export const { useGetJogosQuery } = api // useGetJogosQuery é um hook criando pelo toolkit que aponta para o endpoint getJogos
export default api
```

### Adicionando a API ao store
Voltando ao arquivo do store, o serviço será integrado aos reducers:
```TypeScript
import api from '../services/api'

export const store = configureStore({
  reducer: {
    carrinho: carrinhoReducer,
    [api.reducerPath]: api.reducer // "api.reducerPath" retorna uma lista com todos os endpoints criados na API, neste caso apenas getJogos e automaticamente já vincula ao reducer correto da API "api.reducer"
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
})
```

### Acessando os dados recebidos da API
No container que usará os dados retornados da API (neste caso '*Produtos*')
```JavaScript
import { useGetJogosQuery } from '../services/api'
// importamos o endpoint criando no serviço de consumo da API
import Produto from '../components/Produto'
import * as S from './styles'

const Produtos = () => {
  const { data: jogos, isLoading } = useGetJogosQuery()
  // recebemos data como jogos e o estado de carregando (isLoading: Bool)

  if (isLoading) {
    return <h2>Carregando...</h2>
  }

  return (
    <>
      <S.Produtos>
        {jogos?.map((game) => ( // esta interrogação ? funciona como um if, onde só será considerado caso exista um valor
          <Produto key={game.id} game={game} />
        ))}
      </S.Produtos>
    </>
  )
}

export default Produtos

```
