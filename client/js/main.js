$(document).ready(function() {
    let updateURL =
        'http://localhost/products-api/api/product/update_product.php';

    // Redirect to products.html page
    $('#viewProducts').on('click', function(e) {
        e.preventDefault();

        let url = $(this).data('target');
        console.log(url);

        location.replace(url);
    });

    // getProducts();

    function getProducts() {
        $.ajax({
            url: 'http://localhost/products-api/api/product/read_all_products.php'
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
            url: 'http://localhost/products-api/api/category/read_all_categories.php'
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

    $('body').on('submit', '#updateForm', function(e) {

        e.preventDefault();
        let data = $(this).parent()["0"].children.updateForm;
        console.log(data);
        console.log(data["4"].value);

        let id = data["0"].value;
        let name = data["1"].value;
        let description = data["2"].value;
        let price = data["3"].value;
        let category_id = data["4"].value;

        $.ajax({
            method: 'POST',
            url: updateURL,
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

    // Get values from editModal
    // $('#updateForm').on('submit', function(e) {
    //     e.preventDefault();
    //
    //     let id = $('#id').val();
    //     let name = $('#name').val();
    //     let description = $('#description').val();
    //     let price = $('#price').val();
    //     let category_id = $('#category_id').val();
    //     // console.log(category_id);
    //     // console.log(id, name, description, price, category_id);
    //
    //     // editProduct(id, name, description, price, category_id);
    //
    // $.ajax({
    //     method: 'POST',
    //     url: 'http://localhost/products-api/api/product/update_product.php',
    //     data: {
    //         id: id,
    //         name: name,
    //         description: description,
    //         price: price,
    //         category_id: category_id
    //     }
    // }).done(function(product) {
    //     console.log(data);
    //     // location.reload();
    // });
    // });

    // function editProduct(id, name, description, price, category_id) {
    //     console.log(id, name, description, price, category_id);
    //     $.ajax({
    //         method: 'POST',
    //         url: 'http://localhost/products-api/api/product/update_product.php',
    //         data: {
    //             id: id,
    //             name: name,
    //             description: description,
    //             price: price,
    //             category_id: category_id
    //         }
    //     }).done(function(product) {
    //         // console.log(product);
    //         location.reload();
    //     });
    // }

    getProducts();

    getCategories();
});