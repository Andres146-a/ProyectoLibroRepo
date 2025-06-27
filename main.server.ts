import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './src/app/app';
import { config } from './src/app/app.config.server';

import editorialRoutes from './backend/src/routes/editorial.routes';

const bootstrap = () => bootstrapApplication(App, config);




export { bootstrap };
