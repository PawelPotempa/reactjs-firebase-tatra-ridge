import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormWrap = styled.div`
  height: 50%;
  width: 50%;

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
  }
`;

export const Icon = styled.div`
  margin-left: 32px;
  margin-top: 32px;
  text-decoration: none;
  color: #fff;
  font-weight: 700;
  font-size: 32px;
`;

export const FormContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Form = styled.form`
  background: #010101;
  z-index: 1;
  display: grid;
  margin: 0 auto;
  padding: 80px 32px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);
`;

export const FormH1 = styled.h1`
  margin-bottom: 40px;
  color: #fff;
  font-size: 20px;
  font-weight: 400;
  text-align: center;
`;

export const FormLabel = styled.label`
  margin-bottom: 8px;
  font-size: 14px;
  color: #fff;
`;

export const FormInput = styled.input`
  padding: 16px 16px;
  margin-bottom: 32px;
  border: none;
  border-radius: 4px;
`;

export const FormButton = styled.button`
  padding: 16px 0;
  border: none;
  border-radius: 4px;
  color: #000;
  font-size: 20px;
  cursor: pointer;
`;

export const FormText = styled.span`
  text-align: center;
  margin-top: 24px;
  color: #fff;
  font-size: 14px;
`;
