import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from "react-router-dom";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Helmet } from "react-helmet";
import { AuthContext } from "../Auth/ContextProvider";


export default function Login() {
    const [see, setSee] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const { signIn, logInByGoogle, dark, user } = useContext(AuthContext)
    if (user) {
        return navigate('/')
    }

    const onSubmit = (data) => {
        signIn(data.email, data.password)
            .then(e => {
                navigate(location.state || '/')
                toast.success("Login successful")
            })
            .catch(e => toast.error(e.message))
        reset()
    }

    const googleSignIn = () => {
        logInByGoogle()
            .then(e => {
                navigate(location.state || '/')
                toast.success("Login successful")
            })
            .catch(e => toast.error(e.message))
    }


    return (
        <div className="py-10">
            <div className={`flex flex-col justify-center items-center  border-2 border-[#302F2A] w-fit mx-auto px-10 py-10  rounded-xl ${dark ? 'bg-[#1A1818] text-white' : ''}`}>
            <Helmet>
                <title>MatchHearts || Sign In</title>
            </Helmet>
                <h2 className='text-4xl font-semibold mb-5 text-[#302F2A]'>Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        className={`outline-none border-b-2 w-full  bg-transparent text-xl mb-5 pr-20 ${dark ? 'text-white' : 'text-black'}`}
                        {...register("email", { required: true })}
                        type="email"
                        placeholder='Email'
                    />
                    <br />
                    {errors.password && <span className="text-red-600">Email is required</span>}
                    <br />
                    <div className="flex">
                        <input
                            {...register("password", { required: true })}
                            className={`outline-none border-b-2 w-full  bg-transparent text-xl mb-5 pr-20 ${dark ? 'text-white' : 'text-black'}`}
                            type={!see ? "password" : 'text'}
                            placeholder='Password'
                        />
                        <div>
                            {see ? <span className="cursor-pointer" onClick={() => setSee(!see)}><FaRegEyeSlash size={20} /></span> : <span className="cursor-pointer" onClick={() => setSee(!see)}><FaRegEye size={20} /></span>}
                        </div>

                    </div>
                    <br />
                    {errors.password && <span className="text-red-600">Password is required</span>}
                    <div className='flex justify-between mt-10'>
                        <label>
                            <input
                                type="checkbox"
                                {...register("checkbox", { required: true })}
                            />
                            <span className="ml-2">Remember Me</span>
                        </label>
                        <h1 className='border-b-2 border-[#C4BA8F] text-[#C4BA8F]'><Link>Forgot Password</Link></h1>
                    </div>
                    {errors.checkbox && <span className="text-red-600">Please check the box</span>}
                    <button className='bg-[#302F2A] text-white w-full p-2 mt-10 rounded-xl'>
                        Login
                    </button>
                    <p className='my-3'>Don't have an account ? <Link to={'/signup'} className='text-[#C4BA8F] font-bold'>Create an account</Link></p>
                    <div className='text-xl w-full '>-------------------------  or --------------------------</div>
                    <div className="flex items-center justify-center flex-col">
                        <h1 className='mb-3 text-xl'>Continue with</h1>
                        <div className='flex items-center justify-center gap-5 cursor-pointer'>
                            <div className='w-10 h-10' onClick={googleSignIn}>
                                <img className='w-full h-full object-contain' src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png' alt="" />
                            </div>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
}