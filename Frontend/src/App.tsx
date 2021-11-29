import React, {useState, useEffect, ReactChildren, ReactNode} from 'react';
import {Badge, createTheme, ThemeProvider} from "@mui/material";
import {BrowserRouter as Router, Switch, Route, Link, Redirect, useLocation, matchPath} from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import RoomIcon from "@mui/icons-material/Room";
import AssignmentIcon from "@mui/icons-material/Assignment";
import NatureIcon from "@mui/icons-material/Nature";
import './App.css';
import Layout from './_layouts/defaultLayout';
import Home from './pages/home';
import PlantsList from './pages/plantsList';
import Map from './pages/map';
import Tasks from "./pages/tasks";
import {userStore} from "./stores/user";
import StartScreen from './pages/startScreens/startScreen';
import StartSelectPlant from './pages/startScreens/selectPlant';
import SelectAvatar from './pages/startScreens/selectAvatar';
import StartLastStep from "./pages/startScreens/startLastStep";
import SignupStepOne from './pages/register/SignupStepOne';
import firstVisit from './stores/firstVisit';
import SignupPrivacyPolicy from "./pages/register/SignupPrivacyPolicy";
import {OverviewIcon} from "./components/svgs/svgIcons";

require('dotenv').config();




function App() {
    const [checkFirstVisit,setCheckFirstVisit] = useState<boolean>(new firstVisit().isFirstVisit());
    const [notificationVisibility, setNotificationVisibility] = useState(false);
    const [user, setUser] = useState(new userStore());
    const [useAlt, setUseAlt] = useState(false);

    let notificationIcon = <Badge color="primary" variant="dot" invisible={notificationVisibility}><AssignmentIcon /></Badge>

    /**
     * This controls the navbar links
     */
    const navbarLinks = [
        {name:"Home", link: "/", icon:<HomeIcon/>, number:0},
        {name:"Tasks", link: "/tasks", icon:notificationIcon, number: 1},
        {name:"Map", link: "/map", icon:<RoomIcon />, number: 2},
        {name:"Overview", link: "/Plants", icon:<OverviewIcon backgroundFill={"#62851A"} />, number: 3}
    ]

    /*
    * This constant controls the routes of the app.
    * */
    const routes = [
        //{component:<PlantsList />, name:"Testpage", link: "/", exact:true},
        {component:<Home user={userStore.getUser()}/>, name:"My Plant", link: "/", exact:true},
        {component:<Tasks />, name:"Tasks", link: "/tasks", exact:true},
        {component:<Map />, name:"Map", link: "/map", exact:true},
        {component:<PlantsList />, name:"Overview", link: "/Plants", exact:true},
        {component:<StartScreen />, name:"Start", link: "/start", exact:true, startScreen: true},
        {component:<StartSelectPlant />, name:"Select Plant", link: "/start/plant", exact:true, startScreen: true},
        {component:<SelectAvatar />, name:"Start", link: "/start/plant/:plant/avatar", exact:true, startScreen: true},
        {component:<StartLastStep />, name:"Start", link: "/start/plant/:plant/avatar/:avatar", exact:true, startScreen: true},

        // Signup pages
        {component:<SignupStepOne />, name:"Signup", link: "/signup/:avatar/:plant", exact:true, startScreen: true},
        {component:<SignupPrivacyPolicy />, name:"Privacy Policy", link: "/signup/privacy", exact:true, startScreen: true},
    ];
    // These pages are using alternative layout
    const altDesign:string[] = [
        "/start",
        "/start/plant",
        "/start/plant/:plant/avatar",
        "/start/plant/:plant/avatar/:avatar",
        "/signup/:avatar/:plant",
        "/signup/privacy"
    ]

    useEffect(() => {
        setUser(new userStore())
        //@ts-ignore
        setCheckFirstVisit(new firstVisit().isFirstVisit())
        console.log(userStore.user)
    }, [userStore.user]);

    interface iWithOrWithoutLayout {
        children: ReactNode | ReactChildren | ReactNode[] | ReactChildren[];
        needsLayout: boolean;
    }

    const [isAlternativeLayout, setAlternativeLayout] = useState(false);

    const currentPage = window.location.href.toString().split(window.location.host)[1]
    //console.log(currentPage)



    useEffect(() => {
        setUseAlt(matchPath(currentPage, altDesign) !== null)
    }, [altDesign, currentPage]);


    return (
    <div className="App">
        <ThemeProvider theme={theme}>
            <Router>
                <Switch>
                    {checkFirstVisit && currentPage === "/" ? <Redirect from="/" to="/start"/> : null}

                    {/* Using matchPath  match the current page to routes and if startScreen is true return true */}
                    <Layout links={navbarLinks} startScreen={useAlt}>


                        {routes.map((route, index:number) => {

                            return <Route
                                key={index}
                                exact={route.exact}
                                path={route.link}>
                                {route.component}
                            </Route>
                        })}
                    </Layout>
                </Switch>
            </Router>
        </ThemeProvider>
    </div>
    );
}


/* Global styles */

const theme = createTheme({
    palette: {
        primary: {
            background: 'rgba(163, 191, 112, 0.15)',
            extraLight: 'rgb(233,238,224)',
            light: '#A3BF70',
            main: '#93B655',
            dark: '#62851A'
        },
        secondary: {
            main: '#1A1B1A',
        },
        error: {
            light: '#FFCBBF',
            main: '#990F0F'
        },
        yellow: {
            light: '#FBF19A',
            main: '#FFEE54',
            dark: '#E1CE21'
        },
        grey: {
            A100: "#FBFBFB"
        }
    },

    typography: {
        h1: {
            fontSize: '1.7rem',
            fontWeight: 'normal',
        },
        h2: {
            fontSize: '1.2rem',
            fontWeight: 400,
            fontStyle: 'normal'
        },
        h3: {
            fontSize: '1.3rem',
            fontWeight: 500,
        },
        h4: {
            fontSize: '1.2rem',
            fontWeight: 500,
        },
        fontFamily: '"Red Hat Display", "Roboto", "Helvetica", "Arial", sans-serif',
    },


    components: {
        MuiCard: {
            defaultProps: {
                style: {
                    borderRadius: '20px'
                }
            }
        },
        MuiPaper: {
            defaultProps: {
                style: {
                    borderRadius: '20px'
                }
            }
        },
        MuiButton: {
            defaultProps: {
                style: {
                    borderRadius: '20px',
                    textTransform: 'unset'
                }
            },
            variants: [
                {
                    props: {variant: 'contained'},
                    style: {
                        textTransform: 'none'
                    }
                },
                {
                    props: {variant: 'outlined'},
                    style: {
                        textTransform: 'none',
                        borderWidth: '2px'
                    }
                }
            ]
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgb(240, 245, 233)',
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: '30px',
                }
            }
        }
    }
})


declare module '@mui/material/styles' {
    interface Palette {
        yellow: Palette['primary'];
    }
    interface PaletteOptions {
        yellow: PaletteOptions['primary'];
    }

    interface PaletteColor {
        darker?: string;
        background?: string;
        extraLight?: string;
    }
    interface SimplePaletteColorOptions {
        darker?: string;
        background?: string;
        extraLight?: string;
    }
}



export default App;
