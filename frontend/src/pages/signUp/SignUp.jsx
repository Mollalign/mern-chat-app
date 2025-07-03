import React, { useState } from 'react'
import GenderCheckBox from './GenderCheckBox'
import { Link } from 'react-router-dom'
import useSignUp from '../../hooks/useSignUp';

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: ''
  });

  const {loading, setLoading, signUp} = useSignUp();

  const handleCheckboxChange = (gender) => {
    setInputs({...inputs, gender: gender});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await signUp(inputs);
    setLoading(false);
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='w-full max-w-sm p-6 rounded-lg shadow-md bg-clip-padding backdrop-blur-lg'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Sign Up
          <span className='text-blue-600'> ChatApp</span>
        </h1>
    
       <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Full Name</span>
            </label>
            <input 
              type="text" 
              placeholder='Mollalign Daniel'
              className='w-full input input-natural h-10'
              value={inputs.fullName}
              onChange={(e) => setInputs({...inputs, fullName: e.target.value})}
            />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Username</span>
            </label>
            <input 
              type="text" 
              placeholder='@mll_ex'
              className='w-full input input-natural h-10'
              value={inputs.username}
              onChange={(e) => setInputs({...inputs, username: e.target.value})}
            />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input 
              type="password" 
              placeholder='Enter Password'
              className='w-full input input-bordered h-10'
              value={inputs.password}
              onChange={(e) => setInputs({...inputs, password: e.target.value})}
            />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Conform Password</span>
            </label>
            <input 
              type="password" 
              placeholder='Enter Password'
              className='w-full input input-bordered h-10'
              value={inputs.confirmPassword}
              onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})}
            />
          </div>

          {/* Gender checkbox goes here */}
          <GenderCheckBox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender}/>

          <Link href="/login" className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
            Already have an account?
          </Link>

          <div>
            <button type='submit' className='btn btn-block btn-sm mt-2'>{loading ? (<span className='loading loading-spinner'></span>) : ("Sign Up")}</button>
          </div>
       </form>
      </div>
    </div>
  )
}

export default SignUp