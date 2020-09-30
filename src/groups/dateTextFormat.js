import PropTypes from 'prop-types';
import moment from 'moment';

const dateLabel = (date) => {
  const mDate = moment(date);
  if (!mDate.isValid()) return '';

  const now = moment();
  let label = '';

  /** If the date is today, display the isTodayText */
  if (mDate.format('MMDDYYYY') === now.format('MMDDYYYY')) {
    label = mDate.format(`[Today at] h:mm A`);
  } else if (mDate.week() === now.week()) {
    /** If the date is within this week: Monday */
    label = mDate.format('dddd [at] h:mm A');
  } else if (mDate.year() < now.year()) {
    /** If the date is outside of this year: Jan 1, 1996 */
    label = mDate.format('MMM DD, YYYY');
  } else {
    /** If the date is within this year: January 1 */
    label = mDate.format('MMMM DD [at] h:mm A');
  }

  return label;
};

dateLabel.propTypes = {
  date: PropTypes.string.isRequired,
};

export default dateLabel;
