

interface Post {
  tag: string;
  prompt: string;
  [key: string]: any; // Optional, if there are other unknown properties
}

interface PromptCardProps {
  post: Post;
  handleTagClick: (tag: string) => void;
}



import React from 'react'

const PromptCard: React.FC<PromptCardProps>  = ({ post, handleTagClick }) => {
  return (
    <div>
    <p>{post.prompt}</p>
    <button onClick={() => handleTagClick(post.tag)}>Click Tag</button>
  </div>
  )
}

export default PromptCard