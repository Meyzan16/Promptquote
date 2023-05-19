'use client';

import React from 'react';
import {useState, useEffect} from 'react';

import PromptCard from './PromptCard';


const PromptCardList = ({data,handleTagClick }) => {
  return (
    <div className='w-full grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {
        data.map((post) => (
          <PromptCard 
            key={post._id} 
            post={post} 
            handleTagClick={handleTagClick}/>
        ))
      }
    </div>
  )
}

const Feed = () => {
  
  

  const [seacrhtext, setSeacrhtext] = useState('');
  const [seacrhTimeout, setseacrhTimeout] =  useState(null);
  const [searchResults, setsearchResults] =  useState([]);

  const [posts, setPosts] = useState([]);


  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch ('/api/prompt');
      const data = await response.json();

      setPosts(data);
    }
    fetchPosts();
  },[]);

  const filterPrompts = (seacrhtext) => {
    const regex = new RegExp(seacrhtext, "i"); // "i" flag for case-insensitive search
    return posts.filter(
      (item) => 
        regex.test(item.creator.username) ||
        regex.test(item.prompt) ||
        regex.test(item.tag)

    );
  }

  const handleSearchChange = (e) => {
    clearTimeout(seacrhTimeout);
    setSeacrhtext(e.target.value);

    //debouce method
    setseacrhTimeout(
      setTimeout(()=>{
        const searchResult = filterPrompts(e.target.value);
        setsearchResults(searchResult);
      },500)
    )
  }

  const handleTagClick = (tagName) => {
    setSeacrhtext(tagName);

    const searchResult = filterPrompts(tagName);
    setsearchResults(searchResult);
  };

  return (
    <>

      <section className='mt-16 mb-12'>
          <form>
            <input 
              type="text" placeholder="Search for a tag or a username"
              value={seacrhtext}
              onChange={handleSearchChange}
              required
              className='search_input peer'
            />

             {/* All Prompts */}
              {seacrhtext ? (
                <PromptCardList
                  data={searchResults}
                  handleTagClick={handleTagClick}
                />
              ) : (
                <PromptCardList data={posts} handleTagClick={handleTagClick} />
              )}

           
          </form>
      </section>

 
    </>
  )
}

export default Feed
