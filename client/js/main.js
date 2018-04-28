$(document).ready(function() {
    // Redirect to products.html page
    $("#viewProducts").on("click", function(e) {
        e.preventDefault();

        let url = $(this).data("target");
        console.log(url);

        location.replace(url);
    });

    getProducts();

    function getProducts() {
        $.ajax({
            url: "http://localhost/products-api/api/product/read_all_products.php"
        }).done(function(products) {

            let result_1 = '';
            let result_2 = '';

            $.each(JSON.parse(products), function(key, product) {
                console.log(product);
                result_1 += `
                    <a class="list-group-item list-group-item-action" id="list-${product['id']}-list" href="#list-${product['id']}" data-toggle="list">${product['name']}</a>
                `;
                result_2 += `
                    <div class="tab-pane fade" id="list-${product['id']}" role="tabpanel">
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
                                    <a href="#" class="btn btn-success">Edit</a>
                                    <a href="#" class="btn btn-danger">Delete</a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
            $('.products-1').append(result_1);
            $('.products-2').append(result_2);
        })
    }
});