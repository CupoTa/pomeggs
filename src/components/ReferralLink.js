import React, { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';

export function ReferralLink({ wallet }) {

    const [value, setValue] = useState(`https://pomminer.org/${wallet}`)
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        copied && toast.success('Link copy to clipboard', {
            onClose: () => {
                setCopied(false)
            }
        })
    }, [copied])


    const shortAddress = (address) => {
        return `${address.slice(0, 5)}...${address.slice(-4)}`
    }

    return (
        <>
            <CopyToClipboard text={value}
                onCopy={() => setCopied(true)}>
                <span className='wrap_ref_link content_card'>https://pomminer.org/{wallet}</span>
            </CopyToClipboard>
            <CopyToClipboard text={value}
                onCopy={() => setCopied(true)}>
                <span className='wrap_ref_link content_card xs'>https://pomminer.org/{shortAddress(wallet)}</span>
            </CopyToClipboard>
        </>
    );
};

export default ReferralLink;