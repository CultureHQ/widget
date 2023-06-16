import React from "react";
import styled from "styled-components";

const ChqPag = styled.nav`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 0 20px;
`;

const FlexRow = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`;

const ChqPagBtn = styled.button`
  background: #fff;
  border: #ddd solid 1px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 1em;
  font-weight: normal;
  height: 16px;
  line-height: 1.4;
  margin: 0 3px;
  outline: none;
  padding: 0;
  width: 16px;

  &[aria-current='true'] {
    background-color: #8cb4d6;
    border-color: #8cb4d6;
    color: #fff;
  }

  &.chq-pag--bn-small {
    height: 12px;
    width: 12px;
  }
`;

const PageLink = ({
  children, current, disabled, onClick, page, smallCircle
}) => {
  const onButtonClick = () => {
    if (!current) {
      onClick(page);
    }
  };

  return (
    <ChqPagBtn
      type="button"
      disabled={disabled}
      aria-current={current}
      onClick={onButtonClick}
      className={smallCircle ? "chq-pag--bn-small" : ""}
    >
      {children}
    </ChqPagBtn>
  );
};

const Page = ({ children, page, ...props }) => (
  <PageLink page={page} {...props}>
    {children}
  </PageLink>
);

const IconsPagination = ({
  currentPage = 1,
  onClick,
  totalPages
}) => {
  if (totalPages < 2) {
    return null;
  }

  const innerWindow = (
    [...Array(3)].map((_, index) => index + currentPage - 1)
      .filter(page => page >= 1 && page <= totalPages)
  );

  return (
    <ChqPag>
      <FlexRow>
        {currentPage > 2 && (
          <Page
            current={currentPage === 1}
            onClick={onClick}
            page={1}
            smallCircle
          />
        )}
        {innerWindow.map(page => (
          <Page key={page} page={page} current={page === currentPage} onClick={onClick} />
        ))}
        {currentPage < totalPages - 1 && (
          <Page
            current={currentPage === totalPages}
            onClick={onClick}
            page={totalPages}
            smallCircle
          />
        )}
      </FlexRow>
    </ChqPag>
  );
};

export default IconsPagination;
