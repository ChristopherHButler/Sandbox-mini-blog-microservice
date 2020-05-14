import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

const PostList = () => {

  const [posts, setPosts] = useState({});

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    // not going to actual posts.com, we overrided the hosts file
    const res = await axios.get('http://posts.com/posts');
    console.log('res: ', res.data);
    setPosts(res.data);
  };

  const renderedPosts = Object.values(posts).map(post => {
    return (
      <div key={post.id} className="card" style={{ width: '30%', marginBottom: '20px' }}>
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentList comments={post.comments} />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    );
  });


  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};

export default PostList;
