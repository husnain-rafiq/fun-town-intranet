import { Grid } from '@material-ui/core';
import React from 'react';
import { menuItems } from './menuItems';
import SideMenu from './sideMenu';
import { useAuthContext } from '../../../context/authContext';

function Index() {
  const { user } = useAuthContext();

  return (
    <>
      <Grid xs={12} style={{ paddingTop: '80px' }}>
        {menuItems &&
          menuItems.length > 0 &&
          menuItems.map((item) => (
            <>
              {item.role ? (
                item.role.indexOf(user.data.role) !== -1 && (
                  <Grid>
                    <SideMenu item={item} />
                  </Grid>
                )
              ) : (
                <Grid>
                  <SideMenu item={item} />
                </Grid>
              )}
            </>
          ))}
      </Grid>
    </>
  );
}

export default Index;
