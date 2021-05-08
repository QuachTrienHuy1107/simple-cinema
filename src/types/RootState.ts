import { HomeState } from "app/pages/HomePage/slice/types";
import { CheckoutState } from "app/pages/Checkout/slice/types";
import { MovieDetailState } from "app/pages/MovieDetail/slice/types";
import { AuthState } from "app/pages/Form/slice/types";
import { AdminState } from "app/pages/AdminPage/slice/types";
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/*
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
    // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
    home?: HomeState;
    checkout?: CheckoutState;
    movieDetail?: MovieDetailState;
    auth?: AuthState;
    admin?: AdminState;
}
