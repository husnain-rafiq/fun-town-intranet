import React, { useState } from 'react';
import { Box, useMediaQuery } from '@material-ui/core';
import { Tabs, Tab } from 'components';
import { useTheme } from '@material-ui/styles';
import { useStyles } from './style';
import TabPanel from './tabPanel';
import DocumentList from './documentList';

function tabProps(index) {
  return {
    id: `vertical-tab-${index}`,
  };
}

export default function DocumentTabs({
  documents,
  departments,
  onHandleDelete,
}) {
  const classes = useStyles();
  const [selected, setSelected] = useState(0);
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (e, tab) => {
    setSelected(tab);
  };
  return (
    <Box display="flex" flexDirection={['column', 'column', 'row', 'row']}>
      <Tabs
        orientation={match ? 'horizontal' : 'vertical'}
        variant="scrollable"
        value={selected}
        onChange={handleChange}
        classes={{
          indicator: classes.indicator,
        }}
      >
        {departments?.map((department) => (
          <Tab
            classes={{ root: classes.tab, selected: classes.selectedTab }}
            label={department.name}
            {...tabProps(department.id)}
          />
        ))}
      </Tabs>
      {departments?.map((department, index) => (
        <TabPanel value={selected} index={index}>
          <DocumentList
            documents={documents}
            departmentName={department.name}
            onHandleDelete={onHandleDelete}
          />
        </TabPanel>
      ))}
    </Box>
  );
}
