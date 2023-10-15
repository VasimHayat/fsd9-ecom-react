
import { useContext, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, Snackbar } from "@mui/material";
import { postApiForLogin } from "../../../Api/HttpApi";
import { userContext } from '../../../contexts/UserProvider';
import UserService from '../../../services/UserService';
import { useNavigate } from 'react-router-dom';
import { sellerContext } from '../../../contexts/SellerProvider';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        fsd9@jain.university.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

function BaseLogin({isSeller}) {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('success');
  const [authMsg, setAuthMsg] = useState('');
  const { setUser, setIsLoggedIn } = useContext(userContext);
  const { setSeller, setIsSellerLoggedIn } = useContext(sellerContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (actionData?.status === "success") {

  //     localStorage.setItem("userToken", actionData.data.token);
  //   }
  // }, [actionData?.status, actionData?.data, navigate]);

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  const postAuthRedirection = (response)=>{
    if(isSeller){
      setIsSellerLoggedIn(true);
      setSeller(response.data);
      UserService.setSellerLogin(response.data);
    }else{
      setIsLoggedIn(true);
      setUser(response.data);
      UserService.setUserLogin(response.data);
    }
   
    setAuthMsg('Login Successfully!!');
    setOpen(true);
    setSeverity('success');
    setTimeout(() => {
      navigate(isSeller?`../../seller/user/${response.data.id}`:'/');
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const _formData = new FormData(event.currentTarget);

    postApiForLogin(
      JSON.stringify({
        username: _formData.get('username'),
        password: _formData.get('password'),
        role:isSeller?'ROLE_SELLER':'ROLE_USER' //
      })
    )
      .then(response => {
        postAuthRedirection(response);
        // setIsLoggedIn(true);
        // setUser(response.data);
        // UserService.setUserLogin(response.data);
        // setAuthMsg('Login Successfully!!');
        // setOpen(true);
        // setSeverity('success');
        // setTimeout(() => {
        //   navigate('/');
        // })
      })
      .catch(error => {
        let msg = error.message;
        if (error?.response?.data?.message) {
          msg = error.response.data.message;
        }
        console.log(msg);
        setAuthMsg(msg)
        setOpen(true);
        setSeverity('error')
      });

  };

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ 'vertical': 'top', 'horizontal': 'center' }}>
          <Alert severity={severity} sx={{ width: '100%' }}>
            {authMsg}
          </Alert>
        </Snackbar>

        <Grid container component="main" className="d-flex align-items-center justify-content-center" sx={{ height: '100vh' }}>
          <CssBaseline />

          <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>

            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              {/* {
                  actionData?.status === "error" && <Alert severity="error" sx={{ width: '100%' }}>
                    {actionData?.data}
                  </Alert>
                } */}

              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }} >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="username"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="/forgot-password" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/register" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>

          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}

// export async function action({ request }) {
//   const formData = await request.formData();
//   const data = Object.fromEntries(formData);

//   try {
//     const res = await axios.post("http://localhost:8080/api/v1/auth/login", data);
//     return { status: "success", data: res.data };
//   } catch (err) {
//     return { status: "error", data: err?.response?.data?.message };
//   }
// }

export default BaseLogin;
