/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';

import { Colors, } from 'react-native/Libraries/NewAppScreen';
import Avatar from '@hecom/image-avatar'

const size = 88;
const App = () => {
    return (
        <Fragment>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>
                    <Text style={styles.label}>
                        {'默认头像'}
                    </Text>
                    <View style={styles.container}>
                        <Avatar
                            style={styles.avatar}
                            size={size}
                            user={{code: 1, name: '白宇东'}}
                        />
                        <Avatar
                            style={styles.avatar}
                            size={size}
                            user={{code: 2, name: 'abc'}}
                        />
                    </View>
                    <Text style={styles.label}>
                        {'图片头像'}
                    </Text>
                    <View style={styles.container}>
                        <Avatar
                            style={styles.avatar}
                            size={size}
                            user={{
                                code: 3,
                                name: '白宇东',
                                avatar: 'https://paas-migration-attachments.oss-cn-beijing.aliyuncs.com/filemanage/photoFiles/2019/8/v1907/c239/c239_20190802165955255.jpg'
                            }}
                        />
                    </View>
                    <Text style={styles.label}>
                        {'群头像'}
                    </Text>
                    <View style={styles.container}>
                        <Avatar
                            style={styles.avatar}
                            size={size}
                            user={{code: 4, name: '白宇东'}}
                        />
                        <Avatar
                            style={styles.avatar}
                            size={size}
                            user={{code: 5, name: '白宇东'}}
                        />
                        <Avatar
                            style={styles.avatar}
                            size={size}
                            user={{code: 6, name: '白宇东'}}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </Fragment>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    container: {
        marginTop: 8,
        paddingHorizontal: 24,
        flexDirection: 'row',
    },
    label: {
        fontSize: 18,
        color: Colors.black,
        marginTop: 16,
        marginLeft: 16
    },
    avatar: {marginHorizontal: 8}
});

export default App;
