import isNull from 'lodash/isNull';
import size from 'lodash/size';
import { iota } from './index';

export const MAX_SEED_LENGTH = 81;

export const ADDRESS_LENGTH = 90;

export const VALID_SEED_REGEX = /^[A-Z9]+$/;

export const VALID_ADDRESS_WITH_CHECKSUM_REGEX = /^[A-Z9]{90}$/;

export const convertFromTrytes = (trytes) => {
    const trytesWithoutNines = trytes.replace(/9+$/, '');
    const message = iota.utils.fromTrytes(trytesWithoutNines);

    if (trytesWithoutNines && message) {
        return message;
    }

    return 'Empty';
};

export const getChecksum = (seed) => {
    return iota.utils.addChecksum(seed, 3, false).substr(-3);
};

export const createRandomSeed = (randomBytesFn, length = MAX_SEED_LENGTH) => {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9';
    const bytes = randomBytesFn(100);
    let seed = '';

    if (length > MAX_SEED_LENGTH || length < 1) {
        length = MAX_SEED_LENGTH;
    }

    Object.keys(bytes).forEach((key) => {
        if (bytes[key] < 243 && seed.length < length) {
            const randomNumber = bytes[key] % 27;
            const randomLetter = charset.charAt(randomNumber);
            seed += randomLetter;
        }
    });

    return seed;
};

export const isValidSeed = (seed) => seed.length === MAX_SEED_LENGTH && seed.match(VALID_SEED_REGEX);


export const formatValue = (value) => {
    let negative = false;
    if (value < 0) {
        negative = true;
        value = -value;
    }
    switch (true) {
        case value < 1000:
            break;
        case value < 1000000:
            value /= 1000;
            break;
        case value < 1000000000:
            value /= 1000000;
            break;
        case value < 1000000000000:
            value /= 1000000000;
            break;
        case value < 1000000000000000:
            value /= 1000000000000;
            break;
    }

    if (negative === true) {
        return -value;
    }

    return value;
};

export const formatUnit = (value) => {
    if (value < 0) {
        value = -value;
    }

    switch (true) {
        case value < 1000:
            return 'i';
        case value < 1000000:
            return 'Ki';
        case value < 1000000000:
            return 'Mi';
        case value < 1000000000000:
            return 'Gi';
        case value < 1000000000000000:
            return 'Ti';
    }
};

export function formatIota(value) {
    const iota = formatValue(value);
    const unit = formatUnit(value);
    const formatted = `${iota} ${unit}`;
    return formatted;
}

export const isValidServerAddress = (server) => {
    if (!server.startsWith('http://') && !server.startsWith('https://')) {
        return false;
    }
    
    return true;
};

export const isValidAddress = (address) => {
    if (!isNull(address.match(VALID_SEED_REGEX))) {
        return size(address) === 90 && iota.utils.isValidChecksum(address);
    }

    return false;
};

export const isValidMessage = (message) => {
    return iota.utils.fromTrytes(iota.utils.toTrytes(message)) === message;
};

export const isValidAmount = (amount, multiplier, isFiat = false) => {
    const value = parseFloat(amount) * multiplier;
        // For sending a message
        if (amount === '') {
            return true;
        }

        // Ensure iota value is an integer
        if (!isFiat) {
            if (value % 1 !== 0) {
                return false;
            }
        }

        if (value < 0) {
            return false;
        }

        return !isNaN(amount);

};
