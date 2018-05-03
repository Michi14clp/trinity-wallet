import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import tinycolor from 'tinycolor2';
import GENERAL from '../theme/general';
import { width, height } from '../utils/dimensions';

const styles = StyleSheet.create({
    buttonsContainer: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    leftButton: {
        borderWidth: 1.2,
        borderRadius: GENERAL.borderRadius,
        height: height / 14,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    rightButton: {
        borderWidth: 1.2,
        borderRadius: GENERAL.borderRadius,
        height: height / 14,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    leftText: {
        fontFamily: 'SourceSansPro-Light',
        fontSize: width / 24.4,
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
    rightText: {
        fontFamily: 'SourceSansPro-Light',
        fontSize: width / 24.4,
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
});

/** Onboarding buttons component */
class OnboardingButtons extends PureComponent {
    static propTypes = {
        /** Button width */
        buttonWidth: PropTypes.object,
        /** Component container width */
        containerWidth: PropTypes.object,
        /** Theme settings */
        theme: PropTypes.object.isRequired,
        /** Buttons opacity */
        opacity: PropTypes.number,
        /** Id for automated screenshots */
        leftButtonTestID: PropTypes.string,
        /** Id for automated screenshots */
        rightButtonTestID: PropTypes.string,
        /** Children content for button on left */
        leftText: PropTypes.string.isRequired,
        /** Children content for button on right */
        rightText: PropTypes.string.isRequired,
        /** Press event callback function for button on left */
        onLeftButtonPress: PropTypes.func.isRequired,
        /** Press event callback function for button on right */
        onRightButtonPress: PropTypes.func.isRequired,
    };

    static defaultProps = {
        buttonWidth: { width: width / 2.7 },
        containerWidth: { width: width / 1.2 },
    };

    render() {
        const { theme: { primary, secondary, body }, opacity, buttonWidth, containerWidth } = this.props;
        const isBgLight = tinycolor(body.bg).isLight();
        const rightTextColor = { color: isBgLight ? body.color : primary.color };
        const rightBorderColor = { borderColor: isBgLight ? 'transparent' : primary.color };
        const leftTextColor = { color: secondary.color };
        const leftBorderColor = { borderColor: secondary.color };
        const rightButtonOpacity = { opacity };
        const rightBackgroundColor = { backgroundColor: isBgLight ? primary.color : 'transparent' };

        return (
            <View style={[styles.buttonsContainer, containerWidth]}>
                <TouchableOpacity onPress={() => this.props.onLeftButtonPress()} testID={this.props.leftButtonTestID}>
                    <View style={[styles.leftButton, buttonWidth, leftBorderColor]}>
                        <Text style={[styles.leftText, leftTextColor]}>{this.props.leftText}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.onRightButtonPress()} testID={this.props.rightButtonTestID}>
                    <View
                        style={[
                            styles.rightButton,
                            buttonWidth,
                            rightBorderColor,
                            rightButtonOpacity,
                            rightBackgroundColor,
                        ]}
                    >
                        <Text style={[styles.rightText, rightTextColor]}>{this.props.rightText}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    theme: state.settings.theme,
});

export default connect(mapStateToProps)(OnboardingButtons);
