import React from 'react';
import DataTable from "react-data-table-component";
import Spinner from 'react-bootstrap/Spinner';
const DataTables = ({data, columns, title, pending }) => {
  return (
    <>

      <DataTable
        columns={columns}
        data={data}
        // noHeader
        defaultSortField="id"
        defaultSortAsc={false}
        pagination
        highlightOnHover
        // dense
        title = {title}
        responsive
        progressPending={pending}
        progressComponent={<Spinner animation="border" className={'mySpinner'} />}
        noDataComponent="No Data Found!"
       
      />

    </>
  )
}

export default DataTables