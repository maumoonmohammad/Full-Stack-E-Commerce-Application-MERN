import React from 'react'
import Layout from '../components/Layout/Layout'
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi"

const Contact = () => {
    return (
        <Layout title={'contact us'}>
            <div className='row contactus'>
                <div className='col-md-6'>
                    <img
                        src='/images/contactus.png'
                        alt='contactus'
                        style={{ width: "100%" }}>
                    </img>
                </div>
                <div className='col-md-4'>
                    <h1 className='bg-dark p-2 text-white text-center'>CONTACT US</h1>
                    <p className='text-justify mt-2'>For any query and info about any product feel free to call anytime. We are available 24x7</p>
                    <p className='mt-3'><BiMailSend />: www.helpdesk@kart.com</p>
                    <p className='mt-3'><BiPhoneCall /> :011-288867</p>
                    <p className='mt-3'><BiSupport />: 1800-2866678 (toll free)</p>
                </div>
            </div>
        </Layout>
    )
}

export default Contact