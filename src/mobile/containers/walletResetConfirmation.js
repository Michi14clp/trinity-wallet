import toUpper from 'lodash/toUpper';
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Image,
    ImageBackground,
    ScrollView,
    StatusBar,
} from 'react-native';
import Colors from '../theme/Colors';
import Fonts from '../theme/Fonts';
import OnboardingButtons from '../components/onboardingButtons.js';

import { Keyboard } from 'react-native';

import { width, height } from '../util/dimensions';

export default class WalletResetConfirmation extends Component {
    constructor() {
        super();

        this.goBack = this.goBack.bind(this);
        this.requirePassword = this.requirePassword.bind(this);
    }

    navigateTo(url) {
        this.props.navigator.push({
            screen: url,
            navigatorStyle: {
                navBarHidden: true,
                navBarTransparent: true,
                screenBackgroundImageName: 'bg-blue.png',
                screenBackgroundColor: Colors.brand.primary,
            },
            animated: false,
            overrideBackPress: true,
        });
    }

    goBack() {
        this.navigateTo('home');
    }

    requirePassword() {
        this.navigateTo('wallet-reset-require-password');
    }

    render() {
        const { t } = this.props;

        return (
            <ImageBackground source={require('iota-wallet-shared-modules/images/bg-blue.png')} style={styles.container}>
                <StatusBar barStyle="light-content" />
                <View style={styles.topWrapper}>
                    <Image
                        source={require('iota-wallet-shared-modules/images/iota-glow.png')}
                        style={styles.iotaLogo}
                    />
                    <View style={styles.subHeaderWrapper}>
                        <Text style={styles.subHeaderText}>{toUpper('this action cannot be undone.')}</Text>
                    </View>
                </View>
                <View style={styles.midWrapper}>
                    <View style={styles.infoTextWrapper}>
                        <Image source={require('iota-wallet-shared-modules/images/info.png')} style={styles.infoIcon} />
                        <Text style={styles.infoText}>
                            <Text style={styles.infoTextLight}>All your wallet data including your</Text>
                            <Text style={styles.infoTextRegular}> seeds, password</Text>
                            <Text style={styles.infoTextLight}> and</Text>
                            <Text style={styles.infoTextRegular}> other account information</Text>
                            <Text style={styles.infoTextLight}> will be lost.</Text>
                        </Text>
                    </View>
                    <View style={styles.confirmationTextWrapper}>
                        <Text style={styles.confirmationText}>Are you sure you want to continue?</Text>
                    </View>
                </View>
                <View style={styles.bottomWrapper}>
                    <OnboardingButtons
                        onLeftButtonPress={this.goBack}
                        onRightButtonPress={this.requirePassword}
                        leftText={'NO'}
                        rightText={'YES'}
                    />
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#102e36',
    },
    topWrapper: {
        flex: 1.3,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: height / 22,
    },
    midWrapper: {
        flex: 2.4,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: height / 8,
    },
    bottomWrapper: {
        flex: 1.2,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: height / 20,
    },
    subHeaderWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: width / 10,
        paddingTop: height / 15,
    },
    subHeaderText: {
        color: Colors.orangeDark,
        fontFamily: Fonts.secondary,
        fontSize: width / 22.7,
        textAlign: 'center',
        backgroundColor: 'transparent',
    },
    infoTextWrapper: {
        borderColor: Colors.white,
        borderWidth: 1,
        borderRadius: 15,
        width: width / 1.6,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: width / 30,
        paddingVertical: height / 50,
        borderStyle: 'dotted',
    },
    infoText: {
        color: Colors.white,
        fontSize: width / 27.6,
        textAlign: 'center',
        paddingTop: height / 60,
        backgroundColor: 'transparent',
    },
    infoTextLight: {
        fontFamily: Fonts.tertiary,
        fontSize: width / 27.6,
        backgroundColor: 'transparent',
    },
    infoTextRegular: {
        fontFamily: Colors.secondary,
        fontSize: width / 27.6,
        backgroundColor: 'transparent',
    },
    infoIcon: {
        width: width / 20,
        height: width / 20,
    },
    confirmationTextWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: height / 25,
    },
    confirmationText: {
        color: Colors.white,
        fontFamily: Fonts.secondary,
        fontSize: width / 20.7,
        textAlign: 'center',
        paddingTop: height / 40,
        backgroundColor: 'transparent',
    },
    iotaLogo: {
        height: width / 5,
        width: width / 5,
    },
});

WalletResetConfirmation.propTypes = {
    navigator: PropTypes.object.isRequired,
};
