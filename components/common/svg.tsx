interface SvgProps {
    src: string;
    height?: number;
    width?: number;
    className?: string;
}

const Svg = ({src, height = 24, width = 24, className}: SvgProps) => {
    return (
        <img
            crossOrigin="anonymous"
            className={className}
            style={{height, width}}
            src={src}
            alt=""
        />
    )
}

export default Svg;