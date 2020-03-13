import React from 'react'
import styled from 'styled-components'
import { useTable, useSortBy, useFilters, useGlobalFilter } from 'react-table'
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// A great library for fuzzy filtering/sorting items
import matchSorter from 'match-sorter'



const Styles = styled.div`
  padding: 1rem;
  table {
    border-spacing: 0;
    border: 1px solid black;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      :last-child {
        border-right: 0;
      }
    }
  }
`


// Define a default UI for filtering
function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
  }) {
    const count = preGlobalFilteredRows.length
  
    return (
      <span>
        Search:{' '}
        <input
          value={globalFilter || ''}
          onChange={e => {
            setGlobalFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
          }}
          placeholder={`${count} records...`}
          style={{
            color:'white',
            fontSize: '1.1rem',
            backgroundColor:'#454d55',
            border: '0',
          }}
        />
      </span>
    )
  }
  
  // Define a default UI for filtering
  function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
  }) {
    const count = preFilteredRows.length
  
    return (
      <input
        value={filterValue || ''}
        onChange={e => {
          setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${count} records...`}
      />
    )
  }
  
  // This is a custom filter UI for selecting
  // a unique option from a list

  
  function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
  }
  
  // Let the table remove the filter if the string is empty
  fuzzyTextFilterFn.autoRemove = val => !val
  

function TableFn({ columns, data }) {

    const filterTypes = React.useMemo(
        () => ({
          // Add a new fuzzyTextFilterFn filter type.
          fuzzyText: fuzzyTextFilterFn,
          // Or, override the default text filter to use
          // "startWith"
          text: (rows, id, filterValue) => {
            return rows.filter(row => {
              const rowValue = row.values[id]
              return rowValue !== undefined
                ? String(rowValue)
                    .toLowerCase()
                    .startsWith(String(filterValue).toLowerCase())
                : true
            })
          },
        }),
        []
      )
    
      const defaultColumn = React.useMemo(
        () => ({
          // Let's set up our default Filter UI
          Filter: DefaultColumnFilter,
        }),
        []
      )

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
    },
    
    useFilters, // useFilters!
    
    useGlobalFilter, // useGlobalFilter!
    useSortBy,
  )

  // Render the UI for your table
  return (
    <>
    <Table striped bordered hover variant="dark" {...getTableProps()}>
      
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ' ►'}
                  </span>
                </th>
              ))}
            </tr>
          ))}
           <tr>
            <th
              colSpan={visibleColumns.length}
              style={{
                textAlign: 'left',
              }}
            >
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </th>
          </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(
            (row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    )
                  })}
                </tr>
              )}
          )}
        </tbody>
        </Table>
      
    </>
  )
}

// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
    return rows.filter(row => {
      const rowValue = row.values[id]
      return rowValue >= filterValue
    })
  }
  
  // This is an autoRemove method on the filter function that
  // when given the new filter value and returns true, the filter
  // will be automatically removed. Normally this is just an undefined
  // check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = val => typeof val !== 'number'


function HomePage({posts, delPost}) {
    // console.log(posts)
  const columns = React.useMemo(
    () => [
      
        {
            Header: 'User Id',
            accessor: 'userId',
            
        },
        {
            Header: 'Id',
            accessor: 'id',
            
        },
        {
            Header: 'Title',
            accessor: 'title',
            
        },
        {
            Header: 'Body',
            accessor: 'body',
            
        },
        {
            Header: 'Actions',
            Cell: props => {
              return (
                <>
                  <Button 
                      variant="danger"
                      onClick={()=>delPost(props.row.original.id)}
                  >
                      Del post
                  </Button>
                  <Link  to={`/edit/${props.row.original.id}`} className="btn btn-warning">
                      Edit Post
                  </Link>
                </>
              );
            }
            
        },
       
    ],
    [delPost]
  )


  return (
    <Styles>
      <TableFn columns={columns} data={posts} />
    </Styles>
  )
}

export default HomePage