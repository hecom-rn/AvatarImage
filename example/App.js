/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Colors, } from 'react-native/Libraries/NewAppScreen';
import Avatar from '@hecom/image-avatar'

const size = 120;
const radius = 10;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {users: []};
    }

    componentDidMount() {
        this.resetUser();
    }

    render() {
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
                                radius={radius}
                                borderEnable={true}
                                users={[{code: 1, name: '白宇东'}]}
                            />
                            <Avatar
                                style={styles.avatar}
                                radius={radius}
                                size={size}
                                borderEnable={true}
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
                                borderEnable={true}
                                radius={radius}
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
                                size={48}
                                radius={48/10}
                                users={[{code: 4, name: '白宇东'}, {
                                    code: 3,
                                    name: '白宇东',
                                    avatar: 'https://paas-migration-attachments.oss-cn-beijing.aliyuncs.com/filemanage/photoFiles/2019/8/v1907/c239/c239_20190802165955255.jpg'
                                }]}
                            />
                            <Avatar
                                style={styles.avatar}
                                size={56}
                                radius={56/10}
                                users={[{code: 5, name: '白宇东'}, {
                                    code: 3,
                                    name: '白宇东',
                                    avatar: 'https://paas-migration-attachments.oss-cn-beijing.aliyuncs.com/filemanage/photoFiles/2019/8/v1907/c239/c239_20190802165955255.jpg'
                                }, {code: 7, name: '白宇东'}]}
                            />
                            <Avatar
                                style={styles.avatar}
                                size={36}
                                radius={36/10}
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
                        <Text style={styles.label}>
                            {'动态添加'}
                        </Text>
                        <View style={styles.container}>
                            <Avatar
                                style={styles.avatar}
                                radius={radius}
                                size={size}
                                users={this.state.users}
                            />
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity style={styles.button} onPress={this.addUser}>
                                <Text>
                                    {'添加一个User'}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={this.resetUser}>
                                <Text>
                                    {'重置User'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </Fragment>
        );
    }

    addUser = () => {
        this.setState({users: [...this.state.users, {name: 'aaa', code: 8}]})
    }
    resetUser = () => {
        this.setState({users: [{name: 'aaa', code: 8}]})
    }
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.white,
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
    avatar: {marginLeft: 20},
    button: {height: 48, justifyContent: 'center', alignItems: 'center', flex: 1}
});

export default App;
