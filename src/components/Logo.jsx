import infoIcon from '../infoIcon.svg'

export default function Logo({logo}){
    return (
        <div className="logo">
            <div id="iconContainer">
                <img src={logo} alt="Dino-Logo" id="icon"/>
            </div>
            <div id="title">
                <h1>Dino-Mem</h1>
                <span id="info"><img src={infoIcon} alt="info-icon"/></span>   
            </div>
        </div>
    )
}