import { Outlet } from 'react-router-dom';

const ElementsLayout = ({ stripe }) => (
  <Elements stripe={stripe}>
    <Outlet />
  </Elements>
);

export default ElementsLayout;