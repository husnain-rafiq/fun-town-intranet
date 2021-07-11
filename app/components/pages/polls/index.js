import React from 'react';
import { Box, Button, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router';
import AddIcon from '@material-ui/icons/Add';
import BallotIcon from '@material-ui/icons/Ballot';
import WrapInBreadcrumbs from '../../layout/wrapInBreadcrumbs/index';
import WrapInCard from '../../layout/wrapInCard';
import { H5 } from '../../typography';
import { Poll } from '../../poll';
import { Modal, navigateTo } from '../../../utils/helper';
import NotExist from '../notExist/index';

export function PollsPage({ data }) {
  const history = useHistory();

  const handleDeleteEvent = () => {
    Modal.fire();
  };
  return (
    <WrapInBreadcrumbs>
      <WrapInCard mb={8}>
        <Box p={2} m={2} mt={5} mb={4}>
          <Box>
            <H5> Polls </H5>
          </Box>
          <Box mt={7}>
            <Button
              startIcon={<AddIcon fontSize="small" />}
              variant="contained"
              color="secondary"
              type="button"
              onClick={() => navigateTo(history, '/polls/add')}
            >
              New Poll
            </Button>
          </Box>
        </Box>

        {data ? (
          <Box
            display="flex"
            flexDirection={['column', 'column', 'column', 'row']}
          >
            {data?.map((val) => (
              <Box mr={6}>
                <Box display="flex" justifyContent="flex-end">
                  <IconButton
                    onClick={() => navigateTo(history, `/polls/edit/${val.id}`)}
                  >
                    <EditIcon color="secondary" />
                  </IconButton>
                  <IconButton onClick={handleDeleteEvent}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </Box>
                <Poll
                  name={val.name}
                  description={val.description}
                  options={val.options}
                />
              </Box>
            ))}
          </Box>
        ) : (
          <NotExist Icon={BallotIcon} description=" No Polls To Show" />
        )}
      </WrapInCard>
    </WrapInBreadcrumbs>
  );
}
