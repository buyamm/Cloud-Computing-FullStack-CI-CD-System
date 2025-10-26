function showCategories(categories, parentId = 0, char = '') {
    categories.forEach((item, key) => {
        // Nếu là chuyên mục con thì hiển thị
        if (item.parent_id === parentId) {
            console.log('<option value="' + item.id + '">' + char + item.name + '</option>');
            categories.splice(key, 1);
            // Tiếp tục đệ quy để tìm chuyên mục con của chuyên mục đang lặp
            showCategories(categories, item.id, char + '--');
        }
    });
}

// Định nghĩa một mảng các đối tượng chứa thông tin danh mục sản phẩm
const categories = [
    { id: 1, parent_id: 0, name: 'Category 1' },
    { id: 2, parent_id: 0, name: 'Category 2' },
    { id: 3, parent_id: 1, name: 'Subcategory 1' },
    { id: 4, parent_id: 1, name: 'Subcategory 2' },
    { id: 5, parent_id: 3, name: 'Sub-subcategory 1' },
];

// Gọi hàm showCategories với mảng categories
showCategories(categories);