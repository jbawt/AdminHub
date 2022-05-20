import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import FuseLoading from '@fuse/core/FuseLoading';
import ProjectDashboardAppHeader from './ProjectDashboardAppHeader';
import ProjectDashboardAppSidebar from './ProjectDashboardAppSidebar';
import reducer from './store';
import { getWidgets, selectWidgets } from './store/widgetsSlice';
import { getProjects } from './store/projectsSlice';
// import BudgetSummaryTab from './tabs/BudgetSummaryTab';
import HomeTab from './tabs/HomeTab';
// import TeamMembersTab from './tabs/TeamMembersTab';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    minHeight: 160,
    height: 160,
    [theme.breakpoints.up('lg')]: {
      marginRight: 12,
      borderBottomRightRadius: 20,
    },
  },
  '& .FusePageSimple-toolbar': {
    minHeight: 56,
    height: 56,
    alignItems: 'flex-end',
  },
  '& .FusePageSimple-rightSidebar': {
    width: 288,
    border: 0,
    padding: '12px 0',
  },
  '& .FusePageSimple-content': {
    maxHeight: '100%',
    '& canvas': {
      maxHeight: '100%',
    },
  },
}));

function ProjectDashboardApp(props) {
  const dispatch = useDispatch();
  const widgets = useSelector(selectWidgets);

  const pageLayout = useRef(null);
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);

  const [selectedProject, setSelectedProject] = useState({
    id: null,
    menuEl: null,
    fullName: null,
  });

  useEffect(() => {
    dispatch(getProjects())
      .then((data) => {
        const repo = data.payload;
        setSelectedProject({
          id: repo.length > 0 ? repo[0].id : null,
          menuEl: null,
          fullName: repo.length > 0 ? repo[0].fullName : null,
        });
        return repo;
      })
      .then((repo) => {
        dispatch(getWidgets(repo[0])).then(() => setLoading(false));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getWidgets()).then(() => {
  //     setLoading(false);
  //   });
  // }, [dispatch]);

  function handleChangeTab(event, value) {
    setTabValue(value);
  }

  if (_.isEmpty(widgets)) {
    return null;
  }

  if (loading) {
    return <FuseLoading />;
  }

  return (
    <Root
      header={
        <ProjectDashboardAppHeader
          pageLayout={pageLayout}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
        />
      }
      contentToolbar={
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          indicatorColor="secondary"
          textColor="inherit"
          variant="scrollable"
          scrollButtons={false}
          className="w-full px-24 -mx-4 min-h-40"
          classes={{ indicator: 'flex justify-center bg-transparent w-full h-full' }}
          TabIndicatorProps={{
            children: (
              <Box
                sx={{ bgcolor: 'text.disabled' }}
                className="w-full h-full rounded-full opacity-20"
              />
            ),
          }}
        >
          <Tab
            className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
            disableRipple
            label="Home"
          />
          {/* <Tab
            className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
            disableRipple
            label="Budget Summary"
          /> */}
          <Tab
            className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
            disableRipple
            label="Team Members"
          />
        </Tabs>
      }
      content={
        <div className="p-12 lg:ltr:pr-0 lg:rtl:pl-0">
          {tabValue === 0 && <HomeTab />}
          {/* {tabValue === 1 && <BudgetSummaryTab />}
          {tabValue === 2 && <TeamMembersTab />} */}
        </div>
      }
      rightSidebarContent={<ProjectDashboardAppSidebar />}
      ref={pageLayout}
    />
  );
}

export default withReducer('projectDashboardApp', reducer)(ProjectDashboardApp);
