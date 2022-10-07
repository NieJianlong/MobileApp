import React, { ComponentProps } from "react";
import { TextInput as Input } from "react-native";
import { t } from "react-native-tailwindcss";

type InputProps = ComponentProps<typeof Input>;

const TextInput: React.FC<InputProps> = (props) => {
  const { style, ...rest } = props;
  return (
    <Input
      textAlignVertical={"top"}
      multiline={true}
      style={[
        { backgroundColor: "white" },
        t.borderSolid,
        t.borderGray200,
        t.border,
        t.textBase,
        t.p5,
        t.pT4,
        style,
      ]}
      {...rest}
    />
  );
};

export default TextInput;
