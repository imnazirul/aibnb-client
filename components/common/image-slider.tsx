import {Carousel} from "antd";
import {toAssetUrl} from "../../helpers/utils";
import Image from "next/image";
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <FiChevronRight
            className={className}
            style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <FiChevronLeft
            className={className}
            style={{ ...style, display: "block", background: "green" }}
            onClick={onClick}
        />
    );
}


const ImageSlider = ({images, className, width = 400, height = 400}: {
    images: string[],
    className?: string,
    width?: number,
    height?: number
}) => {
    return (
        <>
            <Carousel
                arrows={true}
                className="image-slider"
                infinite={false}
                nextArrow={<SampleNextArrow/>}
                prevArrow={<SamplePrevArrow/>}
            >
                {images.map((image, index) => (
                    <div key={index}>
                        <Image
                            height={height}
                            width={width}
                            src={toAssetUrl(image)}
                            className={className}
                            priority={true}
                            alt="image"/>
                    </div>
                ))}
            </Carousel>
        </>
    )
}

export default ImageSlider;