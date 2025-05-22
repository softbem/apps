  var localCarrinho = localStorage.getItem('carrinho');

  if(localCarrinho) {
    var carrinho = JSON.parse(localCarrinho);
    if (carrinho.length > 0){

        //tem item no carrinho

        //renderizar o carrinho
         renderizarCarrinho();

        //somar total dos produtos
        calcularTotal();

    }else{

        //mostrar carrinho vazio
        carrinhoVazio();
    }

}else{
        //mostrar o carrinho vazio
        carrinhoVazio();
}

function renderizarCarrinho(){
    //Esvaziar  a área dos itens
        $('#listaCarrinho').empty();

        //percorrer o carrinho e a área
            $.each(carrinho, function(index, itemCarrinho){
                 var itemDiv = `
                     <!-----------items do carrinho------>
                        <div class="item-carrinho">
                            <div class="area-img">
                                <img src="${itemCarrinho.item.imagem}" alt="">
                            </div>
                            <div class="area-details">
                                <div class="sup">
                                    <span class="name-prod">
                                       ${itemCarrinho.item.nome}
                                    </span>
                                    <a data-index='${index}' class="delete-item" href="#">
                                        <i class="mdi mdi-close"></i>
                                    </a>
                                </div>

                                <div class="middle">
                                    <span>${itemCarrinho.item.principal_caracteristica}</span>
                                </div>

                                <div class="preco-quantidade">
                                      <span> ${itemCarrinho.item.preco_promocional.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})}</span>
                                       <div class="count">
                                           <a class="minus" data-index="${index}" href="#">-</a>
                                          <input readonly class="qtd-item" type="text" value="${itemCarrinho.quantidade}">
                                           <a class="plus" data-index="${index}" href="#">+</a>
                                       </div>
                                </div>
                            </div>
                        </div>
                    </div>
                 `;

                 $("#listaCarrinho").append(itemDiv);
            });

       ///  DELETR ITEMS DO CARRINHO
    $(".delete-item").on('click',  function () {
     var index = $(this).data('index');
         app.dialog.confirm ('Tem certeza que quer remover esté ITEM?','Remover', function(){
          carrinho.splice(index, 1);
          localStorage.setItem('carrinho', JSON.stringify(carrinho));
          app.views.main.router.refreshPage();
          
     }); 
});


    ///  DIMINUIR ITEMS DO CARRINHO
    $(".minus").on('click',  function () {
     var index = $(this).data('index');
         
          if(carrinho[index].quantidade > 1){
            carrinho[index].quantidade--;
            carrinho[index].total_item = carrinho[index].quantidade *  carrinho[index].item.preco_promocional;
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
             app.views.main.router.refreshPage();
           

          }else{
             var itemname = carrinho[index].item.nome;
             app.dialog.confirm(`Gostária de remover <strong>${itemname}</strong>?`, 'REMOVER', function(){
                carrinho.splice(index, 1);
                localStorage.setItem('carrinho', JSON.stringify(carrinho));
                renderizarCarrinho();
                calcularTotal();
             });
          }
     });


      ///  PLUS ITEMS NO CARRINHO
    $(".plus").on('click',  function () {
     var index = $(this).data('index');
         
            carrinho[index].quantidade++;
            carrinho[index].total_item = carrinho[index].quantidade *  carrinho[index].item.preco_promocional;
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            renderizarCarrinho();
            calcularTotal();
     });

}



function calcularTotal() {
    var totalCarrinho = 4.99;
    
    

     $.each(carrinho, function (index, itemCarrinho) {
          totalCarrinho += itemCarrinho.total_item;
          
     });

     $("#subtotal").html(totalCarrinho.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'}));
};
   




function carrinhoVazio(){
    console.log('carrinho está vazio');
    $('#listaCarrinho').empty();

    //sumir os valores de baixo do totais
    $("#toolbarTotais").addClass('display-none');
    $("#toolbarCheckout").addClass('display-none');


    //Mostar sacolinha vazia

    $('#listaCarrinho').html(`
           <div class="text-align-center">
                <img width="300" src="img/empty.gif">
                <br><span class="color-gray">Seu Carrinho está totalmente Vázio 🤔...</span>
           </div>
        `);    
}

$("#esvaziar").on('click', function () {
         app.dialog.confirm('Gostária de esvaziar o carrinho? 😥', '<strong>Atenção! 😔</strong>', function(){
                  ///apagar 

                  localStorage.removeItem('carrinho');
                  app.views.main.router.refreshPage();
         });
})






 