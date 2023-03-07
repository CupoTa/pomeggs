import { useEffect, useState } from 'react'
import { useNetwork, useSwitchNetwork } from 'wagmi'
import { ConnectButton } from './ConnectButton'
import { toast } from 'react-toastify'
import { Modal } from './Modal'

export function NetworkSwitcher({ setActive }) {
    const { chain } = useNetwork()
    const { chains, error, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork()

    const [modalActive, setModalActive] = useState(false)

    useEffect(() => {
        !isLoading && setModalActive(isLoading)
    }, [isLoading])

    useEffect(() => {
        error && toast.error(error.message)
    }, [error])

    if (!chain) return <ConnectButton setActive={setActive} />

    return (
        <div>
            <div>
                {chain?.unsupported ? <button onClick={() => setModalActive(true)} className="wrongNetwork">Wrong Network</button> : <ConnectButton setActive={setActive} />}
            </div>

            {switchNetwork && (
                <Modal active={modalActive} setActive={setModalActive} >

                    {chains.map((x) =>
                        x.id === chain?.id ? null : (
                            <div key={x.id} className="wrap_switchNetwork">
                                <button className="connectWallet" onClick={() => switchNetwork(x.id)}>
                                    {`${x.name}  switch`}

                                </button>
                                <div className='wrap_spinner' style={{ height: '85px' }}>
                                    {isLoading && x.id === pendingChainId ? <div className="spinner"></div> : <p>To switch, press the button</p>}
                                </div>
                            </div>
                        ),
                    )}

                </Modal>
            )
            }
        </div>
    )
}
