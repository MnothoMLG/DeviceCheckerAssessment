import styled from 'styled-components/native';

export const CardButton = styled.TouchableOpacity`
  background: #fff;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  border-radius: 5px;
  height: 100px;
  margin: 12px;
`;

export const Thumbnail = styled.Image`
  width: 100px;
  height: 100px;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
  resize-mode: cover;
`;
