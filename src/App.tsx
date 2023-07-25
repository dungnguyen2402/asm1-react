import { useContext, useEffect } from 'react'
import './App.css'
import intance from './axios/intance'
import ProductContext from './store/Context'

function App() {
  const { state, dispatch } = useContext(ProductContext);

  useEffect(() => {
    getAllProducts()
  }, [])

  const getAllProducts = async () => {
    dispatch({
      type: "loading_complete",
    })
    try {
      const { data } = await intance.get(`/products`)
      dispatch({ type: "fetch/product", payload: data });
    } catch (error) {

    }
    dispatch({
      type: "loading_disabled",
    })
  }

  console.log(state.products.data);

  const addProduct = async (product: any) => {
    dispatch({
      type: "loading_complete",
    })
    try {
      const { data } = await intance.post(`/products`, product)
      console.log(data);

      dispatch({ type: "add_product", payload: data })
    } catch (error: any) { }
    dispatch({
      type: "loading_disabled",
    })
  }

  const removeProduct = async (id: any) => {
    dispatch({
      type: "loading_complete",
    })
    try {
      await intance.delete(`/products/${id}`)
      dispatch({ type: "delete_product", payload: id })
    } catch (error: any) {

    }
    dispatch({
      type: "loading_disabled",
    })
  }

  const updateProduct = async (product: any) => {
    dispatch({
      type: "loading_complete",
    })
    try {
      const { data } = await intance.put(`/products/${product.id}`, product)
      dispatch({ type: "update_product", payload: data })
    } catch (error) {

    }
    dispatch({
      type: "loading_disabled",
    })
  }

  return (
    <div>
      <h2>List sản phẩm</h2>
      {state.loading && "Loading..."}
      <div>
        <ul>
          {state?.products?.map((item: any) => {
            return (
              <li style={{ display: 'flex', border: "1px solid", justifyContent: 'space-between' }}>
                <p key={item.id}>{item.name}</p>
                <span onClick={() => removeProduct(item.id)} style={{ cursor: "pointer", fontSize: "40px" }}>&times;</span>
              </li>
            )
          })}

        </ul>
      </div>
      <button onClick={() => addProduct({ name: "Product C" })}>Add product</button>
      <button onClick={() => updateProduct({ id: 1, name: "Product A update" })}>Update product</button>

    </div>
  )
}

export default App
