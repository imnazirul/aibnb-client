const TabView = ({ value, current, children }) => {
    let animation = {
        'space': 'animate__fadeIn',
    }[current]

    let style: any = {
        '--animate-duration': '0.2s',
    }

    return (
        <div
            style={style}
            className={`${value !== current ? 'hidden' : ''} animate__animated animate__faster ${animation} w-full`}>
            {children}
        </div>
    )
}

export default TabView