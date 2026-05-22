$(document).ready(function() {
    
    $("#btn-tambah").click(function() {
        var btn = $(this);
        btn.text("Sedang memuat...");
        
        var angkaAcak = Math.floor(Math.random() * 50) + 1;
        
        $.get("https://fakestoreapi.com/products/" + angkaAcak, function(data) {
            btn.text("Tambah Produk Acak");
            $("#empty-state").hide();
            
            var cardHTML = `
                <div class="card-produk">
                    <img src="${data.image}" alt="${data.title}">
                    <h4>${data.title}</h4>
                    <div class="harga">$${data.price}</div>
                    <button class="btn-hapus">Hapus Produk</button>
                </div>
            `;
            
            $("#etalase").append(cardHTML);
        });
    });

    $("#etalase").on("click", ".btn-hapus", function() {
        $(this).parent().remove();
        
        if ($("#etalase .card-produk").length === 0) {
            $("#empty-state").show();
        }
    });

});