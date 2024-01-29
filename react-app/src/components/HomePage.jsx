import MainArea from './MainArea'

import backgroundImage from '../images/bg4.png'

function HomePage() {
    return (
        <>
            <img src={backgroundImage} alt="backgroundImage" className='backgroundImage' />

            <div className="center">
                <MainArea />
            </div>
        </>
    )
}

export default HomePage