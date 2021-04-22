


/**
 * Cart is created when the first time addCartItem mutattion is called 
 * 
 * For the first call we will use NEW_CART_ID 
 * and then the  cart will be created and returned where the cartId will be
 * in the global state for future calls
 * Store it in frontend and use for next calls. 
 * 
 */

const NEW_CART_ID = `00000000-0000-0000-0000-000000000000`