$(document).ready(function() {
    let getAllCategoryURL = "http://localhost/products-api/api/category/read_all_categories.php";
    let createCategoryURL = "http://localhost/products-api/api/category/create_category.php";
    let updateCategoryURL = "http://localhost/products-api/api/category/update_category.php";
    let deleteCategoryURL = "http://localhost/products-api/api/category/delete_category.php";

    // Get all categories
    function getCategories() {
        $.ajax({
            url: getAllCategoryURL
        }).done(function(categories) {
            let result_1 = "";
            let result_2 = "";

            $.each(JSON.parse(categories), function(key, category) {

                result_1 += `
                    <a class="list-group-item list-group-item-action" id="list-${
                        category["id"]
                    }-list" href="#list-${category["id"]}" data-toggle="list">${
                    category["name"]
                }</a>
                `;

                result_2 += `
                    <div class="tab-pane fade" id="list-${
                        category["id"]
                    }"role="tabpanel">
                        <div class="card">
                            <div class="card-body">
                                <table class="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <th scope="row">Category Name</th>
                                            <td>${category["name"]}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Description</th>
                                            <td>${category["description"]}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div class="d-flex justify-content-between">
                                    <a href="#" class="btn btn-success" data-toggle="modal" data-target="#editModal-${
                                        category["id"]
                                    }">Edit</a>
                                    <a href="#" class="btn btn-danger" data-toggle="modal" data-target="#deleteModal-${
                                        category["id"]
                                    }">Delete</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="modal" id="editModal-${category["id"]}">
                        <div class="modal-dialog">
                            <div class="modal-content">

                                <div class="modal-header">
                                    <h2 class="modal-title">Edit Category</h2>
                                    <button class="close" data-dismiss="modal">&times;</button>
                                </div>

                                <div class="modal-body">
                                    <form method="POST" id="updateForm">
                                        <input type="hidden" value="${
                                            category["id"]
                                        }" id="id">
                                        <div class="form-group">
                                            <label for="name">Category Name</label>
                                            <input type="text" class="form-control" id="name" value="${
                                                category["name"]
                                            }">
                                        </div>
                                        <div class="form-group">
                                            <label for="name">Description</label>
                                            <input type="text" class="form-control" id="description" value="${
                                                category["description"]
                                            }">
                                        </div>
                                        <div>
                                            <button type="submit" class="btn btn-primary">Update</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
					</div>

					<div class="modal" id="deleteModal-${category["id"]}">
                        <div class="modal-dialog">
                            <div class="modal-content">

                                <div class="modal-body">
									<div class="text-center py-3" id="deleteCategory">
										<h5>Are you sure you want to delete this category?</h5>
									</div>
									<div class="d-flex justify-content-around">
                                        <input type="hidden" value="${category["id"]}" id="id">
                                        <a href="#" class="btn btn-success" id="delete-btn">Yes</a>
                                        <a href="#" class="btn btn-danger" data-dismiss="modal">No</a>
                                    </div>
                                </div>
                            </div>
                        </div>
					</div>
                `;
            });
            $(".category-1").append(result_1);
            $(".category-2").append(result_2);

        });
    }

    // Update a single category
    $("body").on("submit", "#updateForm", function(e) {
        e.preventDefault();
        let data = $(this).parent()["0"].children.updateForm;
        // console.log(data);
        // console.log(data["4"].value);

        let id = data["0"].value;
        let name = data["1"].value;
        let description = data["2"].value;

        $.ajax({
            method: "POST",
            url: updateCategoryURL,
            data: {
                id: id,
                name: name,
                description: description
            }
        }).done(function(data) {
            console.log(data);
            location.reload();
        });
    });

    // Create new category
    $("body").on("submit", "#addNewCategoryForm", function(e) {
        e.preventDefault();

        let data = $(this).parent()["0"].children.addNewCategoryForm;
        console.log(data);
        let name = data["0"].value;
        let description = data["1"].value;

        console.log(name);

        $.ajax({
            method: "POST",
            url: createCategoryURL,
            data: {
                name: name,
                description: description
            }
        }).done(function(data) {
            console.log(data);
            location.reload();
        });
    });

    // Delete category
    $('body').on('click', '#delete-btn', function(e) {
        e.preventDefault();

        let id = $(this).parent()["0"].children["0"].value;

        $.ajax({
            method: "POST",
            url: deleteCategoryURL,
            data: {
                id: id
            }
        }).done(function(data) {
            console.log(data);
            location.reload();
        })
    })

    getCategories();

});