import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import { setNewSeedName } from 'actions/seeds';
import { generateAlert } from 'actions/alerts';

import Infobox from 'ui/components/Info';
import Button from 'ui/components/Button';
import Input from 'ui/components/input/Text';

/**
 * Onboarding, set account name
 */
class AccountName extends React.PureComponent {
    static propTypes = {
        /** Current seed count */
        seedCount: PropTypes.number.isRequired,
        /** Set new seed name */
        setNewSeedName: PropTypes.func.isRequired,
        /** Browser history object */
        history: PropTypes.object.isRequired,
        /** Create a notification message
         * @param {String} type - notification type - success, error
         * @param {String} title - notification title
         * @param {String} text - notification explanation
         * @ignore
         */
        generateAlert: PropTypes.func.isRequired,
        /** Translation helper
         * @param {string} translationString - locale string identifier to be translated
         * @ignore
         */
        t: PropTypes.func.isRequired,
    };

    state = {
        name: this.getDefaultAccountName(),
    };

    getDefaultAccountName() {
        const { t, seedCount } = this.props;
        if (seedCount === 0) {
            return t('global:mainWallet');
        } else if (seedCount === 1) {
            return t('global:secondWallet');
        } else if (seedCount === 2) {
            return t('global:thirdWallet');
        } else if (seedCount === 3) {
            return t('global:fourthWallet');
        } else if (seedCount === 4) {
            return t('global:fifthWallet');
        } else if (seedCount === 5) {
            return t('global:sixthWallet');
        } else if (seedCount === 6) {
            return t('global:otherWallet');
        }
        return '';
    }

    setName = (e) => {
        e.preventDefault();
        const { setNewSeedName, history, generateAlert, t } = this.props;
        const { name } = this.state;
        if (!name.length) {
            generateAlert('error', t('addAdditionalSeed:noNickname'), t('addAdditionalSeed:noNicknameExplanation'));
            return;
        }

        setNewSeedName(this.state.name);
        history.push('/onboarding/account-password');
    };

    render() {
        const { t } = this.props;
        const { name } = this.state;
        return (
            <form onSubmit={this.setName}>
                <div />
                <section>
                    <Input
                        value={name}
                        label={t('addAdditionalSeed:accountName')}
                        onChange={(value) => this.setState({ name: value })}
                    />
                    <Infobox>
                        <p>{t('setSeedName:canUseMultipleSeeds')}</p>
                    </Infobox>
                </section>
                <footer>
                    <Button to="/seed/enter" className="outline" variant="secondary">
                        {t('global:back')}
                    </Button>
                    <Button type="submit" className="outline" variant="primary">
                        {t('global:next')}
                    </Button>
                </footer>
            </form>
        );
    }
}

const mapStateToProps = (state) => ({
    seedCount: state.account.seedNames.length,
});

const mapDispatchToProps = {
    generateAlert,
    setNewSeedName,
};

export default translate()(connect(mapStateToProps, mapDispatchToProps)(AccountName));
