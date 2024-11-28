import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import './logFormsCss.css';
import React, { useState } from 'react'
import { loginUser } from '../../api/user-cleint';
import { useSnackbar } from 'notistack';
import { validateLogInForm } from '../../utils/validationHelpers';
import { userType } from '../../types/userType';
import { useLocation } from 'react-router-dom';

type Props = {
}

const LogIn = (props: Props) => {


    const location = useLocation(); 
    const { enqueueSnackbar } = useSnackbar();

    const [regUser, setRegUser] = useState<userType>({
        email: location.state?.email || '',
        password: location.state?.password || '',
    });


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setRegUser(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleLogin = async (e: React.FormEvent) :Promise<void> => {
        e.preventDefault();

        const validationErrors = validateLogInForm(regUser);
        
        if (validationErrors.length > 0) {
            validationErrors.forEach((error, i )=> {
                setTimeout(()=>{
                    enqueueSnackbar(error, { variant: 'error' });
                }, i*600)
            });

            return
        }

        try {
            const user = await loginUser(regUser);

            if (user && user.token) {
                localStorage.setItem("token", user.token);
                setRegUser({
                    email: '',
                    password: '',
                });
                window.location.href = "/home"
            }
            else {
                enqueueSnackbar('One or both of your email or password is incorrect', { variant: 'error' });
            }


        } catch (error) {
            console.log('error in register form', error);
        }
    }

    return (
        <div>
            <Box
                className='box'
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
                onSubmit={handleLogin}
            >
                <TextField
                    id="email"
                    type='email'
                    label="email"
                    variant="outlined"
                    onChange={handleInputChange}
                    placeholder='Your email please?!'
                    value={regUser.email}
                />

                <TextField
                    id="password"
                    type='password'
                    label="password"
                    variant="outlined"
                    onChange={handleInputChange}
                    placeholder='Can you remember your password?'
                    value={regUser.password}
                />

                <Stack direction="column" spacing={1}>
                    <Button
                        type='submit'
                        variant="contained"
                        size='large'
                        style={{ backgroundColor: '#004742' }}
                    >
                        Log In
                    </Button>

                    <Box sx={{
                        textAlign: 'center'
                    }}>
                        <Typography
                            sx={{
                                color: 'gray'
                            }}>
                            don't have account?
                        </Typography>
                        <Button
                            variant="text"
                            size='small'
                            onClick={() => { window.location.href = "/register" }}>
                            Register Now
                        </Button>
                    </Box>
                </Stack>
            </Box>
        </div>
    )
}

export default LogIn