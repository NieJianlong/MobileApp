import React, { useRef, useContext, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput } from '../../../Components';
import styles from '../styles';
import { AlertContext } from '../../Root/GlobalContext';

export default function AddLocationSheet() {
  let stateInput = useRef();
  let cityInput = useRef();
  let villageInput = useRef();
  let houseNumberInput = useRef();
  let flatNumberInput = useRef();
  let landmarkInput = useRef();
  const { dispatch } = useContext(AlertContext);

  const toggleAddLocationSheet = useCallback(() => {
    dispatch({
      type: 'changSheetState',
      payload: {
        showSheet: false,
        height: 600,
        children: () => null,
        sheetTitle: '',
      },
    });
  }, [dispatch]);
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.popupHeader}>
        <Text style={[styles.txtSave, { color: 'transparent' }]}>SAVE</Text>
        <Text style={styles.popupTitle}>Add your delivery address</Text>
        <TouchableOpacity onPress={toggleAddLocationSheet}>
          <Text style={styles.txtSave}>SAVE</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAwareScrollView enableOnAndroid>
        <TextInput
          placeholder={'Pin Code'}
          style={styles.textInput}
          returnKeyType={'next'}
          onSubmitEditing={() => stateInput.getInnerRef().focus()}
        />
        <TextInput
          placeholder={'State (Province)'}
          style={styles.textInput}
          ref={(r) => (stateInput = r)}
          returnKeyType={'next'}
          onSubmitEditing={() => cityInput.getInnerRef().focus()}
        />
        <TextInput
          placeholder={'Town or city'}
          style={styles.textInput}
          ref={(r) => (cityInput = r)}
          returnKeyType={'next'}
          onSubmitEditing={() => villageInput.getInnerRef().focus()}
        />
        <TextInput
          placeholder={'Village or area'}
          style={styles.textInput}
          ref={(r) => (villageInput = r)}
          returnKeyType={'next'}
          onSubmitEditing={() => houseNumberInput.getInnerRef().focus()}
        />
        <TextInput
          placeholder={'House number'}
          style={styles.textInput}
          ref={(r) => (houseNumberInput = r)}
          returnKeyType={'next'}
          onSubmitEditing={() => flatNumberInput.getInnerRef().focus()}
        />
        <TextInput
          placeholder={'Flat number'}
          style={styles.textInput}
          ref={(r) => (flatNumberInput = r)}
          returnKeyType={'next'}
          onSubmitEditing={() => landmarkInput.getInnerRef().focus()}
        />
        <TextInput
          placeholder={'Landmark'}
          style={styles.textInput}
          ref={(r) => (landmarkInput = r)}
          returnKeyType={'done'}
        />
      </KeyboardAwareScrollView>
    </View>
  );
}
