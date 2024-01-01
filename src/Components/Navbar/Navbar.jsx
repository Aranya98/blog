import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "./navbar.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Islogin } from "../../Store/reducer";
function BlogNav() {
  const { islogin } = useSelector((state) => state.blog);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      fixed="top"
      bg="dark"
      data-bs-theme="dark"
      className="bg-body-tertiary"
    >
      <Container>
        <Navbar.Brand>My Blogs</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <label className={styles.nav_labels} onClick={() => navigate("/")}>
              Home
            </label>
          </Nav>
          <Nav>
            <div className="d-flex">
              {" "}
              {!sessionStorage.getItem("username") && (
                <label
                  onClick={() => navigate("/login")}
                  className={styles.login_btn}
                >
                  Sign In
                </label>
              )}
              {!sessionStorage.getItem("username") && (
                <label
                  className={`${styles.login_btn} mx-3`}
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </label>
              )}
            </div>
            {islogin && sessionStorage.getItem("username") && (
              <label
                className={`${styles.login_btn} mx-3`}
                onClick={() => {
               
                    sessionStorage.removeItem("username");
                  dispatch(Islogin(false))
                }}
              >
                Sign Out
              </label>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BlogNav;
