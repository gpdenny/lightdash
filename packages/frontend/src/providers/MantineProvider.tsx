import { Colors } from '@blueprintjs/core';
import {
    MantineProvider as MantineProviderBase,
    MantineThemeOverride,
} from '@mantine/core';
import { FC } from 'react';

const themeOverride: MantineThemeOverride = {
    black: Colors.DARK_GRAY1,
    white: Colors.WHITE,

    spacing: {
        xs: 8,
        sm: 12,
        md: 16,
        lg: 20,
        xl: 24,
    },

    fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Oxygen',
        'Ubuntu',
        'Cantarell',
        'Fira Sans',
        'Droid Sans',
        'Open Sans',
        'Helvetica Neue',
        'blueprint-icons-16',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'sans-serif',
    ].join(', '),

    lineHeight: 1.2858142857,

    components: {
        TextInput: {
            styles: (theme, _params) => ({
                label: {
                    // FIXME: this is a hack to fix label position. remove after Blueprint migration is complete
                    // FIXME: size is hardcoded. remove once we add more sizes to the theme
                    marginBottom: theme.spacing.xs / 2,
                },
            }),
        },

        PasswordInput: {
            styles: (theme, _params) => ({
                label: {
                    // FIXME: this is a hack to fix label position. remove after Blueprint migration is complete
                    // FIXME: size is hardcoded. remove once we add more sizes to the theme
                    marginBottom: theme.spacing.xs / 2,
                },
            }),
        },
    },

    globalStyles: () => ({
        body: {
            textTransform: 'none',
            fontSize: '14px',
        },

        p: {
            marginBottom: '10px',
            marginTop: 0,
        },

        small: {
            fontSize: '12px',
        },

        b: {
            fontWeight: 'bold',
        },

        strong: {
            fontWeight: 600,
        },

        a: {
            cursor: 'pointer',
            color: Colors.BLUE2,
            textDecoration: 'none',

            ':hover': {
                color: Colors.BLUE2,
                textDecoration: 'underline',
            },
        },

        ':focus': {
            outline: 'rgba(45, 114, 210, 0.6) solid 2px',
            outlineOffset: '2px',
            '-moz-outline-radius': '6px',
        },
    }),
};

const MantineProvider: FC = ({ children }) => {
    return (
        <MantineProviderBase
            withGlobalStyles
            withNormalizeCSS
            inherit
            withCSSVariables
            theme={themeOverride}
        >
            {children}
        </MantineProviderBase>
    );
};

export default MantineProvider;
