import { Button, Col, Icon, Text } from "native-base";
import * as React from "react";
import { Linking, Platform, ScrollView, View } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import CommonHeader from "~root/Components/CommonHeader/CommonHeader";
import FbIcon from "~root/Components/FbIcon";
import MainContainer from "~root/Components/MainContainer";
import NativeWrapper from "~root/Components/NativeWrapper";
import PermissionComponent from "~root/Components/PermissionComponent/PermissionComponent";
import { OrderTypes } from "~root/Lib/BranchHelper";
import { RootState } from "~root/Reducers";
import { AddressActions } from "~root/Reducers/AddressReducers";
import { BranchDetailsActions } from "~root/Reducers/BranchDetailReducers";
import { PermissionTypes } from "~root/Types/Permissions";
import { SolutionValue } from "~root/Types/Solutions";
import style from "./SolutionsComponentStyle";

interface OwnProps {}

interface StateProps {
  selectedBranch: any;
}

interface DispatchProps {
  setOrderType: (orderType: OrderTypes) => void;
  resetAddress: () => void;
}

interface State {
  expanded: any;
  branchPhoneNumber: string;
}

type Props = OwnProps & StateProps & DispatchProps & NavigationScreenProps;

class SolutionsComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      expanded: [],
      branchPhoneNumber: this.props.selectedBranch.address.phone,
    };
  }

  public setStateIndex = (index: number) => {
    const exp = this.state.expanded;
    exp[index] = !exp[index];
    this.setState({
      expanded: exp,
    });
  };

  public getStateIndexedIcon = (index: number) => (!!this.state.expanded[index] ? "remove" : "md-add");

  public getRender() {
    switch (this.props.route.params?.type) {
      case SolutionValue.InStore:
        return (
          <View style={style.optionView}>
            <Text style={style.optionHeader}>In-store and delivery services</Text>

            <View style={style.listItem}>
              <View>
                <NativeWrapper
                  onPress={() => {
                    this.setStateIndex(0);
                  }}
                  testID="callandCollectNativeWrapper"
                  accessibilityLabel={Platform.select({
                    android: "callandCollectNativeWrapper",
                  })}
                >
                  <View style={style.optionDetailFlex}>
                    <Col style={style.colNameStyle}>
                      <Text style={style.itemName}>Call & collect</Text>
                    </Col>
                    <Col style={style.colIconStyle}>
                      <Icon name={this.getStateIndexedIcon(0)} style={style.iconStyle} />
                    </Col>
                  </View>
                </NativeWrapper>
                {!!this.state.expanded[0] && (
                  <Text style={style.textStyle}>
                    PlaceMakers make it easy for you to save time and money by having your order ready for you when you come in branch. Just call your main
                    branch and order what you need. Once your order is ready, we send you a text with location in our store for you to come and collect. Call us
                    now to place an courier order.
                    {"\n"}
                    <Text
                      style={style.textURLStyle}
                      onPress={() => {
                        Linking.openURL(`tel:${this.state.branchPhoneNumber}`);
                      }}
                      testID="branchPhoneLabel"
                      accessibilityLabel={Platform.select({
                        android: "branchPhoneLabel",
                      })}
                    >
                      {this.state.branchPhoneNumber}
                    </Text>
                  </Text>
                )}
              </View>
              <View>
                <NativeWrapper
                  onPress={() => {
                    this.setStateIndex(1);
                  }}
                  testID="specialOrderTrackingNativeWrapper"
                  accessibilityLabel={Platform.select({
                    android: "specialOrderTrackingNativeWrapper",
                  })}
                >
                  <View style={style.optionDetailFlex}>
                    <Col style={style.colNameStyle}>
                      <Text style={style.itemName}>Special order tracking</Text>
                    </Col>
                    <Col style={style.colIconStyle}>
                      <Icon name={this.getStateIndexedIcon(1)} style={style.iconStyle} />
                    </Col>
                  </View>
                </NativeWrapper>
                {this.state.expanded[1] && (
                  <Text style={style.textStyle}>
                    PlaceMakers making special orders easy - we will let you know when they arrive in store and where it is located with a text message. You can
                    also see the order status live in our App
                  </Text>
                )}
              </View>
              <View>
                <NativeWrapper
                  onPress={() => {
                    this.setStateIndex(2);
                  }}
                  testID="fastCourierServiceNativeWrapper"
                  accessibilityLabel={Platform.select({
                    android: "fastCourierServiceNativeWrapper",
                  })}
                >
                  <View style={style.optionDetailFlex}>
                    <Col style={style.colNameStyle}>
                      <Text style={style.itemName}>Fast courier service</Text>
                    </Col>
                    <Col style={style.colIconStyle}>
                      <Icon name={this.getStateIndexedIcon(2)} style={style.iconStyle} />
                    </Col>
                  </View>
                </NativeWrapper>
                {this.state.expanded[2] && (
                  <View>
                    <Text style={style.textStyle}>
                      Are you running low of some consumables? Are there products that you need fast to continue work on the site? Simply go to "Courier orders"
                      on this app and order the products you need. We have an courier option to get what you need to you in 60 minutes meaning no more lost time
                      or missing people from the job. You can also give your store a call and order your products to be delivered quickly.
                    </Text>
                    <PermissionComponent
                      hideView={true}
                      permissionTypes={[PermissionTypes.PlaceOrders, PermissionTypes.AccountOwner, PermissionTypes.UserAdmin]}
                    >
                      <Text style={style.textStyle}>
                        Create an
                        <Text
                          style={style.textURLStyle}
                          testID="courierOrderNowText"
                          accessibilityLabel={Platform.select({
                            android: "courierOrderNowText",
                          })}
                          onPress={() => {
                            this.props.navigation.pop(1, { immediate: true });
                            this.props.navigation.navigate("OrderSelection");
                            this.props.setOrderType(OrderTypes.EXPRESS);
                            this.props.resetAddress();
                          }}
                        >
                          {" Courier Order "}
                        </Text>
                        now.
                      </Text>
                    </PermissionComponent>
                  </View>
                )}
              </View>
              <View>
                <NativeWrapper
                  onPress={() => {
                    this.setStateIndex(3);
                  }}
                  testID="largeProductDeliveryNativeWrapper"
                  accessibilityLabel={Platform.select({
                    android: "largeProductDeliveryNativeWrapper",
                  })}
                >
                  <View style={style.optionDetailFlex}>
                    <Col style={style.colNameStyle}>
                      <Text style={style.itemName}>Large product delivery</Text>
                    </Col>
                    <Col style={style.colIconStyle}>
                      <Icon name={this.getStateIndexedIcon(3)} style={style.iconStyle} />
                    </Col>
                  </View>
                </NativeWrapper>
                {this.state.expanded[3] && (
                  <View>
                    <Text style={style.textStyle}>
                      Our experts in transport management team are always there to help you with large item deliveries. We can assess your site, offer crane
                      services to unload products at your preferred location. No matter the size of delivery, we deliver accurately, in full and according to
                      the agreement. Tell us your site contact name and number and we will confirm the order, let them know when the truck leaves and they can
                      even track the vehicle live on their phone to ensure no delays on site! Ensure you get the right product, know where the order is at all
                      stages and make date or product changes in our Trade App.
                    </Text>
                  </View>
                )}
              </View>
              <View>
                <NativeWrapper
                  onPress={() => {
                    this.setStateIndex(4);
                  }}
                  testID="absoluteOrderVisibilityNativeWrapper"
                  accessibilityLabel={Platform.select({
                    android: "absoluteOrderVisibilityNativeWrapper",
                  })}
                >
                  <View style={style.optionDetailFlex}>
                    <Col style={style.colNameStyle}>
                      <Text style={style.itemName}>Absolute order visibility</Text>
                    </Col>
                    <Col style={style.colIconStyle}>
                      <Icon name={this.getStateIndexedIcon(4)} style={style.iconStyle} />
                    </Col>
                  </View>
                </NativeWrapper>
                {this.state.expanded[4] && (
                  <View>
                    <Text style={style.textStyle}>
                      Did you know that you can see your order status at every step of the order. From picking to delivery, you can check the status of your
                      orders through the app. Just go to the "Orders" tab in the app and see all your order details. We will also send you notifications if
                      anything changes on your order so you know whats happening at all times.
                    </Text>
                  </View>
                )}
              </View>
              <View>
                <NativeWrapper
                  onPress={() => {
                    this.setStateIndex(5);
                  }}
                  testID="siteServicesNativeWrapper"
                  accessibilityLabel={Platform.select({
                    android: "siteServicesNativeWrapper",
                  })}
                >
                  <View style={style.optionDetailFlex}>
                    <Col style={style.colNameStyle}>
                      <Text style={style.itemName}>Site Services</Text>
                    </Col>
                    <Col style={style.colIconStyle}>
                      <Icon name={this.getStateIndexedIcon(5)} style={style.iconStyle} />
                    </Col>
                  </View>
                </NativeWrapper>
                {this.state.expanded[5] && (
                  <View>
                    <Text style={style.textStyle}>
                      PlaceMakers provides a range of products and services that you can use on site. We have what you need to get your project started and to
                      help you set up a safe working environment from bins to portable toilets, site fencing to containers for storage. Contact you branch for
                      more details.
                      {"\n"}
                      <Text style={style.textSubHeaderStyle}>
                        {"\n"}
                        SAFETY & PERSONAL PROTECTION
                      </Text>
                      {"\n"}
                      PlaceMakers have partnered with some of the market leading suppliers to bring you a full range of safety and protection solutions from PPE
                      through to multi-level scaffolding.
                      {"\n"}
                      <Text style={style.textSubHeaderStyle}>
                        {"\n"}
                        Personal Protection Equipment (PPE)
                      </Text>
                      {"\n"}
                      Personal safety is key, PlaceMakers can help you stay safe with our comprehensive PPE offer which includes everything from head, ear &
                      hand protection to fall protection.
                      {"\n"}
                      <Text style={style.textSubHeaderStyle}>
                        {"\n"}
                        Mobile Scaffolding
                        {"\n"}
                      </Text>
                      Full systems available to suit all applications, the options include mobile scaffolding platforms, quick assembly towers and low level
                      working platforms with safety rails.
                      {"\n"}
                      <Text style={style.textSubHeaderStyle}>
                        {"\n"}
                        Installed Fall Protection Solutions
                      </Text>
                      {"\n"}
                      PlaceMakers have partnered with Fall-Pac to bring you a range of safety solutions that will meet your needs. The Fall-Pac safety solutions
                      are fully installed by a network of qualified installers.
                    </Text>
                  </View>
                )}
              </View>
              <View>
                <NativeWrapper
                  onPress={() => {
                    this.setStateIndex(6);
                  }}
                  testID="storeLayoutNativeWrapper"
                  accessibilityLabel={Platform.select({
                    android: "storeLayoutNativeWrapper",
                  })}
                >
                  <View style={style.optionDetailFlex}>
                    <Col style={style.colNameStyle}>
                      <Text style={style.itemName}>Store Layout dedicated to trade</Text>
                    </Col>
                    <Col style={style.colIconStyle}>
                      <Icon name={this.getStateIndexedIcon(6)} style={style.iconStyle} />
                    </Col>
                  </View>
                </NativeWrapper>
                {this.state.expanded[6] && (
                  <View>
                    <Text style={style.textStyle}>
                      We know your time is valuable, that’s why we configure all our store layouts to be 100% optimised for the trade. With the most
                      knowledgable staff, best drive thrus and under cover timber in NZ, dedicated trade counters to reduce time waiting in line, easy access to
                      everything you need and ensuring we only stock the best trade products, PlaceMakers is the place to come
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        );
      case SolutionValue.BusinessManagement:
        return (
          <View style={style.optionView}>
            <Text style={style.optionHeader}>Business management services</Text>

            <View style={style.listItem}>
              <View>
                <NativeWrapper
                  onPress={() => {
                    this.setStateIndex(0);
                  }}
                  testID="onlineStatementInvoiceNativeWrapper"
                  accessibilityLabel={Platform.select({
                    android: "onlineStatementInvoiceNativeWrapper",
                  })}
                >
                  <View style={style.optionDetailFlex}>
                    <Col style={style.colNameStyle}>
                      <Text style={style.itemName}>Online statement and invoices </Text>
                    </Col>
                    <Col style={style.colIconStyle}>
                      <Icon name={this.getStateIndexedIcon(0)} style={style.iconStyle} />
                    </Col>
                  </View>
                </NativeWrapper>
                {this.state.expanded[0] && (
                  <Text style={style.textStyle}>
                    PlaceMakers Invoices Online (SABER) provides a user friendly site where you can access your invoices/credit notes/statements and extract
                    transactions into your own accounting package. If you use Xero or MYOB, your invoices can automatically be uploaded to your preferred
                    system. Call us now to get setup or login on the link below:
                    {"\n"}
                    <Text
                      style={style.textURLStyle}
                      onPress={() => {
                        Linking.openURL("https://placemakers.saberonline.co.nz/login.aspx");
                      }}
                      testID="saberURLLabel"
                      accessibilityLabel={Platform.select({
                        android: "saberURLLabel",
                      })}
                    >
                      https://placemakers.saberonline.co.nz/login.aspx
                    </Text>
                  </Text>
                )}
              </View>
              <View>
                <NativeWrapper
                  onPress={() => {
                    this.setStateIndex(1);
                  }}
                  testID="getInvoicesDailyNativeWrapper"
                  accessibilityLabel={Platform.select({
                    android: "getInvoicesDailyNativeWrapper",
                  })}
                >
                  <View style={style.optionDetailFlex}>
                    <Col style={style.colNameStyle}>
                      <Text style={style.itemName}>Get your invoices daily, weekly or monthly</Text>
                    </Col>
                    <Col style={style.colIconStyle}>
                      <Icon name={this.getStateIndexedIcon(1)} style={style.iconStyle} />
                    </Col>
                  </View>
                </NativeWrapper>
                {this.state.expanded[1] && (
                  <Text style={style.textStyle}>
                    No matter how you manage your business, you can get your invoices sent to you daily, weekly, or monthly. Simply let our accounts team know
                    how you want them and we will set it all up for you.
                    {"\n"}
                    <Text
                      style={style.textURLStyle}
                      onPress={() => Linking.openURL(`tel:${this.state.branchPhoneNumber}`)}
                      testID="phoneNumber"
                      accessibilityLabel={Platform.select({
                        android: "phoneNumber",
                      })}
                    >
                      {this.state.branchPhoneNumber}
                    </Text>
                  </Text>
                )}
              </View>
              <View>
                <NativeWrapper
                  onPress={() => {
                    this.setStateIndex(2);
                  }}
                  testID="nextminuteAppNativeWrapper"
                  accessibilityLabel={Platform.select({
                    android: "nextminuteAppNativeWrapper",
                  })}
                >
                  <View style={style.optionDetailFlex}>
                    <Col style={style.colNameStyle}>
                      <Text style={style.itemName}>Nextminute App </Text>
                    </Col>
                    <Col style={style.colIconStyle}>
                      <Icon name={this.getStateIndexedIcon(2)} style={style.iconStyle} />
                    </Col>
                  </View>
                </NativeWrapper>
                {this.state.expanded[2] && (
                  <Text style={style.textStyle}>
                    Designed with tradies and field services in mind, the NextMinute App allows you to plan, schedule, communicate, track time, quote, order,
                    monitor and invoice on the go, anytime, through your mobile, tablet or laptop. Checkout
                    <Text
                      style={style.textURLStyle}
                      onPress={() => {
                        Linking.openURL("https://www.placemakers.co.nz/nextminute/");
                      }}
                      testID="nextMinuteURLLabel"
                      accessibilityLabel={Platform.select({
                        android: "nextMinuteURLLabel",
                      })}
                    >
                      {" "}
                      NextMinute
                    </Text>
                    App.
                  </Text>
                )}
              </View>
              <View>
                <NativeWrapper
                  onPress={() => {
                    this.setStateIndex(3);
                  }}
                  testID="hazardoMembershipNativeWrapper"
                  accessibilityLabel={Platform.select({
                    android: "hazardoMembershipNativeWrapper",
                  })}
                >
                  <View style={style.optionDetailFlex}>
                    <Col style={style.colNameStyle}>
                      <Text style={style.itemName}>Hazardco Membership</Text>
                    </Col>
                    <Col style={style.colIconStyle}>
                      <Icon name={this.getStateIndexedIcon(3)} style={style.iconStyle} />
                    </Col>
                  </View>
                </NativeWrapper>
                {this.state.expanded[3] && (
                  <Text style={style.textStyle}>
                    Charge your annual Hazardco membership to your PlaceMakers trade account. Manage your safety on site everyday with HazardCo’s easy to use
                    App. Get all the advice and support you could possibly need on the free 0800 customer service line. Recording your safety is simple – record
                    your site reviews, toolbox meetings and site inductions on your smartphone as you do them.
                  </Text>
                )}
              </View>
              <View>
                <NativeWrapper
                  onPress={() => {
                    this.setStateIndex(4);
                  }}
                  testID="sparkPhoneServiceNativeWrapper"
                  accessibilityLabel={Platform.select({
                    android: "sparkPhoneServiceNativeWrapper",
                  })}
                >
                  <View style={style.optionDetailFlex}>
                    <Col style={style.colNameStyle}>
                      <Text style={style.itemName}>Spark phone service</Text>
                    </Col>
                    <Col style={style.colIconStyle}>
                      <Icon name={this.getStateIndexedIcon(4)} style={style.iconStyle} />
                    </Col>
                  </View>
                </NativeWrapper>
                {this.state.expanded[4] && (
                  <Text style={style.textStyle}>
                    Get the best mobile phone and data deal in NZ through your PlaceMakers team. We will set you up and even put the bill on your trade account
                    to make it easy for you
                  </Text>
                )}
              </View>
            </View>
          </View>
        );
      case SolutionValue.Pricing:
        return (
          <View style={style.optionView}>
            <Text style={style.optionHeader}>Pricing and Estimates</Text>

            <View style={style.listItem}>
              <View>
                <NativeWrapper
                  onPress={() => {
                    this.setStateIndex(0);
                  }}
                  testID="freeEstimatingNativeWrapper"
                  accessibilityLabel={Platform.select({
                    android: "freeEstimatingNativeWrapper",
                  })}
                >
                  <View style={style.optionDetailFlex}>
                    <Col style={style.colNameStyle}>
                      <Text style={style.itemName}>Estimating</Text>
                    </Col>
                    <Col style={style.colIconStyle}>
                      <Icon name={this.getStateIndexedIcon(0)} style={style.iconStyle} />
                    </Col>
                  </View>
                </NativeWrapper>
                {this.state.expanded[0] && (
                  <Text style={style.textStyle}>
                    Small project or product pricing is usually done instore. One of the local team will be more than happy to help work out what you need for
                    the job and then work with you to produce a priced materials estimate.
                    {"\n\n"}
                    Full house, renovation and some commercial project quantification services are provided by our National Estimating Unit (NEU) Simply contact
                    your local branch and one of our account managers will work with you to sort out the rest.
                    {"\n\n"}
                    NEU manages over 20,000 plans annually, providing a centralised hub for quantification and engineered designs they handle all your BOM, FnT
                    and consent documentation needs. NEU staff come from a range of backgrounds and skills and include builders, architects, detailers, quantity
                    surveyors and engineers.
                    {"\n\n"}
                    With the NEU we can provide all schedule and material estimates – from foundations to roofing, and everything in between. Yes, even the
                    kitchen sink.
                    {"\n\n"}
                    <Text style={[style.textURLStyle]} onPress={() => Linking.openURL("https://www.placemakers.co.nz/store-finder/")}>
                      Contact
                    </Text>{" "}
                    your local branch for more information.
                  </Text>
                )}
              </View>
              <View>
                <NativeWrapper
                  onPress={() => {
                    this.setStateIndex(1);
                  }}
                  testID="onlinePricingNativeWrapper"
                  accessibilityLabel={Platform.select({
                    android: "onlinePricingNativeWrapper",
                  })}
                >
                  <View style={style.optionDetailFlex}>
                    <Col style={style.colNameStyle}>
                      <Text style={style.itemName}>Online Pricing (Price IT)</Text>
                    </Col>
                    <Col style={style.colIconStyle}>
                      <Icon name={this.getStateIndexedIcon(1)} style={style.iconStyle} />
                    </Col>
                  </View>
                </NativeWrapper>
                {this.state.expanded[1] && (
                  <Text style={style.textStyle}>
                    Did you know PlaceMakers' PriceIT online provides you with the search for products and retrieve prices and download price lists. This also
                    allows you to build up an estimate for your customer. An easy way to access your price lists and save time by building your estimate and
                    sending them to your customers directly.
                    <Text
                      style={style.textURLStyle}
                      onPress={() => {
                        Linking.openURL("https://placemakerstrade.co.nz/Account/LogOn");
                      }}
                      testID="loginPriceITURLLabel"
                      accessibilityLabel={Platform.select({
                        android: "loginPriceITURLLabel",
                      })}
                    >
                      {" "}
                      Login in to PriceIT
                    </Text>
                    .
                  </Text>
                )}
              </View>
              <View>
                <NativeWrapper
                  onPress={() => {
                    this.setStateIndex(2);
                  }}
                  testID="easyJobManagementNativeWrapper"
                  accessibilityLabel={Platform.select({
                    android: "easyJobManagementNativeWrapper",
                  })}
                >
                  <View style={style.optionDetailFlex}>
                    <Col style={style.colNameStyle}>
                      <Text style={style.itemName}>Easy Job management</Text>
                    </Col>
                    <Col style={style.colIconStyle}>
                      <Icon name={this.getStateIndexedIcon(2)} style={style.iconStyle} />
                    </Col>
                  </View>
                </NativeWrapper>
                {this.state.expanded[2] && (
                  <Text style={style.textStyle}>
                    Do you want to ensure you get the correct price and see cost breakdown for all your material purchases by job? PlaceMakers has the answer -
                    simply talk to the team about using job accounts and after each estimate has been accepted we will do the rest, all you need to do is tell
                    us each time which job the product is for and you will get your monthly statement itemised by job so you can track your spend and easily
                    invoice your client
                  </Text>
                )}
              </View>
            </View>
          </View>
        );
      case SolutionValue.SupportAndApprentice:
        return (
          <View style={style.optionView}>
            <Text style={style.optionHeader}>Support and Apprentice</Text>

            <View style={style.listItem}>
              <View>
                <NativeWrapper
                  onPress={() => {
                    this.setStateIndex(0);
                  }}
                  testID="LBPComplianceNativeWrapper"
                  accessibilityLabel={Platform.select({
                    android: "LBPComplianceNativeWrapper",
                  })}
                >
                  <View style={style.optionDetailFlex}>
                    <Col style={style.colNameStyle}>
                      <Text style={style.itemName}>LBP compliance</Text>
                    </Col>
                    <Col style={style.colIconStyle}>
                      <Icon name={this.getStateIndexedIcon(0)} style={style.iconStyle} />
                    </Col>
                  </View>
                </NativeWrapper>
                {this.state.expanded[0] && (
                  <Text style={style.textStyle}>
                    PlaceMakers customers will be able to earn all their elective points (half the total number for LBPs under the new scheme)* required over a
                    two-year period through PlaceMakers initiatives, such as reading our Under Construction Magazine and attending PlaceMakers Skills
                    Maintenance seminars. We know it’s tough to keep up with all the paperwork required these days, so to give you a hand we’ve produced a
                    triplicate Record of Work book with three copies of the memorandum forms for your job details – one for the homeowner, one for the council
                    and one for you to keep. Each book holds up to 25 jobs with the colour coded forms. Pick one up at your local PlaceMakers branch today!
                    Explore more at
                    <Text
                      style={style.textURLStyle}
                      onPress={() => {
                        Linking.openURL("https://www.placemakers.co.nz/trade/placemakers-skills-maintenance/");
                      }}
                      testID="SupportPlaceMakersSkillURLLabel"
                      accessibilityLabel={Platform.select({
                        android: "SupportPlaceMakersSkillURLLabel",
                      })}
                    >
                      {" "}
                      PlaceMakers Skills Maintenance
                    </Text>
                    .
                  </Text>
                )}
              </View>
              <View>
                <NativeWrapper
                  onPress={() => {
                    this.setStateIndex(1);
                  }}
                  testID="underConstructionNativeWrapper"
                  accessibilityLabel={Platform.select({
                    android: "underConstructionNativeWrapper",
                  })}
                >
                  <View style={style.optionDetailFlex}>
                    <Col style={style.colNameStyle}>
                      <Text style={style.itemName}>Under Construction</Text>
                    </Col>
                    <Col style={style.colIconStyle}>
                      <Icon name={this.getStateIndexedIcon(1)} style={style.iconStyle} />
                    </Col>
                  </View>
                </NativeWrapper>
                {this.state.expanded[1] && (
                  <Text style={style.textStyle}>
                    Stay on top of your field with latest news, technology introduction, and useful articles. Keep your skills sharpen with our short quizzes.
                    Each edition of our trade publication includes specific regulatory or industry articles where you can ‘Prove Your Know How’ by completing a
                    short quiz. For ease of record keeping and as proof of learning, a coupon is included to collate your answers, and sign and date it. Grab a
                    copy at your local branch.
                    <Text
                      style={style.textURLStyle}
                      onPress={() => {
                        Linking.openURL("https://underconstruction.placemakers.co.nz/");
                      }}
                      testID="underConstructionURLLabel"
                      accessibilityLabel={Platform.select({
                        android: "underConstructionURLLabel",
                      })}
                    >
                      {" "}
                      Under Construction Magazine
                    </Text>
                    .
                  </Text>
                )}
              </View>
              <View>
                <NativeWrapper
                  onPress={() => {
                    this.setStateIndex(2);
                  }}
                  testID="apprenticeCrewNativeWrapper"
                  accessibilityLabel={Platform.select({
                    android: "apprenticeCrewNativeWrapper",
                  })}
                >
                  <View style={style.optionDetailFlex}>
                    <Col style={style.colNameStyle}>
                      <Text style={style.itemName}>Apprentice Crew (PAC)</Text>
                    </Col>
                    <Col style={style.colIconStyle}>
                      <Icon name={this.getStateIndexedIcon(2)} style={style.iconStyle} />
                    </Col>
                  </View>
                </NativeWrapper>
                {this.state.expanded[2] && (
                  <Text style={style.textStyle}>
                    We know apprentice life is hard work, because every day throws a new lesson at you. So the team at PlaceMakers have put together a support
                    crew especially for NZ building and construction apprentices: PlaceMakers Apprentice Crew (PAC). As a building and construction apprentice,
                    you'll get access to heaps of perks PAC has lined up, like: freebies, discounts, giveaways, networking opportunities and much more. Plus,
                    our Graduate Toolbox is filled with handy resources for apprentices who have done the hard yards. Explore our
                    <Text
                      style={style.textURLStyle}
                      onPress={() => {
                        Linking.openURL("https://pac.placemakers.co.nz/");
                      }}
                      testID="apprenticeCrewURLLabel"
                      accessibilityLabel={Platform.select({
                        android: "apprenticeCrewURLLabel",
                      })}
                    >
                      {" "}
                      Apprentice Crew Program
                    </Text>
                  </Text>
                )}
              </View>
              <View>
                <NativeWrapper
                  onPress={() => {
                    this.setStateIndex(3);
                  }}
                  testID="skillsMaintenanceNativeWrapper"
                  accessibilityLabel={Platform.select({
                    android: "skillsMaintenanceNativeWrapper",
                  })}
                >
                  <View style={style.optionDetailFlex}>
                    <Col style={style.colNameStyle}>
                      <Text style={style.itemName}>PlaceMakers skills maintenance training seminar</Text>
                    </Col>
                    <Col style={style.colIconStyle}>
                      <Icon name={this.getStateIndexedIcon(3)} style={style.iconStyle} />
                    </Col>
                  </View>
                </NativeWrapper>
                {this.state.expanded[3] && (
                  <Text style={style.textStyle}>
                    Licensed building practitioners and those who have applied for a licence from any licence-class (including sub-trades e.g. Brick & Block
                    Layers/Roofers/Plasterers) can attend. Don’t have a licence yet? If you have applied for your licence or are still thinking about becoming
                    licensed, you are still welcome to attend, however if you want to gain LBP skills maintenance points, you must hold a current licence.{" "}
                    <Text
                      style={style.textURLStyle}
                      onPress={() => {
                        Linking.openURL("https://www.placemakers.co.nz/trade/placemakers-skills-maintenance/");
                      }}
                      testID="placeMakersSkillTrainingURLLabel"
                      accessibilityLabel={Platform.select({
                        android: "placeMakersSkillTrainingURLLabel",
                      })}
                    >
                      {" "}
                      PlaceMakers Skills Maintenance
                    </Text>
                  </Text>
                )}
              </View>
              <View>
                <NativeWrapper
                  onPress={() => {
                    this.setStateIndex(4);
                  }}
                  testID="tradePortalNativeWrapper"
                  accessibilityLabel={Platform.select({
                    android: "tradePortalNativeWrapper",
                  })}
                >
                  <View style={style.optionDetailFlex}>
                    <Col style={style.colNameStyle}>
                      <Text style={style.itemName}>PlaceMakers Trade Portal</Text>
                    </Col>
                    <Col style={style.colIconStyle}>
                      <Icon name={this.getStateIndexedIcon(4)} style={style.iconStyle} />
                    </Col>
                  </View>
                </NativeWrapper>
                {this.state.expanded[4] && (
                  <Text style={style.textStyle}>
                    Sign up to
                    <Text
                      style={style.textURLStyle}
                      onPress={() => {
                        Linking.openURL("https://tradeportal.placemakers.co.nz/");
                      }}
                      testID="placeMakersTradePortalURLLabel"
                      accessibilityLabel={Platform.select({
                        android: "placeMakersTradePortalURLLabel",
                      })}
                    >
                      {" "}
                      PlaceMakers Trade portal
                    </Text>
                    to access everything you need in one place. You will have access to PlaceMakers Invoices Online, all your invoice and statement information
                    past and present. You will also have access to Under Construction Magazine, an easy to read online version of our bi-monthly magazine. You
                    can also store your LBP points to make it easy when it comes to your license renewal. Another benefit of signing up to PlaceMakers Trade
                    portal is PlaceMakers Plus, review your Plus points balances and check out our online shop.
                  </Text>
                )}
              </View>
            </View>
          </View>
        );
      case SolutionValue.Benefits:
        return (
          <View style={style.optionView}>
            <Text style={style.optionHeader}>PlaceMakers benefits and rewards</Text>

            <View style={style.listItem}>
              <View>
                <NativeWrapper
                  onPress={() => {
                    this.setStateIndex(0);
                  }}
                  testID="plusRewardPointsNativeWrapper"
                  accessibilityLabel={Platform.select({
                    android: "plusRewardPointsNativeWrapper",
                  })}
                >
                  <View style={style.optionDetailFlex}>
                    <Col style={style.colNameStyle}>
                      <Text style={style.itemName}>PlaceMakers Plus Reward Points</Text>
                    </Col>
                    <Col style={style.colIconStyle}>
                      <Icon name={this.getStateIndexedIcon(0)} style={style.iconStyle} />
                    </Col>
                  </View>
                </NativeWrapper>
                {this.state.expanded[0] && (
                  <Text style={style.textStyle}>
                    Here at PlaceMakers, we’re proud to be a trusted member of your team. So we’ve made doing business with us even more rewarding. PlaceMakers
                    Plus is exclusively for trade account customers and recognises your loyalty at every level of spend with some truly beaut rewards, from
                    incredible travel opportunities to fantastic lifestyle products. And the more business you put our way, the faster the rewards add up.
                    You’ll earn one Plus Point for every dollar (excl. GST) you spend on your PlaceMakers trade account*. The more you spend, the more your Plus
                    Points add up. Use your Plus Points to enjoy incredible travel opportunities and a huge range of leisure products in our online catalogue.
                    You’ll also be entitled to discounts from our partners.
                    <Text
                      style={style.textURLStyle}
                      onPress={() => {
                        Linking.openURL("https://plus.placemakers.co.nz/");
                      }}
                      testID="joinPlaceMakersPlusURLLabel"
                      accessibilityLabel={Platform.select({
                        android: "joinPlaceMakersPlusURLLabel",
                      })}
                    >
                      Join PlaceMakers Plus
                    </Text>
                    {"\n\n"}*
                    <Text
                      style={style.textURLStyle}
                      onPress={() => {
                        Linking.openURL("https://plus.placemakers.co.nz/terms-and-conditions");
                      }}
                      testID="termsandConditionsURLLabel"
                      accessibilityLabel={Platform.select({
                        android: "termsandConditionsURLLabel",
                      })}
                    >
                      Terms and conditions apply.
                    </Text>
                  </Text>
                )}
              </View>
              <View>
                <NativeWrapper
                  onPress={() => {
                    this.setStateIndex(1);
                  }}
                  testID="trailerHireNativeWrapper"
                  accessibilityLabel={Platform.select({
                    android: "trailerHireNativeWrapper",
                  })}
                >
                  <View style={style.optionDetailFlex}>
                    <Col style={style.colNameStyle}>
                      <Text style={style.itemName}>Free trailer hire</Text>
                    </Col>
                    <Col style={style.colIconStyle}>
                      <Icon name={this.getStateIndexedIcon(1)} style={style.iconStyle} />
                    </Col>
                  </View>
                </NativeWrapper>
                {this.state.expanded[1] && (
                  <Text style={style.textStyle}>Need to borrow a trailer? No problems, just pop into store and grab one today - best of all, its Free!</Text>
                )}
              </View>
              <View>
                <NativeWrapper
                  onPress={() => {
                    this.setStateIndex(3);
                  }}
                  testID="servicePromiseNativeWrapper"
                  accessibilityLabel={Platform.select({
                    android: "servicePromiseNativeWrapper",
                  })}
                >
                  <View style={style.optionDetailFlex}>
                    <Col style={style.colNameStyle}>
                      <Text style={style.itemName}>PlaceMakers Service Promise</Text>
                    </Col>
                    <Col style={style.colIconStyle}>
                      <Icon name={this.getStateIndexedIcon(3)} style={style.iconStyle} />
                    </Col>
                  </View>
                </NativeWrapper>
                {this.state.expanded[3] && (
                  <Text style={style.textStyle}>
                    We promise and we stay true to it. Read our service promises to see how we support you and your business along the way.
                    <Text
                      style={style.textURLStyle}
                      onPress={() => {
                        Linking.openURL("https://www.placemakers.co.nz/trade/service-promise/");
                      }}
                      testID="placeMakersServicePromiseURLLabel"
                      accessibilityLabel={Platform.select({
                        android: "placeMakersServicePromiseURLLabel",
                      })}
                    >
                      PlaceMakers Service Promise
                    </Text>
                  </Text>
                )}
              </View>
            </View>
          </View>
        );
      case SolutionValue.InstalledSolutions:
        return (
          <View style={style.optionView}>
            <Text style={style.optionHeader}>Installed Solutions</Text>

            <View style={style.listItem}>
              <View>
                <NativeWrapper
                  onPress={() => {
                    this.setStateIndex(0);
                  }}
                  testID="installedSolutionsNativeWrapper"
                  accessibilityLabel={Platform.select({
                    android: "installedSolutionsNativeWrapper",
                  })}
                >
                  <View style={style.optionDetailFlex}>
                    <Col style={style.colNameStyle}>
                      <Text style={style.itemName}>Installed Solutions</Text>
                    </Col>
                    <Col style={style.colIconStyle}>
                      <Icon name={this.getStateIndexedIcon(0)} style={style.iconStyle} />
                    </Col>
                  </View>
                </NativeWrapper>
                {this.state.expanded[0] && (
                  <Text style={style.textStyle}>
                    PlaceMakers offer a huge range of installed solutions to save you time and money by taking all the hassle out of organising the jobs. You
                    can be safe in the knowledge that we will always be there to back it up.
                    {"\n"}
                    <Text style={style.textSubHeaderStyle}>
                      {"\n"}
                      What we offer
                    </Text>
                    {"\n"}
                    Frames are clearly marked and stacked in sequence (where ever possible), depending on load efficiency, site requirements and health and
                    safety. Colour coded truss plans matched by truss coding for ease of placement on site. All site plans are weatherproof and sent with a
                    PlaceMakers iconic builder’s pencil. Wall junctions are marked on plates. Galvanised nails to any H3.2 CCA walls. PlaceMakers can supply and
                    fit the MiTek Bowmac STUD-LOK system at the plant to save you time and money fitting stud-straps on site. You’ll have ease of interior and
                    exterior lining due to our consistent timber gauge. We only use stress graded, NZ grown timber from reputable suppliers. All trusses are
                    supported by producer, design and manufacturing statements as required by NZS3604:11. We can provide technical support in detailing. We can
                    take care of anything you need so call us to discuss how we can help.
                    {"\n"}
                    <Text
                      style={style.textURLStyle}
                      onPress={() => {
                        Linking.openURL(`tel:${this.state.branchPhoneNumber}`);
                      }}
                    >
                      {this.state.branchPhoneNumber}
                    </Text>
                    .
                  </Text>
                )}
              </View>
              <View>
                <NativeWrapper
                  onPress={() => {
                    this.setStateIndex(1);
                  }}
                  testID="frameandTrussNativeWrapper"
                  accessibilityLabel={Platform.select({
                    android: "frameandTrussNativeWrapper",
                  })}
                >
                  <View style={style.optionDetailFlex}>
                    <Col style={style.colNameStyle}>
                      <Text style={style.itemName}>Frame and Truss</Text>
                    </Col>
                    <Col style={style.colIconStyle}>
                      <Icon name={this.getStateIndexedIcon(1)} style={style.iconStyle} />
                    </Col>
                  </View>
                </NativeWrapper>
                {this.state.expanded[1] && (
                  <Text style={style.textStyle}>
                    PlaceMakers Frame and Truss delivers you value for money and saves you time on assembly. We deliver your order right first time, on time! We
                    also offer add on services like floor cassettes, Stud Lok screw and HianDri packers fitted to framing with the benefit of time saved on
                    site. Nationally we consume over 122,000 cube of raw product
                  </Text>
                )}
              </View>
              <View>
                <NativeWrapper
                  onPress={() => {
                    this.setStateIndex(2);
                  }}
                  testID="roofingNativeWrapper"
                  accessibilityLabel={Platform.select({
                    android: "roofingNativeWrapper",
                  })}
                >
                  <View style={style.optionDetailFlex}>
                    <Col style={style.colNameStyle}>
                      <Text style={style.itemName}>Roofing</Text>
                    </Col>
                    <Col style={style.colIconStyle}>
                      <Icon name={this.getStateIndexedIcon(2)} style={style.iconStyle} />
                    </Col>
                  </View>
                </NativeWrapper>
                {this.state.expanded[2] && (
                  <Text style={style.textStyle}>
                    PlaceMakers Roofing offer a one-stop shop solution for all long-run roofing requirements. Nationally, we supply and install over 1000 roofs
                    per year!
                  </Text>
                )}
              </View>
              <View>
                <NativeWrapper
                  onPress={() => {
                    this.setStateIndex(3);
                  }}
                  testID="aluminuimJoineryNativeWrapper"
                  accessibilityLabel={Platform.select({
                    android: "aluminuimJoineryNativeWrapper",
                  })}
                >
                  <View style={style.optionDetailFlex}>
                    <Col style={style.colNameStyle}>
                      <Text style={style.itemName}>Aluminuim Joinery</Text>
                    </Col>
                    <Col style={style.colIconStyle}>
                      <Icon name={this.getStateIndexedIcon(3)} style={style.iconStyle} />
                    </Col>
                  </View>
                </NativeWrapper>
                {this.state.expanded[3] && (
                  <Text style={style.textStyle}>
                    PlaceMakers, in partnership with Altus, can offer a range of well-priced aluminium joinery suites to cover all home requirements in the
                    residential and architectural space NOTE: This offer is not available in all regions.
                  </Text>
                )}
              </View>
              <View>
                <NativeWrapper
                  onPress={() => {
                    this.setStateIndex(4);
                  }}
                  testID="garageDoorsNativeWrapper"
                  accessibilityLabel={Platform.select({
                    android: "garageDoorsNativeWrapper",
                  })}
                >
                  <View style={style.optionDetailFlex}>
                    <Col style={style.colNameStyle}>
                      <Text style={style.itemName}>Garage Doors</Text>
                    </Col>
                    <Col style={style.colIconStyle}>
                      <Icon name={this.getStateIndexedIcon(4)} style={style.iconStyle} />
                    </Col>
                  </View>
                </NativeWrapper>
                {this.state.expanded[4] && (
                  <Text style={style.textStyle}>
                    PlaceMakers have partnered with Garador to offer a fully installed Garage Door package. We bring our customers a national one-stop shop for
                    quality garage doors and openers fully installed with a wide range of styles to choose from (entry level through to custom doors). Garador
                    has a network of distributors throughout NZ – they are professional garage door installers.
                  </Text>
                )}
              </View>
              <View>
                <NativeWrapper
                  onPress={() => {
                    this.setStateIndex(5);
                  }}
                  testID="pinkBattsInsulationNativeWrapper"
                  accessibilityLabel={Platform.select({
                    android: "pinkBattsInsulationNativeWrapper",
                  })}
                >
                  <View style={style.optionDetailFlex}>
                    <Col style={style.colNameStyle}>
                      <Text style={style.itemName}>Pink® Batts® Insulation</Text>
                    </Col>
                    <Col style={style.colIconStyle}>
                      <Icon name={this.getStateIndexedIcon(5)} style={style.iconStyle} />
                    </Col>
                  </View>
                </NativeWrapper>
                {this.state.expanded[5] && (
                  <Text style={style.textStyle}>
                    PlaceMakers have partnered with PinkFit® to offer an installed solution for Pink® Batts® and Polyester insulation.
                  </Text>
                )}
              </View>
              <View>
                <NativeWrapper
                  onPress={() => {
                    this.setStateIndex(6);
                  }}
                  testID="electricalNativeWrapper"
                  accessibilityLabel={Platform.select({
                    android: "electricalNativeWrapper",
                  })}
                >
                  <View style={style.optionDetailFlex}>
                    <Col style={style.colNameStyle}>
                      <Text style={style.itemName}>Electrical</Text>
                    </Col>
                    <Col style={style.colIconStyle}>
                      <Icon name={this.getStateIndexedIcon(6)} style={style.iconStyle} />
                    </Col>
                  </View>
                </NativeWrapper>
                {this.state.expanded[6] && (
                  <Text style={style.textStyle}>
                    PlaceMakers have partnered with QC Electrics to offer a range of installed electrical solutions, competitively priced for residential
                    installations. (not in commercial at this time).
                  </Text>
                )}
              </View>
              <View>
                <NativeWrapper
                  onPress={() => {
                    this.setStateIndex(7);
                  }}
                  testID="foundationsNativeWrapper"
                  accessibilityLabel={Platform.select({
                    android: "foundationsNativeWrapper",
                  })}
                >
                  <View style={style.optionDetailFlex}>
                    <Col style={style.colNameStyle}>
                      <Text style={style.itemName}>Foundations</Text>
                    </Col>
                    <Col style={style.colIconStyle}>
                      <Icon name={this.getStateIndexedIcon(7)} style={style.iconStyle} />
                    </Col>
                  </View>
                </NativeWrapper>
                {this.state.expanded[7] && (
                  <Text style={style.textStyle}>
                    PlaceMakers has created partnerships with the best local foundation providers to save you time, hassle and money in this important part of
                    the build. See your local store for more details.
                  </Text>
                )}
              </View>
              <View>
                <NativeWrapper
                  onPress={() => {
                    this.setStateIndex(8);
                  }}
                  testID="landscapingNativeWrapper"
                  accessibilityLabel={Platform.select({
                    android: "landscapingNativeWrapper",
                  })}
                >
                  <View style={style.optionDetailFlex}>
                    <Col style={style.colNameStyle}>
                      <Text style={style.itemName}>Landscaping</Text>
                    </Col>
                    <Col style={style.colIconStyle}>
                      <Icon name={this.getStateIndexedIcon(8)} style={style.iconStyle} />
                    </Col>
                  </View>
                </NativeWrapper>
                {this.state.expanded[8] && (
                  <Text style={style.textStyle}>
                    At PlaceMakers we are well equipped to turn landscaping dreams into reality. We have a comprehensive range of trade quality products and all
                    the tools needed for the job. Give your customers a copy of our Landscaping Catalogue for inspiration and send them into store to view
                    product samples.
                    {"\n"}
                    <Text style={style.boldStyle}>Our large selection of landscaping products include:</Text>
                    {"\n\n"}• Decking – timber & engineered timber.{"\n"}• Paving – drycast, wetcast, natural stone (sandstone and granite) and permeable.{"\n"}
                    • Fencing – timber, aluminium & glass.{"\n"}• Retaining – timber, concrete block & gabion.
                    {"\n"}• Dricon® bagged premixed concretes.{"\n"}• Translucent roofing.{"\n"}• Watering & irrigation.{"\n"}• Artificial Turf.{"\n"}•
                    Accessories – paints, stains & fastenings.{"\n\n"}
                    View our{" "}
                    <Text
                      style={style.textURLStyle}
                      onPress={() => {
                        Linking.openURL("https://www.placemakers.co.nz/landscaping-catalogue/");
                      }}
                      testID="landscapingCatalogueURLLabel"
                      accessibilityLabel={Platform.select({
                        android: "landscapingCatalogueURLLabel",
                      })}
                    >
                      landscaping catalogue
                    </Text>{" "}
                    for more.
                  </Text>
                )}
              </View>
              <View>
                <NativeWrapper
                  onPress={() => {
                    this.setStateIndex(9);
                  }}
                  testID="paintNativeWrapper"
                  accessibilityLabel={Platform.select({
                    android: "paintNativeWrapper",
                  })}
                >
                  <View style={style.optionDetailFlex}>
                    <Col style={style.colNameStyle}>
                      <Text style={style.itemName}>Paint</Text>
                    </Col>
                    <Col style={style.colIconStyle}>
                      <Icon name={this.getStateIndexedIcon(9)} style={style.iconStyle} />
                    </Col>
                  </View>
                </NativeWrapper>
                {this.state.expanded[9] && (
                  <Text style={style.textStyle}>
                    PlaceMakers is a trade paint destination. The Taubmans range is the backbone of our paint offer and has been trade trusted in New Zealand
                    since 1921. Ask in store for our improved trade price list and buy at true trade painter pricing.
                    {"\n"}
                    <Text style={style.textSubHeaderStyle}>
                      {"\n"}
                      TAUBMANS TRADEX
                    </Text>
                    {"\n"}
                    For the trade and commercial applicator the offer is enhanced by the availability of the Tradex range which is used and endorsed by New
                    Zealand Master Painters Association. Prep coats featuring numerous undercoats and primers means you will always have the right product
                    available for the job. Quality and value are the core elements of all Tradex products. Featuring: Easy Sand Sealer Undercoat, Acrylic Primer
                    Undercoat, Freesand Sealer Undercoat, Limeblock, Pigmented Sealer, Oil Based Primer Undercoat, Satin Enamel, High Gloss Enamel, Satin Vinyl,
                    Ceiling Flat, Ceiling Dead Flat
                    {"\n"}
                    <Text style={style.textSubHeaderStyle}>
                      {"\n"}
                      RESENE
                    </Text>
                    {"\n"}
                    Purchase paint from Resene and charge it back to your PlaceMakers Trade Account. Some features include trade discounts and PlaceMakers Plus
                    points. Just call PlaceMakers Telesales for an order number before you head to Resene. Contact your account manager for more information.
                    Offer available to PlaceMakers trade account holders only. Standard PlaceMakers account terms and conditions apply. PlaceMakers Plus terms
                    and conditions apply.
                  </Text>
                )}
              </View>
            </View>
          </View>
        );
      case SolutionValue.InteriorSolutions:
        return (
          <View style={style.optionView}>
            <Text style={style.optionHeader}>Interior solutions</Text>

            <View style={style.listItem}>
              <View>
                <NativeWrapper
                  onPress={() => {
                    this.setStateIndex(0);
                  }}
                  testID="bathroomsNativeWrapper"
                  accessibilityLabel={Platform.select({
                    android: "bathroomsNativeWrapper",
                  })}
                >
                  <View style={style.optionDetailFlex}>
                    <Col style={style.colNameStyle}>
                      <Text style={style.itemName}>Bathrooms</Text>
                    </Col>
                    <Col style={style.colIconStyle}>
                      <Icon name={this.getStateIndexedIcon(0)} style={style.iconStyle} />
                    </Col>
                  </View>
                </NativeWrapper>
                {this.state.expanded[0] && (
                  <Text style={style.textStyle}>
                    PlaceMakers have the brands, styles, sizes and functions to suit your customer’s budget and personality. As well as our exclusive private
                    labels, Raymor and Adesso, our comprehensive range of bathroomware includes many well known New Zealand trusted brands. We tirelessly work
                    to ensure that all our products meet NZ Standards as well as our own exacting requirements. Get your customer to visit their local store for
                    expert advice. Your customers and yourselves can also design a dream bathroom online with the PlaceMakers{" "}
                    <Text
                      style={style.textURLStyle}
                      onPress={() => {
                        Linking.openURL("https://www.placemakers.co.nz/design-planner");
                      }}
                      testID="bathroomDesignPlannerURLLabel"
                      accessibilityLabel={Platform.select({
                        android: "bathroomDesignPlannerURLLabel",
                      })}
                    >
                      Bathroom Design Planner
                    </Text>
                    .
                  </Text>
                )}
              </View>
              <View>
                <NativeWrapper
                  onPress={() => {
                    this.setStateIndex(1);
                  }}
                  testID="kitchensNativeWrapper"
                  accessibilityLabel={Platform.select({
                    android: "kitchensNativeWrapper",
                  })}
                >
                  <View style={style.optionDetailFlex}>
                    <Col style={style.colNameStyle}>
                      <Text style={style.itemName}>Kitchens</Text>
                    </Col>
                    <Col style={style.colIconStyle}>
                      <Icon name={this.getStateIndexedIcon(1)} style={style.iconStyle} />
                    </Col>
                  </View>
                </NativeWrapper>
                {this.state.expanded[1] && (
                  <Text style={style.textStyle}>
                    If your customer is upgrading their existing kitchen or looking for design ideas for their new kitchen, PlaceMakers can help. We have a
                    range of services and information available which can help your customers create their dream kitchen. We also offer great support to
                    builders. Our kitchens are made in New Zealand, offer Hettich soft close drawers and cupboards and come with 15 year warranty on cabinetry.
                    PlaceMakers offers in-store design support for builders and homeowners, just book an appointment with your local store and our designer will
                    work with your requirements to produce a high quality design. Checkout our
                    <Text
                      style={style.textURLStyle}
                      onPress={() => {
                        Linking.openURL("https://www.placemakers.co.nz/products/kitchen/kitchen-range/");
                      }}
                      testID="kitchenRangesURLLabel"
                      accessibilityLabel={Platform.select({
                        android: "kitchenRangesURLLabel",
                      })}
                    >
                      {" "}
                      kitchen ranges
                    </Text>
                    .
                  </Text>
                )}
              </View>
              <View>
                <NativeWrapper
                  onPress={() => {
                    this.setStateIndex(2);
                  }}
                  testID="wardrobesNativeWrapper"
                  accessibilityLabel={Platform.select({
                    android: "wardrobesNativeWrapper",
                  })}
                >
                  <View style={style.optionDetailFlex}>
                    <Col style={style.colNameStyle}>
                      <Text style={style.itemName}>Wardrobes</Text>
                    </Col>
                    <Col style={style.colIconStyle}>
                      <Icon name={this.getStateIndexedIcon(2)} style={style.iconStyle} />
                    </Col>
                  </View>
                </NativeWrapper>
                {this.state.expanded[2] && (
                  <Text style={style.textStyle}>
                    PlaceMakers offers made to order wardrobe organisers and doors with a range of standard size and colour configurations, or designed
                    specifically to meet your customer’s requirements. PlaceMakers can arrange for a measure, design and installation of the wardrobe to suit
                    your customers’ needs and space. Send your customers to your local PlaceMakers branch for more details on how to order a customised wardrobe
                    today. To know more visit
                    <Text
                      style={style.textURLStyle}
                      onPress={() => {
                        Linking.openURL("https://www.placemakers.co.nz/products/wardrobes/");
                      }}
                      testID="placeMakersWardrobesURLLabel"
                      accessibilityLabel={Platform.select({
                        android: "placeMakersWardrobesURLLabel",
                      })}
                    >
                      {" "}
                      PlaceMakers Wardrobes
                    </Text>{" "}
                    on the website or contact your local store.
                  </Text>
                )}
              </View>
              <View>
                <NativeWrapper
                  onPress={() => {
                    this.setStateIndex(3);
                  }}
                  testID="flooringNativeWrapper"
                  accessibilityLabel={Platform.select({
                    android: "flooringNativeWrapper",
                  })}
                >
                  <View style={style.optionDetailFlex}>
                    <Col style={style.colNameStyle}>
                      <Text style={style.itemName}>Flooring</Text>
                    </Col>
                    <Col style={style.colIconStyle}>
                      <Icon name={this.getStateIndexedIcon(3)} style={style.iconStyle} />
                    </Col>
                  </View>
                </NativeWrapper>
                {this.state.expanded[3] && (
                  <Text style={style.textStyle}>
                    PlaceMakers Flooring offers a wide selection of product, whether it’s for a rental property or a luxurious family home. From affordable
                    laminate to premium waterproof flooring or tiles, PlaceMakers can offer our customers a range to suit their budget. New home builds can be
                    easily quoted from the plans, as well as offering simple solutions for renovation customers. We have a range of floating floor options for
                    both residential and commercial jobs. Speak with your local PlaceMakers team to find out the best flooring for your job. Our range is
                    available to view online and in our{" "}
                    <Text
                      style={style.textURLStyle}
                      onPress={() => {
                        Linking.openURL("https://www.placemakers.co.nz/flooring-catalogue/");
                      }}
                      testID="flooringCatalogueURLLabel"
                      accessibilityLabel={Platform.select({
                        android: "flooringCatalogueURLLabel",
                      })}
                    >
                      Flooring catalogue
                    </Text>
                    .
                  </Text>
                )}
              </View>
            </View>
          </View>
        );
    }
  }

  public render() {
    return (
      <MainContainer>
        <CommonHeader
          title={"Solutions"}
          leftItem={
            <Button
              transparent={true}
              onPress={() => this.props.navigation.pop()}
              testID="leftItemBtn"
              accessibilityLabel={Platform.select({ android: "leftItemBtn" })}
            >
              <FbIcon name={"ic_back"} style={style.back} />
            </Button>
          }
        />
        <ScrollView>{this.getRender()}</ScrollView>
      </MainContainer>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  setOrderType: orderType => dispatch(BranchDetailsActions.setOrderType(orderType)),
  resetAddress: () => dispatch(AddressActions.reset()),
});

const mapStateToProps = (state: RootState): StateProps => ({
  selectedBranch: state.branchList.selectedBranch,
});

export default connect(mapStateToProps, mapDispatchToProps)(SolutionsComponent);
