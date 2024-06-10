import React, { useState } from 'react'

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


function SuccessStory() {
    const axiosSecure = useAxiosSecure()
    const [story, setStory] = useState()

    const { data } = useQuery({
        queryKey: ['successStory'],
        queryFn: async () => {
            const response = await axiosSecure.get('/successStories');
            return response.data;
        }
    })

    const [open, setOpen] = useState(false);
    const handleOpen = (id) => {
        setStory('')
        setOpen(true)

        const response = axiosSecure.get(`/successStoriesById/${id}`)
        .then((res) => setStory(res.data) )

    };
    const handleClose = () => setOpen(false);


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div>
            <h2 className='text-4xl font-semibold text-[#302F2A] flex items-center justify-center py-10'>Success Story</h2>

            <div className='md:mx-20 mx-0'>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Male Biodata Id</StyledTableCell>
                                <StyledTableCell align="center">Female Biodata Id</StyledTableCell>
                                <StyledTableCell align="center">View Story</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.map((row) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell component="th" scope="row">
                                        {row?.male}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.female}</StyledTableCell>
                                    <StyledTableCell align="center"><button onClick={() => handleOpen(row?._id)} className='bg-[#302F2A] px-4 py-3 rounded-xl text-white'>View</button></StyledTableCell>

                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} className='rounded-xl'>
                        <Typography id="modal-modal-title" variant="div" component="h2">
                            <div className='rounded-xl'>
                                <img className='w-full h-full rounded-xl' src={story?.coupleImage} alt="" />
                            </div>
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <h1 className='font-semibold py-2 text-xl'>Story:</h1>
                            {story?.successStoryText}
                        </Typography>
                    </Box>
                </Modal>
            </div>
        </div>
    )
}

export default SuccessStory