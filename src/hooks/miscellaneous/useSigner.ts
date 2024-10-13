import { useAppSelector } from "@/redux"
import { chainKeyToChain, parseNetwork, signer } from "@/services"
import { Chain, SignAndSendSigner, Network } from "@wormhole-foundation/sdk"

export const useSigner = <N extends Network, C extends Chain>(
    chainKey: string
): SignAndSendSigner<N, C> | undefined => {
    const network = useAppSelector((state) => state.blockchainReducer.network)

    const baseAccounts = useAppSelector(state => state.authReducer.baseAccounts)
    const activePrivateKey = baseAccounts[chainKey]?.activePrivateKey

    if (!activePrivateKey) return
    const accountAddress = baseAccounts[chainKey].accounts[activePrivateKey].accountAddress

    const chain = chainKeyToChain(chainKey)
    return signer({
        chain,
        network: parseNetwork(network),
        privateKey: activePrivateKey,
        address: accountAddress,
        debug: true,
    }) as unknown as SignAndSendSigner<N, C>
}
