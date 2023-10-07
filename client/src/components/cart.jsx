import CartItem from './CartItem';

const Cart = ({ items }) => {
  return (
    <div className="cart">
      {items.map(item => (
        <CartItem item={item} />  
      ))}
    </div>
  );
 
};

export default Cart;