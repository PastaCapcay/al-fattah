"use client"
import React, { useState } from 'react'
import SectionName from '@/components/ui/sectionName'
import Title from '@/components/ui/title'
import CardOne from './cardOne'
import CardTwo from './cardTwo'
import CardThree from './cardThree'
import CardFour from './cardFour'
import VideoCard from './videoCard'
import SlideUp from '@/lib/animations/slideUp'

const categoryList = [
    {
        id: 1,
        label: "Pendidikan",
        data_target: "education"
    },
    {
        id: 2,
        label: "Sekolah",
        data_target: "school"
    },
    {
        id: 3,
        label: "Belajar",
        data_target: "learn"
    },
    {
        id: 4,
        label: "Anak",
        data_target: "child"
    },
    {
        id: 5,
        label: "Pembinaan",
        data_target: "coaching"
    },
    {
        id: 6,
        label: "Video",
        data_target: "video"
    },

]
const Gallery = () => {
    const [activeTab, setActiveTab] = useState("education")
    const [selectedVideo, setSelectedVideo] = useState(null)

    return (
        <section className="lg:pt-15 lg:pb-15 pt-10 pb-10 portfolio">
            <div className="container">
                <div className="text-center flex flex-col items-center">
                    <SectionName>Galeri Terbaru</SectionName>
                    <Title size={"3.5xl"} className={"lg:max-w-[630px]"}>Kegiatan Anak di Al-Fattah</Title>
                </div>
                <div className="pt-10">
                    <ul className="flex items-center justify-center flex-wrap md:gap-7.5 gap-5">
                        {
                            categoryList.map(({ data_target, id, label }) => {
                                return (
                                    <li key={id} onClick={() => setActiveTab(data_target)} className={`px-5 py-2.5 text-xl font-700 border border-[#F2F2F2] rounded-[10px] font-jost cursor-pointer hover:bg-primary hover:text-cream-foreground transition-all duration-500 ${activeTab === data_target ? "bg-primary text-cream-foreground" : ""}`}>
                                        {label}
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <SlideUp>
                        <div className="mt-[64px] overflow-hidden relative ">
                            {activeTab === "video" ? (
                                <VideoCard onVideoSelect={setSelectedVideo} />
                            ) : (
                                <>
                                    <CardOne data_target={activeTab} />
                                    <CardTwo data_target={activeTab} />
                                    <CardThree data_target={activeTab} />
                                    <CardFour data_target={activeTab} />
                                </>
                            )}
                        </div>
                    </SlideUp>
                </div>
            </div>

            {/* Video Modal */}
            {selectedVideo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75" onClick={() => setSelectedVideo(null)}>
                    <div className="relative w-full max-w-4xl mx-4" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="absolute top-4 right-4 z-10 text-white text-2xl bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-75"
                            onClick={() => setSelectedVideo(null)}
                        >
                            ×
                        </button>
                        <video
                            src={selectedVideo}
                            controls
                            autoPlay
                            className="w-full h-auto max-h-[80vh] rounded-lg"
                        >
                            Browser Anda tidak mendukung pemutaran video.
                        </video>
                    </div>
                </div>
            )}
        </section>
    )
}

export default Gallery