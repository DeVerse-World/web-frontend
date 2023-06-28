import { StarIcon } from '@heroicons/react/20/solid'
import { RootTemplateViewModel } from "../asset/RootWorldList";
import { CreatorViewModel } from "../asset/RootWorldList";
import { CursorArrowRaysIcon, EyeIcon } from '@heroicons/react/24/outline'
import { EventViewModel } from '../asset/EventList';
import { IoLogoGameControllerB } from 'react-icons/io';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

type RootTemplateProps = {
    template: RootTemplateViewModel;
    creator: CreatorViewModel;
    
}

const RootTemplate = ({ template, creator }: RootTemplateProps) => {
    const stats = [
        { name: 'Number of Clicks', value: `${template.numClicks} clicks`, icon: <CursorArrowRaysIcon className="h-10 w-10" aria-hidden="true" /> },
        { name: 'Number of Views', value: `${template.numViews} views`, icon: <EyeIcon className="h-10 w-10" aria-hidden="true" /> },
        { name: 'Number of Plays', value: `${template.numPlays} plays`, icon: <IoLogoGameControllerB className="h-10 w-10" aria-hidden="true" /> },

    ];

    return (
      <div className="max-w-7xl">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-32 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
              <div className="lg:col-end-1 w-full lg:max-w-lg lg:pb-8">
                  <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">
                      {template.name}
                  </h2>
                  <p className="my-2 text-xl text-lighter">
                      {creator.name}
                  </p>
                  {template.rating !== undefined && template.rating !== null && (
                      <div className="my-2">
                          <h3 className="sr-only">Reviews</h3>
                          <div className="flex flew-row items-end">
                            <div className="flex items-center">
                                {[0, 1, 2, 3, 4].map((rating) => (
                                    <StarIcon
                                    key={rating}
                                    className={classNames(
                                        template.rating > rating ? 'text-yellow-400' : 'text-gray-300',
                                        'h-5 w-5 flex-shrink-0'
                                    )}
                                    aria-hidden="true"
                                    />
                                ))}
                            </div>
                            {/* leading-5 to match with h-5 of the star icons */}
                            <div className="ml-2 leading-5 text-lg font-bold text-light">{template.rating}.0</div>
                          </div>
                          <p className="sr-only">{template.rating} out of 5 stars</p>
                      </div>
                  )}
                    <dl className="mt-4 sm:mt-10 border-y border-medium py-6 grid grid-cols-1 gap-x-8 gap-y-10 text-white sm:grid-cols-3 sm:gap-y-16 lg:grid-cols-3">
                        {stats.map((stat) => (
                            <div key={stat.name} className="flex flex-col items-center gap-y-3">
                                <dt className="text-sm leading-6">{stat.value}</dt>
                                    <dd className="order-first text-3xl font-semibold tracking-tight">{stat.icon}</dd>
                            </div>
                                ))}
                    </dl>
                    <p className="mt-6 text-xl leading-8 text-lighter">
                    {template.description}
                    </p>
                    {/* (Optional subdescription) */}
                    {/* <p className="mt-6 text-base leading-7 text-lighter">
                    Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt
                    amet fugiat veniam occaecat fugiat. Quasi aperiam sit non sit neque reprehenderit.
                    </p> */}
                </div>
                    <div className="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end w-full">
                    <img
                        src={template.file2dUri || "/images/color-image-placeholder.webp"}
                        alt=""
                        className="aspect-square w-full sm:w-[26rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                    />
                </div>
            </div>
      </div>
    );

    return (
        <div className="mt-10 overflow-hidden mx-auto max-w-7xl">
            <div className="lg:flex">
                <div className="mx-auto grid grid-cols-1 gap-x-20 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
                    <div className="lg:col-end-1 w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
                        <img
                            src={template.file2dUri || "/images/color-image-placeholder.webp"}
                            alt=""
                            className="aspect-square w-[24rem] sm:w-[28rem] lg:w-[22rem] xl:w-[34rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                        />
                    </div>
                    <div className=" lg:w-full lg:max-w-lg lg:pb-8">
                        {template.rating !== undefined && template.rating !== null && (
                            <div className="mb-4">
                                <h3 className="sr-only">Reviews</h3>
                                <div className="flex items-center">
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <StarIcon
                                        key={rating}
                                        className={classNames(
                                            template.rating > rating ? 'text-yellow-400' : 'text-gray-300',
                                            'h-5 w-5 flex-shrink-0'
                                        )}
                                        aria-hidden="true"
                                        />
                                    ))}
                                </div>
                                <p className="sr-only">{template.rating} out of 5 stars</p>
                            </div>
                        )}
                        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                            {template.name}
                        </h2>
                        <p className="mt-2 text-xl text-lighter">
                            {creator.name}
                        </p>

                        <p className="mt-6 text-xl leading-8 text-lighter">
                            {template.description}
                        </p>

                        <p className="my-2 text-xl text-lighter">
                      {template.numViews} views
                  </p>
                  <p className="my-2 text-xl text-lighter">
                      {template.numClicks} clicks
                  </p>
                  <p className="mt-6 text-xl leading-8 text-lighter">
                      {template.description}
                  </p>
                        {/* (Optional subdescription) */}
                        {/* <p className="mt-6 text-base leading-7 text-lighter">
                            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt
                            amet fugiat veniam occaecat fugiat. Quasi aperiam sit non sit neque reprehenderit.
                        </p> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RootTemplate;
