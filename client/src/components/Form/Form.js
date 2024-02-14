import { TextField, Button, Typography, Paper } from '@mui/material';
import { createPost, updatePost } from '../../actions/posts';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import FileBase from 'react-file-base64';
import './styles.css';


const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedfile: '',
    });

    const dispatch = useDispatch();
    const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if (post) {
            console.log("Post data:", post);
            setPostData(post);
        }
    }, [post]);


    const clear = () => {
        setCurrentId(0);
        setPostData({ title: '', message: '', tags: '', selectedfile: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId === 0) {
            dispatch(createPost({ ...postData, name: user?.result?.name }));
            clear();
        } else {
            console.log(user?.result?.name);
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
            clear();
        }
    };

    if (!user?.result?.name) {
        return (
            <Paper className='paper' elevation={6}>
                <Typography variant="h6" align="center" className='signintointeract'>
                    Sign in to create and interact.
                </Typography>
            </Paper>
        );
    }



    return (
        <Paper className='paper' elevation={6}>
            <form autoComplete="off" noValidate className='form' onSubmit={handleSubmit}>
                <Typography variant="h6" style={{ marginBottom: '7px', color: '#c8102e' }}>
                    {currentId ? 'Edit' : 'Post'}
                </Typography>

                <TextField
                    name='title'
                    variant='outlined'
                    label="Title"
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                    style={{ marginBottom: '7px', fontSize: '18px' }}
                />

                <TextField
                    name='Message'
                    variant='outlined'
                    label="Message"
                    fullWidth
                    value={postData.message}
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                    style={{ marginBottom: '7px'}}
                />

                <TextField
                    name='tags'
                    variant='outlined'
                    label="Tags"
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
                />

                <div className="fileInput">
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => setPostData({ ...postData, selectedfile: base64 })}
                    />
                </div>

                <Button
                    className='buttonSubmit'
                    variant='contained'
                    color='primary'
                    size='large'
                    type='submit'
                    fullWidth
                    style={{ marginBottom: '10px', backgroundColor: '#c8102e' }}
                >
                    Post
                </Button>
                <Button
                    variant='outlined'
                    size='small'
                    onClick={clear}
                    fullWidth
                    style={{ backgroundColor: 'white', color: '#c8102e' }}
                >
                    Clear
                </Button>
            </form>
        </Paper>
    );
};

export default Form;
