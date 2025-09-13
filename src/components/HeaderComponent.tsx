import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'

const HeaderComponent = () => {
  return (
    <View style={styles.container}>
      {/* SpaceX Text Logo as fallback */}
      <Text style={styles.logoText}>SPACEX</Text>
      
      {/* Menu icon using text symbol */}
      <TouchableOpacity style={styles.menuButton}>
        <Text style={styles.menuIcon}>≡</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HeaderComponent

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginTop:20
    },
    logoText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    menuButton: {
        padding: 4,
    },
    menuIcon: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
    }
})