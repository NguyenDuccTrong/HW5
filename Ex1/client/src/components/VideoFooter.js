import React from 'react';
import './VideoFooter.css';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import Ticker from 'react-ticker';

const VideoFooter = ({channel, description, song}) => {
    return (
        <div className="videoFooter">
            <div className="videoFooter_text">
                <h3>@{channel}</h3>
                <p>{description}</p>
                <div className="videoFooter_ticker">
                    <MusicNoteIcon className="videoFooter_icon"/>
                    <Ticker mode="smooth">
                        {({index}) => (
                            <>
                                <p>{song}</p>
                            </>
                        )}
                    </Ticker>
                </div>
            </div>
            <img className="videoFooter_record" src="your-video-icon" alt="video footer"/>
        </div>
    )
}

export default VideoFooter