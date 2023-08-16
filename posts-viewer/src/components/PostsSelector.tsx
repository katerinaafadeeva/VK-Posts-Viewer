import React, { FC, ChangeEvent } from 'react';
import './styles/PostSelector.css';

type PostPerPageSelectorProps = {
  postPerPage: number;
  setPostPerPage: (newPostPerPage: number) => void;
  setCurrentPage: (newPage: number) => void;
};

const PostPerPageSelector: FC<PostPerPageSelectorProps> = ({
  postPerPage,
  setPostPerPage,
  setCurrentPage, 
}) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newPostPerPage = parseInt(e.target.value);
    setPostPerPage(newPostPerPage);
    setCurrentPage(1); // Сброс текущей страницы при изменении постов на странице
  };

  return (
    <div className="selector-div">
      <p className="p-selector"> Отображать постов:</p>
      <select
        value={postPerPage}
        onChange={handleChange}
        className="number-select"
      >
        <option value={5} className="selector-option" >
          5
        </option>
        <option value={10} className="selector-option">
          10
        </option>
        <option value={50} className="selector-option">
          50
        </option>
      </select>
    </div>
  );
};
export default PostPerPageSelector;
