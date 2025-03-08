document.addEventListener("DOMContentLoaded", function () {
  const cartTableBody = document.getElementById("cart-items");
  const cartTotal = document.getElementById("total-price");
  const clearCartButton = document.getElementById("clear-cart");
  const placeOrderButton = document.getElementById("place-order");
  const selectAllContainer = document.getElementById("select-all-container");
  const selectAllCheckbox = document.getElementById("select-all");
  const notification = document.getElementById("notification");

  const confirmOverlay = document.getElementById("confirm-overlay");
  const confirmDialog = document.getElementById("confirm-dialog");
  const confirmOk = document.getElementById("confirm-ok");
  const confirmCancel = document.getElementById("confirm-cancel");

  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    cartTableBody.innerHTML = "";
    let total = 0;

    if (cartItems.length === 0) {
      document.querySelector("#cart-table thead").style.display = "none";
      cartTotal.textContent = "0 VNĐ";
      cartTableBody.innerHTML = `<tr><td colspan="8" class="empty-cart"> Chưa có sản phẩm nào trong giỏ hàng!</td></tr>`;
      selectAllContainer.style.display = "none";
      return;
    } else {
      document.querySelector("#cart-table thead").style.display =
        "table-header-group";
      selectAllContainer.style.display = "block";
    }

    cartItems.forEach((item, index) => {
      let itemPrice = parseFloat(item.price) || 0;
      let itemTotal = item.quantity * itemPrice;

      const row = document.createElement("tr");
      row.innerHTML = `
                <td><input type="checkbox" class="select-item" data-index="${index}"></td>
                <td><img src="${item.image}" alt="${
        item.name
      }" class="cart-img"></td>
                <td>${item.name}</td>
                <td>${item.color}</td>
                <td>
                    <button class="qty-btn decrease" data-index="${index}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="qty-btn increase" data-index="${index}">+</button>
                </td>
                <td>${itemPrice.toLocaleString()} VNĐ</td>
                <td class="item-total">${itemTotal.toLocaleString()} VNĐ</td>
                <td><button class="remove-item" data-index="${index}">❌</button></td>
            `;
      cartTableBody.appendChild(row);
    });

    updateTotal();
    addEventListeners();
  }

  function updateTotal() {
    let total = 0;
    document.querySelectorAll(".select-item:checked").forEach((checkbox) => {
      let index = parseInt(checkbox.dataset.index);
      let item = cartItems[index];
      total += item.price * item.quantity;
    });

    cartTotal.textContent =
      total > 0 ? `${total.toLocaleString()} VNĐ` : "0 VNĐ";
  }

  function increaseQuantity(index) {
    cartItems[index].quantity++;
    updateCart();
  }

  function decreaseQuantity(index) {
    if (cartItems[index].quantity > 1) {
      cartItems[index].quantity--;
    } else {
      cartItems.splice(index, 1);
    }
    updateCart();
  }

  function removeItem(index) {
    cartItems.splice(index, 1);
    updateCart();
  }

  function showNotification(message) {
    notification.textContent = message;
    notification.style.display = "block";
    setTimeout(() => {
      notification.style.display = "none";
    }, 2000);
  }

  clearCartButton.addEventListener("click", () => {
    if (cartItems.length === 0) {
      showNotification("Giỏ hàng của bạn đã trống!");
      return;
    }

    confirmOverlay.style.display = "block";
    confirmDialog.style.display = "block";
  });

  confirmOk.addEventListener("click", () => {
    cartItems = [];
    updateCart();
    confirmDialog.style.display = "none";
    confirmOverlay.style.display = "none";
    showNotification("✅ Giỏ hàng đã được xóa!");
  });

  confirmCancel.addEventListener("click", () => {
    confirmDialog.style.display = "none";
    confirmOverlay.style.display = "none";
  });

  function getSelectedItems() {
    let selectedItems = [];
    document.querySelectorAll(".select-item:checked").forEach((checkbox) => {
      let index = parseInt(checkbox.dataset.index);
      selectedItems.push(cartItems[index]);
    });
    return selectedItems;
  }

  placeOrderButton.addEventListener("click", () => {
    const selectedItems = getSelectedItems();

    if (selectedItems.length === 0) {
      showNotification("⚠️ Vui lòng chọn ít nhất một sản phẩm để đặt hàng!");
      return;
    }

    document.getElementById("order-form-container").style.display = "flex";
  });

  document.getElementById("order-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const customerName = document.getElementById("customer-name").value;
    const customerPhone = document.getElementById("customer-phone").value;
    const customerAddress = document.getElementById("customer-address").value;

    if (!customerName || !customerPhone || !customerAddress) {
      showNotification("⚠️ Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const selectedItems = getSelectedItems();
    const totalPayment = selectedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    showNotification(
      `✅ Đơn hàng đã được đặt thành công! Tổng tiền: ${totalPayment.toLocaleString()} VNĐ.`
    );

    cartItems = cartItems.filter(
      (item, index) => !selectedItems.includes(cartItems[index])
    );
    localStorage.setItem("cart", JSON.stringify(cartItems));

    document.getElementById("order-form-container").style.display = "none";
    renderCart();
  });

  document.getElementById("cancel-order").addEventListener("click", () => {
    document.getElementById("order-form-container").style.display = "none";
  });

  function updateCart() {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    renderCart();
  }

  function addEventListeners() {
    document.querySelectorAll(".increase").forEach((btn) => {
      btn.addEventListener("click", () => increaseQuantity(btn.dataset.index));
    });

    document.querySelectorAll(".decrease").forEach((btn) => {
      btn.addEventListener("click", () => decreaseQuantity(btn.dataset.index));
    });

    document.querySelectorAll(".remove-item").forEach((btn) => {
      btn.addEventListener("click", () => removeItem(btn.dataset.index));
    });

    selectAllCheckbox.addEventListener("change", function () {
      document
        .querySelectorAll(".select-item")
        .forEach((checkbox) => (checkbox.checked = this.checked));
      updateTotal();
    });

    document.querySelectorAll(".select-item").forEach((checkbox) => {
      checkbox.addEventListener("change", updateTotal);
    });
  }

  renderCart();
});
