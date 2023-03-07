import React, { useState, useEffect } from 'react'
import Abi from '../abi.json'
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction, useAccount } from 'wagmi'
import { parseEther } from '@ethersproject/units'
import { isAddress } from '@ethersproject/address'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotate } from '@fortawesome/free-solid-svg-icons'

export function InputMax({ value, maxValue, setValue, priceMiner, refWallet }) {

    const [loading, setLoading] = useState(false)
    const { address } = useAccount()
    const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS

    const buyEggs = usePrepareContractWrite({
        address: CONTRACT_ADDRESS,
        abi: Abi,
        functionName: 'buyEggs',
        args: [isAddress(refWallet) ? refWallet : address],
        cacheTime: 2_000,
        overrides: {
            value: parseEther(String(value)),
            gasLimit: 300000,
            gasPrice: 1000000000
        },
    })

    const { data, write, isError } = useContractWrite(buyEggs.config)

    const miners = Math.floor(((priceMiner * value) / 2592000) * 0.95)

    useWaitForTransaction({
        hash: data?.hash,
        confirmations: 1,
        onSuccess(data) {
            setLoading(false)
            setValue(0)
            toast.success(`Transaction confirmed`, {

            })
        },
        onError(error) {
            setLoading(false)
            toast.error(`Transaction failed`)
        }
    })

    useEffect(() => {
        isError && setLoading(false)
    }, [isError])


    const ethHandler = (e) => {
        setValue(e.target.value === '' || e.target.value <= 0 ? 0 : e.target.value)
    }

    const submit = () => {
        write()
        setLoading(true)
    }

    return (
        <div>
            <button
                className='button_main'
                type="button"
                onClick={submit}
                disabled={loading || value === 0 ? true : false}
            >
                {loading &&
                    <FontAwesomeIcon icon={faRotate} style={{ marginRight: "5px" }} />
                }
                {
                    loading ? `HIRING MINERS...` :

                        value === 0 && !loading ? `HIRE MINERS` : `HIRE ${miners.toLocaleString()} MINERS`}
            </button>
            <div style={{ display: 'flex', padding: "0 10px", alignItems: 'center' }}>with</div>
            <div className='wrap_input'>
                <div className='btn_max' onClick={() => setValue(maxValue - 0.01)}>max</div>
                <input
                    type="number"
                    placeholder='0'
                    style={{ textAlign: 'right', width: '80px' }}
                    max={maxValue} value={value}
                    onChange={(e) => ethHandler(e)} />
            </div>
        </div>

    );
};

