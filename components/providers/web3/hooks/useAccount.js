import { useEffect} from "react"
import useSWR from "swr"

const adminAddresses = {
    "0x7408a8f28b6e239f3312285901ae23f0ed47cca73ae8c398ff6cd5a56f019c94" :true
}

export const handler = (web3,provider) =>() => {

    const {data,mutate,...rest} = useSWR(() => 
        web3 ? "web3/accounts" : null,
        async () => {
            const accounts  = await web3.eth.getAccounts()
            const account = accounts[0]

            if (!account) {
              throw new Error("Cannot retreive an account. Please refresh the browser(useAccountHook).")
            }
      
            return account            
        }
    )

    useEffect(()=>{
        const mutator = (accounts) => mutate(accounts[0] ?? null)
        provider?.on("accountsChanged",mutator)
        return ()=>{
            provider?.removeListener("accountsChanged",mutator)
        }
    },[provider])
    return {
        data,
        isAdmin : (data && adminAddresses[web3.utils.keccak256(data)]) ?? false,
        mutate,
        ...rest
    }

}