const MainView = ({children}) => {
    let style: any = {
        '--animate-duration': '0.2s',
    }

    return (
        <div
            style={style}
            className={`animate__animated animate__faster animate__fadeInBottom`}>
            {children}
        </div>
    )
}

export default MainView