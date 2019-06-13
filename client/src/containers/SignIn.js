import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { Person,LockOutlinedIcon } from '@material-ui/icons';

import query from '../queries/User';
import mutationLogin from '../mutations/Login';
import mutationSignup from '../mutations/Signup';
import { graphql } from 'react-apollo';

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function Auth(props) {
    //console.log(props);
    const classes = useStyles();
    const [show, setShow] = React.useState(true);

    const onLoginClick = (e) => {
        e.preventDefault();
        const { email, password } = e.target;
        props.Login({
            variables: { email: email.value, password: password.value },
            refetchQueries: [{ query }]

        }).then((re) => {
            props.history.push('/home');
        }).catch((res) => {
            //console.log(res, 'error in');
            const errors = res.graphQLErrors.map(e => e.message);
        })
    }
    const onSignupClick = (e) => {
        e.preventDefault();
        const { firstName, lastName, email, password } = e.target;
        props.Signup({
            variables: { firstName: firstName.value, lastName: lastName.value, email: email.value, password: password.value },
            refetchQueries: [{ query }]

        }).then((re) => {
            props.history.push('/home');
        }).catch((res) => {
            //console.log(res, 'error in');
            const errors = res.graphQLErrors.map(e => e.message);
        })
    }



    const SignIn = () => (
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <Person />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <form className={classes.form} noValidate onSubmit={onLoginClick}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                {/* <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                /> */}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign In
              </Button>
                <Grid container>
                    <Grid item xs>
                        {/* <Link href="#" variant="body2">
                            Forgot password?
                  </Link> */}
                    </Grid>
                    <Grid item>
                        <Link href="#" variant="body2" onClick={handleShowSignUp}>
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </div>

    );

    const SignUp = () => (
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <Person />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign up
        </Typography>
            <form className={classes.form} noValidate onSubmit={onSignupClick}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="fname"
                            name="firstName"
                            variant="outlined"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="lname"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                    </Grid>
                    {/* <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                            label="I want to receive inspiration, marketing promotions and updates via email."
                        />
                    </Grid> */}
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign Up
          </Button>
                <Grid container justify="flex-end">
                    <Grid item>
                        <Link href="#" variant="body2" onClick={handleShowSignIn}>
                            Already have an account? Sign in
              </Link>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
    function handleShowSignIn() {
        setShow(true);
    }
    function handleShowSignUp() {
        setShow(false);
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            {show ? <SignIn /> : <SignUp />}
        </Container>
    )
}

export default graphql(mutationLogin, { name: 'Login' })(
    graphql(mutationSignup, { name: 'Signup' })(
        graphql(query)(Auth)
    )
);