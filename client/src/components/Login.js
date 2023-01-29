import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../AuthContext";
import { authenticate } from "../services/authApi";
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Input,
  Message,
  Segment,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [visibilityIcon, setVisibilityIcon] = useState("eye slash");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const auth = useContext(AuthContext);

  const history = useHistory();

  const handleChange = (evt) => {
    console.log(evt);
    const nextCredentials = { ...credentials };
    nextCredentials[evt.target.name] = evt.target.value;
    setCredentials(nextCredentials);
    console.log(credentials);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    authenticate(credentials)
      .then((data) => {
        auth.login(data.jwt_token);
        history.push("/profile");
      })
      .catch((error) => {
        toast.error(`${error}`);
      });
  };

  return (
    // <div>
    //     <h2>Login</h2>
    //     <form onSubmit={handleSubmit}>
    //         <div>
    //             <label className="form-label">Username</label>
    //             <input className="form-control" type="text" value={credentials.username} name="username" onChange={handleChange} />
    //         </div>
    //         <div>
    //             <label className="form-label">Password</label>
    //             <input className="form-control" type="password" value={credentials.password} name="password" onChange={handleChange} />
    //         </div>
    //         <Button className="btn btn-primary" type="submit">Submit</Button>
    //     </form>

    // </div>

    <Grid
      textAlign="center"
      style={{ overflow: "hidden", marginTop: "10%" }}
      verticalAlign="bottom"
    >
      <Grid.Column
        style={{
          maxWidth: 450,
          background: "rgba(0, 0, 0, 0.4)",
          border: "thin solid rgba(0, 0, 0, 0.6)",
          boxShadow: "box-shadow: rgba(0, 0, 0, 0.5) 5px 5px 20px",
          borderRadius: "10px",
          paddingBottom: "20px",
        }}
      >
        <Header as="h2" color="teal" textAlign="center">
          <Icon name="map signs" /> Log-in to your account
        </Header>
        <Form size="large" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              name="username"
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
              type="text"
              value={credentials.username}
              onChange={handleChange}
            />
            <div className="password-input-div">
              <Form.Input
                fluid
                name="password"
                icon={
                  <Icon
                    name={visibilityIcon}
                    link
                    onClick={() => {
                      setShowPassword((prevState) => !prevState);
                      visibilityIcon === "eye"
                        ? setVisibilityIcon("eye slash")
                        : setVisibilityIcon("eye");
                    }}
                  />
                }
                iconPosition="left"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={credentials.password}
                onChange={handleChange}
              />
            </div>

            <Button color="teal" fluid size="large" type="submit">
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <Link to="/register">Register</Link>
        </Message>
        <Message>
          Demo credentials: <br />
          Email: demo@demo.com <br />
          Password: demo#2023
        </Message>
      </Grid.Column>
    </Grid>
  );
}

export default Login;
