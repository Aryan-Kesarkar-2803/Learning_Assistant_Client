import React from "react";

const MemoizedIframe = React.memo(({src}) => (
    <iframe 
    src={src} 
    loading="lazy" 
    title="content"
    className="w-full aspect-video"
    allowFullScreen
    />
))

export default MemoizedIframe;