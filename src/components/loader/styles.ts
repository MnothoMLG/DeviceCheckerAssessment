import { Styles } from 'react-modal';
import styled from "styled-components";

export const OutterWrapper = styled.div`
  height: 100%;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 16px;
`;

export const customStyles : Styles = {
  content: {
    display: "flex",
    alignItems: "center",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    backgroundColor: "rgba(49, 14, 90, 0.2)",
  },
  overlay: {
    position: 'fixed',
    zIndex: 9999,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  }
};
