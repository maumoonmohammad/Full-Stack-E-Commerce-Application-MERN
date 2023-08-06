import React from 'react'
import Layout from '../components/Layout/Layout'

const Policy = () => {
    return (
        <Layout title={"Privacy Policy"}>
            <div className='row privacy'>
                <div className='col-md-6 pvcimage'>
                    <img
                        src='/images/privacy.png'
                        alt='privacy policy'
                        style={{ width: "100%" }}>
                    </img>

                </div>
                <div className='col-md-4 descriptionpvc'>
                    <h1 className='bg-dark text-light text-center'>POLICY</h1>
                    <p>
                        At Kart, we understand the importance of protecting your privacy and safeguarding your personal information.
                        This Privacy Policy outlines how we collect, use, and store your data when you visit our website or interact with
                        our services. By accessing or using our website, you agree to the terms of this policy.<br /><br />

                        1. Information We Collect:

                        Personal Information: When you make a purchase or create an account, we collect personal information such as your
                        name, email address, billing and shipping address, and contact details.
                        Payment Information: To process your orders, we collect payment information, including credit card numbers, billing
                        addresses, and other payment details. However, please note that we do not store your payment information on our servers.
                        Device and Log Information: We may collect information about the device you use to access our website, including IP
                        address, browser type, operating system, and referring URLs. This information helps us analyze website performance
                        and improve our services.
                        Cookies: We use cookies and similar technologies to enhance your browsing experience, personalize content, and gather
                        information about your preferences and usage patterns. You have the option to disable cookies in your browser settings.
                        <br /><br />
                        2. Use of Information:

                        To Provide and Improve Services: We use the collected information to process your orders, communicate with you,
                        and deliver the requested products and services. It also helps us personalize your experience, improve our website,
                        and develop new features.
                        Marketing and Promotions: With your consent, we may use your contact information to send you promotional emails,
                        newsletters, or special offers. You can opt-out of receiving such communications at any time.
                        Legal Compliance: We may use and disclose your information when required to comply with applicable laws, regulations,
                        legal processes, or government requests.
                    </p>

                </div>

            </div>
        </Layout>
    )
}

export default Policy