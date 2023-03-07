import React, { useState } from 'react';
import { Outlet } from 'react-router-dom'
import { Connect, Modal, TransactionsInfo, NetworkSwitcher } from '../components'


const Layout = () => {

    const [modalActive, setModalActive] = useState(false)

    return (
        <>
            <div className='bg'></div>
            <div className="wrapper">

                <Outlet/>

                <Modal active={modalActive} setActive={setModalActive}>
                    <Connect setActive={setModalActive} />
                </Modal>
            </div>
            <div className='headerContainer'>
                <div className='headerContent'>
                    <img src="/assets/images/POM_logo.png" className='imgLogo img-responsive' alt="POM Miner Logo" />
                    <NetworkSwitcher setActive={setModalActive} />
                </div>
            </div>
            <TransactionsInfo />
        </>
    );
};

export {Layout};