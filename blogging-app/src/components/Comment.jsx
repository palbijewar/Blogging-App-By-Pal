import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';

export default function Comment({ comment, onLike }) {
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/users/${comment.user_id}`);
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          throw new Error('Failed to fetch user data');
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment.user_id]);

  const handleLike = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/comments/like/${comment._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ user_id: currentUser._id }),
      });
      if (res.ok) {
        onLike(comment._id); 
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
      <div className='flex-shrink-0 mr-3'>
        <img  
          className='w-10 h-10 rounded-full bg-gray-200' 
          src={user.profile_picture} 
          alt={user.username} 
        />
      </div>
      <div className='flex-1'>
        <div className='flex items-center mb-1'>
          <span className='font-bold mr-1 text-xs truncate'>
            {user ? user.username : 'Anonymous User'}
          </span>
          <span className='text-gray-500 text-xs'>
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <p className='text-gray-500 pb-2'>{comment.content}</p>
        <div className='flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2'>
          <button
            className={`text-gray-400 hover:text-blue-500 ${
              currentUser && comment.likes.includes(currentUser._id) && 'text-blue-500'
            }`}
            onClick={handleLike}
          >
            <FaThumbsUp className='text-sm' />
          </button>
          <p className='text-gray-400'>
            {comment.number_of_likes > 0 && comment.number_of_likes + " " + (comment.number_of_likes === 1 ? "like" : "likes")}
          </p>
        </div>
      </div>
    </div>
  );
}
