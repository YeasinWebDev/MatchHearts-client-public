import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { MdDelete } from "react-icons/md";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
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

function MyContactRequest() {
  const axiosSecure = useAxiosSecure();

  const { data = [], isLoading, refetch } = useQuery({
    queryKey: ['contactRequests'],
    queryFn: async () => {
      const response = await axiosSecure.get('/payment');
      return response.data;
    },
  });

  const handleDelete = async (id) => {
    const response = await axiosSecure.delete(`/payment/${id}`);
    refetch();
  };


  return (
    <div className='pt-10 md:px-10 px-0'>
      <h2 className='text-4xl font-semibold text-[#302F2A] flex items-center justify-center py-10'>My Contact Request</h2>

      {isLoading && (
        <div className="flex justify-center items-center py-10">
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-black"></div>
          </div>
        </div>
      )}

      {
        data.length === 0 && !isLoading && (
          <div className='flex justify-center items-center flex-col'>
            <h2 className='text-xl font-semibold text-[#302F2A]'>No Favourites Biodatas</h2>
          </div>
        )
      }

      {!isLoading && data.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="center">Biodata Id</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center">Mobile No</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row) => (
                <StyledTableRow key={row?._id}>
                  <StyledTableCell component="th" scope="row">
                    {row?.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <span className='text-md'>{row?.bioDataId}</span>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <span className={`text-md ${row?.status === 'pending' ? 'text-red-600' : 'text-green-600'}`}>
                      {row?.status}
                    </span>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <span className='text-md'>
                      {row?.status === 'pending' ? 'none' : row?.mobile}
                    </span>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <span className='text-md'>
                      {row?.status === 'pending' ? 'none' : row?.email}
                    </span>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <button onClick={() => handleDelete(row?._id)}>
                      <MdDelete size={25} color='red' />
                    </button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default MyContactRequest;
