"use client";

import React, { useEffect, useState } from 'react'
import PromptCard from './PromptCard';


interface Post {
  tag: string;
  prompt: string;
  [key: string]: any; // Optional, if there are other unknown properties
}
interface PromptCardListProps {
  data: Post[]; // Expecting an array of posts
  handleTagClick: (tag: string) => void; // Function to handle tag clicks
}

const PromptCardList: React.FC<PromptCardListProps> = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post: Post) => (
        <div key={post._id}>
          {/* Replace with actual content */}
          <PromptCard post={post} handleTagClick={handleTagClick} />
        </div>
      ))}
    </div>
  );
};


const Feed = () => {



  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [searchedResults, setSearchedResults] = useState<Post[]>([]);


  const fetchPosts = async () => {
    
    const response = await fetch("/api/prompt");
    console.log(response);
    
    const data = await response.json();

    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchtext: string) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item?.tag) ||
        regex.test(item?.prompt)
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };


  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {/* All Prompts */}
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  )
}

export default Feed