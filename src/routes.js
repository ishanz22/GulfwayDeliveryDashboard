/* eslint-disable */
import { lazy } from 'react';
import { USER_ROLE } from 'constants.js';
import { DEFAULT_PATHS } from 'config.js';

const dashboard = lazy(() => import('views/dashboard/Dashboard'));
// const products = {
//   list: lazy(() => import('views/products/list/ProductsList')),
//   detail: lazy(() => import('views/products/detail/ProductsDetail')),
// };

const orders = {
  list: lazy(() => import('views/orders/list/OrdersList')),
  detail: lazy(() => import('views/orders/detail/OrdersDetail')),
  status: lazy(() => import('views/orders/status/StatusManagement')),
  analytics: lazy(() => import('views/orders/analytics/Analytics')),
};
const users = {
  list: lazy(() => import('views/users/list/UsersList')),
  detail: lazy(() => import('views/users/detail/UsersDetail')),
  logs: lazy(() => import('views/users/logs/ActivityLogs')),
  analytics: lazy(() => import('views/users/analytics/Analytics')),
  edit: lazy(() => import('views/users/edit/UserEdit')),
  activity: lazy(() => import('views/users/logs/ActivityLogs')),
};
const VendorDashboard = lazy(() => import('views/vendors/dashboard/VendorDashboard'));

const restaurant = {
  list: lazy(() => import('views/vendors/Restaurant/list/RestaurantList')),
  addnew: lazy(() => import('views/vendors/Restaurant/addNew/AddNewRestaurant')),
  detail: lazy(() => import('views/vendors/Restaurant/detail/RestaurantDetails')),
  logs: lazy(() => import('views/vendors/Restaurant/logs/RestaurantLogs')),
  Permission: lazy(() => import('views/vendors/Restaurant/permissions/Permission')),
  collection: lazy(() => import('views/vendors/Restaurant/cashCollection/CashCollection')),
};

const grocery = {
  list: lazy(() => import('views/vendors/Grocery/list/GroceryList')),
  addnew: lazy(() => import('views/vendors/Grocery/addNew/AddNewGrocery')),
  detail: lazy(() => import('views/vendors/Grocery/detail/GroceryDetails')),
  logs: lazy(() => import('views/vendors/Grocery/logs/GrocertLogs')),
  Permission: lazy(() => import('views/vendors/Grocery/permissions/Permission')),
};
const payments = {
  transaction: lazy(() => import('views/payments/transactions/PaymentTransactions')),
  payout: lazy(() => import('views/payments/payout/PayoutManagement')),
  refund: lazy(() => import('views/payments/refund/RefundManagement')),
  refundDetails: lazy(() => import('views/payments/refund/detail/RefundDetails')),
  transactionDetails: lazy(() => import('views/payments/transactions/detail/TransactionDetails')),
  paymentAnalytics: lazy(() => import('views/payments/analytics/PaymentAnalytics')),
};
// const customers = {
//   list: lazy(() => import('views/customers/list/CustomersList')),
//   detail: lazy(() => import('views/customers/detail/CustomersDetail')),
// };

const feedbacks = {
  feedbacks: lazy(() => import('views/feedbacks/list/Feedbacks')),
  support: lazy(() => import('views/feedbacks/Support')),
  resolution: lazy(() => import('views/feedbacks/Resolution')),
  detail: lazy(() => import('views/feedbacks/detail/FeedbackDetail')),
};

// const storefront = {
//   home: lazy(() => import('views/storefront/home/Home')),
//   filters: lazy(() => import('views/storefront/filters/Filters')),
//   categories: lazy(() => import('views/storefront/categories/Categories')),
//   detail: lazy(() => import('views/storefront/detail/Detail')),
//   cart: lazy(() => import('views/storefront/cart/Cart')),
//   checkout: lazy(() => import('views/storefront/checkout/Checkout')),
//   invoice: lazy(() => import('views/storefront/invoice/Invoice')),
// };
// const shipping = lazy(() => import('views/shipping/Shipping'));
const discount = lazy(() => import('views/discount/Discount'));

