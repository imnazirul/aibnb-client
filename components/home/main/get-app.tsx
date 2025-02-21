import Icon from "../../common/icon";

const GetApp = () => {
    return (
        <div className="bg-primary md:my-[130px] my-20">
            <div className="get-app">
                <div className="flex flex-col justify-center h-full px-3">
                    <h2 className="header">Get the App</h2>
                    <p className="title">Download the app and go to travel the world.</p>
                    <div className="apps">
                        <img src="google.png" className=""></img>
                        <img src="apple.png" className=""></img>
                    </div>
                </div>
                <div>
                    <img src="app.png" className="app-img"></img>

                </div>
                <div className="icon-arrow-up">
                    <Icon name="arrow-up" />
                </div>
                <div className="icon-arrow-down">
                    <Icon name="arrow-down" />
                </div>
            </div>

        </div>

    )
}

export default GetApp;


export const GetApp2 = () => {
    return (
        <div className="mt-[130px] bg-[#0F0F0F] hidden md:block">
            <div className="relative">
                <div className="flex h-[26rem] xl:h-full">
                    <Icon name="footer-side" />
                </div>
                <div className="get-app-2">
                    <div className="app-box">
                        <div className="box-img">
                            <img
                                className="-mt-20 w-52 md:w-full"
                                width={1000}
                                height={1000}
                                src="app2.png"
                            ></img>

                        </div>
                        <div className="col-span-12 md:col-span-6 lg:col-span-8 lg:grid lg:grid-cols-12">

                            <div className="col-span-6">
                                <h1 className="text-xlSemiBold mb-6">Download Our App</h1>
                                <p className="text-p1">
                                    Lorem ipsum dolor sit amet, consectetur adi- piscing elit. sed
                                    do eiusmod tempor
                                </p>
                            </div>


                            <div className="app-img">
                                <img src="google.png" className=""></img>
                                <img src="apple.png" className=""></img>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
            <hr className="mt-16" />

        </div>
    )
}