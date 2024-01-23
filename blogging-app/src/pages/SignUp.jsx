import React from 'react';
import { Link } from 'react-router-dom';
import { Label, TextInput, Button } from 'flowbite-react';
'use client';

export default function SignUp() {
  return (
    <div className='min-h-screen mt-20'>
        <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'  >
      {/* left  */}
      <div className='flex-1' >
      <Link
        to='/'
        className='font-bold dark:text-white text-4xl'
      >
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
          Pal's
        </span>
        Blog
      </Link>
      <p className='text-sm mt-5'>
        This a blogging site . You can sign up using your email or Google.
      </p>
      </div>
      <div className='flex-1'>
        {/* rigth */}
        <div className='flex flex-col gap-4' >
        <form className='flex flex-col gap-4' >
  <div className="mb-4">
    <Label value="Your username"/>
      <TextInput type="text" placeholder="Username" id="username1" />
  </div>
  <div className="mb-4">
    <Label value="Your email"/>
      <TextInput type="text" placeholder="name@email.com" id="email" />
  </div>
  <div className="mb-4">
    <Label value="Your password" />
      <TextInput type="password" placeholder="Password" id="password" />
  </div>
  <Button
  gradientDuoTone='purpleToPink'
  type='submit'
  >
   Sign Up
  </Button>
  <div className='flex gap-2 text-sm mt-5' >
    <span> Have an account already ? </span>
    <Link to='/sign-in' className='text-blue-500' >
    Sign In
    </Link>
  </div>
</form>
        </div>
      </div>
      </div>
    </div>
  )
}
