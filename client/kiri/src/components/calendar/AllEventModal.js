import styled from 'styled-components';

export const AllEventModal = ({ isOpen, setIsOpen }) => {
  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };
  return (
    <AllEventModalContainer>
      {isOpen ? (
        <AllEventModalBackdrop onClick={openModalHandler}>
          <AllEventModalView></AllEventModalView>
        </AllEventModalBackdrop>
      ) : null}
    </AllEventModalContainer>
  );
};

const AllEventModalContainer = styled.div``;

const AllEventModalBackdrop = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AllEventModalView = styled.div`
  width: 600px;
  height: 300px;
  background-color: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
    0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07),
    0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);
`;
