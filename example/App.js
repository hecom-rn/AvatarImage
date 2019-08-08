/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from 'react';
import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';

import { Colors, } from 'react-native/Libraries/NewAppScreen';
import Avatar from '@hecom/image-avatar'

const size = 88;
const colors = ['#3EAAFF', '#47C2E7', '#FD6364', '#FDC63F', '#BEE15D', '#28D9C1', '#FF9D50'];
let basicFontSize = 0;
const renderItem = (user) => {
    if (user.avatar) {
        return (
            <Image source={{uri: user.avatar}} />
        );
    } else {
        let text;
        if (/[\u4e00-\u9fa5]/.test(user.name)) {
            const matchs = user.name.match(/[\u4e00-\u9fa5]/g);
            text = matchs[matchs.length - 1];
        } else {
            text = user.name.charAt(0);
        }
        return (
            <View
                style={[{
                    backgroundColor: colors[Number(user.code) % colors.length],
                    alignItems: 'center',
                    justifyContent: 'center',
                }]}
            >
                <Text style={{color: 'white', fontSize: size * 0.618}}>
                    {text || '?'}
                </Text>
            </View>
        );
    }
};

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
                            style={[styles.avatar]}
                            size={size}
                            renderAvatar={renderItem}
                            users={[{code: 1, name: '白宇东'}]}
                        />
                        <Avatar
                            style={styles.avatar}
                            size={size}
                            renderAvatar={renderItem}
                            users={[{code: 2, name: 'abc'}]}
                        />
                    </View>
                    <Text style={styles.label}>
                        {'图片头像'}
                    </Text>
                    <View style={styles.container}>
                        <Avatar
                            style={styles.avatar}
                            size={size}
                            renderAvatar={renderItem}
                            users={[{
                                code: 3,
                                name: '白宇东',
                                avatar: 'https://paas-migration-attachments.oss-cn-beijing.aliyuncs.com/filemanage/photoFiles/2019/8/v1907/c239/c239_20190802165955255.jpg'
                            }]}
                        />
                    </View>
                    <Text style={styles.label}>
                        {'群头像'}
                    </Text>
                    <View style={styles.container}>
                        <Avatar
                            style={styles.avatar}
                            size={size}
                            renderAvatar={renderItem}
                            numberOfSides={5}
                            users={[{code: 4, name: '白宇东'}, {
                                code: 3,
                                name: '白宇东',
                                avatar: 'https://paas-migration-attachments.oss-cn-beijing.aliyuncs.com/filemanage/photoFiles/2019/8/v1907/c239/c239_20190802165955255.jpg'
                            }]}
                        />
                        <Avatar
                            style={styles.avatar}
                            size={size}
                            renderAvatar={renderItem}
                            numberOfSides={7}
                            users={[{code: 5, name: '白宇东'}, {
                                code: 3,
                                name: '白宇东',
                                avatar: 'https://paas-migration-attachments.oss-cn-beijing.aliyuncs.com/filemanage/photoFiles/2019/8/v1907/c239/c239_20190802165955255.jpg'
                            }, {code: 7, name: '白宇东'}]}
                        />
                        <Avatar
                            style={styles.avatar}
                            size={size}
                            renderAvatar={renderItem}
                            users={[{code: 6, name: '白宇东'}, {
                                code: 3,
                                name: '白宇东',
                                avatar: 'https://paas-migration-attachments.oss-cn-beijing.aliyuncs.com/filemanage/photoFiles/2019/8/v1907/c239/c239_20190802165955255.jpg'
                            }, {code: 8, name: '白宇西'}, {code: 9, name: 'ccc'}, {code: 10, name: 'ddd'}, {
                                code: 11,
                                name: 'eee'
                            }]}
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
