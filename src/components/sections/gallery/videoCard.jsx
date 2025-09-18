import React from 'react'
import { FaPlay } from 'react-icons/fa'

const videoData = [
    {
        id: 1,
        videoSrc: "/images/vid/vid1.mp4"
    },
    {
        id: 2,
        videoSrc: "/images/vid/vid2.mp4"
    },
    {
        id: 3,
        videoSrc: "/images/vid/vid3.mp4"
    },
    {
        id: 4,
        videoSrc: "/images/vid/vid4.mp4"
    }
]

// Komponen untuk menampilkan thumbnail video dengan play button saja
const VideoThumbnail = ({ videoSrc, className }) => {
    return (
        <div className={`relative ${className}`}>
            <div className="w-full h-full bg-gray-100 rounded-[10px] flex items-center justify-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    <FaPlay className="text-gray-400 text-xl ml-1" />
                </div>
            </div>
        </div>
    )
}

const VideoCard = ({ onVideoSelect }) => {
    return (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-7.5">
            {videoData.map((video) => (
                <div
                    key={video.id}
                    className="relative group cursor-pointer overflow-hidden rounded-[10px] bg-white shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => onVideoSelect(video.videoSrc)}
                >
                    <div className="relative aspect-video">
                        {/* Video Thumbnail simple seperti gambar */}
                        <VideoThumbnail
                            videoSrc={video}
                            className="w-full h-full"
                        />

                        {/* Overlay dengan play button saat hover */}
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[10px]">
                            <div className="bg-primary rounded-full p-4 shadow-lg">
                                <FaPlay className="text-white text-xl ml-1" />
                            </div>
                        </div>
                    </div>

                </div>
            ))}
        </div>
    )
}

export default VideoCard
