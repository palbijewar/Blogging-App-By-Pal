import { Alert, Button, Modal, Textarea } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Comment from './Comment';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ content: comment, post_id: postId, user_id: currentUser._id }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment('');
        setCommentError(null);
        setComments([data, ...comments]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/comments/${postId}`, {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [postId]);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate('/signin');
        return;
      }
      const res = await fetch(`http://localhost:3000/api/comments/like/${commentId}`, {
        method: 'PUT',
        credentials: 'include',
      });
      if (res.ok) {
        const updatedComments = comments.map((comment) =>
          comment._id === commentId
            ? {
                ...comment,
                number_of_likes: comment.number_of_likes + 1,
              }
            : comment
        );
        setComments(updatedComments);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = async (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  };

  const handleDelete = async (commentId) => {
    setShowModal(false);
    try {
      if (!currentUser) {
        navigate('/signin');
        return;
      }
      const res = await fetch(`http://localhost:3000/api/comments/delete/${commentToDelete}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setComments(comments.filter((comment) => comment._id !== commentId));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
        {
            currentUser ? (
                <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
                <p>Signed in as:</p>
                <img
            className='h-5 w-5 object-cover rounded-full'
            src={currentUser.profile_picture}
            alt=''
          />
                <Link
            to={'/dashboard?tab=profile'}
            className='text-xs text-cyan-600 hover:underline'
          >
            @{currentUser.username}
          </Link>
                </div>
            ) :
            (
                <div className='text-sm text-teal-500 my-5 flex gap-1'>
                You must be signed in to comment.
                <Link className='text-blue-500 hover:underline' to={'/signin'}>
                  Sign In
                </Link>
              </div>
            )
        }
        {currentUser && (
          <>
            <form
            onSubmit={handleSubmit}
            className='border border-teal-500 rounded-md p-3'
            >
                <Textarea
                placeholder='Add a comment'
                rows='3'
                maxLength='200'
                onChange={(e)=>setComment(e.target.value)}
                />
                <div className='flex justify-between items-center mt-5'>
                <p className='text-gray-500 text-xs'>
                    {200 - comment.length} characters remaining</p>
                    <Button outline gradientDuoTone='purpleToBlue' type='submit'>
                        Submit
                    </Button>
                </div>
                {commentError && (
            <Alert color='failure' className='mt-5'>
              {commentError}
            </Alert>
          )}
            </form>
            </>
        )}
        {comments.length === 0 ? (
        <p className='text-sm my-5'>No comments yet!</p>
      ) : (
        <>
          <div className='text-sm my-5 flex items-center gap-1'>
            <p>Comments</p>
            <div className='border border-gray-400 py-1 px-2 rounded-sm'>
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => (
            <Comment key={comment._id} comment={comment} onLike={handleLike} onEdit={handleEdit}   onDelete={(commentId) => {
              setShowModal(true);
              setCommentToDelete(commentId);
            }}
             />
          ))}
        </>
      )}
        <Modal show={showModal} onClose={()=>setShowModal(false)} popup size='md'>
      <Modal.Header/>
      <Modal.Body>
         <div className="text-center">
          <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 md-4 mx-auto' />
        <h3 className='mb-5 text-md text-gray-500 dark:text-gray-400' >Are you sure you want to delete this post ?</h3>
        <div className='flex justify-center gap-4 ' >
        <Button
                color='failure'
                onClick={() => handleDelete(commentToDelete)}
              >
                Yes, I'm sure
              </Button>
          <Button 
          color='success' 
          onClick={() => setShowModal(false)} >No, cancel
          </Button>
        </div>
         </div>
      </Modal.Body>
     </Modal>
    </div>
  );
}

export default CommentSection
