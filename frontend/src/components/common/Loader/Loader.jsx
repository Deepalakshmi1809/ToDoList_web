import { Spin } from 'antd';
import '../../../styles/common/Loader.css';

function Loader({ tip = 'Loading...' }) {
  return (
    <Spin
      size="large"
      tip={tip}
    />
  );
}

export default Loader;