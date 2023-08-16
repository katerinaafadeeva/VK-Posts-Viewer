import React, { useState, useEffect, ChangeEvent } from 'react';
import api from './api';
import { useAppContext } from '../src/AppContext';
import PostTable from '../src/components/PostTable';
import { v4 as uuidv4 } from 'uuid';
import '../src/style/App.css';
import PostPerPageSelector from './components/PostsSelector';
import {
  pageHelper,
  postHelper,
  sortPostsByDate,
  sortPostsByViews,
} from './helper';
import { Post } from './types/Post';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App: React.FC = (): JSX.Element => {
  const { state, dispatch } = useAppContext();
  const [accessToken, setAccessToken] = useState('');
  const [groupId, setGroupId] = useState('');
  const [postCount, setPostCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [postPerPage, setPostPerPage] = useState(5); // селектор кол-ва постов
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState<'asc' | 'desc'>('asc'); // По умолчанию asc
  const [sortOption, setSortOption] = useState<'date' | 'views'>('date'); // По умолчанию сортировка по дате

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        dispatch({ type: 'FETCH_SUCCESS', payload: [] });
        const response = await api.get(`http://localhost:3001/api/posts`, {
          params: {
            access_token: accessToken,
            owner_id: groupId,
            count: postCount,
          },
        });

        if (
          Array.isArray(response.data) &&
          response.data.length > 0 &&
          response.data[0].attachments
        ) {
          const posts = response.data;

          dispatch({ type: 'FETCH_SUCCESS', payload: posts });
        } else {
          setError('Invalid response data structure');
        }
      } catch (error) {
        setError('Failed to fetch posts');
      }
    };

    if (accessToken && groupId && postCount > 0) {
      fetchData();
    }
  }, [accessToken, groupId, postCount, postPerPage, dispatch]);

  const closeErrorModal = () => {
    setError(null);
  };

  const pagesQuantity = pageHelper(state.posts, postPerPage, currentPage);

  // состояние для пагинации:
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Обработчик переключения страницы "Next"
  const handleNextPage = () => {
    const totalPages = pageHelper(state.posts, postPerPage, currentPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // сортировка

  const handleChangeSortOption = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value as 'date' | 'views');
  };
  const handleSortTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortType(event.target.value as 'asc' | 'desc');
  };

  const sortedPosts: Post[] =
    sortOption === 'date'
      ? sortPostsByDate(state.posts, sortType)
      : sortPostsByViews(state.posts, sortType);

  // push:
  useEffect(() => {
    notification(); // Вызываем уведомление при загрузке компонента
  }, []);
  const notification = () => {
    const customBody = (
      <div className="toast-custom">
        Для использования приложения тебе понадобится access token ВКонтакте{' '}
        <a
          className="toast-link"
          href="https://vkhost.github.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          получить
        </a>
        .
      </div>
    );
    toast.info(customBody, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <>
      <div className="app">
        <ToastContainer />
        <div className="side-animation left-side"></div>
        <div className="side-animation right-side"></div>
      </div>

      <h1 className="header-h">Просмотр постов ВКонтакте</h1>
      <div className="table-info">
        <div className="table-first">
          <label className="lable-info">Access Token:</label>
          <input
            className="token-input"
            type="text"
            value={accessToken}
            onChange={(e) => setAccessToken(e.target.value)}
            required
          />
        </div>
        <div className="table-first">
          <label className="lable-info">Group ID:</label>
          <input
            className="token-input"
            type="text"
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
            required
          />
        </div>
        <div className="table-first">
          <label className="lable-info">Кол-во постов:</label>
          <input
            className="token-input"
            type="number"
            defaultValue={postCount}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value)) {
                setPostCount(value);
              }
            }}
            inputMode="numeric"
            min="1"
            max="9999"
            required
          />
          {isNaN(postCount) && (
            <p className="error-message">Введите корректное число</p>
          )}
        </div>
      </div>
      {postCount >= 10 && (
        <PostPerPageSelector
          postPerPage={postPerPage}
          setPostPerPage={setPostPerPage}
          setCurrentPage={setCurrentPage}
        />
      )}
      <select
        value={sortType}
        onChange={handleSortTypeChange}
        className="sort-select-date"
      >
        <option value="asc" className="asc-option">
          По возрастанию
        </option>
        <option value="desc" className="desc-option">
          По убыванию
        </option>
      </select>
      <select
        value={sortOption}
        onChange={handleChangeSortOption}
        className="sort-date-views"
      >
        <option value="date" className="date-option">
          По дате
        </option>
        <option value="views" className="views-option">
          По просмотрам
        </option>
      </select>

      {state.posts.length > 0 && pagesQuantity && (
        <div className="pagination-container">
          <div className="pagination">
            <button onClick={handlePreviousPage}>Предыдущая</button>
            <span>Страница {currentPage}</span>
            <button onClick={handleNextPage}>Следующая</button>
          </div>
        </div>
      )}
      {error && (
        <div className="error-modal">
          <div className="error-content">
            <p className="error-message">{error}</p>
            <button className="close-button" onClick={closeErrorModal}>
              Закрыть
            </button>
          </div>
        </div>
      )}

      {state.loading ? (
        <p className="loading">Loading...</p>
      ) : state.error ? (
        <p className="reading-error">Error: {state.error}</p>
      ) : (
        <>
          <table className="post-table">
            <thead className="thead-post">
              <tr className="tr-post">
                <th className="th-post">Текст поста</th>
                <th className="th-post">Дата публикации</th>
                <th className="th-post">Кол-во просмотров</th>
                <th className="th-post">Кол-во лайков</th>
                <th className="th-post">Кол-во репостов</th>
              </tr>
            </thead>
            <tbody>
              {state.posts.length > 0 &&
                postHelper(sortedPosts, postPerPage, currentPage).map(
                  (post: Post) => <PostTable key={uuidv4()} post={post} />
                )}
            </tbody>
          </table>
        </>
      )}
      {state.posts.length > 0 && pagesQuantity && (
        <div className="pagination-container">
          <div className="pagination">
            <button onClick={handlePreviousPage}>Предыдущая</button>
            <span>Страница {currentPage}</span>
            <button onClick={handleNextPage}>Следующая</button>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
