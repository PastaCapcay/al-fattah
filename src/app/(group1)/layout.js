import FooterTwo from '@/components/sections/footers/footerTwo'
import HeaderOne from '@/components/sections/headers/headerOne'
import React from 'react'

const layout = ({ children }) => {
    return (
        <>
            <HeaderOne />
            {children}
            <FooterTwo />
        </>
    )
}

export default layout