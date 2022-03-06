import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { selectFileById, deleteFile } from './store/filesSlice';

function DetailSidebarHeader(props) {
  const dispatch = useDispatch();
  const selectedItem = useSelector((state) =>
    selectFileById(state, state.fileManagerApp.files.selectedItemId)
  );

  if (!selectedItem) {
    return null;
  }

  const onDownload = () => {
    const link = document.createElement('a');

    link.download = selectedItem.name;
    link.href = selectedItem.webContentLink;
    link.click();
  };

  const onDelete = (fileId) => {
    dispatch(deleteFile(fileId));
  };

  return (
    <div className="flex flex-col justify-between h-full p-4 sm:p-12">
      <h3>Manage File</h3>
      <div className="toolbar flex align-center justify-end">
        {selectedItem.type !== 'folder' && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1, transition: { delay: 0.2 } }}>
            <Tooltip title="Delete File">
              <IconButton onClick={() => onDelete(selectedItem.id)} size="large">
                <Icon>delete</Icon>
              </IconButton>
            </Tooltip>
          </motion.div>
        )}
        {selectedItem.webContentLink !== null && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1, transition: { delay: 0.2 } }}>
            <Tooltip title="Download File">
              <IconButton onClick={onDownload} size="large">
                <Icon>cloud_download</Icon>
              </IconButton>
            </Tooltip>
          </motion.div>
        )}
      </div>

      <div className="p-12">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1, transition: { delay: 0.2 } }}>
          <Typography variant="subtitle1" className="mb-8 font-semibold truncate">
            {selectedItem.name}
          </Typography>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }}>
          <Typography variant="caption" className="font-medium">
            <span>Edited</span>
            <span>: {selectedItem.modified}</span>
          </Typography>
        </motion.div>
      </div>
    </div>
  );
}

export default DetailSidebarHeader;
