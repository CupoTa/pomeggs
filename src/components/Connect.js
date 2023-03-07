import { useEffect } from 'react'
import { useAccount, useConnect } from 'wagmi'
import { toast } from 'react-toastify'

export function Connect({ setActive }) {
    const { connector } = useAccount()
    const { connect, connectors, error, isLoading, pendingConnector } = useConnect()


    const openConnect = (x) => {
        setActive(false)
        connect({ connector: x })
    }

    const dataConnectors = [{
        id: 'metaMask',
        logo: '/assets/images/metaMask.svg',
        name: 'MetaMask'
    },
    {
        id: 'walletConnect',
        logo: '/assets/images/walletConnect.svg',
        name: 'Wallet Connect'
    },
    {
        id: 'injected',
        logo: '/assets/images/trustWallet.svg',
        name: 'Injected'
    },
    {
        id: 'coinbaseWallet',
        logo: '/assets/images/coinbase.svg',
        name: 'Coinbase Wallet'
    }]

    useEffect(() => {
        error && toast.error(error.message)
    }, [error])

    return (

        <div className='wrapBtnConnectors'>
            {connectors
                .filter((x) => x.ready && x.id !== connector?.id)
                .map((x) => (
                    <button key={x.id} onClick={() => openConnect(x)} className="btnConnectors">
                        {dataConnectors.map((data, key) => (
                            data.id === x.id &&
                            <span key={key} >
                                <img src={data.logo} alt={data.name} />
                                <p>{data.name}</p>
                            </span>

                        ))}
                        {isLoading && x.id === pendingConnector?.id && ' (connecting)'}
                    </button>
                ))}
        </div>
    )
}
