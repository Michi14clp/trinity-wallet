import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Header from './Header';
import Button from '../UI/Button';
import ButtonLink from '../UI/ButtonLink';
import LanguageSelect from 'components/UI/LanguageSelect';
import css from '../Layout/Onboarding.css';

export default translate('setLanguage')(class Welcome extends React.PureComponent {

    static propTypes = {
        t: PropTypes.func.isRequired,
    }

    render() {
        const { t } = this.props;
        return (
            <div>
                <Header headline="Hello / Salut / Hola / Hallo" />
                <main>
                    <div className={css.formGroup}>
                        <label>{t('dropdown_title')}</label>
                        <LanguageSelect />
                    </div>
                </main>
                <footer>
                    <ButtonLink to="/test">
                        TEST
                    </ButtonLink>
                    <Button variant="success">
                        {t('button1')}
                    </Button>
                </footer>
            </div>
        );
    }
});
