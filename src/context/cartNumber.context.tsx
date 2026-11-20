"use client"
import { getCartProduct } from "@/services/cartAction/getProductCart";
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";

type cartContextType = {
    cartNumber:number,
    setCartNumber:Dispatch<SetStateAction<number>>
}

export const cartContext = createContext<cartContextType>({
    cartNumber: 0,
    setCartNumber: () => undefined,
});

export function CartContextProvider({ children }: { children: ReactNode }) {

    const [cartNumber, setCartNumber] = useState(0);

    async function getCartData(){
        const response = await getCartProduct()
        if(response.status == 'success'){
            setCartNumber(response.numOfCartItems)
        }else{}
    }

    useEffect(()=>{
        getCartData()
    },[])

    return (
        <cartContext.Provider value={{ cartNumber, setCartNumber }}>
            {children}
        </cartContext.Provider>
    );
}