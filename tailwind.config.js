/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.tsx", "./components/**/*.tsx"],
    theme: {
        extend: {
            fontFamily: {
                inter: ["Inter", "sans-serif"],
                sans: ['var(--font-geist-sans)'],
            },
            fontSize: {
                d1: ["66px", {
                    lineHeight: "84.48px",
                    fontWeight: "700",
                }],
                xxxl: ["59px", {
                    lineHeight: "normal",
                    fontWeight: "700",
                }],
                xxxlMedium: ["56px", {
                    lineHeight: "normal",
                    fontWeight: "500",
                }],
                xxlRegular: ["44px", {
                    lineHeight: "normal",
                    fontWeight: "700",
                }],
                xlRegular: ["32px", {
                    lineHeight: "40px",
                    fontWeight: "600",
                }],
                xlMedium: ["32px", {
                    lineHeight: "40px",
                    fontWeight: "500",
                }],
                xlSemiBold: ["32px", {
                    lineHeight: "40px",
                    fontWeight: "600",
                }],
                xlBold: ["32px", {
                    lineHeight: "40px",
                    fontWeight: "700",
                }],
                xxlBold: ["40px", {
                    lineHeight: "48px",
                    fontWeight: "700",
                }],
                xxxlBold: ["40px", {
                    lineHeight: "48px",
                    fontWeight: "400",
                }],

                title_lg: ["28px", {
                    lineHeight: "40px",
                    fontWeight: "600",
                }],
                title_sm: ["28px", {
                    lineHeight: "normal",
                    fontWeight: "500",
                }],
                ssh: ["26px", {
                    lineHeight: "22px",
                    fontWeight: "700",
                }],
                sh: ["24px", {
                    lineHeight: "22px",
                    fontWeight: "700",
                }],
                title_md: ["24px", {
                    lineHeight: "30px",
                    fontWeight: "600",
                }],
                title_m: ["24px", {
                    lineHeight: "30px",
                    fontWeight: "500",
                }],
                title_sss: ["22px", {
                    lineHeight: "25px",
                    fontWeight: "600",
                }],
                title_ss: ["20px", {
                    lineHeight: "25px",
                    fontWeight: "700",
                }],
                cs: ["20px", {
                    lineHeight: "26px",
                    fontWeight: "600",
                }],
                rcs: ["20px", {
                    lineHeight: "24px",
                    fontWeight: "400",
                }],
                css: ["20px", {
                    lineHeight: "26px",
                    fontWeight: "500",
                }],
                h3: ["18px", {
                    lineHeight: "21px",
                    fontWeight: "700",
                }],
                h4: ["18px", {
                    lineHeight: "21px",
                    fontWeight: "600",
                }],

                h5: ["18px", {
                    lineHeight: "normal",
                    fontWeight: "400",
                }],
                c1: ["18px", {
                    lineHeight: "25px",
                    fontWeight: "500",
                }],
                p: ["16px", {
                    lineHeight: "24px",
                    fontWeight: "600",
                }],
                p1: ["16px", {
                    lineHeight: "27.2px",
                    fontWeight: "500",
                }],
                p2: ["16px", {
                    lineHeight: "23px",
                    fontWeight: "400",
                }],
                p3: ["16px", {
                    lineHeight: "25.6px",
                    fontWeight: "400",
                }],
                xs: ["14px", {
                    lineHeight: "16.8px",
                    fontWeight: "400",
                }],
                xxt: ["13px", {
                    lineHeight: "16px",
                    fontWeight: "600",
                }],
                s: ["14px", {
                    lineHeight: "22.4px",
                    fontWeight: "400",
                }],
                sb: ["14px", {
                    lineHeight: "22px",
                    fontWeight: "600",
                }],
                pt: ["24px", {
                    lineHeight: "30px",
                    fontWeight: "600",
                }],
                ssb: ["14px", {
                    lineHeight: "22px",
                    fontWeight: "500",
                }],
                xxs: ["12px", {
                    lineHeight: "16px",
                    fontWeight: "400",
                }],
            },
            colors: {
                primary: {
                    DEFAULT: 'var(--color-primary-400)',
                    50: 'var(--color-primary-50)',
                    100: 'var(--color-primary-100)',
                    200: 'var(--color-primary-200)',
                    300: 'var(--color-primary-300)',
                    500: 'var(--color-primary-500)',
                    600: 'var(--color-primary-600)',
                    700: 'var(--color-primary-700)',
                    800: 'var(--color-primary-800)',
                    900: 'var(--color-primary-900)',
                },
                success: {
                    DEFAULT: 'var(--color-success)',
                    50: 'var(--color-success-50)',
                    100: 'var(--color-success-100)',
                },
                error: {
                    DEFAULT: 'var(--color-error)',
                    50: 'var(--color-error-50)',
                    100: 'var(--color-error-100)',
                },
                warning: {
                    DEFAULT: 'var(--color-warning)',
                    50: 'var(--color-warning-50)',
                    100: 'var(--color-warning-100)',
                },
                info: {
                    DEFAULT: 'var(--color-info)',
                    50: 'var(--color-info-50)',
                    100: 'var(--color-info-100)',
                },
                secondary: {
                    DEFAULT: 'var(--color-secondary)',
                    main: 'var(--color-secondary-main)',

                },
                secondary2: 'var(--color-secondary2)',
                secondaryText: 'var(--color-text-secondary)',
                secondary3: 'var(--color-secondaryText3)',
                webBorder: 'var(--color-web-border)',
                white: 'var(--color-white)',
                button: {
                    primary: 'var(--color-button-active)',
                    pressed: 'var(--color-button-pressed)',
                    disabled: 'var(--color-button-disabled)',
                    text_disabled: 'var(--color-button-text-disabled)',
                    hover: 'var(--color-button-hover)',
                },
                main: 'var(--color-text-main)',

            },
            boxShadow: {
                xs: 'var(--box-shadow-xs)',
                sm: 'var(--box-shadow-sm)',
                md: 'var(--box-shadow-md)',
                lg: 'var(--box-shadow-lg)',
                xl: 'var(--box-shadow-xl)',
                xxl: 'var(--box-shadow-2xl)',
                auth: 'var(--box-shadow-auth)',
                price: 'var(--box-shadow-price)',
            },

            borderRadius: {
                none: '0',
                sm: '4px',
                md: '8px',
                lg: '12px',
                xl: '16px',
                xxl: '24px',
                full: '9999px',
            },
            screens: {
                searchbar: '880px',

            }
        },
    },
    plugins: [],
}

