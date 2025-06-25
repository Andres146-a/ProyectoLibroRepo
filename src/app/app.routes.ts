import { Routes } from '@angular/router';
import { LibroComponent } from './views/libro/libro.component';
import { AutorComponent } from './views/autor/autor.component';
import { EditorialComponent } from './views/editorial/editorial/editorial.component';
import { FacturaComponent } from './views/factura/factura/factura.component';

export const routes: Routes = [
  { path: '', redirectTo: 'libro', pathMatch: 'full' },
  { path: 'libro', component: LibroComponent },
  { path: 'autor', component: AutorComponent },
  { path: 'editorial', component: EditorialComponent },
  { path: 'factura', component: FacturaComponent }
];
