import React from 'react'

import {Bars} from 'react-loader-spinner'

const Loading = () => {
    return (
        <div align='center'>
            <Bars color="#00BFFF" height={80} width={80} />
        </div>
    )
}

export default Loading