// importing other compinent and images
import MainArea from './MainArea'
import backgroundImage from '../images/bg7.jpg'

function HomePage() {
    return (
        <>
        {/* bg image */}
            <img src={backgroundImage} alt="backgroundImage" className='backgroundImage' />

            <div className="center">
                <MainArea />
            </div>

            <div className="extraArea">.</div>
        </>
    )
}

export default HomePage