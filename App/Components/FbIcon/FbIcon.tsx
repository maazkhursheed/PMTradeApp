import { createIconSetFromFontello } from "react-native-vector-icons";
import fontelloConfig from "./config.json";

const suggestions =
  "ic_picking" ||
  "ic_onitsway" ||
  "ic_packed" ||
  "ic_ontruck" ||
  "ic_tick" ||
  "ic_pending" ||
  "ic_missed" ||
  "ic_uparrow" ||
  "ic_downarrow" ||
  "ic_clear" ||
  "ic_marker" ||
  "ic_show" ||
  "ic_close" ||
  "ic_back" ||
  "ic_filter" ||
  "ic_cart" ||
  "ic_gps" ||
  "ic_location" ||
  "ic_orders" ||
  "ic_express" ||
  "ic_contact" ||
  "ic_solutions" ||
  "btn_add" ||
  "btn_new" ||
  "ic_jobs" ||
  "ic_more" ||
  "ic_consent" ||
  "ic_nomember" ||
  "ic_empty" ||
  "ic_warning" ||
  "ic_lock" ||
  "ic_filter" ||
  "ic_team" ||
  "ic_name" ||
  "ic_show" ||
  "logo" ||
  "ic_delete" ||
  "ic_show" ||
  "ic_right";

const FbIcon = createIconSetFromFontello(fontelloConfig);

export default FbIcon;
