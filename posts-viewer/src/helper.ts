import { Post } from './types/Post';

export const postHelper = (
  posts: Post[],
  count: number,
  currentPage: number
) => {
  const offset = (currentPage - 1) * count;
  const endIndex = offset + count;
  return posts.slice(offset, endIndex);
};

export const pageHelper = (
  posts: Post[],
  count: number,
  currentPage: number
) => {
  const pagesQuantity = Math.ceil(posts.length / count); // Округляем вверх, чтобы учесть остаток
  return pagesQuantity;
};


export const sortPostsByDate = (posts: Post[], sortType: 'asc' | 'desc'): Post[] => {
  return [...posts].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    if (sortType === 'asc') {
      return dateA.getTime() - dateB.getTime();
    } else {
      return dateB.getTime() - dateA.getTime();
    }
  });
};

export const sortPostsByViews = (
  posts: Post[],
  sortType: 'asc' | 'desc'
): Post[] => {
  return [...posts].sort((a, b) => {
    if (sortType === 'asc') {
      return a.views.count - b.views.count;
    } else {
      return b.views.count - a.views.count;
    }
  });
};
