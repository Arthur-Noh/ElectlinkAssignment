import { typography } from './typography';
import { white, black, gray, primary } from './palette';
import { scaler } from '../../helpers/scaler';

const colors = {
    white,
    black,
    gray,
    primary,
};

const base = {
    smallPadding: scaler(12),
    mediumPadding: scaler(18),
    largePadding: scaler(24),
    smallRadius: scaler(4),
    mediumRadius: scaler(8),
    largeRadius: scaler(12),
};

export default {
    colors,
    base,
    typography,
};