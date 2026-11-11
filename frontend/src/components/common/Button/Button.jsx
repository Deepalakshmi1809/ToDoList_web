import { Button as AntButton } from 'antd';
import '../../../styles/common/Button.css';

function CustomButton({
  children,
  type = 'primary',
  onClick,
  disabled = false,
  loading = false,
  danger = false,
}) {
  return (
    <AntButton
      type={type}
      onClick={onClick}
      disabled={disabled}
      loading={loading}
      danger={danger}
    >
      {children}
    </AntButton>
  );
}

export default CustomButton;