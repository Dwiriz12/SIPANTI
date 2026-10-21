$(document).ready(function () {
    $(".btn-logout").on("click", function (e) {
        e.preventDefault();

        const pesan = $(this).data("confirm-message") || "Yakin ingin logout?";

        if (confirm(pesan)) {
            window.location.href = $(this).attr("href");
        }
    });
});
