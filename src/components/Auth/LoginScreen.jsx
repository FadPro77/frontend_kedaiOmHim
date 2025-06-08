import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../redux/slices/auth";
import { login, googleLogin } from "../../service/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { BsGoogle } from "react-icons/bs";
import bgHome from "../../assets/img/div-main-container.png";

function LoginScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { token } = useSelector((state) => state.auth);

  if (token) {
    navigate({ to: "/" });
  }

  const { mutate: loginUser } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      dispatch(setToken(data?.token));
      navigate({ to: "/" });
    },
    onError: (err) => {
      toast.error(err?.message);
    },
  });

  const { mutate: googleLoginUser } = useMutation({
    mutationFn: (accessToken) => googleLogin(accessToken),
    onSuccess: (data) => {
      dispatch(setToken(data?.token));
      navigate({ to: "/" });
    },
    onError: (err) => {
      toast.error(err.message || "Google login failed");
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    loginUser({ email, password });
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      googleLoginUser(tokenResponse.access_token);
    },
    onError: (err) => {
      toast.error("Google login error");
      console.error(err);
    },
  });

  return (
    <section
      className="d-flex justify-content-center align-items-center vh-100 position-relative overflow-hidden"
      style={{
        backgroundImage: `url(${bgHome})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container>
        <Row className="justify-content-center position-relative">
          <Col
            md={6}
            lg={4}
            style={{
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(26, 33, 41, 0.7)",

              borderRadius: "0.5rem",
            }}
            className=" rounded-4 shadow-lg p-4 position-relative"
          >
            <Button variant="" as={Link} to="/" className="position-absolute">
              <i className="bi bi-arrow-left fw-bold text-white fs-3"></i>
            </Button>

            <div className="text-center mt-4">
              <h2 className="fw-bold text-white">Login</h2>
            </div>

            <Form onSubmit={onSubmit} className="z-3 p-5">
              <Form.Group className="mb-3 text-white">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3 text-white">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="dark" type="submit" className="w-100 mt-3">
                Login
              </Button>

              <div className="d-grid gap-2 mt-3">
                <Button onClick={handleGoogleLogin} variant="dark">
                  <img
                    src="googleLogo.svg"
                    alt="Google"
                    style={{ width: 25, height: 25, marginRight: -1 }}
                  />
                  oogle Login
                </Button>
              </div>
              <span className="d-block text-center text-white mt-3">
                Belum punya akun?{" "}
                <Link to="/register" className="text-decoration-underline">
                  Daftar Sekarang
                </Link>
              </span>
            </Form>
          </Col>

          <div className="decoration position-absolute top-50 z-n1 start-100 translate-middle">
            <img src="img/car.png" alt="Decoration" className="img-fluid" />
          </div>
        </Row>
      </Container>
    </section>
  );
}

export default LoginScreen;
