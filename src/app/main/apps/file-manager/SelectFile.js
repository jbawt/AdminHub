// import FuseUtils from '@fuse/utils/FuseUtils';
import { Icon, IconButton } from '@mui/material';

function FileSelect(props) {
  async function handleChange(e) {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();

    reader.readAsBinaryString(file);

    reader.onload = () => {
      if (props.onChange) {
        const metaData = {
          name: file.name,
        };
        const media = {
          mimeType: file.type,
          body: `data:${file.type};base64,${btoa(reader.result)}`,
        };
        props.onChange({ metaData, media });
      }
    };

    reader.onerror = () => {
      console.log('error on load attachment');
    };
  }

  return (
    <>
      <label htmlFor="button-file">
        <input className="hidden" id="button-file" type="file" onChange={handleChange} />
        <IconButton color="inherit" component="span" size="large">
          <Icon>attachment</Icon>
        </IconButton>
      </label>
    </>
  );
}

export default FileSelect;
