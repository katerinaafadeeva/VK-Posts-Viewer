import React from 'react';
import './styles/PostTable.css';
import { Post } from '../types/Post';
type PostTableProps = {
  post: Post;
};
const PostTable: React.FC<PostTableProps> = ({ post }) => {
  return (
    <tr className="tr-post-sep">
      <td className="th-post-sep">{post.text}</td>
      <td className="th-post-sep">
        {new Date(post.date * 1000).toLocaleDateString()}
      </td>
      <td className="th-post-sep">{post.views.count}</td>
      <td className="th-post-sep">{post.likes.count}</td>
      <td className="th-post-sep">{post.reposts.count}</td>
    </tr>
  );
};

export default PostTable;
