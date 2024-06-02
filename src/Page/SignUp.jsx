import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { AuthContext } from '../Auth/ContextProvider';
import { imageUpload } from '../Api';
function Signup() {
    const navigate = useNavigate()
    const [see, setSee] = useState(false)
    const {
        register,
        // handleSubmit,
        reset,
        formState: { errors },
    } = useForm()
    const { logInByGoogle, createUser, setUser, user, dark, loading, setloading, updateUserProfile } = useContext(AuthContext)
    useContext(AuthContext)
    if (user) {
        return navigate('/')
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const from = e.target
        const name = from.name.value
        const email = from.email.value
        const password = from.password.value
        const image = from.image.files[0]

        try {
            // img upload 
            const image_url = await imageUpload(image)

            // create user 
            const result = await createUser(email, password)

            // update user profile
            const update = await updateUserProfile(name, image_url)
            setUser(prevUser => ({
                ...prevUser,
                displayName: name,
                photoURL: image_url,
            }));
            navigate('/')
            toast.success('Signup Successful')
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }

        // reset();
    }


    const googleSignIn = () => {
        logInByGoogle()
            .then(e => {
                navigate('/')
                toast.success('signUp succesfull')
            })
            .catch(e => toast.error(e.message))
    }
    return (
        <div className='py-10'>
            <div className={`flex flex-col justify-cente items-center  border-2 border-[#302F2A] w-fit mx-auto px-10 py-10 rounded-xl `}>
                <Helmet>
                    <title>MatchHearts || Sign Up</title>
                </Helmet>
                <h2 className='text-4xl font-semibold mb-5 text-[#302F2A]'>SignUp</h2>
                <form
                    onSubmit={handleSubmit}
                    className='space-y-6 ng-untouched ng-pristine ng-valid'
                >
                    <div className='space-y-4'>
                        <div>
                            <input
                                type='text'
                                name='name'
                                id='name'
                                placeholder=' Name'
                                className='w-full  py-2 border-b-2 text-xl  border-gray-300 focus:outline-rose-500  text-gray-900'
                                data-temp-mail-org='0'
                            />
                        </div>
                        <div>
                            <label htmlFor='image' className='block mb-2 text-lg'>
                                Select Image:
                            </label>
                            <input
                                required
                                type='file'
                                id='image'
                                name='image'
                                accept='image/*'
                            />
                        </div>
                        <div>
                            <input
                                type='email'
                                name='email'
                                id='email'
                                required
                                placeholder=' Email'
                                className='w-full  py-2 border-b-2 text-xl border-gray-300 focus:outline-rose-500  text-gray-900'
                                data-temp-mail-org='0'
                            />
                        </div>
                        <div>
                            <input
                                type='password'
                                name='password'
                                autoComplete='new-password'
                                id='password'
                                required
                                placeholder=' Password'
                                className='w-full  py-2 border-b-2 text-xl border-gray-300 focus:outline-rose-500  text-gray-900'
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            disabled={loading}
                            type='submit'
                            className='bg-[#302F2A] w-full rounded-md py-3 text-white'
                        >
                            SignUp
                            {/* {loading ? <TbFidgetSpinner className='animate-spin m-auto' /> : "Continue"} */}
                        </button>
                    </div>
                </form>
                <p className='my-3'>Already have an account ? <Link to={'/login'} className='text-[#D5C08F] font-bold'>Sign In</Link></p>
                <div className='text-xl w-full '>--------------------------- or --------------------------</div>
                <div className="flex items-center justify-center flex-col">
                    <h1 className='mb-3 text-xl'>Continue with</h1>
                    <div className='flex items-center justify-center gap-5 cursor-pointer'>
                        <div className='w-10 h-10' onClick={googleSignIn}>
                            <img className='w-full h-full object-contain' src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png' alt="" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Signup