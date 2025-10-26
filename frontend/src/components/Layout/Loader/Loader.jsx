import React from 'react'
import BeatLoader from 'react-spinners/BeatLoader'

const Loader = ({ loading }) => {
    return (
        <div className="flex justify-center items-center w-[100vw] h-[100vh] fixed bg-gray-50 bg-opacity-50 z-20 left-0 top-0 bottom-0 right-0">
            <BeatLoader
                color={'#DB142C'}
                loading={loading}
                size={10}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}

export default Loader