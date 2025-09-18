import React from 'react'
import CardTwo from './cardTwo'
import Crayon from '../../../../public/icons/crayon'
import Scissors from '../../../../public/icons/scissors'
import BabyCutlery from '../../../../public/icons/baby-cutlery'
import BabyBody from '../../../../public/icons/baby-body'


const SuccessProjectTwo = () => {
    return (
        <div className="lg:pt-15 lg:pb-15 pt-10 pb-10">
            <div className="container">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-7.5">
                    <CardTwo icon={<Crayon/>} number={"280"} title={"Siswa Aktif"}/>
                    <CardTwo icon={<Scissors/>} color={"text-secondary-foreground"} number={"85"} title={"Aktivitas Edukatif"}/>
                    <CardTwo icon={<BabyCutlery/>} color={"text-primary-foreground"} number={"18"} title={"Penghargaan"}/>
                    <CardTwo icon={<BabyBody width='120' height='120'/>} color={"text-green-foreground"} number={"220"} title={"Testimoni Orang Tua"}/>
                </div>
            </div>
        </div>
    )
}

export default SuccessProjectTwo