/**
 * MIT License
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

'use strict';

var $ = require('jquery');

var suggestionsBox = {

    allProductsUrl: '/fact-finder?query=',
    categoriesUrl: '/fact-finder?filterCategory=',
    cursorPosition: -1,
    hidden: true,

    prepareSuggestionsBlock: function (objectsList)     {
        this.clearProductSuggestionsBlock();
        this.clearCategoriesSuggestionsBlock();
        this.resetCursorPosition();

        $.each(objectsList, function (i, item) {
            if (item.type == 'productName') {
                var productTemplateHtml = suggestionsBox.getProductTemplateHtml(item);
                $('.ff-products').append(productTemplateHtml);
            } else {
                var categoryTemplateHtml = suggestionsBox.getCategoryTemplateHtml(item);
                $('.ff-categories').append(categoryTemplateHtml);
            }
        });

        this.setSeeAllProductsLink();
        this.showSuggestionsBox(true);
    },

    getProductTemplateHtml: function (item) {
        var productTemplate = $('#suggestions-box-row').clone();
        var productTemplateHtml = $(productTemplate).prop('innerHTML');

        $.each(item, function (index, value) {
            productTemplateHtml = productTemplateHtml.replace(':' + index, value);
        });

        return productTemplateHtml;
    },

    getCategoryTemplateHtml: function (item) {
        var categoryTemplate = $('#suggestions-box-row').clone();
        var categoryTemplateHtml = $(categoryTemplate).prop('innerHTML');

        item.url = this.categoriesUrl + encodeURIComponent(item.label);

        $.each(item, function (index, value) {
            categoryTemplateHtml = categoryTemplateHtml.replace(':' + index, value);
        });

        return categoryTemplateHtml;
    },

    clearProductSuggestionsBlock: function () {
        $('.ff-products').html('');
    },

    clearCategoriesSuggestionsBlock: function () {
        $('.ff-categories').html('');
    },

    showSuggestionsBox: function (show) {
        if (show === true) {
            $('.ff-suggestion-box').removeClass('is-hidden');
            this.hidden = false;
        } else {
            $('.ff-suggestion-box').addClass('is-hidden');
            this.hidden = true;
        }
    },

    setSeeAllProductsLink: function () {
        var searchValue = $('#ffSearchInput').val();
        $('.ff-all-products').attr('href', this.allProductsUrl + searchValue);
    },

    resetCursorPosition: function () {
        this.cursorPosition = -1;
    },

    unhighlightAllRows: function () {
        if ($('.suggestions').find('a.js-navigable') != undefined) {
            $('.suggestions').find('a.js-navigable').removeClass('is-active');
        }
    },

    highlightRow: function (step) {
        var rows = $('.suggestions').find('a.js-navigable');
        var rowsCount = rows.length;

        if (rowsCount == 0) {
            return false;
        }
        this.unhighlightAllRows();

        if (step > 0 && rowsCount <= this.cursorPosition + step) {
            this.resetCursorPosition();
        }

        if (step < 0 && this.cursorPosition + step == -1) {
            this.cursorPosition = rowsCount;
        }

        this.cursorPosition += step;
        $(rows[this.cursorPosition]).addClass('is-active');
    },

    goTo: function (e) {
        e.preventDefault();

        if ($('.suggestions').find('a.js-navigable.is-active') != undefined) {
            var url = $('.suggestions').find('a.js-navigable.is-active').attr('href');

            if (url != undefined) {
                window.location.href = url;
            }
        }
    }

};

module.exports = suggestionsBox;