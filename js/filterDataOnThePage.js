// Функція для повернення у видимість чекбоксів
function showCheckboxes(checkboxes) {
    checkboxes.forEach(function (checkbox) {
        checkbox.closest('label').style.display = '';
    });
}

// Отримати всі чекбокси для категорій
var categoryCheckboxes = document.querySelectorAll('input[name="tags"]');
// Отримати всі чекбокси для регіонів
var regionCheckboxes = document.querySelectorAll('input[name="region"]');
var slider = document.getElementById("myRange");
var output = document.getElementById("sliderValue");
output.innerHTML = slider.value;

// Отримати всі рядки таблиці вакансій
var rows = document.querySelectorAll('.table-vacancies tr');

// Додати обробник події для кожного чекбоксу категорій
categoryCheckboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', filterVacancies);
});

// Додати обробник події для кожного чекбоксу регіону
regionCheckboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', filterVacancies);
});

slider.oninput = function () {
    output.innerHTML = this.value;
    filterVacancies();
};

<<<<<<< HEAD
// Функція для фільтрації вакансій
=======
// Функція для фільтрації вакансій за категоріями та регіонами
>>>>>>> f667aea (Фільтрація вакансій за зарплатнею, з допомогою повзунка (переписав JS коди))
function filterVacancies() {
    // Отримати всі обрані значення чекбоксів категорій
    var selectedCategoryValues = Array.from(document.querySelectorAll('input[name="tags"]:checked')).map(function (checkbox) {
        return checkbox.value;
    });

    // Отримати всі обрані значення чекбоксів регіонів
    var selectedRegionValues = Array.from(document.querySelectorAll('input[name="region"]:checked')).map(function (checkbox) {
        return checkbox.value;
    });

    // Перевірити, чи всі чекбокси категорій та регіонів деактивовані
    var allCategoryUnchecked = Array.from(categoryCheckboxes).every(function (checkbox) {
        return !checkbox.checked;
    });

    var allRegionUnchecked = Array.from(regionCheckboxes).every(function (checkbox) {
        return !checkbox.checked;
    });

    // Перебрати кожен рядок і змінити видимість відповідно до обраних чекбоксів категорій та регіонів
    rows.forEach(function (row) {
        var tagsCell = row.querySelector('.vacancytags');
        var tags = tagsCell.textContent;

        var regionCell = row.querySelector('.vacancyregion');
        var region = regionCell.textContent;

        var priceCell = row.querySelector('.price');
        var price = parseFloat(priceCell.textContent);

        var isCategoryVisible = allCategoryUnchecked || selectedCategoryValues.some(function (value) {
            return tags.includes(value);
        });

        var isRegionVisible = allRegionUnchecked || selectedRegionValues.some(function (value) {
            return region.includes(value);
        });

        var isPriceVisible = price >= slider.value;

<<<<<<< HEAD
        var isVisible = isCategoryVisible && isRegionVisible && isPriceVisible;
=======
        var isVisible = isCategoryVisible && isRegionVisible;
>>>>>>> f667aea (Фільтрація вакансій за зарплатнею, з допомогою повзунка (переписав JS коди))

        row.style.display = isVisible ? '' : 'none';
    });

    // Якщо всі чекбокси категорій та регіонів деактивовані, показати всі рядки таблиці
    if (allCategoryUnchecked && allRegionUnchecked) {
        rows.forEach(function (row) {
            row.style.display = '';
        });
    }
<<<<<<< HEAD
=======

    // Фільтрувати вакансії за зарплатнею
    filterVacanciesBySalary();
}

// Функція для фільтрації вакансій за зарплатнею
function filterVacanciesBySalary() {
    // Отримати всі рядки таблиці вакансій
    var rows = document.querySelectorAll('.table-vacancies tr');

    // Перебрати кожен рядок і змінити видимість відповідно до обраної зарплати
    rows.forEach(function (row) {
        var priceCell = row.querySelector('.price');
        var price = parseFloat(priceCell.textContent);

        var isPriceVisible = price >= slider.value;

        row.style.display = isPriceVisible ? '' : 'none';
    });
>>>>>>> f667aea (Фільтрація вакансій за зарплатнею, з допомогою повзунка (переписав JS коди))
}
