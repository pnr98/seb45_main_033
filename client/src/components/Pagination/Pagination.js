import React from 'react';
import { Container, PageButton } from './Pagination.Styled';

const Pagination = ({ totalRecipes, recipesPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalRecipes / recipesPerPage);
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <Container>
            {pages.map(page => (
                <PageButton
                    key={page}
                    className={page === currentPage ? 'active' : ''}
                    onClick={() => { 
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        });
                        onPageChange(page); 
                    }}
                >
                    {page}
                </PageButton>
            ))}
        </Container>
    );
};

export default Pagination;
