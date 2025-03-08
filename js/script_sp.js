document.addEventListener("DOMContentLoaded", function () {
  const viewDetailsButtons = document.querySelectorAll(".view-details");
  const productModal = document.getElementById("product-modal");
  const closeButton = document.querySelector(".close-button");
  const modalImage = document.getElementById("modal-image");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const quantityInput = document.getElementById("product-quantity");
  const increaseQtyBtn = document.getElementById("increase-qty");
  const decreaseQtyBtn = document.getElementById("decrease-qty");
  const addToCartButton = document.querySelector(".add-to-cart");

  let selectedColor = null;

  // ✅ Danh sách sản phẩm (Thêm giá tiền)
  const products = {
    1: {
      image: "images/mayhutbui1.jpg",
      title: "Máy Hút Bụi Thông Minh",
      price: 6100000,
      description:
        "Giải phóng đôi tay khỏi công việc dọn dẹp nhà cửa với Máy Hút Bụi Thông Minh thế hệ mới! Sở hữu lực hút siêu mạnh mẽ, khả năng tự động điều hướng thông minh và hệ thống lọc bụi tiên tiến, sản phẩm này sẽ mang đến cho bạn không gian sống sạch sẽ, trong lành mà không tốn nhiều công sức. Hãy để Máy Hút Bụi Thông Minh trở thành trợ thủ đắc lực, giúp bạn tận hưởng cuộc sống trọn vẹn hơn!",
    },
    2: {
      image: "images/hutbuicamtay.jpg",
      title: "Máy Hút Bụi Cầm Tay",
      price: 5200000,
      description:
        "Nhỏ gọn, tiện lợi và mạnh mẽ - Máy Hút Bụi Cầm Tay chính là giải pháp hoàn hảo cho những khu vực khó tiếp cận! Với công suất 120W ấn tượng, sản phẩm này dễ dàng loại bỏ bụi bẩn, lông thú cưng và các mảnh vụn nhỏ trên bàn làm việc, ghế sofa hay trong xe hơi. Thời lượng pin lên đến 30 phút cho phép bạn thoải mái vệ sinh mà không lo gián đoạn. Máy Hút Bụi Cầm Tay - người bạn đồng hành lý tưởng cho cuộc sống hiện đại!",
    },
    3: {
      image: "images/cmr.jpg",
      title: "Camera Aqara Hub G5 Pro AI",
      price: 900000,
      description:
        "An tâm tuyệt đối với Camera Aqara Hub G5 Pro AI - người bảo vệ tin cậy cho ngôi nhà của bạn! Độ phân giải Full HD 1080p sắc nét, khả năng quan sát góc rộng và công nghệ AI thông minh giúp phát hiện chuyển động, phân biệt người và vật thể, gửi cảnh báo tức thì đến điện thoại của bạn. Tích hợp hub điều khiển nhà thông minh, Aqara Hub G5 Pro AI không chỉ là camera giám sát, mà còn là trung tâm kết nối, mang đến cuộc sống tiện nghi và an toàn.",
    },
    4: {
      image: "images/khoavantay.jpg",
      title: "Khóa Vân Tay BOSCH FU550",
      price: 15100000,
      description:
        "Nâng tầm an ninh cho ngôi nhà với Khóa Vân Tay BOSCH FU550 - sự kết hợp hoàn hảo giữa công nghệ hiện đại và thiết kế sang trọng! Công nghệ nhận diện vân tay siêu nhạy, mở khóa chỉ trong tích tắc, loại bỏ hoàn toàn nỗi lo quên chìa khóa. Chất liệu cao cấp, chống chịu thời tiết, đảm bảo độ bền bỉ theo thời gian. BOSCH FU550 không chỉ là khóa cửa, mà còn là tuyên ngôn về phong cách sống đẳng cấp.",
    },
    5: {
      image: "images/maylockokhi.jpg",
      title: "Máy Lọc Không Khí Xiaomi Air4",
      price: 3990000,
      description:
        "Hít thở bầu không khí trong lành mỗi ngày với Máy Lọc Không Khí Xiaomi Air4! Hệ thống lọc 3 lớp tiên tiến, loại bỏ 99.97% bụi mịn PM2.5, phấn hoa, lông thú cưng và các tác nhân gây dị ứng. Cảm biến thông minh, tự động điều chỉnh chế độ lọc phù hợp với chất lượng không khí. Thiết kế nhỏ gọn, hoạt động êm ái, Xiaomi Air4 mang đến không gian sống trong lành, bảo vệ sức khỏe cho cả gia đình.",
    },
    6: {
      image: "images/chuong_cua_man_hinh.jpg",
      title: "Bộ Chuông Cửa Màn Hình Panasonic",
      price: 7450000,
      description:
        "Chào đón khách đến nhà một cách lịch sự và an toàn với Bộ Chuông Cửa Màn Hình Panasonic! Màn hình LCD 7 inch sắc nét, hiển thị hình ảnh rõ ràng, cho phép bạn quan sát khách đến từ xa. Tích hợp camera hồng ngoại, quan sát tốt ngay cả trong điều kiện thiếu sáng. Chức năng đàm thoại hai chiều giúp bạn trò chuyện với khách mà không cần mở cửa. Panasonic - thương hiệu điện tử hàng đầu Nhật Bản, mang đến sự an tâm và tin cậy.",
    },
    7: {
      image: "images/maysayquanao.jpg",
      title: "Máy Sấy Quần Áo Có Điều Khiển",
      price: 990000,
      description:
        "Quên đi nỗi lo quần áo ẩm mốc trong mùa mưa với Máy Sấy Quần Áo Có Điều Khiển! Công nghệ sấy nhanh, tiết kiệm thời gian, giúp quần áo khô ráo, mềm mại mà không bị nhăn. Nhiều chế độ sấy đa dạng, phù hợp với mọi loại vải. Thiết kế nhỏ gọn, dễ dàng lắp đặt trong không gian nhỏ hẹp. Máy Sấy Quần Áo Có Điều Khiển - giải pháp hoàn hảo cho cuộc sống bận rộn!",
    },
    8: {
      image: "images/ghematxa.jpg",
      title: "Ghế Matxa Toàn Thân",
      price: 9990000,
      description:
        "Tận hưởng cảm giác thư giãn tuyệt vời ngay tại nhà với Ghế Matxa Toàn Thân cao cấp! Công nghệ massage 4D hiện đại, mô phỏng chân thực các động tác massage chuyên nghiệp, giúp xoa dịu cơn đau nhức, giảm căng thẳng, mệt mỏi. Nhiều chế độ massage đa dạng, phù hợp với mọi nhu cầu. Chất liệu da PU cao cấp, êm ái, mang đến trải nghiệm thư giãn tuyệt vời. Ghế Matxa Toàn Thân - món quà ý nghĩa cho sức khỏe và tinh thần!",
    },
  };
  // ⭐ Xử lý khi nhấn vào "Xem chi tiết"
  viewDetailsButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      console.log("🔍 [DEBUG] Sản phẩm được nhấn:", productId);

      const product = products[productId];
      if (!product) {
        console.error("❌ [ERROR] Không tìm thấy sản phẩm với ID:", productId);
        return;
      }

      modalImage.src = product.image;
      modalTitle.textContent = product.title;
      modalDescription.textContent = product.description;

      modalTitle.dataset.productId = productId;

      productModal.style.display = "block";
      quantityInput.value = 1;
      selectedColor = null;

      document
        .querySelectorAll(".color-swatch")
        .forEach((s) => s.classList.remove("selected"));
    });
  });

  // 🛑 Đóng modal khi nhấn nút "X"
  closeButton.addEventListener("click", () => {
    productModal.style.display = "none";
  });

  // 🛑 Đóng modal khi nhấn ra ngoài
  window.addEventListener("click", (event) => {
    if (event.target === productModal) {
      productModal.style.display = "none";
    }
  });

  // 🎨 Xử lý chọn màu sản phẩm
  document.querySelectorAll(".color-swatch").forEach((swatch) => {
    swatch.addEventListener("click", () => {
      document
        .querySelectorAll(".color-swatch")
        .forEach((s) => s.classList.remove("selected"));
      swatch.classList.add("selected");
      selectedColor = swatch.dataset.color;
      console.log("🎨 [DEBUG] Màu đã chọn:", selectedColor);
    });
  });

  // 🔼 Xử lý tăng số lượng
  increaseQtyBtn.addEventListener("click", () => {
    quantityInput.value = parseInt(quantityInput.value) + 1;
  });

  // 🔽 Xử lý giảm số lượng
  decreaseQtyBtn.addEventListener("click", () => {
    if (quantityInput.value > 1) {
      quantityInput.value = parseInt(quantityInput.value) - 1;
    }
  });

  // 🛒 Xử lý khi nhấn "Thêm vào giỏ hàng"
  addToCartButton.addEventListener("click", () => {
    let selectedQty = parseInt(quantityInput.value);
    const productId = modalTitle.dataset.productId;

    console.log("🛒 [DEBUG] Thêm vào giỏ hàng - Product ID:", productId);

    if (!productId) {
      console.error("❌ [ERROR] Không tìm thấy sản phẩm!");
      return;
    }

    if (!selectedColor) {
      showCartToast("⚠️ Vui lòng chọn màu trước khi thêm vào giỏ hàng!");
      return;
    }

    if (selectedQty < 1) {
      showCartToast("⚠️ Số lượng sản phẩm phải lớn hơn 0!");
      return;
    }

    const product = products[productId];

    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    let existingItem = cartItems.find(
      (item) => item.id === productId && item.color === selectedColor
    );

    if (existingItem) {
      existingItem.quantity += selectedQty;
    } else {
      cartItems.push({
        id: productId,
        name: product.title,
        image: product.image,
        color: selectedColor,
        quantity: selectedQty,
        price: product.price, // ✅ Lưu giá đúng từ danh sách sản phẩm
      });
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
    showCartToast(`🛒 Đã thêm ${selectedQty} sản phẩm vào giỏ hàng!`);
  });

  // 🔔 Hiển thị thông báo giỏ hàng
  function showCartToast(message) {
    const toast = document.getElementById("cart-toast");
    const toastMessage = document.getElementById("cart-toast-message");

    if (!toast || !toastMessage) {
      console.error("❌ Không tìm thấy phần tử thông báo!");
      return;
    }

    toastMessage.textContent = message;
    toast.classList.remove("hidden");
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
      toast.classList.add("hidden");
    }, 3000);
  }
});
