import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { width } from '../util/dimensions';

const styles = StyleSheet.create({
    toggle: {
        borderWidth: 1.5,
        justifyContent: 'center',
    },
    toggleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    toggleCircle: {},
});

class Toggle extends React.Component {
    static propTypes = {
        bodyColor: PropTypes.string.isRequired,
        primaryColor: PropTypes.string.isRequired,
        active: PropTypes.bool.isRequired,
        scale: PropTypes.number,
    };

    static defaultProps = {
        size: 1,
    };

    render() {
        const { active, primaryColor, bodyColor, scale } = this.props;
        const size = width * scale;
        return (
            <View style={[styles.toggleContainer, { width: size / 12, height: size / 12 }]}>
                <View
                    style={[
                        styles.toggle,
                        {
                            alignItems: active ? 'flex-end' : 'flex-start',
                            borderColor: bodyColor,
                            width: size / 13,
                            height: size / 22,
                            borderRadius: size / 30,
                            paddingHorizontal: size / 300,
                        },
                    ]}
                >
                    <View
                        style={[
                            styles.toggleCircle,
                            {
                                backgroundColor: primaryColor,
                                width: size / 33,
                                height: size / 33,
                                borderRadius: size / 33,
                            },
                        ]}
                    />
                </View>
            </View>
        );
    }
}

export default Toggle;
