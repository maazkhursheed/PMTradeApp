import R from "ramda";
import * as React from "react";
import { Image, ImageBackground, Linking, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import styles from "~root/Components/MarketingTileCarouselComponent/MarketingTileStyle";
import AppConfig from "~root/Config/AppConfig";
import { KEY_PARAM_SKU } from "~root/Containers/ProductDetails/ProductDetails";
import { isNotNilOrEmpty } from "~root/Lib/CommonHelper";
import { marketingTileInfoExtractor } from "~root/Lib/DataHelper";
import NavigationService from "~root/Navigation/NavigationService";
import { Metrics } from "~root/Themes";

interface Props {
  marketingTileInfo: any;
}

const onPress = item => {
  if (item.promoType?.toUpperCase() === "OTHER" && isNotNilOrEmpty(item.ctaAction)) {
    Linking.openURL("https://" + item.ctaAction);
  } else if (item.promoType?.toUpperCase() === "COLLECTION" && isNotNilOrEmpty(item.ctaAction)) {
    NavigationService.navigate("OrderProduct", {
      // searchText: ":Sort By:category:CC2",
      categoryId: ":Sort By:category:" + item.ctaAction,
      categoryName: item?.name,
    });
  } else if (item.promoType?.toUpperCase() === "PRODUCT" && isNotNilOrEmpty(item.ctaAction)) {
    NavigationService.navigate("ProductDetails", {
      screen: "MainPDP",
      params: { [KEY_PARAM_SKU]: item.ctaAction },
    });
  }
};

const renderItem = ({ item }) => {
  const imageURL = R.pathOr("", ["backgroundImage", "media", "widescreen", "url"]);
  const iconURL = R.pathOr("", ["tagImage", "media", "url"]);
  const isDarkBackground = item.darkBackground === "true" ? true : false;
  return (
    <TouchableWithoutFeedback onPress={() => onPress(item)}>
      <View style={styles.mainContainer}>
        <ImageBackground source={{ uri: AppConfig.CCV2_ENDPOINT + imageURL(item) }} style={styles.imageBackgroundStyle}>
          <View style={styles.mainTile}>
            {isNotNilOrEmpty(item.tagImage) ? (
              <Image source={{ uri: AppConfig.CCV2_ENDPOINT + iconURL(item) }} width={80} height={24} style={styles.imageView} />
            ) : (
              isNotNilOrEmpty(item.tagText) && <Text style={isDarkBackground ? styles.promotionTextDarkBackground : styles.promotionText}>{item.tagText}</Text>
            )}
            <View>
              {isNotNilOrEmpty(item.mainTitle) && (
                <Text style={isDarkBackground ? styles.mainTextDarkBackground : styles.mainTextLightBackground}>{item.mainTitle}</Text>
              )}
              {isNotNilOrEmpty(item.bodyText) && (
                <Text style={isDarkBackground ? styles.bodyTextDarkBackground : styles.mainTextLightBackground}>{item.bodyText}</Text>
              )}

              {isNotNilOrEmpty(item.footerText) && (
                <Text style={isDarkBackground ? styles.footerTextDarkBackground : styles.footerTextLightBackground}>{item.footerText}</Text>
              )}
            </View>
            {isNotNilOrEmpty(item.ctaText) && (
              <TouchableOpacity style={isDarkBackground ? styles.buttonDarkBackground : styles.buttonLightBackground} onPress={() => onPress(item)}>
                <Text style={isDarkBackground ? styles.buttonTextDarkBackground : styles.buttonTextLightBackground}>{item.ctaText}</Text>
              </TouchableOpacity>
            )}
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const MarketingTileCarousel: React.FC<Props> = ({ marketingTileInfo }: Props) => {
  const [active, setActive] = React.useState(0);
  const data = marketingTileInfoExtractor(marketingTileInfo);
  return (
    <View>
      <Carousel
        useRef={true}
        data={data}
        renderItem={renderItem}
        sliderWidth={Metrics.screenWidth}
        itemWidth={Metrics.screenWidth}
        useScrollView={true}
        loop={true}
        autoplayDelay={6}
        autoplay={true}
        inactiveSlideScale={1}
        swipeThreshold={80}
        onSnapToItem={setActive}
        decelerationRate={1.1}
        autoplayInterval={6000}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={active}
        containerStyle={styles.containerStyle}
        dotStyle={styles.dotStyle}
        inactiveDotStyle={styles.inactiveDotStyle}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
};

export default MarketingTileCarousel;
