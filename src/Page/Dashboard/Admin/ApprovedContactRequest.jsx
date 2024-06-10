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
import toast from 'react-hot-toast';

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


function ApprovedContactRequest() {
  const axiosSecure = useAxiosSecure()

  const [reload, setreload] = useState(false)

  const { data: users } = useQuery({
    queryKey: ['approvedContactRequest',reload],
    queryFn: async () => {
      const response = await axiosSecure.get('/allPayments');
      return response.data;
    }
  })

  const handelClick = (email, id) => {
    const result =  axiosSecure.put('/approvedReq', { email, id })
      toast.success('Contact Request Approved'),
      setreload(!reload)

  }

  return (
    <div>
      <h1 className='flex items-center justify-center text-xl md:text-4xl py-10 font-bold text-[#302F2A]'>Approved Contact Request</h1>

      <div className='md:mx-20 mx-0'>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
                <StyledTableCell align="center">Biodata Id</StyledTableCell>
                <StyledTableCell align="center">Approved contact request</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                users?.map(user => (
                  <StyledTableRow key={user?._id}>
                    <StyledTableCell component="th" scope="row">
                      {user?.userName}
                    </StyledTableCell>
                    <StyledTableCell align="center">{user?.user}</StyledTableCell>
                    <StyledTableCell align="center">{user?.bioDataId}</StyledTableCell>
                    <StyledTableCell align="center"><button disabled={user?.status === 'accepted'} onClick={() => handelClick(user?.user, user?.bioDataId)} className={` p-2 rounded-xl bg-[#302F2A] text-white ${user?.status === 'pending' ? 'bg-[#302F2A]' : 'bg-green-600'}`}>
                      {
                        user?.status === 'pending' ? 'Contact Request' : 'Approved'
                      }
                    </button></StyledTableCell>
                  </StyledTableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}

export default ApprovedContactRequest