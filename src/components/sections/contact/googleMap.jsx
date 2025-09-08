import React from 'react'

const GoogleMap = () => {
    return (
        <div className="lg:pt-15 lg;pb-15 pb-10 pt-10 overflow-x-hidden">
            <iframe title="Lokasi Al-Fattah GCC Cikarang Utara" src={"https://www.google.com/maps?q=-6.2472978,107.182391&z=17&output=embed"} width="1920" height="497" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
    )
}

export default GoogleMap