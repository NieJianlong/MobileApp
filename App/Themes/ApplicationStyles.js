import { s, vs } from 'react-native-size-matters'

import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  screen: {
    mainContainer: {
      flex: 1,
      backgroundColor: Colors.transparent
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },
    container: {
      flex: 1,
      paddingTop: Metrics.baseMargin,
      backgroundColor: Colors.transparent
    },
    section: {
      margin: Metrics.section,
      padding: Metrics.baseMargin
    },
    sectionText: {
      ...Fonts.style.normal,
      paddingVertical: Metrics.doubleBaseMargin,
      color: Colors.snow,
      marginVertical: Metrics.smallMargin,
      textAlign: 'center',
      fontFamily: Fonts.primary
    },
    subtitle: {
      color: Colors.snow,
      padding: Metrics.smallMargin,
      marginBottom: Metrics.smallMargin,
      marginHorizontal: Metrics.smallMargin
    },
    titleText: {
      ...Fonts.style.h2,
      fontSize: 14,
      color: Colors.text
    },
    txtAction: {
      fontFamily: Fonts.semibold,
      color: Colors.primary,
      fontSize: s(15)
    },
    txtRegular: {
      fontSize: s(13),
      fontFamily: Fonts.primary,
      color: Colors.grey80,
    },
    txtNoteBold: {
      fontSize: s(7),
      fontFamily: Fonts.primary,
      color: Colors.grey60,
    },
    txtBold: {
      fontSize: s(12.5),
      fontFamily: Fonts.primary,
      color: Colors.grey80,
      fontWeight: '600'
    },
    txtHeroBold: {
      fontSize: s(44),
      fontFamily: Fonts.primary,
      color: Colors.black,
      fontWeight: '600'
    },
    heading1Bold: {
      fontSize: s(30),
      fontFamily: Fonts.primary,
      color: Colors.black,
      fontWeight: '600',
      lineHeight: s(38)
    },
    heading2Bold: {
      fontSize: s(24),
      fontFamily: Fonts.primary,
      color: Colors.black,
      fontWeight: '600',
      lineHeight: s(32)
    },
    heading3Bold: {
      fontSize: s(17),
      fontFamily: Fonts.primary,
      color: Colors.black,
      fontWeight: '600'
    },
    heading4Bold: {
      fontSize: s(14),
      fontFamily: Fonts.primary,
      color: Colors.black,
      fontWeight: '600'
    },
    heading5Bold: {
      fontSize: s(13),
      fontFamily: Fonts.primary,
      color: Colors.black,
      fontWeight: '600'
    },
    heading6Bold: {
      fontSize: s(11),
      fontFamily: Fonts.primary,
      color: Colors.black,
      fontWeight: '600'
    },
    heading4Regular: {
      fontSize: s(15),
      fontFamily: Fonts.primary,
      color: Colors.black,
      fontWeight: '400'
    },
    heading5Regular: {
      fontSize: s(12.5),
      fontFamily: Fonts.primary,
      color: Colors.black,
    },
    heading6Regular: {
      fontSize: s(11),
      fontFamily: Fonts.primary,
      color: Colors.black,
    }
  },
  darkLabelContainer: {
    padding: Metrics.smallMargin,
    paddingBottom: Metrics.doubleBaseMargin,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
    marginBottom: Metrics.baseMargin
  },
  darkLabel: {
    fontFamily: Fonts.type.bold,
    color: Colors.snow
  },
  groupContainer: {
    margin: Metrics.smallMargin,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  sectionTitle: {
    ...Fonts.style.h4,
    color: Colors.coal,
    backgroundColor: Colors.ricePaper,
    padding: Metrics.smallMargin,
    marginTop: Metrics.smallMargin,
    marginHorizontal: Metrics.baseMargin,
    borderWidth: 1,
    borderColor: Colors.ember,
    alignItems: 'center',
    textAlign: 'center'
  },
}

export default ApplicationStyles
