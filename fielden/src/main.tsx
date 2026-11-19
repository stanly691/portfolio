import React from 'react';
import {createRoot} from 'react-dom/client';
import '@fontsource/barlow-condensed/latin-600.css';
import '@fontsource/barlow-condensed/latin-700.css';
import '@fontsource/space-grotesk/latin-400.css';
import '@fontsource/space-grotesk/latin-500.css';
import Storefront from './Storefront';
import './brand.css';
createRoot(document.getElementById('root')!).render(<React.StrictMode><Storefront/></React.StrictMode>);
