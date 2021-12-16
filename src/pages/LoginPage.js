import {
  Container,
  FormWrap,
  Icon,
  FormContent,
  Form,
  FormH1,
  FormLabel,
  FormInput,
  FormButton,
  FormText,
} from "./signinElements";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../lib/firebase";

const LoginPage = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const { currentUser, signin, signout } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await signin(auth, emailRef.current.value, passwordRef.current.value);
      setLoading(false);
      navigate("/edit");
    } catch {
      setLoading(false);
      setError("Failed to sign in");
    }
  }

  async function handleSignout() {
    try {
      await signout();
      setError("");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <Container>
        <FormWrap>
          <FormContent>
            <Form onSubmit={handleSubmit}>
              {!currentUser && <FormH1>Sign in to your account</FormH1>}
              {currentUser && (
                <FormH1>
                  Welcome, {currentUser.email.split("@")[0] + "!"}
                </FormH1>
              )}
              {/* <FormLabel htmlFor="for"></FormLabel> */}
              {!currentUser && (
                <FormInput
                  type="email"
                  required
                  placeholder="email"
                  ref={emailRef}
                ></FormInput>
              )}
              {/* <FormLabel htmlFor="for"></FormLabel> */}
              {!currentUser && (
                <FormInput
                  type="password"
                  required
                  placeholder="password"
                  ref={passwordRef}
                ></FormInput>
              )}
              {!currentUser && (
                <FormButton type="submit" disabled={loading}>
                  Log In
                </FormButton>
              )}
              {currentUser && (
                <FormButton
                  type="submit"
                  disabled={loading}
                  onClick={handleSignout}
                >
                  Log Out
                </FormButton>
              )}
              {!currentUser && <FormText>Forgot password?</FormText>}
              {error && <FormText>{error}</FormText>}
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default LoginPage;
