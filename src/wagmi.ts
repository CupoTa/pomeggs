import { configureChains, createClient, Chain } from 'wagmi'

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

import { publicProvider } from 'wagmi/providers/public'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

const pomChainTestnet: Chain = {
    id: 54857 ,
    name: 'POM Chain Testnet',
    network: 'pom',
    nativeCurrency: {
      decimals: 18,
      name: 'Proof of memes',
      symbol: 'POM',
    },
    rpcUrls: {
      default: 'https://testnet-rpc.memescan.io/',
    },
    blockExplorers: {
      default: { name: 'POMScan Testnet', url: 'https://testnet-explorer.memescan.io/' },
    },
    testnet: true,
  }

  const pomChain: Chain = {
    id: 801921 ,
    name: 'POM Mainnet',
    network: 'POM Mainnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Proof Of Memes',
      symbol: 'POM',
    },
    rpcUrls: {
      default: 'https://mainnet-rpc.pomchain.io',
    },
    blockExplorers: {
      default: { name: 'POMScan', url: 'https://memescan.io/' },
    },
    testnet: false,
  }

const { chains, provider, webSocketProvider } = configureChains([pomChain], [
  publicProvider(),
  jsonRpcProvider({
    rpc: (chain) => {
        if (chain.id !== pomChain.id) return null
        return { http: chain.rpcUrls.default }
    }
})
])

export const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
})
