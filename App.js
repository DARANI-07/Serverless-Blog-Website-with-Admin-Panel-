import React, { useState, useEffect } from 'react';
import { API, Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';

function App({ signOut }) {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  async function fetchPosts() {
    const res = await API.get('BlogAPI', '/posts');
    setPosts(res);
  }

  async function addPost() {
    await API.post('BlogAPI', '/posts', { body: { title, content } });
    fetchPosts();
  }

  async function deletePost(id) {
    await API.del('BlogAPI', `/posts/${id}`);
    fetchPosts();
  }

  useEffect(() => { fetchPosts(); }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>My Serverless Blog</h1>
      <button onClick={signOut}>Sign Out</button>
      <div style={{ margin: 20 }}>
        <input value={title} placeholder="Title" onChange={e => setTitle(e.target.value)}/>
        <textarea value={content} placeholder="Content" onChange={e => setContent(e.target.value)}/>
        <button onClick={addPost}>Add Post</button>
      </div>
      {posts.map(p => (
        <div key={p.postId} style={{ border: '1px solid #ccc', margin: 10, padding: 10 }}>
          <h3>{p.title}</h3>
          <p>{p.content}</p>
          <button onClick={() => deletePost(p.postId)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default withAuthenticator(App);
