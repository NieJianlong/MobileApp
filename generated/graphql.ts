import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** SCALARS */
  Date: any;
  /** SCALARS */
  DateTime: any;
  FileUpload: any;
};

export type AddReviewResponse = {
  __typename?: 'AddReviewResponse';
  description?: Maybe<Scalars['String']>;
  postedBy: Scalars['ID'];
  postedByName?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['ID']>;
  ratingVote: Scalars['Int'];
  reviewId: Scalars['ID'];
  sellerId?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
};

export type Address = {
  __typename?: 'Address';
  addressType?: Maybe<AddressType>;
  areaCode?: Maybe<Scalars['String']>;
  block?: Maybe<Scalars['String']>;
  building?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  defaultAddress?: Maybe<Scalars['Boolean']>;
  district?: Maybe<Scalars['String']>;
  flat?: Maybe<Scalars['String']>;
  floor?: Maybe<Scalars['String']>;
  houseNumber?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  landMark?: Maybe<Scalars['String']>;
  pinCode?: Maybe<Scalars['String']>;
  provinceState?: Maybe<Scalars['String']>;
  referenceId?: Maybe<Scalars['String']>;
  streetAddress1?: Maybe<Scalars['String']>;
  streetAddress2?: Maybe<Scalars['String']>;
  townCity?: Maybe<Scalars['String']>;
  villageArea?: Maybe<Scalars['String']>;
};

export type AddressInput = {
  areaCode?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  provinceState?: InputMaybe<Scalars['String']>;
  streetAddress1?: InputMaybe<Scalars['String']>;
  streetAddress2?: InputMaybe<Scalars['String']>;
  townCity?: InputMaybe<Scalars['String']>;
};

export type AddressRequest = {
  addressId: Scalars['ID'];
  addressType?: InputMaybe<AddressType>;
  areaCode?: InputMaybe<Scalars['String']>;
  block?: InputMaybe<Scalars['String']>;
  building?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  defaultAddress?: InputMaybe<Scalars['Boolean']>;
  district?: InputMaybe<Scalars['String']>;
  flat?: InputMaybe<Scalars['String']>;
  floor?: InputMaybe<Scalars['String']>;
  houseNumber?: InputMaybe<Scalars['String']>;
  landMark?: InputMaybe<Scalars['String']>;
  pinCode?: InputMaybe<Scalars['String']>;
  provinceState?: InputMaybe<Scalars['String']>;
  referenceId: Scalars['String'];
  streetAddress1?: InputMaybe<Scalars['String']>;
  streetAddress2?: InputMaybe<Scalars['String']>;
  streetAddress3?: InputMaybe<Scalars['String']>;
  townCity?: InputMaybe<Scalars['String']>;
  villageArea?: InputMaybe<Scalars['String']>;
};

export type AddressRequestForCreate = {
  addressType?: InputMaybe<AddressType>;
  areaCode?: InputMaybe<Scalars['String']>;
  block?: InputMaybe<Scalars['String']>;
  building?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  defaultAddress?: InputMaybe<Scalars['Boolean']>;
  district?: InputMaybe<Scalars['String']>;
  flat?: InputMaybe<Scalars['String']>;
  floor?: InputMaybe<Scalars['String']>;
  houseNumber?: InputMaybe<Scalars['String']>;
  landMark?: InputMaybe<Scalars['String']>;
  pinCode?: InputMaybe<Scalars['String']>;
  provinceState?: InputMaybe<Scalars['String']>;
  referenceId: Scalars['String'];
  streetAddress1?: InputMaybe<Scalars['String']>;
  streetAddress2?: InputMaybe<Scalars['String']>;
  streetAddress3?: InputMaybe<Scalars['String']>;
  townCity?: InputMaybe<Scalars['String']>;
  villageArea?: InputMaybe<Scalars['String']>;
};

export type AddressRequestToGetCoordinates = {
  cityTownVillage?: InputMaybe<Scalars['String']>;
  countryID: Scalars['ID'];
  flatHomeApartmentBuilding?: InputMaybe<Scalars['String']>;
  pinCode?: InputMaybe<Scalars['String']>;
  stateID: Scalars['ID'];
  streetColonyName?: InputMaybe<Scalars['String']>;
};

export type AddressResponse = {
  __typename?: 'AddressResponse';
  addressFloor?: Maybe<Scalars['String']>;
  addressId: Scalars['ID'];
  addressType?: Maybe<AddressType>;
  areaCode?: Maybe<Scalars['String']>;
  block?: Maybe<Scalars['String']>;
  building?: Maybe<Scalars['String']>;
  coordinateResponse?: Maybe<CoordinateResponse>;
  country?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  defaultAddress?: Maybe<Scalars['Boolean']>;
  district?: Maybe<Scalars['String']>;
  flat?: Maybe<Scalars['String']>;
  floor?: Maybe<Scalars['String']>;
  houseNumber?: Maybe<Scalars['String']>;
  isDefault?: Maybe<Scalars['Boolean']>;
  landMark?: Maybe<Scalars['String']>;
  landmark?: Maybe<Scalars['String']>;
  pinCode?: Maybe<Scalars['String']>;
  provinceState?: Maybe<Scalars['String']>;
  referenceId?: Maybe<Scalars['ID']>;
  streetAddress1?: Maybe<Scalars['String']>;
  streetAddress2?: Maybe<Scalars['String']>;
  streetAddress3?: Maybe<Scalars['String']>;
  townCity?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  villageArea?: Maybe<Scalars['String']>;
};

export enum AddressType {
  Billing = 'BILLING',
  Business = 'BUSINESS',
  CollectionPoint = 'COLLECTION_POINT',
  PickUp = 'PICK_UP',
  Return = 'RETURN',
  Shipping = 'SHIPPING',
  Undefined = 'UNDEFINED'
}

export type AddressView = {
  __typename?: 'AddressView';
  addressFloor?: Maybe<Scalars['String']>;
  addressId?: Maybe<Scalars['ID']>;
  areaCode?: Maybe<Scalars['String']>;
  block?: Maybe<Scalars['String']>;
  building?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  district?: Maybe<Scalars['String']>;
  flat?: Maybe<Scalars['String']>;
  houseNumber?: Maybe<Scalars['String']>;
  landmark?: Maybe<Scalars['String']>;
  pinCode?: Maybe<Scalars['String']>;
  provinceState?: Maybe<Scalars['String']>;
  streetAddress1?: Maybe<Scalars['String']>;
  streetAddress2?: Maybe<Scalars['String']>;
  streetAddress3?: Maybe<Scalars['String']>;
  townCity?: Maybe<Scalars['String']>;
  villageArea?: Maybe<Scalars['String']>;
};

export type Announcement = {
  __typename?: 'Announcement';
  announcementDatetime?: Maybe<Scalars['DateTime']>;
  announcementText?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  referenceId?: Maybe<Scalars['String']>;
  validityInterval?: Maybe<Scalars['Int']>;
};

export type BillingDetailsRequest = {
  billingAddress?: InputMaybe<AddressRequest>;
  billingDetailsId: Scalars['ID'];
  buyerId: Scalars['ID'];
  companyName?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  taxCode?: InputMaybe<Scalars['String']>;
};

export type BillingDetailsRequestForCreate = {
  billingAddress: AddressRequestForCreate;
  buyerId: Scalars['ID'];
  companyName?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  taxCode?: InputMaybe<Scalars['String']>;
};

export type BillingDetailsResponse = {
  __typename?: 'BillingDetailsResponse';
  billingAddress?: Maybe<AddressResponse>;
  billingDetailsId?: Maybe<Scalars['ID']>;
  buyerId?: Maybe<Scalars['ID']>;
  companyName?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  taxCode?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export enum BusinessType {
  BusinessSeller = 'BUSINESS_SELLER',
  IndividualSeller = 'INDIVIDUAL_SELLER',
  Undefined = 'UNDEFINED'
}

export type Buyer = {
  __typename?: 'Buyer';
  id: Scalars['ID'];
};

export type BuyerDetailsResponse = {
  __typename?: 'BuyerDetailsResponse';
  buyerId: Scalars['ID'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
};

export type BuyerListingResponse = {
  __typename?: 'BuyerListingResponse';
  content: Array<Maybe<ProductListingView>>;
  pageNo: Scalars['Int'];
  pageSize: Scalars['Int'];
  totalElements: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type BuyerOrderOption = {
  pageOption: PageOption;
  searchString?: InputMaybe<Scalars['String']>;
};

export type BuyerOrderResponse = {
  __typename?: 'BuyerOrderResponse';
  content: Array<OrderItemDetailResponse>;
  pageNo: Scalars['Int'];
  pageSize: Scalars['Int'];
  totalElements: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type BuyerProfileBasicDetailsResponse = {
  __typename?: 'BuyerProfileBasicDetailsResponse';
  buyerId?: Maybe<Scalars['ID']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
};

export type BuyerProfileRequest = {
  applicationSettings?: InputMaybe<Scalars['String']>;
  buyerId: Scalars['ID'];
  categoryPreferences?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  country?: InputMaybe<Scalars['String']>;
  currencies?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  geoLocation?: InputMaybe<Scalars['String']>;
  languages?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  lastName?: InputMaybe<Scalars['String']>;
  oneClickPurchaseOn?: InputMaybe<Scalars['Boolean']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  productPreferences?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sellerPreferences?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type BuyerProfileRequestForCreate = {
  country?: InputMaybe<Scalars['String']>;
  currencies?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  geoLocation?: InputMaybe<Scalars['String']>;
  languages?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  lastName?: InputMaybe<Scalars['String']>;
  oneClickPurchaseOn?: InputMaybe<Scalars['Boolean']>;
  password?: InputMaybe<Scalars['String']>;
  phoneNumber: Scalars['String'];
};

export type BuyerProfileResponse = {
  __typename?: 'BuyerProfileResponse';
  applicationSettings?: Maybe<Scalars['String']>;
  billingDetails?: Maybe<BillingDetailsResponse>;
  bonusSalamiCredit?: Maybe<Scalars['Float']>;
  bonusSalamiCreditExpire?: Maybe<Scalars['DateTime']>;
  buyerId?: Maybe<Scalars['ID']>;
  categoryPreferences?: Maybe<Array<Maybe<Scalars['String']>>>;
  country?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  currencies?: Maybe<Array<Maybe<Scalars['String']>>>;
  email?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['Boolean']>;
  firstName?: Maybe<Scalars['String']>;
  geoLocation?: Maybe<Scalars['String']>;
  guestBuyer?: Maybe<Scalars['Boolean']>;
  languages?: Maybe<Array<Maybe<Scalars['String']>>>;
  lastName?: Maybe<Scalars['String']>;
  notifications?: Maybe<Array<Maybe<NotificationResponse>>>;
  oneClickPurchaseOn?: Maybe<Scalars['Boolean']>;
  paymentOptions?: Maybe<Array<Maybe<PaymentDetailResponse>>>;
  phoneNumber?: Maybe<Scalars['String']>;
  phoneNumberVerified?: Maybe<Scalars['Boolean']>;
  preferences?: Maybe<Array<Maybe<PreferenceResponse>>>;
  productPreferences?: Maybe<Array<Maybe<Scalars['String']>>>;
  refundSalamiCredit?: Maybe<Scalars['Float']>;
  selectedCountry?: Maybe<CountryResponse>;
  selectedSupportedLanguage?: Maybe<SupportedLanguageResponse>;
  sellerPreferences?: Maybe<Array<Maybe<Scalars['String']>>>;
  shareInformations?: Maybe<Array<Maybe<ShareInformationResponse>>>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  userId?: Maybe<Scalars['ID']>;
  userName?: Maybe<Scalars['String']>;
  userType?: Maybe<UserType>;
  walletId?: Maybe<Scalars['ID']>;
  wishLists?: Maybe<Array<Maybe<WishListResponse>>>;
};

export type CancelOrderItemRequest = {
  message?: InputMaybe<Scalars['String']>;
  orderItemId: Scalars['String'];
  reason: CancellationReason;
};

export enum CancellationReason {
  MistakeOrder = 'MISTAKE_ORDER',
  NotAbleToWaitForListingCompletion = 'NOT_ABLE_TO_WAIT_FOR_LISTING_COMPLETION',
  ProductNotRequired = 'PRODUCT_NOT_REQUIRED'
}

export type CartInput = {
  billingDetailsId: Scalars['ID'];
  buyerId: Scalars['ID'];
  cartItems?: InputMaybe<Array<InputMaybe<CartItemInput>>>;
  shippingAddressId?: InputMaybe<Scalars['ID']>;
  useSalamiWallet: Scalars['Boolean'];
};

export type CartItemInput = {
  listingId: Scalars['ID'];
  quantity?: InputMaybe<Scalars['Int']>;
  variantId?: InputMaybe<Scalars['ID']>;
};

export type Category = {
  __typename?: 'Category';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  parentCategory?: Maybe<Category>;
};

export type CategoryView = {
  __typename?: 'CategoryView';
  categoryId?: Maybe<Scalars['ID']>;
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type ChatMessageRequest = {
  chatId: Scalars['ID'];
  chatMessageId: Scalars['ID'];
  msgText?: InputMaybe<Scalars['String']>;
  postedBy?: InputMaybe<Scalars['String']>;
};

export type ChatMessageRequestForCreate = {
  chatId: Scalars['ID'];
  msgText?: InputMaybe<Scalars['String']>;
  postedBy?: InputMaybe<Scalars['String']>;
};

export type ChatMessageResponse = {
  __typename?: 'ChatMessageResponse';
  chatId?: Maybe<Scalars['ID']>;
  chatMessageId?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  msgText?: Maybe<Scalars['String']>;
  postedBy?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ChatRequest = {
  chatId: Scalars['ID'];
  chatOpenPeriodEndDate?: InputMaybe<Scalars['DateTime']>;
  chatOpenPeriodStartDate?: InputMaybe<Scalars['DateTime']>;
  chatStatus?: InputMaybe<ChatStatus>;
  muteFlagForCustomer?: InputMaybe<Scalars['Boolean']>;
  productListingId: Scalars['ID'];
  productName?: InputMaybe<Scalars['String']>;
};

export type ChatRequestForCreate = {
  chatOpenPeriodEndDate?: InputMaybe<Scalars['DateTime']>;
  chatOpenPeriodStartDate?: InputMaybe<Scalars['DateTime']>;
  chatStatus?: InputMaybe<ChatStatus>;
  muteFlagForCustomer?: InputMaybe<Scalars['Boolean']>;
  productListingId: Scalars['ID'];
  productName?: InputMaybe<Scalars['String']>;
};

export type ChatResponse = {
  __typename?: 'ChatResponse';
  buyerProfiles?: Maybe<Array<Maybe<BuyerProfileResponse>>>;
  chatId?: Maybe<Scalars['ID']>;
  chatOpenPeriodEndDate?: Maybe<Scalars['DateTime']>;
  chatOpenPeriodStartDate?: Maybe<Scalars['DateTime']>;
  chatStatus?: Maybe<ChatStatus>;
  createdAt?: Maybe<Scalars['DateTime']>;
  messages?: Maybe<Array<Maybe<ChatMessageResponse>>>;
  muteFlagForCustomer?: Maybe<Scalars['Boolean']>;
  productListingId?: Maybe<Scalars['ID']>;
  productName?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export enum ChatStatus {
  Closed = 'CLOSED',
  Locked = 'LOCKED',
  Open = 'OPEN',
  Suspended = 'SUSPENDED',
  Undefined = 'UNDEFINED'
}

export type ChatSubscriberRequest = {
  buyerId: Scalars['ID'];
  chatId: Scalars['ID'];
};

export type ChatSubscriberRequestForCreate = {
  buyerId: Scalars['ID'];
  chatId: Scalars['ID'];
};

export type ChatSubscriberResponse = {
  __typename?: 'ChatSubscriberResponse';
  buyerId?: Maybe<Scalars['ID']>;
  chatId?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type CollectionPoint = {
  __typename?: 'CollectionPoint';
  address?: Maybe<Address>;
  collectionPointId?: Maybe<Scalars['ID']>;
  microHubId?: Maybe<Scalars['ID']>;
};

export type CollectionPointInput = {
  listingId?: InputMaybe<Scalars['ID']>;
  microHubId: Scalars['ID'];
};

export type CollectionPointPickupDetailView = {
  __typename?: 'CollectionPointPickupDetailView';
  areaCode?: Maybe<Scalars['String']>;
  contactNumber?: Maybe<Scalars['String']>;
  contactPerson?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  microHubId?: Maybe<Scalars['ID']>;
  openingHours?: Maybe<Array<Maybe<Scalars['String']>>>;
  provinceState?: Maybe<Scalars['String']>;
  streetAddress1?: Maybe<Scalars['String']>;
  streetAddress2?: Maybe<Scalars['String']>;
  townCity?: Maybe<Scalars['String']>;
};

export type CollectionPointPickupResponse = {
  __typename?: 'CollectionPointPickupResponse';
  areaCode?: Maybe<Scalars['String']>;
  collectionDate?: Maybe<Scalars['Date']>;
  collectionPointId?: Maybe<Scalars['ID']>;
  contactNumber?: Maybe<Scalars['String']>;
  contactPerson?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  microHubId?: Maybe<Scalars['ID']>;
  openingHours?: Maybe<Array<Maybe<Scalars['String']>>>;
  provinceState?: Maybe<Scalars['String']>;
  streetAddress1?: Maybe<Scalars['String']>;
  streetAddress2?: Maybe<Scalars['String']>;
  townCity?: Maybe<Scalars['String']>;
};

export type CoordinateResponse = {
  __typename?: 'CoordinateResponse';
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
};

export type CountryResponse = {
  __typename?: 'CountryResponse';
  countryName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
};

export type CountryStateResponse = {
  __typename?: 'CountryStateResponse';
  countryId?: Maybe<Scalars['ID']>;
  id?: Maybe<Scalars['ID']>;
  stateName?: Maybe<Scalars['String']>;
};

export type CourierDeliveryDetailView = {
  __typename?: 'CourierDeliveryDetailView';
  courierDeliveryId: Scalars['ID'];
  courierName?: Maybe<Scalars['String']>;
  shippingFees?: Maybe<Scalars['Float']>;
  shippingFeesTaxes?: Maybe<Scalars['Float']>;
};

export type CourierDeliveryDetails = {
  __typename?: 'CourierDeliveryDetails';
  courierDeliveryId: Scalars['ID'];
  courierName?: Maybe<Scalars['String']>;
  shippingFees?: Maybe<Scalars['Float']>;
  shippingFeesTaxes?: Maybe<Scalars['Float']>;
};

export type CourierDeliveryDetailsInput = {
  courierName: Scalars['String'];
  listingId?: InputMaybe<Scalars['String']>;
  shippingFees?: InputMaybe<Scalars['Float']>;
  shippingFeesTaxes?: InputMaybe<Scalars['Float']>;
};

export type DeliveryAddressGeoCoordinateRequest = {
  addressId: Scalars['ID'];
  coordinates?: InputMaybe<PointRequest>;
};

export type DeliveryAddressGeoCoordinateRequestForCreate = {
  addressId: Scalars['ID'];
  coordinates?: InputMaybe<PointRequestForCreate>;
};

export type DeliveryAddressGeoCoordinateResponse = {
  __typename?: 'DeliveryAddressGeoCoordinateResponse';
  addressId: Scalars['ID'];
  coordinates?: Maybe<PointResponse>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type DeliveryAddressToOnlineStoreRequest = {
  addressId: Scalars['ID'];
  storeId: Scalars['ID'];
};

export type DeliveryAddressToOnlineStoreRequestForCreate = {
  addressId: Scalars['ID'];
  storeId: Scalars['ID'];
};

export type DeliveryAddressToOnlineStoreResponse = {
  __typename?: 'DeliveryAddressToOnlineStoreResponse';
  addressId: Scalars['ID'];
  createdAt?: Maybe<Scalars['DateTime']>;
  storeId: Scalars['ID'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type DeliveryAddressesByOnlineStoresResponse = {
  __typename?: 'DeliveryAddressesByOnlineStoresResponse';
  addresses?: Maybe<Array<Maybe<AddressResponse>>>;
};

export enum DeliveryOption {
  CollectionPointPickup = 'COLLECTION_POINT_PICKUP',
  CourierDelivery = 'COURIER_DELIVERY',
  SellerDirectDelivery = 'SELLER_DIRECT_DELIVERY',
  SellerLocationPickup = 'SELLER_LOCATION_PICKUP',
  Undefined = 'UNDEFINED'
}

/** INPUTS */
export type FilterParams = {
  addressId?: InputMaybe<Scalars['String']>;
  buyerId?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<Scalars['String']>;
  listingId?: InputMaybe<Scalars['String']>;
  productId?: InputMaybe<Scalars['String']>;
  sellerId?: InputMaybe<Scalars['String']>;
  storeId?: InputMaybe<Scalars['String']>;
  stores?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  textToSearch?: InputMaybe<Scalars['String']>;
};

export enum FilterType {
  Active = 'ACTIVE',
  ActiveByAddressId = 'ACTIVE_BY_ADDRESS_ID',
  ActiveByAddressIdAndAnnouncement = 'ACTIVE_BY_ADDRESS_ID_AND_ANNOUNCEMENT',
  ActiveByAddressIdAndCategory = 'ACTIVE_BY_ADDRESS_ID_AND_CATEGORY',
  ActiveByAddressIdAndFullTextSearch = 'ACTIVE_BY_ADDRESS_ID_AND_FULL_TEXT_SEARCH',
  ActiveByAddressIdAndSeller = 'ACTIVE_BY_ADDRESS_ID_AND_SELLER',
  ActiveByAddressIdAndShareList = 'ACTIVE_BY_ADDRESS_ID_AND_SHARE_LIST',
  ActiveByStores = 'ACTIVE_BY_STORES',
  ByListingId = 'BY_LISTING_ID',
  BySeller = 'BY_SELLER',
  ByStoreId = 'BY_STORE_ID',
  Undefined = 'UNDEFINED'
}

export type FindReviewResponse = {
  __typename?: 'FindReviewResponse';
  content: Array<ReviewResponse>;
  pageNo: Scalars['Int'];
  pageSize: Scalars['Int'];
  totalElements: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type ForgotPasswordStep1Response = {
  __typename?: 'ForgotPasswordStep1Response';
  email?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
};

export type ForgotPasswordStep2Response = {
  __typename?: 'ForgotPasswordStep2Response';
  actionToken?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type ForgotPasswordStep3Response = {
  __typename?: 'ForgotPasswordStep3Response';
  message?: Maybe<Scalars['String']>;
};

export type GenericResponse = {
  __typename?: 'GenericResponse';
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export type GuestBuyerProfileRequest = {
  buyerId: Scalars['ID'];
  password: Scalars['String'];
};

export enum ImageType {
  Gif = 'GIF',
  Jpg = 'JPG',
  Png = 'PNG',
  Raw = 'RAW',
  Swg = 'SWG',
  Tiff = 'TIFF',
  Undefined = 'UNDEFINED'
}

export type Images = {
  __typename?: 'Images';
  description?: Maybe<Scalars['String']>;
  fullPath?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  imageName?: Maybe<Scalars['String']>;
  imageType?: Maybe<ImageType>;
  referenceId?: Maybe<Scalars['String']>;
};

export type IsListingAvailableInput = {
  listingId: Scalars['ID'];
  /** null if product has only one variant */
  quantity: Scalars['Int'];
  variantId?: InputMaybe<Scalars['ID']>;
};

export type IsListingAvailableResponse = {
  __typename?: 'IsListingAvailableResponse';
  isAvailable?: Maybe<Scalars['Boolean']>;
  listing?: Maybe<ProductListingView>;
  listingId?: Maybe<Scalars['ID']>;
  reason?: Maybe<Scalars['String']>;
  variantId?: Maybe<Scalars['ID']>;
};

export type KeyValuePair = {
  __typename?: 'KeyValuePair';
  key: Scalars['String'];
  value: Scalars['String'];
};

export enum ListingOrderFilterType {
  ListingId = 'LISTING_ID',
  None = 'NONE'
}

export type ListingOrderOptions = {
  filterType: ListingOrderFilterType;
  listingId?: InputMaybe<Scalars['ID']>;
  pageOption: PageOption;
};

export type ListingStatusInput = {
  listingId: Scalars['String'];
  status: ProductListingStatus;
};

export type ListingStoreInput = {
  microHubId?: InputMaybe<Scalars['String']>;
  storeId: Scalars['String'];
};

export type ListingVariantInput = {
  priceId: Scalars['String'];
  quantity: Scalars['Int'];
  variantId?: InputMaybe<Scalars['String']>;
};

export type ListingVariantView = {
  __typename?: 'ListingVariantView';
  defaultVariant?: Maybe<Scalars['Boolean']>;
  fullPath?: Maybe<Scalars['String']>;
  isAvailable?: Maybe<Scalars['Boolean']>;
  itemsAvailable?: Maybe<Scalars['Int']>;
  itemsInStock?: Maybe<Scalars['Int']>;
  itemsSold?: Maybe<Scalars['Int']>;
  listingId: Scalars['ID'];
  options?: Maybe<Array<Maybe<KeyValuePair>>>;
  productId?: Maybe<Scalars['ID']>;
  retailPrice?: Maybe<Scalars['Float']>;
  variantId?: Maybe<Scalars['ID']>;
  wholeSalePrice?: Maybe<Scalars['Float']>;
};

export type MicroHubResponse = {
  __typename?: 'MicroHubResponse';
  address?: Maybe<AddressResponse>;
  contactNumber?: Maybe<Scalars['String']>;
  contactPerson?: Maybe<Scalars['String']>;
  microHubId?: Maybe<Scalars['ID']>;
  openingHours?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** MUTATIONS */
export type Mutation = {
  __typename?: 'Mutation';
  acceptProduct: Product;
  acceptSellerRegistrationDocuments?: Maybe<GenericResponse>;
  addBonusSalamiCredit?: Maybe<Scalars['Float']>;
  addListingToWishlist: Wishlist;
  addOptionValue?: Maybe<Option>;
  /** categories */
  addParentCategory: Category;
  addProductRefundToWallet?: Maybe<SalamiWalletTransactionResponse>;
  addProductReview: AddReviewResponse;
  addRefundSalamiCredit?: Maybe<Scalars['Float']>;
  addReportReview: ReportReviewResponse;
  addRequestForProduct: RequestForProductResponse;
  addSellerReview: AddReviewResponse;
  addShareInformation: ShareInformation;
  addSubCategory: Category;
  approveOrRejectOrderReturnRequest?: Maybe<Scalars['Boolean']>;
  cancelOrderItem?: Maybe<Scalars['Boolean']>;
  cancelOrderItemByListingId?: Maybe<Scalars['Boolean']>;
  changePassword?: Maybe<Scalars['Boolean']>;
  cloneListing: Array<ProductListing>;
  createAddress?: Maybe<AddressResponse>;
  createAddressForGuestBuyer?: Maybe<AddressResponse>;
  createBillingDetails?: Maybe<BillingDetailsResponse>;
  createBillingDetailsForGuestBuyer?: Maybe<BillingDetailsResponse>;
  createChat?: Maybe<ChatResponse>;
  createChatMessage?: Maybe<ChatMessageResponse>;
  createChatSubscriber?: Maybe<ChatSubscriberResponse>;
  createDeliveryAddressGeoCoordinate?: Maybe<DeliveryAddressGeoCoordinateResponse>;
  createDeliveryAddressToOnlineStore?: Maybe<DeliveryAddressToOnlineStoreResponse>;
  createGuestBuyer?: Maybe<BuyerProfileResponse>;
  createNotification?: Maybe<NotificationResponse>;
  /** options */
  createOption?: Maybe<Option>;
  createOrderFromCart?: Maybe<OrderResponse>;
  createPaymentDetail?: Maybe<PaymentDetailResponse>;
  createPreference?: Maybe<PreferenceResponse>;
  createProduct: Product;
  createProductListings: Array<ProductListing>;
  createRecurringListings: Array<ProductListing>;
  createSellerBillingDetails?: Maybe<SellerBillingDetailsResponse>;
  createSellerContact?: Maybe<SellerContactResponse>;
  createSellerToOnlineStore?: Maybe<SellerToOnlineStoreResponse>;
  createShareInformation?: Maybe<ShareInformationResponse>;
  createShippingDetail?: Maybe<ShippingDetailResponse>;
  /** stores */
  createStore?: Maybe<Store>;
  createWishList?: Maybe<WishListResponse>;
  deleteAddress?: Maybe<Scalars['Boolean']>;
  deleteAddressForGuestBuyer?: Maybe<Scalars['Boolean']>;
  deleteBillingDetails?: Maybe<Scalars['Boolean']>;
  deleteBillingDetailsForGuestBuyer?: Maybe<Scalars['Boolean']>;
  deleteBuyerProfile?: Maybe<Scalars['Boolean']>;
  deleteChat?: Maybe<Scalars['Boolean']>;
  deleteChatMessage?: Maybe<Scalars['Boolean']>;
  deleteChatSubscriber?: Maybe<Scalars['Boolean']>;
  deleteDeliveryAddressGeoCoordinate?: Maybe<Scalars['Boolean']>;
  deleteDeliveryAddressToOnlineStore?: Maybe<Scalars['Boolean']>;
  deleteListingFromWishlist: Scalars['Boolean'];
  deleteNotification?: Maybe<Scalars['Boolean']>;
  deleteOption?: Maybe<Scalars['Boolean']>;
  deletePaymentDetail?: Maybe<Scalars['Boolean']>;
  deletePreference?: Maybe<Scalars['Boolean']>;
  deleteProduct: Scalars['Boolean'];
  deleteProductListing: Scalars['Boolean'];
  deleteSellerBillingDetails?: Maybe<Scalars['Boolean']>;
  deleteSellerContact?: Maybe<Scalars['Boolean']>;
  deleteSellerProfile?: Maybe<Scalars['Boolean']>;
  deleteSellerToOnlineStore?: Maybe<Scalars['Boolean']>;
  deleteShareInformation?: Maybe<Scalars['Boolean']>;
  deleteShippingDetail?: Maybe<Scalars['Boolean']>;
  deleteStoreById?: Maybe<Scalars['Boolean']>;
  deleteWishList?: Maybe<Scalars['Boolean']>;
  disableProduct: Product;
  forgotPasswordStep1SendNotificationEmail?: Maybe<ForgotPasswordStep1Response>;
  forgotPasswordStep1SendNotificationSms?: Maybe<ForgotPasswordStep1Response>;
  forgotPasswordStep2VerifyTokenEmail?: Maybe<ForgotPasswordStep2Response>;
  forgotPasswordStep2VerifyTokenSms?: Maybe<ForgotPasswordStep2Response>;
  forgotPasswordStep3ChangeByEmail?: Maybe<ForgotPasswordStep3Response>;
  forgotPasswordStep3ChangeBySms?: Maybe<ForgotPasswordStep3Response>;
  grantGiftPromotion?: Maybe<SalamiWalletGiftTransactionResponse>;
  incrementHelpfulCount?: Maybe<Scalars['Int']>;
  incrementSoldQuantity: Scalars['Boolean'];
  markOrderItemAsDelivered?: Maybe<Scalars['Boolean']>;
  markOrderReturnAsReceived?: Maybe<Scalars['Boolean']>;
  processOrderPaymentStatus: ProcessOrderPaymentStatusResponse;
  rateSeller?: Maybe<Scalars['Boolean']>;
  razorpayCreateOrder: RazorpayOrderResponse;
  razorpayCreateRefund: RazorpayRefundResponse;
  razorpayVerifyPaymentSignature: RazorpayVerifyPaymentSignatureResponse;
  reduceOrderAmountFromWallet?: Maybe<ReduceWalletResponse>;
  reduceSoldQuantity: Scalars['Boolean'];
  refillSalamiCredit?: Maybe<SalamiWalletTransactionResponse>;
  registerBuyer?: Maybe<BuyerProfileResponse>;
  registerGuestBuyerToBuyer?: Maybe<BuyerProfileResponse>;
  registerSeller?: Maybe<SellerProfileResponse>;
  rejectProduct: Product;
  rejectSellerValidation?: Maybe<GenericResponse>;
  saveListingCollectionPoint: CollectionPoint;
  saveListingCourierDeliveryDetails: CourierDeliveryDetails;
  saveListingSellerDirectDelivery: SellerDirectDeliveryResponse;
  saveListingSellerLocation: CollectionPoint;
  saveListingVariants: Array<ProductListingVariant>;
  savePreferredCategories?: Maybe<Scalars['String']>;
  sellerBillingDetailsForSeller?: Maybe<SellerBillingDetailsResponse>;
  sellerContactForSeller?: Maybe<Array<Maybe<SellerContactResponse>>>;
  sendOTPCode?: Maybe<SendCodeResponse>;
  setCountryForUser?: Maybe<CountryResponse>;
  setEscrowAccountToSeller?: Maybe<SellerProfileResponse>;
  setSupportedLanguageForUser?: Maybe<SupportedLanguageResponse>;
  setWalletToBuyer?: Maybe<BuyerProfileResponse>;
  submitOrderReturnRequest?: Maybe<OrderReturnResponse>;
  updateAddress?: Maybe<AddressResponse>;
  updateAddressForGuestBuyer?: Maybe<AddressResponse>;
  updateBillingDetails?: Maybe<BillingDetailsResponse>;
  updateBillingDetailsForGuestBuyer?: Maybe<BillingDetailsResponse>;
  updateBuyerProfile?: Maybe<BuyerProfileResponse>;
  updateCategory: Category;
  updateChat?: Maybe<ChatResponse>;
  updateChatMessage?: Maybe<ChatMessageResponse>;
  updateChatSubscriber?: Maybe<ChatSubscriberResponse>;
  updateDeliveryAddressGeoCoordinate?: Maybe<DeliveryAddressGeoCoordinateResponse>;
  updateDeliveryAddressToOnlineStore?: Maybe<DeliveryAddressToOnlineStoreResponse>;
  updateListingStatus: ProductListing;
  updateNotification?: Maybe<NotificationResponse>;
  updateOrderPaymentStatus: Scalars['Boolean'];
  updatePaymentDetail?: Maybe<PaymentDetailResponse>;
  updatePreference?: Maybe<PreferenceResponse>;
  updateProduct: SellerProductDetailView;
  updateProductListing: ProductListing;
  updateProductPriceAndQuantity: SellerProductDetailView;
  updateProductStatus: Product;
  updateSellerBillingDetails?: Maybe<SellerBillingDetailsResponse>;
  updateSellerContact?: Maybe<SellerContactResponse>;
  updateSellerProfile?: Maybe<SellerProfileResponse>;
  updateSellerToOnlineStore?: Maybe<SellerToOnlineStoreResponse>;
  updateShareInformation?: Maybe<ShareInformationResponse>;
  updateShippingDetail?: Maybe<ShippingDetailResponse>;
  updateStore?: Maybe<Store>;
  updateWishList?: Maybe<WishListResponse>;
  useRefundSalamiCredit?: Maybe<Scalars['Float']>;
  validateCode?: Maybe<ValidateCodeResponse>;
};


/** MUTATIONS */
export type MutationAcceptProductArgs = {
  productId: Scalars['ID'];
};


/** MUTATIONS */
export type MutationAcceptSellerRegistrationDocumentsArgs = {
  sellerId: Scalars['ID'];
};


/** MUTATIONS */
export type MutationAddBonusSalamiCreditArgs = {
  amount: Scalars['Float'];
  bonusSalamiCreditExpire?: InputMaybe<Scalars['DateTime']>;
  buyerId: Scalars['ID'];
};


/** MUTATIONS */
export type MutationAddListingToWishlistArgs = {
  buyerId: Scalars['ID'];
  listingId: Scalars['ID'];
};


/** MUTATIONS */
export type MutationAddOptionValueArgs = {
  optionId: Scalars['ID'];
  value: Scalars['String'];
};


/** MUTATIONS */
export type MutationAddParentCategoryArgs = {
  description: Scalars['String'];
  name: Scalars['String'];
};


/** MUTATIONS */
export type MutationAddProductRefundToWalletArgs = {
  amount: Scalars['Float'];
  buyerId: Scalars['ID'];
  transactionReference: Scalars['ID'];
};


/** MUTATIONS */
export type MutationAddProductReviewArgs = {
  input: ProductReviewInput;
};


/** MUTATIONS */
export type MutationAddRefundSalamiCreditArgs = {
  buyerId: Scalars['ID'];
  refundAmount: Scalars['Float'];
};


/** MUTATIONS */
export type MutationAddReportReviewArgs = {
  input: ReportReviewInput;
};


/** MUTATIONS */
export type MutationAddRequestForProductArgs = {
  input: RequestForProductInput;
};


/** MUTATIONS */
export type MutationAddSellerReviewArgs = {
  input: SellerReviewInput;
};


/** MUTATIONS */
export type MutationAddShareInformationArgs = {
  input: ShareInformationInput;
};


/** MUTATIONS */
export type MutationAddSubCategoryArgs = {
  description: Scalars['String'];
  name: Scalars['String'];
  parentCategoryId: Scalars['String'];
};


/** MUTATIONS */
export type MutationApproveOrRejectOrderReturnRequestArgs = {
  request: OrderReturnEventRequest;
};


/** MUTATIONS */
export type MutationCancelOrderItemArgs = {
  request?: InputMaybe<CancelOrderItemRequest>;
};


/** MUTATIONS */
export type MutationCancelOrderItemByListingIdArgs = {
  listingId: Scalars['ID'];
};


/** MUTATIONS */
export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
  userId: Scalars['ID'];
};


/** MUTATIONS */
export type MutationCloneListingArgs = {
  listingIds: Array<Scalars['String']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
};


/** MUTATIONS */
export type MutationCreateAddressArgs = {
  request: AddressRequestForCreate;
};


/** MUTATIONS */
export type MutationCreateAddressForGuestBuyerArgs = {
  request: AddressRequestForCreate;
};


/** MUTATIONS */
export type MutationCreateBillingDetailsArgs = {
  request: BillingDetailsRequestForCreate;
};


/** MUTATIONS */
export type MutationCreateBillingDetailsForGuestBuyerArgs = {
  request: BillingDetailsRequestForCreate;
};


/** MUTATIONS */
export type MutationCreateChatArgs = {
  request: ChatRequestForCreate;
};


/** MUTATIONS */
export type MutationCreateChatMessageArgs = {
  request: ChatMessageRequestForCreate;
};


/** MUTATIONS */
export type MutationCreateChatSubscriberArgs = {
  request: ChatSubscriberRequestForCreate;
};


/** MUTATIONS */
export type MutationCreateDeliveryAddressGeoCoordinateArgs = {
  request: DeliveryAddressGeoCoordinateRequestForCreate;
};


/** MUTATIONS */
export type MutationCreateDeliveryAddressToOnlineStoreArgs = {
  request: DeliveryAddressToOnlineStoreRequestForCreate;
};


/** MUTATIONS */
export type MutationCreateNotificationArgs = {
  request: NotificationRequestForCreate;
};


/** MUTATIONS */
export type MutationCreateOptionArgs = {
  option?: InputMaybe<OptionInput>;
};


/** MUTATIONS */
export type MutationCreateOrderFromCartArgs = {
  request: CartInput;
};


/** MUTATIONS */
export type MutationCreatePaymentDetailArgs = {
  request: PaymentDetailRequestForCreate;
};


/** MUTATIONS */
export type MutationCreatePreferenceArgs = {
  request: PreferenceRequestForCreate;
};


/** MUTATIONS */
export type MutationCreateProductArgs = {
  productCreateInput: ProductCreateInput;
};


/** MUTATIONS */
export type MutationCreateProductListingsArgs = {
  input: ProductListingsInput;
};


/** MUTATIONS */
export type MutationCreateRecurringListingsArgs = {
  input: RecurringListingInput;
};


/** MUTATIONS */
export type MutationCreateSellerBillingDetailsArgs = {
  request: SellerBillingDetailsRequestForCreate;
};


/** MUTATIONS */
export type MutationCreateSellerContactArgs = {
  request: SellerContactRequestForCreate;
};


/** MUTATIONS */
export type MutationCreateSellerToOnlineStoreArgs = {
  request: SellerToOnlineStoreRequestForCreate;
};


/** MUTATIONS */
export type MutationCreateShareInformationArgs = {
  request: ShareInformationRequestForCreate;
};


/** MUTATIONS */
export type MutationCreateShippingDetailArgs = {
  request: ShippingDetailRequestForCreate;
};


/** MUTATIONS */
export type MutationCreateStoreArgs = {
  storeInput: StoreCreateInput;
};


/** MUTATIONS */
export type MutationCreateWishListArgs = {
  request: WishListRequestForCreate;
};


/** MUTATIONS */
export type MutationDeleteAddressArgs = {
  addressId: Scalars['ID'];
};


/** MUTATIONS */
export type MutationDeleteAddressForGuestBuyerArgs = {
  addressId: Scalars['ID'];
  guestBuyerId: Scalars['ID'];
};


/** MUTATIONS */
export type MutationDeleteBillingDetailsArgs = {
  billingDetailsId: Scalars['ID'];
};


/** MUTATIONS */
export type MutationDeleteBillingDetailsForGuestBuyerArgs = {
  billingDetailsId: Scalars['ID'];
  guestBuyer?: InputMaybe<Scalars['ID']>;
};


/** MUTATIONS */
export type MutationDeleteBuyerProfileArgs = {
  buyerId: Scalars['ID'];
};


/** MUTATIONS */
export type MutationDeleteChatArgs = {
  chatId: Scalars['ID'];
};


/** MUTATIONS */
export type MutationDeleteChatMessageArgs = {
  chatMessageId: Scalars['ID'];
};


/** MUTATIONS */
export type MutationDeleteChatSubscriberArgs = {
  buyerId: Scalars['ID'];
  chatId: Scalars['ID'];
};


/** MUTATIONS */
export type MutationDeleteDeliveryAddressGeoCoordinateArgs = {
  id: Scalars['ID'];
};


/** MUTATIONS */
export type MutationDeleteDeliveryAddressToOnlineStoreArgs = {
  addressId: Scalars['ID'];
  storeId: Scalars['ID'];
};


/** MUTATIONS */
export type MutationDeleteListingFromWishlistArgs = {
  buyerId: Scalars['ID'];
  listingId: Scalars['ID'];
};


/** MUTATIONS */
export type MutationDeleteNotificationArgs = {
  notificationId: Scalars['ID'];
};


/** MUTATIONS */
export type MutationDeleteOptionArgs = {
  optionId: Scalars['String'];
};


/** MUTATIONS */
export type MutationDeletePaymentDetailArgs = {
  paymentDetailId: Scalars['ID'];
};


/** MUTATIONS */
export type MutationDeletePreferenceArgs = {
  preferenceId: Scalars['ID'];
};


/** MUTATIONS */
export type MutationDeleteProductArgs = {
  productId: Scalars['ID'];
};


/** MUTATIONS */
export type MutationDeleteProductListingArgs = {
  listingId: Scalars['String'];
};


/** MUTATIONS */
export type MutationDeleteSellerBillingDetailsArgs = {
  billingDetailsId: Scalars['ID'];
};


/** MUTATIONS */
export type MutationDeleteSellerContactArgs = {
  contactId: Scalars['ID'];
};


/** MUTATIONS */
export type MutationDeleteSellerProfileArgs = {
  sellerId: Scalars['ID'];
};


/** MUTATIONS */
export type MutationDeleteSellerToOnlineStoreArgs = {
  sellerId: Scalars['ID'];
  storeId: Scalars['ID'];
};


/** MUTATIONS */
export type MutationDeleteShareInformationArgs = {
  shareInformationId: Scalars['ID'];
};


/** MUTATIONS */
export type MutationDeleteShippingDetailArgs = {
  shippingId: Scalars['ID'];
};


/** MUTATIONS */
export type MutationDeleteStoreByIdArgs = {
  storeId: Scalars['String'];
};


/** MUTATIONS */
export type MutationDeleteWishListArgs = {
  wishListId: Scalars['ID'];
};


/** MUTATIONS */
export type MutationDisableProductArgs = {
  productId: Scalars['ID'];
};


/** MUTATIONS */
export type MutationForgotPasswordStep1SendNotificationEmailArgs = {
  email: Scalars['String'];
};


/** MUTATIONS */
export type MutationForgotPasswordStep1SendNotificationSmsArgs = {
  sms: Scalars['String'];
};


/** MUTATIONS */
export type MutationForgotPasswordStep2VerifyTokenEmailArgs = {
  email: Scalars['String'];
  tokenCode?: InputMaybe<Scalars['String']>;
};


/** MUTATIONS */
export type MutationForgotPasswordStep2VerifyTokenSmsArgs = {
  sms: Scalars['String'];
  tokenCode?: InputMaybe<Scalars['String']>;
};


/** MUTATIONS */
export type MutationForgotPasswordStep3ChangeByEmailArgs = {
  actionTokenValue: Scalars['String'];
  confirmPassword: Scalars['String'];
  newPassword: Scalars['String'];
};


/** MUTATIONS */
export type MutationForgotPasswordStep3ChangeBySmsArgs = {
  actionTokenValue: Scalars['String'];
  confirmPassword: Scalars['String'];
  newPassword: Scalars['String'];
};


/** MUTATIONS */
export type MutationGrantGiftPromotionArgs = {
  amount: Scalars['Float'];
  buyerId: Scalars['ID'];
  expiryDate?: InputMaybe<Scalars['Date']>;
};


/** MUTATIONS */
export type MutationIncrementHelpfulCountArgs = {
  reviewId: Scalars['String'];
};


/** MUTATIONS */
export type MutationIncrementSoldQuantityArgs = {
  input: VariantSoldQuantityInput;
};


/** MUTATIONS */
export type MutationMarkOrderItemAsDeliveredArgs = {
  request: OrderItemDeliveredRequest;
};


/** MUTATIONS */
export type MutationMarkOrderReturnAsReceivedArgs = {
  request: OrderReturnReceivedRequest;
};


/** MUTATIONS */
export type MutationRateSellerArgs = {
  buyerId: Scalars['ID'];
  rating: Scalars['Float'];
  sellerId: Scalars['ID'];
};


/** MUTATIONS */
export type MutationRazorpayCreateOrderArgs = {
  request: RazorpayOrderRequest;
};


/** MUTATIONS */
export type MutationRazorpayCreateRefundArgs = {
  request: RazorpayRefundRequest;
};


/** MUTATIONS */
export type MutationRazorpayVerifyPaymentSignatureArgs = {
  request: RazorpayVerifyPaymentSignatureRequest;
};


/** MUTATIONS */
export type MutationReduceOrderAmountFromWalletArgs = {
  amount: Scalars['Float'];
  transactionReference: Scalars['ID'];
};


/** MUTATIONS */
export type MutationReduceSoldQuantityArgs = {
  input: VariantSoldQuantityInput;
};


/** MUTATIONS */
export type MutationRefillSalamiCreditArgs = {
  amount: Scalars['Float'];
  transactionReference: Scalars['ID'];
};


/** MUTATIONS */
export type MutationRegisterBuyerArgs = {
  request: BuyerProfileRequestForCreate;
};


/** MUTATIONS */
export type MutationRegisterGuestBuyerToBuyerArgs = {
  request: GuestBuyerProfileRequest;
};


/** MUTATIONS */
export type MutationRegisterSellerArgs = {
  request: SellerProfileRequestForCreate;
};


/** MUTATIONS */
export type MutationRejectProductArgs = {
  productId: Scalars['ID'];
};


/** MUTATIONS */
export type MutationRejectSellerValidationArgs = {
  rejectNote?: InputMaybe<Scalars['String']>;
  rejectReason: RegistrationRejectedReason;
  sellerId: Scalars['ID'];
};


/** MUTATIONS */
export type MutationSaveListingCollectionPointArgs = {
  input: CollectionPointInput;
};


/** MUTATIONS */
export type MutationSaveListingCourierDeliveryDetailsArgs = {
  input: CourierDeliveryDetailsInput;
};


/** MUTATIONS */
export type MutationSaveListingSellerDirectDeliveryArgs = {
  input: SellerDirectDeliveryInput;
};


/** MUTATIONS */
export type MutationSaveListingSellerLocationArgs = {
  input: SellerLocationInput;
};


/** MUTATIONS */
export type MutationSaveListingVariantsArgs = {
  input: ProductListingVariantInput;
};


/** MUTATIONS */
export type MutationSavePreferredCategoriesArgs = {
  buyerId: Scalars['ID'];
  categories?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};


/** MUTATIONS */
export type MutationSellerBillingDetailsForSellerArgs = {
  sellerId: Scalars['ID'];
};


/** MUTATIONS */
export type MutationSellerContactForSellerArgs = {
  sellerId: Scalars['ID'];
};


/** MUTATIONS */
export type MutationSendOtpCodeArgs = {
  sendCodeRequest: SendCodeRequest;
};


/** MUTATIONS */
export type MutationSetCountryForUserArgs = {
  countryId: Scalars['ID'];
  userId: Scalars['ID'];
};


/** MUTATIONS */
export type MutationSetEscrowAccountToSellerArgs = {
  escrowAccountId: Scalars['ID'];
  sellerId?: InputMaybe<Scalars['ID']>;
};


/** MUTATIONS */
export type MutationSetSupportedLanguageForUserArgs = {
  supportedLanguageId: Scalars['ID'];
  userId: Scalars['ID'];
};


/** MUTATIONS */
export type MutationSetWalletToBuyerArgs = {
  buyerId: Scalars['ID'];
  walletId: Scalars['ID'];
};


/** MUTATIONS */
export type MutationSubmitOrderReturnRequestArgs = {
  request: OrderReturnRequest;
};


/** MUTATIONS */
export type MutationUpdateAddressArgs = {
  request: AddressRequest;
};


/** MUTATIONS */
export type MutationUpdateAddressForGuestBuyerArgs = {
  request: AddressRequest;
};


/** MUTATIONS */
export type MutationUpdateBillingDetailsArgs = {
  request: BillingDetailsRequest;
};


/** MUTATIONS */
export type MutationUpdateBillingDetailsForGuestBuyerArgs = {
  request: BillingDetailsRequest;
};


/** MUTATIONS */
export type MutationUpdateBuyerProfileArgs = {
  request: BuyerProfileRequest;
};


/** MUTATIONS */
export type MutationUpdateCategoryArgs = {
  categoryId: Scalars['String'];
  description: Scalars['String'];
  name: Scalars['String'];
};


/** MUTATIONS */
export type MutationUpdateChatArgs = {
  request: ChatRequest;
};


/** MUTATIONS */
export type MutationUpdateChatMessageArgs = {
  request: ChatMessageRequest;
};


/** MUTATIONS */
export type MutationUpdateChatSubscriberArgs = {
  request: ChatSubscriberRequest;
};


/** MUTATIONS */
export type MutationUpdateDeliveryAddressGeoCoordinateArgs = {
  request: DeliveryAddressGeoCoordinateRequest;
};


/** MUTATIONS */
export type MutationUpdateDeliveryAddressToOnlineStoreArgs = {
  request: DeliveryAddressToOnlineStoreRequest;
};


/** MUTATIONS */
export type MutationUpdateListingStatusArgs = {
  input: ListingStatusInput;
};


/** MUTATIONS */
export type MutationUpdateNotificationArgs = {
  request: NotificationRequest;
};


/** MUTATIONS */
export type MutationUpdateOrderPaymentStatusArgs = {
  request: UpdateOrderPaymentStatusRequest;
};


/** MUTATIONS */
export type MutationUpdatePaymentDetailArgs = {
  request: PaymentDetailRequest;
};


/** MUTATIONS */
export type MutationUpdatePreferenceArgs = {
  request: PreferenceRequest;
};


/** MUTATIONS */
export type MutationUpdateProductArgs = {
  input: ProductUpdateInput;
};


/** MUTATIONS */
export type MutationUpdateProductListingArgs = {
  input: ProductListingUpdateInput;
};


/** MUTATIONS */
export type MutationUpdateProductPriceAndQuantityArgs = {
  input: ProductPriceAndQuantityUpdateInput;
};


/** MUTATIONS */
export type MutationUpdateProductStatusArgs = {
  input: ProductStatusInput;
};


/** MUTATIONS */
export type MutationUpdateSellerBillingDetailsArgs = {
  request: SellerBillingDetailsRequest;
};


/** MUTATIONS */
export type MutationUpdateSellerContactArgs = {
  request: SellerContactRequest;
};


/** MUTATIONS */
export type MutationUpdateSellerProfileArgs = {
  request: SellerProfileRequest;
};


/** MUTATIONS */
export type MutationUpdateSellerToOnlineStoreArgs = {
  request: SellerToOnlineStoreRequest;
};


/** MUTATIONS */
export type MutationUpdateShareInformationArgs = {
  request: ShareInformationRequest;
};


/** MUTATIONS */
export type MutationUpdateShippingDetailArgs = {
  request: ShippingDetailRequest;
};


/** MUTATIONS */
export type MutationUpdateStoreArgs = {
  storeId: Scalars['String'];
  storeInput: StoreInput;
};


/** MUTATIONS */
export type MutationUpdateWishListArgs = {
  request: WishListRequest;
};


/** MUTATIONS */
export type MutationUseRefundSalamiCreditArgs = {
  amount: Scalars['Float'];
  buyerId: Scalars['ID'];
};


/** MUTATIONS */
export type MutationValidateCodeArgs = {
  request: ValidateCodeRequest;
};

export type NotificationRequest = {
  buyerId: Scalars['ID'];
  dateTime?: InputMaybe<Scalars['DateTime']>;
  notificationId: Scalars['ID'];
  notificationStatus?: InputMaybe<NotificationStatus>;
  text?: InputMaybe<Scalars['String']>;
};

export type NotificationRequestForCreate = {
  buyerId: Scalars['ID'];
  dateTime?: InputMaybe<Scalars['DateTime']>;
  notificationStatus?: InputMaybe<NotificationStatus>;
  text?: InputMaybe<Scalars['String']>;
};

export type NotificationResponse = {
  __typename?: 'NotificationResponse';
  buyerId?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  dateTime?: Maybe<Scalars['DateTime']>;
  notificationId?: Maybe<Scalars['ID']>;
  notificationStatus?: Maybe<NotificationStatus>;
  text?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export enum NotificationStatus {
  Read = 'READ',
  Undefined = 'UNDEFINED',
  Unread = 'UNREAD'
}

export type OneClickBuyResponse = {
  __typename?: 'OneClickBuyResponse';
  defaultAddress?: Maybe<AddressResponse>;
  defaultPaymentMethod?: Maybe<PaymentDetailResponse>;
};

export enum OnlineStoreType {
  AnnouncementOnlineStore = 'ANNOUNCEMENT_ONLINE_STORE',
  MainOnlineStore = 'MAIN_ONLINE_STORE',
  Undefined = 'UNDEFINED'
}

export type Option = {
  __typename?: 'Option';
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  optionId: Scalars['ID'];
  values?: Maybe<Array<Maybe<OptionValue>>>;
};

export type OptionInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  values: Array<Scalars['String']>;
};

export type OptionValue = {
  __typename?: 'OptionValue';
  value: Scalars['String'];
  valueId: Scalars['ID'];
};

export type OptionValueInput = {
  optionId: Scalars['ID'];
  optionValueId: Scalars['ID'];
};

export enum OrderDateFilterType {
  Custom = 'CUSTOM',
  Last_7Days = 'LAST_7_DAYS',
  Last_30Days = 'LAST_30_DAYS',
  LastYear = 'LAST_YEAR'
}

export type OrderDateParameter = {
  endDate?: InputMaybe<Scalars['Date']>;
  orderDateFilterType: OrderDateFilterType;
  startDate?: InputMaybe<Scalars['Date']>;
};

export type OrderItemDeliveredRequest = {
  buyerId: Scalars['String'];
  orderItemId: Scalars['String'];
};

export type OrderItemDetailResponse = {
  __typename?: 'OrderItemDetailResponse';
  /** returned only for query: getOrderItemDetails */
  buyer?: Maybe<BuyerDetailsResponse>;
  buyerId: Scalars['ID'];
  collectionPoint?: Maybe<CollectionPointPickupResponse>;
  deliveryAddress?: Maybe<AddressResponse>;
  deliveryDate?: Maybe<Scalars['Date']>;
  deliveryOption: DeliveryOption;
  inventoryLocation?: Maybe<Scalars['String']>;
  itemDiscount: Scalars['Float'];
  itemPrice: Scalars['Float'];
  latestEventStatus: OrderItemHistoryEventType;
  listingId: Scalars['ID'];
  listingNumber?: Maybe<Scalars['String']>;
  listingStatus: ProductListingStatus;
  longName?: Maybe<Scalars['String']>;
  mainImagePath?: Maybe<Scalars['String']>;
  orderDatetime: Scalars['DateTime'];
  orderDiscount: Scalars['Float'];
  orderId: Scalars['ID'];
  orderItemId: Scalars['ID'];
  orderItemNumber?: Maybe<Scalars['String']>;
  orderNumber: Scalars['String'];
  orderReturnId?: Maybe<Scalars['ID']>;
  orderServiceFees: Scalars['Float'];
  orderShippingFees: Scalars['Float'];
  orderSubTotal: Scalars['Float'];
  orderTotal: Scalars['Float'];
  paymentStatus?: Maybe<OrderItemHistoryEventType>;
  pickupAddress?: Maybe<AddressResponse>;
  priceId?: Maybe<Scalars['ID']>;
  productId: Scalars['ID'];
  productNumber?: Maybe<Scalars['String']>;
  quantity: Scalars['Int'];
  retailPrice?: Maybe<Scalars['Float']>;
  sellerDirectDelivery?: Maybe<SellerDirectDeliveryResponse>;
  sellerId: Scalars['ID'];
  sellerLocation?: Maybe<SellerLocationPickupResponse>;
  sellerSku?: Maybe<Scalars['String']>;
  shippingDate?: Maybe<Scalars['Date']>;
  shippingDetails?: Maybe<ShippingDetailsResponse>;
  shortName: Scalars['String'];
  storeId: Scalars['ID'];
  taxPercentage?: Maybe<Scalars['Float']>;
  totalSavings: Scalars['Float'];
  variantId?: Maybe<Scalars['ID']>;
  vendorSku?: Maybe<Scalars['String']>;
  wholeSalePrice?: Maybe<Scalars['Float']>;
};

export enum OrderItemHistoryEventType {
  AuthorizedPayment = 'AUTHORIZED_PAYMENT',
  BuyerReturned = 'BUYER_RETURNED',
  CanceledByBuyer = 'CANCELED_BY_BUYER',
  CanceledBySeller = 'CANCELED_BY_SELLER',
  Collected = 'COLLECTED',
  CourierDelivery = 'COURIER_DELIVERY',
  Delivered = 'DELIVERED',
  FailedPayment = 'FAILED_PAYMENT',
  Paid = 'PAID',
  RefundComplete = 'REFUND_COMPLETE',
  RefundRequest = 'REFUND_REQUEST',
  ReplacementComplete = 'REPLACEMENT_COMPLETE',
  ReplacementRequest = 'REPLACEMENT_REQUEST',
  SellerCollectionPoint = 'SELLER_COLLECTION_POINT',
  SellerDelivery = 'SELLER_DELIVERY',
  WaitingForPayment = 'WAITING_FOR_PAYMENT',
  WaitingForShipment = 'WAITING_FOR_SHIPMENT'
}

export type OrderItemHistoryResponse = {
  __typename?: 'OrderItemHistoryResponse';
  eventDateTime: Scalars['DateTime'];
  eventId: Scalars['ID'];
  eventType: OrderItemHistoryEventType;
  notes?: Maybe<Scalars['String']>;
};

export type OrderItemResponse = {
  __typename?: 'OrderItemResponse';
  inventoryLocation?: Maybe<Scalars['String']>;
  itemPrice?: Maybe<Scalars['Float']>;
  listingId?: Maybe<Scalars['ID']>;
  orderItemId?: Maybe<Scalars['ID']>;
  orderItemNumber?: Maybe<Scalars['String']>;
  quantity?: Maybe<Scalars['Int']>;
  sellerId?: Maybe<Scalars['ID']>;
  taxPercentage?: Maybe<Scalars['Float']>;
  variantId?: Maybe<Scalars['ID']>;
};

export type OrderPaymentDetailsResponse = {
  __typename?: 'OrderPaymentDetailsResponse';
  balanceToPay?: Maybe<Scalars['Float']>;
  usedGiftAmount?: Maybe<Scalars['Float']>;
  usedWalletAmount?: Maybe<Scalars['Float']>;
};

/** TYPES */
export type OrderResponse = {
  __typename?: 'OrderResponse';
  buyerId?: Maybe<Scalars['ID']>;
  discount?: Maybe<Scalars['Float']>;
  orderId?: Maybe<Scalars['ID']>;
  orderItems?: Maybe<Array<Maybe<OrderItemResponse>>>;
  orderNumber?: Maybe<Scalars['String']>;
  orderTotal?: Maybe<Scalars['Float']>;
  paymentDetails?: Maybe<OrderPaymentDetailsResponse>;
  serviceFees?: Maybe<Scalars['Float']>;
  shippingFees?: Maybe<Scalars['Float']>;
  subTotal?: Maybe<Scalars['Float']>;
  taxes?: Maybe<Scalars['Float']>;
  totalSavings?: Maybe<Scalars['Float']>;
};

export type OrderReturnEventRequest = {
  event?: InputMaybe<ReturnEventType>;
  notes?: InputMaybe<Scalars['String']>;
  orderReturnId: Scalars['ID'];
};

export type OrderReturnEventResponse = {
  __typename?: 'OrderReturnEventResponse';
  eventDateTime: Scalars['DateTime'];
  eventType: ReturnEventType;
  notes?: Maybe<Scalars['String']>;
  returnId: Scalars['ID'];
};

export enum OrderReturnFilterType {
  None = 'NONE',
  ReturnStatus = 'RETURN_STATUS'
}

export type OrderReturnOptions = {
  filterType: OrderReturnFilterType;
  pageOption: PageOption;
  returnStatus?: InputMaybe<ReturnEventType>;
};

/** INPUTS */
export type OrderReturnReceivedRequest = {
  buyerId: Scalars['ID'];
  orderReturnId: Scalars['ID'];
};

export type OrderReturnRequest = {
  buyerId: Scalars['ID'];
  message?: InputMaybe<Scalars['String']>;
  orderItemId: Scalars['ID'];
  quantity: Scalars['Int'];
  returnOption: ReturnOption;
  returnReasonPolicyId?: InputMaybe<Scalars['ID']>;
};

export type OrderReturnResponse = {
  __typename?: 'OrderReturnResponse';
  collectionPoint?: Maybe<CollectionPointPickupResponse>;
  deadline?: Maybe<Scalars['Date']>;
  deliveryOption: DeliveryOption;
  latestEventStatus: ReturnEventType;
  orderReturnId: Scalars['ID'];
  qrCodeAsBase64?: Maybe<Scalars['String']>;
  returnAddress?: Maybe<AddressResponse>;
  returnLabel?: Maybe<Scalars['String']>;
  returnOption: ReturnOption;
  sellerLocation?: Maybe<SellerLocationPickupResponse>;
};

export type OrderReturnStatusResponse = {
  __typename?: 'OrderReturnStatusResponse';
  deadline?: Maybe<Scalars['Date']>;
  events?: Maybe<Array<Maybe<OrderReturnEventResponse>>>;
  orderReturnId: Scalars['ID'];
};

export type PageOption = {
  pageNumber: Scalars['Int'];
  pageSize: Scalars['Int'];
};

export type PaymentDetailRequest = {
  buyerId: Scalars['ID'];
  isDefaultPaymentType?: InputMaybe<Scalars['Boolean']>;
  paymentDetailId: Scalars['ID'];
  paymentType?: InputMaybe<PaymentType>;
};

export type PaymentDetailRequestForCreate = {
  buyerId: Scalars['ID'];
  isDefaultPaymentType?: InputMaybe<Scalars['Boolean']>;
  paymentType?: InputMaybe<PaymentType>;
};

export type PaymentDetailResponse = {
  __typename?: 'PaymentDetailResponse';
  buyerId?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  isDefaultPaymentType?: Maybe<Scalars['Boolean']>;
  paymentDetailId?: Maybe<Scalars['ID']>;
  paymentType?: Maybe<PaymentType>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

/** TYPES */
export type PaymentResponse = {
  __typename?: 'PaymentResponse';
  gatewayOrderId?: Maybe<Scalars['String']>;
  gatewayOrderStatus?: Maybe<Scalars['String']>;
  gatewayPaymentId?: Maybe<Scalars['String']>;
  gatewayPaymentStatus?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['ID']>;
  paymentAmount?: Maybe<Scalars['Float']>;
  paymentTransactionId?: Maybe<Scalars['ID']>;
  refundedAmount?: Maybe<Scalars['Float']>;
};

export enum PaymentType {
  CashAtDelivery = 'CASH_AT_DELIVERY',
  CreditCard = 'CREDIT_CARD',
  DebitCard = 'DEBIT_CARD',
  Escrow = 'ESCROW',
  Paypal = 'PAYPAL',
  SalamiCredit = 'SALAMI_CREDIT',
  Undefined = 'UNDEFINED',
  WireTransfer = 'WIRE_TRANSFER'
}

export type PointRequest = {
  x: Scalars['Float'];
  y: Scalars['Float'];
};

export type PointRequestForCreate = {
  x: Scalars['Float'];
  y: Scalars['Float'];
};

export type PointResponse = {
  __typename?: 'PointResponse';
  x?: Maybe<Scalars['Float']>;
  y?: Maybe<Scalars['Float']>;
};

export type PolicyNameView = {
  __typename?: 'PolicyNameView';
  name?: Maybe<Scalars['String']>;
  values?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type PreferenceRequest = {
  preferenceId: Scalars['ID'];
  preferenceType?: InputMaybe<PreferenceType>;
  profileId: Scalars['ID'];
  referenceId: Scalars['ID'];
};

export type PreferenceRequestForCreate = {
  preferenceType?: InputMaybe<PreferenceType>;
  profileId: Scalars['ID'];
  referenceId: Scalars['ID'];
};

export type PreferenceResponse = {
  __typename?: 'PreferenceResponse';
  createdAt?: Maybe<Scalars['DateTime']>;
  preferenceId?: Maybe<Scalars['ID']>;
  preferenceType?: Maybe<PreferenceType>;
  profileId?: Maybe<Scalars['ID']>;
  referenceId?: Maybe<Scalars['ID']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export enum PreferenceType {
  Category = 'CATEGORY',
  Product = 'PRODUCT',
  Seller = 'SELLER',
  Undefined = 'UNDEFINED'
}

export type Price = {
  __typename?: 'Price';
  currency?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  retailPrice?: Maybe<Scalars['Float']>;
  salePercentage?: Maybe<Scalars['Float']>;
  taxPercentage?: Maybe<Scalars['Float']>;
  totalQuantityPrice?: Maybe<Scalars['Float']>;
  wholeSalePrice?: Maybe<Scalars['Float']>;
};

export type ProcessOrderPaymentStatusResponse = {
  __typename?: 'ProcessOrderPaymentStatusResponse';
  message: Scalars['String'];
  recordsProcessedSuccessful: Scalars['Int'];
  recordsWithError: Scalars['Int'];
};

/** TYPES */
export type Product = {
  __typename?: 'Product';
  brand?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  highlightBullets?: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['ID'];
  keywords?: Maybe<Array<Maybe<Scalars['String']>>>;
  longName?: Maybe<Scalars['String']>;
  productNumber?: Maybe<Scalars['String']>;
  productStatus: ProductStatus;
  productType?: Maybe<Scalars['String']>;
  shortName: Scalars['String'];
  vendorName?: Maybe<Scalars['String']>;
};

export type ProductCategoryResponse = {
  __typename?: 'ProductCategoryResponse';
  categoryId: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type ProductCategoryView = {
  __typename?: 'ProductCategoryView';
  categoryId?: Maybe<Scalars['ID']>;
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['ID']>;
};

export type ProductCreateInput = {
  productDetailsInput: ProductDetailsInput;
  productReturnPolicyInput: ProductReturnPolicyInput;
  productStocksAndPricingInput: ProductStocksAndPricingInput;
};

export type ProductDetailsInput = {
  brand?: InputMaybe<Scalars['String']>;
  categoryId: Scalars['String'];
  deletedImageIds?: InputMaybe<Array<Scalars['ID']>>;
  description?: InputMaybe<Scalars['String']>;
  highlightBullets?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  keywords?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  longName: Scalars['String'];
  productImages?: InputMaybe<Array<Scalars['FileUpload']>>;
  productType?: InputMaybe<Scalars['String']>;
  shortName: Scalars['String'];
  vendor?: InputMaybe<Scalars['String']>;
};

export type ProductListing = {
  __typename?: 'ProductListing';
  announcement?: Maybe<Announcement>;
  closedDate?: Maybe<Scalars['Date']>;
  deliveryDate?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  minQtyPerCart?: Maybe<Scalars['Int']>;
  minSoldQuantity: Scalars['Int'];
  openUntil: Scalars['Date'];
  product: Product;
  productListingNumber?: Maybe<Scalars['String']>;
  productListingStatus: ProductListingStatus;
  startDate: Scalars['DateTime'];
  store: Store;
};

export enum ProductListingStatus {
  Accepted = 'ACCEPTED',
  Active = 'ACTIVE',
  Closed = 'CLOSED',
  Draft = 'DRAFT',
  Hidden = 'HIDDEN',
  Open = 'OPEN',
  Rejected = 'REJECTED',
  Retired = 'RETIRED',
  Successful = 'SUCCESSFUL',
  Suspended = 'SUSPENDED',
  Undefined = 'UNDEFINED'
}

/** ENUMS */
export enum ProductListingType {
  AnnouncementProductListing = 'ANNOUNCEMENT_PRODUCT_LISTING',
  MainProductListing = 'MAIN_PRODUCT_LISTING',
  RecurringProductListing = 'RECURRING_PRODUCT_LISTING',
  Undefined = 'UNDEFINED'
}

export type ProductListingUpdateInput = {
  listingId: Scalars['String'];
  minQtyPerCart?: InputMaybe<Scalars['Int']>;
  minSoldQuantity?: InputMaybe<Scalars['Int']>;
  openUntil?: InputMaybe<Scalars['Date']>;
  productId: Scalars['String'];
  startDate?: InputMaybe<Scalars['DateTime']>;
  storeId?: InputMaybe<Scalars['String']>;
};

export type ProductListingVariant = {
  __typename?: 'ProductListingVariant';
  itemsAvailable?: Maybe<Scalars['Int']>;
  itemsSold?: Maybe<Scalars['Int']>;
  price?: Maybe<Price>;
  productId: Scalars['ID'];
  productListing: ProductListing;
  variantId?: Maybe<Scalars['ID']>;
};

export type ProductListingVariantInput = {
  listingId: Scalars['String'];
  variants: Array<ListingVariantInput>;
};

export type ProductListingView = {
  __typename?: 'ProductListingView';
  amountSaved?: Maybe<Scalars['Float']>;
  announcementDeliveryDate?: Maybe<Scalars['Date']>;
  announcementId?: Maybe<Scalars['String']>;
  categories?: Maybe<Array<Maybe<ProductCategoryView>>>;
  closedDate?: Maybe<Scalars['String']>;
  courierName?: Maybe<Scalars['String']>;
  courierShippingFee?: Maybe<Scalars['Float']>;
  courierShippingFeeTax?: Maybe<Scalars['Float']>;
  createOn?: Maybe<Scalars['String']>;
  deliveryOption?: Maybe<DeliveryOption>;
  description?: Maybe<Scalars['String']>;
  highlightBullets?: Maybe<Array<Maybe<Scalars['String']>>>;
  images?: Maybe<Array<Maybe<Images>>>;
  itemSold?: Maybe<Scalars['Int']>;
  listingId?: Maybe<Scalars['String']>;
  listingNumber?: Maybe<Scalars['String']>;
  listingVariants?: Maybe<Array<Maybe<ListingVariantView>>>;
  longName?: Maybe<Scalars['String']>;
  minQtyPerCart?: Maybe<Scalars['Int']>;
  minSoldQuantity?: Maybe<Scalars['Int']>;
  noOfItemsInStock?: Maybe<Scalars['Int']>;
  noOfOrderedItems?: Maybe<Scalars['Int']>;
  numberOfItemsAvailable?: Maybe<Scalars['Int']>;
  numberOfReviews?: Maybe<Scalars['Int']>;
  numberOfStars?: Maybe<Scalars['Float']>;
  openUntil?: Maybe<Scalars['String']>;
  percentOff?: Maybe<Scalars['Int']>;
  photo?: Maybe<Scalars['String']>;
  photoUrls?: Maybe<Array<Maybe<Scalars['String']>>>;
  pickupAddress?: Maybe<AddressView>;
  productId?: Maybe<Scalars['String']>;
  productListingType?: Maybe<Scalars['String']>;
  productNumber?: Maybe<Scalars['String']>;
  progressBarValue?: Maybe<Scalars['Int']>;
  qtyAvailable?: Maybe<Scalars['Int']>;
  rating?: Maybe<Scalars['Int']>;
  ratingDetail?: Maybe<RatingDetail>;
  relatedProducts?: Maybe<Scalars['String']>;
  retailPrice?: Maybe<Scalars['Float']>;
  returnAddress?: Maybe<AddressView>;
  returnAddressId?: Maybe<Scalars['String']>;
  returnPolicies?: Maybe<Array<Maybe<ProductReturnPolicyView>>>;
  reviews?: Maybe<Array<Maybe<ReviewView>>>;
  salePercentage?: Maybe<Scalars['Float']>;
  seller?: Maybe<SellerView>;
  sellerId?: Maybe<Scalars['String']>;
  shortName?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  storeId?: Maybe<Scalars['String']>;
  storeName?: Maybe<Scalars['String']>;
  technicalDetails?: Maybe<Scalars['String']>;
  wholeSalePrice?: Maybe<Scalars['Float']>;
};

export type ProductListingsInput = {
  courierDeliveryDetails?: InputMaybe<CourierDeliveryDetailsInput>;
  deliveryOption: DeliveryOption;
  minQtyPerCart: Scalars['Int'];
  minSoldQuantity: Scalars['Int'];
  openUntil: Scalars['Date'];
  productId: Scalars['String'];
  productListingType: ProductListingType;
  sellerLocation?: InputMaybe<SellerLocationInput>;
  startDate: Scalars['DateTime'];
  stores: Array<ListingStoreInput>;
  variants: Array<InputMaybe<ListingVariantInput>>;
};

export type ProductPageable = {
  page?: InputMaybe<Scalars['Int']>;
  searchText?: InputMaybe<Scalars['String']>;
  sellerId?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<ProductSort>;
  sortDirection?: InputMaybe<SortDirection>;
};

export type ProductPriceAndQuantityUpdateInput = {
  itemsInStock: Scalars['Int'];
  priceId: Scalars['ID'];
  productId: Scalars['ID'];
  retailPrice: Scalars['Float'];
  variants?: InputMaybe<Array<VariantPriceAndQuantityUpdateInput>>;
  wholeSalePrice: Scalars['Float'];
};

export type ProductResponse = {
  __typename?: 'ProductResponse';
  content: Array<SellerProductDetailView>;
  pageNo: Scalars['Int'];
  pageSize: Scalars['Int'];
  totalElements: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type ProductReturnPolicy = {
  __typename?: 'ProductReturnPolicy';
  name: Scalars['String'];
  returnPolicyId: Scalars['ID'];
  value: Scalars['String'];
};

export type ProductReturnPolicyInput = {
  addressInput?: InputMaybe<AddressInput>;
  returnLabelImage?: InputMaybe<Scalars['FileUpload']>;
  returnPolicyInputs: Array<InputMaybe<ReturnPolicyInput>>;
};

export type ProductReturnPolicyView = {
  __typename?: 'ProductReturnPolicyView';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['ID']>;
  value?: Maybe<Scalars['String']>;
};

export type ProductReviewInput = {
  description?: InputMaybe<Scalars['String']>;
  productId: Scalars['ID'];
  ratingVote: Scalars['Int'];
  title: Scalars['String'];
};

export enum ProductSort {
  CreatedDate = 'CREATED_DATE',
  Name = 'NAME'
}

export enum ProductStatus {
  Active = 'ACTIVE',
  Closed = 'CLOSED',
  Deleted = 'DELETED',
  Draft = 'DRAFT',
  Hidden = 'HIDDEN',
  Retired = 'RETIRED',
  Suspended = 'SUSPENDED',
  Undefined = 'UNDEFINED'
}

export type ProductStatusInput = {
  productId: Scalars['ID'];
  productStatus?: InputMaybe<ProductStatus>;
};

export type ProductStocksAndPricingInput = {
  currency: Scalars['String'];
  inventoryLocation?: InputMaybe<Scalars['String']>;
  itemsInStock: Scalars['Int'];
  profit?: InputMaybe<Scalars['Float']>;
  retailPrice: Scalars['Float'];
  sellerSku?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['String']>;
  sizeUnit?: InputMaybe<Scalars['String']>;
  taxPercentage?: InputMaybe<Scalars['Float']>;
  variantInputs?: InputMaybe<Array<InputMaybe<ProductVariantInput>>>;
  weight?: InputMaybe<Scalars['Float']>;
  weightUnit?: InputMaybe<Scalars['String']>;
  wholeSalePrice: Scalars['Float'];
};

export type ProductUpdateInput = {
  productDetailsInput: ProductDetailsInput;
  productId: Scalars['ID'];
  productReturnPolicyInput: ProductReturnPolicyInput;
  productStocksAndPricingInput: ProductStocksAndPricingInput;
};

export enum ProductValidationStatus {
  Accepted = 'ACCEPTED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export type ProductVariantInput = {
  defaultVariant: Scalars['Boolean'];
  itemsInStock: Scalars['Int'];
  options?: InputMaybe<Array<InputMaybe<OptionValueInput>>>;
  retailPrice: Scalars['Float'];
  sellerSku?: InputMaybe<Scalars['String']>;
  variantId?: InputMaybe<Scalars['ID']>;
  variantImage?: InputMaybe<Scalars['FileUpload']>;
  wholeSalePrice: Scalars['Float'];
};

/** QUERIES */
export type Query = {
  __typename?: 'Query';
  addressById?: Maybe<AddressResponse>;
  addressByIdForGuestBuyer?: Maybe<AddressResponse>;
  addresses?: Maybe<Array<Maybe<AddressResponse>>>;
  billingDetails?: Maybe<Array<Maybe<BillingDetailsResponse>>>;
  billingDetailsByBuyerId?: Maybe<Array<Maybe<BillingDetailsResponse>>>;
  billingDetailsByGuestBuyerId?: Maybe<Array<Maybe<BillingDetailsResponse>>>;
  billingDetailsById?: Maybe<BillingDetailsResponse>;
  buyerHasVerifiedPhoneNumber?: Maybe<Scalars['Boolean']>;
  buyerProfile?: Maybe<BuyerProfileResponse>;
  buyerProfileBasicDetails: BuyerProfileBasicDetailsResponse;
  buyerProfileByUserId?: Maybe<BuyerProfileResponse>;
  buyerProfiles?: Maybe<Array<Maybe<BuyerProfileResponse>>>;
  chatById?: Maybe<ChatResponse>;
  chatMessageById?: Maybe<ChatMessageResponse>;
  chatMessages?: Maybe<Array<Maybe<ChatMessageResponse>>>;
  chatSubscriberById?: Maybe<ChatSubscriberResponse>;
  chatSubscribers?: Maybe<Array<Maybe<ChatSubscriberResponse>>>;
  chats?: Maybe<Array<Maybe<ChatResponse>>>;
  coordinatesForAddressRequest?: Maybe<CoordinateResponse>;
  coordinatesForAddressRequestFromAddressId?: Maybe<CoordinateResponse>;
  defaultPaymentDetailByBuyerId?: Maybe<PaymentDetailResponse>;
  deliveryAddressForBuyer?: Maybe<AddressResponse>;
  deliveryAddressForGuestBuyer?: Maybe<AddressResponse>;
  deliveryAddressGeoCoordinateById?: Maybe<DeliveryAddressGeoCoordinateResponse>;
  deliveryAddressGeoCoordinates?: Maybe<Array<Maybe<DeliveryAddressGeoCoordinateResponse>>>;
  deliveryAddressToOnlineStoreById?: Maybe<DeliveryAddressToOnlineStoreResponse>;
  deliveryAddressToOnlineStores?: Maybe<Array<Maybe<DeliveryAddressToOnlineStoreResponse>>>;
  deliveryAddressesByOnlineStores?: Maybe<DeliveryAddressesByOnlineStoresResponse>;
  findReviews: FindReviewResponse;
  /** categories */
  getAllCategories: Array<Maybe<CategoryView>>;
  getBuyerAddressByType?: Maybe<Array<Maybe<AddressResponse>>>;
  getBuyerAddressesById?: Maybe<Array<Maybe<AddressResponse>>>;
  getBuyerDefaultAddressByBuyerId?: Maybe<AddressResponse>;
  getBuyerSalamiWalletBalance?: Maybe<SalamiWalletResponse>;
  getBuyerWishlistListing: BuyerListingResponse;
  getCountries?: Maybe<Array<Maybe<CountryResponse>>>;
  getGuestBuyerAddressByType?: Maybe<Array<Maybe<AddressResponse>>>;
  getGuestBuyerAddressesById?: Maybe<Array<Maybe<AddressResponse>>>;
  getGuestBuyerDefaultAddressByBuyerId?: Maybe<AddressResponse>;
  getHowToVideoLink?: Maybe<GenericResponse>;
  getListings: BuyerListingResponse;
  getMicroHubInformation?: Maybe<Array<Maybe<MicroHubResponse>>>;
  /** options */
  getOptionReference: Array<Option>;
  getOrderItemDetails: OrderItemDetailResponse;
  getOrderPaymentDetails?: Maybe<PaymentResponse>;
  getOrderReturn: OrderReturnResponse;
  getOrderReturnStatus: OrderReturnStatusResponse;
  /** return policies */
  getPolicyNames: Array<Maybe<PolicyNameView>>;
  getPreferredCategories: Array<Maybe<CategoryView>>;
  getProductByProductId: SellerProductDetailView;
  getProductReviewSummaryResponse: ReviewSummaryResponse;
  getProducts: ProductResponse;
  getRefundSalamiCredit?: Maybe<Scalars['Float']>;
  getRelatedProducts?: Maybe<Array<Maybe<SellerProductDetailView>>>;
  getSellerAddressByType?: Maybe<Array<Maybe<AddressResponse>>>;
  getSellerAddressesById?: Maybe<Array<Maybe<AddressResponse>>>;
  getSellerDefaultAddressBySellerId?: Maybe<AddressResponse>;
  getSellerDocumentKeys?: Maybe<Array<Maybe<SellerDocumentResponse>>>;
  getSellerListing: SellerListingResponse;
  getSellerListingDetails: SellerListingDetailView;
  getSellerListingForAcceptOrReject: SellerListingResponse;
  getSellerListingGroupByProduct: SellerListingGroupResponse;
  getSellerListingOrders: SellerListingOrderResponse;
  getSellerOrderReturns: SellerOrderReturnResponse;
  getSellerOrders: SellerOrderResponse;
  getSellerReviewSummaryResponse: ReviewSummaryResponse;
  getShareInformationByProductId?: Maybe<Array<Maybe<ShareInformation>>>;
  getStatesByCountryId?: Maybe<Array<Maybe<CountryStateResponse>>>;
  getStoreByName: Store;
  /** stores */
  getStores: StoreResponse;
  getStoresByCityOrProvince: StoreResponse;
  getSupportedLanguages?: Maybe<Array<Maybe<SupportedLanguageResponse>>>;
  guestBuyerProfile?: Maybe<BuyerProfileResponse>;
  isListingAvailable: Array<IsListingAvailableResponse>;
  isListingInWishlist: Scalars['Boolean'];
  notificationById?: Maybe<NotificationResponse>;
  notifications?: Maybe<Array<Maybe<NotificationResponse>>>;
  oneClickBuy?: Maybe<OneClickBuyResponse>;
  onlineStoreByGeoCoordinates: StoreResponse;
  onlineStoresForSeller?: Maybe<Array<Maybe<SellerToOnlineStoreResponse>>>;
  paymentDetailById?: Maybe<PaymentDetailResponse>;
  paymentDetails?: Maybe<Array<Maybe<PaymentDetailResponse>>>;
  paymentDetailsByBuyerId?: Maybe<Array<Maybe<PaymentDetailResponse>>>;
  preferenceById?: Maybe<PreferenceResponse>;
  preferences?: Maybe<Array<Maybe<PreferenceResponse>>>;
  razorpayGetOrderByOrderId: RazorpayOrderResponse;
  searchBuyerOrders: BuyerOrderResponse;
  searchStoreByName: StoreResponse;
  sellerBillingDetails?: Maybe<Array<Maybe<SellerBillingDetailsResponse>>>;
  sellerBillingDetailsById?: Maybe<SellerBillingDetailsResponse>;
  sellerBillingDetailsForSeller?: Maybe<SellerBillingDetailsResponse>;
  sellerContactById?: Maybe<SellerContactResponse>;
  sellerContacts?: Maybe<Array<Maybe<SellerContactResponse>>>;
  sellerContactsBySeller?: Maybe<Array<Maybe<SellerContactResponse>>>;
  sellerProfile?: Maybe<SellerProfileResponse>;
  sellerProfileBasicDetails?: Maybe<SellerProfileBasicDetailsResponse>;
  sellerProfileByUserId?: Maybe<SellerProfileResponse>;
  sellerProfilesPaginated: SellerProfileResponsePaginated;
  sellerToOnlineStoreById?: Maybe<SellerToOnlineStoreResponse>;
  sellerToOnlineStores?: Maybe<Array<Maybe<SellerToOnlineStoreResponse>>>;
  serviceOperatorProfileByUserId?: Maybe<ServiceOperatorResponse>;
  shareInformationById?: Maybe<ShareInformationResponse>;
  shareInformations?: Maybe<Array<Maybe<ShareInformationResponse>>>;
  shippingDetailById?: Maybe<ShippingDetailResponse>;
  shippingDetails?: Maybe<Array<Maybe<ShippingDetailResponse>>>;
  trackOrderItem: TrackOrderItemResponse;
  userHasVerifiedEmail?: Maybe<Scalars['Boolean']>;
  userHasVerifiedPhoneNumber?: Maybe<Scalars['Boolean']>;
  validateBuyerHasAnyOrder: Scalars['Boolean'];
  wishListById?: Maybe<WishListResponse>;
  wishLists?: Maybe<Array<Maybe<WishListResponse>>>;
};


/** QUERIES */
export type QueryAddressByIdArgs = {
  addressId: Scalars['ID'];
};


/** QUERIES */
export type QueryAddressByIdForGuestBuyerArgs = {
  addressId: Scalars['ID'];
  guestBuyerId: Scalars['ID'];
};


/** QUERIES */
export type QueryBillingDetailsByBuyerIdArgs = {
  buyerId: Scalars['ID'];
};


/** QUERIES */
export type QueryBillingDetailsByGuestBuyerIdArgs = {
  guestBuyerId: Scalars['ID'];
};


/** QUERIES */
export type QueryBillingDetailsByIdArgs = {
  billingDetailsId: Scalars['ID'];
};


/** QUERIES */
export type QueryBuyerHasVerifiedPhoneNumberArgs = {
  userId: Scalars['ID'];
};


/** QUERIES */
export type QueryBuyerProfileArgs = {
  buyerId: Scalars['ID'];
};


/** QUERIES */
export type QueryBuyerProfileBasicDetailsArgs = {
  buyerId: Scalars['ID'];
};


/** QUERIES */
export type QueryBuyerProfileByUserIdArgs = {
  userProfileId: Scalars['ID'];
};


/** QUERIES */
export type QueryChatByIdArgs = {
  chatId: Scalars['ID'];
};


/** QUERIES */
export type QueryChatMessageByIdArgs = {
  chatMessageId: Scalars['ID'];
};


/** QUERIES */
export type QueryChatSubscriberByIdArgs = {
  buyerId: Scalars['ID'];
  chatId: Scalars['ID'];
};


/** QUERIES */
export type QueryCoordinatesForAddressRequestArgs = {
  address: AddressRequestToGetCoordinates;
};


/** QUERIES */
export type QueryCoordinatesForAddressRequestFromAddressIdArgs = {
  addressId: Scalars['ID'];
};


/** QUERIES */
export type QueryDefaultPaymentDetailByBuyerIdArgs = {
  buyerId: Scalars['ID'];
};


/** QUERIES */
export type QueryDeliveryAddressForBuyerArgs = {
  buyerId: Scalars['ID'];
};


/** QUERIES */
export type QueryDeliveryAddressForGuestBuyerArgs = {
  buyerId: Scalars['ID'];
};


/** QUERIES */
export type QueryDeliveryAddressGeoCoordinateByIdArgs = {
  addressId: Scalars['ID'];
};


/** QUERIES */
export type QueryDeliveryAddressToOnlineStoreByIdArgs = {
  addressId: Scalars['ID'];
  storeId: Scalars['ID'];
};


/** QUERIES */
export type QueryDeliveryAddressesByOnlineStoresArgs = {
  storeIds?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};


/** QUERIES */
export type QueryFindReviewsArgs = {
  options: ReviewSearchOptions;
};


/** QUERIES */
export type QueryGetBuyerAddressByTypeArgs = {
  addressType?: InputMaybe<AddressType>;
  buyerId: Scalars['ID'];
};


/** QUERIES */
export type QueryGetBuyerAddressesByIdArgs = {
  buyerId: Scalars['ID'];
};


/** QUERIES */
export type QueryGetBuyerDefaultAddressByBuyerIdArgs = {
  buyerId: Scalars['ID'];
};


/** QUERIES */
export type QueryGetBuyerWishlistListingArgs = {
  options: WishlistOption;
};


/** QUERIES */
export type QueryGetGuestBuyerAddressByTypeArgs = {
  addressType?: InputMaybe<AddressType>;
  guestBuyerId: Scalars['ID'];
};


/** QUERIES */
export type QueryGetGuestBuyerAddressesByIdArgs = {
  buyerId: Scalars['ID'];
};


/** QUERIES */
export type QueryGetGuestBuyerDefaultAddressByBuyerIdArgs = {
  buyerId: Scalars['ID'];
};


/** QUERIES */
export type QueryGetListingsArgs = {
  searchOptions?: InputMaybe<SearchOptions>;
};


/** QUERIES */
export type QueryGetOrderItemDetailsArgs = {
  orderItemId: Scalars['ID'];
};


/** QUERIES */
export type QueryGetOrderPaymentDetailsArgs = {
  orderId: Scalars['ID'];
};


/** QUERIES */
export type QueryGetOrderReturnArgs = {
  orderReturnId: Scalars['String'];
};


/** QUERIES */
export type QueryGetOrderReturnStatusArgs = {
  orderReturnId: Scalars['String'];
};


/** QUERIES */
export type QueryGetPreferredCategoriesArgs = {
  buyerId: Scalars['ID'];
};


/** QUERIES */
export type QueryGetProductByProductIdArgs = {
  productId: Scalars['String'];
};


/** QUERIES */
export type QueryGetProductReviewSummaryResponseArgs = {
  productId: Scalars['ID'];
};


/** QUERIES */
export type QueryGetProductsArgs = {
  pageable?: InputMaybe<ProductPageable>;
};


/** QUERIES */
export type QueryGetRefundSalamiCreditArgs = {
  buyerId: Scalars['ID'];
};


/** QUERIES */
export type QueryGetRelatedProductsArgs = {
  productId: Scalars['ID'];
};


/** QUERIES */
export type QueryGetSellerAddressByTypeArgs = {
  addressType?: InputMaybe<AddressType>;
  sellerId: Scalars['ID'];
};


/** QUERIES */
export type QueryGetSellerAddressesByIdArgs = {
  sellerId: Scalars['ID'];
};


/** QUERIES */
export type QueryGetSellerDefaultAddressBySellerIdArgs = {
  sellerId: Scalars['ID'];
};


/** QUERIES */
export type QueryGetSellerDocumentKeysArgs = {
  sellerId: Scalars['ID'];
};


/** QUERIES */
export type QueryGetSellerListingArgs = {
  options: SellerFilterOptions;
  productId?: InputMaybe<Scalars['String']>;
};


/** QUERIES */
export type QueryGetSellerListingDetailsArgs = {
  listingId: Scalars['String'];
};


/** QUERIES */
export type QueryGetSellerListingForAcceptOrRejectArgs = {
  options: SellerFilterOptions;
};


/** QUERIES */
export type QueryGetSellerListingGroupByProductArgs = {
  options: SellerFilterOptions;
};


/** QUERIES */
export type QueryGetSellerListingOrdersArgs = {
  options: ListingOrderOptions;
};


/** QUERIES */
export type QueryGetSellerOrderReturnsArgs = {
  options: OrderReturnOptions;
};


/** QUERIES */
export type QueryGetSellerOrdersArgs = {
  options: SellerOrderOption;
};


/** QUERIES */
export type QueryGetSellerReviewSummaryResponseArgs = {
  sellerId: Scalars['ID'];
};


/** QUERIES */
export type QueryGetShareInformationByProductIdArgs = {
  productId?: InputMaybe<Scalars['String']>;
};


/** QUERIES */
export type QueryGetStatesByCountryIdArgs = {
  countryId: Scalars['ID'];
};


/** QUERIES */
export type QueryGetStoreByNameArgs = {
  name: Scalars['String'];
};


/** QUERIES */
export type QueryGetStoresArgs = {
  pageable: StorePageable;
};


/** QUERIES */
export type QueryGetStoresByCityOrProvinceArgs = {
  pageable: StorePageable;
  place: Scalars['String'];
};


/** QUERIES */
export type QueryGuestBuyerProfileArgs = {
  guestBuyerId: Scalars['ID'];
};


/** QUERIES */
export type QueryIsListingAvailableArgs = {
  listings: Array<IsListingAvailableInput>;
};


/** QUERIES */
export type QueryIsListingInWishlistArgs = {
  buyerId: Scalars['ID'];
  listingId: Scalars['ID'];
};


/** QUERIES */
export type QueryNotificationByIdArgs = {
  notificationId: Scalars['ID'];
};


/** QUERIES */
export type QueryOneClickBuyArgs = {
  buyerId: Scalars['ID'];
};


/** QUERIES */
export type QueryOnlineStoreByGeoCoordinatesArgs = {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  pageable: StorePageable;
};


/** QUERIES */
export type QueryOnlineStoresForSellerArgs = {
  sellerId: Scalars['ID'];
};


/** QUERIES */
export type QueryPaymentDetailByIdArgs = {
  paymentDetailId: Scalars['ID'];
};


/** QUERIES */
export type QueryPaymentDetailsByBuyerIdArgs = {
  buyerId: Scalars['ID'];
};


/** QUERIES */
export type QueryPreferenceByIdArgs = {
  preferenceId: Scalars['ID'];
};


/** QUERIES */
export type QueryRazorpayGetOrderByOrderIdArgs = {
  orderId: Scalars['ID'];
};


/** QUERIES */
export type QuerySearchBuyerOrdersArgs = {
  options: BuyerOrderOption;
};


/** QUERIES */
export type QuerySearchStoreByNameArgs = {
  nameSearchString: Scalars['String'];
  pageable: StorePageable;
  searchType: SearchStringType;
};


/** QUERIES */
export type QuerySellerBillingDetailsByIdArgs = {
  billingDetailsId: Scalars['ID'];
};


/** QUERIES */
export type QuerySellerBillingDetailsForSellerArgs = {
  sellerId: Scalars['ID'];
};


/** QUERIES */
export type QuerySellerContactByIdArgs = {
  contactId: Scalars['ID'];
};


/** QUERIES */
export type QuerySellerContactsBySellerArgs = {
  sellerId: Scalars['ID'];
};


/** QUERIES */
export type QuerySellerProfileArgs = {
  sellerId: Scalars['ID'];
};


/** QUERIES */
export type QuerySellerProfileBasicDetailsArgs = {
  sellerId: Scalars['ID'];
};


/** QUERIES */
export type QuerySellerProfileByUserIdArgs = {
  userProfileId: Scalars['ID'];
};


/** QUERIES */
export type QuerySellerProfilesPaginatedArgs = {
  pageable?: InputMaybe<SellerProfilePageable>;
};


/** QUERIES */
export type QuerySellerToOnlineStoreByIdArgs = {
  sellerId: Scalars['ID'];
  storeId: Scalars['ID'];
};


/** QUERIES */
export type QueryServiceOperatorProfileByUserIdArgs = {
  userProfileId: Scalars['ID'];
};


/** QUERIES */
export type QueryShareInformationByIdArgs = {
  shareInformationId: Scalars['ID'];
};


/** QUERIES */
export type QueryShippingDetailByIdArgs = {
  shippingId: Scalars['ID'];
};


/** QUERIES */
export type QueryTrackOrderItemArgs = {
  orderItemId: Scalars['ID'];
};


/** QUERIES */
export type QueryUserHasVerifiedEmailArgs = {
  userId: Scalars['ID'];
};


/** QUERIES */
export type QueryUserHasVerifiedPhoneNumberArgs = {
  userId: Scalars['ID'];
};


/** QUERIES */
export type QueryValidateBuyerHasAnyOrderArgs = {
  buyerId: Scalars['ID'];
};


/** QUERIES */
export type QueryWishListByIdArgs = {
  wishListId: Scalars['ID'];
};

export type RatingDetail = {
  __typename?: 'RatingDetail';
  fiveStar?: Maybe<Scalars['Int']>;
  fourStar?: Maybe<Scalars['Int']>;
  oneStar?: Maybe<Scalars['Int']>;
  sixAndMoreStar?: Maybe<Scalars['Int']>;
  threeStar?: Maybe<Scalars['Int']>;
  twoStar?: Maybe<Scalars['Int']>;
  zeroStar?: Maybe<Scalars['Int']>;
};

/** INPUTS */
export type RazorpayOrderRequest = {
  amount: Scalars['Float'];
  orderId: Scalars['ID'];
  orderNumber: Scalars['String'];
};

/** TYPES */
export type RazorpayOrderResponse = {
  __typename?: 'RazorpayOrderResponse';
  razorpayOrderId?: Maybe<Scalars['String']>;
  razorpayOrderStatus?: Maybe<RazorpayOrderStatus>;
};

/** ENUMS */
export enum RazorpayOrderStatus {
  Attempted = 'attempted',
  Created = 'created',
  Paid = 'paid'
}

export type RazorpayRefundRequest = {
  amount?: InputMaybe<Scalars['Float']>;
  orderId: Scalars['ID'];
};

export type RazorpayRefundResponse = {
  __typename?: 'RazorpayRefundResponse';
  razorpayRefundId?: Maybe<Scalars['String']>;
  razorpayRefundStatus?: Maybe<Scalars['String']>;
  refundPaymentTimestamp?: Maybe<Scalars['DateTime']>;
  refundPaymentTransactionId?: Maybe<Scalars['ID']>;
  refundedAmount?: Maybe<Scalars['Float']>;
};

export type RazorpayVerifyPaymentSignatureRequest = {
  razorpayOrderId: Scalars['String'];
  razorpayPaymentId: Scalars['String'];
  razorpaySignature: Scalars['String'];
};

export type RazorpayVerifyPaymentSignatureResponse = {
  __typename?: 'RazorpayVerifyPaymentSignatureResponse';
  orderId: Scalars['ID'];
  orderPaymentStatus: OrderItemHistoryEventType;
  razorpayOrderId: Scalars['String'];
  razorpayOrderStatus: Scalars['String'];
  razorpayPaymentId: Scalars['String'];
  razorpayPaymentStatus: Scalars['String'];
  valid: Scalars['Boolean'];
};

export type RecurringListingInput = {
  durationInDays: Scalars['Int'];
  listingId: Scalars['String'];
  minSoldQuantity: Scalars['Int'];
  numberOfRecurring: Scalars['Int'];
  startDate: Scalars['DateTime'];
  variants: Array<ListingVariantInput>;
};

export type ReduceWalletResponse = {
  __typename?: 'ReduceWalletResponse';
  orderAmount?: Maybe<Scalars['Float']>;
  remainingOrderAmount?: Maybe<Scalars['Float']>;
  usedGiftAmount?: Maybe<Scalars['Float']>;
  usedWalletAmount?: Maybe<Scalars['Float']>;
};

export enum RegistrationRejectedReason {
  FalseInformation = 'FALSE_INFORMATION',
  NoNationalIdCardSupplied = 'NO_NATIONAL_ID_CARD_SUPPLIED',
  NoTaxNumberCardSupplied = 'NO_TAX_NUMBER_CARD_SUPPLIED',
  OffensiveShopOrSellerName = 'OFFENSIVE_SHOP_OR_SELLER_NAME',
  Undefined = 'UNDEFINED'
}

export type ReportReviewInput = {
  description?: InputMaybe<Scalars['String']>;
  reportReason: ReportReviewReason;
  reviewId: Scalars['ID'];
  title?: InputMaybe<Scalars['String']>;
};

export enum ReportReviewReason {
  Inappropriate = 'INAPPROPRIATE',
  Irrelevant = 'IRRELEVANT',
  Misleading = 'MISLEADING'
}

export type ReportReviewResponse = {
  __typename?: 'ReportReviewResponse';
  description?: Maybe<Scalars['String']>;
  postedBy: Scalars['ID'];
  postedByName?: Maybe<Scalars['String']>;
  reportReason: ReportReviewReason;
  reviewId: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};

export type RequestForProductInput = {
  productId: Scalars['ID'];
  requestCount: Scalars['Int'];
  storeId: Scalars['ID'];
};

export type RequestForProductResponse = {
  __typename?: 'RequestForProductResponse';
  productId: Scalars['ID'];
  requestsCount?: Maybe<Scalars['Int']>;
  storeId: Scalars['ID'];
};

export enum ReturnEventType {
  Closed = 'CLOSED',
  RefundComplete = 'REFUND_COMPLETE',
  Registered = 'REGISTERED',
  ReplacementComplete = 'REPLACEMENT_COMPLETE',
  SellerApproved = 'SELLER_APPROVED',
  SellerDenied = 'SELLER_DENIED',
  SellerFulfilled = 'SELLER_FULFILLED',
  SellerReceived = 'SELLER_RECEIVED',
  WaitingBuyerReturn = 'WAITING_BUYER_RETURN',
  WaitingSellerApproval = 'WAITING_SELLER_APPROVAL'
}

export enum ReturnOption {
  GetRefund = 'GET_REFUND',
  GetReplacement = 'GET_REPLACEMENT'
}

export type ReturnPolicyInput = {
  name: Scalars['String'];
  value: Scalars['String'];
};

export enum ReviewFilterType {
  ByProduct = 'BY_PRODUCT',
  BySeller = 'BY_SELLER'
}

export type ReviewResponse = {
  __typename?: 'ReviewResponse';
  avatarUrl?: Maybe<Scalars['String']>;
  buyerName?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  productName?: Maybe<Scalars['String']>;
  ratingVote?: Maybe<Scalars['Int']>;
  sellerName?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type ReviewSearchOptions = {
  filter: ReviewFilterType;
  filterParams: FilterParams;
  pageNo: Scalars['Int'];
  pageSize: Scalars['Int'];
  sortBy: SortType;
  sortDirection: SortDirection;
};

export type ReviewSummaryResponse = {
  __typename?: 'ReviewSummaryResponse';
  numberOfReviews?: Maybe<Scalars['Int']>;
  numberOfStars?: Maybe<Scalars['Float']>;
  photo?: Maybe<Scalars['String']>;
  productLongName?: Maybe<Scalars['String']>;
  productName?: Maybe<Scalars['String']>;
  ratingDetail?: Maybe<RatingDetail>;
  sellerName?: Maybe<Scalars['String']>;
};

export type ReviewView = {
  __typename?: 'ReviewView';
  description?: Maybe<Scalars['String']>;
  helpfulCount?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  postedBy?: Maybe<Scalars['ID']>;
  postedByName?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['ID']>;
  ratingVote?: Maybe<Scalars['Int']>;
  sellerId?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
};

export type SalamiWalletGiftTransactionResponse = {
  __typename?: 'SalamiWalletGiftTransactionResponse';
  giftExpiryDate?: Maybe<Scalars['Date']>;
  giftParentTransactionId?: Maybe<Scalars['ID']>;
  giftTransactionId?: Maybe<Scalars['ID']>;
  transactionAmount?: Maybe<Scalars['Float']>;
  transactionReference?: Maybe<Scalars['ID']>;
  transactionTimestamp?: Maybe<Scalars['DateTime']>;
  transactionType?: Maybe<WalletTransactionType>;
  walletId?: Maybe<Scalars['ID']>;
};

export type SalamiWalletResponse = {
  __typename?: 'SalamiWalletResponse';
  buyerId?: Maybe<Scalars['ID']>;
  giftBalance?: Maybe<Scalars['Float']>;
  walletBalance?: Maybe<Scalars['Float']>;
  walletId?: Maybe<Scalars['ID']>;
};

export type SalamiWalletTransactionResponse = {
  __typename?: 'SalamiWalletTransactionResponse';
  transactionAmount?: Maybe<Scalars['Float']>;
  transactionId?: Maybe<Scalars['ID']>;
  transactionReference?: Maybe<Scalars['ID']>;
  transactionTimestamp?: Maybe<Scalars['DateTime']>;
  transactionType?: Maybe<WalletTransactionType>;
  walletId?: Maybe<Scalars['ID']>;
};

export type SearchOptions = {
  filter?: InputMaybe<FilterType>;
  /** default ALL */
  filterParams?: InputMaybe<FilterParams>;
  /** default DESCENDING */
  pageNo?: InputMaybe<Scalars['Int']>;
  /** default 0 */
  pageSize?: InputMaybe<Scalars['Int']>;
  /** default new FilterParams() */
  sortBy?: InputMaybe<SortType>;
  /** default DATE */
  sortDirection?: InputMaybe<SortDirection>;
};

export enum SearchStringType {
  StartsWith = 'STARTS_WITH'
}

export type SellerAddressRequestForCreate = {
  areaCode?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  provinceState?: InputMaybe<Scalars['String']>;
  streetAddress1?: InputMaybe<Scalars['String']>;
  streetAddress2?: InputMaybe<Scalars['String']>;
  townCity?: InputMaybe<Scalars['String']>;
};

export type SellerBillingDetailsRequest = {
  accountName?: InputMaybe<Scalars['String']>;
  accountNumber?: InputMaybe<Scalars['String']>;
  bankAddress?: InputMaybe<Scalars['String']>;
  bankName?: InputMaybe<Scalars['String']>;
  billingDetailsId: Scalars['ID'];
  domesticRoutingCode?: InputMaybe<Scalars['String']>;
  ifscCode?: InputMaybe<Scalars['String']>;
  internationalRoutingCode?: InputMaybe<Scalars['String']>;
  sellerId: Scalars['ID'];
};

export type SellerBillingDetailsRequestForCreate = {
  accountName?: InputMaybe<Scalars['String']>;
  accountNumber?: InputMaybe<Scalars['String']>;
  bankAddress?: InputMaybe<Scalars['String']>;
  bankName?: InputMaybe<Scalars['String']>;
  domesticRoutingCode?: InputMaybe<Scalars['String']>;
  ifscCode?: InputMaybe<Scalars['String']>;
  internationalRoutingCode?: InputMaybe<Scalars['String']>;
  sellerId?: InputMaybe<Scalars['ID']>;
};

export type SellerBillingDetailsResponse = {
  __typename?: 'SellerBillingDetailsResponse';
  accountName?: Maybe<Scalars['String']>;
  accountNumber?: Maybe<Scalars['String']>;
  bankAddress?: Maybe<Scalars['String']>;
  bankName?: Maybe<Scalars['String']>;
  billingDetailsId?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  domesticRoutingCode?: Maybe<Scalars['String']>;
  ifscCode?: Maybe<Scalars['String']>;
  internationalRoutingCode?: Maybe<Scalars['String']>;
  sellerId?: Maybe<Scalars['ID']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type SellerContactRequest = {
  contactEmail?: InputMaybe<Scalars['String']>;
  contactId: Scalars['ID'];
  contactName?: InputMaybe<Scalars['String']>;
  contactPhoneNumber?: InputMaybe<Scalars['String']>;
  sellerId: Scalars['ID'];
  supportEmail?: InputMaybe<Scalars['String']>;
  supportPhoneNumber?: InputMaybe<Scalars['String']>;
};

export type SellerContactRequestForCreate = {
  contactEmail?: InputMaybe<Scalars['String']>;
  contactName?: InputMaybe<Scalars['String']>;
  contactPhoneNumber?: InputMaybe<Scalars['String']>;
  sellerId?: InputMaybe<Scalars['ID']>;
  supportEmail?: InputMaybe<Scalars['String']>;
  supportPhoneNumber?: InputMaybe<Scalars['String']>;
};

export type SellerContactResponse = {
  __typename?: 'SellerContactResponse';
  contactEmail?: Maybe<Scalars['String']>;
  contactId?: Maybe<Scalars['ID']>;
  contactName?: Maybe<Scalars['String']>;
  contactPhoneNumber?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  sellerId?: Maybe<Scalars['ID']>;
  supportEmail?: Maybe<Scalars['String']>;
  supportPhoneNumber?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type SellerDirectDeliveryDetailView = {
  __typename?: 'SellerDirectDeliveryDetailView';
  announcementId: Scalars['ID'];
  deliveryDate: Scalars['Date'];
};

export type SellerDirectDeliveryInput = {
  deliveryDate?: InputMaybe<Scalars['Date']>;
  listingId?: InputMaybe<Scalars['String']>;
};

export type SellerDirectDeliveryResponse = {
  __typename?: 'SellerDirectDeliveryResponse';
  announcementId?: Maybe<Scalars['ID']>;
  deliveryDate?: Maybe<Scalars['Date']>;
  referenceId?: Maybe<Scalars['ID']>;
};

export type SellerDocumentResponse = {
  __typename?: 'SellerDocumentResponse';
  documentKey?: Maybe<Scalars['String']>;
};

export type SellerFilterOptions = {
  filterType: SellerFilterType;
  listingStatus?: InputMaybe<ProductListingStatus>;
  pageOption: SellerPageOption;
  storeIds?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export enum SellerFilterType {
  ListingStatus = 'LISTING_STATUS',
  None = 'NONE',
  Store = 'STORE',
  StoreAndListingStatus = 'STORE_AND_LISTING_STATUS'
}

export type SellerListingDetailView = {
  __typename?: 'SellerListingDetailView';
  collectionPoint?: Maybe<CollectionPointPickupDetailView>;
  courierDelivery?: Maybe<CourierDeliveryDetailView>;
  deliveryOption: DeliveryOption;
  listingId: Scalars['ID'];
  listingNumber?: Maybe<Scalars['String']>;
  minSoldQuantity?: Maybe<Scalars['Int']>;
  openUntil?: Maybe<Scalars['Date']>;
  product: SellerProductDetailView;
  productListingStatus: ProductListingStatus;
  productListingType?: Maybe<ProductListingType>;
  sellerDirectDelivery?: Maybe<SellerDirectDeliveryDetailView>;
  sellerLocation?: Maybe<SellerLocationPickupDetailView>;
  startDate?: Maybe<Scalars['DateTime']>;
  store?: Maybe<SellerListingStore>;
  variants: Array<SellerListingVariant>;
};

export type SellerListingGroupResponse = {
  __typename?: 'SellerListingGroupResponse';
  content?: Maybe<Array<Maybe<SellerListingGroupView>>>;
  pageNo: Scalars['Int'];
  pageSize: Scalars['Int'];
  totalElements: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type SellerListingGroupView = {
  __typename?: 'SellerListingGroupView';
  active: Scalars['Int'];
  ended: Scalars['Int'];
  mainImageUrl?: Maybe<Scalars['String']>;
  productId: Scalars['ID'];
  productNumber?: Maybe<Scalars['String']>;
  shortName?: Maybe<Scalars['String']>;
  total: Scalars['Int'];
};

export type SellerListingOrder = {
  __typename?: 'SellerListingOrder';
  defaultVariantId: Scalars['ID'];
  defaultVariantPriceId: Scalars['ID'];
  delivered: Scalars['Int'];
  listingId: Scalars['ID'];
  listingNumber?: Maybe<Scalars['String']>;
  listingStatus: ProductListingStatus;
  longName?: Maybe<Scalars['String']>;
  mainImagePath?: Maybe<Scalars['String']>;
  productId: Scalars['ID'];
  productNumber?: Maybe<Scalars['String']>;
  retailPrice: Scalars['Float'];
  returns: Scalars['Int'];
  sellerId: Scalars['ID'];
  shortName: Scalars['String'];
  storeId: Scalars['ID'];
  total: Scalars['Int'];
  wholeSalePrice: Scalars['Float'];
};

export type SellerListingOrderResponse = {
  __typename?: 'SellerListingOrderResponse';
  content: Array<SellerListingOrder>;
  pageNo: Scalars['Int'];
  pageSize: Scalars['Int'];
  totalElements: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type SellerListingResponse = {
  __typename?: 'SellerListingResponse';
  content: Array<SellerListingView>;
  pageNo: Scalars['Int'];
  pageSize: Scalars['Int'];
  totalElements: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type SellerListingStore = {
  __typename?: 'SellerListingStore';
  area?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  onlineStoreType?: Maybe<OnlineStoreType>;
  provinceState?: Maybe<Scalars['String']>;
  storeId?: Maybe<Scalars['ID']>;
};

export type SellerListingVariant = {
  __typename?: 'SellerListingVariant';
  defaultVariant?: Maybe<Scalars['Boolean']>;
  itemsAvailable: Scalars['Int'];
  itemsInStock: Scalars['Int'];
  itemsSold: Scalars['Int'];
  options?: Maybe<Array<Maybe<KeyValuePair>>>;
  photoUrl?: Maybe<Scalars['String']>;
  priceId?: Maybe<Scalars['ID']>;
  retailPrice: Scalars['Float'];
  sellerSku?: Maybe<Scalars['String']>;
  variantId?: Maybe<Scalars['ID']>;
  wholeSalePrice: Scalars['Float'];
};

export type SellerListingView = {
  __typename?: 'SellerListingView';
  categories?: Maybe<Array<Maybe<Scalars['String']>>>;
  closedDate?: Maybe<Scalars['Date']>;
  daysLeft?: Maybe<Scalars['Int']>;
  discountPercentage?: Maybe<Scalars['Float']>;
  listingId: Scalars['ID'];
  listingNumber?: Maybe<Scalars['String']>;
  listingStatus: ProductListingStatus;
  mainPhotoUrl?: Maybe<Scalars['String']>;
  minSoldQuantity?: Maybe<Scalars['Int']>;
  openUntil?: Maybe<Scalars['Date']>;
  priceId: Scalars['ID'];
  productId: Scalars['ID'];
  productNumber?: Maybe<Scalars['String']>;
  retailPrice?: Maybe<Scalars['Float']>;
  shortName: Scalars['String'];
  startDate?: Maybe<Scalars['DateTime']>;
  storeId: Scalars['ID'];
  storeName?: Maybe<Scalars['String']>;
  totalItemsAvailable?: Maybe<Scalars['Int']>;
  totalItemsSold?: Maybe<Scalars['Int']>;
  wholeSalePrice?: Maybe<Scalars['Float']>;
};

export type SellerLocationInput = {
  areaCode?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  isSameAsBusinessAddress: Scalars['Boolean'];
  listingId?: InputMaybe<Scalars['ID']>;
  provinceState?: InputMaybe<Scalars['String']>;
  streetAddress1?: InputMaybe<Scalars['String']>;
  streetAddress2?: InputMaybe<Scalars['String']>;
  townCity?: InputMaybe<Scalars['String']>;
};

export type SellerLocationPickupDetailView = {
  __typename?: 'SellerLocationPickupDetailView';
  areaCode?: Maybe<Scalars['String']>;
  collectionPointId: Scalars['ID'];
  country?: Maybe<Scalars['String']>;
  provinceState?: Maybe<Scalars['String']>;
  streetAddress1?: Maybe<Scalars['String']>;
  streetAddress2?: Maybe<Scalars['String']>;
  townCity?: Maybe<Scalars['String']>;
};

export type SellerLocationPickupResponse = {
  __typename?: 'SellerLocationPickupResponse';
  areaCode?: Maybe<Scalars['String']>;
  collectionDate?: Maybe<Scalars['Date']>;
  collectionPointId?: Maybe<Scalars['ID']>;
  contactNumber?: Maybe<Scalars['String']>;
  contactPerson?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  provinceState?: Maybe<Scalars['String']>;
  streetAddress1?: Maybe<Scalars['String']>;
  streetAddress2?: Maybe<Scalars['String']>;
  townCity?: Maybe<Scalars['String']>;
};

export enum SellerOrderFilterType {
  EventStatus = 'EVENT_STATUS',
  None = 'NONE',
  OrderDate = 'ORDER_DATE'
}

export type SellerOrderOption = {
  eventStatus?: InputMaybe<OrderItemHistoryEventType>;
  filterType: SellerOrderFilterType;
  orderDate?: InputMaybe<OrderDateParameter>;
  pageOption: PageOption;
};

export type SellerOrderResponse = {
  __typename?: 'SellerOrderResponse';
  content: Array<OrderItemDetailResponse>;
  pageNo: Scalars['Int'];
  pageSize: Scalars['Int'];
  totalElements: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type SellerOrderReturn = {
  __typename?: 'SellerOrderReturn';
  itemPrice?: Maybe<Scalars['Float']>;
  listingId?: Maybe<Scalars['ID']>;
  listingNumber?: Maybe<Scalars['String']>;
  longName?: Maybe<Scalars['String']>;
  mainImagePath?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['ID']>;
  orderItemId?: Maybe<Scalars['ID']>;
  orderItemNumber?: Maybe<Scalars['String']>;
  orderNumber?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['ID']>;
  productNumber?: Maybe<Scalars['String']>;
  returnId?: Maybe<Scalars['ID']>;
  returnOption?: Maybe<ReturnOption>;
  returnReason?: Maybe<Scalars['String']>;
  returnRequest?: Maybe<ReturnEventType>;
  returnStatus?: Maybe<ReturnEventType>;
  shortName?: Maybe<Scalars['String']>;
};

export type SellerOrderReturnResponse = {
  __typename?: 'SellerOrderReturnResponse';
  content: Array<SellerOrderReturn>;
  pageNo: Scalars['Int'];
  pageSize: Scalars['Int'];
  totalElements: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type SellerPageOption = {
  pageNumber: Scalars['Int'];
  pageSize: Scalars['Int'];
};

export type SellerProductDetailView = {
  __typename?: 'SellerProductDetailView';
  availableInventory: Scalars['Int'];
  brand?: Maybe<Scalars['String']>;
  categories: Array<ProductCategoryResponse>;
  description?: Maybe<Scalars['String']>;
  highlightBullets?: Maybe<Array<Maybe<Scalars['String']>>>;
  images?: Maybe<Array<Maybe<SellerProductImage>>>;
  inventoryLocation?: Maybe<Scalars['String']>;
  itemsInStock: Scalars['Int'];
  keywords?: Maybe<Array<Maybe<Scalars['String']>>>;
  longName: Scalars['String'];
  mainPhotoUrl?: Maybe<Scalars['String']>;
  price?: Maybe<SellerProductPrice>;
  productId: Scalars['ID'];
  productNumber?: Maybe<Scalars['String']>;
  productStatus?: Maybe<ProductStatus>;
  productType?: Maybe<Scalars['String']>;
  returnPolicy: SellerReturnPolicy;
  sellerSku?: Maybe<Scalars['String']>;
  shortName: Scalars['String'];
  validationStatus?: Maybe<ProductValidationStatus>;
  variants: Array<SellerProductVariant>;
  vendorName?: Maybe<Scalars['String']>;
  vendorSku?: Maybe<Scalars['String']>;
};

export type SellerProductImage = {
  __typename?: 'SellerProductImage';
  description?: Maybe<Scalars['String']>;
  imageId?: Maybe<Scalars['ID']>;
  imageName?: Maybe<Scalars['String']>;
  imageType?: Maybe<Scalars['String']>;
  photoUrl?: Maybe<Scalars['String']>;
};

export type SellerProductPrice = {
  __typename?: 'SellerProductPrice';
  currency: Scalars['String'];
  priceId: Scalars['ID'];
  profit: Scalars['Float'];
  retailPrice: Scalars['Float'];
  salePercentage?: Maybe<Scalars['Float']>;
  savePercentage: Scalars['Float'];
  taxPercentage?: Maybe<Scalars['Float']>;
  totalQuantityPrice?: Maybe<Scalars['Float']>;
  wholeSalePrice: Scalars['Float'];
};

export type SellerProductVariant = {
  __typename?: 'SellerProductVariant';
  availableInventory: Scalars['Int'];
  defaultVariant: Scalars['Boolean'];
  itemsInStock: Scalars['Int'];
  options?: Maybe<Array<VariantOptionResponse>>;
  photoUrl: Scalars['String'];
  priceId: Scalars['ID'];
  profit: Scalars['Float'];
  retailPrice: Scalars['Float'];
  savePercentage: Scalars['Float'];
  sellerSku?: Maybe<Scalars['String']>;
  variantId: Scalars['ID'];
  wholeSalePrice: Scalars['Float'];
};

export type SellerProfileBasicDetailsResponse = {
  __typename?: 'SellerProfileBasicDetailsResponse';
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  sellerId?: Maybe<Scalars['ID']>;
  storeName?: Maybe<Scalars['String']>;
};

export type SellerProfilePageable = {
  page?: InputMaybe<Scalars['Int']>;
  sellerValidationStatus?: InputMaybe<SellerValidationStatus>;
  size?: InputMaybe<Scalars['Int']>;
};

export type SellerProfileRequest = {
  avatarUrl?: InputMaybe<Scalars['String']>;
  biography?: InputMaybe<Scalars['String']>;
  brandName?: InputMaybe<Scalars['String']>;
  businessName?: InputMaybe<Scalars['String']>;
  businessType?: InputMaybe<BusinessType>;
  commChamberRegNum?: InputMaybe<Scalars['String']>;
  commChamberRegNumValidated?: InputMaybe<Scalars['Boolean']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  geoLocation?: InputMaybe<Scalars['String']>;
  govCompanyId?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  manufacturerBrandOwner?: InputMaybe<Scalars['Boolean']>;
  middleName?: InputMaybe<Scalars['String']>;
  nationalIdNumber?: InputMaybe<Scalars['String']>;
  nationalIdNumberValidated?: InputMaybe<Scalars['Boolean']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  productsUpcAvailable?: InputMaybe<Scalars['Boolean']>;
  registeredTrademarksOwner?: InputMaybe<Scalars['Boolean']>;
  sellerId: Scalars['ID'];
  sellerName?: InputMaybe<Scalars['String']>;
  sellerType?: InputMaybe<SellerType>;
  shortName?: InputMaybe<Scalars['String']>;
  storeName?: InputMaybe<Scalars['String']>;
  storeShortName?: InputMaybe<Scalars['String']>;
  taxNumber?: InputMaybe<Scalars['String']>;
  taxNumberValidated?: InputMaybe<Scalars['Boolean']>;
  vatCode?: InputMaybe<Scalars['String']>;
  vatCodeValidated?: InputMaybe<Scalars['Boolean']>;
  vstGstNumber?: InputMaybe<Scalars['String']>;
};

export type SellerProfileRequestForCreate = {
  aadharCardDocument?: InputMaybe<Scalars['FileUpload']>;
  avatarUrl?: InputMaybe<Scalars['String']>;
  biography?: InputMaybe<Scalars['String']>;
  brandName?: InputMaybe<Scalars['String']>;
  businessName?: InputMaybe<Scalars['String']>;
  businessType: BusinessType;
  commChamberRegNum?: InputMaybe<Scalars['String']>;
  commChamberRegNumValidated?: InputMaybe<Scalars['Boolean']>;
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  geoLocation?: InputMaybe<Scalars['String']>;
  govCompanyId?: InputMaybe<Scalars['String']>;
  gstinNumberDocument?: InputMaybe<Scalars['FileUpload']>;
  lastName?: InputMaybe<Scalars['String']>;
  manufacturerBrandOwner: Scalars['Boolean'];
  middleName?: InputMaybe<Scalars['String']>;
  nationalIdNumber?: InputMaybe<Scalars['String']>;
  nationalIdNumberValidated?: InputMaybe<Scalars['Boolean']>;
  panCardDocument?: InputMaybe<Scalars['FileUpload']>;
  password: Scalars['String'];
  phoneNumber?: InputMaybe<Scalars['String']>;
  productsUpcAvailable: Scalars['Boolean'];
  registeredTrademarksOwner: Scalars['Boolean'];
  sellerAddress: SellerAddressRequestForCreate;
  sellerBillingDetails?: InputMaybe<SellerBillingDetailsRequestForCreate>;
  sellerContact?: InputMaybe<SellerContactRequestForCreate>;
  sellerName?: InputMaybe<Scalars['String']>;
  sellerType?: InputMaybe<SellerType>;
  shortName?: InputMaybe<Scalars['String']>;
  storeName?: InputMaybe<Scalars['String']>;
  storeShortName?: InputMaybe<Scalars['String']>;
  taxNumber?: InputMaybe<Scalars['String']>;
  taxNumberValidated?: InputMaybe<Scalars['Boolean']>;
  vatCode?: InputMaybe<Scalars['String']>;
  vatCodeValidated?: InputMaybe<Scalars['Boolean']>;
  vatNumberDocument?: InputMaybe<Scalars['FileUpload']>;
  vstGstNumber?: InputMaybe<Scalars['String']>;
};

export type SellerProfileResponse = {
  __typename?: 'SellerProfileResponse';
  avatarUrl?: Maybe<Scalars['String']>;
  biography?: Maybe<Scalars['String']>;
  brandName?: Maybe<Scalars['String']>;
  businessName?: Maybe<Scalars['String']>;
  businessType?: Maybe<BusinessType>;
  commChamberRegNum?: Maybe<Scalars['String']>;
  commChamberRegNumValidated?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['Boolean']>;
  escrowAccountId?: Maybe<Scalars['ID']>;
  firstName?: Maybe<Scalars['String']>;
  geoLocation?: Maybe<Scalars['String']>;
  govCompanyId?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  manufacturerBrandOwner?: Maybe<Scalars['Boolean']>;
  middleName?: Maybe<Scalars['String']>;
  nationalIdNumber?: Maybe<Scalars['String']>;
  nationalIdNumberValidated?: Maybe<Scalars['Boolean']>;
  phoneNumber?: Maybe<Scalars['String']>;
  phoneNumberVerified?: Maybe<Scalars['Boolean']>;
  productsUpcAvailable?: Maybe<Scalars['Boolean']>;
  registeredTrademarksOwner?: Maybe<Scalars['Boolean']>;
  registrationRejectedNotes?: Maybe<Scalars['String']>;
  registrationRejectedReason?: Maybe<RegistrationRejectedReason>;
  selectedCountry?: Maybe<CountryResponse>;
  selectedSupportedLanguage?: Maybe<SupportedLanguageResponse>;
  sellerBillingDetails?: Maybe<SellerBillingDetailsResponse>;
  sellerContacts?: Maybe<Array<Maybe<SellerContactResponse>>>;
  sellerId?: Maybe<Scalars['ID']>;
  sellerName?: Maybe<Scalars['String']>;
  sellerType?: Maybe<SellerType>;
  sellerValidationStatus?: Maybe<SellerValidationStatus>;
  shortName?: Maybe<Scalars['String']>;
  storeName?: Maybe<Scalars['String']>;
  storeShortName?: Maybe<Scalars['String']>;
  taxNumber?: Maybe<Scalars['String']>;
  taxNumberValidated?: Maybe<Scalars['Boolean']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  userId?: Maybe<Scalars['ID']>;
  userName?: Maybe<Scalars['String']>;
  userType?: Maybe<UserType>;
  usersRating?: Maybe<Scalars['String']>;
  validationStatusChangedBy?: Maybe<Scalars['ID']>;
  vatCode?: Maybe<Scalars['String']>;
  vatCodeValidated?: Maybe<Scalars['Boolean']>;
  vstGstNumber?: Maybe<Scalars['String']>;
};

export type SellerProfileResponsePaginated = {
  __typename?: 'SellerProfileResponsePaginated';
  content: Array<SellerProfileResponse>;
  pageNo: Scalars['Int'];
  pageSize: Scalars['Int'];
  totalElements: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type SellerReturnPolicy = {
  __typename?: 'SellerReturnPolicy';
  policies?: Maybe<Array<Maybe<ProductReturnPolicy>>>;
  returnAddress?: Maybe<AddressView>;
  returnLabel?: Maybe<SellerProductImage>;
};

export type SellerReviewInput = {
  description?: InputMaybe<Scalars['String']>;
  ratingVote: Scalars['Int'];
  sellerId: Scalars['ID'];
  title?: InputMaybe<Scalars['String']>;
};

export type SellerToOnlineStoreRequest = {
  sellerId: Scalars['ID'];
  storeId: Scalars['ID'];
};

export type SellerToOnlineStoreRequestForCreate = {
  sellerId: Scalars['ID'];
  storeId: Scalars['ID'];
};

export type SellerToOnlineStoreResponse = {
  __typename?: 'SellerToOnlineStoreResponse';
  createdAt?: Maybe<Scalars['DateTime']>;
  sellerId: Scalars['ID'];
  storeId: Scalars['ID'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export enum SellerType {
  AnnouncementSeller = 'ANNOUNCEMENT_SELLER',
  MainSeller = 'MAIN_SELLER',
  Undefined = 'UNDEFINED'
}

export enum SellerValidationStatus {
  Accepted = 'ACCEPTED',
  Pending = 'PENDING',
  Rejected = 'REJECTED',
  Undefined = 'UNDEFINED'
}

export type SellerView = {
  __typename?: 'SellerView';
  avatarUrl?: Maybe<Scalars['String']>;
  brandName?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  ratingCount?: Maybe<Scalars['Float']>;
  usersRating?: Maybe<Scalars['Float']>;
};

export type SendCodeRequest = {
  userId: Scalars['ID'];
  validationType: ValidationType;
};

export type SendCodeResponse = {
  __typename?: 'SendCodeResponse';
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export type ServiceOperatorResponse = {
  __typename?: 'ServiceOperatorResponse';
  serviceOperatorId?: Maybe<Scalars['ID']>;
  userProfileResponse?: Maybe<UserProfileResponse>;
};

export enum ShareChannel {
  Facebook = 'FACEBOOK',
  Google = 'GOOGLE',
  PlainLink = 'PLAIN_LINK',
  Qrcode = 'QRCODE',
  Twitter = 'TWITTER',
  Undefined = 'UNDEFINED',
  Whatsapp = 'WHATSAPP'
}

export enum ShareChannelType {
  Facebook = 'FACEBOOK',
  Google = 'GOOGLE',
  PlainLink = 'PLAIN_LINK',
  Qrcode = 'QRCODE',
  Twitter = 'TWITTER',
  Undefined = 'UNDEFINED',
  Whatsapp = 'WHATSAPP'
}

export type ShareInformation = {
  __typename?: 'ShareInformation';
  buyer?: Maybe<Buyer>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  product?: Maybe<Product>;
  productPageUrl?: Maybe<Scalars['String']>;
  shareChannel?: Maybe<ShareChannelType>;
  shareTitle?: Maybe<Scalars['String']>;
  targetEmailAddress?: Maybe<Scalars['String']>;
};

export type ShareInformationInput = {
  productId: Scalars['ID'];
  productPageUrl?: InputMaybe<Scalars['String']>;
  shareChannel: ShareChannelType;
  shareTitle?: InputMaybe<Scalars['String']>;
  targetEmailAddress?: InputMaybe<Scalars['String']>;
};

export type ShareInformationRequest = {
  buyerId: Scalars['ID'];
  hashtags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  productId: Scalars['ID'];
  productPageUrl?: InputMaybe<Scalars['String']>;
  shareChannel?: InputMaybe<ShareChannel>;
  shareInformationId: Scalars['ID'];
  shareMessage?: InputMaybe<Scalars['String']>;
  shareTitle?: InputMaybe<Scalars['String']>;
  targetEmailAddress?: InputMaybe<Scalars['String']>;
};

export type ShareInformationRequestForCreate = {
  buyerId: Scalars['ID'];
  hashtags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  productId: Scalars['ID'];
  productPageUrl?: InputMaybe<Scalars['String']>;
  shareChannel?: InputMaybe<ShareChannel>;
  shareMessage?: InputMaybe<Scalars['String']>;
  shareTitle?: InputMaybe<Scalars['String']>;
  targetEmailAddress?: InputMaybe<Scalars['String']>;
};

export type ShareInformationResponse = {
  __typename?: 'ShareInformationResponse';
  buyerId?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  hashtags?: Maybe<Array<Maybe<Scalars['String']>>>;
  productId?: Maybe<Scalars['ID']>;
  productPageUrl?: Maybe<Scalars['String']>;
  shareChannel?: Maybe<ShareChannel>;
  shareInformationId?: Maybe<Scalars['ID']>;
  shareMessage?: Maybe<Scalars['String']>;
  shareTitle?: Maybe<Scalars['String']>;
  targetEmailAddress?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ShippingDetailRequest = {
  carrier?: InputMaybe<Scalars['String']>;
  carrierUrl?: InputMaybe<Scalars['String']>;
  deliveryDate?: InputMaybe<Scalars['DateTime']>;
  expectedDeliveryDate?: InputMaybe<Scalars['DateTime']>;
  failedDeliveryReason?: InputMaybe<Scalars['String']>;
  orderId: Scalars['ID'];
  orderItemId: Scalars['ID'];
  shippingAddressId: Scalars['ID'];
  shippingDate?: InputMaybe<Scalars['DateTime']>;
  shippingId: Scalars['ID'];
  shippingInstructions?: InputMaybe<Scalars['String']>;
  shippingMethod?: InputMaybe<ShippingMethod>;
  shippingStatus?: InputMaybe<ShippingStatus>;
  trackingNum?: InputMaybe<Scalars['String']>;
};

export type ShippingDetailRequestForCreate = {
  carrier?: InputMaybe<Scalars['String']>;
  carrierUrl?: InputMaybe<Scalars['String']>;
  deliveryDate?: InputMaybe<Scalars['DateTime']>;
  expectedDeliveryDate?: InputMaybe<Scalars['DateTime']>;
  failedDeliveryReason?: InputMaybe<Scalars['String']>;
  orderId: Scalars['ID'];
  orderItemId: Scalars['ID'];
  shippingAddressId: Scalars['ID'];
  shippingDate?: InputMaybe<Scalars['DateTime']>;
  shippingInstructions?: InputMaybe<Scalars['String']>;
  shippingMethod?: InputMaybe<ShippingMethod>;
  shippingStatus?: InputMaybe<ShippingStatus>;
  trackingNum?: InputMaybe<Scalars['String']>;
};

export type ShippingDetailResponse = {
  __typename?: 'ShippingDetailResponse';
  carrier?: Maybe<Scalars['String']>;
  carrierUrl?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  deliveryDate?: Maybe<Scalars['DateTime']>;
  expectedDeliveryDate?: Maybe<Scalars['DateTime']>;
  failedDeliveryReason?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['ID']>;
  orderItemId?: Maybe<Scalars['ID']>;
  shippingAddressId?: Maybe<Scalars['ID']>;
  shippingDate?: Maybe<Scalars['DateTime']>;
  shippingId?: Maybe<Scalars['ID']>;
  shippingInstructions?: Maybe<Scalars['String']>;
  shippingMethod?: Maybe<ShippingMethod>;
  shippingStatus?: Maybe<ShippingStatus>;
  trackingNum?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ShippingDetailsResponse = {
  __typename?: 'ShippingDetailsResponse';
  carrier?: Maybe<Scalars['String']>;
  carrierUrl?: Maybe<Scalars['String']>;
  deliveryDate?: Maybe<Scalars['Date']>;
  events?: Maybe<Array<Maybe<ShippingEventResponse>>>;
  expectedDeliveryDate?: Maybe<Scalars['Date']>;
  failedDeliveryReason?: Maybe<Scalars['String']>;
  shippingDate?: Maybe<Scalars['Date']>;
  shippingInstructions?: Maybe<Scalars['String']>;
  shippingStatus?: Maybe<ShippingStatus>;
  trackingNumber?: Maybe<Scalars['String']>;
};

export type ShippingEventResponse = {
  __typename?: 'ShippingEventResponse';
  eventDateTime?: Maybe<Scalars['DateTime']>;
  eventType?: Maybe<Scalars['String']>;
};

export enum ShippingMethod {
  CollectionPoint = 'COLLECTION_POINT',
  DeliveryAddress = 'DELIVERY_ADDRESS',
  Undefined = 'UNDEFINED'
}

/** ENUMS */
export enum ShippingStatus {
  Delivered = 'DELIVERED',
  DeliveryFailed = 'DELIVERY_FAILED',
  OnRoute = 'ON_ROUTE',
  OutForDelivery = 'OUT_FOR_DELIVERY',
  Shipped = 'SHIPPED',
  Undefined = 'UNDEFINED',
  WaitingForShipping = 'WAITING_FOR_SHIPPING'
}

export enum SortDirection {
  Ascending = 'ASCENDING',
  Descending = 'DESCENDING',
  Undefined = 'UNDEFINED'
}

export enum SortType {
  Date = 'DATE',
  Price = 'PRICE',
  Rating = 'RATING',
  Undefined = 'UNDEFINED'
}

export type Store = {
  __typename?: 'Store';
  area?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Scalars['ID']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  onlineStoreType?: Maybe<OnlineStoreType>;
  provinceState?: Maybe<Scalars['String']>;
};

export type StoreCreateInput = {
  area: Scalars['String'];
  city: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  onlineStoreType: OnlineStoreType;
  provinceState?: InputMaybe<Scalars['String']>;
};

export type StoreInput = {
  area?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  onlineStoreType?: InputMaybe<OnlineStoreType>;
  provinceState?: InputMaybe<Scalars['String']>;
};

export type StorePageable = {
  page?: InputMaybe<Scalars['Int']>;
  sellerId?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<StoreSort>;
  sortDirection?: InputMaybe<SortDirection>;
};

export type StoreResponse = {
  __typename?: 'StoreResponse';
  content: Array<Store>;
  pageNo: Scalars['Int'];
  pageSize: Scalars['Int'];
  totalElements: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export enum StoreSort {
  City = 'CITY',
  Created = 'CREATED',
  Date = 'DATE',
  Name = 'NAME'
}

export type SupportedLanguageResponse = {
  __typename?: 'SupportedLanguageResponse';
  id?: Maybe<Scalars['ID']>;
  language?: Maybe<Scalars['String']>;
};

export type TrackOrderItemResponse = {
  __typename?: 'TrackOrderItemResponse';
  collectionPoint?: Maybe<CollectionPointPickupResponse>;
  dateDelivered?: Maybe<Scalars['DateTime']>;
  deliveryOption: DeliveryOption;
  events?: Maybe<Array<OrderItemHistoryResponse>>;
  latestEventStatus: OrderItemHistoryEventType;
  orderItemId: Scalars['ID'];
  orderItemNumber?: Maybe<Scalars['String']>;
  orderNumber: Scalars['String'];
  qrCodeAsBase64?: Maybe<Scalars['String']>;
  sellerBusinessName: Scalars['String'];
  sellerDirectDelivery?: Maybe<SellerDirectDeliveryResponse>;
  sellerLocation?: Maybe<SellerLocationPickupResponse>;
  shippingDetails?: Maybe<ShippingDetailsResponse>;
};

export type UpdateOrderPaymentStatusRequest = {
  orderId: Scalars['ID'];
  paymentStatus: OrderItemHistoryEventType;
};

export type UserProfileResponse = {
  __typename?: 'UserProfileResponse';
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  geoLocation?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  middleName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  selectedCountry?: Maybe<CountryResponse>;
  selectedSupportedLanguage?: Maybe<SupportedLanguageResponse>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  userId?: Maybe<Scalars['ID']>;
  userName?: Maybe<Scalars['String']>;
  userType?: Maybe<UserType>;
};

export enum UserType {
  Admin = 'ADMIN',
  Buyer = 'BUYER',
  CompanyBuyer = 'COMPANY_BUYER',
  GuestBuyer = 'GUEST_BUYER',
  Seller = 'SELLER',
  Sop1 = 'SOP1',
  Sop2 = 'SOP2',
  Sop3 = 'SOP3',
  Sop4 = 'SOP4',
  Sop5 = 'SOP5',
  Sop6 = 'SOP6',
  Sop7 = 'SOP7',
  Undefined = 'UNDEFINED'
}

export type ValidateCodeRequest = {
  code: Scalars['String'];
  userId: Scalars['ID'];
  validationType: ValidationType;
};

export type ValidateCodeResponse = {
  __typename?: 'ValidateCodeResponse';
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export enum ValidationType {
  Email = 'EMAIL',
  Sms = 'SMS'
}

export type VariantOptionResponse = {
  __typename?: 'VariantOptionResponse';
  name: Scalars['String'];
  optionId: Scalars['ID'];
  value: Scalars['String'];
  valueId: Scalars['ID'];
};

export type VariantPriceAndQuantityUpdateInput = {
  itemsInStock: Scalars['Int'];
  priceId: Scalars['ID'];
  retailPrice: Scalars['Float'];
  variantId: Scalars['ID'];
  wholeSalePrice: Scalars['Float'];
};

export type VariantSoldQuantityInput = {
  listingId: Scalars['String'];
  quantity: Scalars['Int'];
  variantId?: InputMaybe<Scalars['String']>;
};

export enum WalletTransactionType {
  GiftPromotionExpired = 'GIFT_PROMOTION_EXPIRED',
  GiftPromotionGranted = 'GIFT_PROMOTION_GRANTED',
  GiftPromotionUsed = 'GIFT_PROMOTION_USED',
  MonthlyAggregate = 'MONTHLY_AGGREGATE',
  ProductPurchase = 'PRODUCT_PURCHASE',
  ProductRefund = 'PRODUCT_REFUND',
  SalamiCreditsRefill = 'SALAMI_CREDITS_REFILL',
  Undefined = 'UNDEFINED'
}

export type WishListRequest = {
  addedDateTime?: InputMaybe<Scalars['DateTime']>;
  productId: Scalars['ID'];
  profileId: Scalars['ID'];
  wishListId: Scalars['ID'];
};

export type WishListRequestForCreate = {
  addedDateTime?: InputMaybe<Scalars['DateTime']>;
  productId: Scalars['ID'];
  profileId: Scalars['ID'];
};

export type WishListResponse = {
  __typename?: 'WishListResponse';
  addedDateTime?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  productId?: Maybe<Scalars['ID']>;
  profileId?: Maybe<Scalars['ID']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  wishListId?: Maybe<Scalars['ID']>;
};

export type Wishlist = {
  __typename?: 'Wishlist';
  addedDateTime: Scalars['DateTime'];
  id: Scalars['ID'];
  listingId: Scalars['ID'];
  productId: Scalars['ID'];
  profileId: Scalars['ID'];
};

export type WishlistOption = {
  buyerId: Scalars['ID'];
  pageNumber: Scalars['Int'];
  pageSize: Scalars['Int'];
};

export type AddProductReviewMutationVariables = Exact<{
  input: ProductReviewInput;
}>;


export type AddProductReviewMutation = { __typename?: 'Mutation', addProductReview: { __typename?: 'AddReviewResponse', reviewId: string } };

export type AddSellerReviewMutationVariables = Exact<{
  input: SellerReviewInput;
}>;


export type AddSellerReviewMutation = { __typename?: 'Mutation', addSellerReview: { __typename?: 'AddReviewResponse', reviewId: string } };

export type AddListingToWishlistMutationVariables = Exact<{
  buyerId: Scalars['ID'];
  listingId: Scalars['ID'];
}>;


export type AddListingToWishlistMutation = { __typename?: 'Mutation', addListingToWishlist: { __typename?: 'Wishlist', id: string } };

export type DeleteListingFromWishlistMutationVariables = Exact<{
  buyerId: Scalars['ID'];
  listingId: Scalars['ID'];
}>;


export type DeleteListingFromWishlistMutation = { __typename?: 'Mutation', deleteListingFromWishlist: boolean };

export type IncrementHelpfulCountMutationVariables = Exact<{
  reviewId: Scalars['String'];
}>;


export type IncrementHelpfulCountMutation = { __typename?: 'Mutation', incrementHelpfulCount?: number | null | undefined };

export type AddReportReviewMutationVariables = Exact<{
  input: ReportReviewInput;
}>;


export type AddReportReviewMutation = { __typename?: 'Mutation', addReportReview: { __typename?: 'ReportReviewResponse', reviewId: string } };

export type UpdateListingStatusMutationVariables = Exact<{
  input: ListingStatusInput;
}>;


export type UpdateListingStatusMutation = { __typename?: 'Mutation', updateListingStatus: { __typename?: 'ProductListing', id: string } };

export type OrderResponseFieldsFragment = { __typename?: 'OrderResponse', orderId?: string | null | undefined, buyerId?: string | null | undefined, orderNumber?: string | null | undefined, subTotal?: number | null | undefined, discount?: number | null | undefined, serviceFees?: number | null | undefined, shippingFees?: number | null | undefined, taxes?: number | null | undefined, totalSavings?: number | null | undefined, orderTotal?: number | null | undefined, orderItems?: Array<{ __typename?: 'OrderItemResponse', orderItemId?: string | null | undefined, listingId?: string | null | undefined, variantId?: string | null | undefined, sellerId?: string | null | undefined, quantity?: number | null | undefined, itemPrice?: number | null | undefined } | null | undefined> | null | undefined, paymentDetails?: { __typename?: 'OrderPaymentDetailsResponse', balanceToPay?: number | null | undefined, usedGiftAmount?: number | null | undefined, usedWalletAmount?: number | null | undefined } | null | undefined };

export type CancelOrderItemMutationVariables = Exact<{
  request?: InputMaybe<CancelOrderItemRequest>;
}>;


export type CancelOrderItemMutation = { __typename?: 'Mutation', cancelOrderItem?: boolean | null | undefined };

export type MarkOrderItemAsDeliveredMutationVariables = Exact<{
  request: OrderItemDeliveredRequest;
}>;


export type MarkOrderItemAsDeliveredMutation = { __typename?: 'Mutation', markOrderItemAsDelivered?: boolean | null | undefined };

export type SubmitOrderReturnRequestMutationVariables = Exact<{
  request: OrderReturnRequest;
}>;


export type SubmitOrderReturnRequestMutation = { __typename?: 'Mutation', submitOrderReturnRequest?: { __typename?: 'OrderReturnResponse', orderReturnId: string, deadline?: any | null | undefined, latestEventStatus: ReturnEventType, deliveryOption: DeliveryOption, returnLabel?: string | null | undefined, qrCodeAsBase64?: string | null | undefined, returnAddress?: { __typename?: 'AddressResponse', addressId: string, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, townCity?: string | null | undefined, country?: string | null | undefined, provinceState?: string | null | undefined, areaCode?: string | null | undefined } | null | undefined, collectionPoint?: { __typename?: 'CollectionPointPickupResponse', collectionPointId?: string | null | undefined, microHubId?: string | null | undefined, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, townCity?: string | null | undefined, country?: string | null | undefined, provinceState?: string | null | undefined, areaCode?: string | null | undefined, openingHours?: Array<string | null | undefined> | null | undefined, contactNumber?: string | null | undefined, contactPerson?: string | null | undefined } | null | undefined, sellerLocation?: { __typename?: 'SellerLocationPickupResponse', collectionPointId?: string | null | undefined, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, townCity?: string | null | undefined, country?: string | null | undefined, provinceState?: string | null | undefined, areaCode?: string | null | undefined, contactNumber?: string | null | undefined, contactPerson?: string | null | undefined, collectionDate?: any | null | undefined } | null | undefined } | null | undefined };

export type CreateOrderFromCartMutationVariables = Exact<{
  cart: CartInput;
}>;


export type CreateOrderFromCartMutation = { __typename?: 'Mutation', createOrderFromCart?: { __typename?: 'OrderResponse', orderId?: string | null | undefined, buyerId?: string | null | undefined, orderNumber?: string | null | undefined, subTotal?: number | null | undefined, discount?: number | null | undefined, serviceFees?: number | null | undefined, shippingFees?: number | null | undefined, taxes?: number | null | undefined, totalSavings?: number | null | undefined, orderTotal?: number | null | undefined, orderItems?: Array<{ __typename?: 'OrderItemResponse', orderItemId?: string | null | undefined, listingId?: string | null | undefined, variantId?: string | null | undefined, sellerId?: string | null | undefined, quantity?: number | null | undefined, itemPrice?: number | null | undefined } | null | undefined> | null | undefined, paymentDetails?: { __typename?: 'OrderPaymentDetailsResponse', balanceToPay?: number | null | undefined, usedGiftAmount?: number | null | undefined, usedWalletAmount?: number | null | undefined } | null | undefined } | null | undefined };

export type RazorpayCreateOrderMutationVariables = Exact<{
  request: RazorpayOrderRequest;
}>;


export type RazorpayCreateOrderMutation = { __typename?: 'Mutation', razorpayCreateOrder: { __typename?: 'RazorpayOrderResponse', razorpayOrderId?: string | null | undefined, razorpayOrderStatus?: RazorpayOrderStatus | null | undefined } };

export type RazorpayVerifyPaymentSignatureMutationVariables = Exact<{
  request: RazorpayVerifyPaymentSignatureRequest;
}>;


export type RazorpayVerifyPaymentSignatureMutation = { __typename?: 'Mutation', razorpayVerifyPaymentSignature: { __typename?: 'RazorpayVerifyPaymentSignatureResponse', valid: boolean, razorpayPaymentId: string, razorpayOrderId: string, razorpayPaymentStatus: string, razorpayOrderStatus: string } };

export type GetBuyerSalamiWalletBalanceQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBuyerSalamiWalletBalanceQuery = { __typename?: 'Query', getBuyerSalamiWalletBalance?: { __typename?: 'SalamiWalletResponse', walletId?: string | null | undefined, buyerId?: string | null | undefined, walletBalance?: number | null | undefined, giftBalance?: number | null | undefined } | null | undefined };

export type CollectionPointFragment = { __typename?: 'CollectionPointPickupResponse', collectionPointId?: string | null | undefined, microHubId?: string | null | undefined, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, townCity?: string | null | undefined, country?: string | null | undefined, provinceState?: string | null | undefined, areaCode?: string | null | undefined, openingHours?: Array<string | null | undefined> | null | undefined, contactNumber?: string | null | undefined, contactPerson?: string | null | undefined };

export type SellerLocationFragment = { __typename?: 'SellerLocationPickupResponse', collectionPointId?: string | null | undefined, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, townCity?: string | null | undefined, country?: string | null | undefined, provinceState?: string | null | undefined, areaCode?: string | null | undefined, contactNumber?: string | null | undefined, contactPerson?: string | null | undefined, collectionDate?: any | null | undefined };

export type AddressOrderFiledFragment = { __typename?: 'AddressResponse', addressId: string, addressType?: AddressType | null | undefined, flat?: string | null | undefined, block?: string | null | undefined, building?: string | null | undefined, houseNumber?: string | null | undefined, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, streetAddress3?: string | null | undefined, townCity?: string | null | undefined, villageArea?: string | null | undefined, district?: string | null | undefined, provinceState?: string | null | undefined, country?: string | null | undefined, areaCode?: string | null | undefined, pinCode?: string | null | undefined };

export type OrderItemDetailFieldFragment = { __typename?: 'OrderItemDetailResponse', orderId: string, orderNumber: string, orderDatetime: any, orderSubTotal: number, orderReturnId?: string | null | undefined, orderDiscount: number, orderServiceFees: number, totalSavings: number, orderTotal: number, buyerId: string, orderItemId: string, quantity: number, itemPrice: number, itemDiscount: number, latestEventStatus: OrderItemHistoryEventType, paymentStatus?: OrderItemHistoryEventType | null | undefined, shortName: string, longName?: string | null | undefined, mainImagePath?: string | null | undefined, productId: string, sellerId: string, vendorSku?: string | null | undefined, sellerSku?: string | null | undefined, variantId?: string | null | undefined, priceId?: string | null | undefined, retailPrice?: number | null | undefined, wholeSalePrice?: number | null | undefined, listingId: string, listingStatus: ProductListingStatus, storeId: string, deliveryOption: DeliveryOption, deliveryDate?: any | null | undefined, shippingDate?: any | null | undefined, deliveryAddress?: { __typename?: 'AddressResponse', addressId: string, addressType?: AddressType | null | undefined, flat?: string | null | undefined, block?: string | null | undefined, building?: string | null | undefined, houseNumber?: string | null | undefined, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, streetAddress3?: string | null | undefined, townCity?: string | null | undefined, villageArea?: string | null | undefined, district?: string | null | undefined, provinceState?: string | null | undefined, country?: string | null | undefined, areaCode?: string | null | undefined, pinCode?: string | null | undefined } | null | undefined, pickupAddress?: { __typename?: 'AddressResponse', addressId: string, addressType?: AddressType | null | undefined, flat?: string | null | undefined, block?: string | null | undefined, building?: string | null | undefined, houseNumber?: string | null | undefined, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, streetAddress3?: string | null | undefined, townCity?: string | null | undefined, villageArea?: string | null | undefined, district?: string | null | undefined, provinceState?: string | null | undefined, country?: string | null | undefined, areaCode?: string | null | undefined, pinCode?: string | null | undefined } | null | undefined, buyer?: { __typename?: 'BuyerDetailsResponse', buyerId: string, firstName?: string | null | undefined, lastName?: string | null | undefined, phoneNumber?: string | null | undefined } | null | undefined, shippingDetails?: { __typename?: 'ShippingDetailsResponse', shippingStatus?: ShippingStatus | null | undefined, shippingDate?: any | null | undefined, carrier?: string | null | undefined, carrierUrl?: string | null | undefined, trackingNumber?: string | null | undefined, expectedDeliveryDate?: any | null | undefined, shippingInstructions?: string | null | undefined, deliveryDate?: any | null | undefined, failedDeliveryReason?: string | null | undefined, events?: Array<{ __typename?: 'ShippingEventResponse', eventType?: string | null | undefined, eventDateTime?: any | null | undefined } | null | undefined> | null | undefined } | null | undefined, collectionPoint?: { __typename?: 'CollectionPointPickupResponse', collectionPointId?: string | null | undefined, microHubId?: string | null | undefined, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, townCity?: string | null | undefined, country?: string | null | undefined, provinceState?: string | null | undefined, areaCode?: string | null | undefined, openingHours?: Array<string | null | undefined> | null | undefined, contactNumber?: string | null | undefined, contactPerson?: string | null | undefined } | null | undefined, sellerLocation?: { __typename?: 'SellerLocationPickupResponse', collectionPointId?: string | null | undefined, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, townCity?: string | null | undefined, country?: string | null | undefined, provinceState?: string | null | undefined, areaCode?: string | null | undefined, contactNumber?: string | null | undefined, contactPerson?: string | null | undefined, collectionDate?: any | null | undefined } | null | undefined, sellerDirectDelivery?: { __typename?: 'SellerDirectDeliveryResponse', announcementId?: string | null | undefined, deliveryDate?: any | null | undefined } | null | undefined };

export type SearchBuyerOrdersQueryVariables = Exact<{
  options: BuyerOrderOption;
}>;


export type SearchBuyerOrdersQuery = { __typename?: 'Query', searchBuyerOrders: { __typename?: 'BuyerOrderResponse', pageNo: number, pageSize: number, totalPages: number, totalElements: number, content: Array<{ __typename?: 'OrderItemDetailResponse', orderId: string, orderNumber: string, orderDatetime: any, orderSubTotal: number, orderReturnId?: string | null | undefined, orderDiscount: number, orderServiceFees: number, totalSavings: number, orderTotal: number, buyerId: string, orderItemId: string, quantity: number, itemPrice: number, itemDiscount: number, latestEventStatus: OrderItemHistoryEventType, paymentStatus?: OrderItemHistoryEventType | null | undefined, shortName: string, longName?: string | null | undefined, mainImagePath?: string | null | undefined, productId: string, sellerId: string, vendorSku?: string | null | undefined, sellerSku?: string | null | undefined, variantId?: string | null | undefined, priceId?: string | null | undefined, retailPrice?: number | null | undefined, wholeSalePrice?: number | null | undefined, listingId: string, listingStatus: ProductListingStatus, storeId: string, deliveryOption: DeliveryOption, deliveryDate?: any | null | undefined, shippingDate?: any | null | undefined, deliveryAddress?: { __typename?: 'AddressResponse', addressId: string, addressType?: AddressType | null | undefined, flat?: string | null | undefined, block?: string | null | undefined, building?: string | null | undefined, houseNumber?: string | null | undefined, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, streetAddress3?: string | null | undefined, townCity?: string | null | undefined, villageArea?: string | null | undefined, district?: string | null | undefined, provinceState?: string | null | undefined, country?: string | null | undefined, areaCode?: string | null | undefined, pinCode?: string | null | undefined } | null | undefined, pickupAddress?: { __typename?: 'AddressResponse', addressId: string, addressType?: AddressType | null | undefined, flat?: string | null | undefined, block?: string | null | undefined, building?: string | null | undefined, houseNumber?: string | null | undefined, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, streetAddress3?: string | null | undefined, townCity?: string | null | undefined, villageArea?: string | null | undefined, district?: string | null | undefined, provinceState?: string | null | undefined, country?: string | null | undefined, areaCode?: string | null | undefined, pinCode?: string | null | undefined } | null | undefined, buyer?: { __typename?: 'BuyerDetailsResponse', buyerId: string, firstName?: string | null | undefined, lastName?: string | null | undefined, phoneNumber?: string | null | undefined } | null | undefined, shippingDetails?: { __typename?: 'ShippingDetailsResponse', shippingStatus?: ShippingStatus | null | undefined, shippingDate?: any | null | undefined, carrier?: string | null | undefined, carrierUrl?: string | null | undefined, trackingNumber?: string | null | undefined, expectedDeliveryDate?: any | null | undefined, shippingInstructions?: string | null | undefined, deliveryDate?: any | null | undefined, failedDeliveryReason?: string | null | undefined, events?: Array<{ __typename?: 'ShippingEventResponse', eventType?: string | null | undefined, eventDateTime?: any | null | undefined } | null | undefined> | null | undefined } | null | undefined, collectionPoint?: { __typename?: 'CollectionPointPickupResponse', collectionPointId?: string | null | undefined, microHubId?: string | null | undefined, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, townCity?: string | null | undefined, country?: string | null | undefined, provinceState?: string | null | undefined, areaCode?: string | null | undefined, openingHours?: Array<string | null | undefined> | null | undefined, contactNumber?: string | null | undefined, contactPerson?: string | null | undefined } | null | undefined, sellerLocation?: { __typename?: 'SellerLocationPickupResponse', collectionPointId?: string | null | undefined, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, townCity?: string | null | undefined, country?: string | null | undefined, provinceState?: string | null | undefined, areaCode?: string | null | undefined, contactNumber?: string | null | undefined, contactPerson?: string | null | undefined, collectionDate?: any | null | undefined } | null | undefined, sellerDirectDelivery?: { __typename?: 'SellerDirectDeliveryResponse', announcementId?: string | null | undefined, deliveryDate?: any | null | undefined } | null | undefined }> } };

export type GetOrderReturnStatusQueryVariables = Exact<{
  orderReturnId: Scalars['String'];
}>;


export type GetOrderReturnStatusQuery = { __typename?: 'Query', getOrderReturnStatus: { __typename?: 'OrderReturnStatusResponse', deadline?: any | null | undefined, orderReturnId: string, events?: Array<{ __typename?: 'OrderReturnEventResponse', returnId: string, eventDateTime: any, eventType: ReturnEventType, notes?: string | null | undefined } | null | undefined> | null | undefined } };

export type GetOrderItemDetailsQueryVariables = Exact<{
  orderItemId: Scalars['ID'];
}>;


export type GetOrderItemDetailsQuery = { __typename?: 'Query', getOrderItemDetails: { __typename?: 'OrderItemDetailResponse', orderId: string, orderNumber: string, orderDatetime: any, orderSubTotal: number, orderReturnId?: string | null | undefined, orderDiscount: number, orderServiceFees: number, totalSavings: number, orderTotal: number, buyerId: string, orderItemId: string, quantity: number, itemPrice: number, itemDiscount: number, latestEventStatus: OrderItemHistoryEventType, paymentStatus?: OrderItemHistoryEventType | null | undefined, shortName: string, longName?: string | null | undefined, mainImagePath?: string | null | undefined, productId: string, sellerId: string, vendorSku?: string | null | undefined, sellerSku?: string | null | undefined, variantId?: string | null | undefined, priceId?: string | null | undefined, retailPrice?: number | null | undefined, wholeSalePrice?: number | null | undefined, listingId: string, listingStatus: ProductListingStatus, storeId: string, deliveryOption: DeliveryOption, deliveryDate?: any | null | undefined, shippingDate?: any | null | undefined, deliveryAddress?: { __typename?: 'AddressResponse', addressId: string, addressType?: AddressType | null | undefined, flat?: string | null | undefined, block?: string | null | undefined, building?: string | null | undefined, houseNumber?: string | null | undefined, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, streetAddress3?: string | null | undefined, townCity?: string | null | undefined, villageArea?: string | null | undefined, district?: string | null | undefined, provinceState?: string | null | undefined, country?: string | null | undefined, areaCode?: string | null | undefined, pinCode?: string | null | undefined } | null | undefined, pickupAddress?: { __typename?: 'AddressResponse', addressId: string, addressType?: AddressType | null | undefined, flat?: string | null | undefined, block?: string | null | undefined, building?: string | null | undefined, houseNumber?: string | null | undefined, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, streetAddress3?: string | null | undefined, townCity?: string | null | undefined, villageArea?: string | null | undefined, district?: string | null | undefined, provinceState?: string | null | undefined, country?: string | null | undefined, areaCode?: string | null | undefined, pinCode?: string | null | undefined } | null | undefined, buyer?: { __typename?: 'BuyerDetailsResponse', buyerId: string, firstName?: string | null | undefined, lastName?: string | null | undefined, phoneNumber?: string | null | undefined } | null | undefined, shippingDetails?: { __typename?: 'ShippingDetailsResponse', shippingStatus?: ShippingStatus | null | undefined, shippingDate?: any | null | undefined, carrier?: string | null | undefined, carrierUrl?: string | null | undefined, trackingNumber?: string | null | undefined, expectedDeliveryDate?: any | null | undefined, shippingInstructions?: string | null | undefined, deliveryDate?: any | null | undefined, failedDeliveryReason?: string | null | undefined, events?: Array<{ __typename?: 'ShippingEventResponse', eventType?: string | null | undefined, eventDateTime?: any | null | undefined } | null | undefined> | null | undefined } | null | undefined, collectionPoint?: { __typename?: 'CollectionPointPickupResponse', collectionPointId?: string | null | undefined, microHubId?: string | null | undefined, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, townCity?: string | null | undefined, country?: string | null | undefined, provinceState?: string | null | undefined, areaCode?: string | null | undefined, openingHours?: Array<string | null | undefined> | null | undefined, contactNumber?: string | null | undefined, contactPerson?: string | null | undefined } | null | undefined, sellerLocation?: { __typename?: 'SellerLocationPickupResponse', collectionPointId?: string | null | undefined, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, townCity?: string | null | undefined, country?: string | null | undefined, provinceState?: string | null | undefined, areaCode?: string | null | undefined, contactNumber?: string | null | undefined, contactPerson?: string | null | undefined, collectionDate?: any | null | undefined } | null | undefined, sellerDirectDelivery?: { __typename?: 'SellerDirectDeliveryResponse', announcementId?: string | null | undefined, deliveryDate?: any | null | undefined } | null | undefined } };

export type TrackOrderItemQueryVariables = Exact<{
  orderItemId: Scalars['ID'];
}>;


export type TrackOrderItemQuery = { __typename?: 'Query', trackOrderItem: { __typename?: 'TrackOrderItemResponse', orderItemId: string, deliveryOption: DeliveryOption, latestEventStatus: OrderItemHistoryEventType, orderNumber: string, dateDelivered?: any | null | undefined, qrCodeAsBase64?: string | null | undefined, events?: Array<{ __typename?: 'OrderItemHistoryResponse', eventId: string, eventDateTime: any, eventType: OrderItemHistoryEventType, notes?: string | null | undefined }> | null | undefined, shippingDetails?: { __typename?: 'ShippingDetailsResponse', shippingStatus?: ShippingStatus | null | undefined, shippingDate?: any | null | undefined, carrier?: string | null | undefined, carrierUrl?: string | null | undefined, trackingNumber?: string | null | undefined, expectedDeliveryDate?: any | null | undefined, shippingInstructions?: string | null | undefined, deliveryDate?: any | null | undefined, failedDeliveryReason?: string | null | undefined, events?: Array<{ __typename?: 'ShippingEventResponse', eventType?: string | null | undefined, eventDateTime?: any | null | undefined } | null | undefined> | null | undefined } | null | undefined, collectionPoint?: { __typename?: 'CollectionPointPickupResponse', collectionPointId?: string | null | undefined, microHubId?: string | null | undefined, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, townCity?: string | null | undefined, country?: string | null | undefined, provinceState?: string | null | undefined, areaCode?: string | null | undefined, openingHours?: Array<string | null | undefined> | null | undefined, contactNumber?: string | null | undefined, contactPerson?: string | null | undefined, collectionDate?: any | null | undefined } | null | undefined, sellerLocation?: { __typename?: 'SellerLocationPickupResponse', collectionPointId?: string | null | undefined, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, townCity?: string | null | undefined, country?: string | null | undefined, provinceState?: string | null | undefined, areaCode?: string | null | undefined, contactNumber?: string | null | undefined, contactPerson?: string | null | undefined, collectionDate?: any | null | undefined } | null | undefined, sellerDirectDelivery?: { __typename?: 'SellerDirectDeliveryResponse', announcementId?: string | null | undefined, deliveryDate?: any | null | undefined } | null | undefined } };

export type IsListingAvailableFieldFragment = { __typename?: 'IsListingAvailableResponse', listingId?: string | null | undefined, variantId?: string | null | undefined, isAvailable?: boolean | null | undefined, reason?: string | null | undefined, listing?: { __typename?: 'ProductListingView', photo?: string | null | undefined, photoUrls?: Array<string | null | undefined> | null | undefined, shortName?: string | null | undefined, numberOfStars?: number | null | undefined, numberOfReviews?: number | null | undefined, retailPrice?: number | null | undefined, wholeSalePrice?: number | null | undefined, salePercentage?: number | null | undefined, percentOff?: number | null | undefined, amountSaved?: number | null | undefined, openUntil?: string | null | undefined, noOfOrderedItems?: number | null | undefined, noOfItemsInStock?: number | null | undefined, description?: string | null | undefined, technicalDetails?: string | null | undefined, highlightBullets?: Array<string | null | undefined> | null | undefined, relatedProducts?: string | null | undefined, listingId?: string | null | undefined, productId?: string | null | undefined, storeId?: string | null | undefined, storeName?: string | null | undefined, status?: string | null | undefined, rating?: number | null | undefined, closedDate?: string | null | undefined, productListingType?: string | null | undefined, progressBarValue?: number | null | undefined, numberOfItemsAvailable?: number | null | undefined, qtyAvailable?: number | null | undefined, minQtyPerCart?: number | null | undefined, minSoldQuantity?: number | null | undefined, itemSold?: number | null | undefined, createOn?: string | null | undefined, returnAddressId?: string | null | undefined, longName?: string | null | undefined, announcementId?: string | null | undefined, sellerId?: string | null | undefined, deliveryOption?: DeliveryOption | null | undefined, courierName?: string | null | undefined, courierShippingFee?: number | null | undefined, courierShippingFeeTax?: number | null | undefined, announcementDeliveryDate?: any | null | undefined, seller?: { __typename?: 'SellerView', id?: string | null | undefined, brandName?: string | null | undefined, avatarUrl?: string | null | undefined, usersRating?: number | null | undefined, name?: string | null | undefined, description?: string | null | undefined, ratingCount?: number | null | undefined } | null | undefined, returnPolicies?: Array<{ __typename?: 'ProductReturnPolicyView', id?: string | null | undefined, productId?: string | null | undefined, name?: string | null | undefined, description?: string | null | undefined, value?: string | null | undefined } | null | undefined> | null | undefined, listingVariants?: Array<{ __typename?: 'ListingVariantView', listingId: string, variantId?: string | null | undefined, productId?: string | null | undefined, defaultVariant?: boolean | null | undefined, retailPrice?: number | null | undefined, wholeSalePrice?: number | null | undefined, fullPath?: string | null | undefined, itemsInStock?: number | null | undefined, itemsAvailable?: number | null | undefined, itemsSold?: number | null | undefined, isAvailable?: boolean | null | undefined, options?: Array<{ __typename?: 'KeyValuePair', key: string, value: string } | null | undefined> | null | undefined } | null | undefined> | null | undefined, reviews?: Array<{ __typename?: 'ReviewView', id?: string | null | undefined, productId?: string | null | undefined, sellerId?: string | null | undefined, title?: string | null | undefined, description?: string | null | undefined, ratingVote?: number | null | undefined, helpfulCount?: number | null | undefined, postedBy?: string | null | undefined, postedByName?: string | null | undefined } | null | undefined> | null | undefined, returnAddress?: { __typename?: 'AddressView', addressId?: string | null | undefined, flat?: string | null | undefined, block?: string | null | undefined, building?: string | null | undefined, houseNumber?: string | null | undefined, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, streetAddress3?: string | null | undefined, townCity?: string | null | undefined, villageArea?: string | null | undefined, district?: string | null | undefined, provinceState?: string | null | undefined, country?: string | null | undefined, areaCode?: string | null | undefined, landmark?: string | null | undefined, pinCode?: string | null | undefined, addressFloor?: string | null | undefined } | null | undefined, ratingDetail?: { __typename?: 'RatingDetail', zeroStar?: number | null | undefined, oneStar?: number | null | undefined, twoStar?: number | null | undefined, threeStar?: number | null | undefined, fourStar?: number | null | undefined, fiveStar?: number | null | undefined, sixAndMoreStar?: number | null | undefined } | null | undefined, categories?: Array<{ __typename?: 'ProductCategoryView', categoryId?: string | null | undefined, productId?: string | null | undefined, name?: string | null | undefined, description?: string | null | undefined } | null | undefined> | null | undefined, images?: Array<{ __typename?: 'Images', id: string, referenceId?: string | null | undefined, imageName?: string | null | undefined, imageType?: ImageType | null | undefined, description?: string | null | undefined, fullPath?: string | null | undefined } | null | undefined> | null | undefined, pickupAddress?: { __typename?: 'AddressView', addressId?: string | null | undefined, flat?: string | null | undefined, block?: string | null | undefined, building?: string | null | undefined, houseNumber?: string | null | undefined, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, streetAddress3?: string | null | undefined, townCity?: string | null | undefined, villageArea?: string | null | undefined, district?: string | null | undefined, provinceState?: string | null | undefined, country?: string | null | undefined, areaCode?: string | null | undefined, landmark?: string | null | undefined, pinCode?: string | null | undefined, addressFloor?: string | null | undefined } | null | undefined } | null | undefined };

export type KeyValuePairFieldFragment = { __typename?: 'KeyValuePair', key: string, value: string };

export type ProductReturnPolicyFieldFragment = { __typename?: 'ProductReturnPolicy', returnPolicyId: string, name: string, value: string };

export type ImagesFieldFragment = { __typename?: 'Images', id: string, referenceId?: string | null | undefined, imageName?: string | null | undefined, imageType?: ImageType | null | undefined, description?: string | null | undefined, fullPath?: string | null | undefined };

export type ProductCategoryViewFieldFragment = { __typename?: 'ProductCategoryView', categoryId?: string | null | undefined, productId?: string | null | undefined, name?: string | null | undefined, description?: string | null | undefined };

export type RatingDetailFieldFragment = { __typename?: 'RatingDetail', zeroStar?: number | null | undefined, oneStar?: number | null | undefined, twoStar?: number | null | undefined, threeStar?: number | null | undefined, fourStar?: number | null | undefined, fiveStar?: number | null | undefined, sixAndMoreStar?: number | null | undefined };

export type AddressFieldFragment = { __typename?: 'AddressView', addressId?: string | null | undefined, flat?: string | null | undefined, block?: string | null | undefined, building?: string | null | undefined, houseNumber?: string | null | undefined, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, streetAddress3?: string | null | undefined, townCity?: string | null | undefined, villageArea?: string | null | undefined, district?: string | null | undefined, provinceState?: string | null | undefined, country?: string | null | undefined, areaCode?: string | null | undefined, landmark?: string | null | undefined, pinCode?: string | null | undefined, addressFloor?: string | null | undefined };

export type ReviewViewFieldFragment = { __typename?: 'ReviewView', id?: string | null | undefined, productId?: string | null | undefined, sellerId?: string | null | undefined, title?: string | null | undefined, description?: string | null | undefined, ratingVote?: number | null | undefined, helpfulCount?: number | null | undefined, postedBy?: string | null | undefined, postedByName?: string | null | undefined };

export type ListingVariantViewFieldFragment = { __typename?: 'ListingVariantView', listingId: string, variantId?: string | null | undefined, productId?: string | null | undefined, defaultVariant?: boolean | null | undefined, retailPrice?: number | null | undefined, wholeSalePrice?: number | null | undefined, fullPath?: string | null | undefined, itemsInStock?: number | null | undefined, itemsAvailable?: number | null | undefined, itemsSold?: number | null | undefined, isAvailable?: boolean | null | undefined, options?: Array<{ __typename?: 'KeyValuePair', key: string, value: string } | null | undefined> | null | undefined };

export type ProductReturnPolicyViewFieldFragment = { __typename?: 'ProductReturnPolicyView', id?: string | null | undefined, productId?: string | null | undefined, name?: string | null | undefined, description?: string | null | undefined, value?: string | null | undefined };

export type SellerViewFieldFragment = { __typename?: 'SellerView', id?: string | null | undefined, brandName?: string | null | undefined, avatarUrl?: string | null | undefined, usersRating?: number | null | undefined, name?: string | null | undefined, description?: string | null | undefined, ratingCount?: number | null | undefined };

export type SellerProductPriceFieldFragment = { __typename?: 'SellerProductPrice', priceId: string, currency: string, retailPrice: number, wholeSalePrice: number, salePercentage?: number | null | undefined, totalQuantityPrice?: number | null | undefined, taxPercentage?: number | null | undefined };

export type SellerProductImageFieldFragment = { __typename?: 'SellerProductImage', photoUrl?: string | null | undefined, imageName?: string | null | undefined, description?: string | null | undefined, imageType?: string | null | undefined };

export type SellerReturnPolicyFieldFragment = { __typename?: 'SellerReturnPolicy', returnAddress?: { __typename?: 'AddressView', addressId?: string | null | undefined, flat?: string | null | undefined, block?: string | null | undefined, building?: string | null | undefined, houseNumber?: string | null | undefined, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, streetAddress3?: string | null | undefined, townCity?: string | null | undefined, villageArea?: string | null | undefined, district?: string | null | undefined, provinceState?: string | null | undefined, country?: string | null | undefined, areaCode?: string | null | undefined, landmark?: string | null | undefined, pinCode?: string | null | undefined, addressFloor?: string | null | undefined } | null | undefined, returnLabel?: { __typename?: 'SellerProductImage', photoUrl?: string | null | undefined, imageName?: string | null | undefined, description?: string | null | undefined, imageType?: string | null | undefined } | null | undefined, policies?: Array<{ __typename?: 'ProductReturnPolicy', returnPolicyId: string, name: string, value: string } | null | undefined> | null | undefined };

export type SellerProductVariantFieldFragment = { __typename?: 'SellerProductVariant', variantId: string, priceId: string, photoUrl: string, itemsInStock: number, defaultVariant: boolean, retailPrice: number, wholeSalePrice: number, options?: Array<{ __typename?: 'VariantOptionResponse', optionId: string, valueId: string, name: string, value: string }> | null | undefined };

export type SellerProductDetailViewFieldFragment = { __typename?: 'SellerProductDetailView', productId: string, shortName: string, longName: string, description?: string | null | undefined, mainPhotoUrl?: string | null | undefined, vendorSku?: string | null | undefined, sellerSku?: string | null | undefined, brand?: string | null | undefined, productType?: string | null | undefined, productStatus?: ProductStatus | null | undefined, vendorName?: string | null | undefined, itemsInStock: number, price?: { __typename?: 'SellerProductPrice', priceId: string, currency: string, retailPrice: number, wholeSalePrice: number, salePercentage?: number | null | undefined, totalQuantityPrice?: number | null | undefined, taxPercentage?: number | null | undefined } | null | undefined, images?: Array<{ __typename?: 'SellerProductImage', photoUrl?: string | null | undefined, imageName?: string | null | undefined, description?: string | null | undefined, imageType?: string | null | undefined } | null | undefined> | null | undefined, variants: Array<{ __typename?: 'SellerProductVariant', variantId: string, priceId: string, photoUrl: string, itemsInStock: number, defaultVariant: boolean, retailPrice: number, wholeSalePrice: number, options?: Array<{ __typename?: 'VariantOptionResponse', optionId: string, valueId: string, name: string, value: string }> | null | undefined }>, categories: Array<{ __typename?: 'ProductCategoryResponse', categoryId: string, name: string, description?: string | null | undefined }>, returnPolicy: { __typename?: 'SellerReturnPolicy', returnAddress?: { __typename?: 'AddressView', addressId?: string | null | undefined, flat?: string | null | undefined, block?: string | null | undefined, building?: string | null | undefined, houseNumber?: string | null | undefined, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, streetAddress3?: string | null | undefined, townCity?: string | null | undefined, villageArea?: string | null | undefined, district?: string | null | undefined, provinceState?: string | null | undefined, country?: string | null | undefined, areaCode?: string | null | undefined, landmark?: string | null | undefined, pinCode?: string | null | undefined, addressFloor?: string | null | undefined } | null | undefined, returnLabel?: { __typename?: 'SellerProductImage', photoUrl?: string | null | undefined, imageName?: string | null | undefined, description?: string | null | undefined, imageType?: string | null | undefined } | null | undefined, policies?: Array<{ __typename?: 'ProductReturnPolicy', returnPolicyId: string, name: string, value: string } | null | undefined> | null | undefined } };

export type ProductListingViewFieldFragment = { __typename?: 'ProductListingView', photo?: string | null | undefined, photoUrls?: Array<string | null | undefined> | null | undefined, shortName?: string | null | undefined, numberOfStars?: number | null | undefined, numberOfReviews?: number | null | undefined, retailPrice?: number | null | undefined, wholeSalePrice?: number | null | undefined, salePercentage?: number | null | undefined, percentOff?: number | null | undefined, amountSaved?: number | null | undefined, openUntil?: string | null | undefined, noOfOrderedItems?: number | null | undefined, noOfItemsInStock?: number | null | undefined, description?: string | null | undefined, technicalDetails?: string | null | undefined, highlightBullets?: Array<string | null | undefined> | null | undefined, relatedProducts?: string | null | undefined, listingId?: string | null | undefined, productId?: string | null | undefined, storeId?: string | null | undefined, storeName?: string | null | undefined, status?: string | null | undefined, rating?: number | null | undefined, closedDate?: string | null | undefined, productListingType?: string | null | undefined, progressBarValue?: number | null | undefined, numberOfItemsAvailable?: number | null | undefined, qtyAvailable?: number | null | undefined, minQtyPerCart?: number | null | undefined, minSoldQuantity?: number | null | undefined, itemSold?: number | null | undefined, createOn?: string | null | undefined, returnAddressId?: string | null | undefined, longName?: string | null | undefined, announcementId?: string | null | undefined, sellerId?: string | null | undefined, deliveryOption?: DeliveryOption | null | undefined, courierName?: string | null | undefined, courierShippingFee?: number | null | undefined, courierShippingFeeTax?: number | null | undefined, announcementDeliveryDate?: any | null | undefined, seller?: { __typename?: 'SellerView', id?: string | null | undefined, brandName?: string | null | undefined, avatarUrl?: string | null | undefined, usersRating?: number | null | undefined, name?: string | null | undefined, description?: string | null | undefined, ratingCount?: number | null | undefined } | null | undefined, returnPolicies?: Array<{ __typename?: 'ProductReturnPolicyView', id?: string | null | undefined, productId?: string | null | undefined, name?: string | null | undefined, description?: string | null | undefined, value?: string | null | undefined } | null | undefined> | null | undefined, listingVariants?: Array<{ __typename?: 'ListingVariantView', listingId: string, variantId?: string | null | undefined, productId?: string | null | undefined, defaultVariant?: boolean | null | undefined, retailPrice?: number | null | undefined, wholeSalePrice?: number | null | undefined, fullPath?: string | null | undefined, itemsInStock?: number | null | undefined, itemsAvailable?: number | null | undefined, itemsSold?: number | null | undefined, isAvailable?: boolean | null | undefined, options?: Array<{ __typename?: 'KeyValuePair', key: string, value: string } | null | undefined> | null | undefined } | null | undefined> | null | undefined, reviews?: Array<{ __typename?: 'ReviewView', id?: string | null | undefined, productId?: string | null | undefined, sellerId?: string | null | undefined, title?: string | null | undefined, description?: string | null | undefined, ratingVote?: number | null | undefined, helpfulCount?: number | null | undefined, postedBy?: string | null | undefined, postedByName?: string | null | undefined } | null | undefined> | null | undefined, returnAddress?: { __typename?: 'AddressView', addressId?: string | null | undefined, flat?: string | null | undefined, block?: string | null | undefined, building?: string | null | undefined, houseNumber?: string | null | undefined, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, streetAddress3?: string | null | undefined, townCity?: string | null | undefined, villageArea?: string | null | undefined, district?: string | null | undefined, provinceState?: string | null | undefined, country?: string | null | undefined, areaCode?: string | null | undefined, landmark?: string | null | undefined, pinCode?: string | null | undefined, addressFloor?: string | null | undefined } | null | undefined, ratingDetail?: { __typename?: 'RatingDetail', zeroStar?: number | null | undefined, oneStar?: number | null | undefined, twoStar?: number | null | undefined, threeStar?: number | null | undefined, fourStar?: number | null | undefined, fiveStar?: number | null | undefined, sixAndMoreStar?: number | null | undefined } | null | undefined, categories?: Array<{ __typename?: 'ProductCategoryView', categoryId?: string | null | undefined, productId?: string | null | undefined, name?: string | null | undefined, description?: string | null | undefined } | null | undefined> | null | undefined, images?: Array<{ __typename?: 'Images', id: string, referenceId?: string | null | undefined, imageName?: string | null | undefined, imageType?: ImageType | null | undefined, description?: string | null | undefined, fullPath?: string | null | undefined } | null | undefined> | null | undefined, pickupAddress?: { __typename?: 'AddressView', addressId?: string | null | undefined, flat?: string | null | undefined, block?: string | null | undefined, building?: string | null | undefined, houseNumber?: string | null | undefined, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, streetAddress3?: string | null | undefined, townCity?: string | null | undefined, villageArea?: string | null | undefined, district?: string | null | undefined, provinceState?: string | null | undefined, country?: string | null | undefined, areaCode?: string | null | undefined, landmark?: string | null | undefined, pinCode?: string | null | undefined, addressFloor?: string | null | undefined } | null | undefined };

export type GetListingsQueryVariables = Exact<{
  searchOptions?: InputMaybe<SearchOptions>;
}>;


export type GetListingsQuery = { __typename?: 'Query', getListings: { __typename?: 'BuyerListingResponse', pageNo: number, pageSize: number, totalPages: number, totalElements: number, content: Array<{ __typename?: 'ProductListingView', photo?: string | null | undefined, photoUrls?: Array<string | null | undefined> | null | undefined, shortName?: string | null | undefined, numberOfStars?: number | null | undefined, numberOfReviews?: number | null | undefined, retailPrice?: number | null | undefined, wholeSalePrice?: number | null | undefined, salePercentage?: number | null | undefined, percentOff?: number | null | undefined, amountSaved?: number | null | undefined, openUntil?: string | null | undefined, noOfOrderedItems?: number | null | undefined, noOfItemsInStock?: number | null | undefined, description?: string | null | undefined, technicalDetails?: string | null | undefined, highlightBullets?: Array<string | null | undefined> | null | undefined, relatedProducts?: string | null | undefined, listingId?: string | null | undefined, productId?: string | null | undefined, storeId?: string | null | undefined, storeName?: string | null | undefined, status?: string | null | undefined, rating?: number | null | undefined, closedDate?: string | null | undefined, productListingType?: string | null | undefined, progressBarValue?: number | null | undefined, numberOfItemsAvailable?: number | null | undefined, qtyAvailable?: number | null | undefined, minQtyPerCart?: number | null | undefined, minSoldQuantity?: number | null | undefined, itemSold?: number | null | undefined, createOn?: string | null | undefined, returnAddressId?: string | null | undefined, longName?: string | null | undefined, announcementId?: string | null | undefined, sellerId?: string | null | undefined, deliveryOption?: DeliveryOption | null | undefined, courierName?: string | null | undefined, courierShippingFee?: number | null | undefined, courierShippingFeeTax?: number | null | undefined, announcementDeliveryDate?: any | null | undefined, seller?: { __typename?: 'SellerView', id?: string | null | undefined, brandName?: string | null | undefined, avatarUrl?: string | null | undefined, usersRating?: number | null | undefined, name?: string | null | undefined, description?: string | null | undefined, ratingCount?: number | null | undefined } | null | undefined, returnPolicies?: Array<{ __typename?: 'ProductReturnPolicyView', id?: string | null | undefined, productId?: string | null | undefined, name?: string | null | undefined, description?: string | null | undefined, value?: string | null | undefined } | null | undefined> | null | undefined, listingVariants?: Array<{ __typename?: 'ListingVariantView', listingId: string, variantId?: string | null | undefined, productId?: string | null | undefined, defaultVariant?: boolean | null | undefined, retailPrice?: number | null | undefined, wholeSalePrice?: number | null | undefined, fullPath?: string | null | undefined, itemsInStock?: number | null | undefined, itemsAvailable?: number | null | undefined, itemsSold?: number | null | undefined, isAvailable?: boolean | null | undefined, options?: Array<{ __typename?: 'KeyValuePair', key: string, value: string } | null | undefined> | null | undefined } | null | undefined> | null | undefined, reviews?: Array<{ __typename?: 'ReviewView', id?: string | null | undefined, productId?: string | null | undefined, sellerId?: string | null | undefined, title?: string | null | undefined, description?: string | null | undefined, ratingVote?: number | null | undefined, helpfulCount?: number | null | undefined, postedBy?: string | null | undefined, postedByName?: string | null | undefined } | null | undefined> | null | undefined, returnAddress?: { __typename?: 'AddressView', addressId?: string | null | undefined, flat?: string | null | undefined, block?: string | null | undefined, building?: string | null | undefined, houseNumber?: string | null | undefined, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, streetAddress3?: string | null | undefined, townCity?: string | null | undefined, villageArea?: string | null | undefined, district?: string | null | undefined, provinceState?: string | null | undefined, country?: string | null | undefined, areaCode?: string | null | undefined, landmark?: string | null | undefined, pinCode?: string | null | undefined, addressFloor?: string | null | undefined } | null | undefined, ratingDetail?: { __typename?: 'RatingDetail', zeroStar?: number | null | undefined, oneStar?: number | null | undefined, twoStar?: number | null | undefined, threeStar?: number | null | undefined, fourStar?: number | null | undefined, fiveStar?: number | null | undefined, sixAndMoreStar?: number | null | undefined } | null | undefined, categories?: Array<{ __typename?: 'ProductCategoryView', categoryId?: string | null | undefined, productId?: string | null | undefined, name?: string | null | undefined, description?: string | null | undefined } | null | undefined> | null | undefined, images?: Array<{ __typename?: 'Images', id: string, referenceId?: string | null | undefined, imageName?: string | null | undefined, imageType?: ImageType | null | undefined, description?: string | null | undefined, fullPath?: string | null | undefined } | null | undefined> | null | undefined, pickupAddress?: { __typename?: 'AddressView', addressId?: string | null | undefined, flat?: string | null | undefined, block?: string | null | undefined, building?: string | null | undefined, houseNumber?: string | null | undefined, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, streetAddress3?: string | null | undefined, townCity?: string | null | undefined, villageArea?: string | null | undefined, district?: string | null | undefined, provinceState?: string | null | undefined, country?: string | null | undefined, areaCode?: string | null | undefined, landmark?: string | null | undefined, pinCode?: string | null | undefined, addressFloor?: string | null | undefined } | null | undefined } | null | undefined> } };

export type GetRelatedProductsQueryVariables = Exact<{
  productId: Scalars['ID'];
}>;


export type GetRelatedProductsQuery = { __typename?: 'Query', getRelatedProducts?: Array<{ __typename?: 'SellerProductDetailView', productId: string, shortName: string, longName: string, description?: string | null | undefined, mainPhotoUrl?: string | null | undefined, vendorSku?: string | null | undefined, sellerSku?: string | null | undefined, brand?: string | null | undefined, productType?: string | null | undefined, productStatus?: ProductStatus | null | undefined, vendorName?: string | null | undefined, itemsInStock: number, price?: { __typename?: 'SellerProductPrice', priceId: string, currency: string, retailPrice: number, wholeSalePrice: number, salePercentage?: number | null | undefined, totalQuantityPrice?: number | null | undefined, taxPercentage?: number | null | undefined } | null | undefined, images?: Array<{ __typename?: 'SellerProductImage', photoUrl?: string | null | undefined, imageName?: string | null | undefined, description?: string | null | undefined, imageType?: string | null | undefined } | null | undefined> | null | undefined, variants: Array<{ __typename?: 'SellerProductVariant', variantId: string, priceId: string, photoUrl: string, itemsInStock: number, defaultVariant: boolean, retailPrice: number, wholeSalePrice: number, options?: Array<{ __typename?: 'VariantOptionResponse', optionId: string, valueId: string, name: string, value: string }> | null | undefined }>, categories: Array<{ __typename?: 'ProductCategoryResponse', categoryId: string, name: string, description?: string | null | undefined }>, returnPolicy: { __typename?: 'SellerReturnPolicy', returnAddress?: { __typename?: 'AddressView', addressId?: string | null | undefined, flat?: string | null | undefined, block?: string | null | undefined, building?: string | null | undefined, houseNumber?: string | null | undefined, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, streetAddress3?: string | null | undefined, townCity?: string | null | undefined, villageArea?: string | null | undefined, district?: string | null | undefined, provinceState?: string | null | undefined, country?: string | null | undefined, areaCode?: string | null | undefined, landmark?: string | null | undefined, pinCode?: string | null | undefined, addressFloor?: string | null | undefined } | null | undefined, returnLabel?: { __typename?: 'SellerProductImage', photoUrl?: string | null | undefined, imageName?: string | null | undefined, description?: string | null | undefined, imageType?: string | null | undefined } | null | undefined, policies?: Array<{ __typename?: 'ProductReturnPolicy', returnPolicyId: string, name: string, value: string } | null | undefined> | null | undefined } } | null | undefined> | null | undefined };

export type IsListingInWishlistQueryVariables = Exact<{
  buyerId: Scalars['ID'];
  listingId: Scalars['ID'];
}>;


export type IsListingInWishlistQuery = { __typename?: 'Query', isListingInWishlist: boolean };

export type GetBuyerWishlistListingQueryVariables = Exact<{
  options: WishlistOption;
}>;


export type GetBuyerWishlistListingQuery = { __typename?: 'Query', getBuyerWishlistListing: { __typename?: 'BuyerListingResponse', pageNo: number, pageSize: number, totalPages: number, totalElements: number, content: Array<{ __typename?: 'ProductListingView', photo?: string | null | undefined, photoUrls?: Array<string | null | undefined> | null | undefined, shortName?: string | null | undefined, numberOfStars?: number | null | undefined, numberOfReviews?: number | null | undefined, retailPrice?: number | null | undefined, wholeSalePrice?: number | null | undefined, salePercentage?: number | null | undefined, percentOff?: number | null | undefined, amountSaved?: number | null | undefined, openUntil?: string | null | undefined, noOfOrderedItems?: number | null | undefined, noOfItemsInStock?: number | null | undefined, description?: string | null | undefined, technicalDetails?: string | null | undefined, highlightBullets?: Array<string | null | undefined> | null | undefined, relatedProducts?: string | null | undefined, listingId?: string | null | undefined, productId?: string | null | undefined, storeId?: string | null | undefined, storeName?: string | null | undefined, status?: string | null | undefined, rating?: number | null | undefined, closedDate?: string | null | undefined, productListingType?: string | null | undefined, progressBarValue?: number | null | undefined, numberOfItemsAvailable?: number | null | undefined, qtyAvailable?: number | null | undefined, minQtyPerCart?: number | null | undefined, minSoldQuantity?: number | null | undefined, itemSold?: number | null | undefined, createOn?: string | null | undefined, returnAddressId?: string | null | undefined, longName?: string | null | undefined, announcementId?: string | null | undefined, sellerId?: string | null | undefined, deliveryOption?: DeliveryOption | null | undefined, courierName?: string | null | undefined, courierShippingFee?: number | null | undefined, courierShippingFeeTax?: number | null | undefined, announcementDeliveryDate?: any | null | undefined, seller?: { __typename?: 'SellerView', id?: string | null | undefined, brandName?: string | null | undefined, avatarUrl?: string | null | undefined, usersRating?: number | null | undefined, name?: string | null | undefined, description?: string | null | undefined, ratingCount?: number | null | undefined } | null | undefined, returnPolicies?: Array<{ __typename?: 'ProductReturnPolicyView', id?: string | null | undefined, productId?: string | null | undefined, name?: string | null | undefined, description?: string | null | undefined, value?: string | null | undefined } | null | undefined> | null | undefined, listingVariants?: Array<{ __typename?: 'ListingVariantView', listingId: string, variantId?: string | null | undefined, productId?: string | null | undefined, defaultVariant?: boolean | null | undefined, retailPrice?: number | null | undefined, wholeSalePrice?: number | null | undefined, fullPath?: string | null | undefined, itemsInStock?: number | null | undefined, itemsAvailable?: number | null | undefined, itemsSold?: number | null | undefined, isAvailable?: boolean | null | undefined, options?: Array<{ __typename?: 'KeyValuePair', key: string, value: string } | null | undefined> | null | undefined } | null | undefined> | null | undefined, reviews?: Array<{ __typename?: 'ReviewView', id?: string | null | undefined, productId?: string | null | undefined, sellerId?: string | null | undefined, title?: string | null | undefined, description?: string | null | undefined, ratingVote?: number | null | undefined, helpfulCount?: number | null | undefined, postedBy?: string | null | undefined, postedByName?: string | null | undefined } | null | undefined> | null | undefined, returnAddress?: { __typename?: 'AddressView', addressId?: string | null | undefined, flat?: string | null | undefined, block?: string | null | undefined, building?: string | null | undefined, houseNumber?: string | null | undefined, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, streetAddress3?: string | null | undefined, townCity?: string | null | undefined, villageArea?: string | null | undefined, district?: string | null | undefined, provinceState?: string | null | undefined, country?: string | null | undefined, areaCode?: string | null | undefined, landmark?: string | null | undefined, pinCode?: string | null | undefined, addressFloor?: string | null | undefined } | null | undefined, ratingDetail?: { __typename?: 'RatingDetail', zeroStar?: number | null | undefined, oneStar?: number | null | undefined, twoStar?: number | null | undefined, threeStar?: number | null | undefined, fourStar?: number | null | undefined, fiveStar?: number | null | undefined, sixAndMoreStar?: number | null | undefined } | null | undefined, categories?: Array<{ __typename?: 'ProductCategoryView', categoryId?: string | null | undefined, productId?: string | null | undefined, name?: string | null | undefined, description?: string | null | undefined } | null | undefined> | null | undefined, images?: Array<{ __typename?: 'Images', id: string, referenceId?: string | null | undefined, imageName?: string | null | undefined, imageType?: ImageType | null | undefined, description?: string | null | undefined, fullPath?: string | null | undefined } | null | undefined> | null | undefined, pickupAddress?: { __typename?: 'AddressView', addressId?: string | null | undefined, flat?: string | null | undefined, block?: string | null | undefined, building?: string | null | undefined, houseNumber?: string | null | undefined, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, streetAddress3?: string | null | undefined, townCity?: string | null | undefined, villageArea?: string | null | undefined, district?: string | null | undefined, provinceState?: string | null | undefined, country?: string | null | undefined, areaCode?: string | null | undefined, landmark?: string | null | undefined, pinCode?: string | null | undefined, addressFloor?: string | null | undefined } | null | undefined } | null | undefined> } };

export type GetProductByProductIdQueryVariables = Exact<{
  productId: Scalars['String'];
}>;


export type GetProductByProductIdQuery = { __typename?: 'Query', getProductByProductId: { __typename?: 'SellerProductDetailView', productId: string, shortName: string, longName: string, description?: string | null | undefined, mainPhotoUrl?: string | null | undefined, vendorSku?: string | null | undefined, sellerSku?: string | null | undefined, brand?: string | null | undefined, productType?: string | null | undefined, productStatus?: ProductStatus | null | undefined, vendorName?: string | null | undefined, itemsInStock: number, price?: { __typename?: 'SellerProductPrice', priceId: string, currency: string, retailPrice: number, wholeSalePrice: number, salePercentage?: number | null | undefined, totalQuantityPrice?: number | null | undefined, taxPercentage?: number | null | undefined } | null | undefined, images?: Array<{ __typename?: 'SellerProductImage', photoUrl?: string | null | undefined, imageName?: string | null | undefined, description?: string | null | undefined, imageType?: string | null | undefined } | null | undefined> | null | undefined, variants: Array<{ __typename?: 'SellerProductVariant', variantId: string, priceId: string, photoUrl: string, itemsInStock: number, defaultVariant: boolean, retailPrice: number, wholeSalePrice: number, options?: Array<{ __typename?: 'VariantOptionResponse', optionId: string, valueId: string, name: string, value: string }> | null | undefined }>, categories: Array<{ __typename?: 'ProductCategoryResponse', categoryId: string, name: string, description?: string | null | undefined }>, returnPolicy: { __typename?: 'SellerReturnPolicy', returnAddress?: { __typename?: 'AddressView', addressId?: string | null | undefined, flat?: string | null | undefined, block?: string | null | undefined, building?: string | null | undefined, houseNumber?: string | null | undefined, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, streetAddress3?: string | null | undefined, townCity?: string | null | undefined, villageArea?: string | null | undefined, district?: string | null | undefined, provinceState?: string | null | undefined, country?: string | null | undefined, areaCode?: string | null | undefined, landmark?: string | null | undefined, pinCode?: string | null | undefined, addressFloor?: string | null | undefined } | null | undefined, returnLabel?: { __typename?: 'SellerProductImage', photoUrl?: string | null | undefined, imageName?: string | null | undefined, description?: string | null | undefined, imageType?: string | null | undefined } | null | undefined, policies?: Array<{ __typename?: 'ProductReturnPolicy', returnPolicyId: string, name: string, value: string } | null | undefined> | null | undefined } } };

export type GetPreferredCategoriesQueryVariables = Exact<{
  buyerId: Scalars['ID'];
}>;


export type GetPreferredCategoriesQuery = { __typename?: 'Query', getPreferredCategories: Array<{ __typename?: 'CategoryView', categoryId?: string | null | undefined, name?: string | null | undefined, description?: string | null | undefined } | null | undefined> };

export type IsListingAvailableQueryVariables = Exact<{
  listings: Array<IsListingAvailableInput> | IsListingAvailableInput;
}>;


export type IsListingAvailableQuery = { __typename?: 'Query', isListingAvailable: Array<{ __typename?: 'IsListingAvailableResponse', listingId?: string | null | undefined, variantId?: string | null | undefined, isAvailable?: boolean | null | undefined, reason?: string | null | undefined, listing?: { __typename?: 'ProductListingView', photo?: string | null | undefined, photoUrls?: Array<string | null | undefined> | null | undefined, shortName?: string | null | undefined, numberOfStars?: number | null | undefined, numberOfReviews?: number | null | undefined, retailPrice?: number | null | undefined, wholeSalePrice?: number | null | undefined, salePercentage?: number | null | undefined, percentOff?: number | null | undefined, amountSaved?: number | null | undefined, openUntil?: string | null | undefined, noOfOrderedItems?: number | null | undefined, noOfItemsInStock?: number | null | undefined, description?: string | null | undefined, technicalDetails?: string | null | undefined, highlightBullets?: Array<string | null | undefined> | null | undefined, relatedProducts?: string | null | undefined, listingId?: string | null | undefined, productId?: string | null | undefined, storeId?: string | null | undefined, storeName?: string | null | undefined, status?: string | null | undefined, rating?: number | null | undefined, closedDate?: string | null | undefined, productListingType?: string | null | undefined, progressBarValue?: number | null | undefined, numberOfItemsAvailable?: number | null | undefined, qtyAvailable?: number | null | undefined, minQtyPerCart?: number | null | undefined, minSoldQuantity?: number | null | undefined, itemSold?: number | null | undefined, createOn?: string | null | undefined, returnAddressId?: string | null | undefined, longName?: string | null | undefined, announcementId?: string | null | undefined, sellerId?: string | null | undefined, deliveryOption?: DeliveryOption | null | undefined, courierName?: string | null | undefined, courierShippingFee?: number | null | undefined, courierShippingFeeTax?: number | null | undefined, announcementDeliveryDate?: any | null | undefined, seller?: { __typename?: 'SellerView', id?: string | null | undefined, brandName?: string | null | undefined, avatarUrl?: string | null | undefined, usersRating?: number | null | undefined, name?: string | null | undefined, description?: string | null | undefined, ratingCount?: number | null | undefined } | null | undefined, returnPolicies?: Array<{ __typename?: 'ProductReturnPolicyView', id?: string | null | undefined, productId?: string | null | undefined, name?: string | null | undefined, description?: string | null | undefined, value?: string | null | undefined } | null | undefined> | null | undefined, listingVariants?: Array<{ __typename?: 'ListingVariantView', listingId: string, variantId?: string | null | undefined, productId?: string | null | undefined, defaultVariant?: boolean | null | undefined, retailPrice?: number | null | undefined, wholeSalePrice?: number | null | undefined, fullPath?: string | null | undefined, itemsInStock?: number | null | undefined, itemsAvailable?: number | null | undefined, itemsSold?: number | null | undefined, isAvailable?: boolean | null | undefined, options?: Array<{ __typename?: 'KeyValuePair', key: string, value: string } | null | undefined> | null | undefined } | null | undefined> | null | undefined, reviews?: Array<{ __typename?: 'ReviewView', id?: string | null | undefined, productId?: string | null | undefined, sellerId?: string | null | undefined, title?: string | null | undefined, description?: string | null | undefined, ratingVote?: number | null | undefined, helpfulCount?: number | null | undefined, postedBy?: string | null | undefined, postedByName?: string | null | undefined } | null | undefined> | null | undefined, returnAddress?: { __typename?: 'AddressView', addressId?: string | null | undefined, flat?: string | null | undefined, block?: string | null | undefined, building?: string | null | undefined, houseNumber?: string | null | undefined, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, streetAddress3?: string | null | undefined, townCity?: string | null | undefined, villageArea?: string | null | undefined, district?: string | null | undefined, provinceState?: string | null | undefined, country?: string | null | undefined, areaCode?: string | null | undefined, landmark?: string | null | undefined, pinCode?: string | null | undefined, addressFloor?: string | null | undefined } | null | undefined, ratingDetail?: { __typename?: 'RatingDetail', zeroStar?: number | null | undefined, oneStar?: number | null | undefined, twoStar?: number | null | undefined, threeStar?: number | null | undefined, fourStar?: number | null | undefined, fiveStar?: number | null | undefined, sixAndMoreStar?: number | null | undefined } | null | undefined, categories?: Array<{ __typename?: 'ProductCategoryView', categoryId?: string | null | undefined, productId?: string | null | undefined, name?: string | null | undefined, description?: string | null | undefined } | null | undefined> | null | undefined, images?: Array<{ __typename?: 'Images', id: string, referenceId?: string | null | undefined, imageName?: string | null | undefined, imageType?: ImageType | null | undefined, description?: string | null | undefined, fullPath?: string | null | undefined } | null | undefined> | null | undefined, pickupAddress?: { __typename?: 'AddressView', addressId?: string | null | undefined, flat?: string | null | undefined, block?: string | null | undefined, building?: string | null | undefined, houseNumber?: string | null | undefined, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, streetAddress3?: string | null | undefined, townCity?: string | null | undefined, villageArea?: string | null | undefined, district?: string | null | undefined, provinceState?: string | null | undefined, country?: string | null | undefined, areaCode?: string | null | undefined, landmark?: string | null | undefined, pinCode?: string | null | undefined, addressFloor?: string | null | undefined } | null | undefined } | null | undefined }> };

export type BillingDetailsFieldsFragment = { __typename?: 'BillingDetailsResponse', billingDetailsId?: string | null | undefined, buyerId?: string | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, companyName?: string | null | undefined, email?: string | null | undefined, phoneNumber?: string | null | undefined, taxCode?: string | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, billingAddress?: { __typename?: 'AddressResponse', addressId: string, addressType?: AddressType | null | undefined, flat?: string | null | undefined, block?: string | null | undefined, building?: string | null | undefined, houseNumber?: string | null | undefined, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, streetAddress3?: string | null | undefined, townCity?: string | null | undefined, villageArea?: string | null | undefined, district?: string | null | undefined, provinceState?: string | null | undefined, country?: string | null | undefined, areaCode?: string | null | undefined, pinCode?: string | null | undefined } | null | undefined };

export type BuyerProfileResponseFieldsFragment = { __typename?: 'BuyerProfileResponse', userId?: string | null | undefined, buyerId?: string | null | undefined, userName?: string | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, email?: string | null | undefined, phoneNumber?: string | null | undefined, emailVerified?: boolean | null | undefined, phoneNumberVerified?: boolean | null | undefined, userType?: UserType | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, oneClickPurchaseOn?: boolean | null | undefined, guestBuyer?: boolean | null | undefined, geoLocation?: string | null | undefined, country?: string | null | undefined, languages?: Array<string | null | undefined> | null | undefined, currencies?: Array<string | null | undefined> | null | undefined, applicationSettings?: string | null | undefined, categoryPreferences?: Array<string | null | undefined> | null | undefined, productPreferences?: Array<string | null | undefined> | null | undefined, sellerPreferences?: Array<string | null | undefined> | null | undefined, refundSalamiCredit?: number | null | undefined, bonusSalamiCredit?: number | null | undefined, bonusSalamiCreditExpire?: any | null | undefined, walletId?: string | null | undefined, billingDetails?: { __typename?: 'BillingDetailsResponse', billingDetailsId?: string | null | undefined, buyerId?: string | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, companyName?: string | null | undefined, email?: string | null | undefined, phoneNumber?: string | null | undefined, taxCode?: string | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, billingAddress?: { __typename?: 'AddressResponse', addressId: string, addressType?: AddressType | null | undefined, flat?: string | null | undefined, block?: string | null | undefined, building?: string | null | undefined, houseNumber?: string | null | undefined, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, streetAddress3?: string | null | undefined, townCity?: string | null | undefined, villageArea?: string | null | undefined, district?: string | null | undefined, provinceState?: string | null | undefined, country?: string | null | undefined, areaCode?: string | null | undefined, pinCode?: string | null | undefined } | null | undefined } | null | undefined };

export type BuyerProfileByUserIdQueryVariables = Exact<{
  userProfileId: Scalars['ID'];
}>;


export type BuyerProfileByUserIdQuery = { __typename?: 'Query', buyerProfileByUserId?: { __typename?: 'BuyerProfileResponse', userId?: string | null | undefined, buyerId?: string | null | undefined, userName?: string | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, email?: string | null | undefined, phoneNumber?: string | null | undefined, emailVerified?: boolean | null | undefined, phoneNumberVerified?: boolean | null | undefined, userType?: UserType | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, oneClickPurchaseOn?: boolean | null | undefined, guestBuyer?: boolean | null | undefined, geoLocation?: string | null | undefined, country?: string | null | undefined, languages?: Array<string | null | undefined> | null | undefined, currencies?: Array<string | null | undefined> | null | undefined, applicationSettings?: string | null | undefined, categoryPreferences?: Array<string | null | undefined> | null | undefined, productPreferences?: Array<string | null | undefined> | null | undefined, sellerPreferences?: Array<string | null | undefined> | null | undefined, refundSalamiCredit?: number | null | undefined, bonusSalamiCredit?: number | null | undefined, bonusSalamiCreditExpire?: any | null | undefined, walletId?: string | null | undefined, billingDetails?: { __typename?: 'BillingDetailsResponse', billingDetailsId?: string | null | undefined, buyerId?: string | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, companyName?: string | null | undefined, email?: string | null | undefined, phoneNumber?: string | null | undefined, taxCode?: string | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, billingAddress?: { __typename?: 'AddressResponse', addressId: string, addressType?: AddressType | null | undefined, flat?: string | null | undefined, block?: string | null | undefined, building?: string | null | undefined, houseNumber?: string | null | undefined, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, streetAddress3?: string | null | undefined, townCity?: string | null | undefined, villageArea?: string | null | undefined, district?: string | null | undefined, provinceState?: string | null | undefined, country?: string | null | undefined, areaCode?: string | null | undefined, pinCode?: string | null | undefined } | null | undefined } | null | undefined } | null | undefined };

export type UserHasVerifiedPhoneNumberQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type UserHasVerifiedPhoneNumberQuery = { __typename?: 'Query', userHasVerifiedPhoneNumber?: boolean | null | undefined };

export type BuyerProfileQueryVariables = Exact<{
  buyerId: Scalars['ID'];
}>;


export type BuyerProfileQuery = { __typename?: 'Query', buyerProfile?: { __typename?: 'BuyerProfileResponse', userId?: string | null | undefined, buyerId?: string | null | undefined, userName?: string | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, email?: string | null | undefined, phoneNumber?: string | null | undefined, emailVerified?: boolean | null | undefined, phoneNumberVerified?: boolean | null | undefined, userType?: UserType | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, oneClickPurchaseOn?: boolean | null | undefined, guestBuyer?: boolean | null | undefined, geoLocation?: string | null | undefined, country?: string | null | undefined, languages?: Array<string | null | undefined> | null | undefined, currencies?: Array<string | null | undefined> | null | undefined, applicationSettings?: string | null | undefined, categoryPreferences?: Array<string | null | undefined> | null | undefined, productPreferences?: Array<string | null | undefined> | null | undefined, sellerPreferences?: Array<string | null | undefined> | null | undefined, refundSalamiCredit?: number | null | undefined, bonusSalamiCredit?: number | null | undefined, bonusSalamiCreditExpire?: any | null | undefined, walletId?: string | null | undefined, billingDetails?: { __typename?: 'BillingDetailsResponse', billingDetailsId?: string | null | undefined, buyerId?: string | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, companyName?: string | null | undefined, email?: string | null | undefined, phoneNumber?: string | null | undefined, taxCode?: string | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, billingAddress?: { __typename?: 'AddressResponse', addressId: string, addressType?: AddressType | null | undefined, flat?: string | null | undefined, block?: string | null | undefined, building?: string | null | undefined, houseNumber?: string | null | undefined, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, streetAddress3?: string | null | undefined, townCity?: string | null | undefined, villageArea?: string | null | undefined, district?: string | null | undefined, provinceState?: string | null | undefined, country?: string | null | undefined, areaCode?: string | null | undefined, pinCode?: string | null | undefined } | null | undefined } | null | undefined } | null | undefined };

export type ValidateBuyerHasAnyOrderQueryVariables = Exact<{
  buyerId: Scalars['ID'];
}>;


export type ValidateBuyerHasAnyOrderQuery = { __typename?: 'Query', validateBuyerHasAnyOrder: boolean };

export type SellerProfileBasicDetailsQueryVariables = Exact<{
  sellerId: Scalars['ID'];
}>;


export type SellerProfileBasicDetailsQuery = { __typename?: 'Query', sellerProfileBasicDetails?: { __typename?: 'SellerProfileBasicDetailsResponse', sellerId?: string | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, storeName?: string | null | undefined } | null | undefined };

export type BillingDetailsByGuestBuyerIdQueryVariables = Exact<{
  guestBuyerId: Scalars['ID'];
}>;


export type BillingDetailsByGuestBuyerIdQuery = { __typename?: 'Query', billingDetailsByGuestBuyerId?: Array<{ __typename?: 'BillingDetailsResponse', billingDetailsId?: string | null | undefined, buyerId?: string | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, companyName?: string | null | undefined, email?: string | null | undefined, phoneNumber?: string | null | undefined, taxCode?: string | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, billingAddress?: { __typename?: 'AddressResponse', addressId: string, addressType?: AddressType | null | undefined, flat?: string | null | undefined, block?: string | null | undefined, building?: string | null | undefined, houseNumber?: string | null | undefined, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, streetAddress3?: string | null | undefined, townCity?: string | null | undefined, villageArea?: string | null | undefined, district?: string | null | undefined, provinceState?: string | null | undefined, country?: string | null | undefined, areaCode?: string | null | undefined, pinCode?: string | null | undefined } | null | undefined } | null | undefined> | null | undefined };

export type GetGuestBuyerDefaultAddressByBuyerIdQueryVariables = Exact<{
  buyerId: Scalars['ID'];
}>;


export type GetGuestBuyerDefaultAddressByBuyerIdQuery = { __typename?: 'Query', getGuestBuyerDefaultAddressByBuyerId?: { __typename?: 'AddressResponse', addressId: string, addressType?: AddressType | null | undefined, flat?: string | null | undefined, block?: string | null | undefined, building?: string | null | undefined, houseNumber?: string | null | undefined, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, streetAddress3?: string | null | undefined, townCity?: string | null | undefined, villageArea?: string | null | undefined, district?: string | null | undefined, provinceState?: string | null | undefined, country?: string | null | undefined, areaCode?: string | null | undefined, pinCode?: string | null | undefined } | null | undefined };

export type GetBuyerDefaultAddressByBuyerIdQueryVariables = Exact<{
  buyerId: Scalars['ID'];
}>;


export type GetBuyerDefaultAddressByBuyerIdQuery = { __typename?: 'Query', getBuyerDefaultAddressByBuyerId?: { __typename?: 'AddressResponse', addressId: string, addressType?: AddressType | null | undefined, flat?: string | null | undefined, block?: string | null | undefined, building?: string | null | undefined, houseNumber?: string | null | undefined, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, streetAddress3?: string | null | undefined, townCity?: string | null | undefined, villageArea?: string | null | undefined, district?: string | null | undefined, provinceState?: string | null | undefined, country?: string | null | undefined, areaCode?: string | null | undefined, pinCode?: string | null | undefined } | null | undefined };

export type DeliveryAddressForBuyerQueryVariables = Exact<{
  buyerId: Scalars['ID'];
}>;


export type DeliveryAddressForBuyerQuery = { __typename?: 'Query', deliveryAddressForBuyer?: { __typename?: 'AddressResponse', addressId: string, addressType?: AddressType | null | undefined, flat?: string | null | undefined, block?: string | null | undefined, building?: string | null | undefined, houseNumber?: string | null | undefined, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, streetAddress3?: string | null | undefined, townCity?: string | null | undefined, villageArea?: string | null | undefined, district?: string | null | undefined, provinceState?: string | null | undefined, country?: string | null | undefined, areaCode?: string | null | undefined, pinCode?: string | null | undefined } | null | undefined };

export type DeliveryAddressForGuestBuyerQueryVariables = Exact<{
  buyerId: Scalars['ID'];
}>;


export type DeliveryAddressForGuestBuyerQuery = { __typename?: 'Query', deliveryAddressForGuestBuyer?: { __typename?: 'AddressResponse', addressId: string, addressType?: AddressType | null | undefined, flat?: string | null | undefined, block?: string | null | undefined, building?: string | null | undefined, houseNumber?: string | null | undefined, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, streetAddress3?: string | null | undefined, townCity?: string | null | undefined, villageArea?: string | null | undefined, district?: string | null | undefined, provinceState?: string | null | undefined, country?: string | null | undefined, areaCode?: string | null | undefined, pinCode?: string | null | undefined } | null | undefined };

export type DeleteBuyerProfileMutationVariables = Exact<{
  buyerId: Scalars['ID'];
}>;


export type DeleteBuyerProfileMutation = { __typename?: 'Mutation', deleteBuyerProfile?: boolean | null | undefined };

export type SendOtpCodeMutationVariables = Exact<{
  sendCodeRequest: SendCodeRequest;
}>;


export type SendOtpCodeMutation = { __typename?: 'Mutation', sendOTPCode?: { __typename?: 'SendCodeResponse', status?: boolean | null | undefined, message?: string | null | undefined } | null | undefined };

export type ValidateCodeMutationVariables = Exact<{
  request: ValidateCodeRequest;
}>;


export type ValidateCodeMutation = { __typename?: 'Mutation', validateCode?: { __typename?: 'ValidateCodeResponse', status?: boolean | null | undefined, message?: string | null | undefined } | null | undefined };

export type ForgotPasswordStep1SendNotificationEmailMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordStep1SendNotificationEmailMutation = { __typename?: 'Mutation', forgotPasswordStep1SendNotificationEmail?: { __typename?: 'ForgotPasswordStep1Response', email?: string | null | undefined, phoneNumber?: string | null | undefined, message?: string | null | undefined } | null | undefined };

export type ForgotPasswordStep1SendNotificationSmsMutationVariables = Exact<{
  sms: Scalars['String'];
}>;


export type ForgotPasswordStep1SendNotificationSmsMutation = { __typename?: 'Mutation', forgotPasswordStep1SendNotificationSms?: { __typename?: 'ForgotPasswordStep1Response', email?: string | null | undefined, phoneNumber?: string | null | undefined, message?: string | null | undefined } | null | undefined };

export type RegisterBuyerMutationVariables = Exact<{
  request: BuyerProfileRequestForCreate;
}>;


export type RegisterBuyerMutation = { __typename?: 'Mutation', registerBuyer?: { __typename?: 'BuyerProfileResponse', buyerId?: string | null | undefined, userId?: string | null | undefined } | null | undefined };

export type RegisterGuestBuyerToBuyerMutationVariables = Exact<{
  request: GuestBuyerProfileRequest;
}>;


export type RegisterGuestBuyerToBuyerMutation = { __typename?: 'Mutation', registerGuestBuyerToBuyer?: { __typename?: 'BuyerProfileResponse', userId?: string | null | undefined, buyerId?: string | null | undefined, userName?: string | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, email?: string | null | undefined, phoneNumber?: string | null | undefined, emailVerified?: boolean | null | undefined, phoneNumberVerified?: boolean | null | undefined, userType?: UserType | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, oneClickPurchaseOn?: boolean | null | undefined, guestBuyer?: boolean | null | undefined, geoLocation?: string | null | undefined, country?: string | null | undefined, languages?: Array<string | null | undefined> | null | undefined, currencies?: Array<string | null | undefined> | null | undefined, applicationSettings?: string | null | undefined, categoryPreferences?: Array<string | null | undefined> | null | undefined, productPreferences?: Array<string | null | undefined> | null | undefined, sellerPreferences?: Array<string | null | undefined> | null | undefined, refundSalamiCredit?: number | null | undefined, bonusSalamiCredit?: number | null | undefined, bonusSalamiCreditExpire?: any | null | undefined, walletId?: string | null | undefined, billingDetails?: { __typename?: 'BillingDetailsResponse', billingDetailsId?: string | null | undefined, buyerId?: string | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, companyName?: string | null | undefined, email?: string | null | undefined, phoneNumber?: string | null | undefined, taxCode?: string | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, billingAddress?: { __typename?: 'AddressResponse', addressId: string, addressType?: AddressType | null | undefined, flat?: string | null | undefined, block?: string | null | undefined, building?: string | null | undefined, houseNumber?: string | null | undefined, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, streetAddress3?: string | null | undefined, townCity?: string | null | undefined, villageArea?: string | null | undefined, district?: string | null | undefined, provinceState?: string | null | undefined, country?: string | null | undefined, areaCode?: string | null | undefined, pinCode?: string | null | undefined } | null | undefined } | null | undefined } | null | undefined };

export type UpdateBillingDetailsMutationVariables = Exact<{
  request: BillingDetailsRequest;
}>;


export type UpdateBillingDetailsMutation = { __typename?: 'Mutation', updateBillingDetails?: { __typename?: 'BillingDetailsResponse', billingDetailsId?: string | null | undefined, buyerId?: string | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, companyName?: string | null | undefined, email?: string | null | undefined, phoneNumber?: string | null | undefined, taxCode?: string | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, billingAddress?: { __typename?: 'AddressResponse', addressId: string, addressType?: AddressType | null | undefined, flat?: string | null | undefined, block?: string | null | undefined, building?: string | null | undefined, houseNumber?: string | null | undefined, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, streetAddress3?: string | null | undefined, townCity?: string | null | undefined, villageArea?: string | null | undefined, district?: string | null | undefined, provinceState?: string | null | undefined, country?: string | null | undefined, areaCode?: string | null | undefined, pinCode?: string | null | undefined } | null | undefined } | null | undefined };

export type CreateBillingDetailsMutationVariables = Exact<{
  request: BillingDetailsRequestForCreate;
}>;


export type CreateBillingDetailsMutation = { __typename?: 'Mutation', createBillingDetails?: { __typename?: 'BillingDetailsResponse', billingDetailsId?: string | null | undefined, buyerId?: string | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, companyName?: string | null | undefined, email?: string | null | undefined, phoneNumber?: string | null | undefined, taxCode?: string | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, billingAddress?: { __typename?: 'AddressResponse', addressId: string, addressType?: AddressType | null | undefined, flat?: string | null | undefined, block?: string | null | undefined, building?: string | null | undefined, houseNumber?: string | null | undefined, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, streetAddress3?: string | null | undefined, townCity?: string | null | undefined, villageArea?: string | null | undefined, district?: string | null | undefined, provinceState?: string | null | undefined, country?: string | null | undefined, areaCode?: string | null | undefined, pinCode?: string | null | undefined } | null | undefined } | null | undefined };

export type CreateBillingDetailsForGuestBuyerMutationVariables = Exact<{
  request: BillingDetailsRequestForCreate;
}>;


export type CreateBillingDetailsForGuestBuyerMutation = { __typename?: 'Mutation', createBillingDetailsForGuestBuyer?: { __typename?: 'BillingDetailsResponse', billingDetailsId?: string | null | undefined, buyerId?: string | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, companyName?: string | null | undefined, email?: string | null | undefined, phoneNumber?: string | null | undefined, taxCode?: string | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, billingAddress?: { __typename?: 'AddressResponse', addressId: string, addressType?: AddressType | null | undefined, flat?: string | null | undefined, block?: string | null | undefined, building?: string | null | undefined, houseNumber?: string | null | undefined, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, streetAddress3?: string | null | undefined, townCity?: string | null | undefined, villageArea?: string | null | undefined, district?: string | null | undefined, provinceState?: string | null | undefined, country?: string | null | undefined, areaCode?: string | null | undefined, pinCode?: string | null | undefined } | null | undefined } | null | undefined };

export type UpdateBillingDetailsForGuestBuyerMutationVariables = Exact<{
  request: BillingDetailsRequest;
}>;


export type UpdateBillingDetailsForGuestBuyerMutation = { __typename?: 'Mutation', updateBillingDetailsForGuestBuyer?: { __typename?: 'BillingDetailsResponse', billingDetailsId?: string | null | undefined, buyerId?: string | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, companyName?: string | null | undefined, email?: string | null | undefined, phoneNumber?: string | null | undefined, taxCode?: string | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, billingAddress?: { __typename?: 'AddressResponse', addressId: string, addressType?: AddressType | null | undefined, flat?: string | null | undefined, block?: string | null | undefined, building?: string | null | undefined, houseNumber?: string | null | undefined, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, streetAddress3?: string | null | undefined, townCity?: string | null | undefined, villageArea?: string | null | undefined, district?: string | null | undefined, provinceState?: string | null | undefined, country?: string | null | undefined, areaCode?: string | null | undefined, pinCode?: string | null | undefined } | null | undefined } | null | undefined };

export type ForgotPasswordStep2VerifyTokenSmsMutationVariables = Exact<{
  sms: Scalars['String'];
  tokenCode?: InputMaybe<Scalars['String']>;
}>;


export type ForgotPasswordStep2VerifyTokenSmsMutation = { __typename?: 'Mutation', forgotPasswordStep2VerifyTokenSms?: { __typename?: 'ForgotPasswordStep2Response', message?: string | null | undefined, actionToken?: string | null | undefined } | null | undefined };

export type ForgotPasswordStep3ChangeBySmsMutationVariables = Exact<{
  actionTokenValue: Scalars['String'];
  newPassword: Scalars['String'];
  confirmPassword: Scalars['String'];
}>;


export type ForgotPasswordStep3ChangeBySmsMutation = { __typename?: 'Mutation', forgotPasswordStep3ChangeBySms?: { __typename?: 'ForgotPasswordStep3Response', message?: string | null | undefined } | null | undefined };

export type UpdateBuyerProfileMutationVariables = Exact<{
  request: BuyerProfileRequest;
}>;


export type UpdateBuyerProfileMutation = { __typename?: 'Mutation', updateBuyerProfile?: { __typename?: 'BuyerProfileResponse', userId?: string | null | undefined, buyerId?: string | null | undefined, userName?: string | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, email?: string | null | undefined, phoneNumber?: string | null | undefined, emailVerified?: boolean | null | undefined, phoneNumberVerified?: boolean | null | undefined, userType?: UserType | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, oneClickPurchaseOn?: boolean | null | undefined, guestBuyer?: boolean | null | undefined, geoLocation?: string | null | undefined, country?: string | null | undefined, languages?: Array<string | null | undefined> | null | undefined, currencies?: Array<string | null | undefined> | null | undefined, applicationSettings?: string | null | undefined, categoryPreferences?: Array<string | null | undefined> | null | undefined, productPreferences?: Array<string | null | undefined> | null | undefined, sellerPreferences?: Array<string | null | undefined> | null | undefined, refundSalamiCredit?: number | null | undefined, bonusSalamiCredit?: number | null | undefined, bonusSalamiCreditExpire?: any | null | undefined, walletId?: string | null | undefined, billingDetails?: { __typename?: 'BillingDetailsResponse', billingDetailsId?: string | null | undefined, buyerId?: string | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, companyName?: string | null | undefined, email?: string | null | undefined, phoneNumber?: string | null | undefined, taxCode?: string | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined, billingAddress?: { __typename?: 'AddressResponse', addressId: string, addressType?: AddressType | null | undefined, flat?: string | null | undefined, block?: string | null | undefined, building?: string | null | undefined, houseNumber?: string | null | undefined, streetAddress1?: string | null | undefined, streetAddress2?: string | null | undefined, streetAddress3?: string | null | undefined, townCity?: string | null | undefined, villageArea?: string | null | undefined, district?: string | null | undefined, provinceState?: string | null | undefined, country?: string | null | undefined, areaCode?: string | null | undefined, pinCode?: string | null | undefined } | null | undefined } | null | undefined } | null | undefined };

export type UpdateAddressMutationVariables = Exact<{
  request: AddressRequest;
}>;


export type UpdateAddressMutation = { __typename?: 'Mutation', updateAddress?: { __typename?: 'AddressResponse', addressId: string } | null | undefined };

export type UpdateAddressForGuestBuyerMutationVariables = Exact<{
  request: AddressRequest;
}>;


export type UpdateAddressForGuestBuyerMutation = { __typename?: 'Mutation', updateAddressForGuestBuyer?: { __typename?: 'AddressResponse', addressId: string } | null | undefined };

export type DeleteAddressMutationVariables = Exact<{
  addressId: Scalars['ID'];
}>;


export type DeleteAddressMutation = { __typename?: 'Mutation', deleteAddress?: boolean | null | undefined };

export type DeleteAddressForGuestBuyerMutationVariables = Exact<{
  addressId: Scalars['ID'];
  guestBuyerId: Scalars['ID'];
}>;


export type DeleteAddressForGuestBuyerMutation = { __typename?: 'Mutation', deleteAddressForGuestBuyer?: boolean | null | undefined };

export type ChangePasswordMutationVariables = Exact<{
  oldPassword: Scalars['String'];
  newPassword: Scalars['String'];
  userId: Scalars['ID'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword?: boolean | null | undefined };

export const OrderResponseFieldsFragmentDoc = gql`
    fragment OrderResponseFields on OrderResponse {
  orderId
  buyerId
  orderNumber
  subTotal
  discount
  serviceFees
  shippingFees
  taxes
  totalSavings
  orderTotal
  orderItems {
    orderItemId
    listingId
    variantId
    sellerId
    quantity
    itemPrice
  }
  paymentDetails {
    balanceToPay
    usedGiftAmount
    usedWalletAmount
  }
}
    `;
export const AddressOrderFiledFragmentDoc = gql`
    fragment AddressOrderFiled on AddressResponse {
  addressId
  addressType
  flat
  block
  building
  houseNumber
  streetAddress1
  streetAddress2
  streetAddress3
  townCity
  villageArea
  district
  provinceState
  country
  areaCode
  pinCode
}
    `;
export const CollectionPointFragmentDoc = gql`
    fragment CollectionPoint on CollectionPointPickupResponse {
  collectionPointId
  microHubId
  streetAddress1
  streetAddress2
  townCity
  country
  provinceState
  areaCode
  openingHours
  contactNumber
  contactPerson
}
    `;
export const SellerLocationFragmentDoc = gql`
    fragment SellerLocation on SellerLocationPickupResponse {
  collectionPointId
  streetAddress1
  streetAddress2
  townCity
  country
  provinceState
  areaCode
  contactNumber
  contactPerson
  collectionDate
}
    `;
export const OrderItemDetailFieldFragmentDoc = gql`
    fragment OrderItemDetailField on OrderItemDetailResponse {
  orderId
  orderNumber
  orderDatetime
  orderSubTotal
  orderReturnId
  orderDiscount
  orderServiceFees
  totalSavings
  orderTotal
  buyerId
  orderItemId
  quantity
  itemPrice
  itemDiscount
  latestEventStatus
  paymentStatus
  shortName
  longName
  mainImagePath
  productId
  sellerId
  vendorSku
  sellerSku
  variantId
  priceId
  retailPrice
  wholeSalePrice
  listingId
  listingStatus
  storeId
  deliveryOption
  deliveryDate
  shippingDate
  deliveryAddress {
    ...AddressOrderFiled
  }
  pickupAddress {
    ...AddressOrderFiled
  }
  buyer {
    buyerId
    firstName
    lastName
    phoneNumber
  }
  shippingDetails {
    shippingStatus
    shippingDate
    carrier
    carrierUrl
    trackingNumber
    expectedDeliveryDate
    shippingInstructions
    deliveryDate
    failedDeliveryReason
    events {
      eventType
      eventDateTime
    }
  }
  collectionPoint {
    ...CollectionPoint
  }
  sellerLocation {
    ...SellerLocation
  }
  sellerDirectDelivery {
    announcementId
    deliveryDate
  }
}
    ${AddressOrderFiledFragmentDoc}
${CollectionPointFragmentDoc}
${SellerLocationFragmentDoc}`;
export const SellerViewFieldFragmentDoc = gql`
    fragment SellerViewField on SellerView {
  id
  brandName
  avatarUrl
  usersRating
  name
  description
  ratingCount
}
    `;
export const ProductReturnPolicyViewFieldFragmentDoc = gql`
    fragment ProductReturnPolicyViewField on ProductReturnPolicyView {
  id
  productId
  name
  description
  value
}
    `;
export const KeyValuePairFieldFragmentDoc = gql`
    fragment KeyValuePairField on KeyValuePair {
  key
  value
}
    `;
export const ListingVariantViewFieldFragmentDoc = gql`
    fragment ListingVariantViewField on ListingVariantView {
  listingId
  variantId
  productId
  defaultVariant
  retailPrice
  wholeSalePrice
  fullPath
  itemsInStock
  itemsAvailable
  itemsSold
  options {
    ...KeyValuePairField
  }
  isAvailable
}
    ${KeyValuePairFieldFragmentDoc}`;
export const ReviewViewFieldFragmentDoc = gql`
    fragment ReviewViewField on ReviewView {
  id
  productId
  sellerId
  title
  description
  ratingVote
  helpfulCount
  postedBy
  postedByName
}
    `;
export const AddressFieldFragmentDoc = gql`
    fragment AddressField on AddressView {
  addressId
  flat
  block
  building
  houseNumber
  streetAddress1
  streetAddress2
  streetAddress3
  townCity
  villageArea
  district
  provinceState
  country
  areaCode
  landmark
  pinCode
  addressFloor
}
    `;
export const RatingDetailFieldFragmentDoc = gql`
    fragment RatingDetailField on RatingDetail {
  zeroStar
  oneStar
  twoStar
  threeStar
  fourStar
  fiveStar
  sixAndMoreStar
}
    `;
export const ProductCategoryViewFieldFragmentDoc = gql`
    fragment ProductCategoryViewField on ProductCategoryView {
  categoryId
  productId
  name
  description
}
    `;
export const ImagesFieldFragmentDoc = gql`
    fragment ImagesField on Images {
  id
  referenceId
  imageName
  imageType
  description
  fullPath
}
    `;
export const ProductListingViewFieldFragmentDoc = gql`
    fragment ProductListingViewField on ProductListingView {
  photo
  photoUrls
  shortName
  numberOfStars
  numberOfReviews
  retailPrice
  wholeSalePrice
  salePercentage
  percentOff
  amountSaved
  openUntil
  noOfOrderedItems
  noOfItemsInStock
  description
  technicalDetails
  highlightBullets
  seller {
    ...SellerViewField
  }
  returnPolicies {
    ...ProductReturnPolicyViewField
  }
  listingVariants {
    ...ListingVariantViewField
  }
  relatedProducts
  reviews {
    ...ReviewViewField
  }
  listingId
  productId
  storeId
  storeName
  status
  rating
  closedDate
  productListingType
  progressBarValue
  numberOfItemsAvailable
  qtyAvailable
  minQtyPerCart
  minSoldQuantity
  itemSold
  createOn
  returnAddressId
  returnAddress {
    ...AddressField
  }
  longName
  ratingDetail {
    ...RatingDetailField
  }
  announcementId
  sellerId
  categories {
    ...ProductCategoryViewField
  }
  images {
    ...ImagesField
  }
  deliveryOption
  courierName
  courierShippingFee
  courierShippingFeeTax
  announcementDeliveryDate
  pickupAddress {
    ...AddressField
  }
}
    ${SellerViewFieldFragmentDoc}
${ProductReturnPolicyViewFieldFragmentDoc}
${ListingVariantViewFieldFragmentDoc}
${ReviewViewFieldFragmentDoc}
${AddressFieldFragmentDoc}
${RatingDetailFieldFragmentDoc}
${ProductCategoryViewFieldFragmentDoc}
${ImagesFieldFragmentDoc}`;
export const IsListingAvailableFieldFragmentDoc = gql`
    fragment IsListingAvailableField on IsListingAvailableResponse {
  listingId
  variantId
  isAvailable
  reason
  listing {
    ...ProductListingViewField
  }
}
    ${ProductListingViewFieldFragmentDoc}`;
export const SellerProductPriceFieldFragmentDoc = gql`
    fragment SellerProductPriceField on SellerProductPrice {
  priceId
  currency
  retailPrice
  wholeSalePrice
  salePercentage
  totalQuantityPrice
  taxPercentage
}
    `;
export const SellerProductImageFieldFragmentDoc = gql`
    fragment SellerProductImageField on SellerProductImage {
  photoUrl
  imageName
  description
  imageType
}
    `;
export const SellerProductVariantFieldFragmentDoc = gql`
    fragment SellerProductVariantField on SellerProductVariant {
  variantId
  priceId
  photoUrl
  itemsInStock
  defaultVariant
  retailPrice
  wholeSalePrice
  options {
    optionId
    valueId
    name
    value
  }
}
    `;
export const ProductReturnPolicyFieldFragmentDoc = gql`
    fragment ProductReturnPolicyField on ProductReturnPolicy {
  returnPolicyId
  name
  value
}
    `;
export const SellerReturnPolicyFieldFragmentDoc = gql`
    fragment SellerReturnPolicyField on SellerReturnPolicy {
  returnAddress {
    ...AddressField
  }
  returnLabel {
    ...SellerProductImageField
  }
  policies {
    ...ProductReturnPolicyField
  }
}
    ${AddressFieldFragmentDoc}
${SellerProductImageFieldFragmentDoc}
${ProductReturnPolicyFieldFragmentDoc}`;
export const SellerProductDetailViewFieldFragmentDoc = gql`
    fragment SellerProductDetailViewField on SellerProductDetailView {
  productId
  shortName
  longName
  description
  mainPhotoUrl
  vendorSku
  sellerSku
  brand
  productType
  productStatus
  vendorName
  price {
    ...SellerProductPriceField
  }
  images {
    ...SellerProductImageField
  }
  variants {
    ...SellerProductVariantField
  }
  categories {
    categoryId
    name
    description
  }
  itemsInStock
  returnPolicy {
    ...SellerReturnPolicyField
  }
}
    ${SellerProductPriceFieldFragmentDoc}
${SellerProductImageFieldFragmentDoc}
${SellerProductVariantFieldFragmentDoc}
${SellerReturnPolicyFieldFragmentDoc}`;
export const BillingDetailsFieldsFragmentDoc = gql`
    fragment BillingDetailsFields on BillingDetailsResponse {
  billingDetailsId
  buyerId
  firstName
  lastName
  companyName
  email
  phoneNumber
  billingAddress {
    addressId
    addressType
    flat
    block
    building
    houseNumber
    streetAddress1
    streetAddress2
    streetAddress3
    townCity
    villageArea
    district
    provinceState
    country
    areaCode
    pinCode
  }
  taxCode
  createdAt
  updatedAt
}
    `;
export const BuyerProfileResponseFieldsFragmentDoc = gql`
    fragment BuyerProfileResponseFields on BuyerProfileResponse {
  userId
  buyerId
  userName
  firstName
  lastName
  email
  phoneNumber
  emailVerified
  phoneNumberVerified
  userType
  createdAt
  updatedAt
  oneClickPurchaseOn
  guestBuyer
  geoLocation
  country
  languages
  currencies
  applicationSettings
  categoryPreferences
  productPreferences
  sellerPreferences
  billingDetails {
    ...BillingDetailsFields
  }
  refundSalamiCredit
  bonusSalamiCredit
  bonusSalamiCreditExpire
  walletId
}
    ${BillingDetailsFieldsFragmentDoc}`;
export const AddProductReviewDocument = gql`
    mutation AddProductReview($input: ProductReviewInput!) {
  addProductReview(input: $input) {
    reviewId
  }
}
    `;
export type AddProductReviewMutationFn = Apollo.MutationFunction<AddProductReviewMutation, AddProductReviewMutationVariables>;

/**
 * __useAddProductReviewMutation__
 *
 * To run a mutation, you first call `useAddProductReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProductReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProductReviewMutation, { data, loading, error }] = useAddProductReviewMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddProductReviewMutation(baseOptions?: Apollo.MutationHookOptions<AddProductReviewMutation, AddProductReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddProductReviewMutation, AddProductReviewMutationVariables>(AddProductReviewDocument, options);
      }
export type AddProductReviewMutationHookResult = ReturnType<typeof useAddProductReviewMutation>;
export type AddProductReviewMutationResult = Apollo.MutationResult<AddProductReviewMutation>;
export type AddProductReviewMutationOptions = Apollo.BaseMutationOptions<AddProductReviewMutation, AddProductReviewMutationVariables>;
export const AddSellerReviewDocument = gql`
    mutation AddSellerReview($input: SellerReviewInput!) {
  addSellerReview(input: $input) {
    reviewId
  }
}
    `;
export type AddSellerReviewMutationFn = Apollo.MutationFunction<AddSellerReviewMutation, AddSellerReviewMutationVariables>;

/**
 * __useAddSellerReviewMutation__
 *
 * To run a mutation, you first call `useAddSellerReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSellerReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSellerReviewMutation, { data, loading, error }] = useAddSellerReviewMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddSellerReviewMutation(baseOptions?: Apollo.MutationHookOptions<AddSellerReviewMutation, AddSellerReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddSellerReviewMutation, AddSellerReviewMutationVariables>(AddSellerReviewDocument, options);
      }
export type AddSellerReviewMutationHookResult = ReturnType<typeof useAddSellerReviewMutation>;
export type AddSellerReviewMutationResult = Apollo.MutationResult<AddSellerReviewMutation>;
export type AddSellerReviewMutationOptions = Apollo.BaseMutationOptions<AddSellerReviewMutation, AddSellerReviewMutationVariables>;
export const AddListingToWishlistDocument = gql`
    mutation AddListingToWishlist($buyerId: ID!, $listingId: ID!) {
  addListingToWishlist(buyerId: $buyerId, listingId: $listingId) {
    id
  }
}
    `;
export type AddListingToWishlistMutationFn = Apollo.MutationFunction<AddListingToWishlistMutation, AddListingToWishlistMutationVariables>;

/**
 * __useAddListingToWishlistMutation__
 *
 * To run a mutation, you first call `useAddListingToWishlistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddListingToWishlistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addListingToWishlistMutation, { data, loading, error }] = useAddListingToWishlistMutation({
 *   variables: {
 *      buyerId: // value for 'buyerId'
 *      listingId: // value for 'listingId'
 *   },
 * });
 */
export function useAddListingToWishlistMutation(baseOptions?: Apollo.MutationHookOptions<AddListingToWishlistMutation, AddListingToWishlistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddListingToWishlistMutation, AddListingToWishlistMutationVariables>(AddListingToWishlistDocument, options);
      }
export type AddListingToWishlistMutationHookResult = ReturnType<typeof useAddListingToWishlistMutation>;
export type AddListingToWishlistMutationResult = Apollo.MutationResult<AddListingToWishlistMutation>;
export type AddListingToWishlistMutationOptions = Apollo.BaseMutationOptions<AddListingToWishlistMutation, AddListingToWishlistMutationVariables>;
export const DeleteListingFromWishlistDocument = gql`
    mutation DeleteListingFromWishlist($buyerId: ID!, $listingId: ID!) {
  deleteListingFromWishlist(buyerId: $buyerId, listingId: $listingId)
}
    `;
export type DeleteListingFromWishlistMutationFn = Apollo.MutationFunction<DeleteListingFromWishlistMutation, DeleteListingFromWishlistMutationVariables>;

/**
 * __useDeleteListingFromWishlistMutation__
 *
 * To run a mutation, you first call `useDeleteListingFromWishlistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteListingFromWishlistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteListingFromWishlistMutation, { data, loading, error }] = useDeleteListingFromWishlistMutation({
 *   variables: {
 *      buyerId: // value for 'buyerId'
 *      listingId: // value for 'listingId'
 *   },
 * });
 */
export function useDeleteListingFromWishlistMutation(baseOptions?: Apollo.MutationHookOptions<DeleteListingFromWishlistMutation, DeleteListingFromWishlistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteListingFromWishlistMutation, DeleteListingFromWishlistMutationVariables>(DeleteListingFromWishlistDocument, options);
      }
export type DeleteListingFromWishlistMutationHookResult = ReturnType<typeof useDeleteListingFromWishlistMutation>;
export type DeleteListingFromWishlistMutationResult = Apollo.MutationResult<DeleteListingFromWishlistMutation>;
export type DeleteListingFromWishlistMutationOptions = Apollo.BaseMutationOptions<DeleteListingFromWishlistMutation, DeleteListingFromWishlistMutationVariables>;
export const IncrementHelpfulCountDocument = gql`
    mutation IncrementHelpfulCount($reviewId: String!) {
  incrementHelpfulCount(reviewId: $reviewId)
}
    `;
export type IncrementHelpfulCountMutationFn = Apollo.MutationFunction<IncrementHelpfulCountMutation, IncrementHelpfulCountMutationVariables>;

/**
 * __useIncrementHelpfulCountMutation__
 *
 * To run a mutation, you first call `useIncrementHelpfulCountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIncrementHelpfulCountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [incrementHelpfulCountMutation, { data, loading, error }] = useIncrementHelpfulCountMutation({
 *   variables: {
 *      reviewId: // value for 'reviewId'
 *   },
 * });
 */
export function useIncrementHelpfulCountMutation(baseOptions?: Apollo.MutationHookOptions<IncrementHelpfulCountMutation, IncrementHelpfulCountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<IncrementHelpfulCountMutation, IncrementHelpfulCountMutationVariables>(IncrementHelpfulCountDocument, options);
      }
export type IncrementHelpfulCountMutationHookResult = ReturnType<typeof useIncrementHelpfulCountMutation>;
export type IncrementHelpfulCountMutationResult = Apollo.MutationResult<IncrementHelpfulCountMutation>;
export type IncrementHelpfulCountMutationOptions = Apollo.BaseMutationOptions<IncrementHelpfulCountMutation, IncrementHelpfulCountMutationVariables>;
export const AddReportReviewDocument = gql`
    mutation AddReportReview($input: ReportReviewInput!) {
  addReportReview(input: $input) {
    reviewId
  }
}
    `;
export type AddReportReviewMutationFn = Apollo.MutationFunction<AddReportReviewMutation, AddReportReviewMutationVariables>;

/**
 * __useAddReportReviewMutation__
 *
 * To run a mutation, you first call `useAddReportReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddReportReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addReportReviewMutation, { data, loading, error }] = useAddReportReviewMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddReportReviewMutation(baseOptions?: Apollo.MutationHookOptions<AddReportReviewMutation, AddReportReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddReportReviewMutation, AddReportReviewMutationVariables>(AddReportReviewDocument, options);
      }
export type AddReportReviewMutationHookResult = ReturnType<typeof useAddReportReviewMutation>;
export type AddReportReviewMutationResult = Apollo.MutationResult<AddReportReviewMutation>;
export type AddReportReviewMutationOptions = Apollo.BaseMutationOptions<AddReportReviewMutation, AddReportReviewMutationVariables>;
export const UpdateListingStatusDocument = gql`
    mutation UpdateListingStatus($input: ListingStatusInput!) {
  updateListingStatus(input: $input) {
    id
  }
}
    `;
export type UpdateListingStatusMutationFn = Apollo.MutationFunction<UpdateListingStatusMutation, UpdateListingStatusMutationVariables>;

/**
 * __useUpdateListingStatusMutation__
 *
 * To run a mutation, you first call `useUpdateListingStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateListingStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateListingStatusMutation, { data, loading, error }] = useUpdateListingStatusMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateListingStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateListingStatusMutation, UpdateListingStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateListingStatusMutation, UpdateListingStatusMutationVariables>(UpdateListingStatusDocument, options);
      }
export type UpdateListingStatusMutationHookResult = ReturnType<typeof useUpdateListingStatusMutation>;
export type UpdateListingStatusMutationResult = Apollo.MutationResult<UpdateListingStatusMutation>;
export type UpdateListingStatusMutationOptions = Apollo.BaseMutationOptions<UpdateListingStatusMutation, UpdateListingStatusMutationVariables>;
export const CancelOrderItemDocument = gql`
    mutation CancelOrderItem($request: CancelOrderItemRequest) {
  cancelOrderItem(request: $request)
}
    `;
export type CancelOrderItemMutationFn = Apollo.MutationFunction<CancelOrderItemMutation, CancelOrderItemMutationVariables>;

/**
 * __useCancelOrderItemMutation__
 *
 * To run a mutation, you first call `useCancelOrderItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelOrderItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelOrderItemMutation, { data, loading, error }] = useCancelOrderItemMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCancelOrderItemMutation(baseOptions?: Apollo.MutationHookOptions<CancelOrderItemMutation, CancelOrderItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelOrderItemMutation, CancelOrderItemMutationVariables>(CancelOrderItemDocument, options);
      }
export type CancelOrderItemMutationHookResult = ReturnType<typeof useCancelOrderItemMutation>;
export type CancelOrderItemMutationResult = Apollo.MutationResult<CancelOrderItemMutation>;
export type CancelOrderItemMutationOptions = Apollo.BaseMutationOptions<CancelOrderItemMutation, CancelOrderItemMutationVariables>;
export const MarkOrderItemAsDeliveredDocument = gql`
    mutation MarkOrderItemAsDelivered($request: OrderItemDeliveredRequest!) {
  markOrderItemAsDelivered(request: $request)
}
    `;
export type MarkOrderItemAsDeliveredMutationFn = Apollo.MutationFunction<MarkOrderItemAsDeliveredMutation, MarkOrderItemAsDeliveredMutationVariables>;

/**
 * __useMarkOrderItemAsDeliveredMutation__
 *
 * To run a mutation, you first call `useMarkOrderItemAsDeliveredMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkOrderItemAsDeliveredMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markOrderItemAsDeliveredMutation, { data, loading, error }] = useMarkOrderItemAsDeliveredMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useMarkOrderItemAsDeliveredMutation(baseOptions?: Apollo.MutationHookOptions<MarkOrderItemAsDeliveredMutation, MarkOrderItemAsDeliveredMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkOrderItemAsDeliveredMutation, MarkOrderItemAsDeliveredMutationVariables>(MarkOrderItemAsDeliveredDocument, options);
      }
export type MarkOrderItemAsDeliveredMutationHookResult = ReturnType<typeof useMarkOrderItemAsDeliveredMutation>;
export type MarkOrderItemAsDeliveredMutationResult = Apollo.MutationResult<MarkOrderItemAsDeliveredMutation>;
export type MarkOrderItemAsDeliveredMutationOptions = Apollo.BaseMutationOptions<MarkOrderItemAsDeliveredMutation, MarkOrderItemAsDeliveredMutationVariables>;
export const SubmitOrderReturnRequestDocument = gql`
    mutation SubmitOrderReturnRequest($request: OrderReturnRequest!) {
  submitOrderReturnRequest(request: $request) {
    orderReturnId
    deadline
    latestEventStatus
    deliveryOption
    returnLabel
    returnAddress {
      addressId
      streetAddress1
      streetAddress2
      townCity
      country
      provinceState
      areaCode
    }
    collectionPoint {
      collectionPointId
      microHubId
      streetAddress1
      streetAddress2
      townCity
      country
      provinceState
      areaCode
      openingHours
      contactNumber
      contactPerson
    }
    sellerLocation {
      collectionPointId
      streetAddress1
      streetAddress2
      townCity
      country
      provinceState
      areaCode
      contactNumber
      contactPerson
      collectionDate
    }
    qrCodeAsBase64
  }
}
    `;
export type SubmitOrderReturnRequestMutationFn = Apollo.MutationFunction<SubmitOrderReturnRequestMutation, SubmitOrderReturnRequestMutationVariables>;

/**
 * __useSubmitOrderReturnRequestMutation__
 *
 * To run a mutation, you first call `useSubmitOrderReturnRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitOrderReturnRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitOrderReturnRequestMutation, { data, loading, error }] = useSubmitOrderReturnRequestMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useSubmitOrderReturnRequestMutation(baseOptions?: Apollo.MutationHookOptions<SubmitOrderReturnRequestMutation, SubmitOrderReturnRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubmitOrderReturnRequestMutation, SubmitOrderReturnRequestMutationVariables>(SubmitOrderReturnRequestDocument, options);
      }
export type SubmitOrderReturnRequestMutationHookResult = ReturnType<typeof useSubmitOrderReturnRequestMutation>;
export type SubmitOrderReturnRequestMutationResult = Apollo.MutationResult<SubmitOrderReturnRequestMutation>;
export type SubmitOrderReturnRequestMutationOptions = Apollo.BaseMutationOptions<SubmitOrderReturnRequestMutation, SubmitOrderReturnRequestMutationVariables>;
export const CreateOrderFromCartDocument = gql`
    mutation CreateOrderFromCart($cart: CartInput!) {
  createOrderFromCart(request: $cart) {
    ...OrderResponseFields
  }
}
    ${OrderResponseFieldsFragmentDoc}`;
export type CreateOrderFromCartMutationFn = Apollo.MutationFunction<CreateOrderFromCartMutation, CreateOrderFromCartMutationVariables>;

/**
 * __useCreateOrderFromCartMutation__
 *
 * To run a mutation, you first call `useCreateOrderFromCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderFromCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderFromCartMutation, { data, loading, error }] = useCreateOrderFromCartMutation({
 *   variables: {
 *      cart: // value for 'cart'
 *   },
 * });
 */
export function useCreateOrderFromCartMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderFromCartMutation, CreateOrderFromCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrderFromCartMutation, CreateOrderFromCartMutationVariables>(CreateOrderFromCartDocument, options);
      }
export type CreateOrderFromCartMutationHookResult = ReturnType<typeof useCreateOrderFromCartMutation>;
export type CreateOrderFromCartMutationResult = Apollo.MutationResult<CreateOrderFromCartMutation>;
export type CreateOrderFromCartMutationOptions = Apollo.BaseMutationOptions<CreateOrderFromCartMutation, CreateOrderFromCartMutationVariables>;
export const RazorpayCreateOrderDocument = gql`
    mutation RazorpayCreateOrder($request: RazorpayOrderRequest!) {
  razorpayCreateOrder(request: $request) {
    razorpayOrderId
    razorpayOrderStatus
  }
}
    `;
export type RazorpayCreateOrderMutationFn = Apollo.MutationFunction<RazorpayCreateOrderMutation, RazorpayCreateOrderMutationVariables>;

/**
 * __useRazorpayCreateOrderMutation__
 *
 * To run a mutation, you first call `useRazorpayCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRazorpayCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [razorpayCreateOrderMutation, { data, loading, error }] = useRazorpayCreateOrderMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useRazorpayCreateOrderMutation(baseOptions?: Apollo.MutationHookOptions<RazorpayCreateOrderMutation, RazorpayCreateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RazorpayCreateOrderMutation, RazorpayCreateOrderMutationVariables>(RazorpayCreateOrderDocument, options);
      }
export type RazorpayCreateOrderMutationHookResult = ReturnType<typeof useRazorpayCreateOrderMutation>;
export type RazorpayCreateOrderMutationResult = Apollo.MutationResult<RazorpayCreateOrderMutation>;
export type RazorpayCreateOrderMutationOptions = Apollo.BaseMutationOptions<RazorpayCreateOrderMutation, RazorpayCreateOrderMutationVariables>;
export const RazorpayVerifyPaymentSignatureDocument = gql`
    mutation RazorpayVerifyPaymentSignature($request: RazorpayVerifyPaymentSignatureRequest!) {
  razorpayVerifyPaymentSignature(request: $request) {
    valid
    razorpayPaymentId
    razorpayOrderId
    razorpayPaymentStatus
    razorpayOrderId
    razorpayOrderStatus
  }
}
    `;
export type RazorpayVerifyPaymentSignatureMutationFn = Apollo.MutationFunction<RazorpayVerifyPaymentSignatureMutation, RazorpayVerifyPaymentSignatureMutationVariables>;

/**
 * __useRazorpayVerifyPaymentSignatureMutation__
 *
 * To run a mutation, you first call `useRazorpayVerifyPaymentSignatureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRazorpayVerifyPaymentSignatureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [razorpayVerifyPaymentSignatureMutation, { data, loading, error }] = useRazorpayVerifyPaymentSignatureMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useRazorpayVerifyPaymentSignatureMutation(baseOptions?: Apollo.MutationHookOptions<RazorpayVerifyPaymentSignatureMutation, RazorpayVerifyPaymentSignatureMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RazorpayVerifyPaymentSignatureMutation, RazorpayVerifyPaymentSignatureMutationVariables>(RazorpayVerifyPaymentSignatureDocument, options);
      }
export type RazorpayVerifyPaymentSignatureMutationHookResult = ReturnType<typeof useRazorpayVerifyPaymentSignatureMutation>;
export type RazorpayVerifyPaymentSignatureMutationResult = Apollo.MutationResult<RazorpayVerifyPaymentSignatureMutation>;
export type RazorpayVerifyPaymentSignatureMutationOptions = Apollo.BaseMutationOptions<RazorpayVerifyPaymentSignatureMutation, RazorpayVerifyPaymentSignatureMutationVariables>;
export const GetBuyerSalamiWalletBalanceDocument = gql`
    query GetBuyerSalamiWalletBalance {
  getBuyerSalamiWalletBalance {
    walletId
    buyerId
    walletBalance
    giftBalance
  }
}
    `;

/**
 * __useGetBuyerSalamiWalletBalanceQuery__
 *
 * To run a query within a React component, call `useGetBuyerSalamiWalletBalanceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBuyerSalamiWalletBalanceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBuyerSalamiWalletBalanceQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBuyerSalamiWalletBalanceQuery(baseOptions?: Apollo.QueryHookOptions<GetBuyerSalamiWalletBalanceQuery, GetBuyerSalamiWalletBalanceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBuyerSalamiWalletBalanceQuery, GetBuyerSalamiWalletBalanceQueryVariables>(GetBuyerSalamiWalletBalanceDocument, options);
      }
export function useGetBuyerSalamiWalletBalanceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBuyerSalamiWalletBalanceQuery, GetBuyerSalamiWalletBalanceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBuyerSalamiWalletBalanceQuery, GetBuyerSalamiWalletBalanceQueryVariables>(GetBuyerSalamiWalletBalanceDocument, options);
        }
export type GetBuyerSalamiWalletBalanceQueryHookResult = ReturnType<typeof useGetBuyerSalamiWalletBalanceQuery>;
export type GetBuyerSalamiWalletBalanceLazyQueryHookResult = ReturnType<typeof useGetBuyerSalamiWalletBalanceLazyQuery>;
export type GetBuyerSalamiWalletBalanceQueryResult = Apollo.QueryResult<GetBuyerSalamiWalletBalanceQuery, GetBuyerSalamiWalletBalanceQueryVariables>;
export const SearchBuyerOrdersDocument = gql`
    query SearchBuyerOrders($options: BuyerOrderOption!) {
  searchBuyerOrders(options: $options) {
    content {
      ...OrderItemDetailField
    }
    pageNo
    pageSize
    totalPages
    totalElements
  }
}
    ${OrderItemDetailFieldFragmentDoc}`;

/**
 * __useSearchBuyerOrdersQuery__
 *
 * To run a query within a React component, call `useSearchBuyerOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchBuyerOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchBuyerOrdersQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useSearchBuyerOrdersQuery(baseOptions: Apollo.QueryHookOptions<SearchBuyerOrdersQuery, SearchBuyerOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchBuyerOrdersQuery, SearchBuyerOrdersQueryVariables>(SearchBuyerOrdersDocument, options);
      }
export function useSearchBuyerOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchBuyerOrdersQuery, SearchBuyerOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchBuyerOrdersQuery, SearchBuyerOrdersQueryVariables>(SearchBuyerOrdersDocument, options);
        }
export type SearchBuyerOrdersQueryHookResult = ReturnType<typeof useSearchBuyerOrdersQuery>;
export type SearchBuyerOrdersLazyQueryHookResult = ReturnType<typeof useSearchBuyerOrdersLazyQuery>;
export type SearchBuyerOrdersQueryResult = Apollo.QueryResult<SearchBuyerOrdersQuery, SearchBuyerOrdersQueryVariables>;
export const GetOrderReturnStatusDocument = gql`
    query GetOrderReturnStatus($orderReturnId: String!) {
  getOrderReturnStatus(orderReturnId: $orderReturnId) {
    deadline
    orderReturnId
    events {
      returnId
      eventDateTime
      eventType
      notes
    }
  }
}
    `;

/**
 * __useGetOrderReturnStatusQuery__
 *
 * To run a query within a React component, call `useGetOrderReturnStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrderReturnStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrderReturnStatusQuery({
 *   variables: {
 *      orderReturnId: // value for 'orderReturnId'
 *   },
 * });
 */
export function useGetOrderReturnStatusQuery(baseOptions: Apollo.QueryHookOptions<GetOrderReturnStatusQuery, GetOrderReturnStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrderReturnStatusQuery, GetOrderReturnStatusQueryVariables>(GetOrderReturnStatusDocument, options);
      }
export function useGetOrderReturnStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrderReturnStatusQuery, GetOrderReturnStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrderReturnStatusQuery, GetOrderReturnStatusQueryVariables>(GetOrderReturnStatusDocument, options);
        }
export type GetOrderReturnStatusQueryHookResult = ReturnType<typeof useGetOrderReturnStatusQuery>;
export type GetOrderReturnStatusLazyQueryHookResult = ReturnType<typeof useGetOrderReturnStatusLazyQuery>;
export type GetOrderReturnStatusQueryResult = Apollo.QueryResult<GetOrderReturnStatusQuery, GetOrderReturnStatusQueryVariables>;
export const GetOrderItemDetailsDocument = gql`
    query GetOrderItemDetails($orderItemId: ID!) {
  getOrderItemDetails(orderItemId: $orderItemId) {
    ...OrderItemDetailField
  }
}
    ${OrderItemDetailFieldFragmentDoc}`;

/**
 * __useGetOrderItemDetailsQuery__
 *
 * To run a query within a React component, call `useGetOrderItemDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrderItemDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrderItemDetailsQuery({
 *   variables: {
 *      orderItemId: // value for 'orderItemId'
 *   },
 * });
 */
export function useGetOrderItemDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetOrderItemDetailsQuery, GetOrderItemDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrderItemDetailsQuery, GetOrderItemDetailsQueryVariables>(GetOrderItemDetailsDocument, options);
      }
export function useGetOrderItemDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrderItemDetailsQuery, GetOrderItemDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrderItemDetailsQuery, GetOrderItemDetailsQueryVariables>(GetOrderItemDetailsDocument, options);
        }
export type GetOrderItemDetailsQueryHookResult = ReturnType<typeof useGetOrderItemDetailsQuery>;
export type GetOrderItemDetailsLazyQueryHookResult = ReturnType<typeof useGetOrderItemDetailsLazyQuery>;
export type GetOrderItemDetailsQueryResult = Apollo.QueryResult<GetOrderItemDetailsQuery, GetOrderItemDetailsQueryVariables>;
export const TrackOrderItemDocument = gql`
    query TrackOrderItem($orderItemId: ID!) {
  trackOrderItem(orderItemId: $orderItemId) {
    orderItemId
    deliveryOption
    latestEventStatus
    orderNumber
    dateDelivered
    events {
      eventId
      eventDateTime
      eventType
      notes
    }
    shippingDetails {
      shippingStatus
      shippingDate
      carrier
      carrierUrl
      trackingNumber
      expectedDeliveryDate
      shippingInstructions
      deliveryDate
      failedDeliveryReason
      events {
        eventType
        eventDateTime
      }
    }
    collectionPoint {
      collectionPointId
      microHubId
      streetAddress1
      streetAddress2
      townCity
      country
      provinceState
      areaCode
      openingHours
      contactNumber
      contactPerson
      collectionDate
    }
    sellerLocation {
      collectionPointId
      streetAddress1
      streetAddress2
      townCity
      country
      provinceState
      areaCode
      contactNumber
      contactPerson
      collectionDate
    }
    sellerDirectDelivery {
      announcementId
      deliveryDate
    }
    qrCodeAsBase64
  }
}
    `;

/**
 * __useTrackOrderItemQuery__
 *
 * To run a query within a React component, call `useTrackOrderItemQuery` and pass it any options that fit your needs.
 * When your component renders, `useTrackOrderItemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTrackOrderItemQuery({
 *   variables: {
 *      orderItemId: // value for 'orderItemId'
 *   },
 * });
 */
export function useTrackOrderItemQuery(baseOptions: Apollo.QueryHookOptions<TrackOrderItemQuery, TrackOrderItemQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TrackOrderItemQuery, TrackOrderItemQueryVariables>(TrackOrderItemDocument, options);
      }
export function useTrackOrderItemLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TrackOrderItemQuery, TrackOrderItemQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TrackOrderItemQuery, TrackOrderItemQueryVariables>(TrackOrderItemDocument, options);
        }
export type TrackOrderItemQueryHookResult = ReturnType<typeof useTrackOrderItemQuery>;
export type TrackOrderItemLazyQueryHookResult = ReturnType<typeof useTrackOrderItemLazyQuery>;
export type TrackOrderItemQueryResult = Apollo.QueryResult<TrackOrderItemQuery, TrackOrderItemQueryVariables>;
export const GetListingsDocument = gql`
    query GetListings($searchOptions: SearchOptions) {
  getListings(searchOptions: $searchOptions) {
    content {
      ...ProductListingViewField
    }
    pageNo
    pageSize
    totalPages
    totalElements
  }
}
    ${ProductListingViewFieldFragmentDoc}`;

/**
 * __useGetListingsQuery__
 *
 * To run a query within a React component, call `useGetListingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetListingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetListingsQuery({
 *   variables: {
 *      searchOptions: // value for 'searchOptions'
 *   },
 * });
 */
export function useGetListingsQuery(baseOptions?: Apollo.QueryHookOptions<GetListingsQuery, GetListingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetListingsQuery, GetListingsQueryVariables>(GetListingsDocument, options);
      }
export function useGetListingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetListingsQuery, GetListingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetListingsQuery, GetListingsQueryVariables>(GetListingsDocument, options);
        }
export type GetListingsQueryHookResult = ReturnType<typeof useGetListingsQuery>;
export type GetListingsLazyQueryHookResult = ReturnType<typeof useGetListingsLazyQuery>;
export type GetListingsQueryResult = Apollo.QueryResult<GetListingsQuery, GetListingsQueryVariables>;
export const GetRelatedProductsDocument = gql`
    query GetRelatedProducts($productId: ID!) {
  getRelatedProducts(productId: $productId) {
    ...SellerProductDetailViewField
  }
}
    ${SellerProductDetailViewFieldFragmentDoc}`;

/**
 * __useGetRelatedProductsQuery__
 *
 * To run a query within a React component, call `useGetRelatedProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRelatedProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRelatedProductsQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useGetRelatedProductsQuery(baseOptions: Apollo.QueryHookOptions<GetRelatedProductsQuery, GetRelatedProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRelatedProductsQuery, GetRelatedProductsQueryVariables>(GetRelatedProductsDocument, options);
      }
export function useGetRelatedProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRelatedProductsQuery, GetRelatedProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRelatedProductsQuery, GetRelatedProductsQueryVariables>(GetRelatedProductsDocument, options);
        }
export type GetRelatedProductsQueryHookResult = ReturnType<typeof useGetRelatedProductsQuery>;
export type GetRelatedProductsLazyQueryHookResult = ReturnType<typeof useGetRelatedProductsLazyQuery>;
export type GetRelatedProductsQueryResult = Apollo.QueryResult<GetRelatedProductsQuery, GetRelatedProductsQueryVariables>;
export const IsListingInWishlistDocument = gql`
    query IsListingInWishlist($buyerId: ID!, $listingId: ID!) {
  isListingInWishlist(buyerId: $buyerId, listingId: $listingId)
}
    `;

/**
 * __useIsListingInWishlistQuery__
 *
 * To run a query within a React component, call `useIsListingInWishlistQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsListingInWishlistQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsListingInWishlistQuery({
 *   variables: {
 *      buyerId: // value for 'buyerId'
 *      listingId: // value for 'listingId'
 *   },
 * });
 */
export function useIsListingInWishlistQuery(baseOptions: Apollo.QueryHookOptions<IsListingInWishlistQuery, IsListingInWishlistQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsListingInWishlistQuery, IsListingInWishlistQueryVariables>(IsListingInWishlistDocument, options);
      }
export function useIsListingInWishlistLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsListingInWishlistQuery, IsListingInWishlistQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsListingInWishlistQuery, IsListingInWishlistQueryVariables>(IsListingInWishlistDocument, options);
        }
export type IsListingInWishlistQueryHookResult = ReturnType<typeof useIsListingInWishlistQuery>;
export type IsListingInWishlistLazyQueryHookResult = ReturnType<typeof useIsListingInWishlistLazyQuery>;
export type IsListingInWishlistQueryResult = Apollo.QueryResult<IsListingInWishlistQuery, IsListingInWishlistQueryVariables>;
export const GetBuyerWishlistListingDocument = gql`
    query GetBuyerWishlistListing($options: WishlistOption!) {
  getBuyerWishlistListing(options: $options) {
    content {
      ...ProductListingViewField
    }
    pageNo
    pageSize
    totalPages
    totalElements
  }
}
    ${ProductListingViewFieldFragmentDoc}`;

/**
 * __useGetBuyerWishlistListingQuery__
 *
 * To run a query within a React component, call `useGetBuyerWishlistListingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBuyerWishlistListingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBuyerWishlistListingQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetBuyerWishlistListingQuery(baseOptions: Apollo.QueryHookOptions<GetBuyerWishlistListingQuery, GetBuyerWishlistListingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBuyerWishlistListingQuery, GetBuyerWishlistListingQueryVariables>(GetBuyerWishlistListingDocument, options);
      }
export function useGetBuyerWishlistListingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBuyerWishlistListingQuery, GetBuyerWishlistListingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBuyerWishlistListingQuery, GetBuyerWishlistListingQueryVariables>(GetBuyerWishlistListingDocument, options);
        }
export type GetBuyerWishlistListingQueryHookResult = ReturnType<typeof useGetBuyerWishlistListingQuery>;
export type GetBuyerWishlistListingLazyQueryHookResult = ReturnType<typeof useGetBuyerWishlistListingLazyQuery>;
export type GetBuyerWishlistListingQueryResult = Apollo.QueryResult<GetBuyerWishlistListingQuery, GetBuyerWishlistListingQueryVariables>;
export const GetProductByProductIdDocument = gql`
    query GetProductByProductId($productId: String!) {
  getProductByProductId(productId: $productId) {
    ...SellerProductDetailViewField
  }
}
    ${SellerProductDetailViewFieldFragmentDoc}`;

/**
 * __useGetProductByProductIdQuery__
 *
 * To run a query within a React component, call `useGetProductByProductIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductByProductIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductByProductIdQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useGetProductByProductIdQuery(baseOptions: Apollo.QueryHookOptions<GetProductByProductIdQuery, GetProductByProductIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductByProductIdQuery, GetProductByProductIdQueryVariables>(GetProductByProductIdDocument, options);
      }
export function useGetProductByProductIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductByProductIdQuery, GetProductByProductIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductByProductIdQuery, GetProductByProductIdQueryVariables>(GetProductByProductIdDocument, options);
        }
export type GetProductByProductIdQueryHookResult = ReturnType<typeof useGetProductByProductIdQuery>;
export type GetProductByProductIdLazyQueryHookResult = ReturnType<typeof useGetProductByProductIdLazyQuery>;
export type GetProductByProductIdQueryResult = Apollo.QueryResult<GetProductByProductIdQuery, GetProductByProductIdQueryVariables>;
export const GetPreferredCategoriesDocument = gql`
    query GetPreferredCategories($buyerId: ID!) {
  getPreferredCategories(buyerId: $buyerId) {
    categoryId
    name
    description
  }
}
    `;

/**
 * __useGetPreferredCategoriesQuery__
 *
 * To run a query within a React component, call `useGetPreferredCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPreferredCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPreferredCategoriesQuery({
 *   variables: {
 *      buyerId: // value for 'buyerId'
 *   },
 * });
 */
export function useGetPreferredCategoriesQuery(baseOptions: Apollo.QueryHookOptions<GetPreferredCategoriesQuery, GetPreferredCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPreferredCategoriesQuery, GetPreferredCategoriesQueryVariables>(GetPreferredCategoriesDocument, options);
      }
export function useGetPreferredCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPreferredCategoriesQuery, GetPreferredCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPreferredCategoriesQuery, GetPreferredCategoriesQueryVariables>(GetPreferredCategoriesDocument, options);
        }
export type GetPreferredCategoriesQueryHookResult = ReturnType<typeof useGetPreferredCategoriesQuery>;
export type GetPreferredCategoriesLazyQueryHookResult = ReturnType<typeof useGetPreferredCategoriesLazyQuery>;
export type GetPreferredCategoriesQueryResult = Apollo.QueryResult<GetPreferredCategoriesQuery, GetPreferredCategoriesQueryVariables>;
export const IsListingAvailableDocument = gql`
    query IsListingAvailable($listings: [IsListingAvailableInput!]!) {
  isListingAvailable(listings: $listings) {
    ...IsListingAvailableField
  }
}
    ${IsListingAvailableFieldFragmentDoc}`;

/**
 * __useIsListingAvailableQuery__
 *
 * To run a query within a React component, call `useIsListingAvailableQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsListingAvailableQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsListingAvailableQuery({
 *   variables: {
 *      listings: // value for 'listings'
 *   },
 * });
 */
export function useIsListingAvailableQuery(baseOptions: Apollo.QueryHookOptions<IsListingAvailableQuery, IsListingAvailableQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsListingAvailableQuery, IsListingAvailableQueryVariables>(IsListingAvailableDocument, options);
      }
export function useIsListingAvailableLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsListingAvailableQuery, IsListingAvailableQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsListingAvailableQuery, IsListingAvailableQueryVariables>(IsListingAvailableDocument, options);
        }
export type IsListingAvailableQueryHookResult = ReturnType<typeof useIsListingAvailableQuery>;
export type IsListingAvailableLazyQueryHookResult = ReturnType<typeof useIsListingAvailableLazyQuery>;
export type IsListingAvailableQueryResult = Apollo.QueryResult<IsListingAvailableQuery, IsListingAvailableQueryVariables>;
export const BuyerProfileByUserIdDocument = gql`
    query BuyerProfileByUserId($userProfileId: ID!) {
  buyerProfileByUserId(userProfileId: $userProfileId) {
    ...BuyerProfileResponseFields
  }
}
    ${BuyerProfileResponseFieldsFragmentDoc}`;

/**
 * __useBuyerProfileByUserIdQuery__
 *
 * To run a query within a React component, call `useBuyerProfileByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useBuyerProfileByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBuyerProfileByUserIdQuery({
 *   variables: {
 *      userProfileId: // value for 'userProfileId'
 *   },
 * });
 */
export function useBuyerProfileByUserIdQuery(baseOptions: Apollo.QueryHookOptions<BuyerProfileByUserIdQuery, BuyerProfileByUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BuyerProfileByUserIdQuery, BuyerProfileByUserIdQueryVariables>(BuyerProfileByUserIdDocument, options);
      }
export function useBuyerProfileByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BuyerProfileByUserIdQuery, BuyerProfileByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BuyerProfileByUserIdQuery, BuyerProfileByUserIdQueryVariables>(BuyerProfileByUserIdDocument, options);
        }
export type BuyerProfileByUserIdQueryHookResult = ReturnType<typeof useBuyerProfileByUserIdQuery>;
export type BuyerProfileByUserIdLazyQueryHookResult = ReturnType<typeof useBuyerProfileByUserIdLazyQuery>;
export type BuyerProfileByUserIdQueryResult = Apollo.QueryResult<BuyerProfileByUserIdQuery, BuyerProfileByUserIdQueryVariables>;
export const UserHasVerifiedPhoneNumberDocument = gql`
    query UserHasVerifiedPhoneNumber($userId: ID!) {
  userHasVerifiedPhoneNumber(userId: $userId)
}
    `;

/**
 * __useUserHasVerifiedPhoneNumberQuery__
 *
 * To run a query within a React component, call `useUserHasVerifiedPhoneNumberQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserHasVerifiedPhoneNumberQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserHasVerifiedPhoneNumberQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserHasVerifiedPhoneNumberQuery(baseOptions: Apollo.QueryHookOptions<UserHasVerifiedPhoneNumberQuery, UserHasVerifiedPhoneNumberQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserHasVerifiedPhoneNumberQuery, UserHasVerifiedPhoneNumberQueryVariables>(UserHasVerifiedPhoneNumberDocument, options);
      }
export function useUserHasVerifiedPhoneNumberLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserHasVerifiedPhoneNumberQuery, UserHasVerifiedPhoneNumberQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserHasVerifiedPhoneNumberQuery, UserHasVerifiedPhoneNumberQueryVariables>(UserHasVerifiedPhoneNumberDocument, options);
        }
export type UserHasVerifiedPhoneNumberQueryHookResult = ReturnType<typeof useUserHasVerifiedPhoneNumberQuery>;
export type UserHasVerifiedPhoneNumberLazyQueryHookResult = ReturnType<typeof useUserHasVerifiedPhoneNumberLazyQuery>;
export type UserHasVerifiedPhoneNumberQueryResult = Apollo.QueryResult<UserHasVerifiedPhoneNumberQuery, UserHasVerifiedPhoneNumberQueryVariables>;
export const BuyerProfileDocument = gql`
    query BuyerProfile($buyerId: ID!) {
  buyerProfile(buyerId: $buyerId) {
    ...BuyerProfileResponseFields
  }
}
    ${BuyerProfileResponseFieldsFragmentDoc}`;

/**
 * __useBuyerProfileQuery__
 *
 * To run a query within a React component, call `useBuyerProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useBuyerProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBuyerProfileQuery({
 *   variables: {
 *      buyerId: // value for 'buyerId'
 *   },
 * });
 */
export function useBuyerProfileQuery(baseOptions: Apollo.QueryHookOptions<BuyerProfileQuery, BuyerProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BuyerProfileQuery, BuyerProfileQueryVariables>(BuyerProfileDocument, options);
      }
export function useBuyerProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BuyerProfileQuery, BuyerProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BuyerProfileQuery, BuyerProfileQueryVariables>(BuyerProfileDocument, options);
        }
export type BuyerProfileQueryHookResult = ReturnType<typeof useBuyerProfileQuery>;
export type BuyerProfileLazyQueryHookResult = ReturnType<typeof useBuyerProfileLazyQuery>;
export type BuyerProfileQueryResult = Apollo.QueryResult<BuyerProfileQuery, BuyerProfileQueryVariables>;
export const ValidateBuyerHasAnyOrderDocument = gql`
    query ValidateBuyerHasAnyOrder($buyerId: ID!) {
  validateBuyerHasAnyOrder(buyerId: $buyerId)
}
    `;

/**
 * __useValidateBuyerHasAnyOrderQuery__
 *
 * To run a query within a React component, call `useValidateBuyerHasAnyOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useValidateBuyerHasAnyOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useValidateBuyerHasAnyOrderQuery({
 *   variables: {
 *      buyerId: // value for 'buyerId'
 *   },
 * });
 */
export function useValidateBuyerHasAnyOrderQuery(baseOptions: Apollo.QueryHookOptions<ValidateBuyerHasAnyOrderQuery, ValidateBuyerHasAnyOrderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ValidateBuyerHasAnyOrderQuery, ValidateBuyerHasAnyOrderQueryVariables>(ValidateBuyerHasAnyOrderDocument, options);
      }
export function useValidateBuyerHasAnyOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ValidateBuyerHasAnyOrderQuery, ValidateBuyerHasAnyOrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ValidateBuyerHasAnyOrderQuery, ValidateBuyerHasAnyOrderQueryVariables>(ValidateBuyerHasAnyOrderDocument, options);
        }
export type ValidateBuyerHasAnyOrderQueryHookResult = ReturnType<typeof useValidateBuyerHasAnyOrderQuery>;
export type ValidateBuyerHasAnyOrderLazyQueryHookResult = ReturnType<typeof useValidateBuyerHasAnyOrderLazyQuery>;
export type ValidateBuyerHasAnyOrderQueryResult = Apollo.QueryResult<ValidateBuyerHasAnyOrderQuery, ValidateBuyerHasAnyOrderQueryVariables>;
export const SellerProfileBasicDetailsDocument = gql`
    query SellerProfileBasicDetails($sellerId: ID!) {
  sellerProfileBasicDetails(sellerId: $sellerId) {
    sellerId
    firstName
    lastName
    storeName
  }
}
    `;

/**
 * __useSellerProfileBasicDetailsQuery__
 *
 * To run a query within a React component, call `useSellerProfileBasicDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSellerProfileBasicDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSellerProfileBasicDetailsQuery({
 *   variables: {
 *      sellerId: // value for 'sellerId'
 *   },
 * });
 */
export function useSellerProfileBasicDetailsQuery(baseOptions: Apollo.QueryHookOptions<SellerProfileBasicDetailsQuery, SellerProfileBasicDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SellerProfileBasicDetailsQuery, SellerProfileBasicDetailsQueryVariables>(SellerProfileBasicDetailsDocument, options);
      }
export function useSellerProfileBasicDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SellerProfileBasicDetailsQuery, SellerProfileBasicDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SellerProfileBasicDetailsQuery, SellerProfileBasicDetailsQueryVariables>(SellerProfileBasicDetailsDocument, options);
        }
export type SellerProfileBasicDetailsQueryHookResult = ReturnType<typeof useSellerProfileBasicDetailsQuery>;
export type SellerProfileBasicDetailsLazyQueryHookResult = ReturnType<typeof useSellerProfileBasicDetailsLazyQuery>;
export type SellerProfileBasicDetailsQueryResult = Apollo.QueryResult<SellerProfileBasicDetailsQuery, SellerProfileBasicDetailsQueryVariables>;
export const BillingDetailsByGuestBuyerIdDocument = gql`
    query BillingDetailsByGuestBuyerId($guestBuyerId: ID!) {
  billingDetailsByGuestBuyerId(guestBuyerId: $guestBuyerId) {
    ...BillingDetailsFields
  }
}
    ${BillingDetailsFieldsFragmentDoc}`;

/**
 * __useBillingDetailsByGuestBuyerIdQuery__
 *
 * To run a query within a React component, call `useBillingDetailsByGuestBuyerIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useBillingDetailsByGuestBuyerIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBillingDetailsByGuestBuyerIdQuery({
 *   variables: {
 *      guestBuyerId: // value for 'guestBuyerId'
 *   },
 * });
 */
export function useBillingDetailsByGuestBuyerIdQuery(baseOptions: Apollo.QueryHookOptions<BillingDetailsByGuestBuyerIdQuery, BillingDetailsByGuestBuyerIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BillingDetailsByGuestBuyerIdQuery, BillingDetailsByGuestBuyerIdQueryVariables>(BillingDetailsByGuestBuyerIdDocument, options);
      }
export function useBillingDetailsByGuestBuyerIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BillingDetailsByGuestBuyerIdQuery, BillingDetailsByGuestBuyerIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BillingDetailsByGuestBuyerIdQuery, BillingDetailsByGuestBuyerIdQueryVariables>(BillingDetailsByGuestBuyerIdDocument, options);
        }
export type BillingDetailsByGuestBuyerIdQueryHookResult = ReturnType<typeof useBillingDetailsByGuestBuyerIdQuery>;
export type BillingDetailsByGuestBuyerIdLazyQueryHookResult = ReturnType<typeof useBillingDetailsByGuestBuyerIdLazyQuery>;
export type BillingDetailsByGuestBuyerIdQueryResult = Apollo.QueryResult<BillingDetailsByGuestBuyerIdQuery, BillingDetailsByGuestBuyerIdQueryVariables>;
export const GetGuestBuyerDefaultAddressByBuyerIdDocument = gql`
    query GetGuestBuyerDefaultAddressByBuyerId($buyerId: ID!) {
  getGuestBuyerDefaultAddressByBuyerId(buyerId: $buyerId) {
    ...AddressOrderFiled
  }
}
    ${AddressOrderFiledFragmentDoc}`;

/**
 * __useGetGuestBuyerDefaultAddressByBuyerIdQuery__
 *
 * To run a query within a React component, call `useGetGuestBuyerDefaultAddressByBuyerIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGuestBuyerDefaultAddressByBuyerIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGuestBuyerDefaultAddressByBuyerIdQuery({
 *   variables: {
 *      buyerId: // value for 'buyerId'
 *   },
 * });
 */
export function useGetGuestBuyerDefaultAddressByBuyerIdQuery(baseOptions: Apollo.QueryHookOptions<GetGuestBuyerDefaultAddressByBuyerIdQuery, GetGuestBuyerDefaultAddressByBuyerIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGuestBuyerDefaultAddressByBuyerIdQuery, GetGuestBuyerDefaultAddressByBuyerIdQueryVariables>(GetGuestBuyerDefaultAddressByBuyerIdDocument, options);
      }
export function useGetGuestBuyerDefaultAddressByBuyerIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGuestBuyerDefaultAddressByBuyerIdQuery, GetGuestBuyerDefaultAddressByBuyerIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGuestBuyerDefaultAddressByBuyerIdQuery, GetGuestBuyerDefaultAddressByBuyerIdQueryVariables>(GetGuestBuyerDefaultAddressByBuyerIdDocument, options);
        }
export type GetGuestBuyerDefaultAddressByBuyerIdQueryHookResult = ReturnType<typeof useGetGuestBuyerDefaultAddressByBuyerIdQuery>;
export type GetGuestBuyerDefaultAddressByBuyerIdLazyQueryHookResult = ReturnType<typeof useGetGuestBuyerDefaultAddressByBuyerIdLazyQuery>;
export type GetGuestBuyerDefaultAddressByBuyerIdQueryResult = Apollo.QueryResult<GetGuestBuyerDefaultAddressByBuyerIdQuery, GetGuestBuyerDefaultAddressByBuyerIdQueryVariables>;
export const GetBuyerDefaultAddressByBuyerIdDocument = gql`
    query GetBuyerDefaultAddressByBuyerId($buyerId: ID!) {
  getBuyerDefaultAddressByBuyerId(buyerId: $buyerId) {
    ...AddressOrderFiled
  }
}
    ${AddressOrderFiledFragmentDoc}`;

/**
 * __useGetBuyerDefaultAddressByBuyerIdQuery__
 *
 * To run a query within a React component, call `useGetBuyerDefaultAddressByBuyerIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBuyerDefaultAddressByBuyerIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBuyerDefaultAddressByBuyerIdQuery({
 *   variables: {
 *      buyerId: // value for 'buyerId'
 *   },
 * });
 */
export function useGetBuyerDefaultAddressByBuyerIdQuery(baseOptions: Apollo.QueryHookOptions<GetBuyerDefaultAddressByBuyerIdQuery, GetBuyerDefaultAddressByBuyerIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBuyerDefaultAddressByBuyerIdQuery, GetBuyerDefaultAddressByBuyerIdQueryVariables>(GetBuyerDefaultAddressByBuyerIdDocument, options);
      }
export function useGetBuyerDefaultAddressByBuyerIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBuyerDefaultAddressByBuyerIdQuery, GetBuyerDefaultAddressByBuyerIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBuyerDefaultAddressByBuyerIdQuery, GetBuyerDefaultAddressByBuyerIdQueryVariables>(GetBuyerDefaultAddressByBuyerIdDocument, options);
        }
export type GetBuyerDefaultAddressByBuyerIdQueryHookResult = ReturnType<typeof useGetBuyerDefaultAddressByBuyerIdQuery>;
export type GetBuyerDefaultAddressByBuyerIdLazyQueryHookResult = ReturnType<typeof useGetBuyerDefaultAddressByBuyerIdLazyQuery>;
export type GetBuyerDefaultAddressByBuyerIdQueryResult = Apollo.QueryResult<GetBuyerDefaultAddressByBuyerIdQuery, GetBuyerDefaultAddressByBuyerIdQueryVariables>;
export const DeliveryAddressForBuyerDocument = gql`
    query DeliveryAddressForBuyer($buyerId: ID!) {
  deliveryAddressForBuyer(buyerId: $buyerId) {
    ...AddressOrderFiled
  }
}
    ${AddressOrderFiledFragmentDoc}`;

/**
 * __useDeliveryAddressForBuyerQuery__
 *
 * To run a query within a React component, call `useDeliveryAddressForBuyerQuery` and pass it any options that fit your needs.
 * When your component renders, `useDeliveryAddressForBuyerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDeliveryAddressForBuyerQuery({
 *   variables: {
 *      buyerId: // value for 'buyerId'
 *   },
 * });
 */
export function useDeliveryAddressForBuyerQuery(baseOptions: Apollo.QueryHookOptions<DeliveryAddressForBuyerQuery, DeliveryAddressForBuyerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DeliveryAddressForBuyerQuery, DeliveryAddressForBuyerQueryVariables>(DeliveryAddressForBuyerDocument, options);
      }
export function useDeliveryAddressForBuyerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DeliveryAddressForBuyerQuery, DeliveryAddressForBuyerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DeliveryAddressForBuyerQuery, DeliveryAddressForBuyerQueryVariables>(DeliveryAddressForBuyerDocument, options);
        }
export type DeliveryAddressForBuyerQueryHookResult = ReturnType<typeof useDeliveryAddressForBuyerQuery>;
export type DeliveryAddressForBuyerLazyQueryHookResult = ReturnType<typeof useDeliveryAddressForBuyerLazyQuery>;
export type DeliveryAddressForBuyerQueryResult = Apollo.QueryResult<DeliveryAddressForBuyerQuery, DeliveryAddressForBuyerQueryVariables>;
export const DeliveryAddressForGuestBuyerDocument = gql`
    query DeliveryAddressForGuestBuyer($buyerId: ID!) {
  deliveryAddressForGuestBuyer(buyerId: $buyerId) {
    ...AddressOrderFiled
  }
}
    ${AddressOrderFiledFragmentDoc}`;

/**
 * __useDeliveryAddressForGuestBuyerQuery__
 *
 * To run a query within a React component, call `useDeliveryAddressForGuestBuyerQuery` and pass it any options that fit your needs.
 * When your component renders, `useDeliveryAddressForGuestBuyerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDeliveryAddressForGuestBuyerQuery({
 *   variables: {
 *      buyerId: // value for 'buyerId'
 *   },
 * });
 */
export function useDeliveryAddressForGuestBuyerQuery(baseOptions: Apollo.QueryHookOptions<DeliveryAddressForGuestBuyerQuery, DeliveryAddressForGuestBuyerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DeliveryAddressForGuestBuyerQuery, DeliveryAddressForGuestBuyerQueryVariables>(DeliveryAddressForGuestBuyerDocument, options);
      }
export function useDeliveryAddressForGuestBuyerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DeliveryAddressForGuestBuyerQuery, DeliveryAddressForGuestBuyerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DeliveryAddressForGuestBuyerQuery, DeliveryAddressForGuestBuyerQueryVariables>(DeliveryAddressForGuestBuyerDocument, options);
        }
export type DeliveryAddressForGuestBuyerQueryHookResult = ReturnType<typeof useDeliveryAddressForGuestBuyerQuery>;
export type DeliveryAddressForGuestBuyerLazyQueryHookResult = ReturnType<typeof useDeliveryAddressForGuestBuyerLazyQuery>;
export type DeliveryAddressForGuestBuyerQueryResult = Apollo.QueryResult<DeliveryAddressForGuestBuyerQuery, DeliveryAddressForGuestBuyerQueryVariables>;
export const DeleteBuyerProfileDocument = gql`
    mutation DeleteBuyerProfile($buyerId: ID!) {
  deleteBuyerProfile(buyerId: $buyerId)
}
    `;
export type DeleteBuyerProfileMutationFn = Apollo.MutationFunction<DeleteBuyerProfileMutation, DeleteBuyerProfileMutationVariables>;

/**
 * __useDeleteBuyerProfileMutation__
 *
 * To run a mutation, you first call `useDeleteBuyerProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBuyerProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBuyerProfileMutation, { data, loading, error }] = useDeleteBuyerProfileMutation({
 *   variables: {
 *      buyerId: // value for 'buyerId'
 *   },
 * });
 */
export function useDeleteBuyerProfileMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBuyerProfileMutation, DeleteBuyerProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBuyerProfileMutation, DeleteBuyerProfileMutationVariables>(DeleteBuyerProfileDocument, options);
      }
export type DeleteBuyerProfileMutationHookResult = ReturnType<typeof useDeleteBuyerProfileMutation>;
export type DeleteBuyerProfileMutationResult = Apollo.MutationResult<DeleteBuyerProfileMutation>;
export type DeleteBuyerProfileMutationOptions = Apollo.BaseMutationOptions<DeleteBuyerProfileMutation, DeleteBuyerProfileMutationVariables>;
export const SendOtpCodeDocument = gql`
    mutation SendOTPCode($sendCodeRequest: SendCodeRequest!) {
  sendOTPCode(sendCodeRequest: $sendCodeRequest) {
    status
    message
  }
}
    `;
export type SendOtpCodeMutationFn = Apollo.MutationFunction<SendOtpCodeMutation, SendOtpCodeMutationVariables>;

/**
 * __useSendOtpCodeMutation__
 *
 * To run a mutation, you first call `useSendOtpCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendOtpCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendOtpCodeMutation, { data, loading, error }] = useSendOtpCodeMutation({
 *   variables: {
 *      sendCodeRequest: // value for 'sendCodeRequest'
 *   },
 * });
 */
export function useSendOtpCodeMutation(baseOptions?: Apollo.MutationHookOptions<SendOtpCodeMutation, SendOtpCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendOtpCodeMutation, SendOtpCodeMutationVariables>(SendOtpCodeDocument, options);
      }
export type SendOtpCodeMutationHookResult = ReturnType<typeof useSendOtpCodeMutation>;
export type SendOtpCodeMutationResult = Apollo.MutationResult<SendOtpCodeMutation>;
export type SendOtpCodeMutationOptions = Apollo.BaseMutationOptions<SendOtpCodeMutation, SendOtpCodeMutationVariables>;
export const ValidateCodeDocument = gql`
    mutation ValidateCode($request: ValidateCodeRequest!) {
  validateCode(request: $request) {
    status
    message
  }
}
    `;
export type ValidateCodeMutationFn = Apollo.MutationFunction<ValidateCodeMutation, ValidateCodeMutationVariables>;

/**
 * __useValidateCodeMutation__
 *
 * To run a mutation, you first call `useValidateCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useValidateCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [validateCodeMutation, { data, loading, error }] = useValidateCodeMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useValidateCodeMutation(baseOptions?: Apollo.MutationHookOptions<ValidateCodeMutation, ValidateCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ValidateCodeMutation, ValidateCodeMutationVariables>(ValidateCodeDocument, options);
      }
export type ValidateCodeMutationHookResult = ReturnType<typeof useValidateCodeMutation>;
export type ValidateCodeMutationResult = Apollo.MutationResult<ValidateCodeMutation>;
export type ValidateCodeMutationOptions = Apollo.BaseMutationOptions<ValidateCodeMutation, ValidateCodeMutationVariables>;
export const ForgotPasswordStep1SendNotificationEmailDocument = gql`
    mutation ForgotPasswordStep1SendNotificationEmail($email: String!) {
  forgotPasswordStep1SendNotificationEmail(email: $email) {
    email
    phoneNumber
    message
  }
}
    `;
export type ForgotPasswordStep1SendNotificationEmailMutationFn = Apollo.MutationFunction<ForgotPasswordStep1SendNotificationEmailMutation, ForgotPasswordStep1SendNotificationEmailMutationVariables>;

/**
 * __useForgotPasswordStep1SendNotificationEmailMutation__
 *
 * To run a mutation, you first call `useForgotPasswordStep1SendNotificationEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordStep1SendNotificationEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordStep1SendNotificationEmailMutation, { data, loading, error }] = useForgotPasswordStep1SendNotificationEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordStep1SendNotificationEmailMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordStep1SendNotificationEmailMutation, ForgotPasswordStep1SendNotificationEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordStep1SendNotificationEmailMutation, ForgotPasswordStep1SendNotificationEmailMutationVariables>(ForgotPasswordStep1SendNotificationEmailDocument, options);
      }
export type ForgotPasswordStep1SendNotificationEmailMutationHookResult = ReturnType<typeof useForgotPasswordStep1SendNotificationEmailMutation>;
export type ForgotPasswordStep1SendNotificationEmailMutationResult = Apollo.MutationResult<ForgotPasswordStep1SendNotificationEmailMutation>;
export type ForgotPasswordStep1SendNotificationEmailMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordStep1SendNotificationEmailMutation, ForgotPasswordStep1SendNotificationEmailMutationVariables>;
export const ForgotPasswordStep1SendNotificationSmsDocument = gql`
    mutation ForgotPasswordStep1SendNotificationSms($sms: String!) {
  forgotPasswordStep1SendNotificationSms(sms: $sms) {
    email
    phoneNumber
    message
  }
}
    `;
export type ForgotPasswordStep1SendNotificationSmsMutationFn = Apollo.MutationFunction<ForgotPasswordStep1SendNotificationSmsMutation, ForgotPasswordStep1SendNotificationSmsMutationVariables>;

/**
 * __useForgotPasswordStep1SendNotificationSmsMutation__
 *
 * To run a mutation, you first call `useForgotPasswordStep1SendNotificationSmsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordStep1SendNotificationSmsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordStep1SendNotificationSmsMutation, { data, loading, error }] = useForgotPasswordStep1SendNotificationSmsMutation({
 *   variables: {
 *      sms: // value for 'sms'
 *   },
 * });
 */
export function useForgotPasswordStep1SendNotificationSmsMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordStep1SendNotificationSmsMutation, ForgotPasswordStep1SendNotificationSmsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordStep1SendNotificationSmsMutation, ForgotPasswordStep1SendNotificationSmsMutationVariables>(ForgotPasswordStep1SendNotificationSmsDocument, options);
      }
export type ForgotPasswordStep1SendNotificationSmsMutationHookResult = ReturnType<typeof useForgotPasswordStep1SendNotificationSmsMutation>;
export type ForgotPasswordStep1SendNotificationSmsMutationResult = Apollo.MutationResult<ForgotPasswordStep1SendNotificationSmsMutation>;
export type ForgotPasswordStep1SendNotificationSmsMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordStep1SendNotificationSmsMutation, ForgotPasswordStep1SendNotificationSmsMutationVariables>;
export const RegisterBuyerDocument = gql`
    mutation RegisterBuyer($request: BuyerProfileRequestForCreate!) {
  registerBuyer(request: $request) {
    buyerId
    userId
  }
}
    `;
export type RegisterBuyerMutationFn = Apollo.MutationFunction<RegisterBuyerMutation, RegisterBuyerMutationVariables>;

/**
 * __useRegisterBuyerMutation__
 *
 * To run a mutation, you first call `useRegisterBuyerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterBuyerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerBuyerMutation, { data, loading, error }] = useRegisterBuyerMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useRegisterBuyerMutation(baseOptions?: Apollo.MutationHookOptions<RegisterBuyerMutation, RegisterBuyerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterBuyerMutation, RegisterBuyerMutationVariables>(RegisterBuyerDocument, options);
      }
export type RegisterBuyerMutationHookResult = ReturnType<typeof useRegisterBuyerMutation>;
export type RegisterBuyerMutationResult = Apollo.MutationResult<RegisterBuyerMutation>;
export type RegisterBuyerMutationOptions = Apollo.BaseMutationOptions<RegisterBuyerMutation, RegisterBuyerMutationVariables>;
export const RegisterGuestBuyerToBuyerDocument = gql`
    mutation RegisterGuestBuyerToBuyer($request: GuestBuyerProfileRequest!) {
  registerGuestBuyerToBuyer(request: $request) {
    ...BuyerProfileResponseFields
  }
}
    ${BuyerProfileResponseFieldsFragmentDoc}`;
export type RegisterGuestBuyerToBuyerMutationFn = Apollo.MutationFunction<RegisterGuestBuyerToBuyerMutation, RegisterGuestBuyerToBuyerMutationVariables>;

/**
 * __useRegisterGuestBuyerToBuyerMutation__
 *
 * To run a mutation, you first call `useRegisterGuestBuyerToBuyerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterGuestBuyerToBuyerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerGuestBuyerToBuyerMutation, { data, loading, error }] = useRegisterGuestBuyerToBuyerMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useRegisterGuestBuyerToBuyerMutation(baseOptions?: Apollo.MutationHookOptions<RegisterGuestBuyerToBuyerMutation, RegisterGuestBuyerToBuyerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterGuestBuyerToBuyerMutation, RegisterGuestBuyerToBuyerMutationVariables>(RegisterGuestBuyerToBuyerDocument, options);
      }
export type RegisterGuestBuyerToBuyerMutationHookResult = ReturnType<typeof useRegisterGuestBuyerToBuyerMutation>;
export type RegisterGuestBuyerToBuyerMutationResult = Apollo.MutationResult<RegisterGuestBuyerToBuyerMutation>;
export type RegisterGuestBuyerToBuyerMutationOptions = Apollo.BaseMutationOptions<RegisterGuestBuyerToBuyerMutation, RegisterGuestBuyerToBuyerMutationVariables>;
export const UpdateBillingDetailsDocument = gql`
    mutation UpdateBillingDetails($request: BillingDetailsRequest!) {
  updateBillingDetails(request: $request) {
    ...BillingDetailsFields
  }
}
    ${BillingDetailsFieldsFragmentDoc}`;
export type UpdateBillingDetailsMutationFn = Apollo.MutationFunction<UpdateBillingDetailsMutation, UpdateBillingDetailsMutationVariables>;

/**
 * __useUpdateBillingDetailsMutation__
 *
 * To run a mutation, you first call `useUpdateBillingDetailsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBillingDetailsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBillingDetailsMutation, { data, loading, error }] = useUpdateBillingDetailsMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useUpdateBillingDetailsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBillingDetailsMutation, UpdateBillingDetailsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBillingDetailsMutation, UpdateBillingDetailsMutationVariables>(UpdateBillingDetailsDocument, options);
      }
export type UpdateBillingDetailsMutationHookResult = ReturnType<typeof useUpdateBillingDetailsMutation>;
export type UpdateBillingDetailsMutationResult = Apollo.MutationResult<UpdateBillingDetailsMutation>;
export type UpdateBillingDetailsMutationOptions = Apollo.BaseMutationOptions<UpdateBillingDetailsMutation, UpdateBillingDetailsMutationVariables>;
export const CreateBillingDetailsDocument = gql`
    mutation CreateBillingDetails($request: BillingDetailsRequestForCreate!) {
  createBillingDetails(request: $request) {
    ...BillingDetailsFields
  }
}
    ${BillingDetailsFieldsFragmentDoc}`;
export type CreateBillingDetailsMutationFn = Apollo.MutationFunction<CreateBillingDetailsMutation, CreateBillingDetailsMutationVariables>;

/**
 * __useCreateBillingDetailsMutation__
 *
 * To run a mutation, you first call `useCreateBillingDetailsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBillingDetailsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBillingDetailsMutation, { data, loading, error }] = useCreateBillingDetailsMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateBillingDetailsMutation(baseOptions?: Apollo.MutationHookOptions<CreateBillingDetailsMutation, CreateBillingDetailsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBillingDetailsMutation, CreateBillingDetailsMutationVariables>(CreateBillingDetailsDocument, options);
      }
export type CreateBillingDetailsMutationHookResult = ReturnType<typeof useCreateBillingDetailsMutation>;
export type CreateBillingDetailsMutationResult = Apollo.MutationResult<CreateBillingDetailsMutation>;
export type CreateBillingDetailsMutationOptions = Apollo.BaseMutationOptions<CreateBillingDetailsMutation, CreateBillingDetailsMutationVariables>;
export const CreateBillingDetailsForGuestBuyerDocument = gql`
    mutation CreateBillingDetailsForGuestBuyer($request: BillingDetailsRequestForCreate!) {
  createBillingDetailsForGuestBuyer(request: $request) {
    ...BillingDetailsFields
  }
}
    ${BillingDetailsFieldsFragmentDoc}`;
export type CreateBillingDetailsForGuestBuyerMutationFn = Apollo.MutationFunction<CreateBillingDetailsForGuestBuyerMutation, CreateBillingDetailsForGuestBuyerMutationVariables>;

/**
 * __useCreateBillingDetailsForGuestBuyerMutation__
 *
 * To run a mutation, you first call `useCreateBillingDetailsForGuestBuyerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBillingDetailsForGuestBuyerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBillingDetailsForGuestBuyerMutation, { data, loading, error }] = useCreateBillingDetailsForGuestBuyerMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateBillingDetailsForGuestBuyerMutation(baseOptions?: Apollo.MutationHookOptions<CreateBillingDetailsForGuestBuyerMutation, CreateBillingDetailsForGuestBuyerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBillingDetailsForGuestBuyerMutation, CreateBillingDetailsForGuestBuyerMutationVariables>(CreateBillingDetailsForGuestBuyerDocument, options);
      }
export type CreateBillingDetailsForGuestBuyerMutationHookResult = ReturnType<typeof useCreateBillingDetailsForGuestBuyerMutation>;
export type CreateBillingDetailsForGuestBuyerMutationResult = Apollo.MutationResult<CreateBillingDetailsForGuestBuyerMutation>;
export type CreateBillingDetailsForGuestBuyerMutationOptions = Apollo.BaseMutationOptions<CreateBillingDetailsForGuestBuyerMutation, CreateBillingDetailsForGuestBuyerMutationVariables>;
export const UpdateBillingDetailsForGuestBuyerDocument = gql`
    mutation UpdateBillingDetailsForGuestBuyer($request: BillingDetailsRequest!) {
  updateBillingDetailsForGuestBuyer(request: $request) {
    ...BillingDetailsFields
  }
}
    ${BillingDetailsFieldsFragmentDoc}`;
export type UpdateBillingDetailsForGuestBuyerMutationFn = Apollo.MutationFunction<UpdateBillingDetailsForGuestBuyerMutation, UpdateBillingDetailsForGuestBuyerMutationVariables>;

/**
 * __useUpdateBillingDetailsForGuestBuyerMutation__
 *
 * To run a mutation, you first call `useUpdateBillingDetailsForGuestBuyerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBillingDetailsForGuestBuyerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBillingDetailsForGuestBuyerMutation, { data, loading, error }] = useUpdateBillingDetailsForGuestBuyerMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useUpdateBillingDetailsForGuestBuyerMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBillingDetailsForGuestBuyerMutation, UpdateBillingDetailsForGuestBuyerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBillingDetailsForGuestBuyerMutation, UpdateBillingDetailsForGuestBuyerMutationVariables>(UpdateBillingDetailsForGuestBuyerDocument, options);
      }
export type UpdateBillingDetailsForGuestBuyerMutationHookResult = ReturnType<typeof useUpdateBillingDetailsForGuestBuyerMutation>;
export type UpdateBillingDetailsForGuestBuyerMutationResult = Apollo.MutationResult<UpdateBillingDetailsForGuestBuyerMutation>;
export type UpdateBillingDetailsForGuestBuyerMutationOptions = Apollo.BaseMutationOptions<UpdateBillingDetailsForGuestBuyerMutation, UpdateBillingDetailsForGuestBuyerMutationVariables>;
export const ForgotPasswordStep2VerifyTokenSmsDocument = gql`
    mutation ForgotPasswordStep2VerifyTokenSms($sms: String!, $tokenCode: String) {
  forgotPasswordStep2VerifyTokenSms(sms: $sms, tokenCode: $tokenCode) {
    message
    actionToken
  }
}
    `;
export type ForgotPasswordStep2VerifyTokenSmsMutationFn = Apollo.MutationFunction<ForgotPasswordStep2VerifyTokenSmsMutation, ForgotPasswordStep2VerifyTokenSmsMutationVariables>;

/**
 * __useForgotPasswordStep2VerifyTokenSmsMutation__
 *
 * To run a mutation, you first call `useForgotPasswordStep2VerifyTokenSmsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordStep2VerifyTokenSmsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordStep2VerifyTokenSmsMutation, { data, loading, error }] = useForgotPasswordStep2VerifyTokenSmsMutation({
 *   variables: {
 *      sms: // value for 'sms'
 *      tokenCode: // value for 'tokenCode'
 *   },
 * });
 */
export function useForgotPasswordStep2VerifyTokenSmsMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordStep2VerifyTokenSmsMutation, ForgotPasswordStep2VerifyTokenSmsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordStep2VerifyTokenSmsMutation, ForgotPasswordStep2VerifyTokenSmsMutationVariables>(ForgotPasswordStep2VerifyTokenSmsDocument, options);
      }
export type ForgotPasswordStep2VerifyTokenSmsMutationHookResult = ReturnType<typeof useForgotPasswordStep2VerifyTokenSmsMutation>;
export type ForgotPasswordStep2VerifyTokenSmsMutationResult = Apollo.MutationResult<ForgotPasswordStep2VerifyTokenSmsMutation>;
export type ForgotPasswordStep2VerifyTokenSmsMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordStep2VerifyTokenSmsMutation, ForgotPasswordStep2VerifyTokenSmsMutationVariables>;
export const ForgotPasswordStep3ChangeBySmsDocument = gql`
    mutation ForgotPasswordStep3ChangeBySms($actionTokenValue: String!, $newPassword: String!, $confirmPassword: String!) {
  forgotPasswordStep3ChangeBySms(
    actionTokenValue: $actionTokenValue
    newPassword: $newPassword
    confirmPassword: $confirmPassword
  ) {
    message
  }
}
    `;
export type ForgotPasswordStep3ChangeBySmsMutationFn = Apollo.MutationFunction<ForgotPasswordStep3ChangeBySmsMutation, ForgotPasswordStep3ChangeBySmsMutationVariables>;

/**
 * __useForgotPasswordStep3ChangeBySmsMutation__
 *
 * To run a mutation, you first call `useForgotPasswordStep3ChangeBySmsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordStep3ChangeBySmsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordStep3ChangeBySmsMutation, { data, loading, error }] = useForgotPasswordStep3ChangeBySmsMutation({
 *   variables: {
 *      actionTokenValue: // value for 'actionTokenValue'
 *      newPassword: // value for 'newPassword'
 *      confirmPassword: // value for 'confirmPassword'
 *   },
 * });
 */
export function useForgotPasswordStep3ChangeBySmsMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordStep3ChangeBySmsMutation, ForgotPasswordStep3ChangeBySmsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordStep3ChangeBySmsMutation, ForgotPasswordStep3ChangeBySmsMutationVariables>(ForgotPasswordStep3ChangeBySmsDocument, options);
      }
export type ForgotPasswordStep3ChangeBySmsMutationHookResult = ReturnType<typeof useForgotPasswordStep3ChangeBySmsMutation>;
export type ForgotPasswordStep3ChangeBySmsMutationResult = Apollo.MutationResult<ForgotPasswordStep3ChangeBySmsMutation>;
export type ForgotPasswordStep3ChangeBySmsMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordStep3ChangeBySmsMutation, ForgotPasswordStep3ChangeBySmsMutationVariables>;
export const UpdateBuyerProfileDocument = gql`
    mutation UpdateBuyerProfile($request: BuyerProfileRequest!) {
  updateBuyerProfile(request: $request) {
    ...BuyerProfileResponseFields
  }
}
    ${BuyerProfileResponseFieldsFragmentDoc}`;
export type UpdateBuyerProfileMutationFn = Apollo.MutationFunction<UpdateBuyerProfileMutation, UpdateBuyerProfileMutationVariables>;

/**
 * __useUpdateBuyerProfileMutation__
 *
 * To run a mutation, you first call `useUpdateBuyerProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBuyerProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBuyerProfileMutation, { data, loading, error }] = useUpdateBuyerProfileMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useUpdateBuyerProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBuyerProfileMutation, UpdateBuyerProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBuyerProfileMutation, UpdateBuyerProfileMutationVariables>(UpdateBuyerProfileDocument, options);
      }
export type UpdateBuyerProfileMutationHookResult = ReturnType<typeof useUpdateBuyerProfileMutation>;
export type UpdateBuyerProfileMutationResult = Apollo.MutationResult<UpdateBuyerProfileMutation>;
export type UpdateBuyerProfileMutationOptions = Apollo.BaseMutationOptions<UpdateBuyerProfileMutation, UpdateBuyerProfileMutationVariables>;
export const UpdateAddressDocument = gql`
    mutation UpdateAddress($request: AddressRequest!) {
  updateAddress(request: $request) {
    addressId
  }
}
    `;
export type UpdateAddressMutationFn = Apollo.MutationFunction<UpdateAddressMutation, UpdateAddressMutationVariables>;

/**
 * __useUpdateAddressMutation__
 *
 * To run a mutation, you first call `useUpdateAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAddressMutation, { data, loading, error }] = useUpdateAddressMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useUpdateAddressMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAddressMutation, UpdateAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAddressMutation, UpdateAddressMutationVariables>(UpdateAddressDocument, options);
      }
export type UpdateAddressMutationHookResult = ReturnType<typeof useUpdateAddressMutation>;
export type UpdateAddressMutationResult = Apollo.MutationResult<UpdateAddressMutation>;
export type UpdateAddressMutationOptions = Apollo.BaseMutationOptions<UpdateAddressMutation, UpdateAddressMutationVariables>;
export const UpdateAddressForGuestBuyerDocument = gql`
    mutation UpdateAddressForGuestBuyer($request: AddressRequest!) {
  updateAddressForGuestBuyer(request: $request) {
    addressId
  }
}
    `;
export type UpdateAddressForGuestBuyerMutationFn = Apollo.MutationFunction<UpdateAddressForGuestBuyerMutation, UpdateAddressForGuestBuyerMutationVariables>;

/**
 * __useUpdateAddressForGuestBuyerMutation__
 *
 * To run a mutation, you first call `useUpdateAddressForGuestBuyerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAddressForGuestBuyerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAddressForGuestBuyerMutation, { data, loading, error }] = useUpdateAddressForGuestBuyerMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useUpdateAddressForGuestBuyerMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAddressForGuestBuyerMutation, UpdateAddressForGuestBuyerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAddressForGuestBuyerMutation, UpdateAddressForGuestBuyerMutationVariables>(UpdateAddressForGuestBuyerDocument, options);
      }
export type UpdateAddressForGuestBuyerMutationHookResult = ReturnType<typeof useUpdateAddressForGuestBuyerMutation>;
export type UpdateAddressForGuestBuyerMutationResult = Apollo.MutationResult<UpdateAddressForGuestBuyerMutation>;
export type UpdateAddressForGuestBuyerMutationOptions = Apollo.BaseMutationOptions<UpdateAddressForGuestBuyerMutation, UpdateAddressForGuestBuyerMutationVariables>;
export const DeleteAddressDocument = gql`
    mutation DeleteAddress($addressId: ID!) {
  deleteAddress(addressId: $addressId)
}
    `;
export type DeleteAddressMutationFn = Apollo.MutationFunction<DeleteAddressMutation, DeleteAddressMutationVariables>;

/**
 * __useDeleteAddressMutation__
 *
 * To run a mutation, you first call `useDeleteAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAddressMutation, { data, loading, error }] = useDeleteAddressMutation({
 *   variables: {
 *      addressId: // value for 'addressId'
 *   },
 * });
 */
export function useDeleteAddressMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAddressMutation, DeleteAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAddressMutation, DeleteAddressMutationVariables>(DeleteAddressDocument, options);
      }
export type DeleteAddressMutationHookResult = ReturnType<typeof useDeleteAddressMutation>;
export type DeleteAddressMutationResult = Apollo.MutationResult<DeleteAddressMutation>;
export type DeleteAddressMutationOptions = Apollo.BaseMutationOptions<DeleteAddressMutation, DeleteAddressMutationVariables>;
export const DeleteAddressForGuestBuyerDocument = gql`
    mutation DeleteAddressForGuestBuyer($addressId: ID!, $guestBuyerId: ID!) {
  deleteAddressForGuestBuyer(addressId: $addressId, guestBuyerId: $guestBuyerId)
}
    `;
export type DeleteAddressForGuestBuyerMutationFn = Apollo.MutationFunction<DeleteAddressForGuestBuyerMutation, DeleteAddressForGuestBuyerMutationVariables>;

/**
 * __useDeleteAddressForGuestBuyerMutation__
 *
 * To run a mutation, you first call `useDeleteAddressForGuestBuyerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAddressForGuestBuyerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAddressForGuestBuyerMutation, { data, loading, error }] = useDeleteAddressForGuestBuyerMutation({
 *   variables: {
 *      addressId: // value for 'addressId'
 *      guestBuyerId: // value for 'guestBuyerId'
 *   },
 * });
 */
export function useDeleteAddressForGuestBuyerMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAddressForGuestBuyerMutation, DeleteAddressForGuestBuyerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAddressForGuestBuyerMutation, DeleteAddressForGuestBuyerMutationVariables>(DeleteAddressForGuestBuyerDocument, options);
      }
export type DeleteAddressForGuestBuyerMutationHookResult = ReturnType<typeof useDeleteAddressForGuestBuyerMutation>;
export type DeleteAddressForGuestBuyerMutationResult = Apollo.MutationResult<DeleteAddressForGuestBuyerMutation>;
export type DeleteAddressForGuestBuyerMutationOptions = Apollo.BaseMutationOptions<DeleteAddressForGuestBuyerMutation, DeleteAddressForGuestBuyerMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($oldPassword: String!, $newPassword: String!, $userId: ID!) {
  changePassword(
    oldPassword: $oldPassword
    newPassword: $newPassword
    userId: $userId
  )
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      oldPassword: // value for 'oldPassword'
 *      newPassword: // value for 'newPassword'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;