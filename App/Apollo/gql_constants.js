/**
 * @NEW_ENTITY_ID
 * service management create new atrifact Id's
 * Used the first time a create  mutattion is called 
 * 
 * For the first call we will use NEW_XXXXX_ID 
 * and then the  XXXXX will be created and returned where the xxxxId will be
 * in the global state for future calls
 * Store it in frontend and use for next calls. 
 * 
 * services will probably follow similar pattern, only Cart has confirmed this
 * BuyerID and ProductListingID's may change in future
 */

 const NEW_ENTITY_ID = `00000000-0000-0000-0000-000000000000`