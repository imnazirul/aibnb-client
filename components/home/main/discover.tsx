import MainCard from "../../common/card";

const Discover = () => {
    return (
        <div className="container discover">
            <h1 className="header">
                Discover Your Favorite Place
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {
                    Array(4).fill(0).map((_, index) => <MainCard key={index} />)
                }

            </div>
        </div>
    )
}

export default Discover;