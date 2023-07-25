import { produce } from "immer"

const initialState = {
    products: [],
    loading: false,
} as { products: any[]; loading: boolean }


const reducer = (state = initialState, action: any) => {
    return produce(state, (draftState) => {
        switch (action.type) {
            //LOADING
            case "loading_complete":
                draftState.loading = true;
                break;
            case "loading_disabled":
                draftState.loading = false;
                break;
            //CRUD
            case "fetch/product":
                draftState.products = action.payload
                return;
            case "add_product":
                draftState.products.push(action.payload)
                break;
            case "delete_product":
                draftState.products = draftState.products.filter((item: any) => item.id !== action.payload)
                break;
            case "update_product":
                draftState.products = draftState.products.map((item: any) => item.id == action.payload.id ? action.payload : item)
                break;
            default:
                return state;
        }
    })


}


export { initialState }
export default reducer