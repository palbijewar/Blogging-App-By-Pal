import { Table, Modal, Button, Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

function DashPosts() {
    const [userPosts, setUserPosts] = useState([]);
    const { currentUser } = useSelector(state => state.user);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const res = await fetch(`http://localhost:3000/api/posts?user_id=${currentUser._id}`);
                const data = await res.json();
                if (res.ok) {
                    setLoading(false);
                    if (data && data.length < 9) {
                        setShowMore(false);
                    }
                    if (data && data.allPosts) {
                        setUserPosts(data.allPosts);
                    }
                }
            } catch (error) {
                setLoading(false);
                console.log(error.message);
            }
        };

        if (currentUser && currentUser.is_admin) {
            fetchPosts();
        }
    }, [currentUser]);

    const handleShowMore = async () => {
        const startIndex = userPosts.length;
        try {
            const res = await fetch(`http://localhost:3000/api/posts?user_id=${currentUser._id}&startIndex=${startIndex}`);
            const data = await res.json();
            if (res.ok) {
                setUserPosts(prev => [...prev, ...data.allPosts]);
                if (data.allPosts.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleDeletePost = async () => {
        setShowModal(false);
        try {
            const res = await fetch(`http://localhost:3000/api/posts/${postIdToDelete}/${currentUser._id}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                setUserPosts(prev => prev.filter(post => post._id !== postIdToDelete));
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    if (loading) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <Spinner size='xl' />
            </div>
        );
    }

    if (!currentUser.is_admin) {
        return <p>You do not have permission to view this page.</p>;
    }

    if (userPosts.length === 0) {
        return <p>You have no posts to show.</p>;
    }

    return (
        <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
            {currentUser.is_admin && userPosts.length > 0 ? (
                <>
                    <Table hoverable className='shadow-md'>
                        <Table.Head>
                            <Table.HeadCell>Date updated</Table.HeadCell>
                            <Table.HeadCell>Post image</Table.HeadCell>
                            <Table.HeadCell>Post title</Table.HeadCell>
                            <Table.HeadCell>Category</Table.HeadCell>
                            <Table.HeadCell>Delete</Table.HeadCell>
                            <Table.HeadCell><span>Edit</span></Table.HeadCell>
                        </Table.Head>
                        <Table.Body>
                            {userPosts.map(post => (
                                <React.Fragment key={post._id}>
                                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                        <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                                        <Table.Cell>
                                            <Link to={`/post/${post.slug}`}>
                                                <img src={post.image} alt={post.title} className='w-20 h-10 object-cover bg-gray-500' />
                                            </Link>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Link className='font-medium text-gray-900 dark:text-white' to={`/post/${post.slug}`}>{post.title}</Link>
                                        </Table.Cell>
                                        <Table.Cell>{post.category}</Table.Cell>
                                        <Table.Cell>
                                            <span className='font-medium text-red-500 hover:underline cursor-pointer' onClick={() => { setShowModal(true); setPostIdToDelete(post._id); }}>Delete</span>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Link className='text-teal-500 hover:underline' to={`/update-post/${post._id}`}><span>Edit</span></Link>
                                        </Table.Cell>
                                    </Table.Row>
                                </React.Fragment>
                            ))}
                        </Table.Body>
                    </Table>
                    {showMore && (
                        <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>Show more</button>
                    )}
                </>
            ) : (
                <p>You have no posts to show</p>
            )}
            <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 md-4 mx-auto' />
                        <h3 className='mb-5 text-md text-gray-500 dark:text-gray-400'>Are you sure you want to delete this post ?</h3>
                        <div className='flex justify-center gap-4'>
                            <Button color='failure' onClick={handleDeletePost}>Yes, I am sure</Button>
                            <Button color='success' onClick={() => setShowModal(false)}>No, cancel</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default DashPosts;