// const settings = {
//   home: lazy(() => import('views/settings/home/Home')),
//   general: lazy(() => import('views/settings/general/General')),
// };

const setting = {
  admin: lazy(() => import('views/setting/AdminProfile')),
  notification: lazy(() => import('views/setting/Notifications')),
  configuration: lazy(() => import('views/setting/SystemConfiguration')),
};

const rider = {
  list: lazy(() => import('views/riders/list/RiderList')),
  detail: lazy(() => import('views/riders/detail/RiderDetail')),
  addNewRider: lazy(() => import('views/riders/addNewRider/AddNewRider')),
  allRiders: lazy(() => import('views/riders/all/AllRidersMap')),
};

const delivery = {
  deliveryCharges: lazy(() => import('views/charge/DeliveryCharges')),
};
const rewards = {
  overview: lazy(() => import('views/rewards/overview/RewardOverview')),
  list: lazy(() => import('views/rewards/list/RewardList')),
  addNewReward: lazy(() => import('views/rewards/addNew/AddNewReward')),
  detail: lazy(() => import('views/rewards/detail/RewardsDetail')),
  dailyRewards: lazy(() => import('views/rewards/dailyRewards/DailyRewards')),
  purchasedRewards: lazy(() => import('views/rewards/purchasedRewards/PurchasedRewards')),
  loginRewards: lazy(() => import('views/rewards/loginRewards/LoginRewards')),
};
// const spin = {
//   spinWheel: lazy(() => import('views/spin/SpinWheel')),
// };
const spin = lazy(() => import('views/spin/SpinWheel'));

// const wishlist = {
//   list: lazy(() => import('views/wishlist/WishList')),
// };
const wishlist = lazy(() => import('views/wishlist/WishList'));

const flashDeals = lazy(() => import('views/flashdeals/FlashDealsList'));

const trip = {
  list: lazy(() => import('views/trip/list/TripList')),
  details: lazy(() => import('views/trip/details/TripDetails')),
};

//  Account & Permissions 🩸
const accounts = {
  role: lazy(() => import('views/accounts/role/RoleManagement')),
  employees: lazy(() => import('views/accounts/employees/EmployeeAccounts')),
  permission: lazy(() => import('views/accounts/permission/PermissionManagement')),
  addEmployee: lazy(() => import('views/accounts/addEmployee/AddEmployee')),
  detail: lazy(() => import('views/accounts/detail/EmployeeDetails')),
};

const logout = lazy(() => import('views/default/Login'));
const appRoot = DEFAULT_PATHS.APP.endsWith('/') ? DEFAULT_PATHS.APP.slice(1, DEFAULT_PATHS.APP.length) : DEFAULT_PATHS.APP;

