import React from "react";
import styled from "styled-components";

const ChqPag = styled.nav`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 0 20px;
`;

const ChqIconPagSimple = styled.nav`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 20px 25px 5px;

  &.flx-row-simple {
    align-items: center;
    display: flex;
    flex-direction: row;
  }
`;

const NavSimple = styled.button`
  background-color: #888;
  border: 0;
  border-radius: 10px;
  height: 7px;
  margin: 3px;
  padding: 0;
  width: 7px;

  &:hover {
    cursor: default;
  }

  &[aria-current='true'] {
    background-color: #fff;
    border-color: #fff;
    color: $color-white;
  }
  `;

const PageLink = ({
  children, current, disabled, onClick, page, smallCircle
}) => {
  return (
    <NavSimple
      type="button"
      disabled={disabled}
      aria-current={current}
    >
      {children}
    </NavSimple>
  );
};

const Page = ({ children, page, ...props }) => (
  <PageLink page={page} {...props}>
    {children}
  </PageLink>
);

const IconsPaginationSimple = ({
  currentPage = 1,
  totalPages
}) => {
  if (totalPages < 2) {
    return null;
  }

  const innerWindow = [...Array(totalPages)].map((_, index) => index + 1);

  return (
    <ChqPag>
      <ChqIconPagSimple>
      <div className="flx-row-simple">
        {innerWindow.map(page => (
          <Page key={page} current={page === currentPage} />
        ))}
      </div>
      </ChqIconPagSimple>
    </ChqPag>
  );
};

export default IconsPaginationSimple;
