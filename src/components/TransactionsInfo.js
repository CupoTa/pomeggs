import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useContractEvent, useAccount } from 'wagmi'
import Abi from '../abi.json'

export function TransactionsInfo() {

    const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS
    const { address } = useAccount()

    const [dataEventBuyEggs, setDataEventBuyEggs] = useState({
        buyer: null,
        referral: null,
        value: null,
        valueEggs: null,
        type: null
    })

    const shortAddress = (address) => {
        return `${address.slice(0, 5)}...${address.slice(-4)}`
    }

    useContractEvent({
        address: CONTRACT_ADDRESS,
        abi: Abi,
        eventName: 'BuyEggs',
        listener(buyer, referral, value, valueEggs) {
            if (String(buyer) !== String(address)) {
                setDataEventBuyEggs({
                    buyer,
                    referral,
                    value,
                    valueEggs,
                    type: 'buy'
                })
            }
        },
    })

    useContractEvent({
        address: CONTRACT_ADDRESS,
        abi: Abi,
        eventName: 'HatchEggs',
        listener(buyer, referral, value, valueEggs) {
            if (buyer !== address) {
                setDataEventBuyEggs({
                    buyer,
                    referral,
                    value,
                    valueEggs,
                    type: 'hatch'
                })
            }
        },
    })


    if (dataEventBuyEggs.type != null) {
        if (dataEventBuyEggs.type === 'buy')
            return toast.info(`User ${shortAddress(dataEventBuyEggs.buyer)} hire ${dataEventBuyEggs.valueEggs} miners`, {
                onClose: setDataEventBuyEggs({
                    ...dataEventBuyEggs,
                    type: null
                })
            })
        if (dataEventBuyEggs.type === 'hatch')
            return toast.info(`User ${shortAddress(dataEventBuyEggs.buyer)} compound ${dataEventBuyEggs.valueEggs} miners`, {
                onClose: setDataEventBuyEggs({
                    ...dataEventBuyEggs,
                    type: null
                })
            })
    }

    return <></>
};

