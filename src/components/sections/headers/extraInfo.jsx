import React from 'react'
import { FaPhone, FaEnvelope, FaLocationDot } from "react-icons/fa6";

const ExtraInfo = () => {
    return (
        <div className="mt-5">
            <div>
                <h4 className="text-xl font-bold text-[#385469]">Contact Info</h4>
                <ul className="mt-5 flex flex-col gap-[15px]">
                    <li className='flex items-center gap-2'>
                        <FaPhone className="text-primary-foreground" /> <a href="" className="ml-2.5">(629) 555-0129</a>
                    </li>
                    <li className='flex items-center gap-2'>
                        <FaEnvelope className="text-primary-foreground" /> <a href="" className="ml-2.5">info@example.com</a>
                    </li>
                    <li className='flex items-center gap-2'>
                        <FaLocationDot className="text-primary-foreground" /> <span className="ml-2.5">6391 Elgin St. Celina, 10299</span>
                    </li>
                </ul>
            </div>
            
        </div>
    )
}

export default ExtraInfo