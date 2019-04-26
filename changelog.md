# Changelog

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
