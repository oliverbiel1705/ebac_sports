import styled from 'styled-components'
import { cores } from '../../styles'

export const Container = styled.header`
  background-image: linear-gradient(
    45deg,
    ${cores.corPrincipal},
    ${cores.corSecundaria}
  );
  margin: 80px 0;
  padding: 16px 24px;
  display: flex;
  border-radius: 6px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;

    div {
      margin-top: 16px;
    }
  }
`

export const Titulo = styled.h1`
  font-size: 18px;
  flex: 1;
  font-style: italic;
  color: ${cores.corFundo};
`

export const Carrinho = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 18px;
    margin-right: 8px;
    margin-left: 16px;
  }

  span {
    color: ${cores.corFundo};
  }
`
