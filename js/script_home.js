// Lấy tên file hiện tại từ URL
const currentPage = window.location.pathname.split("/").pop();

// Lấy tham chiếu đến các mục menu
const trangChu = document.getElementById("trang-chu");
const sanPham = document.getElementById("san-pham");
const gioHang = document.getElementById("gio-hang");
const lienHe = document.getElementById("lien-he");

// Xác định trang hiện tại và thêm lớp "active"
if (currentPage === "index.html" || currentPage === "") {
  // Kiểm tra idex.html hoặc trang chủ (/)
  trangChu.classList.add("active");
} else if (currentPage === "sanpham.html") {
  sanPham.classList.add("active");
} else if (window.location.hash === "giohang.html") {
  gioHang.classList.add("active");
} else if (window.location.hash === "#lien-he") {
  lienHe.classList.add("active");
}
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    if (i === index) {
      slide.classList.add("active");
    } else {
      slide.classList.remove("active");
    }
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

showSlide(currentSlide); // Hiển thị ảnh đầu tiên khi trang web được tải
setInterval(nextSlide, 3000);