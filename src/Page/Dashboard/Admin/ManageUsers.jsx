import { useQuery } from '@tanstack/react-query'
import React, { useContext, useState } from 'react'
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import toast from 'react-hot-toast';
import { data } from 'autoprefixer';
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


function ManageUsers() {
  const axiosSecure = useAxiosSecure()
  const [premium, setPremium] = useState()
  const { data: users = [], refetch } = useQuery({
    queryKey: ['ManageUsers'],
    queryFn: async () => {
      const response = await axiosSecure.get('/usersByRole' );
      return response.data;
    }
  })

  const handelAdmin = async (email) => {
    const result = await axiosSecure.put('/updateRole', { email: email });
    if (result.data?.acknowledged === true) {
      refetch();
      toast.success(`${email} user is Admin Now`);
    }
  };


  const handelPremium = async (email) => {
    const result = await axiosSecure.put('/updatePremium', { email: email });
    if (result.data?.acknowledged === true) {
      refetch()
      toast.success(`${email} user is Premium Now`);
    }
  }

  return (
    <div>
      <Helmet>
        <title>MatchHearts || Manage Users</title>
      </Helmet>
      <h2 className='text-4xl font-semibold text-[#302F2A] flex items-center justify-center py-10'>Manage Users</h2>


      {
        users.length === 0 ?
          <>
            <h1 className='text-2xl font-semibold text-[#302F2A] flex items-center justify-center py-10'>No user Found</h1>
          </>
          :
          <div className='xl:mx-20 lg:mx-5 mx-0'>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>User Name</StyledTableCell>
                    <StyledTableCell align="center">User email</StyledTableCell>
                    <StyledTableCell align="center">Make admin</StyledTableCell>
                    <StyledTableCell align="center">Make premium</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    users?.map((row) => (
                      <StyledTableRow key={row?._id}>
                        <StyledTableCell component="th" scope="row">
                          {row?.name}
                        </StyledTableCell>
                        <StyledTableCell align="center">{row?.email}</StyledTableCell>
                        <StyledTableCell align="center"><button disabled={row?.role === 'admin'} onClick={() => handelAdmin(row?.email)} className={` p-2 rounded-xl bg-[#302F2A] text-white`}>
                          {
                            row?.role === 'admin'? 'Admin' : 'Make Admin'
                          }
                          </button></StyledTableCell>
                        <StyledTableCell align="center"><button disabled={row?.role === 'premium' || row?.role === 'admin'} onClick={() => handelPremium(row?.email)} className={` p-2 rounded-xl ${row?.role === 'premium' ? 'bg-green-600' : 'bg-gray-600'} text-white  `}>
                          {
                            row?.role === 'premium'? 'Premium' : ''
                          }
                          {
                            row?.role === 'admin'? 'Admin' : ''
                          }
                          {
                            row?.role === 'normal' ? 'Make Premium' : ''
                          }
                        </button></StyledTableCell>
                      </StyledTableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </div>
      }

    </div>
  )
}

export default ManageUsers