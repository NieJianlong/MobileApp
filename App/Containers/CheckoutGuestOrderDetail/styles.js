import { s, ScaledSheet } from "react-native-size-matters";
import Colors from "../../Themes/Colors";
import { ApplicationStyles } from "../../Themes";
import { Fonts } from "../../Themes";

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  rightButton: {
    ...ApplicationStyles.screen.heading5Bold,
    fontSize: s(14),
    color: Colors.grey40,
  },
  horizontalCenter: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    ...ApplicationStyles.screen.heading2Bold,
    fontSize: s(20),
    textAlign: "center",
  },
  description: {
    ...ApplicationStyles.screen.heading4Bold,
    fontSize: s(14),
    fontWeight: "400",
    marginTop: s(20),
  },
  boldDescription: {
    ...ApplicationStyles.screen.heading4Bold,
    fontSize: s(14),
    lineHeight: s(16),
    marginTop: s(5),
  },
  inputsWrapper: {
    marginTop: s(9),
    paddingHorizontal: s(16),
  },
  inputsWrapper2: {
    display: "flex",
    flexDirection: "row",
    marginTop: s(24),
    justifyContent: "space-between",
  },
  inputWrapper3: {
    marginTop: s(24),
  },
  inputName: {
    width: "48%",
  },
  deliveryAddressSection: {
    marginTop: s(24),
    paddingHorizontal: s(16),
  },
  deliveryAddressSectionTitle: {
    fontSize: s(14),
    fontFamily: Fonts.primary,
    color: Colors.grey80,
    fontWeight: "700",
  },
  deliveryDescriptionBox: {
    marginTop: s(5),
    paddingHorizontal: s(33),
    borderColor: Colors.grey10,
    borderRadius: s(3),
    borderWidth: s(1),
    paddingVertical: s(20),
    backgroundColor: "white",
  },
  deliveryDescriptionText: {
    fontSize: s(14),
    fontFamily: Fonts.primary,
    color: Colors.grey80,
    fontWeight: "normal",
    marginTop: s(5),
  },
  switch: {
    marginTop: s(24),
  },
  button: {
    marginTop: s(20),
  },
});

export default styles;
