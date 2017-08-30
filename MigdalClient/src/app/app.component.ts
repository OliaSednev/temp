import {Component, OnInit} from '@angular/core';
import {CatalogItemService} from './services/catalog.service';
import {CatalogItem} from './models/app.models';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  catalogItems: CatalogItem[];
  constructor(private catalogItemService: CatalogItemService) {
  }

  ngOnInit() {
    this.getCatalogItems();
  }

  getCatalogItems() {
    this.catalogItems = [];
    this.catalogItemService.getCatalogItems().subscribe((data) => {
      this.catalogItems = data;
    });
  }

  addEmptyItem() {
    let emptyItem: CatalogItem = {
      ID: this.catalogItems.length,
      Title: '',
      CreatedBy: '',
      Created: new Date(),
      LastUpdated: new Date()
    };
    this.catalogItems.push(emptyItem);
  }

  addCatalogItem(catalogItem: CatalogItem) {
    let newItem: CatalogItem = {
      ID: catalogItem.ID,
      Title: catalogItem.Title,
      CreatedBy: catalogItem.CreatedBy,
      Created: catalogItem.Created,
      LastUpdated: catalogItem.LastUpdated
    };
    this.catalogItemService.addCatalogItem(newItem).subscribe((data) => {
      this.getCatalogItems();
    });
  }

  deleteCatalogItem(catalogItem: CatalogItem) {
    this.catalogItemService.deleteCatalogItem(catalogItem).subscribe((data) => {
      // toastr.success(`Deleted catalogItem<br/>catalogItem Title: ${catalogItem.Title}<br/>`, 'catalogItem Removed', {timeOut: 5000});
      this.getCatalogItems();
    });
  }

  updateCatalogItem(catalogItem: CatalogItem) {
    catalogItem.LastUpdated = new Date();
    this.catalogItemService.updateCatalogItem(catalogItem).subscribe(() => {
      // toastr.success(`Updated product<br/>Product Name: ${product.Name}<br/>Product Category: ${product.Category}<br/>Product Price: ${product.Price}`, 'Product Updated', {timeOut: 5000});
      this.getCatalogItems();
    });
  }
}
