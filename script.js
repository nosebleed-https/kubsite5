"use strict";

document.addEventListener("DOMContentLoaded", function () {
    var orderForm = document.getElementById("order-form");
    var productSelect = document.getElementById("product");
    var quantityInput = document.getElementById("quantity");
    var quantityError = document.getElementById("quantity-error");
    var result = document.getElementById("result");
    var resultText = document.getElementById("result-text");

    orderForm.addEventListener("submit", function (event) {
        event.preventDefault();

        var quantityValue = quantityInput.value.trim();
        var quantityPattern = /^[1-9]\d*$/;

        result.hidden = true;
        quantityError.hidden = true;
        quantityError.textContent = "";

        if (!quantityPattern.test(quantityValue)) {
            quantityError.textContent =
                "Ошибка: введите целое положительное число.";
            quantityError.hidden = false;
            quantityInput.setAttribute("aria-invalid", "true");
            quantityInput.focus();
            return;
        }

        var quantity = parseInt(quantityValue, 10);

        if (!Number.isSafeInteger(quantity)) {
            quantityError.textContent =
                "Ошибка: введённое количество слишком велико.";
            quantityError.hidden = false;
            quantityInput.focus();
            return;
        }

        var selectedOption =
            productSelect.options[productSelect.selectedIndex];

        var price = parseInt(
            selectedOption.getAttribute("data-price"),
            10
        );

        var productName =
            selectedOption.textContent.split(" — ")[0];

        var total = price * quantity;

        if (!Number.isSafeInteger(total)) {
            quantityError.textContent =
                "Ошибка: стоимость заказа слишком велика.";
            quantityError.hidden = false;
            quantityInput.focus();
            return;
        }

        quantityInput.removeAttribute("aria-invalid");

        resultText.textContent =
            productName + ": " +
            price + " ₽ × " +
            quantity + " = " +
            total.toLocaleString("ru-RU") + " ₽";

        result.hidden = false;
    });

    quantityInput.addEventListener("input", function () {
        quantityInput.removeAttribute("aria-invalid");
        quantityError.hidden = true;
        quantityError.textContent = "";
    });
});