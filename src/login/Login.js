import {
  Grid,
  Typography,
  TextField,
  Button,
  makeStyles,
} from '@material-ui/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { instanceAxios } from '../instanceAxios';

const useStyles = makeStyles((theme) => ({
  margin: {
    marginBottom: '20px',
  },
  inputs: {
    width: '70%',
    marginTop: '20px',
    margin: 'auto',
  },
  container: {
    height: '100vh',
  },
  logoContainer: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
    height: '100vh',
  },
}));

export default function Login() {
  const navigate = useNavigate();
  var classes = useStyles();
  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setValues((prevalue) => {
      return {
        ...prevalue,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = () => {
    instanceAxios
      .post('/login', values)
      .then((response) => {
        console.log(response);
        window.localStorage.setItem('token', response.data.token);
      })
      .then(() => {
        navigate('/table1');
      })
      .catch((err) => {
        console.log(err);
        window.alert(err.response.data.message);
      });
  };
  return (
    <Grid container className={classes.container} alignItems="center">
      <Grid
        item
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sm={5}
      >
        <Grid item>
          <Typography className={classes.margin} variant="h3">
            Login
          </Typography>
        </Grid>

        <Grid
          className={classes.margin}
          item
          container
          direction="column"
          spacing={4}
        >
          <TextField
            className={classes.inputs}
            onChange={handleChange}
            value={values.username}
            id="username"
            name="username"
            label="User Name"
            variant="outlined"
          />
          <TextField
            className={classes.inputs}
            onChange={handleChange}
            value={values.password}
            id="password"
            name="password"
            label="Password"
            type="password"
            variant="outlined"
          />
        </Grid>
        <Grid item>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Login
          </Button>
        </Grid>
      </Grid>
      <Grid
        className={classes.logoContainer}
        container
        item
        direction="column"
        alignContent="stretch"
        justifyContent="center"
        alignItems="center"
        sm={7}
      >
        <Typography variant="h1">ROMAK</Typography>
      </Grid>
    </Grid>
  );
}
