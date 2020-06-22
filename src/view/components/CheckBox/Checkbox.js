import React from 'react';
import './checkbox.scss';

export default class Checkbox extends React.Component {
    static defaultProps = {
        hasError: false,
        indeterminate: undefined,
        type: 'default',
    };

    componentDidMount() {
        // Apply the indeterminate attribute of the checkbox input
        this.selector.indeterminate = this.props.indeterminate;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.indeterminate !== this.props.indeterminate) {
            this.selector.indeterminate = this.props.indeterminate;
        }
    }

    render() {
        const { id, label, type, indeterminate, hasError, count, ...inputProps } = this.props;
        const checkboxClassname = `
        m-checkbox
        ${type === 'switch' && 'm-checkbox--switch'}
        ${hasError && 'm-checkbox--has-error'}
      `;

        const inputClassname = `
        m-checkbox__input
        ${type === 'switch' && 'm-checkbox--switch__input'}
        ${hasError && 'm-checkbox--has-error__input'}
      `;

        const labelClassname = `
        m-checkbox__label
        ${type === 'switch' && 'm-checkbox--switch__label'}
      `;

        return (
            <div className={checkboxClassname}>
                <div className="filter__label">
                    <input
                        type="checkbox"
                        className={inputClassname}
                        ref={el => (this.selector = el)}
                        id={id}
                        {...inputProps}
                    />
                    <label className={labelClassname} htmlFor={id}>
                        <div className="filter__counter">{label}</div>
                    </label>
                </div>
                <label className={labelClassname} htmlFor={id}>
                    <div className="filter__counter">{count} </div>
                </label>
            </div>
        );
    }
}
