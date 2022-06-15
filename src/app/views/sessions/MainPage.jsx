import React, { useState, Fragment, useEffect } from 'react';
import Axios from 'axios';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { PinDropSharp } from '@mui/icons-material';
import { history } from 'react-router-dom';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'edition', label: 'Edition', minWidth: 170 },
  {
    id: 'price',
    label: 'Price',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'qty',
    label: 'Quantity',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginTop: 40,
    padding: 20,
  },
  container: {
    maxHeight: 400,
  },
  tablerow: {
    cursor: 'pointer',
  }
});

const PublicPage = (props) => {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  useEffect(() => {
    getData();
    console.log('this is calling');
  }, []);

  async function getData() {
    try {
      const response = await Axios.get('http://localhost:8000/api/scgbynameedition');
      console.log(response.data);
      setRows(response.data)
    } catch (error) {
      console.error(error);
    }
  }

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const printings = (id) => {
    // window.open(`/prints/public:` + id)
    // window.open('/prints/public');
    navigate(`/prints/public/:` + id)
    // props.history.push(`/prints/public:` + id)
    // console.log(props);
    // props.history.push(`/prints/public:` + id)
  }

  return (
    <Fragment>
      <Container>
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id} className={classes.tablerow} onClick={printings.bind(this, row.id)}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
    </Fragment>
  )
}

export default PublicPage
