import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SprkAlert = (props) => {
  const {
    message,
    variant,
    additionalClasses,
    dismissible,
    idString,
    analyticsString,
    ...other
  } = props;
  const classNames = classnames(
    'sprk-c-Alert',
    additionalClasses, {
      'sprk-c-Alert--info': variant === 'info',
      'sprk-c-Alert--success': variant === 'success',
      'sprk-c-Alert--fail': variant === 'fail',
    },
  );

  const handleClick = (e) => {
    e.preventDefault();
    // TODO
  };

  return (
    <div className={classNames} role="alert" data-id={idString} data-analytics={analyticsString} {...other}>
      <div className="sprk-c-Alert__content">
        {/* TODO: Icon Component*/}
        <svg className="sprk-c-Alert__icon sprk-c-Icon sprk-c-Icon--l sprk-c-Icon--stroke-current-color" viewBox="0 0 64 64" aria-hidden="true">
          <use xlinkHref="#bell"></use>
        </svg>

        <p className="sprk-c-Alert__text">
          {message}
        </p>
      </div>

      {dismissible &&
        <button className="sprk-c-Alert__icon sprk-c-Alert__icon--dismiss" type="button" title="Dismiss" onClick={handleClick}>
          <svg className="sprk-c-Icon sprk-c-Icon--stroke-current-color" viewBox="0 0 64 64" aria-hidden="true">
            <use xlinkHref="#close"></use>
          </svg>
          close placeholder
        </button>
      }
    </div>
  );
}

SprkAlert.propTypes = {
  // The alert message that will be rendered inside the paragraph tab
  message: PropTypes.string,
  // The link variant that determines the class names
  variant: PropTypes.oneOf(['info', 'success', 'fail']),
  // The string to use for the data-id attribute
  idString: PropTypes.string,
  // Determines if the dismiss button is added
  dismissible: PropTypes.bool,
  // The string to use for the data-analytics attribute
  analyticsString: PropTypes.string,
  // Any additional classes to add to the link
  additionalClasses: PropTypes.string
};

SprkAlert.defaultProps = {
  dismissible: true,
};

export default SprkAlert;
