import styled from "styled-components";

export const LogoutBlock = styled.div`
  padding: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
  max-width: 250px;
  color: rgba(110, 52, 53, 1);
  grid-area: singin;

  .user-wrapper {
    margin-right: 1rem;

    .user-name {
      margin-bottom: 0.3rem;
    }

    .user-button {
      border: none;
      background-color: transparent;
    }

    .user-button:hover {
      color: rgba(110, 52, 53, 0.3);
    }

    span {
      margin: 0 0.5rem;
    }
  }
`;
