import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, InputAdornment, Stack } from '@mui/material';
import './createNewVacation.css';
import { vacationType } from '../../../types/vocationType';
import { useNavigate } from 'react-router-dom';
import { validateVacationForm } from '../../../utils/validationHelpers';
import { useSnackbar } from 'notistack';

type Props = {
    onVacationData: (data: FormData) => void;
    initialValues?: vacationType;
    buttonSendText: string;
    icon: React.ReactNode;
}

const VacationRandomComp = (props: Props) => {

    const { enqueueSnackbar } = useSnackbar();

    console.log(props.initialValues?.url_image);

    const [inputs, setInputs] = useState<vacationType>(props.initialValues || {
        id: 0,
        destination: '',
        description: '',
        start_vocation: '',
        end_vocation: '',
        price: 0,
        url_image: "!no-picture!-01",
        followers_count: 0
    });

    const [imagePreview, setImagePreview] = useState<string | null>(
        props.initialValues?.url_image
          ? `http://localhost:4000/assets/images/${props.initialValues.url_image}`
          : `http://localhost:4000/assets/images/default-image.jpg`
      );


    useEffect(() => {
        if (props.initialValues) {
            setInputs(props.initialValues);
            setImagePreview(`http://localhost:4000/assets/images/${props.initialValues.url_image}`);
        }
    }, [props.initialValues]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { id, value, files } = e.target;
        if (id === 'url_image' && files) {
            setInputs(v => ({ ...v, [id]: files[0] }));
            setImagePreview(URL.createObjectURL(files[0]));
        } else {
            setInputs(v => ({
                ...v,
                [id]: value || props.initialValues?.[id as keyof vacationType]
            }));
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = validateVacationForm(inputs);

        if (validationErrors.length > 0) {
            validationErrors.forEach((error, i )=> {
                setTimeout(()=>{
                    enqueueSnackbar(error, { variant: 'error' });
                }, i*600)
            });

            return;
        }

        const formData = new FormData();
        formData.append('id', inputs.id as any);
        formData.append('description', inputs.description);
        formData.append('destination', inputs.destination);
        formData.append('start_vocation', inputs.start_vocation);
        formData.append('end_vocation', inputs.end_vocation);
        formData.append('price', inputs.price as any);
        if (inputs.url_image && typeof inputs.url_image !== 'string') {
            formData.append('imageFile', inputs.url_image);
        } else if (inputs.url_image && typeof inputs.url_image === 'string') {
            formData.append('url_image', inputs.url_image);
        }

        props.onVacationData(formData);
    }

    const navigate = useNavigate();

    const handleCancel = () => {
        navigate(-1)
    }

    return (
            <div>
                <Box
                    className='vocation-box'
                    component="form"
                    sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <TextField
                        id="destination"
                        label="Destination"
                        variant="outlined"
                        placeholder='What is the vacation destination?'
                        defaultValue={props.initialValues?.destination || ''}
                        required
                        onChange={handleChange}
                    />
                    <TextField
                        id="description"
                        label="Description"
                        defaultValue={props.initialValues?.description || ''}
                        multiline
                        rows={5}
                        placeholder='Give a good and detailed description of the vacation...'
                        required
                        onChange={handleChange}
                    />
                    <TextField
                        type='Date'
                        id="start_vocation"
                        label="Date start"
                        variant="outlined"
                        defaultValue={props.initialValues?.start_vocation.substring(0, 10) || ''}
                        InputLabelProps={{ shrink: true }}
                        required
                        onChange={handleChange}
                    />
                    <TextField
                        type='Date'
                        id="end_vocation"
                        label="Date end"
                        variant="outlined"
                        defaultValue={props.initialValues?.end_vocation.substring(0, 10) || ''}
                        InputLabelProps={{ shrink: true }}
                        required
                        onChange={handleChange}
                    />
                    <TextField
                        type='number'
                        id="price"
                        label="Price"
                        variant="outlined"
                        defaultValue={Math.round(Number(props.initialValues?.price)) || ''}
                        required
                        onChange={handleChange}
                        slotProps={{
                            input: {
                                startAdornment: <InputAdornment
                                    position="start">$</InputAdornment>,
                            },
                        }} />

                    <TextField
                        type='file'
                        id="url_image"
                        label="Image"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        required
                        onChange={handleChange}
                    />

                    {imagePreview && (
                        <Box mt={2}>
                            <img
                            src={imagePreview}
                            alt="Vacation Image"
                            style={{ maxWidth: '100%', height: 'auto', borderRadius: 5, boxShadow: '0px 1px 5px #6f6f6f' }} />
                        </Box>
                    )}

                    <Stack direction="column-reverse" spacing={1}>
                        <Button
                            variant="outlined"
                            size='large'
                            style={{
                                borderColor: '#004742',
                                color: '#004742'
                            }}
                            onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button
                            type='submit'
                            variant="contained"
                            endIcon={props.icon}
                            size='large'
                            style={{ backgroundColor: '#004742' }}
                        >
                            {props.buttonSendText}
                        </Button>
                    </Stack>
                </Box>
            </div>
    )
}

export default VacationRandomComp