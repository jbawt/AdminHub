import _ from '@lodash';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default reorder;

export const reorderQuoteMap = (lists, source, destination) => {
  const current = _.find(lists, { draggableId: source.droppableId });
  const next = _.find(lists, { draggableId: destination.droppableId });
  const target = current.draggableCardIds[source.index];

  // moving to same list
  if (source.draggableId === destination.droppableId) {
    const reordered = reorder(current.draggableCardIds, source.index, destination.index);
    return lists.map((list) => {
      if (list.draggableId === source.droppableId) {
        list.draggableCardIds = reordered;
      }
      return list;
    });
  }

  // moving to different list

  // remove from original
  current.draggableCardIds.splice(source.index, 1);
  // insert into next
  next.draggableCardIds.splice(destination.index, 0, target);

  return lists.map((list) => {
    if (list.draggableId === source.droppableId) {
      return current;
    }
    if (list.draggableId === destination.droppableId) {
      return next;
    }
    return list;
  });
};
