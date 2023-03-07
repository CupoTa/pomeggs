import React, { useEffect, useState } from 'react';
import Abi from '../abi.json'
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction, useAccount } from 'wagmi'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotate } from '@fortawesome/free-solid-svg-icons'
import { isAddress } from '@ethersproject/address';



export function Compound({miners, refWallet}) {

const {address} = useAccount()

    const [loading, setLoading] = useState(false)
 
    const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS

    const hatchEggs = usePrepareContractWrite({
        address: CONTRACT_ADDRESS,
        abi: Abi,
        functionName: 'hatchEggs',
        args: [isAddress(refWallet) ? refWallet : address]
    })
    const { data, write, isError } = useContractWrite(hatchEggs.config)

    useWaitForTransaction({
        hash: data?.hash,
        confirmations: 1,
        onSuccess: () => {
            setLoading(false)
            toast.success(`Transaction confirmed`)
        },
        onError: () => {
            setLoading(false)
            toast.error(`Transaction failed`)
        }
    })

    useEffect(() => {
        isError && setLoading(false)
    }, [isError])


    const submit = () => {
        write()
        setLoading(true)
    }

    // const test = useTransaction({
    //     hash: '0xd896b1403b76a1591d121e5de58425d16a01c120221857915fa4f8b30acc211f',
    // })
    // const provider = getProvider()




    // useEffect(() => {
    //     async function getTest() {
    //         if (!test.isLoading) {
    //             const t = await provider.getBlock(test.data?.blockNumber)
    //             console.log('date start', t.timestamp)
    //         }
    //     }
    //     getTest()
    // }, [test.data?.blockNumber])

    return (
        <div>
            <button className='button_main' type="button"
                onClick={submit} disabled={loading || !miners}>
                {loading &&
                    <FontAwesomeIcon icon={faRotate} style={{ marginRight: "5px" }} />
                }
                {!loading ? `COMPOUND ${miners} MINERS` : `COMPOUNDING...`}
            </button>
        </div>
    );
};
