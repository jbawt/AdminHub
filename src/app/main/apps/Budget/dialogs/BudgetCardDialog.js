import { Dialog } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { closeCardDialog } from '../store/cardSlice';
import BudgetCardForm from './BudgetCardForm';

function BudgetCardDialog(props) {
  const dispatch = useDispatch();
  const cardDialogOpen = useSelector(({ budgetApp }) => budgetApp.card.dialogOpen);

  return (
    <Dialog
      classes={{
        paper: 'max-w-lg w-full m-24',
      }}
      onClose={(ev) => dispatch(closeCardDialog())}
      open={cardDialogOpen}
    >
      <BudgetCardForm />
    </Dialog>
  );
}

export default BudgetCardDialog;
