const CreatorProgramPage = () => {
    return (
        <div>
            {/* Header section */}
            <div className="px-6 pt-8 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Creator Program</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-300">
                    Join us in creating contents and connecting to players
                    </p>
                </div>
            </div>

            {/* Content section */}
            <div className="mx-auto mt-20 mb-16 sm:mb-20 max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                    <div className="grid max-w-xl grid-cols-1 gap-8 text-base leading-7 text-gray-300 lg:max-w-none lg:grid-cols-2">
                        <div>
                            <p>
                                Get ready to immerse yourself in the magical adventure of Deverse World, where you can participate in a digital revolution and explore the limitless possibilities of the virtual realm.
                            </p>
                            <div className="mt-8 flex">
                                <a href="https://docs.google.com/presentation/d/1y_MpXTGxcP967hWrsZ8tvzp_za-jqcFAvuyis7AnCcA/edit#slide=id.p2" className="text-sm font-semibold leading-6 text-brand">
                                    Learn more about the program <span aria-hidden="true">&rarr;</span>
                                </a>
                            </div>
                        </div>
                        <div>
                            <p>
                                Hãy sẵn sàng đắm chìm vào cuộc phiêu lưu kỳ diệu của Deverse World, nơi mà bạn có thể tham gia vào một cuộc cách mạng kỹ thuật số và khám phá những khả năng vô tận của thế giới ảo.
                            </p>
                            <div className="mt-8 flex">
                                <a href="https://docs.google.com/presentation/d/11kOPhOEH4Y-v9-PUcuNYVHuWhfq32-BQFmy8xox7TdE/edit#slide=id.p5" className="text-sm font-semibold leading-6 text-brand">
                                    Tìm hiểu thêm <span aria-hidden="true">&rarr;</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreatorProgramPage;