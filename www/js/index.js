 fetch('js/backend.json')
   .then(response => response.json())
   .then(data=> {
      //Salvar os dados vindo do back-end localmente
      //Vamos Ultilizar Localstorage

      localStorage.setItem('produtos', JSON.stringify(data));

     
      setTimeout(() =>{

         //esvaziar a area de produtos
      $("#produtos").empty();

         data.forEach(produto => {
         var produtoHTML = `
         
                                 <div class="item-card">
                                    <a data-id="${produto.id}" href="/#/" class="item">
                                       <div class="img-container">
                                            <img  src="${produto.imagem}" alt="">
                                       </div>
                                       <div class="nome-rating">
                                            <span class="color-gray">${produto.nome}</span>
                                             <span class="bold margin-right">
                                                <i class="mdi mdi-star"></i>
                                               ${produto.rating}
                                             </span>
                                       </div>
                                       <div class="price bold">
                                             ${produto.preco_promocional.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})}
                                       </div>
                                    </a>
                                </div> 
         `;

         $('#produtos').append(produtoHTML);

      });

        $(".item").on('click', function(){
            var id = $(this).attr('data-id');
            localStorage.setItem('detalhe', id);
            app.views.main.router.navigate('/detalhes/');
         });

      }, 1000); 
      
   })
   .catch(error => console.error('Erro ao fazer requisito dos dados'+ error));

   ///VER QUANTOS ITEMS TEM NO CARRINHO
    
     setTimeout(() => {
          var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
           $('.btn-cart').attr('data-count', carrinho.length);
     }, 300);