const routesAndMenuItems = {
  mainMenuItems: [
    {
      path: DEFAULT_PATHS.APP,
      exact: true,
      redirect: true,
      to: `${appRoot}/dashboard`,
    },
    {
      path: `${appRoot}/dashboard`,
      component: dashboard,
      label: 'Dashboard',
      icon: 'shop',
    },

    {
      path: `${appRoot}/vendors`,
      exact: true,
      redirect: true,
      to: `${appRoot}/vendors/list`,
      label: 'Vendors',
      icon: 'invoice',
      subs: [
        { path: '/vendor-dashboard', label: 'Dashboard', icon: 'dashboard-1', component: VendorDashboard },
        {
          path: '/Restaurant', // Add a new sub-route for "users"
          label: 'Restaurant',
          icon: 'cook-hat',
          subs: [
            { path: '/list', label: 'List', component: restaurant.list },
            { path: '/addnew', label: 'Add new', component: restaurant.addnew },
            { path: '/detail', label: 'Detail', component: restaurant.detail },
            { path: '/logs', label: 'Activity', component: restaurant.logs },
            { path: '/permission', label: 'Permissions', component: restaurant.collection },
            { path: '/collection', component: restaurant.collection },
          ],
        },

        {
          path: '/Grocery', // Add a new sub-route for "users"
          label: 'Grocery',
          icon: 'shop',
          subs: [
            { path: '/list', label: 'List', component: grocery.list },
            { path: '/addnew', label: 'Add new', component: grocery.addnew },
            { path: '/detail', label: 'Detail', component: grocery.detail },
            { path: '/logs', label: 'Activity', component: grocery.logs },
            { path: '/permission', label: 'Permissions', component: grocery.Permission },
          ],
        },
      ],
    },
    {
      path: `${appRoot}/users`,
      exact: true,
      redirect: true,
      to: `${appRoot}/users/list`,
      label: 'Users',
      icon: 'user',
      subs: [
        { path: '/list', label: 'List', component: users.list },
        { path: '/detail',  component: users.detail },
       
        // { path: '/analytics', label: 'Analytics', component: users.analytics },
        { path: '/edit',  component: users.edit },
        { path: '/activity', label: 'Activity', component: users.logs },
   
      ],
    },
    {
      path: `${appRoot}/orders`,
      exact: true,
      redirect: true,
      to: `${appRoot}/orders/list`,
      label: 'Orders',
      icon: 'cart',
      subs: [
        { path: '/list', label: 'List', component: orders.list },
        { path: '/detail', label: 'Detail', component: orders.detail },
        { path: '/status', label: 'Status', component: orders.status },
        { path: '/analytics', label: 'Analytics', component: orders.analytics },
      ],
    },

    {
      path: `${appRoot}/rewards`,
      exact: true,
      redirect: true,
      to: `${appRoot}/rewards/overview`,
      label: 'Rewards',
      icon: 'gift',
      subs: [
        { path: '/overview', label: 'Overview', component: rewards.overview },
        { path: '/login-rewards', label: 'Login', component: rewards.loginRewards },
        { path: '/daily-rewards', label: 'Daily', component: rewards.dailyRewards },
        { path: '/purchased-rewards', label: 'Purchased', component: rewards.purchasedRewards },
        { path: '/list', label: 'List', component: rewards.list },

        { path: '/addNew', label: 'Add new', component: rewards.addNewReward },

        { path: '/detail', label: 'Detail', component: rewards.detail },
      ],
    },
    {
      path: `${appRoot}/spin`,
      component: spin,
      label: 'Spin wheel',
      icon: 'spinner',
    },

    {
      path: `${appRoot}/wishlist`,
      component: wishlist,
      label: 'Wishlist',
      icon: 'heart',
    },
    {
      path: `${appRoot}/flashdeals`,
      component: flashDeals,
      label: 'Flash deals',
      icon: 'flash',
    },

    {
      path: `${appRoot}/payments`,
      exact: true,
      redirect: true,
      to: `${appRoot}/payments/transaction`,
      label: 'Payment',
      icon: 'money',
      subs: [
        {
          path: '/transactions',
          label: 'Transaction',
          component: payments.transaction,
          subs: [
            { path: '/detail', component: payments.transactionDetails }, // refund details
          ],
        },

        { path: '/payout', label: 'Payout', component: payments.payout },
        {
          path: '/refund',
          label: 'Refund',
          component: payments.refund,
          subs: [
            { path: '/details', component: payments.refundDetails }, // refund details
          ],
        },
        { path: '/details', component: payments.refundDetails },
        { path: '/paymentAnalytics', label: 'Analytics', component: payments.paymentAnalytics },
      ],
    },
    {
      path: `${appRoot}/riders`,
      exact: true,
      redirect: true,
      to: `${appRoot}/riders/list`,
      label: 'Riders',
      icon: 'car',
      subs: [
        { path: '/list', label: 'List', component: rider.list },
        { path: '/addnew', label: 'Add New', component: rider.addNewRider },
        { path: '/detail', label: 'Detail', component: rider.detail },
        { path: '/allriders', label: 'All Riders', component: rider.allRiders },
      ],
    },
    {
      path: `${appRoot}/trip`,
      exact: true,
      redirect: true,
      to: `${appRoot}/trip/list`,
      label: 'Trip',
      icon: 'pin',
      subs: [
        { path: '/list', label: 'List', component: trip.list },
    
        { path: '/detail', label: 'Detail', component: trip.details },

      ],
    },
    {
      path: `${appRoot}/charge`,
      exact: true,
      redirect: true,
      to: `${appRoot}/delivery/DeliveryCharges`,
      label: 'Charge',
      icon: 'dollar',
      subs: [{ path: '/deliveryCharges', label: 'Delivery', component: delivery.deliveryCharges }],
    },
    {
      path: `${appRoot}/support`,
      exact: true,
      redirect: true,
      to: `${appRoot}/feedbacks`,
      label: 'Support',
      icon: 'headset',
      subs: [
        { path: '/feedbacks', label: 'Feedbacks', component: feedbacks.feedbacks },

        { path: '/detail', label: 'detail', component: feedbacks.detail },
        { path: '/support', label: 'Request', component: feedbacks.support },

        { path: '/resolution', label: 'Resolution', component: feedbacks.resolution },
      ],
    },

    {
      path: `${appRoot}/setting`,
      exact: true,
      redirect: true,
      to: `${appRoot}/setting/admin`,
      label: 'Settings',
      icon: 'gear',
      subs: [
        { path: '/admin', label: 'Admin Profile', component: setting.admin },

        { path: '/notification', label: 'Notifications', component: setting.notification },

        { path: '/resolution', label: 'Configuration', component: setting.configuration },
      ],
    },
    {
      path: `${appRoot}/accounts`,
      exact: true,
      redirect: true,
      to: `${appRoot}/accounts/user`,
      label: 'Accounts',
      icon: 'user',
      subs: [
        { path: '/add', label: 'Add new', component: accounts.addEmployee },
        {
          path: '/employee',
          label: 'Employees',
          component: accounts.employees,
          subs: [
            { path: '/detail', component: accounts.detail }, // refund details
          ],
        },
        { path: '/role', label: 'Role', component: accounts.role },
        { path: '/permission', label: 'Permission', component: accounts.permission },
      ],
    },
    // {
    //   path: `${appRoot}/storefront`,
    //   exact: true,
    //   redirect: true,
    //   to: `${appRoot}/storefront/home`,
    //   label: 'menu.storefront',
    //   icon: 'screen',
    //   subs: [
    //     { path: '/home', label: 'menu.home', component: storefront.home },
    //     { path: '/filters', label: 'menu.filters', component: storefront.filters },
    //     { path: '/categories', label: 'menu.categories', component: storefront.categories },
    //     { path: '/detail', label: 'menu.detail', component: storefront.detail },
    //     { path: '/cart', label: 'menu.cart', component: storefront.cart },
    //     { path: '/checkout', label: 'menu.checkout', component: storefront.checkout },
    //     { path: '/invoice', label: 'menu.invoice', component: storefront.invoice },
    //   ],
    // },
    // {
    //   path: `${appRoot}/shipping`,
    //   component: shipping,
    //   label: 'menu.shipping',
    //   icon: 'shipping',
    // },
    {
      path: `${appRoot}/discount`,
      component: discount,
      label: 'menu.discount',
      icon: 'tag',
    },
    // {
    //   path: `${appRoot}/settings`,
    //   component: settings.home,
    //   label: 'menu.settings',
    //   icon: 'gear',
    //   subs: [{ path: '/general', component: settings.general, hideInMenu: true }],
    // },
    {
      path: `/login`,
      component: logout,
      label: 'Logout',
      icon: 'logout',
    },
  ],
  sidebarItems: [],
};
export default routesAndMenuItems;
