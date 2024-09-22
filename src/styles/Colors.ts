const appPallet = {
    primary: {
        light: '#BEECCE',
        default: '#20BF55',
        darker: '#20BF55AA',
    },
    secondary: {
        light: '#D9D9D9',
        default: '#A0A0A0',
        darker: '#454545',
    },
    onSurface: {
        light: 'grey',
        default: 'black',
    },
    surface: {
        default: '#F7F9FD',
        dark: '#b3ffb3',
    },
    base: {
        white: 'white',
        black: 'black',
    }
}

const lightTheme = {
    border: appPallet.primary.default,
    secondaryBorder: appPallet.secondary.default,
    text: appPallet.onSurface.default,
    placeholder: appPallet.onSurface.light,
    screenBackground: appPallet.surface.default,
    componentScreenBackground: appPallet.primary.darker,
    button: appPallet.primary.default,
    textButton: appPallet.base.white,
    myMessage: appPallet.primary.light,
    theirMessage: appPallet.secondary.light,
    inputBorderMessage: appPallet.secondary.darker,
}

export const Colors = lightTheme