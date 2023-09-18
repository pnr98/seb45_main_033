import React, { useEffect } from 'react';

const InfiniteScroll = ({ children, loadMore }) => {
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        loadMore();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loadMore]);

  return <>{children}</>;
};

export default InfiniteScroll;
