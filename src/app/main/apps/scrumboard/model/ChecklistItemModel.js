import FuseUtils from '@fuse/utils';
import _ from '@lodash';

function ChecklistItemModel(data) {
  data = data || {};

  return _.defaults(data, {
    checklist_item_id: FuseUtils.generateGUID(),
    name: '',
    checked: false,
  });
}

export default ChecklistItemModel;
