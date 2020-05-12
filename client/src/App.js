import React, { Fragment } from 'react';

import Header from './components/Header';
import PostCreate from './components/PostCreate';
import PostList from './components/PostList';


export default () => {
  return (
    <Fragment>
      <Header title="Mini Microservice"/>
      <div className="container">
        <h1>Create Post</h1>
        <PostCreate />
        <hr />
        <h1>Posts</h1>
        <PostList />
      </div>
    </Fragment>
  );
};