import { Dimensions, StyleSheet, Platform, StatusBar } from 'react-native';
import {
  INCLUDE,
  createVariations,
  createSharedStyle,
  inverseColorBrightnessForAmount,
  changeColorAlpha,
  getSizeRelativeToReference,
} from '@shoutem/theme';
import {
  NAVIGATION_HEADER_HEIGHT,
  IPHONE_X_NOTCH_PADDING,
  IPHONE_XR_NOTCH_PADDING,
  IPHONE_X_HOME_INDICATOR_PADDING,
} from './const';
import { Device } from './helpers';

const window = Dimensions.get('window');

const STATUS_BAR_OFFSET =
  Platform.OS === 'android' ? -StatusBar.currentConfig : 0;
export const NAVIGATION_BAR_HEIGHT = Device.select({
  iPhoneX: NAVIGATION_HEADER_HEIGHT + IPHONE_X_NOTCH_PADDING,
  iPhoneXR: NAVIGATION_HEADER_HEIGHT + IPHONE_XR_NOTCH_PADDING,
  default: NAVIGATION_HEADER_HEIGHT,
});

export const sizeVariants = [
  '',
  'left',
  'right',
  'top',
  'bottom',
  'horizontal',
  'vertical',
];
export const textComponents = [
  'shoutem.ui.Heading',
  'shoutem.ui.Title',
  'shoutem.ui.Subtitle',
  'shoutem.ui.Text',
  'shoutem.ui.Caption',
];
export const viewComponents = [
  'shoutem.ui.View',
  'shoutem.ui.Tile',
  'shoutem.ui.Card',
  'shoutem.ui.Row',
];

export function dimensionRelativeToIphone(
  dimension,
  actualRefVal = window.width,
) {
  // 375 is iPhone width
  return getSizeRelativeToReference(dimension, 375, actualRefVal);
}

// 'fontWeight' and 'fontStyle' aren't always supplied for every component, so we're setting default
// values of 'normal'.
export function resolveFontFamily(
  fontName,
  fontWeight = 'normal',
  fontStyle = 'normal',
) {
  if (Platform.OS === 'ios') {
    return fontName;
  }

  // If we receive the fontName as Rubik-Regular, we should only use Rubik.
  const resolvedFontName = fontName.split('-')[0];

  // Currently, Android text will only be bolded for fontWeight 700. Every other (even higher) value
  // will return the default, un-bolded text.
  const isBold = parseInt(fontWeight) >= 700 || fontWeight === 'bold';
  const isItalic = fontStyle === 'italic';

  if (isBold && isItalic) {
    return `${resolvedFontName}-BoldItalic`;
  }

  if (isBold) {
    return `${resolvedFontName}-Bold`;
  }

  if (isItalic) {
    return `${resolvedFontName}-Italic`;
  }

  return `${resolvedFontName}-Regular`;
}

// Currently, resolveFontFamily will provide fontWeight styling, but any value other than 'normal'
// being provided to fontWeight will cause the default system font to be used, so we conditionally
// resolve it.
export function resolveFontWeight(fontWeight) {
  if (Platform.OS === 'ios') {
    return fontWeight;
  }

  return 'normal';
}

// Currently, resolveFontFamily will provide fontStyle styling, but any value other than 'normal'
// being provided to fontStyle will cause the default system font to be used, so we conditionally
// resolve it.
export function resolveFontStyle(fontStyle) {
  if (Platform.OS === 'ios') {
    return fontStyle;
  }

  return 'normal';
}

// This function is deprecated and replaced with calculateLineHeight.
// It remains present here because of the backward compatibility.
export function formatLineHeight(fontSize) {
  // adds required padding to lineHeight to support
  // different alphabets (Kanji, Greek, etc.)

  // eslint-disable-next-line no-console
  console.warn(
    'formatLineHeight is deprecated and will be removed. Please use calculateLineHeight instead, it can simply be renamed as it takes the same argument and returns the same expected value, but more consistently across all fontSize.',
  );

  if (fontSize < 22) {
    // minimum lineHeight for different alphabets is 25
    return 25;
  }

  return fontSize + 3;
}

export function calculateLineHeight(fontSize) {
  return fontSize * 1.5;
}

export const defaultThemeVariables = {
  featuredColor: '#659CEC',
  backgroundColor: '#f2f2f2',
  paperColor: '#FFFFFF',
  shadowColor: 'rgba(0, 0, 0, 0.1)',

  heading: {
    fontFamily: 'Rubik-Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: '#222222',
    fontSize: 25,
  },
  title: {
    fontFamily: 'Rubik-Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 20,
    color: '#222222',
  },
  subtitle: {
    fontFamily: 'Rubik-Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: '#222222',
    fontSize: 15,
  },
  caption: {
    fontFamily: 'Rubik-Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    color: '#666666',
  },
  text: {
    fontFamily: 'Rubik-Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 15,
    color: '#666666',
  },
  links: {
    fontFamily: 'Rubik-Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 15,
    color: '#666666',
  },
  errorText: {
    fontFamily: 'Rubik-Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    color: '#FF0000',
  },

  imageOverlayColor: 'rgba(0, 0, 0, 0.2)',
  imageOverlayTextColor: '#FFFFFF',
  tagOverlayColor: 'rgba(0, 0, 0, 0.7)',
  tagOverlayTextColor: '#FFFFFF',

  statusBarColor: '#000',
  statusBarStyle: 'dark',
  navBarBackground: '#FFFFFF',
  navBarBorderColor: '#f2f2f2',
  navBarText: {
    fontFamily: 'Rubik-Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: '#222222',
    fontSize: 15,
  },
  navBarIconsColor: '#222222',
  featuredNavBarTitleColor: '#ffffff',
  featuredNavBarIconsColor: '#ffffff',

  mainNavBackground: '#FFFFFF',
  mainNavItemColor: 'rgba(50, 50, 50, 0.4)',
  mainNavItemIconColor: 'rgba(50, 50, 50, 0.4)',
  mainNavItemTextColor: 'rgba(50, 50, 50, 0.4)',
  mainNavItemBackground: 'rgba(0, 0, 0, 0)',
  mainNavSelectedItemBackground: '#FFFFFF',
  mainNavSelectedItemColor: '#222222',
  mainNavSelectedItemIconColor: '#222222',
  mainNavSelectedItemTextColor: '#222222',
  mainNavSelectedItemBorderColor: '#659CEC',
  mainNavBorderColor: '#e0e0e0',

  subNavItemColor: '#666666',
  subNavItemBackground: 'rgba(0, 0, 0, 0)',
  subNavListBorderColor: '#e0e0e0',

  primaryButtonText: {
    fontFamily: 'Rubik-Regular',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 12,
    color: '#222222',
  },
  primaryButtonBackgroundColor: '#ffffff',
  primaryButtonBorderColor: '#ffffff',
  secondaryButtonTextColor: '#ffffff',
  secondaryButtonBackgroundColor: '#2c2c2c',
  secondaryButtonBorderColor: '#2c2c2c',

  lineColor: '#e5e5e5',
  sectionHeaderBackgroundColor: '#F2F2F2',
  indicatorColor: '#222222',

  smallGutter: 5,
  mediumGutter: 15,
  largeGutter: 30,
  extraLargeGutter: 45,
  galleryDotSize: 8,
};

