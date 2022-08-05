import { Dialog } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { closeEditDialog, closeNewCardDialog } from '../store/cardSlice';
import BudgetCardForm from './BudgetCardForm';

function BudgetCardDialog(props) {
  const dispatch = useDispatch();
  const cardDialogOpen = useSelector(({ budgetApp }) => budgetApp.card.dialogOpen);
  const cardType = useSelector(({ budgetApp }) => budgetApp.card.type);

  function closeEditCardDialog() {
    return cardType === 'edit' ? dispatch(closeEditDialog()) : dispatch(closeNewCardDialog());
  }

  return (
    <Dialog
      classes={{
        paper: 'max-w-lg w-full m-24',
      }}
      onClose={closeEditCardDialog}
      open={cardDialogOpen}
      type={cardType}
    >
      <BudgetCardForm type={cardType} />
    </Dialog>
  );
}

export default BudgetCardDialog;
