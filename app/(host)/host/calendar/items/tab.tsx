const TabView = ({value, current, children}) => {
    let animation = {
        'settings': 'animate__fadeIn',
        'pricing': 'animate__fadeInRight',
        'custom_pricing': 'animate__fadeInRight',
    }[current]

    let style: any = {
        '--animate-duration': '0.2s',
    }

    return (
        <div
            style={style}
            className={`${value !== current ? 'hidden' : ''} animate__animated animate__faster ${animation}`}>
            {children}
        </div>
    )
}

export default TabView