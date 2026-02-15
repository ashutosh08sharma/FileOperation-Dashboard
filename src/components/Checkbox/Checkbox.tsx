import React, { useEffect, useRef } from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  indeterminate?: boolean;
}

const IndeterminateCheckbox: React.FC<Props> = ({ indeterminate, ...props }) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = !!indeterminate;
    }
  }, [indeterminate]);

  return (
    <input
      type="checkbox"
      ref={ref}
      {...props}
    />
  );
};
export default IndeterminateCheckbox;