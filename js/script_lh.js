// Lấy tên file hiện tại từ URL
const currentPage = window.location.pathname.split("/").pop();

// Lấy tham chiếu đến các mục menu
const trangChu = document.getElementById("trang-chu");
const sanPham = document.getElementById("san-pham");
const gioHang = document.getElementById("gio-hang");
const lienHe = document.getElementById("lien-he");

// Xác định trang hiện tại và thêm lớp "active"
if (currentPage === "index.html" || currentPage === "") {
    // Kiểm tra index.html hoặc trang chủ (/)
    trangChu.classList.add("active");
} else if (currentPage === "sanpham.html") {
    sanPham.classList.add("active");
} else if (currentPage === "giohang.html") {
    gioHang.classList.add("active");
} else if (currentPage === "lienhe.html") {
    lienHe.classList.add("active");
}

// Slider (kiểm tra sự tồn tại của các phần tử)
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
let currentSlide = 0;

if (slides.length > 0 && prevBtn && nextBtn) {
    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add("active");
            } else {
                slide.classList.remove("active");
            }
        });
    }
}