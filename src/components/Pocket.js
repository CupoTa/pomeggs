import React, { useEffect, useState } from 'react';
import Abi from '../abi.json'
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotate } from '@fortawesome/free-solid-svg-icons'

export function Pocket({miners}) {

    const [loading, setLoading] = useState(false)

    const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS

    const sellEggs = usePrepareContractWrite({
        address: CONTRACT_ADDRESS,
        abi: Abi,
        functionName: 'sellEggs',
    })
    const { data, write, isError } = useContractWrite(sellEggs.config)

    useWaitForTransaction({
        hash: data?.hash,
        confirmations: 1,
        onSuccess(data) {
            setLoading(false)
            toast.success(`Transaction confirmed`)
        },
        onError(error) {
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

    return (
        <div>
            <button className='button_main' type="button" onClick={submit} disabled={loading || !miners}>
                {loading &&
                    <FontAwesomeIcon icon={faRotate} style={{ marginRight: "5px" }} />
                }
                {!loading ? `POCKET YOUR POM` : `POCKETING...`}
            </button>
        </div>
    );
};
