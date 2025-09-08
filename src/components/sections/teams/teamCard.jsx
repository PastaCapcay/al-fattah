import React from 'react'
import Link from 'next/link'
import Image from 'next/image'


const TeamCard = ({src, name, position}) => {
    return (
        <div className="bg-background shadow-3xl border-2 border-transparent hover:border-green transition-all duration-500 flex justify-center lg:p-10 p-7 rounded-tl-[50px] rounded-br-[50px] rounded-tr-[10px] rounded-bl-[10px] max-w-[410px] mx-auto group/team">
            <div>
                <div>
                    <Image src={src} width={330} height={274} alt="team-1" className="rounded-tl-[50px] rounded-br-[50px] rounded-tr-[10px] rounded-bl-[10px] group-hover/team:rounded-tr-[50px] group-hover/team:rounded-bl-[50px] group-hover/team:rounded-tl-[10px] group-hover/team:rounded-br-[10px] transition-all duration-500"/>
                </div>
                <div className="pt-7.5">
                    <h4 className="leading-[141%]"><Link href="#" className="text-2xl font-medium">{name}</Link></h4>
                    <p className="pt-1">Pengajar</p>
                    
                </div>
            </div>
        </div>
    )
}

export default TeamCard