import React from 'react';
import { Card } from '../components'
import Countdown, { zeroPad } from 'react-countdown'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf } from '@fortawesome/free-solid-svg-icons'

const DashboardPage = () => {

    const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS
    const DATE_START = process.env.REACT_APP_DATE_START

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a complete state
            return <Card />
        } else {
            // Render a countdown
            return (
                <div className='wrap_countdown'>
                    <div className='countdown'>
                        <h3 style={{ width: '100%', alignSelf: "stretch" }}>before mining starts</h3>
                        <p>
                            <span>
                                <span>{zeroPad(days)}</span>
                                <span>days</span>
                            </span>
                            <span>
                                <span>{zeroPad(hours)}</span>
                                <span>hours</span>
                            </span>
                            <span>
                                <span>{zeroPad(minutes)}</span>
                                <span>minutes</span>
                            </span>
                            <span>
                                <span>{zeroPad(seconds)}</span>
                                <span>seconds</span>
                            </span>
                        </p>
                        <Link to='/getstarted' className='button_main' >HOW TO GET STARTED!</Link>
                    </div>
                </div>
            );
        }
    };

    return (
        <>
            <div className='wrap_main'>
                <h3 className='title'>3% per day from your TVL</h3>
                <Countdown
                    date={Number(DATE_START)} //Number(DATE_START)
                    renderer={renderer}
                />

                <div className='wrap_block_info'>
                    <div className='wrap_count_up order-2'>
                        <div className='body_card order-1'>
                            <div className='header_card'>
                                Sustainability
                            </div>

                            <p>POM MINER is sustained by continued community support, just like every other crypto coin, token or project. The difference is, POM Miner also has an algorithm that doesn't allow others to instantly dump their coins on the community.</p>
                            <p>POM Miner also allows you to stabilize and increase your TVL by taking long-term advantage of its compound feature.</p>

                        </div>
                        <div className='body_card order-3'>
                            <div className='header_card'>
                                Verified & Audit Smart Contract
                            </div>

                            <p>The POM Miner contract is public, verified and audit can be viewed here on <a href="/assets/audit/final_audit_report.pdf" style={{color: "#fff"}} target="_blank" rel="noreferrer">PUBLIC AUDIT SMART CONTRACT</a></p>

                        </div>
                        <div className='body_card order-4'>
                            <div className='header_card'>
                            Links & Social Media
                            </div>

                            <p style={{display: 'flex', justifyContent: "center", color: "#fff"}}>
                                <a href="https://t.me/pom_miner" className='link_soc' target="_blank" rel="noreferrer"><img src="./assets/images/telegram.svg" className="mb-1 inline-block" alt="telegram" style={{height: '20px', width: 'auto'}}/> <span>Telegram</span></a>
                                <a href={`https://memescan.io/address/${CONTRACT_ADDRESS}`} className='link_soc' target="_blank" rel="noreferrer"><img src="./assets/images/POMScan.png" alt="POMScan" className="mb-1 inline-block" style={{height: '20px', width: 'auto'}}/> <span>POMScan</span></a>
                                <a href="/assets/audit/final_audit_report.pdf" className='link_soc' target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faFilePdf} style={{ marginRight: "5px", height: "20px" }} /> <span>Audit</span></a>
                            </p>

                        </div>
                    </div>


                    <div className='body_card order-1'>
                        <div className='header_card'>
                            Miner Info
                        </div>
                        <p>POM Miner is designed for individuals with a long-term vision. It is not for those who want instant profits that ultimately harm others. Miners can be viewed as internal tokens whose value rises and falls based on the combined actions of the community, just like any other coin or token that you may hold. But, unlike your average coins and tokens, POM Miner allows you to stabilize and increase your TVL by taking long-term advantage of its compound feature.</p>
                        <p><span>TVL is your current estimated "total value locked", an estimated value of your total miners</span>. Once miners are hired, they work for you indefinitely, therefore your TVL can not be withdrawn in one lump sum. When you hire miners , they fill your barrel with POM throughout the day with an <span>estimated daily total of 3% of your TVL</span>. You can pocket or compound the POM accumulated in your barrel at any time. Pocketing too often will ensure a decrease in TVL, which in turn will ensure a decrease in your daily payouts. The value of miners continuously increases and decreases throughout the day, therefore it is normal to see your personal TVL fluctuating as your barrel continues to fill.</p>
                    </div>

                </div>
            </div>
        </>
    )
};

export default DashboardPage;