import Loader from 'react-loader-spinner'
import React from 'react'

const Loading = () => {
    return ( 
        <Loader 
        type="BallTriangle" 
        color="crimson" 
        height={80} 
        width={80} />
     );
}
 
export default Loading