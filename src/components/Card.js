import React, { useEffect, useState } from 'react';
import Abi from '../abi.json'
import { useContractReads, useAccount, useBalance, useNetwork } from 'wagmi'
import { formatEther, parseEther } from '@ethersproject/units'
import { InputMax } from './InputMax';
import { Compound } from './Compound';
import { Pocket } from './Pocket';
import { Link, useParams } from 'react-router-dom';
import { CountUpTimer } from './CountUpTimer';
import ReferralLink from './ReferralLink';

export function Card() {

    const DATE_START = process.env.REACT_APP_DATE_START

    const { address, isConnected } = useAccount()
    const { ref } = useParams()
    const { chain } = useNetwork()

    const [value, setValue] = useState(0)
    const [walletBalance, setWalletBalance] = useState()
    const [tvl, setTVL] = useState(0.00)

    let balance = useBalance({
        address,
        watch: true,
    })

    useEffect(() => {
        setWalletBalance(balance.data)
    }, [balance])

    const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS

    const contractConfig = {
        address: CONTRACT_ADDRESS,
        abi: Abi,
    }


    const { data, isError, isLoading } = useContractReads({
        contracts: [
            {
                ...contractConfig,
                functionName: 'getBalance',
            },
            {
                ...contractConfig,
                functionName: 'uId',
            },
            {
                ...contractConfig,
                functionName: 'countBuy',
            },
            {
                ...contractConfig,
                functionName: 'getMyMiners',
                args: [address ?? '0x0000000000000000000000000000000000000000']
            },
            {
                ...contractConfig,
                functionName: 'eggsRewards',
                args: [address ?? '0x0000000000000000000000000000000000000000']
            },
            {
                ...contractConfig,
                functionName: 'marketEggs'
            },
            {
                ...contractConfig,
                functionName: 'calculateEggBuySimple',
                args: [parseEther('1')]
            }
        ],
        watch: true,
    })

    useEffect(() => {
        if (!isLoading && data[6] && Number(data[6]) > 0){
            setTVL(0.95 / (Number(data[6]) / 2592000) * Number(data[3]))
        }
    }, [data])

    let balanceContract = !isLoading && !isError && data[0] ? formatEther(String(data[0])) : 0
    balanceContract = (+balanceContract).toFixed(2)

    let myEggs = !isLoading && !isError && data[4] ? formatEther(String(data[4])) : 0
    myEggs = (+myEggs).toFixed(8)

    const minersCompound = !isLoading && !isError && data[0] ? Math.floor(((Number(data[6]) * myEggs) / 2592000)) : 0

    return (
        <div className='wrap_card'>
            <div className='wrap_dashboard'>
                <div className='wrap_count_up'>
                    <CountUpTimer startDate={Number(DATE_START)} />
                    <div className='body_card' style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems:"center"}}>
                            <div className='header_card'>
                                referral link
                            </div>
                    {isConnected ?
                        
                        !isLoading &&  <ReferralLink wallet={address} /> : <div style={{textAlign: "center"}}><small>the referral link will appear after connecting to the wallet</small></div>
                        
                    }
                    </div>
                </div>

                <div className='body_card'>
                    <div className='header_card'>
                        Pull information
                    </div>
                    <div className='content_card'>
                        {!isLoading &&
                            <>
                                {/* <CountUpTimer startDate={1670689637} /> */}
                                <div><span>Pull balance</span> <span>{balanceContract} POM</span></div>
                                <div><span>Users count</span> <span>{Number(data[1])}</span></div>
                                <div><span>Transaction count</span><span>{Number(data[2])}</span></div>
                                <div><Link to='/getstarted' className='button_main' >GET STARTED!</Link></div>
                            </>
                        }
                    </div>
                </div>
            </div>
            <div className='wrap_block_info h-100'>
                {chain?.unsupported ?
                    <div className='body_card'>
                        <div className='header_card' style={{ paddingBottom: '0', paddingTop: '10px' }}>
                            Change Network
                        </div>
                    </div>
                    :
                    !chain?.unsupported && isConnected && !isLoading ?
                        <>
                            <div className='body_card'>
                                <div className='header_card'>
                                    wallet information
                                </div>
                                <div className='content_card wrap_info_wallet'>
                                    <div><span>You balance</span> <span>{(Number(walletBalance?.formatted)).toFixed(2)} {walletBalance?.symbol}</span></div>
                                    <div><span>You miners</span> <span>{Number(data[3])}</span></div>
                                    <div><span>Your TVL</span> <span>{tvl.toFixed(2)}</span></div>
                                    <div><span>POM in Barrel</span> <span>{myEggs}</span></div>
                                </div>
                            </div>

                            <div className='body_card'>
                                <div className='header_card'>
                                    Your dashboard
                                </div>
                                <div className='content_card'>

                                    <InputMax
                                        value={value}
                                        maxValue={(Number(walletBalance?.formatted)).toFixed(2)}
                                        setValue={setValue}
                                        priceMiner={Number(data[6])}
                                        refWallet={ref} />
                                    <Compound
                                        miners={minersCompound}
                                        refWallet={ref}
                                    />
                                    <Pocket miners={Number(data[3])} />
                                </div>
                            </div>
                        </>
                        :
                        <div className='body_card'>
                            <div className='header_card' style={{ paddingBottom: '0', paddingTop: '10px' }}>
                                Connect wallet
                            </div>
                        </div>
                }
            </div>
        </div>
    );
};
