import React from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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


function ApprovedPremium() {
  const axiosSecure = useAxiosSecure()
  const { data ,refetch} = useQuery({
    queryKey: ['approvedPremium'],
    queryFn: async () => {
      const response = await axiosSecure.get('/makePremium');
      return response.data;
    }
  })


  const handelpremium = async(email) => {
    const response = await axiosSecure.put(`/makePremium`, { email })
    toast.success('Premium Added')
    refetch()
  }

  return (
    <div>
      <Helmet>
        <title>MatchHearts || Approved Premium</title>
      </Helmet>
      <h2 className='text-4xl font-semibold text-[#302F2A] flex items-center justify-center py-10'>Approved Premium</h2>

      <div className='md:mx-20 mx-0'>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
                <StyledTableCell align="center">Biodata Id</StyledTableCell>
                <StyledTableCell align="center">Make Premium</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                data?.map((row) => (
                  <StyledTableRow key={row?._id}>
                    <StyledTableCell component="th" scope="row">
                      {row?.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <span className='text-md'>{row?.email}</span>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <span className='text-md'>{row?.biodataId}</span>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <button disabled={row?.status === 'accepted'} onClick={() => handelpremium(row?.email)} 
                        className={`p-2 rounded-xl text-white ${row?.status === 'pending' ? 'bg-gray-600' : 'bg-green-600'}`}
                        >{row?.status === 'pending' ? 'Make Premium' : 'Premium'}</button>
                    </StyledTableCell>
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

export default ApprovedPremium