import styled from 'styled-components';

export const Spinner = ({ isOpen }) => {
  return (
    <>
      {isOpen ? (
        <SpinnerBackdrop>
          <img
            src={process.env.PUBLIC_URL + '/img/spinner.svg'}
            alt="spinner"
          />
        </SpinnerBackdrop>
      ) : null}
    </>
  );
};

const SpinnerBackdrop = styled.div`
  background: rgba(1, 1, 1, 0.4);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 160px;
  }

  @media screen and (max-width: 767px) {
    img {
      width: 120px;
    }
  }
`;
