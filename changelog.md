# Changelog

## Task 9
* Add coverage report screenshot.
* Fix tests with missing import.
* Add tests to AppComponent.
* Add tests for order by pipe.
* Add handle error test for products service tests.
* Add tests for products service.
* Add tests for product component.
* Fix tests build issues.

## Task 8
* Add spacing between buttons.
* Add styles to order form.
* Save orders to db.
* Add and remove phones.
* Convert phones to array form control.
* Show delivery address field only if delivery type is byAddress.
* Generate control error messages in class.
* Adjust validation on delivery type change.
* Point app settings type in validate address service.
* Add async validation directive.
* Add async validation to the delivery address field.
* Add custom validators directive with parameters.
* Set name validation on blur event.
* Use string as a delivery date property for order model.
* Convert date to ISO date string using helper.
* Add custom validation for delivery date.
* Add conditional validation for delivery address.
* Use script validation for order form.
* Use form builder to create order form.
* Add validation blocks to input elements in OrderForm component.
* Use reactive form to create order. Update template to use reactive form.

## Task 7
* Use ngrx entity for products state.
* Add get product from url effect and use it on product details component.
* For products add navigation by actions.
* Fix. Get productID param only from the primary outlet.
* Add product selector by url. Use the selector in ProductDetails component.
* Add router state.
* Add products state selectors and use them in components.
* Add products state feature selector.
* Delete product using store.
* Add product with state.
* Go back after product edit on Save button.
* Edit product with effect and store.
* Get product from database via effect.
* Get products from database via effect.
* Modify state through products reducer.
* Add ngrx effects module, ngrx store devtools module.
* Add @ngrx/store package. Add ProductsState, AppState. Use ProductsState in the products list component.

## Task 6
* Fix showing of feedbacks for product details.
* Use AppSettings service to load service either from local storage, server or set default.
* Add timing interceptor for orders requests.
* Use http client to manage orders. Convert methods in OrderService to use Observable.
* Get orders by http request.
* Convert ProductsService to use http client.
* Add JSON server and HttpClientModule to the AppModule.

## Task 5
* Add local storage to work with cart.
* Add login component and protect admin area.
* Add manage order component layout and functionality.
* Add manage orders component layout.
* Add layout and functionality to the manage product component.
* Add empty manage product component.
* Add layout to the ManageProducts component and delete functionality.
* Add admin tabs. Add links from the app component to the admin page.
* Add admin empty modules and components.
* In orders add checkout and cancel functionality.
* Add orders template. Create links. Fill in initial form.
* Add order form component and order service.
* Add confirmation to dialog to the empty cart action.
* Update cart list layout.
* Update cart item component layout.
* Add feedbacks module and its components. Use feedbacks on product details component.
* Add product details component.
* Apply panel markup to the product component. Add to cart is possible from the product component.

## Task 4
* Add sorting to the cart list.
* Add OrderByPipe.
* Use Promise in ProductsService. Update ProductListComponent to use Promise from the service.
* Use pipes to display data:
  - TitleCasePipe for product name.
  - UpperCasePipe for product category.
  - CurrencyPipe for price.
  - Date pipe for product update date.

## Task 3 Update
* Remove ProductsService declaration in ProductsModule as it is duplicate.
* In SharedModule make common declared and exported directives.

## Task 3
* Add click border directive.
* Create ContactUsComponent.
* Organize services and register them in the CoreModule.
* Create GeneratorService and a factory for it.
* Add constants service and use it to provide application information.
* Add ConfigOptionsService.
* Add local storage service.
* In CartService update cart item in general.
* Add CartService subject for items, cart sum, cart count and use them in CartListComponent and ProductListComponent.

## Task 2
* Add not available class to not available product list items.
* Add class highlighted to the elements with appHighlight directive.
* Add highlight directive and apply it to the products list component.
* Add application title to the AppComponent.
* Add OnPush change detection strategy to the CartItemComponent.
* Add quantity change to the cart item component.
* Add cart item component.
* Rename CartComponent to CartListComponent.
* Move cart related models, services, components to the CartModule.
* Move products relates models, services, components to the ProductsModule.
* Create modules for sections Cart, Products, Orders, Core, Shared.

## Task 1
* Add switch between views of products list and cart.
* Add CartComponent, CartService, CartModel. Make add products from products list to cart.
* Add product list component. Use ProductModel in ProductComponent. Use ProductComponent in ProductListComponent.
* Add Buy button to Product component.
* Update product component with mock data.
* Add product component.
* Initial commit for shop project after ng new shop command.
