import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import './logFormsCss.css';
import React, {useState} from 'react'
import { registerUser } from '../../api/user-cleint';
import { useSnackbar } from 'notistack';
import { validateRegisterForm } from '../../utils/validationHelpers';
import { userType } from '../../types/userType';

type Props = {}

const RegisterLog = (props: Props) => {

    const [newUser, setNewUser] = useState<userType>({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    })

    const { enqueueSnackbar } = useSnackbar();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setNewUser(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = validateRegisterForm(newUser);
        
        if (validationErrors.length > 0) {
            validationErrors.forEach((error, i )=> {
                setTimeout(()=>{
                    enqueueSnackbar(error, { variant: 'error' });
                }, i*600)
            });

            return
        }

        try {
            const user = await registerUser(newUser);

            if (user) {
                setNewUser({
                    first_name: '',
                    last_name: '',
                    email: '',
                    password: '',
                });

                window.location.href = "/home"
            }
            else {
                enqueueSnackbar(`One or more of your details are incorrect \ Or an email exists in the system`, { variant: 'error' });
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
            autoComplete="off"
            onSubmit={handleRegister}
            noValidate
        >
            <TextField
                id="first_name"
                type='text'
                label="First name"
                variant="outlined"
                value={newUser.first_name}
                onChange={handleInputChange}
                placeholder='Your first name is...'
                required
            />

            <TextField
                id="last_name"
                type='text'
                label="last name"
                variant="outlined"
                value={newUser.last_name}
                onChange={handleInputChange}
                placeholder='...and your last name?'
                required
            />

            <TextField
                id="email"
                type='email'
                label="email"
                variant="outlined"
                value={newUser.email}
                onChange={handleInputChange}
                placeholder='MMM Your email please?!'
                required
            />

            <TextField
                id="password"
                type='password'
                label="password"
                variant="outlined"
                value={newUser.password}
                onChange={handleInputChange}
                placeholder='So, which password will you choose?'
                required
            />

            <Stack direction="column" spacing={1}>
                <Button
                    type='submit'
                    variant="contained"
                    size='large'
                    style={{ backgroundColor: '#004742' }}
                >
                    Register
                </Button>

                <Box sx={{ textAlign: 'center' }}>
                    <Typography sx={{ color: 'gray' }}>
                        already a member?
                    </Typography>
                    <Button
                        variant="text"
                        size='small'
                        onClick={() => { window.location.href = "/log-in" }}>
                        Log In
                    </Button>
                </Box>
            </Stack>
        </Box>
    </div>
    )
}

export default RegisterLog