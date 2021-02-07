/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import Geocoder from 'react-native-geocoder';
import { PositionContext } from '../app';

function MapScreen({ navigation }) {
    const positionContext = useContext(PositionContext);
    const styles = StyleSheet.create({
        map: {
            ...StyleSheet.absoluteFillObject,
        },
    });
    //get location info
    async function onMapPress(e) {
        let country = { name: '', code: '' };
        // Position Geocoding
        var position = {
            lat: e.nativeEvent.coordinate.latitude,
            lng: e.nativeEvent.coordinate.longitude,
        };
        const res = await Geocoder.geocodePosition(position);
        if (res.length > 0) {
            const point = res[0];
            country = {
                name: point.country || point.feature,
                code: point.countryCode,
            };
        }
        positionContext.positionDispacth(
            {
                type: 'update',
                payload: country,
            }
        );
        navigation.navigate('Videos');
    }
    return (
        <MapView
            zoomEnabled={false}
            onPress={onMapPress.bind(this)}
            style={styles.map}
            initialRegion={{
                latitude: positionContext.positionState.lat,
                longitude: positionContext.positionState.long,
                latitudeDelta: 20,
                longitudeDelta: 20,
            }} />
    );
}
export default MapScreen;
