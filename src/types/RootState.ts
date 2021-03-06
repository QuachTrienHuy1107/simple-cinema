import { HomeState } from "app/pages/HomePage/slice/types";
import { CheckoutState } from "app/pages/Checkout/slice/types";
import { MovieDetailState } from "app/pages/MovieDetail/slice/types";
// import { AuthState } from "app/pages/Form/slice/types";
import { UserState } from "app/pages/AdminPage/pages/UserManagement/slice/types";
import { AuthState } from "app/pages/Form/slice/types";
import { MovieManagementState } from "app/pages/AdminPage/pages/MovieManagement/slice/types";
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/*
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
    // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
    user?: UserState;
    movieManagement?: MovieManagementState;
    home?: HomeState;
    checkout?: CheckoutState;
    moviedetail?: MovieDetailState;
    auth?: AuthState;
}
