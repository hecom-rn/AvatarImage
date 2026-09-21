import React from 'react';
import { View, StyleSheet, Image, } from 'react-native';

export default class AvatarGroup extends React.Component {
    render() {
        const { size, children, ...other } = this.props;
        return <View style={[styles.container, { height: size, width: size, borderRadius: size / 2 }]} {...other} >
            {React.Children.map(children, (child, index) => {
                if (index == 0){
                    return child;
                }
            })}
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
