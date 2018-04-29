$(document).ready(function() {
    let getAllProductURL = 'http://localhost/products-api/api/product/read_all_products.php';
    let createProductURL = 'http://localhost/products-api/api/product/create_product.php';
    let updateProductURL = 'http://localhost/products-api/api/product/update_product.php';

    let getAllCategoryURL = 'http://localhost/products-api/api/category/read_all_categories.php';

    // Redirect to products.html page
    $('#viewProducts').on('click', function(e) {
        e.preventDefault();

        let url = $(this).data('target');
        console.log(url);

        location.replace(url);
    });

    // Get all products
    function getProducts() {
        $.ajax({
            url: getAllProductURL
        }).done(function(products) {
            let result_1 = '';
            let result_2 = '';

            $.each(JSON.parse(products), function(key, product) {
                // console.log(product);
                result_1 += `
                    <a class="list-group-item list-group-item-action" id="list-${
                        product['id']
                    }-list" href="#list-${product['id']}" data-toggle="list">${
                    product['name']
                }</a>
                `;

                result_2 += `
                    <div class="tab-pane fade" id="list-${
                        product['id']
                    }" role="tabpanel">
                        <div class="card">
                            <div class="card-body">
                                <table class="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <th scope="row">Product Name</th>
                                            <td>${product['name']}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Description</th>
                                            <td>${product['description']}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Price</th>
                                            <td>$${product['price']}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Category</th>
                                            <td>${product['category_name']}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div class="d-flex justify-content-between">
                                    <a href="#" class="btn btn-success" data-toggle="modal" data-target="#editModal-${
                                        product['id']
                                    }">Edit</a>
                                    <a href="#" class="btn btn-danger">Delete</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="modal" id="editModal-${product['id']}">
                        <div class="modal-dialog">
                            <div class="modal-content">

                                <div class="modal-header">
                                    <h2 class="modal-title">Edit Product</h2>
                                    <button class="close" data-dismiss="modal">&times;</button>
                                </div>

                                <div class="modal-body">
                                    <form method="POST" id="updateForm">
                                        <input type="hidden" value="${
                                            product['id']
                                        }" id="id">
                                        <div class="form-group">
                                            <label for="name">Product Name</label>
                                            <input type="text" class="form-control" id="name" value="${
                                                product['name']
                                            }">
                                        </div>
                                        <div class="form-group">
                                            <label for="name">Description</label>
                                            <input type="text" class="form-control" id="description" value="${
                                                product['description']
                                            }">
                                        </div>
                                        <div class="form-group">
                                            <label for="name">Price</label>
                                            <input type="text" class="form-control" id="price" value="${
                                                product['price']
                                            }">
                                        </div>
                                        <div class="form-group">
                                            <label for="name">Category</label>
                                            <select class="form-control select-options" id="category_id">

                                            </select>
                                        </div>
                                        <div>
                                            <button type="submit" class="btn btn-primary">Update</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
            $('.products-1').append(result_1);
            $('.products-2').append(result_2);

            // getCategories()
        });
    }

    // Get Categories
    function getCategories() {
        $.ajax({
            url: getAllCategoryURL
        }).done(function(categories) {
            let categories_options = '';

            $.each(JSON.parse(categories), function(key, category) {
                // console.log(category);

                categories_options += `
                    <option class="category-id" value="${category['id']}">${
                    category['name']
                }</option>
                `;
            });
            $('.select-options').append(categories_options);
        });
    }

    // Update a single product
    $('body').on('submit', '#updateForm', function(e) {

        e.preventDefault();
        let data = $(this).parent()["0"].children.updateForm;
        // console.log(data);
        // console.log(data["4"].value);

        let id = data["0"].value;
        let name = data["1"].value;
        let description = data["2"].value;
        let price = data["3"].value;
        let category_id = data["4"].value;

        $.ajax({
            method: 'POST',
            url: updateProductURL,
            data: {
                id: id,
                name: name,
                description: description,
                price: price,
                category_id: category_id
            }
        }).done(function(data) {
            console.log(data);
            location.reload();
        });
    });

    $('body').on('submit', '#addNewProductForm', function(e) {
        e.preventDefault();

        let data = $(this).parent()["0"].children.addNewProductForm;
        console.log(data);
        let name = data["0"].value;
        let description = data["1"].value;
        let price = data["2"].value;
        let category_id = data["3"].value;

        console.log(name);

        $.ajax({
            method: 'POST',
            url: createProductURL,
            data: {
                name: name,
                description: description,
                price: price,
                category_id: category_id
            }
        }).done(function(data) {
            console.log(data);
            location.reload();
        });
    })

    getProducts();

    getCategories();
});