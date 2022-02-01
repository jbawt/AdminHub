import FuseUtils from '@fuse/utils';
import _ from '@lodash';

function NoteModel(data) {
  data = data || {};

  return _.defaults(data, {
    id: FuseUtils.generateGUID(),
    title: '',
    description: '',
    archive: false,
    image: null,
    time: new Date(Date.now()),
    reminder: null,
    checklist: [],
    labels: [],
  });
}

export default NoteModel;
