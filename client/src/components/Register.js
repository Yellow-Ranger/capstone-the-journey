import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Message,
  Segment,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { register, authenticate } from "../services/authApi";
import ErrorSummary from "../ErrorSummary";
import AuthContext from "../AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [confirmPass, setConfirmPass] = useState({ confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const auth = useContext(AuthContext);

  const history = useHistory();

  useEffect(() => {
    if (auth.user.username) {
      history.push("/create/profile");
    }
  }, [auth, history]);

  const handleChange = (evt) => {
    const nextCredentials = { ...credentials };
    const nextConfirmPass = { ...confirmPass };
    nextCredentials[evt.target.name] = evt.target.value;
    nextConfirmPass[evt.target.name] = evt.target.value;
    setCredentials(nextCredentials);
    setConfirmPass(nextConfirmPass);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (credentials.password !== confirmPass.confirmPassword) {
      toast.error("Password and Confirm Password must match");
    } else {
      register(credentials)
        .then(() => {
          authenticate(credentials)
            .then((data) => {
              auth.login(data.jwt_token);
            })
            .catch((error) => {
              toast.error(`${error}`);
            });
        })
        .catch((error) => {
          toast.error(`${error}`);
        });
    }
  };

  return (
    // <div>
    /* <h2>Register</h2>
        <Form onSubmit={handleSubmit}>

            <Form.Field>
                <label>Email *</label>
                <input type="text" placeholder='example@example.com' value={credentials.username} name="username" onChange={handleChange} />
            </Form.Field>

            <Form.Field>
                <label className="form-label">Password *</label>
                <input className="form-control" type="password" value={credentials.password} name="password" onChange={handleChange} />
            </Form.Field>

            <Form.Field>
                <label className="form-label">Confirm Password *</label>
                <input className="form-control" type="password" value={confirmPass.confirmPassword} name="confirmPassword" onChange={handleChange} />
            </Form.Field>
            <Button type="submit">Submit</Button>
        </Form>
        <ErrorSummary errors={errors}/>
    </div> */
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
          <Icon name="map signs" /> Register a New Account
        </Header>
        <Form size="large" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
              type="text"
              value={credentials.username}
              name="username"
              onChange={handleChange}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              value={credentials.password}
              name="password"
              onChange={handleChange}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Confirm Password"
              type="password"
              value={confirmPass.confirmPassword}
              name="confirmPassword"
              onChange={handleChange}
            />

            <Button color="teal" fluid size="large" type="submit">
              Register
            </Button>
          </Segment>
        </Form>
        <Message>
          Already have an account? <Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
}

export default Register;
