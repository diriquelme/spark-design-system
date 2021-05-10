import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import SprkLabel from '../SprkLabel/SprkLabel';
import SprkErrorContainer from '../SprkErrorContainer/SprkErrorContainer';
import SprkFieldError from '../SprkFieldError/SprkFieldError';
import SprkHelperText from '../SprkHelperText/SprkHelperText';
import isSprkInput from '../../../utilities/helpers/isSprkInput/isSprkInput';

class SprkInputContainer extends Component {
  constructor(props) {
    super(props);
    this.renderChildren = this.renderChildren.bind(this);
  }

  renderChildren() {
    const { children } = this.props;
    let id;
    let labelFor;
    let errorContainerID;
    let helperTextID;
    let inputAriaDescribedBy;
    let inputAriaDescribedByArray = [];

    /*
     * Store references to id, for,
     * errorContainerID and helperTextID.
     */
    React.Children.forEach(children, (child) => {
      if (isSprkInput(child)) {
        id = child.props.id;
        inputAriaDescribedBy = child.props.ariaDescribedBy;
      }
      if (child.type && child.type.name === SprkLabel.name) {
        labelFor = child.props.htmlFor;
      }
      if (
        child.type &&
        (child.type.name === SprkFieldError.name ||
          child.type.name === SprkErrorContainer.name)
      ) {
        errorContainerID = child.props.id;
      }
      if (child.type && child.type.name === SprkHelperText.name) {
        helperTextID = child.props.id;
      }
      // If the child has it's own children and the it's an icon-container,
      // map through them to get values.
      if (
        child.props.children &&
        child.props.className &&
        child.props.className.includes('sprk-b-InputContainer__icon-container')
      ) {
        React.Children.forEach(child.props.children, (grandchild) => {
          if (isSprkInput(grandchild)) {
            id = grandchild.props.id;
            inputAriaDescribedBy = grandchild.props.ariaDescribedBy;
          }
          if (grandchild.type && grandchild.type.name === SprkLabel.name) {
            labelFor = grandchild.props.htmlFor;
          }
        });
      }
    });
    /* Check to see if the errorContainerID
     * and helperTextID are in the inputAriaDescribedByArray.
     * If they aren't, add it to the array.
     */
    if (helperTextID || errorContainerID) {
      if (inputAriaDescribedBy) {
        inputAriaDescribedByArray = inputAriaDescribedBy.split(' ');
      }
      if (helperTextID && !inputAriaDescribedByArray.includes(helperTextID)) {
        inputAriaDescribedByArray.push(helperTextID);
      }
      if (
        errorContainerID &&
        !inputAriaDescribedByArray.includes(errorContainerID)
      ) {
        inputAriaDescribedByArray.push(errorContainerID);
      }
      inputAriaDescribedBy = inputAriaDescribedByArray.join(' ');
    }

    if (id && labelFor && id.length > 0 && labelFor.length > 0) {
      const childrenElements = React.Children.map(children, (child) => {
        /*
         * If the label for and the input id
         * are mismatching, use the id
         * value to set the `for` attribute on the label.
         * SprkInput and SprkLabel will always have
         * an ID and a for. We check for presence (id="")
         * before checking for length to avoid running
         * .length on undefined.
         */
        if (id !== labelFor && child.type.name === SprkLabel.name) {
          return React.cloneElement(child, {
            htmlFor: id,
          });
        }

        /*
         * If there is an inputAriaDescribedBy,
         * add it to the SprkInput element.
         */
        if (inputAriaDescribedBy && isSprkInput(child)) {
          return React.cloneElement(child, {
            ariaDescribedBy: inputAriaDescribedBy,
          });
        }

        if (
          child.props.children &&
          child.props.className &&
          child.props.className.includes(
            'sprk-b-InputContainer__icon-container',
          )
        ) {
          const grandchildrenElements = React.Children.map(
            child.props.children,
            (grandchild) => {
              if (id !== labelFor && grandchild.type.name === SprkLabel.name) {
                return React.cloneElement(grandchild, {
                  htmlFor: id,
                });
              }
              if (inputAriaDescribedBy && isSprkInput(grandchild)) {
                return React.cloneElement(grandchild, {
                  ariaDescribedBy: inputAriaDescribedBy,
                });
              }
              return grandchild;
            },
          );
          return grandchildrenElements;
        }
        return child;
      });
      return childrenElements;
    }
    // Return other elements ex. <div>
    return children;
  }

  render() {
    const {
      additionalClasses,
      analyticsString,
      children,
      idString,
      variant,
      ...rest
    } = this.props;

    return (
      <div
        data-analytics={analyticsString}
        data-id={idString}
        className={classNames('sprk-b-InputContainer', additionalClasses, {
          'sprk-b-InputContainer--huge': variant === 'huge',
        })}
        {...rest}
      >
        {this.renderChildren()}
      </div>
    );
  }
}

SprkInputContainer.propTypes = {
  /**
   * Determines the style of the input container.
   * Supplying no value will cause
   * the default styles to be used.
   */
  variant: PropTypes.oneOf(['huge']),
  /**
   * A space-separated string of
   * classes to add to the outermost
   * container of the component.
   */
  additionalClasses: PropTypes.string,
  /**
   * Assigned to the `data-analytics`
   * attribute serving as a unique selector
   * for outside libraries to capture data.
   */
  analyticsString: PropTypes.string,
  /**
   * Content to render inside of
   * the component.
   */
  children: PropTypes.node,
  /**
   * Assigned to the `data-id` attribute
   * serving as a unique selector for
   * automated tools.
   */
  idString: PropTypes.string,
};

export default SprkInputContainer;
