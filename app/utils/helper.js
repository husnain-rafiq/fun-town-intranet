import Swal from 'sweetalert2';
import { colors } from '../theme/colors';

// SORITNG FUNCTIONS
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export { getComparator, stableSort };

// insertParams

export function insertParams(params) {
  const str = [];
  const paramObj = { ...params };

  Object.keys(paramObj).forEach((key) => {
    const currentParam = paramObj[key];
    str.push(`${encodeURIComponent(key)}=${encodeURIComponent(currentParam)}`);
  });
  return str.join('&');
}

// REUSEABLE TOAST
export const Toast = ({ icon, ...props }) => {
  mixin.fire({ icon, background: colors.toastColors[icon], ...props });
};
const mixin = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: {
    title: 'toastTitleColor',
  },
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});
export const capitalize = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

// REUSEABLE MODAL
export const Modal = Swal.mixin({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: colors.red,
  cancelButtonColor: colors.modalColors.cancel,
  confirmButtonText: 'Yes, delete it!',
});

// USAGE;
// Modal({});

export function isFunction(possibleFunction) {
  return typeof possibleFunction === typeof Function;
}

export function navigateTo(history, url) {
  history.push(url);
}
export function addHourToDate(date, hours) {
  date.setHours(date.getHours() + hours);
  return date;
}
export function formatDate(date) {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
