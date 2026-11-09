import React from 'react'
import { FaPlay } from 'react-icons/fa'

const videoData = [
    {
        id: 1,
        title: "Dokumentasi Kegiatan Siswa Al-Fattah 1",
        videoSrc: "/images/vid/kegiatan-vid-1.mp4"
    },
    {
        id: 2,
        title: "Dokumentasi Kegiatan Siswa Al-Fattah 2",
        videoSrc: "/images/vid/kegiatan-vid-2.mp4"
    },
    {
        id: 3,
        title: "Aktivitas Belajar & Bermain Al-Fattah",
        videoSrc: "/images/vid/kegiatan-vid-3.mp4"
    }
]

// Komponen thumbnail video dengan preview frame otomatis
const VideoThumbnail = ({ videoSrc, className }) => {
    return (
        <div className={`relative ${className} bg-slate-900 rounded-[10px] overflow-hidden`}>
            <video 
                src={videoSrc}
                preload="metadata"
                muted
                playsInline
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
                    <FaPlay className="text-primary group-hover:text-white text-lg ml-1 transition-colors" />
                </div>
            </div>
        </div>
    )
}

const VideoCard = ({ onVideoSelect }) => {
    return (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7.5">
            {videoData.map((video) => (
                <div
                    key={video.id}
                    className="relative group cursor-pointer overflow-hidden rounded-[10px] bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                    onClick={() => onVideoSelect(video.videoSrc)}
                >
                    <div className="relative aspect-video">
                        <VideoThumbnail
                            videoSrc={video.videoSrc}
                            className="w-full h-full"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[10px]">
                            <div className="bg-primary rounded-full p-4 shadow-lg scale-90 group-hover:scale-100 transition-transform">
                                <FaPlay className="text-white text-xl ml-1" />
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-white">
                        <h4 className="text-sm sm:text-base font-bold text-gray-800 group-hover:text-primary transition-colors">
                            {video.title}
                        </h4>
                        <span className="text-xs text-gray-500 mt-1 inline-block">Klik untuk memutar video</span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default VideoCard
