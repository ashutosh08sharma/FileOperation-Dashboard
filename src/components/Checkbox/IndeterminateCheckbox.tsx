import React, { useEffect, useRef } from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    indeterminate?: boolean;
}

const IndeterminateCheckbox: React.FC<Props> = ({ indeterminate, ...props }): JSX.Element => {
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.indeterminate = !!indeterminate;
        }
    }, [indeterminate]);

    return (
        <input
            type="checkbox"
            aria-checked={indeterminate ? 'mixed' : props.checked ? 'true' : 'false'}
            ref={ref}
            {...props}
        />
    );
};
export default IndeterminateCheckbox;