export default (variables = defaultThemeVariables) => ({
  //
  // Common
  //
  guttersPadding: {
    ...createVariations(
      '.sm-gutter',
      sizeVariants,
      'padding',
      variables.smallGutter,
    ),
    ...createVariations(
      '.md-gutter',
      sizeVariants,
      'padding',
      variables.mediumGutter,
    ),
    ...createVariations(
      '.lg-gutter',
      sizeVariants,
      'padding',
      variables.largeGutter,
    ),
    ...createVariations(
      '.xl-gutter',
      sizeVariants,
      'padding',
      variables.extraLargeGutter,
    ),
  },

  guttersMargin: {
    ...createVariations(
      '.sm-gutter',
      sizeVariants,
      'margin',
      variables.smallGutter,
    ),
    ...createVariations(
      '.md-gutter',
      sizeVariants,
      'margin',
      variables.mediumGutter,
    ),
    ...createVariations(
      '.lg-gutter',
      sizeVariants,
      'margin',
      variables.largeGutter,
    ),
    ...createVariations(
      '.xl-gutter',
      sizeVariants,
      'margin',
      variables.extraLargeGutter,
    ),
  },

  commonVariants: {
    '.rounded-corners': {
      borderRadius: 2,
      borderWidth: 0,
      borderColor: 'transparent',
    },

    '.flexible': {
      flex: 1,
    },

    '.inflexible': {
      flex: 0,
    },

    '.collapsible': {
      flex: -1,
    },

    '.stretch': {
      alignSelf: 'stretch',
    },

    '.space-between': {
      justifyContent: 'space-between',
    },

    '.space-around': {
      justifyContent: 'space-around',
    },
  },
  alignmentVariants: {
    flexDirection: 'column',
    '.topLeft': {
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    '.topCenter': {
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    '.topRight': {
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
    },
    '.middleLeft': {
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    '.middleCenter': {
      justifyContent: 'center',
      alignItems: 'center',
    },
    '.middleRight': {
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    '.bottomLeft': {
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
    },
    '.bottomCenter': {
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    '.bottomRight': {
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    '.top': {
      justifyContent: 'flex-start',
    },
    '.middle': {
      justifyContent: 'center',
    },
    '.bottom': {
      justifyContent: 'flex-end',
    },
  },

  fillParent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  'fill-parent': {
    '.fill-parent': {
      [INCLUDE]: ['fillParent'],
    },
  },

  dimmedFeaturedBackground: {
    backgroundColor: inverseColorBrightnessForAmount(
      variables.featuredColor,
      5,
    ),
  },

  featuredBackground: {
    backgroundColor: variables.featuredColor,
  },

  imageOverlayText: {
    ...createSharedStyle(textComponents, {
      color: variables.imageOverlayTextColor,
    }),

    'shoutem.ui.Icon': {
      '.indicator': {
        color: variables.imageOverlayTextColor,
      },

      '.scroll-indicator': {
        color: variables.imageOverlayTextColor,
      },

      color: variables.imageOverlayTextColor,
    },
  },

  boldTextStyle: {
    fontWeight: resolveFontWeight('500'),
  },

  italicTextStyle: {
    fontStyle: resolveFontStyle('italic'),
  },

  codeTextStyle: {
    fontFamily: 'Menlo',
  },

  multilineTextStyle: {
    '.v-center': {
      // Compensate for lineHeight, because
      // textAlignVertical is not supported on iOS
      marginTop: -4,
      marginBottom: 4,
    },

    lineHeight: 26,
  },

  text: {
    [INCLUDE]: ['commonVariants', 'guttersMargin'],

    '.line-through': {
      textDecorationLine: 'line-through',
    },

    '.h-left': {
      textAlign: 'left',
    },

    '.h-right': {
      textAlign: 'right',
    },

    '.h-center': {
      textAlign: 'center',
    },

    '.bold': {
      [INCLUDE]: ['boldTextStyle'],
    },

    '.multiline': {
      [INCLUDE]: ['multilineTextStyle'],
    },

    '.muted': {
      opacity: 0.5,
    },

    '.link': {
      ...variables.links,
    },

    backgroundColor: 'transparent',
  },

  'shoutem.ui.Heading': {
    [INCLUDE]: ['text'],

    lineHeight: calculateLineHeight(variables.heading.fontSize),
    ...variables.heading,
    fontFamily: resolveFontFamily(
      variables.heading.fontFamily,
      variables.heading.fontWeight,
      variables.heading.fontStyle,
    ),
    fontWeight: resolveFontWeight(variables.heading.fontWeight),
    fontStyle: resolveFontStyle(variables.heading.fontStyle),
  },

  'shoutem.ui.Title': {
    [INCLUDE]: ['text'],

    lineHeight: calculateLineHeight(variables.title.fontSize),
    ...variables.title,
    fontFamily: resolveFontFamily(
      variables.title.fontFamily,
      variables.title.fontWeight,
      variables.title.fontStyle,
    ),
    fontWeight: resolveFontWeight(variables.title.fontWeight),
    fontStyle: resolveFontStyle(variables.title.fontStyle),
  },

  'shoutem.ui.Subtitle': {
    [INCLUDE]: ['text'],

    lineHeight: calculateLineHeight(variables.subtitle.fontSize),
    ...variables.subtitle,
    fontFamily: resolveFontFamily(
      variables.subtitle.fontFamily,
      variables.subtitle.fontWeight,
      variables.subtitle.fontStyle,
    ),
    fontWeight: resolveFontWeight(variables.subtitle.fontWeight),
    fontStyle: resolveFontStyle(variables.subtitle.fontStyle),
  },

  'shoutem.ui.Caption': {
    [INCLUDE]: ['text'],

    lineHeight: calculateLineHeight(variables.caption.fontSize),
    letterSpacing: 0.5,
    ...variables.caption,
    fontFamily: resolveFontFamily(
      variables.caption.fontFamily,
      variables.caption.fontWeight,
      variables.caption.fontStyle,
    ),
    fontWeight: resolveFontWeight(variables.caption.fontWeight),
    fontStyle: resolveFontStyle(variables.caption.fontStyle),

    '.form-error': {
      color: variables.errorText.color,
      fontFamily: resolveFontFamily(
        variables.errorText.fontFamily,
        variables.errorText.fontWeight,
        variables.errorText.fontStyle,
      ),
      fontSize: variables.errorText.fontSize,
      fontStyle: resolveFontStyle(variables.errorText.fontStyle),
      fontWeight: resolveFontWeight(variables.errorText.fontWeight),
      lineHeight: calculateLineHeight(variables.errorText.fontSize),
    },
  },

  'shoutem.ui.Text': {
    [INCLUDE]: ['text'],

    ...variables.text,
    fontFamily: resolveFontFamily(
      variables.text.fontFamily,
      variables.text.fontWeight,
      variables.text.fontStyle,
    ),
    fontWeight: resolveFontWeight(variables.text.fontWeight),
    fontStyle: resolveFontStyle(variables.text.fontStyle),
  },

  //
  // Indicators
  //
  indicator: {
    color: variables.text.color,
  },

  //
  // Images
  //
  imageSizes: {
    // NOTE: '-avatar' styles do not work with ImageBackground
    '.small-avatar': {
      width: dimensionRelativeToIphone(25),
      height: dimensionRelativeToIphone(25),
      borderRadius: 12.5,
      borderWidth: 0,
    },

    '.small': {
      width: dimensionRelativeToIphone(65),
      height: dimensionRelativeToIphone(65),
    },

    '.medium-avatar': {
      width: dimensionRelativeToIphone(145),
      height: dimensionRelativeToIphone(145),
      borderRadius: dimensionRelativeToIphone(72.5),
      borderWidth: 0,
    },

    '.medium': {
      width: dimensionRelativeToIphone(145),
      height: dimensionRelativeToIphone(92),
    },

    '.medium-wide': {
      width: dimensionRelativeToIphone(180),
      height: dimensionRelativeToIphone(85),
    },

    '.medium-portrait': {
      width: dimensionRelativeToIphone(209),
      height: dimensionRelativeToIphone(139),
    },

    '.medium-square': {
      width: dimensionRelativeToIphone(145),
      height: dimensionRelativeToIphone(145),
    },

    // NOTE: Image resizing doesn't work correctly if both
    // dimensions are not explicitly defined, so we can't
    // use flex: 1, or alignSelf: 'stretch' here...
    '.featured': {
      width: dimensionRelativeToIphone(365),
      height: dimensionRelativeToIphone(345),
    },

    '.large': {
      width: window.width,
      height: dimensionRelativeToIphone(280),
    },

    '.large-portrait': {
      width: window.width,
      height: dimensionRelativeToIphone(518),
    },

    '.large-banner': {
      width: window.width,
      height: dimensionRelativeToIphone(200),
    },

    '.large-square': {
      width: window.width,
      height: window.width,
    },

    '.large-wide': {
      width: window.width,
      height: dimensionRelativeToIphone(238),
    },

    '.large-ultra-wide': {
      width: window.width,
      height: dimensionRelativeToIphone(130),
    },
  },
  'shoutem.ui.Image': {
    [INCLUDE]: ['commonVariants', 'imageSizes', 'fill-parent', 'guttersMargin'],

    '.placeholder': {
      backgroundColor: inverseColorBrightnessForAmount(
        variables.paperColor,
        10,
      ),
    },

    heroAnimation(driver, { layout }) {
      return {
        transform: [
          {
            scale: driver.interpolate({
              inputRange: [-0.9 * layout.height, 0],
              outputRange: [3, 1],
              extrapolateRight: 'clamp',
              useNativeDriver: true,
            }),
          },
          {
            translateY: driver.interpolate({
              inputRange: [-100, 100],
              outputRange: [-50, 50],
              extrapolateLeft: 'clamp',
              useNativeDriver: true,
            }),
          },
        ],
      };
    },
  },
  'shoutem.ui.ImageBackground': {
    [INCLUDE]: ['commonVariants', 'imageSizes', 'fill-parent', 'guttersMargin'],

    '.overflow-hidden': {
      overflow: 'hidden',
    },

    '.placeholder': {
      backgroundColor: inverseColorBrightnessForAmount(
        variables.paperColor,
        10,
      ),

      'shoutem.ui.Icon': {
        color: inverseColorBrightnessForAmount(variables.paperColor, 30),
      },
    },

    'shoutem.ui.Tile': {
      [INCLUDE]: ['textCentricTile', 'fillParent', 'imageOverlayText'],

      'shoutem.ui.Button': {
        '.clear': {
          [INCLUDE]: ['imageOverlayText'],
        },
      },

      backgroundColor: variables.imageOverlayColor,
    },

    heroAnimation(driver, { layout }) {
      return {
        transform: [
          {
            scale: driver.interpolate({
              inputRange: [-0.9 * layout.height, 0],
              outputRange: [3, 1],
              extrapolateRight: 'clamp',
              useNativeDriver: true,
            }),
          },
          {
            translateY: driver.interpolate({
              inputRange: [-100, 100],
              outputRange: [-50, 50],
              extrapolateLeft: 'clamp',
              useNativeDriver: true,
            }),
          },
        ],
      };
    },

    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  //
  // Containers
  //
  verticalFlexAlignment: {
    '.h-center': {
      alignItems: 'center',
    },

    '.h-start': {
      alignItems: 'flex-start',
    },

    '.h-end': {
      alignItems: 'flex-end',
    },

    '.v-center': {
      justifyContent: 'center',
    },

    '.v-start': {
      justifyContent: 'flex-start',
    },

    '.v-end': {
      justifyContent: 'flex-end',
    },
  },
  horizontalFlexAlignment: {
    '.h-center': {
      justifyContent: 'center',
    },

    '.h-start': {
      justifyContent: 'flex-start',
    },

    '.h-end': {
      justifyContent: 'flex-end',
    },

    '.v-center': {
      alignItems: 'center',
    },

    '.v-start': {
      alignItems: 'flex-start',
    },

    '.v-end': {
      alignItems: 'flex-end',
    },
  },
  'shoutem.ui.View': {
    [INCLUDE]: ['commonVariants', 'guttersPadding'],

    '.horizontal': {
      [INCLUDE]: ['horizontalFlexAlignment'],
      flexDirection: 'row',
      alignItems: 'flex-end',
    },

    '.vertical': {
      [INCLUDE]: ['verticalFlexAlignment'],
      flexDirection: 'column',
    },

    '.fill-parent': {
      [INCLUDE]: ['fillParent'],
    },

    '.overlay': {
      backgroundColor: variables.imageOverlayColor,
    },

    '.overlay-bottom': {
      height: 25,
      bottom: 0,
      left: 0,
      position: 'absolute',
      right: 0,
    },

    // Should deprecate in the future and use the paper
    // styleName instead to keep it consistent
    '.solid': {
      backgroundColor: variables.paperColor,
    },

    '.paper': {
      backgroundColor: variables.paperColor,
    },

    '.wrap': {
      flexWrap: 'wrap',
    },

    '.dimmed': {
      '.featured': {
        [INCLUDE]: ['dimmedFeaturedBackground'],
      },
    },

    '.muted': {
      opacity: 0.3,
    },

    '.featured': {
      [INCLUDE]: ['featuredBackground'],
    },

    '.center': {
      alignSelf: 'center',
    },

    '.badge': {
      alignItems: 'center',
      backgroundColor: variables.navBarIconsColor,
      borderColor: variables.navBarBackground,
      borderRadius: 8,
      borderWidth: 2,
      height: 16,
      justifyContent: 'center',
      position: 'absolute',
      width: 16,

      'shoutem.ui.Text': {
        color: variables.navBarBackground,
        fontSize: 9,
        fontWeight: 'bold',
        textAlign: 'center',
      },
    },

    '.oval-highlight': {
      alignItems: 'center',
      backgroundColor: changeColorAlpha('#030303', 0.1),
      borderRadius: 31,
      height: 62,
      justifyContent: 'center',
      width: 62,
    },
  },

  'shoutem.ui.Screen': {
    '.full-screen': {
      marginTop: -(NAVIGATION_BAR_HEIGHT + StyleSheet.hairlineWidth),
    },

    '.paper': {
      backgroundColor: variables.paperColor,
    },

    '.with-notch-padding': {
      paddingBottom: Device.select({
        iPhoneX: IPHONE_X_HOME_INDICATOR_PADDING,
        iPhoneXR: IPHONE_X_HOME_INDICATOR_PADDING,
        default: 0,
      }),
    },

    'shoutem.ui.ListView': {
      listContent: {
        paddingBottom: Device.select({
          iPhoneX: IPHONE_X_HOME_INDICATOR_PADDING,
          iPhoneXR: IPHONE_X_HOME_INDICATOR_PADDING,
          default: 0,
        }),
      },
    },

    backgroundColor: variables.backgroundColor,
    flex: 1,
  },

  'shoutem.ui.Row': {
    ...createSharedStyle(textComponents, { flex: 1 }),

    'shoutem.ui.Image': {
      marginRight: variables.mediumGutter,
    },

    'shoutem.ui.Icon': {
      '.disclosure': {
        opacity: 0.5,
        marginRight: -7,
        marginLeft: 4,
      },

      marginRight: variables.mediumGutter,
    },

    'shoutem.ui.Button': {
      '.right-icon': {
        [INCLUDE]: ['tightButton', 'clearButton'],
        marginLeft: variables.mediumGutter,
      },
    },

    'shoutem.ui.View': {
      '.notification-dot': {
        alignSelf: 'center',
        flex: 0,
        width: 6,
        height: 6,
        borderRadius: 3,
        borderColor: variables.indicatorColor,
        backgroundColor: variables.indicatorColor,
        marginLeft: -10,
        marginRight: 4,
      },

      '.vertical': {
        '*': {
          // Add a small gutter below each view
          marginBottom: variables.smallGutter,
        },

        // Compensate for the last view
        marginBottom: -variables.smallGutter,
      },

      flex: 1,
    },

    '*.top': {
      alignSelf: 'flex-start',
    },

    '.small': {
      height: 65,
      paddingVertical: 0,
    },

    flexGrow: 1,
    flexShrink: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: variables.paperColor,
    paddingHorizontal: variables.mediumGutter,
    paddingVertical: variables.mediumGutter,
  },

  textCentricTile: {
    'shoutem.ui.View': {
      '.actions': {
        position: 'absolute',
        top: variables.mediumGutter,
        right: variables.mediumGutter,
      },
    },

    '*': {
      marginBottom: variables.smallGutter,
    },

    ...createSharedStyle(textComponents, {
      textAlign: 'center',
      alignSelf: 'stretch',
    }),

    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
    paddingTop: variables.extraLargeGutter,
    paddingBottom: variables.extraLargeGutter - variables.smallGutter,
  },

  'shoutem.ui.Tile': {
    [INCLUDE]: ['commonVariants', 'guttersPadding'],

    'shoutem.ui.View': {
      '.content': {
        '*': {
          marginBottom: variables.mediumGutter - variables.smallGutter,
        },

        alignSelf: 'stretch',
        paddingTop: variables.mediumGutter,
        paddingBottom: variables.smallGutter,
        paddingHorizontal: variables.mediumGutter,
      },
    },

    '.clear': {
      backgroundColor: 'transparent',
    },

    '.small': {
      'shoutem.ui.View': {
        '.content': {
          '*': {
            marginBottom: variables.smallGutter,
          },

          alignSelf: 'stretch',
          paddingTop: variables.mediumGutter,
          paddingBottom: 0,
          paddingHorizontal: 0,
          marginBottom: -variables.smallGutter,
        },
      },

      width: 145,
    },

    '.text-centric': {
      [INCLUDE]: ['textCentricTile'],
    },

    heroAnimation(driver, { layout }) {
      return {
        opacity: driver.interpolate({
          inputRange: [-0.2 * layout.height, 0, layout.height],
          outputRange: [0, 1, 0],
          useNativeDriver: true,
        }),
        transform: [
          {
            translateY: driver.interpolate({
              inputRange: [-100, 100],
              outputRange: [20, -20],
              useNativeDriver: true,
            }),
          },
        ],
      };
    },

    flex: -1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: variables.paperColor,
  },

  'shoutem.ui.Card': {
    [INCLUDE]: ['commonVariants'],

    'shoutem.ui.View': {
      '.content': {
        'shoutem.ui.Subtitle': {
          marginBottom: 10,
        },
      },

      flex: 1,
      alignSelf: 'stretch',
      padding: 10,
      backgroundColor: variables.paperColor,
    },

    width: dimensionRelativeToIphone(180),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: variables.paperColor,
    borderRadius: 2,
    shadowColor: variables.shadowColor,
    shadowOpacity: 0.1,
    shadowOffset: { width: 1, height: 1 },

    '.horizontal': {
      'shoutem.ui.View': {
        '.pull-left': {
          marginVertical: variables.mediumGutter,
          marginLeft: -dimensionRelativeToIphone(72),
        },
      },

      // width needs to be reset so alignSelf stretch could be applied
      width: null,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      margin: 10,
      marginTop: variables.smallGutter,
      marginBottom: variables.smallGutter,
    },
  },

  'shoutem.ui.Overlay': {
    [INCLUDE]: ['guttersPadding'],

    ...createSharedStyle([...textComponents, 'shoutem.ui.Icon'], {
      textAlign: 'center',
      color: variables.tagOverlayTextColor,
    }),

    ...createSharedStyle(viewComponents, {
      ...createSharedStyle([...textComponents, 'shoutem.ui.Icon'], {
        textAlign: 'center',
        color: variables.tagOverlayTextColor,
      }),
    }),

    '.image-overlay': {
      ...createSharedStyle([...textComponents, 'shoutem.ui.Icon'], {
        color: variables.imageOverlayTextColor,
      }),

      backgroundColor: changeColorAlpha(variables.imageOverlayColor, 0.5),
    },

    '.rounded-small': {
      width: 38,
      height: 38,
      borderRadius: 19,
      padding: 0,
    },

    '.fill-parent': {
      [INCLUDE]: ['fillParent'],
    },

    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 2 * variables.smallGutter,
    paddingBottom: 2 * variables.smallGutter,
    paddingHorizontal: variables.mediumGutter,
    backgroundColor: variables.tagOverlayColor,
  },

  //
  // Buttons
  //
  'shoutem.ui.TouchableOpacity': {
    [INCLUDE]: [
      'commonVariants',
      'guttersPadding',
      'horizontalFlexAlignment',
      'verticalFlexAlignment',
    ],

    activeOpacity: 0.8,
  },

  'shoutem.ui.TouchableNativeFeedback': {
    [INCLUDE]: ['commonVariants'],
  },

  'shoutem.ui.Touchable': {},

  tightButton: {
    'shoutem.ui.Icon': {
      marginRight: 0,
    },

    'shoutem.ui.Text': {
      marginRight: 0,
    },

    'shoutem.ui.View': {
      '.badge': {
        top: -4,
        right: -4,
      },
    },

    paddingLeft: 0,
    paddingRight: 0,
  },

  clearButton: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderRadius: 0,
  },

  textualButton: {
    'shoutem.ui.Text': {
      // Inherit color
      ...variables.text,
      fontFamily: resolveFontFamily(
        variables.text.fontFamily,
        variables.text.fontWeight,
        variables.text.fontStyle,
      ),
      fontWeight: resolveFontWeight(variables.text.fontWeight),
      fontStyle: resolveFontStyle(variables.text.fontStyle),
    },

    'shoutem.ui.Icon': {
      color: variables.text.color,
    },
  },

  'shoutem.ui.Button': {
    [INCLUDE]: ['commonVariants', 'guttersMargin'],

    '.tight': {
      [INCLUDE]: ['tightButton'],
    },

    '.clear': {
      [INCLUDE]: ['clearButton'],
    },

    '.textual': {
      // Use default text as button text style
      // Text like button, without background color and margins
      [INCLUDE]: ['textualButton', 'clearButton', 'tightButton'],
    },

    '.secondary': {
      'shoutem.ui.Icon': {
        color: variables.secondaryButtonTextColor,
      },

      'shoutem.ui.Text': {
        color: variables.secondaryButtonTextColor,
      },

      backgroundColor: variables.secondaryButtonBackgroundColor,
      borderColor: variables.secondaryButtonBorderColor,
    },

    '.muted': {
      'shoutem.ui.Icon': {
        opacity: 0.5,
      },

      'shoutem.ui.Text': {
        opacity: 0.5,
      },
    },

    // Buttons at the bottom of dialogs, widgets, etc.,
    // usually Cancel/Confirm, No/Yes, etc.
    '.confirmation': {
      'shoutem.ui.Text': {
        [INCLUDE]: ['boldTextStyle'],
      },

      // Medium gutter on both sides, 25 between buttons
      flex: 1,
      marginHorizontal: variables.mediumGutter,
    },

    '.full-width': {
      'shoutem.ui.Icon': {
        width: 16,
        height: 16,
      },

      flex: 1,
      alignSelf: 'stretch',
      borderRadius: 0,
      borderWidth: 0,
      height: 55,
    },

    // Vertically stacked icon and text
    '.stacked': {
      'shoutem.ui.Icon': {
        marginVertical: variables.mediumGutter,
        marginRight: 0,
      },

      'shoutem.ui.Text': {
        [INCLUDE]: ['boldTextStyle'],
        textAlign: 'center',
        marginVertical: 0,
        marginRight: 0,
        fontFamily: 'Rubik-Medium',
      },

      width: dimensionRelativeToIphone(120),
      height: 82,
      flexDirection: 'column',
    },

    'shoutem.ui.Text': {
      ...variables.primaryButtonText,
      fontFamily: resolveFontFamily(
        variables.primaryButtonText.fontFamily,
        variables.primaryButtonText.fontWeight,
        variables.primaryButtonText.fontStyle,
      ),
      fontWeight: resolveFontWeight(variables.primaryButtonText.fontWeight),
      fontStyle: resolveFontStyle(variables.primaryButtonText.fontStyle),
      letterSpacing: 1,
      marginVertical: 12,
      marginRight: 10,
    },

    'shoutem.ui.Icon': {
      color: variables.primaryButtonText.color,
      width: 24,
      height: 24,
      marginRight: 10,
    },

    'shoutem.ui.View': {
      // Positions badge to top right of button icon
      '.badge': {
        top: -4,
        right: 11,
      },
    },

    underlayColor: changeColorAlpha(
      variables.primaryButtonBackgroundColor,
      0.5,
    ),

    backgroundColor: variables.primaryButtonBackgroundColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: variables.primaryButtonBorderColor,
    paddingLeft: variables.mediumGutter,
    paddingRight: variables.smallGutter,
  },

  //
  // Media
  //
  'shoutem.ui.Icon': {
    '.indicator': {
      [INCLUDE]: ['indicator'],
    },

    '.scroll-indicator': {
      [INCLUDE]: ['indicator'],
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: variables.mediumGutter,
    },

    backgroundColor: 'transparent',
    color: variables.primaryButtonText.color,
    width: 24,
    height: 24,
  },

  'shoutem.ui.Spinner': {
    [INCLUDE]: ['guttersMargin'],
    color: changeColorAlpha(variables.text.color, 0.5),
  },

  'shoutem.ui.EmptyListImage': {
    image: {
      resizeMode: 'contain',
      marginTop: 45,
      marginBottom: 30,
    },
    title: {
      maxWidth: 250,
      marginBottom: 20,
      textAlign: 'center',
    },
    message: {
      textAlign: 'center',
      maxWidth: 250,
    },
  },

  //
  // Collections
  //
  'shoutem.ui.ListView': {
    'shoutem.ui.Divider': {
      [INCLUDE]: ['sectionHeaderDivider'],

      borderTopWidth: 0,
    },

    listContent: {
      paddingBottom: 0,
      backgroundColor: variables.backgroundColor,
    },

    refreshControl: {
      tintColor: changeColorAlpha(variables.text.color, 0.5),
    },

    loadMoreSpinner: {
      paddingVertical: 25,
    },
  },

  'shoutem.ui.GridRow': {
    '*': {
      flex: 1,
      alignSelf: 'stretch',
      marginLeft: variables.smallGutter,
      marginRight: 0,
      marginTop: 0,
      marginBottom: 0,
    },

    '.no-padding': {
      padding: 0,
    },

    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingRight: variables.smallGutter,
    paddingTop: variables.smallGutter,
  },

  //
  // Other
  //
  navigationBar: {
    '.featured': {
      'shoutem.ui.Button': {
        'shoutem.ui.Icon': {
          color: variables.featuredNavBarIconsColor,
        },
        'shoutem.ui.Text': {
          color: variables.featuredNavBarIconsColor,
        },

        'shoutem.ui.View': {
          '.badge': {
            backgroundColor: variables.featuredNavBarIconsColor,
            borderColor: variables.featuredColor,

            'shoutem.ui.Text': {
              color: variables.featuredColor,
            },
          },
        },
      },

      'shoutem.ui.DropDownMenu': {
        selectedOption: {
          'shoutem.ui.Icon': {
            color: variables.featuredNavBarIconsColor,
          },
          'shoutem.ui.Text': {
            color: variables.featuredNavBarIconsColor,
          },
        },
      },

      ...createSharedStyle(
        ['shoutem.ui.Title', 'shoutem.ui.Icon', 'shoutem.ui.Text'],
        {
          fontFamily: resolveFontFamily(
            variables.title.fontFamily,
            variables.title.fontWeight,
            variables.title.fontStyle,
          ),
          fontWeight: resolveFontWeight(variables.title.fontWeight),
          fontStyle: resolveFontStyle(variables.title.fontStyle),
          color: variables.featuredNavBarTitleColor,
        },
      ),

      container: {
        [INCLUDE]: ['featuredBackground'],
        borderBottomWidth: 0,
      },
    },

    'shoutem.ui.Icon': {
      color: variables.navBarIconsColor,
      width: 24,
      height: 24,
      paddingHorizontal: 9,
    },

    'shoutem.ui.Text': {
      ...variables.navBarText,
      fontFamily: resolveFontFamily(
        variables.navBarText.fontFamily,
        variables.navBarText.fontWeight,
        variables.navBarText.fontStyle,
      ),
      fontWeight: resolveFontWeight(variables.navBarText.fontWeight),
      fontStyle: resolveFontStyle(variables.navBarText.fontStyle),
      paddingHorizontal: 9,
    },

    'shoutem.ui.ShareButton': {
      '.clear': {
        'shoutem.ui.Button': {
          [INCLUDE]: ['clearButton'],
        },
      },
    },

    'shoutem.ui.Button': {
      [INCLUDE]: ['clearButton', 'tightButton'],
      'shoutem.ui.Icon': {
        color: variables.navBarIconsColor,
        marginVertical: 9,
      },
      'shoutem.ui.Text': {
        ...variables.navBarText,
        fontFamily: resolveFontFamily(
          variables.navBarText.fontFamily,
          'normal',
          variables.navBarText.fontStyle,
        ),
        fontWeight: resolveFontWeight('normal'),
        fontStyle: resolveFontStyle(variables.navBarText.fontStyle),
        color: variables.navBarIconsColor,
        letterSpacing: 0,
      },
      'shoutem.ui.View': {
        '.badge': {
          top: 5,
          right: 5,
        },
      },
      paddingHorizontal: 9,
    },
  },

  'shoutem.ui.NavigationBar': {
    title: {
      color: variables.navBarText.color,
      lineHeight: calculateLineHeight(variables.navBarText.fontSize),
      ...variables.navBarText,
      fontFamily: resolveFontFamily(
        variables.navBarText.fontFamily,
        variables.navBarText.fontWeight,
        variables.navBarText.fontStyle,
      ),
      fontWeight: resolveFontWeight(variables.navBarText.fontWeight),
      fontStyle: resolveFontStyle(variables.navBarText.fontStyle),
    },
    icon: {
      color: variables.navBarIconsColor,
    },
    statusBar: {
      backgroundColor: variables.statusBarColor,
      statusBarStyle: variables.statusBarStyle,
    },
    container: {
      backgroundColor: variables.navBarBackground,
      borderBottomColor: variables.navBarBorderColor,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    leftContainer: {
      paddingLeft: variables.mediumGutter,
    },
    rightContainer: {
      paddingRight: variables.mediumGutter,
    },

    '.clear': {
      container: {
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent',
      },
    },

    '.featured': {
      title: {
        color: variables.featuredNavBarTitleColor,
      },
      icon: {
        color: variables.featuredNavBarIconsColor,
      },

      container: {
        backgroundColor: variables.featuredColor,
        borderBottomWidth: 0,
        shadowOpacity: 0,
      },
    },

    '.no-border': {
      container: {
        borderBottomWidth: 0,
        shadowOpacity: 0,
      },
    },

    boxingAnimation(driver) {
      return {
        container: {
          borderBottomColor: driver.interpolate({
            // Animate to approx title top offset
            inputRange: [0, 45],
            outputRange: ['transparent', variables.navBarBorderColor],
            extrapolate: 'clamp',
          }),
          borderBottomWidth: 1,
        },
        title: {
          opacity: driver.interpolate({
            inputRange: [250, 300],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          }),
        },
      };
    },

    solidifyAnimation(driver) {
      return {
        icon: {
          opacity: driver.interpolate({
            inputRange: [250, 300],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          }),
        },
        title: {
          color: driver.interpolate({
            inputRange: [250, 300],
            outputRange: ['transparent', variables.navBarText.color],
            extrapolate: 'clamp',
          }),
        },
        container: {
          backgroundColor: driver.interpolate({
            inputRange: [250, 300],
            outputRange: ['transparent', variables.navBarBackground],
            extrapolate: 'clamp',
          }),
          borderBottomColor: driver.interpolate({
            inputRange: [250, 300],
            outputRange: ['transparent', variables.navBarBorderColor],
            extrapolate: 'clamp',
          }),
          opacity: driver.interpolate({
            inputRange: [250, 300],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          }),
        },
      };
    },

    fadeAnimation(driver) {
      return {
        container: {
          gradient: {
            colors: ['transparent', 'rgba(0, 0, 0, 0.5)', 'transparent'],
            locations: [0.0, 0.25, 1.0],
            opacity: driver.interpolate({
              inputRange: [250, 300],
              outputRange: [1, 0],
            }),
          },
        },
      };
    },
  },
  'shoutem.ui.navigation.NavigationBar': {
    [INCLUDE]: ['navigationBar'],

    '.fade': {
      // Clear navigation bar is currently disabled on Android
      // due to overflow issues.
      gradient: {
        [INCLUDE]: ['fillParent'],
        colors: ['transparent', 'rgba(0, 0, 0, 0.15)', 'transparent'],
        locations: [0.0, 0.25, 1.0],
        solidifyAnimation(driver) {
          return {
            opacity: driver.interpolate({
              inputRange: [250, 300],
              outputRange: [1, 0],
            }),
          };
        },
      },
    },

    container: {
      paddingTop: NAVIGATION_BAR_HEIGHT,
      backgroundColor: variables.navBarBackground,
      borderBottomColor: variables.navBarBorderColor,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    navigationHeader: {
      position: 'absolute',
      top: Device.select({
        iPhoneX: 6,
        iPhoneXR: 8,
        default: Platform.OS === 'android' ? 0 : -4,
      }),
      left: 0,
      right: 0,
      height: NAVIGATION_BAR_HEIGHT,
    },
    statusBar: {
      backgroundColor: variables.statusBarColor,
      statusBarStyle: variables.statusBarStyle,
      height: Device.select({
        iPhoneX: IPHONE_X_NOTCH_PADDING,
        iPhoneXR: IPHONE_XR_NOTCH_PADDING,
        default: 0,
      }),
    },
    screenBackground: variables.backgroundColor,
    navigationBarImage: {
      marginTop: Device.select({
        iPhoneX: IPHONE_X_NOTCH_PADDING,
        iPhoneXR: IPHONE_XR_NOTCH_PADDING,
        default: 0,
      }),
      flex: 1,
      flexGrow: 1,
      height: NAVIGATION_HEADER_HEIGHT,
      left: 0,
      solidifyAnimation(driver) {
        return {
          opacity: driver.interpolate({
            inputRange: [250, 300],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          }),
        };
      },
      boxingAnimation() {
        return {};
      },
      position: 'absolute',
      right: 0,
      top: 0,
      width: window.width,
    },
  },

  sectionHeaderDivider: {
    'shoutem.ui.Caption': {
      marginTop: -1,
      marginBottom: variables.smallGutter,
      marginHorizontal: variables.mediumGutter,
    },

    paddingTop: 23,
    backgroundColor: variables.sectionHeaderBackgroundColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: variables.lineColor,
  },
  'shoutem.ui.Divider': {
    [INCLUDE]: ['guttersMargin'],

    '.line': {
      '.small': {
        width: 55,
      },
      '.center': {
        alignSelf: 'center',
      },
      paddingTop: 0,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: variables.lineColor,
    },

    '.section-header': {
      [INCLUDE]: ['sectionHeaderDivider'],
    },

    alignSelf: 'stretch',
    paddingTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  //
  // Form components
  //
  'shoutem.ui.FormGroup': {
    'shoutem.ui.View': {
      'shoutem.ui.Caption': {
        backgroundColor: variables.paperColor,
        paddingHorizontal: variables.mediumGutter,
        color: changeColorAlpha(variables.caption.color, 0.5),
        paddingTop: 10,
      },

      'shoutem.ui.TextInput': {
        height: 39,
        paddingVertical: 9,
      },

      'shoutem.ui.DropDownMenu': {
        horizontalContainer: {
          alignItems: 'flex-start',
          backgroundColor: variables.paperColor,
          height: 39,
          paddingHorizontal: variables.mediumGutter,
          paddingVertical: 9,
        },

        selectedOption: {
          'shoutem.ui.Icon': {
            color: variables.paperColor,
          },

          'shoutem.ui.Text': {
            margin: 0,
          },

          flex: 1,
          alignSelf: 'stretch',
          justifyContent: 'flex-start',
          padding: 0,
        },

        '.empty': {
          selectedOption: {
            'shoutem.ui.Text': {
              color: changeColorAlpha(variables.text.color, 0.5),
            },
          },
        },
      },
    },
  },

  'shoutem.ui.TextInput': {
    [INCLUDE]: ['commonVariants', 'guttersMargin'],

    selectionColor: variables.text.color,
    placeholderTextColor: changeColorAlpha(variables.text.color, 0.5),
    backgroundColor: variables.paperColor,
    borderColor: variables.text.color,
    height: 55,
    paddingHorizontal: variables.mediumGutter,
    paddingVertical: 18,
    underlineColorAndroid: 'transparent',
    ...variables.text,
    fontFamily: resolveFontFamily(
      variables.text.fontFamily,
      variables.text.fontWeight,
      variables.text.fontStyle,
    ),
    fontWeight: resolveFontWeight(variables.text.fontWeight),
    fontStyle: resolveFontStyle(variables.text.fontStyle),

    errorBorderColor: {
      borderColor: variables.errorText.color,
    },

    wiggleAnimation: {
      interpolateConfig: {
        inputRange: [0, 0.5, 1, 1.5, 2, 2.5, 3],
        outputRange: [0, -5, 0, 5, 0, -5, 0],
      },
      timingConfig: {
        duration: 400,
      },
      paddingHorizontal: 5,
    },

    withBorder: {
      borderWidth: 1,
    },

    withoutBorder: {
      borderWidth: 0,
    },

    '.small': {
      paddingVertical: 6,
      height: 42,
    },
  },

  'shoutem.ui.NumberInput': {
    button: {
      borderWidth: 0,
      height: 40,
      width: 40,
      padding: 8,
    },

    icon: {
      marginRight: 0,
    },

    inputContainer: {
      borderBottomWidth: 1,
      borderColor: 'rgba(0, 0, 0, 0.2)',
      borderTopWidth: 1,
    },

    input: {
      height: 38,
      paddingVertical: 10,
      textAlign: 'center',
      width: 94,
    },
  },

  // TODO: Search is defined with fixed colors at the moment but we will revisit it soon
  'shoutem.ui.SearchField': {
    clearIcon: {
      color: '#2c2c2c',
      opacity: 0.5,
    },

    container: {
      backgroundColor: '#f0f0f0',
      borderRadius: 5,
      flex: 1,
      height: 30,
    },

    searchIcon: {
      color: '#888888',
      width: 16,
      height: 16,
    },

    input: {
      backgroundColor: '#f0f0f0',
      color: '#888888',
      flex: 1,
      minWidth: 330,
      fontSize: 15,
      height: 30,
      paddingVertical: 6,
      placeholderTextColor: '#888888',
      selectionColor: '#888888',
    },
  },

  'shoutem.ui.Switch': {
    container: {
      borderRadius: 15,
      height: 18,
      marginVertical: 7,
      paddingHorizontal: 2,
      paddingVertical: 2,
      width: 32,

      muteAnimation(driver) {
        return {
          backgroundColor: driver.interpolate({
            inputRange: [0, 1],
            outputRange: [
              inverseColorBrightnessForAmount(variables.paperColor, 15),
              changeColorAlpha(variables.secondaryButtonBackgroundColor, 1),
            ],
          }),
        };
      },
    },

    thumb: {
      backgroundColor: variables.paperColor,
      borderRadius: 7,
      height: 14,
      width: 14,

      turnAnimation(driver, { layout, animationOptions }) {
        const { x, width } = layout;
        return {
          transform: [
            {
              translateX: driver.interpolate({
                inputRange: [0, 1],
                outputRange: [
                  0,
                  animationOptions.containerWidth - width - 2 * x,
                ],
              }),
            },
          ],
        };
      },
    },
  },

  'shoutem.ui.DropDownMenu': {
    '.horizontal': {
      horizontalContainer: {
        minHeight: 40,
        maxHeight: 200,
        justifyContent: 'center',
        backgroundColor: inverseColorBrightnessForAmount(
          variables.paperColor,
          5,
        ),
        width: window.width,
        marginTop: 0,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: variables.navBarBorderColor,
      },
      selectedOption: {
        'shoutem.ui.Icon': {
          color: variables.text.color,
        },
        'shoutem.ui.Text': {
          ...variables.navBarText,
          fontFamily: resolveFontFamily(
            variables.navBarText.fontFamily,
            'normal',
            variables.navBarText.fontStyle,
          ),
          color: variables.text.color,
          fontWeight: resolveFontWeight('normal'),
          fontStyle: resolveFontStyle(variables.navBarText.fontStyle),
          textAlign: 'center',
        },
      },
    },

    '.featured': {
      '.horizontal': {
        horizontalContainer: {
          [INCLUDE]: ['dimmedFeaturedBackground'],
          borderBottomWidth: 0,
        },
        selectedOption: {
          'shoutem.ui.Icon': {
            color: variables.featuredNavBarTitleColor,
          },
          'shoutem.ui.Text': {
            color: variables.featuredNavBarTitleColor,
          },
        },
      },
    },

    '.navBar': {
      selectedOption: {
        'shoutem.ui.Icon': {
          color: variables.navBarIconsColor,
        },
        'shoutem.ui.Text': {
          ...variables.navBarText,
          fontFamily: resolveFontFamily(
            variables.navBarText.fontFamily,
            'normal',
            variables.navBarText.fontStyle,
          ),
          fontWeight: resolveFontWeight('normal'),
          fontStyle: resolveFontStyle(variables.navBarText.fontStyle),
          color: variables.navBarIconsColor,
        },
      },
    },

    '.large': {
      horizontalContainer: {
        alignItems: 'flex-end',
        borderColor: variables.shadowColor,
        borderWidth: 1,
        borderRightWidth: 0,
        height: 40,
        width: 175,
      },

      selectedOption: {
        'shoutem.ui.Text': {
          flex: 1,
          textAlign: 'center',
          margin: 0,
        },

        'shoutem.ui.Icon': {
          backgroundColor: variables.secondaryButtonBackgroundColor,
          borderColor: variables.secondaryButtonBorderColor,
          borderRadius: 2,
          borderWidth: 1,
          color: variables.secondaryButtonTextColor,
          height: 40,
          paddingVertical: 8,
          width: 40,
        },

        padding: 0,
        // Compensate to cover the top border
        marginTop: -1,
      },
    },

    selectedOption: {
      // Button
      [INCLUDE]: ['clearButton', 'textualButton'],

      'shoutem.ui.Icon': {
        marginRight: 0,
      },

      'shoutem.ui.Text': {
        marginRight: 0,
      },
    },
  },

  'shoutem.ui.DropDownModal': {
    modal: {
      'shoutem.ui.Button.close': {
        'shoutem.ui.Icon': {
          color: changeColorAlpha(variables.subtitle.color, 0.5),
          width: 24,
          height: 24,
        },

        position: 'absolute',
        bottom: 25,
        left: 0,
        right: 0,
      },

      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 20,
      backgroundColor: changeColorAlpha(variables.backgroundColor, 0.97),
    },

    modalItem: {
      'shoutem.ui.Text': {
        textAlign: 'center',
        flex: 1,
        width: window.width,
        paddingHorizontal: 20,
        paddingVertical: 23,
        alignSelf: 'stretch',
        ...variables.subtitle,
        fontFamily: resolveFontFamily(
          variables.subtitle.fontFamily,
          variables.subtitle.fontWeight,
          variables.subtitle.fontStyle,
        ),
        fontWeight: resolveFontWeight(variables.subtitle.fontWeight),
        fontStyle: resolveFontStyle(variables.subtitle.fontStyle),
      },
    },
    selectedModalItem: {
      'shoutem.ui.Text': {
        textAlign: 'center',
        flex: 1,
        width: window.width,
        paddingHorizontal: 20,
        paddingVertical: 23,
        alignSelf: 'stretch',
        ...variables.subtitle,
        fontFamily: resolveFontFamily(
          variables.subtitle.fontFamily,
          '500',
          variables.subtitle.fontStyle,
        ),
        fontWeight: resolveFontWeight('500'),
        fontStyle: resolveFontStyle(variables.subtitle.fontStyle),
      },
    },

    visibleOptions: 8,
  },

  //
  // Html
  //
  textBlock: {
    // Inline element
    container: {
      '.wrapper': {
        marginBottom: 0,
      },
      '.block': {
        marginBottom: 20,
      },
    },
    text: {},
  },
  'shoutem.ui.SimpleHtml': {
    container: {
      padding: variables.mediumGutter,
    },
    video: {
      // 16:9 ratio covers majority of YouTube videos
      width: dimensionRelativeToIphone(345),
      height: dimensionRelativeToIphone(194),
      paddingBottom: variables.smallGutter,
    },
    fallback: {
      width: window.width,
      height: 40,
    },
  },
  'shoutem.ui.Html': {
    container: {
      backgroundColor: variables.paperColor,
      padding: variables.mediumGutter,
    },
    // HTML Inline elements
    b: {
      [INCLUDE]: ['textBlock'],
      text: {
        [INCLUDE]: ['boldTextStyle'],
      },
    },
    strong: {
      [INCLUDE]: ['textBlock'],
      container: {},
      text: {
        [INCLUDE]: ['boldTextStyle'],
      },
    },
    i: {
      [INCLUDE]: ['textBlock'],
      text: {
        [INCLUDE]: ['italicTextStyle'],
      },
    },
    em: {
      [INCLUDE]: ['textBlock'],
      text: {
        [INCLUDE]: ['italicTextStyle'],
      },
    },
    pre: {
      [INCLUDE]: ['textBlock'],
      text: {
        [INCLUDE]: ['codeTextStyle'],
      },
    },
    code: {
      [INCLUDE]: ['textBlock'],
      text: {
        [INCLUDE]: ['codeTextStyle'],
      },
    },
    a: {
      [INCLUDE]: ['textBlock'],
      text: {},
    },

    // TextBlock elements
    h1: {
      [INCLUDE]: ['textBlock'],
      container: {},
      text: {
        color: '#000',
        fontSize: 28,
      },
    },
    h2: {
      [INCLUDE]: ['textBlock'],
      container: {},
      text: {
        color: '#000',
        fontSize: 24,
      },
    },
    h3: {
      [INCLUDE]: ['textBlock'],
      container: {},
      text: {
        fontWeight: '900',
        color: '#000',
        fontSize: 18,
      },
    },
    h4: {
      [INCLUDE]: ['textBlock'],
      container: {},
      text: {
        fontWeight: '700',
        color: '#000',
        fontSize: 16,
      },
    },
    h5: {
      [INCLUDE]: ['textBlock'],
      container: {},
      text: {
        fontWeight: '500',
        color: '#000',
        fontSize: 14,
      },
    },
    h6: {
      [INCLUDE]: ['textBlock'],
      container: {},
      text: {
        fontWeight: '500',
        color: '#000',
        fontSize: 14,
      },
    },
    p: {
      [INCLUDE]: ['textBlock'],
      container: {},
      text: {
        [INCLUDE]: ['shoutem.ui.Text', 'multilineTextStyle'],
      },
    },
    div: {
      [INCLUDE]: ['textBlock'],
    },

    // HTML lists
    ul: {
      container: {},
    },
    ol: {
      container: {},
    },
    number: {
      // Font should be monospace so that item content has same offset
      // Can not apply width to the Text for some reason
      fontFamily: Platform.OS === 'ios' ? 'Menlo-Regular' : 'monospace',
      fontSize: 12,
    },
    bullet: {},
    li: {
      // Inline element
      [INCLUDE]: ['textBlock'],
      container: {
        '.block': {
          marginBottom: 10,
        },
      },
    },

    // HTML containers
    section: {},
    header: {},
    content: {},
    article: {},
    footer: {},

    // HTML functional
    video: {
      container: {
        // html/components/Image
        // Used to keep video ratio by thumbnail.
        // Must have width.
        width: 300,
        alignSelf: 'center',
        marginBottom: 20,
      },
    },
    img: {
      alignSelf: 'center',
      marginBottom: 20,
      // Image height is calculated to respect
      // image ratio depending on width.
      // If both width and height are defined
      // image dimensions are fixed.
      // If image width is smaller then style width
      // it will not rescale.
      width: 300,
    },
  },

  'shoutem.ui.Video': {
    container: {
      backgroundColor: variables.paperColor,
      flex: 1,
      height: 240,
    },
  },

  //
  // HorizontalPager
  //

  'shoutem.ui.HorizontalPager': {
    container: {
      flexGrow: 1,
    },
    scrollView: {
      flexGrow: 1,
      backgroundColor: 'transparent',
      overflow: 'scroll',
    },
    page: {
      flexGrow: 1,
      backgroundColor: 'transparent',
    },
    nextPageInsetSize: 20,
  },

  //
  // PageIndicators
  //

  'shoutem.ui.PageIndicators': {
    '.overlay-bottom': {
      container: {
        backgroundGradient: {
          colors: ['rgba(0, 0, 0, 0.0)', 'rgba(0, 0, 0, 0.25)'],
        },
        paddingVertical: 8,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      },

      indicatorContainer: {
        'shoutem.ui.View': {
          backgroundColor: '#ffffff',

          '.selected': {
            backgroundColor: changeColorAlpha('#ffffff', 0.7),
          },
        },
      },
    },

    '.relative': {
      container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        bottom: 0,
        paddingVertical: 16,
      },
    },

    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 10,
    },
    indicatorContainer: {
      alignItems: 'center',
      'shoutem.ui.View': {
        width: variables.galleryDotSize,
        height: variables.galleryDotSize,
        borderRadius: variables.galleryDotSize / 2,
        // TODO - confirm opacity
        backgroundColor: changeColorAlpha(variables.indicatorColor, 0.7),
        marginLeft: variables.galleryDotSize / 2,
        marginRight: variables.galleryDotSize / 2,
        '.selected': {
          backgroundColor: variables.indicatorColor,
        },
      },
    },
  },

  //
  // InlineGallery
  //
  'shoutem.ui.InlineGallery': {
    '.large-ultra-wide': {
      container: {
        height: dimensionRelativeToIphone(130),
      },
    },

    '.large-banner': {
      container: {
        height: dimensionRelativeToIphone(200),
      },
    },

    '.large-wide': {
      container: {
        height: dimensionRelativeToIphone(238),
      },
    },

    '.large-square': {
      container: {
        height: dimensionRelativeToIphone(375),
      },
    },

    container: {
      height: dimensionRelativeToIphone(345),
    },

    imageContainer: {},

    image: {},

    pager: {
      pageMargin: 20,
    },
  },

  //
  // ImageGallery
  //
  'shoutem.ui.ImageGallery': {
    [INCLUDE]: ['guttersPadding'],
    pageMargin: 20,
    container: {
      flexGrow: 1,
      backgroundColor: '#000000',
      lightsOffAnimation(driver) {
        return {
          backgroundColor: driver.interpolate({
            inputRange: [0, 1],
            outputRange: [variables.paperColor, '#000000'],
          }),
        };
      },
    },
    page: {
      flexGrow: 1,
      justifyContent: 'center',
      overflow: 'hidden',
    },
  },

  'shoutem.ui.ImageGalleryOverlay': {
    '.full-screen': {
      title: {
        container: {
          // We want the title background gradient to be
          // visible underneath the navigation bar, but the
          // title text should be rendered below the
          // navigation bar.
          paddingTop: NAVIGATION_BAR_HEIGHT + variables.mediumGutter,
        },
      },
    },

    container: {
      [INCLUDE]: ['fillParent'],
    },
    title: {
      container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        paddingTop: variables.mediumGutter,
        paddingHorizontal: variables.mediumGutter,

        backgroundGradient: {
          colors: ['rgba(0, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.0)'],
          locations: [0.17, 1.0],
        },
      },
      text: {
        color: variables.imageOverlayTextColor,
        textAlign: 'center',
      },
    },
    description: {
      container: {
        '.expanded': {
          paddingTop: variables.extraLargeGutter,

          backgroundGradient: {
            colors: ['rgba(0, 0, 0, 0.0)', 'rgba(0, 0, 0, 0.8)'],
            locations: [0.36, 1.0],
          },
        },
        '.collapsed': {
          paddingTop: variables.mediumGutter,

          backgroundGradient: {
            colors: ['rgba(0, 0, 0, 0.0)', 'rgba(0, 0, 0, 0.6)'],
            locations: [0.02, 1.0],
          },
        },

        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      },

      scroll: {
        maxHeight: 200,
        padding: variables.mediumGutter,
      },
      text: {
        color: variables.imageOverlayTextColor,
        textAlign: 'center',
      },
    },
  },

  // Action Sheet

  'shoutem.ui.ActionSheet': {
    container: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: 'column',
      justifyContent: 'flex-end',
    },
    contentContainer: {
      marginHorizontal: 8,
      paddingBottom: 34,
      backgroundColor: 'transparent',
    },
    segmentContainer: {
      overflow: 'hidden',
      backgroundColor: '#FFFFFF',
      borderRadius: 13,
    },
  },

  'shoutem.ui.ActionSheetOption': {
    container: {
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderColor: 'rgba(130, 130, 130, 0.1)',
    },
    text: {
      fontSize: 15,
      letterSpacing: 0.38,
      color: '#000000',
      lineHeight: 24,
    },
    cancelText: {
      textAlign: 'center',
      fontWeight: resolveFontWeight('700'),
    },
  },

  //
  // Other
  //
  'shoutem.ui.ImagePreview': {
    container: {
      flex: 1,
      backgroundColor: 'transparent',
    },
    fullScreenContainer: {
      flex: 1,
      backgroundColor: 'black',
    },
    image: {
      flex: 1,
    },
    thumbnail: {},
    header: {
      position: 'absolute',
      top: STATUS_BAR_OFFSET,
      left: 0,
      backgroundColor: 'transparent',
    },
    closeIcon: {
      color: 'white',
      marginLeft: 15,
      marginTop: -STATUS_BAR_OFFSET + 20,
    },
  },

  'shoutem.ui.MapView': {
    flex: 1,
  },

  'shoutem.ui.InlineMap': {
    // TODO: why do we need all image sizes and styles here?
    [INCLUDE]: ['imageSizes'],
    '.top-aligned': {
      justifyContent: 'flex-start',
    },

    '.bottom-aligned': {
      justifyContent: 'flex-end',
    },

    '.medium-tall': {
      height: 160,
    },

    'shoutem.ui.View': {
      'shoutem.ui.View': {
        'shoutem.ui.View': {
          backgroundColor: variables.imageOverlayColor,
          'shoutem.ui.Heading': {
            color: variables.imageOverlayTextColor,
            marginVertical: 8,
          },

          'shoutem.ui.Title': {
            color: variables.imageOverlayTextColor,
            marginVertical: 12,
          },

          'shoutem.ui.Subtitle': {
            color: variables.imageOverlayTextColor,
            marginTop: 80,
          },

          'shoutem.ui.Caption': {
            color: variables.imageOverlayTextColor,
            marginTop: 5,
          },

          'shoutem.ui.Text': {
            color: variables.imageOverlayTextColor,
          },
        },

        [INCLUDE]: ['fillParent'],
      },
    },

    [INCLUDE]: ['commonVariants'],
    flex: 0,
  },

  'shoutem.ui.LinearGradient': {
    '.fill-parent': {
      [INCLUDE]: ['fillParent'],
    },
  },

  'shoutem.ui.Lightbox': {
    '.container': {
      flex: 1,
      resizeMode: 'contain',
    },
    'shoutem.ui.Image': {
      '.preview': {
        flex: 1,
      },
    },
  },

  'shoutem.ui.InlineDropDownMenu': {
    container: {
      paddingTop: 12,
      paddingHorizontal: variables.mediumGutter,
      paddingBottom: 4,
      backgroundColor: variables.paperColor,
    },
    icon: {
      color: variables.text.color,
    },
  },

  'shoutem.ui.InlineDropDownMenuItem': {
    container: {
      paddingTop: 10,
      paddingHorizontal: variables.mediumGutter,
      paddingBottom: 4,
      backgroundColor: variables.paperColor,
      borderTopWidth: 1,
      borderTopColor: variables.backgroundColor,
    },
  },

  'shoutem.ui.TabMenu': {
    container: {
      paddingHorizontal: variables.smallGutter,
      backgroundColor: variables.backgroundColor,
    },
    list: {
      flexGrow: 0,
      flexShrink: 0,
    },
  },

  'shoutem.ui.TabMenuItem': {
    tabulator: {
      backgroundColor: variables.text.color,
      height: 1,
      borderRadius: 1,
      flexDirection: 'row',
      marginBottom: 8,
      marginLeft: 8,
    },
    text: {
      marginTop: 12,
      marginHorizontal: 8,
      marginBottom: 12,
      opacity: 0.3,
    },
    selectedText: {
      marginBottom: 4,
      opacity: 1,
    },
  },

  'shoutem.ui.YearRangePickerButton': {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F9F9F9',
      borderWidth: 1,
      borderRadius: 8,
      borderColor: 'rgba(130, 130, 130, 0.1)',
      paddingLeft: 15,
      paddingVertical: 8,
      paddingRight: 8,
      marginRight: 8,
    },
    icon: {
      color: variables.text.color,
    },
  },

  'shoutem.ui.YearRangePickerModal': {
    outerContainer: {
      flex: 1,
    },
    container: {
      height: 360,
      padding: 8,
      backgroundColor: '#F9F9F9',
      borderWidth: 1,
      borderRadius: 8,
      borderColor: 'rgba(130, 130, 130, 0.1)',
      marginHorizontal: 15,
    },
    tooltipContainer: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 8,
      height: 56,
    },
    yearRow: {
      flexDirection: 'row',
      flex: 1,
    },
    buttonContainer: {
      flexDirection: 'row',
      padding: 8,
      height: 56,
    },
    yearContainer: {
      flex: 1,
      alignSelf: 'stretch',
      flexDirection: 'row',
      marginBottom: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    year: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    yearSelected: {
      backgroundColor: variables.featuredColor,
    },
    yearFirst: {
      left: 5,
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
    },
    yearLast: {
      right: 5,
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
    },
    icon: {
      color: variables.text.color,
      opacity: 1,
    },
    iconDisabled: {
      opacity: 0.3,
    },
  },

  'shoutem.ui.DateTimePicker': {
    buttonContainer: {
      width: 50,
      height: 50,
      backgroundColor: '#222222',
    },
    icon: { color: '#FFFFFF', height: 30, width: 30 },
    modalButton: { width: 100, margin: 'auto' },
    modalButtonContainer: { height: 80 },
    modalContainer: { backgroundColor: '#FFFFFF' },
    textContainer: {
      borderColor: '#C2C2C2',
      borderWidth: 1,
    },
  },
});
