import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import IdeaList from './IdeaList';

const IdeaForm = () => {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [text, setText] = useState('');
  const [tag, setTag] = useState('');
  //const [ideaList, setIdeaList] = useState(new IdeaList());

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text || !tag || !username) {
      alert('Please enter all fields');
      return;
    }

    localStorage.setItem('username', username);

    const idea = {
      text,
      tag,
      username,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/ideas', idea);
      const newIdea = response.data;

      //ideaList.addIdeaToList(newIdea);

      setText('');
      setTag('');
      setUsername('');

      document.dispatchEvent(new Event('closemodal'));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">Enter a Username</label>
        <input
          type="text"
          className="form-control"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="idea-text">What's Your Idea?</label>
        <textarea
          className="form-control"
          id="idea-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="tag">Tag</label>
        <input
          type="text"
          className="form-control"
          id="tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default IdeaForm;
