import logo from '../images/myconfessionz.png'
import { useAuthStore } from '../store/authStore';
import { Country, State }  from 'country-state-city';
import { Link } from 'react-router-dom';

// <HiOutlineHandThumbUp />
// <HiHandThumbUp />

// <BsChatSquareDots />
// <BsChatSquareDotsFill />

// <FaShare />
// <TbShare3 />

const UserProfile = () => {
  const { user } = useAuthStore();

  return (
    <div className="mt-12 mb-20">
        {/* <section className="flex flex-row flex-wrap mx-auto"> */}
            <section className="pt-16">
            <div className="w-full md:w-6/12 px-4 mx-auto">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
                <div className="px-6">
                <div className="flex flex-wrap justify-center">
                    <div className="w-full px-4 flex justify-center">
                    <div className="relative">
                    <img
                      className="object-cover h-24 w-24 rounded-full bg-black -mt-12"
                      src={logo}
                      alt="Brand-logo"
                    />
                    </div>
                    </div>
                    <div className="w-full px-4 text-center mt-12">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                        <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block capitalize tracking-wide text-blueGray-600 text-bRed">
                        {Country.getCountryByCode(user.country).name}
                        </span>
                        <span className="text-sm text-gray-500">country</span>
                        </div>
                        <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block capitalize tracking-wide text-blueGray-600 text-bRed">
                        {State.getStateByCodeAndCountry(user.state, user.country).name}
                        </span>
                        <span className="text-sm text-gray-500">state</span>
                        </div>
                        <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block capitalize tracking-wide text-blueGray-600 text-bRed">
                            {user.gender}
                        </span>
                        <span className="text-sm text-gray-500">gender</span>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="text-center mt-8">
                    <h3 className="text-xl font-semibold leading-normal mb-2 text-bRed capitalize">
                        {user.dob && (
                          <span className="">
                            {(() => {
                              const dob = new Date(user.dob);
                              const today = new Date();
                              let age = today.getFullYear() - dob.getFullYear();
                              const monthDiff = today.getMonth() - dob.getMonth();
                              const dayDiff = today.getDate() - dob.getDate();

                              // Adjust age if the birthday hasn't occurred yet this year
                              if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
                                age--;
                              }
                              return age;
                            })()}
                          </span>
                        )} <span className='lowercase'>years</span>
                    </h3>
                    <div className="text-sm mt-0 mb-8 text-gray-500">
                    date of birth
                    </div>
                </div>
                <div className="text-center mt-4 pb-12">
                    <h3 className="text-xl font-semibold leading-normal mb-2 text-bRed capitalize">
                    {user.username}
                    </h3>
                    <div className="text-sm mt-0 mb-10 text-gray-500">
                        username
                    </div>
                    <div className='mb-4'>
                      <Link to="/change-username" className="text-sm mt-0 mb-10 text-gray-100 bg-bRed py-2 px-6 rounded-md">
                          change username
                      </Link>
                    </div>
                    <div className='text-xs text-red-400'>
                      Changed Username will effect here and navbar after next login
                    </div>
                </div>

                </div>
            </div>
            </div>
            </section>
        {/* </section> */}
    </div>
  )
}

export default UserProfile


