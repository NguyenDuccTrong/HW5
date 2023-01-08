import React, {useState, useRef} from 'react';
import './Video.css'
import VideoFooter from './VideoFooter.js'
import VideoSidebar from './VideoSidebar.js'

const Video = ({ url, channel, description, song, likes, shares, messages }) => {
    const [playing, setPlaying] = useState(false)
    const videoRef = useRef(null)
    const handleVideoPress = () => {
        if(playing){
            videoRef.current.pause()
            setPlaying(false)
        } else {
            videoRef.current.play()
            setPlaying(true)
        }
    }

    return (
        <div className="video">
            {<video
                controls
                preload="none"
                src={url}
                className='video_player'
                loop
                ref={videoRef}
                onClick={handleVideoPress}
            >
            <source src={url} type="video/mp4"/>
            </video>}
            {/*<iframe className='video'*/}
            {/*    title='Youtube player'*/}
            {/*    sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'*/}
            {/*    src={url}>*/}
            {/*</iframe>*/}
            <VideoFooter channel={channel} description={description} song={song}/>
            <VideoSidebar likes={likes} share={shares} messages={messages}/>
        </div>
    )
}

export default Video