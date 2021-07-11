import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import Box from '@material-ui/core/Box';
import { debounce } from 'lodash';
import { useHistory } from 'react-router-dom';
import { Alert } from 'components';
import {
  fetchUsers,
  getDepartments,
  getLocations,
} from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { headCells } from './columns';
import WrapInCard from '../../components/layout/wrapInCard';
import Search from '../../components/pages/directory/search';
import Filters from '../../components/pages/directory/filters';
import DataTable from '../../components/dataTable';
import TableButtons from './tableButtons';
import { Loading } from '../../components/loading';
import { useAuthContext } from '../../context/authContext';
import { ROLES, PAGE_SIZE } from '../../utils/constants';
import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';
import { useStyles } from './styles';
import { Modal } from '../../utils/helper';
import { useDeleteUser } from '../../hooks/user';

function DirectoryContainer() {
  const [query, setQuery] = useState({ searchString: '' });
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [filters, setFilters] = useState();
  const [checked, setChecked] = useState(false);
  const [selected, setSelected] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortColumn, setSortColumn] = useState('firstName');
  const history = useHistory();
  const isServerSide = true;
  const classes = useStyles();
  const [fieldFunc, setFieldFunc] = useState();
  const mutation = useDeleteUser({ callbackFn: () => setSelected([]) });

  const {
    user: {
      data: { role },
    },
  } = useAuthContext();
  useEffect(() => {
    if (checked) {
      fieldFunc?.setFormikField('searchString', '');
      setQuery({ searchString: '' });
    }
  }, [checked, sortOrder, sortColumn]);
  const { data, isLoading } = useQuery(
    keys.getUsers({
      query,
      filters,
      sortOrder,
      sortColumn,
      pageNumber,
      pageSize,
    }),
    fetchUsers,
    {
      keepPreviousData: true,
    }
  );
  const { data: locations, isLocationLoading } = useQuery(
    keys.locations,
    getLocations
  );
  const { data: deparments, isDepartmentLoading } = useQuery(
    keys.departments,
    getDepartments
  );
  const tableData = data?.data?.data;

  const handleSwitchChange = ({ target }) => {
    onClear();
    setChecked(target.checked);
  };
  const handleSearch = debounce((e, setFieldValue) => {
    setPageNumber(1);
    setFieldFunc({ setFormikField: setFieldValue });
    setQuery({ searchString: e.target.value });
  }, 500);

  const handleFilterSearch = (values) => {
    setPageNumber(1);
    setFilters(values);
  };
  const onClear = () => {
    setFilters([]);
  };

  const onChangeSort = (order, property) => {
    if (isServerSide) {
      if (property === 'fullName') {
        setSortColumn('firstName');
      } else {
        setSortColumn(property);
      }
      setSortOrder(order);
    }
  };

  useEffect(() => {
    history.replace({}, '');
  }, []);

  const handleDelete = () => {
    if (!selected.length) {
      return;
    }
    Modal.fire().then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(selected);
      }
    });
  };
  const handleServerPageNumber = (value) => {
    setPageNumber(value.currentPage);
  };
  const handleServerPageSize = (value) => {
    setPageSize(value.rowPerPage);
  };
  const locationOptions = locations?.data.data.rows.map((val) => ({
    value: val.id,
    label: val.name,
  }));
  const departmentOptions = deparments?.data.data.rows.map((val) => ({
    value: val.id,
    label: val.name,
  }));
  return (
    <>
      <Helmet>
        <title>Directory Listing</title>
      </Helmet>
      {isLoading ||
      mutation.isLoading ||
      isLocationLoading ||
      isDepartmentLoading ? (
        <Loading />
      ) : (
        <WrapInBreadcrumbs>
          <Box width={1}>
            <WrapInCard mb={8}>
              <Box display="flex">
                <Search
                  initialValues={query}
                  onHandleSwitchChange={handleSwitchChange}
                  checked={checked}
                  onHandleSearch={handleSearch}
                />
              </Box>
              <Box mt={2}>
                {checked && (
                  <Filters
                    onHandleFilterSearch={handleFilterSearch}
                    onClear={onClear}
                    locationOptions={locationOptions}
                    departmentOptions={departmentOptions}
                  />
                )}
              </Box>
            </WrapInCard>
            <WrapInCard>
              {role === ROLES.ADMIN && (
                <Box mt={4}>
                  <TableButtons
                    onDelete={handleDelete}
                    numSelected={selected.length}
                  />
                </Box>
              )}
              {selected.length > 0 && (
                <Box my={4}>
                  <Alert severity="info" className={classes.alertPadding}>
                    <strong>{selected.length}</strong> User(s) Selected
                  </Alert>
                </Box>
              )}

              <DataTable
                data={tableData?.rows}
                headCells={headCells}
                setSelected={setSelected}
                selected={selected}
                sortOrder={sortOrder}
                sortColumn={sortColumn}
                onChangeSort={onChangeSort}
                isServerSide={isServerSide}
                matchUserIdWithIDS
                count={tableData?.count || 0}
                handleServerPageNumber={handleServerPageNumber}
                handleServerPageSize={handleServerPageSize}
                pageNumber={pageNumber}
              />
            </WrapInCard>
          </Box>
        </WrapInBreadcrumbs>
      )}
    </>
  );
}

export default memo(DirectoryContainer);
