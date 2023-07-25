import { useReducer } from 'react'
import ProductContext from './Context'
import reducer, { initialState } from './reducer'


const ProductProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <ProductContext.Provider value={{ state, dispatch }}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductProvider