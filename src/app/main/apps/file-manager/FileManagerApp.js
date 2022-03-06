import FusePageSimple from '@fuse/core/FusePageSimple';
import Fab from '@mui/material/Fab';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import { Button, Divider, Popover, Stack, TextField, Typography } from '@mui/material';
import withReducer from 'app/store/withReducer';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import FuseLoading from '@fuse/core/FuseLoading';
import Breadcrumb from './Breadcrumb';
import DetailSidebarContent from './DetailSidebarContent';
import DetailSidebarHeader from './DetailSidebarHeader';
import FileList from './FileList';
import MainSidebarContent from './MainSidebarContent';
import MainSidebarHeader from './MainSidebarHeader';
import reducer from './store';
import { selectFileById, getFiles } from './store/filesSlice';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    minHeight: 96,
    height: 96,
    [theme.breakpoints.up('sm')]: {
      minHeight: 160,
      height: 160,
    },
  },
  '& .FusePageSimple-sidebarHeader': {
    minHeight: 96,
    height: 96,
    [theme.breakpoints.up('sm')]: {
      minHeight: 160,
      height: 160,
    },
  },
  '& .FusePageSimple-rightSidebar': {
    width: 320,
  },
}));

function FileManagerApp() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const selectedItem = useSelector((state) =>
    selectFileById(state, state.fileManagerApp.files.selectedItemId)
  );

  const pageLayout = useRef(null);

  useEffect(() => {
    dispatch(getFiles()).then(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return <FuseLoading />;
  }

  const goBack = () => {
    setLoading(true);
    dispatch(getFiles()).then(() => setLoading(false));
  };

  const handleNewFileOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setPopoverOpen(true);
  };

  const handleNewFileClose = () => {
    setAnchorEl(null);
    setPopoverOpen(false);
  };

  return (
    <Root
      header={
        <div className="flex flex-col flex-1 p-8 sm:p-12 relative">
          <div className="flex items-center justify-between">
            <IconButton
              onClick={(ev) => {
                pageLayout.current.toggleLeftSidebar();
              }}
              aria-label="open left sidebar"
              size="large"
            >
              <Icon>menu</Icon>
            </IconButton>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1, transition: { delay: 0.2 } }}>
              <IconButton aria-label="search" size="large">
                <Icon>search</Icon>
              </IconButton>
            </motion.div>
          </div>
          <div className="flex flex-1 items-end">
            <Fab
              component={motion.div}
              initial={{ scale: 0 }}
              animate={{ scale: 1, transition: { delay: 0.6 } }}
              color="secondary"
              aria-label="add"
              className="absolute bottom-0 ltr:left-0 rtl:right-0 mx-16 -mb-28 z-999"
              onClick={handleNewFileOpen}
            >
              <Icon>add</Icon>
            </Fab>
            <Popover
              open={popoverOpen}
              anchorEl={anchorEl}
              onClose={handleNewFileClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <div className="w-400 h-400 p-20">
                <Stack spacing={2}>
                  <Typography variant="h5">Create New Folder</Typography>
                  <div className="flex items-center space-x-20">
                    <TextField type="text" />
                    <Button variant="contained">Create</Button>
                  </div>
                  <Divider />
                  <Typography variant="h5">Upload File</Typography>
                  <TextField className="w-max" type="text" placeholder="Choose a folder" />
                </Stack>
              </div>
            </Popover>
            <Fab
              component={motion.div}
              initial={{ scale: 0 }}
              animate={{ scale: 1, transition: { delay: 0.6 } }}
              onClick={goBack}
              color="secondary"
              aria-label="add"
              className="absolute bottom-0 ltr:right-0 rtl:left-0 mx-16 -mb-28 z-999"
            >
              <Icon>arrow_back</Icon>
            </Fab>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.6 } }}
            >
              {selectedItem && (
                <Breadcrumb
                  selected={selectedItem}
                  className="flex flex-1 ltr:pl-72 rtl:pr-72 pb-12 text-16 sm:text-24 font-semibold"
                />
              )}
            </motion.div>
          </div>
        </div>
      }
      content={<FileList pageLayout={pageLayout} />}
      leftSidebarVariant="temporary"
      leftSidebarHeader={<MainSidebarHeader />}
      leftSidebarContent={<MainSidebarContent />}
      rightSidebarHeader={<DetailSidebarHeader />}
      rightSidebarContent={<DetailSidebarContent />}
      ref={pageLayout}
      innerScroll
    />
  );
}

export default withReducer('fileManagerApp', reducer)(FileManagerApp);
