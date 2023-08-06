import React from 'react'
import Layout from '../components/Layout/Layout'

const About = () => {
    return (
        <Layout title={'About KART'}>
            <div className='row aboutus'>
                <div className='col-md-6 image'>
                    <img
                        src='/images/aboutus.png'
                        alt='aboutus'
                        style={{ width: "100%" }}>
                    </img>
                </div>
                <div className='col-md-4 descripabout'>
                    <h1 className='bg-dark text-light text-center'>ABOUT US</h1>
                    <p>
                        Welcome to Kart, your ultimate destination for all things electronic! We are a premier online
                        electronic store dedicated to providing you with the latest and greatest in cutting-edge technology.
                        With an extensive range of products and a commitment to exceptional customer service, we strive to
                        be your go-to source for all your electronic needs.
                        At Kart, we understand that technology plays a vital role in our everyday lives, making it easier,
                        more efficient, and more enjoyable. That's why we carefully curate our collection of top-notch gadgets,
                        electronics, and accessories to bring you the very best that the tech world has to offer.

                    </p>
                </div>

            </div>
        </Layout>
    )
}

export default About