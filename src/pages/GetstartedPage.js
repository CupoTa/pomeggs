import React from 'react';
import { useNavigate } from 'react-router-dom'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

const GetstartedPage = () => {

    const navigate = useNavigate()

    const goBack = () => navigate(-1)

    return (
        <div className='wrap_main'>
            <div className='wrap_block_info getstarted'>
                <div className='body_card'>
                    <div className='header_card'>
                        STEP-BY-STEP GUIDE for POMminer.org
                    </div>
                    <p><button onClick={goBack} className='button_main' style={{width: 'auto', display: 'inline'}}>BACK</button></p>
                    <Accordion allowZeroExpanded>
                        <AccordionItem uuid="a">
                            <AccordionItemHeading>
                                <AccordionItemButton>
                                    CONNECT YOUR Proof Of Memes WALLET
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                <ul className="list">
                                    <li>● MetaMask to our platform.</li>
                                    <li>●  Add network Proof Of Memes your MetaMask
                                        <p>Network name: Proof Of Memes Mainnet</p>
                                        <p>New RPC URL: https://mainnet-rpc.memescan.io</p>
                                        <p>Chain ID: 18159</p>
                                        <p>Currency symbol: POM</p>
                                        <p>Block explorer URL: https://explorer.memescan.io</p>
                                        <img src='./assets/images/addnetwork.png' alt='add network POM' className='img-responsive' />
                                    </li>
                                </ul>
                            </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem uuid="b">
                            <AccordionItemHeading>
                                <AccordionItemButton>
                                    Buying a POM
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                <ul className="list">
                                    <li>● Buy a POM on <a href='https://www.mexc.com/exchange/POM_USDT' rel="noreferrer" target='_blank'>https://www.mexc.com/exchange/POM_USDT</a></li>
                                </ul>
                            </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem uuid="c">
                            <AccordionItemHeading>
                                <AccordionItemButton>
                                    HIRE MINERS
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                <ul className="list">
                                    <li>● Choose how much POM you want to invest.</li>
                                    <li>● Remember, your principal investment cannot be withdrawn. POM accumulated in your "Barrel" is what can be either "Compounded" or "Pocketed", 3% of your TVL daily.</li>
                                </ul>
                            </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem uuid="d">
                            <AccordionItemHeading>
                                <AccordionItemButton>
                                    REFERRALS
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                <ul className="list">
                                    <li>● Once your Proof Of Memes wallet is connected, your referral address appears at the bottom of the page.</li>
                                    <li>● When a new user hires miners after clicking your referral link, the contract will send a POM value equal to 10% instantly to your barrel.</li>
                                    <li>● Use your Social media and YouTube to earn with your referral link!</li>
                                </ul>
                            </AccordionItemPanel>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>

        </div>
    );
};

export default GetstartedPage;