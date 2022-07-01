import React from 'react'
import { useQuery, gql, from } from "@apollo/client";

const GET_PRODUCTS = gql`
  query {
    category {
      products {
        gallery
        name
        brand
        description
        category
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        id
      }
    }
  }
`;

export const useProducts = () => {
    const { error, loading, data } = useQuery(GET_PRODUCTS);
  return {error, loading, data}
}
