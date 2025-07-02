import React from 'react'
import GenderCheckBox from './GenderCheckBox'

const SignUp = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='w-full max-w-sm p-6 rounded-lg shadow-md bg-clip-padding backdrop-blur-lg'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Sign Up
          <span className='text-blue-600'> ChatApp</span>
        </h1>
    
       <form>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Full Name</span>
            </label>
            <input 
              type="text" 
              placeholder='Mollalign Daniel'
              className='w-full input input-natural h-10'
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
            />
          </div>

          {/* Gender checkbox goes here */}
          <GenderCheckBox />

          <a href="#" className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
            Already have an account?
          </a>

          <div>
            <button className='btn btn-block btn-sm mt-2'>Login</button>
          </div>
       </form>
      </div>
    </div>
  )
}

export default SignUp