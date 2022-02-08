import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import FuseUtils from '@fuse/utils/FuseUtils';

function AttachmentMenu(props) {
  function handleChange(e) {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();

    reader.readAsBinaryString(file);

    reader.onload = () => {
      if (props.onChange) {
        const data = {
          id: FuseUtils.generateGUID(),
          src: `data:${file.type};base64,${btoa(reader.result)}`,
          type: file.type,
          name: file.name,
          time: new Date(Date.now()),
        };
        props.onChange(data);
      }
    };

    reader.onerror = () => {
      console.log('error on load attachment');
    };
  }

  return (
    <>
      <label htmlFor="button-file">
        <input
          accept="image/*"
          className="hidden"
          id="button-file"
          type="file"
          onChange={handleChange}
        />
        <IconButton color="inherit" component="span" size="large">
          <Icon>attachment</Icon>
        </IconButton>
      </label>
    </>
  );
}

export default AttachmentMenu;
