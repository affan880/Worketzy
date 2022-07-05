import { StyleSheet, Text, View, StatusBar, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import SafeView from '../../Components/CustomComponents/safeView'
import Colors from '../../utils/Colors'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const Verification = ({verify}) => {
  return (
    <SafeView style={{ backgroundColor: Colors.primary }}>
      <StatusBar translucent backgroundColor={Colors.primary} />
      <View style={styles.container}>
              <Text style={styles.Header} >Under Verification</Text>
              <Text style={styles.sub} >You have submitted your documents successfully.</Text>
              <Text style={styles.description}>Please wait,You will be able to use the app as soon as your accounts get verified by our admins.</Text>
              <TouchableOpacity style={styles.RefreshButton} onPress={()=> verify()} >
              <Text style={styles.RefreshButtonText}>Refresh</Text>
              </TouchableOpacity>
      </View>
    </SafeView>
  );
}

export default Verification

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.primary,
        alignItems: 'flex-start',
        marginTop: height * 0.05,
    },
    Header: {
        fontSize: 28,
        padding: 10,
        color: Colors.secondary,
        fontWeight: "800",
        letterSpacing: 1,
        textDecorationLine: 'underline',
        textDecorationColor: Colors.secondary,
        textDecorationStyle: 'solid',
    },
    sub: {
        fontSize: 18,
        padding: 10,
        color: Colors.secondaryShade,
        fontWeight: "500",
    },
    description: {
        fontSize: 16,
        padding: 10,
        color: Colors.secondaryShade,
        fontWeight: "500",
    },
    RefreshButton: {
        width: '35%',
        height: height * 0.06,
        backgroundColor: Colors.secondary,
        borderRadius: 10,
        alignSelf: 'flex-end',
        margin: height * 0.05,
        justifyContent: 'center',
        alignItems: 'center',
    },
    RefreshButtonText: {
        color: Colors.secondaryShade,
        fontSize: 18,
        fontWeight: "500",
    }
})